import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureModel
} from "../models";


/**
 * Detects model files inside the project workspace.
 *
 * Detection is based on common model naming conventions:
 *
 * - *.model.ts
 * - *.models.ts
 * - *.model.js
 * - *.models.js
 * - *.model.tsx
 * - *.models.tsx
 * - *.model.jsx
 * - *.models.jsx
 *
 * The detector also performs lightweight source inspection
 * to identify common model technologies such as:
 *
 * - Mongoose
 * - Sequelize
 * - Prisma
 * - TypeORM
 */
export class ModelDetector
    implements CodeStructureDetector<StructureModel[]> {

    readonly name =
        "ModelDetector";


    /**
     * Detect model files recursively.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureModel[]
        >
    > {

        try {

            const models =
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
                    models,

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
                        : "Failed to detect models."

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
    ): Promise<StructureModel[]> {

        const results:
            StructureModel[] = [];


        /**
         * IMPORTANT:
         *
         * Current FilesystemService API:
         *
         * listDirectory() -> string[]
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
             * Use the actual metadata API.
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
             * Check model naming convention.
             */
            if (
                !this.isModelFile(
                    entryName
                )
            ) {

                continue;

            }


            /**
             * Read source.
             *
             * IMPORTANT:
             *
             * readFile() returns string in the
             * detector-side FilesystemService.
             */
            let content = "";

            try {

                content =
                    await filesystemService.readFile(
                        entryPath
                    );

            }
            catch {

                content = "";

            }


            const relativePath =
                path.relative(
                    rootPath,
                    entryPath
                );


            const modelName =
                this.getModelName(
                    entryName
                );


            const technology =
                this.detectTechnology(
                    content
                );


            results.push({

                name:
                    modelName,

                path:
                    relativePath,

                file:
                    entryName,

                type:
                    "model",

                technology

            });

        }


        return results;

    }


    /**
     * Determines whether a file follows
     * a model naming convention.
     */
    private isModelFile(
        fileName: string
    ): boolean {

        const lowerName =
            fileName.toLowerCase();


        return (

            lowerName.endsWith(
                ".model.ts"
            ) ||

            lowerName.endsWith(
                ".models.ts"
            ) ||

            lowerName.endsWith(
                ".model.tsx"
            ) ||

            lowerName.endsWith(
                ".models.tsx"
            ) ||

            lowerName.endsWith(
                ".model.js"
            ) ||

            lowerName.endsWith(
                ".models.js"
            ) ||

            lowerName.endsWith(
                ".model.jsx"
            ) ||

            lowerName.endsWith(
                ".models.jsx"
            )

        );

    }


    /**
     * Converts filename into a model name.
     *
     * Example:
     *
     * user.model.ts
     *
     * -> UserModel
     */
    private getModelName(
        fileName: string
    ): string {

        const baseName =
            fileName.replace(
                /\.(models?|model)\.(ts|tsx|js|jsx)$/i,
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


        return `${name}Model`;

    }


    /**
     * Detect common model technologies.
     */
    private detectTechnology(
        content: string
    ): string | undefined {

        if (
            /\bmongoose\b/i.test(content) ||
            /\bSchema\s*\(/.test(content) ||
            /\bmodel\s*\(/.test(content)
        ) {

            return "mongoose";

        }


        if (
            /\bsequelize\b/i.test(content) ||
            /\bModel\.init\s*\(/.test(content)
        ) {

            return "sequelize";

        }


        if (
            /\bprisma\b/i.test(content) ||
            /\bPrismaClient\b/.test(content)
        ) {

            return "prisma";

        }


        if (
            /\btypeorm\b/i.test(content) ||
            /@Entity\s*\(/.test(content)
        ) {

            return "typeorm";

        }


        return undefined;

    }

}