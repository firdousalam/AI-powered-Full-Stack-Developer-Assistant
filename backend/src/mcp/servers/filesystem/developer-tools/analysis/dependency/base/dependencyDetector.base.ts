import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    PackageManagerType,
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
 * - Detect package manager from known project files
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


    /**
     * Detect package manager from known
     * package manager configuration/lock files.
     *
     * This method is intentionally implemented
     * in the base class because the detection logic
     * is shared by dependency detectors.
     */
    protected async findLockFile(
        workspacePath: string
    ): Promise<{
        packageManager: PackageManagerType;
        lockFile: string;
    }> {

        const lockFiles: Array<{
            packageManager: PackageManagerType;
            file: string;
        }> = [

                /*
                 * Node.js
                 */
                {
                    packageManager: "bun",
                    file: "bun.lock"
                },

                {
                    packageManager: "bun",
                    file: "bun.lockb"
                },

                {
                    packageManager: "pnpm",
                    file: "pnpm-lock.yaml"
                },

                {
                    packageManager: "yarn",
                    file: "yarn.lock"
                },

                {
                    packageManager: "npm",
                    file: "package-lock.json"
                },

                {
                    packageManager: "npm",
                    file: "npm-shrinkwrap.json"
                },

                /*
                 * Python
                 */
                {
                    packageManager: "uv",
                    file: "uv.lock"
                },

                {
                    packageManager: "poetry",
                    file: "poetry.lock"
                },

                {
                    packageManager: "pipenv",
                    file: "Pipfile.lock"
                },

                {
                    packageManager: "pip",
                    file: "requirements.txt"
                },

                /*
                 * Java / JVM
                 */
                {
                    packageManager: "maven",
                    file: "pom.xml"
                },

                {
                    packageManager: "gradle",
                    file: "gradle.lockfile"
                },

                {
                    packageManager: "gradle",
                    file: "build.gradle"
                },

                {
                    packageManager: "gradle",
                    file: "build.gradle.kts"
                },

                /*
                 * Rust
                 */
                {
                    packageManager: "cargo",
                    file: "Cargo.toml"
                },

                /*
                 * Go
                 */
                {
                    packageManager: "go",
                    file: "go.sum"
                },

                {
                    packageManager: "go",
                    file: "go.mod"
                },

                /*
                 * Ruby
                 */
                {
                    packageManager: "bundler",
                    file: "Gemfile.lock"
                },

                {
                    packageManager: "bundler",
                    file: "Gemfile"
                },

                /*
                 * PHP
                 */
                {
                    packageManager: "composer",
                    file: "composer.lock"
                },

                {
                    packageManager: "composer",
                    file: "composer.json"
                },

                /*
                 * Dart / Flutter
                 */
                {
                    packageManager: "pub",
                    file: "pubspec.lock"
                },

                {
                    packageManager: "pub",
                    file: "pubspec.yaml"
                }

            ];


        for (const lockFile of lockFiles) {

            const filePath =
                path.join(
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

        const packageJsonPath =
            path.join(
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