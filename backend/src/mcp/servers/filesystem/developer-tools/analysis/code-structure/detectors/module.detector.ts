
// src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/module.detector.ts

import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureModule
} from "../models";


/**
 * ============================================================
 * ModuleDetector
 * ============================================================
 *
 * Detects JavaScript and TypeScript modules inside the project.
 *
 * Responsibilities:
 *
 * - Find source files
 * - Read source code
 * - Detect imports
 * - Detect exports
 * - Detect default exports
 * - Identify module type
 *
 * This detector does NOT determine:
 *
 * - Controllers
 * - Services
 * - Routes
 * - Models
 * - Architecture
 */
export class ModuleDetector
    implements CodeStructureDetector<StructureModule[]> {


    /**
     * Detector name.
     */
    readonly name =
        "ModuleDetector";


    /**
     * Supported source extensions.
     */
    private readonly supportedExtensions =
        new Set([
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".mjs",
            ".cjs"
        ]);


    /**
     * ========================================================
     * Detect
     * ========================================================
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureModule[]
        >
    > {

        try {

            const modules =
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
                    modules,

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
                        : "Failed to detect modules."

                ]

            };

        }

    }


    /**
     * ========================================================
     * Recursive Directory Scanner
     * ========================================================
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureModule[]> {

        const results:
            StructureModule[] = [];


        /**
         * FilesystemService currently returns
         * directory entry names.
         */
        const directoryEntries =
            await filesystemService.listDirectory(
                path.relative(
                    rootPath,
                    currentPath
                ) || "."
            );


        /**
         * Process every directory entry.
         */
        for (
            const entryName
            of directoryEntries
        ) {

            const absolutePath =
                path.join(
                    currentPath,
                    entryName
                );


            const relativePath =
                path.relative(
                    rootPath,
                    absolutePath
                );


            /**
             * Retrieve metadata.
             */
            const metadata =
                await filesystemService.getMetadata(
                    relativePath
                );


            /**
             * Ignore entries for which metadata
             * cannot be obtained.
             */
            if (!metadata) {

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


                continue;

            }


            /**
             * =================================================
             * File
             * =================================================
             *
             * Only source-code files are modules.
             */
            if (!metadata.isFile) {

                continue;

            }


            const extension =
                path.extname(
                    entryName
                ).toLowerCase();


            if (
                !this.supportedExtensions.has(
                    extension
                )
            ) {

                continue;

            }


            /**
             * Read source code.
             */


            /**
             * Analyze source code.
             */
            const file =
                await filesystemService.readFile(
                    relativePath
                );

            const module =
                this.analyzeModule(
                    relativePath,
                    file
                );

            results.push(
                module
            );

        }


        return results;

    }


    /**
     * ========================================================
     * Analyze Module
     * ========================================================
     */
    private analyzeModule(
        filePath: string,
        content: string
    ): StructureModule {

        /**
         * Detect imports.
         */
        const imports =
            this.extractImports(
                content
            );


        /**
         * Detect exports.
         */
        const exports =
            this.extractExports(
                content
            );


        /**
         * Detect default export.
         */
        const hasDefaultExport =
            /export\s+default\b/.test(
                content
            );


        /**
         * Determine module type.
         */
        const moduleType =
            this.detectModuleType(
                content
            );


        return {

            path:
                filePath,

            imports,

            exports,

            hasDefaultExport,

            moduleType

        };

    }


    /**
     * ========================================================
     * Extract Imports
     * ========================================================
     */
    private extractImports(
        content: string
    ): string[] {

        const imports:
            string[] = [];


        /**
         * ES module imports:
         *
         * import express from "express";
         * import { Router } from "express";
         * import "dotenv";
         */
        const importRegex =
            /import\s+(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;


        let match:
            RegExpExecArray | null;


        while (
            (match =
                importRegex.exec(content)) !== null
        ) {

            imports.push(
                match[1]
            );

        }


        /**
         * CommonJS:
         *
         * require("express")
         */
        const requireRegex =
            /require\s*\(\s*["']([^"']+)["']\s*\)/g;


        while (
            (match =
                requireRegex.exec(content)) !== null
        ) {

            imports.push(
                match[1]
            );

        }


        return [
            ...new Set(
                imports
            )
        ];

    }


    /**
     * ========================================================
     * Extract Exports
     * ========================================================
     */
    private extractExports(
        content: string
    ): string[] {

        const exports:
            string[] = [];


        /**
         * Named declarations:
         *
         * export class UserController
         * export function getUser
         * export const user
         * export interface User
         * export type UserType
         */
        const declarationRegex =
            /export\s+(?:async\s+)?(?:abstract\s+)?(?:class|function|const|let|var|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g;


        let match:
            RegExpExecArray | null;


        while (
            (match =
                declarationRegex.exec(content)) !== null
        ) {

            exports.push(
                match[1]
            );

        }


        /**
         * Named export list:
         *
         * export {
         *     UserService,
         *     UserController
         * };
         */
        const exportBlockRegex =
            /export\s*\{([\s\S]*?)\}/g;


        while (
            (match =
                exportBlockRegex.exec(content)) !== null
        ) {

            const names =
                match[1]
                    .split(",")
                    .map(
                        item =>
                            item
                                .trim()
                                .split(/\s+as\s+/)[0]
                                .trim()
                    )
                    .filter(
                        Boolean
                    );


            exports.push(
                ...names
            );

        }


        /**
         * Remove duplicates.
         */
        return [
            ...new Set(
                exports
            )
        ];

    }


    /**
     * ========================================================
     * Detect Module Type
     * ========================================================
     */
    private detectModuleType(
        content: string
    ): string {

        const hasImport =
            /\bimport\s/.test(
                content
            );


        const hasExport =
            /\bexport\s/.test(
                content
            );


        const hasRequire =
            /\brequire\s*\(/.test(
                content
            );


        const hasModuleExports =
            /\bmodule\.exports\b/.test(
                content
            );


        if (
            hasImport ||
            hasExport
        ) {

            return "typescript-module";

        }


        if (
            hasRequire ||
            hasModuleExports
        ) {

            return "commonjs-module";

        }


        return "script";

    }

}