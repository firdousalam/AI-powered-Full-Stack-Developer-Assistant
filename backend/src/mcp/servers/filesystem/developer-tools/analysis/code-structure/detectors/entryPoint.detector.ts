import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureEntryPoint
} from "../models";


/**
 * Detects likely application entry points.
 *
 * Detection uses:
 *
 * 1. Common entry-point filenames
 * 2. package.json main/bin fields
 * 3. Common startup patterns
 *
 * Examples:
 *
 * src/index.ts
 * src/main.ts
 * src/server.ts
 * src/app.ts
 * index.ts
 * server.js
 */
export class EntryPointDetector
    implements CodeStructureDetector<StructureEntryPoint[]> {

    readonly name =
        "EntryPointDetector";


    /**
     * Detect entry points recursively.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureEntryPoint[]
        >
    > {

        try {

            const results =
                await this.scanDirectory(
                    workspacePath,
                    workspacePath
                );


            /**
             * Also inspect package.json.
             */
            const packageResults =
                await this.detectFromPackageJson(
                    workspacePath
                );


            results.push(
                ...packageResults
            );


            /**
             * Remove duplicate paths.
             */
            const unique =
                this.removeDuplicates(
                    results
                );


            /**
             * Highest confidence first.
             */
            unique.sort(
                (a, b) =>
                    this.confidenceScore(
                        b.confidence
                    ) -
                    this.confidenceScore(
                        a.confidence
                    )
            );


            return {

                detector:
                    this.name,

                success:
                    true,

                data:
                    unique,

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
                        : "Failed to detect entry points."

                ]

            };

        }

    }


    /**
     * Recursively scan the workspace.
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureEntryPoint[]> {

        const results:
            StructureEntryPoint[] = [];


        /**
         * IMPORTANT:
         *
         * listDirectory() returns string[].
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
             * Use the actual filesystem API.
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


            if (!metadata.isFile) {

                continue;

            }


            /**
             * Check whether filename looks
             * like an entry point.
             */
            const candidate =
                this.getFilenameCandidate(
                    entryName
                );


            if (!candidate) {

                continue;

            }


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


            /**
             * Increase confidence if the file
             * actually contains application
             * startup code.
             */
            const startup =
                this.containsStartupCode(
                    content
                );


            let confidence =
                candidate.confidence;


            if (
                startup &&
                confidence === "medium"
            ) {

                confidence = "high";

            }


            results.push({

                name:
                    this.getEntryPointName(
                        entryName
                    ),

                path:
                    relativePath,

                file:
                    entryName,

                type:
                    "entry-point",

                confidence,

                reason:
                    startup
                        ? `${candidate.reason} and contains application startup code.`
                        : candidate.reason

            });

        }


        return results;

    }


    /**
     * Detect entry points declared by package.json.
     */
    private async detectFromPackageJson(
        workspacePath: string
    ): Promise<StructureEntryPoint[]> {

        const results:
            StructureEntryPoint[] = [];


        const packagePath =
            path.join(
                workspacePath,
                "package.json"
            );


        const metadata =
            await filesystemService.getMetadata(
                packagePath
            );


        if (!metadata || !metadata.isFile) {

            return results;

        }


        try {

            const content =
                await filesystemService.readFile(
                    packagePath
                );


            const packageJson =
                JSON.parse(content);


            const candidates:
                string[] = [];


            if (
                typeof packageJson.main === "string"
            ) {

                candidates.push(
                    packageJson.main
                );

            }


            if (
                typeof packageJson.browser === "string"
            ) {

                candidates.push(
                    packageJson.browser
                );

            }


            if (
                typeof packageJson.module === "string"
            ) {

                candidates.push(
                    packageJson.module
                );

            }


            if (
                packageJson.bin &&
                typeof packageJson.bin === "string"
            ) {

                candidates.push(
                    packageJson.bin
                );

            }


            if (
                packageJson.bin &&
                typeof packageJson.bin === "object"
            ) {

                for (
                    const value of Object.values(
                        packageJson.bin
                    )
                ) {

                    if (
                        typeof value === "string"
                    ) {

                        candidates.push(
                            value
                        );

                    }

                }

            }


            for (
                const candidate of candidates
            ) {

                const absolutePath =
                    path.resolve(
                        workspacePath,
                        candidate
                    );


                const candidateMetadata =
                    await filesystemService.getMetadata(
                        absolutePath
                    );


                if (
                    !candidateMetadata ||
                    !candidateMetadata.isFile
                ) {

                    continue;

                }


                results.push({

                    name:
                        this.getEntryPointName(
                            path.basename(
                                candidate
                            )
                        ),

                    path:
                        path.relative(
                            workspacePath,
                            absolutePath
                        ),

                    file:
                        path.basename(
                            candidate
                        ),

                    type:
                        "entry-point",

                    confidence:
                        "high",

                    reason:
                        "Declared by package.json."

                });

            }

        }
        catch {

            /**
             * Invalid package.json should not
             * prevent other entry-point detection.
             */
        }


        return results;

    }


    /**
     * Detect common entry-point filenames.
     */
    private getFilenameCandidate(
        fileName: string
    ): {
        confidence: "high" | "medium" | "low";
        reason: string;
    } | null {

        const lower =
            fileName.toLowerCase();


        /**
         * Strong entry point names.
         */
        const highConfidence = [

            "main.ts",
            "main.tsx",
            "main.js",
            "main.jsx",

            "server.ts",
            "server.tsx",
            "server.js",
            "server.jsx",

            "index.ts",
            "index.tsx",
            "index.js",
            "index.jsx"

        ];


        if (
            highConfidence.includes(
                lower
            )
        ) {

            return {

                confidence:
                    "high",

                reason:
                    "Common application entry-point filename."

            };

        }


        /**
         * Application files can also act
         * as startup points.
         */
        const mediumConfidence = [

            "app.ts",
            "app.tsx",
            "app.js",
            "app.jsx",

            "bootstrap.ts",
            "bootstrap.tsx",
            "bootstrap.js",
            "bootstrap.jsx"

        ];


        if (
            mediumConfidence.includes(
                lower
            )
        ) {

            return {

                confidence:
                    "medium",

                reason:
                    "Common application bootstrap filename."

            };

        }


        return null;

    }


    /**
     * Detect common application startup patterns.
     */
    private containsStartupCode(
        content: string
    ): boolean {

        const patterns = [

            /app\.listen\s*\(/i,

            /server\.listen\s*\(/i,

            /createServer\s*\(/i,

            /NestFactory\.create\s*\(/i,

            /express\s*\(\s*\)/i,

            /bootstrap\s*\(\s*\)/i,

            /ReactDOM\.createRoot\s*\(/i,

            /createRoot\s*\(/i,

            /mongoose\.connect\s*\(/i,

            /PrismaClient\s*\(/i

        ];


        return patterns.some(
            pattern =>
                pattern.test(
                    content
                )
        );

    }


    /**
     * Generate normalized entry-point name.
     */
    private getEntryPointName(
        fileName: string
    ): string {

        const base =
            fileName.replace(
                /\.(ts|tsx|js|jsx)$/i,
                ""
            );


        return (

            base.charAt(0).toUpperCase() +
            base.slice(1) +
            "EntryPoint"

        );

    }


    /**
     * Remove duplicate entry points.
     */
    private removeDuplicates(
        results: StructureEntryPoint[]
    ): StructureEntryPoint[] {

        const map =
            new Map<
                string,
                StructureEntryPoint
            >();


        for (
            const result of results
        ) {

            const existing =
                map.get(
                    result.path
                );


            if (!existing) {

                map.set(
                    result.path,
                    result
                );

                continue;

            }


            /**
             * Keep the higher-confidence result.
             */
            if (
                this.confidenceScore(
                    result.confidence
                ) >
                this.confidenceScore(
                    existing.confidence
                )
            ) {

                map.set(
                    result.path,
                    result
                );

            }

        }


        return Array.from(
            map.values()
        );

    }


    /**
     * Convert confidence into a sortable score.
     */
    private confidenceScore(
        confidence:
            "high" |
            "medium" |
            "low"
    ): number {

        switch (confidence) {

            case "high":
                return 3;

            case "medium":
                return 2;

            case "low":
                return 1;

            default:
                return 0;

        }

    }

}