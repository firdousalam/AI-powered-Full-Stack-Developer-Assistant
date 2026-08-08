import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

import {
    PackageManagerInfo
} from "../models";

export class PackageManagerDetector
    extends DependencyDetectorBase<PackageManagerInfo> {

    /**
     * Detector name.
     */
    readonly name = "PackageManagerDetector";

    /**
     * Default result.
     */
    protected emptyResult(): PackageManagerInfo {

        return {

            name: "unknown",

            lockFile: ""

        };

    }
    /**
 * Finds the project's lock file.
 */
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

        const candidates = [

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

        for (const candidate of candidates) {

            const filePath = path.join(
                workspacePath,
                candidate.file
            );

            const exists =
                await filesystemService.exists(
                    filePath
                );

            if (exists) {

                return {

                    packageManager:
                        candidate.packageManager,

                    lockFile:
                        candidate.file

                };

            }

        }

        return {

            packageManager: "unknown",

            lockFile: ""

        };

    }

    /**
     * Detect the package manager by
     * inspecting lock files.
     */
    protected async detectInternal(
        _packageJson: Record<string, any>,
        workspacePath: string
    ): Promise<PackageManagerInfo> {

        const result =
            await this.findLockFile(
                workspacePath
            );

        return {

            name:
                result.packageManager,

            lockFile:
                result.lockFile

        };

    }
}