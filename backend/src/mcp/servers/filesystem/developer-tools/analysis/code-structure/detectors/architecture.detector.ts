import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureArchitecture
} from "../models";


/**
 * Detects the architectural style of a project.
 *
 * Responsibilities:
 * - Inspect project directories
 * - Identify common architectural patterns
 * - Collect architecture evidence
 * - Calculate a simple confidence score
 *
 * This detector does not analyze business logic.
 */
export class ArchitectureDetector
    implements CodeStructureDetector<StructureArchitecture> {

    readonly name =
        "ArchitectureDetector";


    /**
     * Detect project architecture.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<StructureArchitecture>
    > {

        try {

            const directories =
                await this.collectDirectories(
                    workspacePath
                );


            const architecture =
                this.detectArchitecture(
                    directories
                );


            return {

                detector:
                    this.name,

                success:
                    true,

                data:
                    architecture,

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
                    this.emptyResult(),

                warnings: [

                    error instanceof Error
                        ? error.message
                        : "Failed to detect architecture."

                ]

            };

        }

    }


    /**
     * Recursively collect project directories.
     *
     * IMPORTANT:
     *
     * filesystemService.listDirectory()
     * returns DirectoryInfo.
     *
     * Therefore:
 *
     * directoryInfo.entries
     *
     * is the array.
     *
     * Do NOT use:
 *
     * directoryInfo.entries()
     */
    private async collectDirectories(
        workspacePath: string
    ): Promise<string[]> {

        const directories: string[] = [];


        await this.scanDirectory(
            workspacePath,
            ".",
            directories
        );


        return directories;

    }


    private async scanDirectory(
        workspacePath: string,
        relativePath: string,
        directories: string[]
    ): Promise<void> {

        const directoryEntries =
            await filesystemService.listDirectory(
                relativePath
            );

        for (const entry of directoryEntries) {

            const childPath =
                path.join(
                    relativePath,
                    entry
                );

            const metadata =
                await filesystemService.getMetadata(
                    childPath
                );

            if (!metadata) {
                continue;
            }

            if (!metadata.isDirectory) {
                continue;
            }

            directories.push(
                childPath
            );

            await this.scanDirectory(
                workspacePath,
                childPath,
                directories
            );
        }
    }


    /**
     * Determine architecture from
     * directory structure.
     */
    private detectArchitecture(
        directories: string[]
    ): StructureArchitecture {

        const normalized =
            directories.map(
                directory =>
                    directory
                        .replace(/\\/g, "/")
                        .toLowerCase()
            );


        const directoryNames =
            normalized.map(
                directory =>
                    path.basename(directory)
            );


        const has =
            (name: string): boolean =>
                directoryNames.includes(name);


        const patterns: string[] = [];

        const evidence: string[] = [];


        /*
         * ========================================================
         * MVC
         * ========================================================
         */

        const hasControllers =
            has("controllers");

        const hasModels =
            has("models");

        const hasRoutes =
            has("routes");

        const hasServices =
            has("services");


        if (
            hasControllers &&
            hasModels &&
            hasRoutes
        ) {

            patterns.push("MVC");

            evidence.push(
                "controllers, models, and routes directories detected."
            );

        }


        /*
         * ========================================================
         * Layered Architecture
         * ========================================================
         */

        if (
            hasControllers &&
            hasServices &&
            hasRoutes
        ) {

            patterns.push("Layered");

            evidence.push(
                "controllers, services, and routes directories detected."
            );

        }


        /*
         * ========================================================
         * Modular Architecture
         * ========================================================
         */

        const hasModules =
            has("modules");


        if (hasModules) {

            patterns.push("Modular");

            evidence.push(
                "modules directory detected."
            );

        }


        /*
         * ========================================================
         * Feature-Based Architecture
         * ========================================================
         */

        const hasFeatures =
            has("features");


        if (hasFeatures) {

            patterns.push("Feature-based");

            evidence.push(
                "features directory detected."
            );

        }


        /*
         * ========================================================
         * Microservices
         * ========================================================
         */

        const hasServicesDirectory =
            directoryNames.filter(
                name =>
                    name === "services"
            ).length > 1;


        const hasServiceDirectories =
            normalized.some(
                directory =>
                    directory.includes("/services/")
            );


        if (
            hasServiceDirectories ||
            hasServicesDirectory
        ) {

            patterns.push("Microservices");

            evidence.push(
                "multiple service-oriented directories detected."
            );

        }


        /*
         * ========================================================
         * Monolithic
         * ========================================================
         */

        const hasSingleApplicationStructure =
            (
                hasControllers ||
                hasServices ||
                hasModels ||
                hasRoutes
            ) &&
            !hasModules &&
            !hasFeatures;


        if (
            hasSingleApplicationStructure &&
            patterns.length === 0
        ) {

            patterns.push("Monolithic");

            evidence.push(
                "single application-oriented directory structure detected."
            );

        }


        /*
         * ========================================================
         * Determine Primary Architecture
         * ========================================================
         */

        let architecture:
            StructureArchitecture["architecture"];


        if (
            patterns.includes("Microservices")
        ) {

            architecture =
                "microservices";

        }
        else if (
            patterns.includes("Feature-based")
        ) {

            architecture =
                "feature-based";

        }
        else if (
            patterns.includes("Modular")
        ) {

            architecture =
                "modular";

        }
        else if (
            patterns.includes("Layered")
        ) {

            architecture =
                "layered";

        }
        else if (
            patterns.includes("MVC")
        ) {

            architecture =
                "mvc";

        }
        else if (
            patterns.includes("Monolithic")
        ) {

            architecture =
                "monolithic";

        }
        else {

            architecture =
                "unknown";

        }


        /*
         * ========================================================
         * Confidence
         * ========================================================
         */

        const confidence =
            this.calculateConfidence(
                patterns.length
            );


        return {

            architecture,

            confidence,

            patterns,

            evidence

        };

    }


    /**
     * Calculate architecture confidence.
     */
    private calculateConfidence(
        patternCount: number
    ): number {

        if (patternCount >= 3) {

            return 0.95;

        }

        if (patternCount === 2) {

            return 0.85;

        }

        if (patternCount === 1) {

            return 0.70;

        }

        return 0;

    }


    /**
     * Empty architecture result.
     */
    private emptyResult(): StructureArchitecture {

        return {

            architecture:
                "unknown",

            confidence:
                0,

            patterns:
                [],

            evidence:
                []

        };

    }

}