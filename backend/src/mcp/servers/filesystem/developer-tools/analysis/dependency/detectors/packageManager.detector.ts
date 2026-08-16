import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

import {
    PackageManagerInfo,
    PackageManagerType
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
     * Finds the project's package manager
     * by inspecting known lock/configuration files.
     *
     * The return type uses the shared PackageManagerType
     * so that this detector remains compatible with
     * DependencyDetectorBase and PackageManagerInfo.
     */
    protected async findLockFile(
        workspacePath: string
    ): Promise<{

        packageManager: PackageManagerType;

        lockFile: string;

    }> {

        /*
         * ============================================================
         * Node.js
         * ============================================================
         */

        const nodeCandidates: Array<{
            packageManager:
            | "bun"
            | "pnpm"
            | "yarn"
            | "npm";

            files: string[];

        }> = [

                {
                    packageManager: "bun",

                    files: [
                        "bun.lock",
                        "bun.lockb"
                    ]

                },

                {
                    packageManager: "pnpm",

                    files: [
                        "pnpm-lock.yaml"
                    ]

                },

                {
                    packageManager: "yarn",

                    files: [
                        "yarn.lock"
                    ]

                },

                {
                    packageManager: "npm",

                    files: [
                        "package-lock.json",
                        "npm-shrinkwrap.json"
                    ]

                }

            ];


        for (const candidate of nodeCandidates) {

            for (const file of candidate.files) {

                const filePath =
                    path.join(
                        workspacePath,
                        file
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
                            file

                    };

                }

            }

        }


        /*
         * ============================================================
         * Python
         * ============================================================
         */

        const pythonCandidates: Array<{
            packageManager:
            | "uv"
            | "poetry"
            | "pipenv"
            | "pip";

            files: string[];

        }> = [

                {
                    packageManager: "uv",

                    files: [
                        "uv.lock"
                    ]

                },

                {
                    packageManager: "poetry",

                    files: [
                        "poetry.lock"
                    ]

                },

                {
                    packageManager: "pipenv",

                    files: [
                        "Pipfile.lock"
                    ]

                },

                {
                    packageManager: "pip",

                    files: [
                        "requirements.txt"
                    ]

                }

            ];


        for (const candidate of pythonCandidates) {

            for (const file of candidate.files) {

                const filePath =
                    path.join(
                        workspacePath,
                        file
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
                            file

                    };

                }

            }

        }


        /*
         * ============================================================
         * Maven
         * ============================================================
         */

        const mavenPath =
            path.join(
                workspacePath,
                "pom.xml"
            );

        if (
            await filesystemService.exists(
                mavenPath
            )
        ) {

            return {

                packageManager: "maven",

                lockFile: "pom.xml"

            };

        }


        /*
         * ============================================================
         * Gradle
         * ============================================================
         */

        const gradleLockPath =
            path.join(
                workspacePath,
                "gradle.lockfile"
            );

        const gradleBuildPath =
            path.join(
                workspacePath,
                "build.gradle"
            );

        const gradleKotlinPath =
            path.join(
                workspacePath,
                "build.gradle.kts"
            );


        if (
            await filesystemService.exists(
                gradleLockPath
            )
        ) {

            return {

                packageManager: "gradle",

                lockFile: "gradle.lockfile"

            };

        }


        if (
            await filesystemService.exists(
                gradleBuildPath
            )
        ) {

            return {

                packageManager: "gradle",

                lockFile: "build.gradle"

            };

        }


        if (
            await filesystemService.exists(
                gradleKotlinPath
            )
        ) {

            return {

                packageManager: "gradle",

                lockFile: "build.gradle.kts"

            };

        }


        /*
         * ============================================================
         * Rust
         * ============================================================
         */

        const cargoPath =
            path.join(
                workspacePath,
                "Cargo.toml"
            );

        if (
            await filesystemService.exists(
                cargoPath
            )
        ) {

            return {

                packageManager: "cargo",

                lockFile: "Cargo.toml"

            };

        }


        /*
         * ============================================================
         * Go
         * ============================================================
         */

        const goSumPath =
            path.join(
                workspacePath,
                "go.sum"
            );

        const goModPath =
            path.join(
                workspacePath,
                "go.mod"
            );


        if (
            await filesystemService.exists(
                goSumPath
            )
        ) {

            return {

                packageManager: "go",

                lockFile: "go.sum"

            };

        }


        if (
            await filesystemService.exists(
                goModPath
            )
        ) {

            return {

                packageManager: "go",

                lockFile: "go.mod"

            };

        }


        /*
         * ============================================================
         * Ruby
         * ============================================================
         */

        const gemfileLockPath =
            path.join(
                workspacePath,
                "Gemfile.lock"
            );

        const gemfilePath =
            path.join(
                workspacePath,
                "Gemfile"
            );


        if (
            await filesystemService.exists(
                gemfileLockPath
            )
        ) {

            return {

                packageManager: "bundler",

                lockFile: "Gemfile.lock"

            };

        }


        if (
            await filesystemService.exists(
                gemfilePath
            )
        ) {

            return {

                packageManager: "bundler",

                lockFile: "Gemfile"

            };

        }


        /*
         * ============================================================
         * PHP
         * ============================================================
         */

        const composerLockPath =
            path.join(
                workspacePath,
                "composer.lock"
            );

        const composerPath =
            path.join(
                workspacePath,
                "composer.json"
            );


        if (
            await filesystemService.exists(
                composerLockPath
            )
        ) {

            return {

                packageManager: "composer",

                lockFile: "composer.lock"

            };

        }


        if (
            await filesystemService.exists(
                composerPath
            )
        ) {

            return {

                packageManager: "composer",

                lockFile: "composer.json"

            };

        }


        /*
         * ============================================================
         * Dart / Flutter
         * ============================================================
         */

        const pubspecLockPath =
            path.join(
                workspacePath,
                "pubspec.lock"
            );

        const pubspecPath =
            path.join(
                workspacePath,
                "pubspec.yaml"
            );


        if (
            await filesystemService.exists(
                pubspecLockPath
            )
        ) {

            return {

                packageManager: "pub",

                lockFile: "pubspec.lock"

            };

        }


        if (
            await filesystemService.exists(
                pubspecPath
            )
        ) {

            return {

                packageManager: "pub",

                lockFile: "pubspec.yaml"

            };

        }


        /*
         * ============================================================
         * Unknown
         * ============================================================
         */

        return {

            packageManager: "unknown",

            lockFile: ""

        };

    }


    /**
     * Detect package manager.
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