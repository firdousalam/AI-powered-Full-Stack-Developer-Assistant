
// src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/file.detector.ts

import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    DirectoryInfo
} from "../../../../filesystem.types";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureFile
} from "../models";


/**
 * ============================================================
 * FileDetector
 * ============================================================
 *
 * Detects files inside the project workspace.
 *
 * Responsibilities:
 *
 * - Traverse the project recursively
 * - Identify files
 * - Collect basic file metadata
 * - Return workspace-relative paths
 *
 * This detector does NOT determine:
 *
 * - Modules
 * - Controllers
 * - Services
 * - Routes
 * - Models
 * - Architecture
 */
export class FileDetector
    implements CodeStructureDetector<StructureFile[]> {


    /**
     * Detector name.
     */
    readonly name =
        "FileDetector";


    /**
     * ========================================================
     * Detect
     * ========================================================
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureFile[]
        >
    > {

        try {

            const files =
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
                    files,

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
                        : "Failed to detect files."

                ]

            };

        }

    }



    /**
     * ========================================================
     * Recursive Directory Scanner
     * ========================================================
     *
     * Scans the workspace recursively and collects files.
     *
     * This implementation uses the actual FilesystemService
     * API available under:
     *
     * src/mcp/servers/filesystem/services/filesystem.service.ts
     *
     * The service exposes:
     *
     * getMetadata()
     *
     * rather than getFileMetadata().
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureFile[]> {

        const results:
            StructureFile[] = [];


        /**
         * Get directory entries.
         *
         * The current FilesystemService implementation
         * returns an array of entry names.
         */
        const directoryEntries =
            await filesystemService.listDirectory(
                path.relative(
                    rootPath,
                    currentPath
                ) || "."
            );


        /**
         * Process every entry.
         */
        for (
            const entryName
            of directoryEntries
        ) {

            /**
             * Build absolute path.
             */
            const absolutePath =
                path.join(
                    currentPath,
                    entryName
                );


            /**
             * Convert the absolute path back into a
             * workspace-relative path before passing it
             * to FilesystemService.
             */
            const relativePath =
                path.relative(
                    rootPath,
                    absolutePath
                );


            /**
             * Retrieve metadata using the actual
             * FilesystemService API.
             */
            const metadata =
                await filesystemService.getMetadata(
                    relativePath
                );


            /**
             * Metadata may be null if the file no longer
             * exists or cannot be inspected.
             */
            if (!metadata) {

                continue;

            }


            /**
             * =================================================
             * File
             * =================================================
             */
            if (metadata.isFile) {

                results.push({

                    path:
                        relativePath,

                    name:
                        entryName,

                    extension:
                        path.extname(
                            entryName
                        ),

                    size:
                        metadata.size

                });


                continue;

            }


            /**
             * =================================================
             * Directory
             * =================================================
             */
            if (metadata.isDirectory) {

                const children =
                    await this.scanDirectory(
                        rootPath,
                        absolutePath
                    );


                results.push(
                    ...children
                );

            }

        }


        return results;

    }

}