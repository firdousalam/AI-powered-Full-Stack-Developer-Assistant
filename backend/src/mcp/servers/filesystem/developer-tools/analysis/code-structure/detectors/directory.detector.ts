import path from "node:path";

import {
    filesystemService
} from "../../../..";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureDirectory
} from "../models";


/**
 * Detects directories inside the project workspace.
 *
 * Responsibilities:
 *
 * - Traverse the workspace
 * - Identify directories
 * - Calculate file counts
 * - Calculate child directory counts
 * - Return workspace-relative directory information
 *
 * This detector intentionally contains no:
 *
 * - Framework detection
 * - Architecture detection
 * - Language detection
 * - Module detection
 *
 * Those responsibilities belong to other detectors.
 */
export class DirectoryDetector
    implements CodeStructureDetector<StructureDirectory[]> {

    /**
     * Detector name used by the analyzer.
     */
    readonly name =
        "DirectoryDetector";


    /**
     * Detect all directories inside the workspace.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureDirectory[]
        >
    > {

        try {

            const directories =
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
                    directories,

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
                        : "Failed to detect directories."

                ]

            };

        }

    }


    /**
     * Recursively scan a directory.
     *
     * IMPORTANT:
     *
     * FilesystemService.listDirectory()
     * returns DirectoryInfo.
     *
     * Therefore we must use:
     *
     * directoryInfo.entries
     *
     * NOT:
     *
     * directoryInfo.entries()
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureDirectory[]> {

        const results:
            StructureDirectory[] = [];


        /**
         * Get directory information.
         *
         * Return type:
         *
         * DirectoryInfo
         */
        const directoryInfo =
            await filesystemService.listDirectory(
                currentPath
            );


        /**
         * IMPORTANT:
         *
         * entries is an ARRAY.
         *
         * Do NOT use:
         *
         * directoryInfo.entries()
         *
         * because Array.entries()
         * is a native JavaScript method.
         */
        const directoryEntries =
            directoryInfo.entries;


        /**
         * Iterate through directory entries.
         */
        for (
            const entry of directoryEntries
        ) {

            /**
             * We only care about directories.
             *
             * Files will be handled by
             * FileDetector.
             */
            if (!entry.isDirectory) {

                continue;

            }


            /**
             * Build absolute directory path.
             */
            const directoryPath =
                path.join(
                    currentPath,
                    entry.name
                );


            /**
             * Convert absolute path into
             * workspace-relative path.
             */
            const relativePath =
                path.relative(
                    rootPath,
                    directoryPath
                );


            /**
             * Get information about the
             * child directory.
             */
            const childInfo =
                await filesystemService.listDirectory(
                    directoryPath
                );


            /**
             * Add directory information.
             */
            results.push({

                path:
                    relativePath || ".",

                name:
                    entry.name,

                files:
                    childInfo.totalFiles,

                directories:
                    childInfo.totalDirectories

            });


            /**
             * Continue scanning recursively.
             */
            const children =
                await this.scanDirectory(
                    rootPath,
                    directoryPath
                );


            /**
             * Add nested directories.
             */
            results.push(
                ...children
            );

        }


        return results;

    }

}