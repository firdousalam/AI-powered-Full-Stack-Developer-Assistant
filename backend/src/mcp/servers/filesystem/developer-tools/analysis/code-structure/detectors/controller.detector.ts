import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureController
} from "../models";


/**
 * ============================================================
 * ControllerDetector
 * ============================================================
 *
 * Detects controller files and controller classes/functions
 * inside the project workspace.
 *
 * Responsibilities:
 *
 * - Scan source files
 * - Identify controller files
 * - Detect controller classes
 * - Detect controller functions
 * - Detect controller methods
 *
 * Examples:
 *
 * user.controller.ts
 * UserController
 *
 * auth.controller.ts
 * AuthController
 *
 * This detector intentionally does NOT determine:
 *
 * - Routes
 * - Services
 * - Models
 * - Overall architecture
 */
export class ControllerDetector
    implements CodeStructureDetector<StructureController[]> {


    /**
     * Detector name.
     */
    readonly name =
        "ControllerDetector";


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
            StructureController[]
        >
    > {

        try {

            const controllers =
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
                    controllers,

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
                        : "Failed to detect controllers."

                ]

            };

        }

    }


    /**
     * ========================================================
     * Scan Directory
     * ========================================================
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureController[]> {

        const results:
            StructureController[] = [];


        /**
         * Your FilesystemService.listDirectory()
         * returns string[] in this project.
         */
        const directoryEntries =
            await filesystemService.listDirectory(
                path.relative(
                    rootPath,
                    currentPath
                ) || "."
            );


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


            const metadata =
                await filesystemService.getMetadata(
                    relativePath
                );


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
             * Only analyze files that are likely
             * to contain controllers.
             */
            if (
                !this.isControllerFile(
                    entryName
                )
            ) {

                continue;

            }


            const content =
                await filesystemService.readFile(
                    relativePath
                );


            const controllers =
                this.analyzeController(
                    relativePath,
                    content
                );


            results.push(
                ...controllers
            );

        }


        return results;

    }


    /**
     * ========================================================
     * Controller File Detection
     * ========================================================
     *
     * Examples:
     *
     * user.controller.ts
     * auth.controller.ts
     * product.controller.js
     */
    private isControllerFile(
        fileName: string
    ): boolean {

        return /\.controller\.(ts|tsx|js|jsx|mjs|cjs)$/i
            .test(fileName);

    }


    /**
     * ========================================================
     * Analyze Controller
     * ========================================================
     */
    private analyzeController(
        filePath: string,
        content: string
    ): StructureController[] {

        const results:
            StructureController[] = [];


        /**
         * Detect classes such as:
         *
         * export class UserController
         * class UserController
         */
        const classRegex =
            /(?:export\s+default\s+|export\s+)?class\s+([A-Za-z_$][\w$]*Controller)\b/g;


        let match:
            RegExpExecArray | null;


        while (
            (match =
                classRegex.exec(content)) !== null
        ) {

            const controllerName =
                match[1];


            const methods =
                this.extractClassMethods(
                    content,
                    match.index
                );


            results.push({

                path:
                    filePath,

                name:
                    controllerName,

                methods

            });

        }


        /**
         * Detect controller functions.
         *
         * Example:
         *
         * export function userController() {}
         */
        const functionRegex =
            /(?:export\s+default\s+|export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*Controller)\s*\(/g;


        while (
            (match =
                functionRegex.exec(content)) !== null
        ) {

            results.push({

                path:
                    filePath,

                name:
                    match[1],

                methods: []

            });

        }


        /**
         * Detect controller constants.
         *
         * Example:
         *
         * const userController = {}
         */
        const variableRegex =
            /(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*Controller)\s*=/g;


        while (
            (match =
                variableRegex.exec(content)) !== null
        ) {

            results.push({

                path:
                    filePath,

                name:
                    match[1],

                methods: []

            });

        }


        return results;

    }


    /**
     * ========================================================
     * Extract Class Methods
     * ========================================================
     *
     * Detects methods such as:
     *
     * getUsers()
     * getUser()
     * createUser()
     *
     * It intentionally ignores constructors.
     */
    private extractClassMethods(
        content: string,
        classStart: number
    ): string[] {

        /**
         * Take the portion of the file beginning
         * at the controller class.
         */
        const classContent =
            content.substring(
                classStart
            );


        /**
         * Match common class methods.
         *
         * Examples:
         *
         * getUsers() {}
         * async getUser() {}
         * public createUser() {}
         * private deleteUser() {}
         */
        const methodRegex =
            /(?:public\s+|private\s+|protected\s+|static\s+|async\s+)*([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/g;


        const methods:
            string[] = [];


        let match:
            RegExpExecArray | null;


        while (
            (match =
                methodRegex.exec(classContent)) !== null
        ) {

            const methodName =
                match[1];


            /**
             * Constructors are not considered
             * controller methods.
             */
            if (
                methodName ===
                "constructor"
            ) {

                continue;

            }


            /**
             * Avoid treating control statements
             * as methods.
             */
            if (
                [
                    "if",
                    "for",
                    "while",
                    "switch",
                    "catch"
                ].includes(
                    methodName
                )
            ) {

                continue;

            }


            methods.push(
                methodName
            );

        }


        return [
            ...new Set(
                methods
            )
        ];

    }

}