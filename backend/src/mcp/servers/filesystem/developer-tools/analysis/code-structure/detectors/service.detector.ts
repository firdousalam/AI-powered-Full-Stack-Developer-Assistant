import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureService
} from "../models";


/**
 * Detects service-layer files inside the project workspace.
 *
 * Detection is based primarily on:
 *
 * - Files ending with `.service.ts`
 * - Files ending with `.service.js`
 * - Files ending with `.service.tsx`
 * - Files ending with `.service.jsx`
 *
 * The detector intentionally does not try to understand
 * business logic. It only identifies service files and
 * produces normalized structural information.
 */
export class ServiceDetector
    implements CodeStructureDetector<StructureService[]> {

    readonly name =
        "ServiceDetector";


    /**
     * Detect service files recursively.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureService[]
        >
    > {

        try {

            const services =
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
                    services,

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
                        : "Failed to detect services."

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
    ): Promise<StructureService[]> {

        const results: StructureService[] = [];

        /**
         * listDirectory() in the current FilesystemService
         * returns an array of file/directory names.
         */
        const directoryEntries =
            await filesystemService.listDirectory(
                currentPath
            );

        /**
         * Iterate over the returned filenames.
         */
        for (const entryName of directoryEntries) {

            const entryPath =
                path.join(
                    currentPath,
                    entryName
                );

            /**
             * Determine whether the entry is a directory.
             */
            const metadata =
                await filesystemService.getMetadata(
                    entryPath
                );

            if (!metadata) {
                continue;
            }

            /**
             * Recursively scan directories.
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
             * Check whether the file follows
             * the service naming convention.
             */
            if (
                !this.isServiceFile(
                    entryName
                )
            ) {
                continue;
            }

            /**
             * Convert absolute path into a
             * workspace-relative path.
             */
            const relativePath =
                path.relative(
                    rootPath,
                    entryPath
                );

            /**
             * Generate service class name.
             *
             * Example:
             *
             * user.service.ts
             *
             * becomes:
             *
             * UserService
             */
            const serviceName =
                this.getServiceName(
                    entryName
                );

            results.push({

                name:
                    serviceName,

                path:
                    relativePath,

                file:
                    entryName,

                type:
                    "service"

            });

        }

        return results;
    }


    /**
     * Determines whether a file follows
     * the conventional service naming pattern.
     */
    private isServiceFile(
        fileName: string
    ): boolean {

        const lowerName =
            fileName.toLowerCase();

        return (

            lowerName.endsWith(
                ".service.ts"
            ) ||

            lowerName.endsWith(
                ".service.tsx"
            ) ||

            lowerName.endsWith(
                ".service.js"
            ) ||

            lowerName.endsWith(
                ".service.jsx"
            )

        );

    }


    /**
     * Converts a filename into a service name.
     *
     * Example:
     *
     * user.service.ts
     *       ↓
     * UserService
     */
    private getServiceName(
        fileName: string
    ): string {

        const baseName =
            fileName
                .replace(
                    /\.(service)\.(ts|tsx|js|jsx)$/i,
                    ""
                );


        const parts =
            baseName
                .split(/[-_.\s]+/)
                .filter(Boolean);


        const className =
            parts
                .map(
                    part =>
                        part.charAt(0).toUpperCase() +
                        part.slice(1)
                )
                .join("");


        return `${className}Service`;

    }

}