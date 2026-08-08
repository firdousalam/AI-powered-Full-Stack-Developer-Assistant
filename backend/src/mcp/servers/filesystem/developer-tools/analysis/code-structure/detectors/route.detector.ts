import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureRoute
} from "../models";


/**
 * Detects route files inside the project workspace.
 *
 * Detection is primarily based on:
 *
 * - *.route.ts
 * - *.routes.ts
 * - *.route.js
 * - *.routes.js
 * - *.route.tsx
 * - *.routes.tsx
 * - *.route.jsx
 * - *.routes.jsx
 *
 * The detector also performs lightweight inspection of
 * the source code to identify HTTP methods such as:
 *
 * GET
 * POST
 * PUT
 * PATCH
 * DELETE
 */
export class RouteDetector
    implements CodeStructureDetector<StructureRoute[]> {

    readonly name =
        "RouteDetector";


    /**
     * Detect route files recursively.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureRoute[]
        >
    > {

        try {

            const routes =
                await this.scanDirectory(
                    workspacePath,
                    workspacePath
                );

            return {

                detector:
                    this.name,

                success:
                    true,

                data:
                    routes,

                warnings:
                    []

            };

        }
        catch (error) {

            return {

                detector:
                    this.name,

                success:
                    false,

                data:
                    [],

                warnings: [

                    error instanceof Error
                        ? error.message
                        : "Failed to detect routes."

                ]

            };

        }

    }


    /**
     * Recursively scans the workspace.
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureRoute[]> {

        const results:
            StructureRoute[] = [];


        /**
         * IMPORTANT:
         *
         * Your current FilesystemService returns
         * string[] from listDirectory().
         */
        const directoryEntries =
            await filesystemService.listDirectory(
                currentPath
            );


        for (
            const entryName of directoryEntries
        ) {

            const entryPath =
                path.join(
                    currentPath,
                    entryName
                );


            /**
             * Get metadata using the actual
             * FilesystemService API.
             */
            const metadata =
                await filesystemService.getMetadata(
                    entryPath
                );


            if (!metadata) {

                continue;

            }


            /**
             * Recursively inspect directories.
             */
            if (metadata.isDirectory) {

                const children =
                    await this.scanDirectory(
                        rootPath,
                        entryPath
                    );

                results.push(
                    ...children
                );

                continue;

            }


            /**
             * Ignore anything that isn't a file.
             */
            if (!metadata.isFile) {

                continue;

            }


            /**
             * Check route filename convention.
             */
            if (
                !this.isRouteFile(
                    entryName
                )
            ) {

                continue;

            }

            /*
            * Read route source code.
            */
            let content = "";

            try {

                content =
                    await filesystemService.readFile(
                        entryPath
                    );

            }
            catch {

                /**
                 * If the file cannot be read,
                 * still report the route.
                 */
                content = "";

            }


            const relativePath =
                path.relative(
                    rootPath,
                    entryPath
                );


            const routeName =
                this.getRouteName(
                    entryName
                );


            const methods =
                this.detectHttpMethods(
                    content
                );


            results.push({

                name:
                    routeName,

                path:
                    relativePath,

                file:
                    entryName,

                type:
                    "route",

                methods

            });

        }


        return results;

    }


    /**
     * Determines whether a filename follows
     * a route naming convention.
     */
    private isRouteFile(
        fileName: string
    ): boolean {

        const lowerName =
            fileName.toLowerCase();

        return (

            lowerName.endsWith(
                ".route.ts"
            ) ||

            lowerName.endsWith(
                ".routes.ts"
            ) ||

            lowerName.endsWith(
                ".route.tsx"
            ) ||

            lowerName.endsWith(
                ".routes.tsx"
            ) ||

            lowerName.endsWith(
                ".route.js"
            ) ||

            lowerName.endsWith(
                ".routes.js"
            ) ||

            lowerName.endsWith(
                ".route.jsx"
            ) ||

            lowerName.endsWith(
                ".routes.jsx"
            )

        );

    }


    /**
     * Generates a normalized route name.
     *
     * Example:
     *
     * user.route.ts
     *
     * becomes:
     *
     * UserRoute
     */
    private getRouteName(
        fileName: string
    ): string {

        const baseName =
            fileName.replace(
                /\.(routes?|route)\.(ts|tsx|js|jsx)$/i,
                ""
            );


        const parts =
            baseName
                .split(/[-_.\s]+/)
                .filter(Boolean);


        const name =
            parts
                .map(
                    part =>
                        part.charAt(0).toUpperCase() +
                        part.slice(1)
                )
                .join("");


        return `${name}Route`;

    }


    /**
     * Detect HTTP methods used by the route.
     *
     * Supports common Express-style patterns:
     *
     * router.get(...)
     * router.post(...)
     * router.put(...)
     * router.patch(...)
     * router.delete(...)
     *
     * app.get(...)
     * app.post(...)
     *
     * Also supports:
     *
     * router.route(...).get(...)
     */
    private detectHttpMethods(
        content: string
    ): string[] {

        const methods =
            new Set<string>();


        const methodPattern =
            /\b(?:router|route|app)\s*\.\s*(get|post|put|patch|delete|head|options|all)\s*\(/gi;


        let match:
            RegExpExecArray | null;


        while (
            (match =
                methodPattern.exec(content)) !== null
        ) {

            methods.add(
                match[1].toUpperCase()
            );

        }


        /**
         * Also detect chained Express route
         * definitions such as:
         *
         * router.route("/users")
         *     .get(...)
         *     .post(...)
         */
        const chainedPattern =
            /\.(get|post|put|patch|delete|head|options|all)\s*\(/gi;


        while (
            (match =
                chainedPattern.exec(content)) !== null
        ) {

            methods.add(
                match[1].toUpperCase()
            );

        }


        return Array.from(methods);

    }

}