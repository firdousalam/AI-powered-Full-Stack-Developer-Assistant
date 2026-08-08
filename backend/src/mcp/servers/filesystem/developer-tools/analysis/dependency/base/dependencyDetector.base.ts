import path from "node:path";

import { filesystemService } from "../../../../services";

import {
    DependencyDetector,
    DependencyDetectorResult
} from "../models";

/**
 * Base class for all dependency detectors.
 *
 * Responsibilities:
 * - Locate package.json
 * - Read package.json
 * - Parse JSON safely
 * - Provide a standard DetectorResult
 * - Handle common errors
 */
export abstract class DependencyDetectorBase<TResult>
    implements DependencyDetector<TResult> {

    /**
     * Detector name.
     */
    abstract readonly name: string;



    /**
     * Child detectors implement only their own
     * extraction logic.
     */
    protected abstract detectInternal(
        packageJson: Record<string, any>,
        workspacePath: string
    ): Promise<TResult>;

    /**
     * Empty/default result returned when
     * package.json is missing or detection fails.
     */
    protected abstract emptyResult(): TResult;

    protected async findLockFile(
        workspacePath: string
    ): Promise<{

        packageManager:
        | "npm"
        | "yarn"
        | "pnpm"
        | "bun"
        | "unknown";

        lockFile: string;

    }> {

        const lockFiles = [

            {

                packageManager: "bun" as const,

                file: "bun.lockb"

            },

            {

                packageManager: "pnpm" as const,

                file: "pnpm-lock.yaml"

            },

            {

                packageManager: "yarn" as const,

                file: "yarn.lock"

            },

            {

                packageManager: "npm" as const,

                file: "package-lock.json"

            }

        ];

        for (const lockFile of lockFiles) {

            const filePath = path.join(

                workspacePath,

                lockFile.file

            );

            const exists =
                await filesystemService.exists(
                    filePath
                );

            if (exists) {

                return {

                    packageManager:
                        lockFile.packageManager,

                    lockFile:
                        lockFile.file

                };

            }

        }

        return {

            packageManager: "unknown",

            lockFile: ""

        };

    }

    /**
     * Standard detection pipeline.
     */
    async detect(
        workspacePath: string
    ): Promise<DependencyDetectorResult<TResult>> {

        const packageJsonPath = path.join(
            workspacePath,
            "package.json"
        );

        try {

            const exists =
                await filesystemService.exists(
                    packageJsonPath
                );

            if (!exists) {

                return {

                    detector: this.name,

                    success: false,

                    data: this.emptyResult(),

                    warnings: [
                        "package.json not found."
                    ]

                };

            }

            const content =
                await filesystemService.readFile(
                    packageJsonPath
                );

            const packageJson =
                JSON.parse(content);

            const result =
                await this.detectInternal(
                    packageJson,
                    workspacePath
                );

            return {

                detector: this.name,

                success: true,

                data: result,

                warnings: []

            };

        } catch (error) {

            return {

                detector: this.name,

                success: false,

                data: this.emptyResult(),

                warnings: [

                    error instanceof Error
                        ? error.message
                        : "Unknown detector error"

                ]

            };

        }

    }

}