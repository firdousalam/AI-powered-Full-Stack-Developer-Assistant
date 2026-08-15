import { DetectorBase } from "./base/detector.base";

import {
    DetectorResult
} from "../models";

import {
    workspaceReader
} from "../readers";


export class RuntimeDetector
    extends DetectorBase<string> {

    readonly name = "RuntimeDetector";


    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        try {

            /*
             * ============================================================
             * Node.js / JavaScript / TypeScript
             * ============================================================
             *
             * package.json is the primary project descriptor for the
             * Node.js ecosystem.
             *
             * We intentionally detect Node.js here rather than returning
             * the framework name. Framework detection is handled by the
             * FrameworkDetector.
             */

            const packageJson =
                await workspaceReader.readPackageJson<any>(
                    workspacePath
                );

            if (packageJson) {

                return this.success(
                    "Node.js"
                );

            }


            /*
             * ============================================================
             * Python
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "requirements.txt"
                )
            ) {

                return this.success(
                    "Python"
                );

            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "pyproject.toml"
                )
            ) {

                return this.success(
                    "Python"
                );

            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "Pipfile"
                )
            ) {

                return this.success(
                    "Python"
                );

            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "setup.py"
                )
            ) {

                return this.success(
                    "Python"
                );

            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "setup.cfg"
                )
            ) {

                return this.success(
                    "Python"
                );

            }


            /*
             * ============================================================
             * Java / JVM
             * ============================================================
             *
             * Maven and Gradle projects run on the JVM.
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "pom.xml"
                )
            ) {

                return this.success(
                    "JVM"
                );

            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "build.gradle"
                )
            ) {

                return this.success(
                    "JVM"
                );

            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "build.gradle.kts"
                )
            ) {

                return this.success(
                    "JVM"
                );

            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "build.sbt"
                )
            ) {

                return this.success(
                    "JVM"
                );

            }


            /*
             * ============================================================
             * Go
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "go.mod"
                )
            ) {

                return this.success(
                    "Go"
                );

            }


            /*
             * ============================================================
             * Rust
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "Cargo.toml"
                )
            ) {

                return this.success(
                    "Rust"
                );

            }


            /*
             * ============================================================
             * .NET
             * ============================================================
             *
             * global.json is the standard .NET SDK configuration file.
             *
             * We intentionally do not use wildcard patterns such as
             * "*.csproj" because the current workspaceReader.exists()
             * contract has not been established to support glob patterns.
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "global.json"
                )
            ) {

                return this.success(
                    ".NET"
                );

            }


            /*
             * ============================================================
             * PHP
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "composer.json"
                )
            ) {

                return this.success(
                    "PHP"
                );

            }


            /*
             * ============================================================
             * Ruby
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "Gemfile"
                )
            ) {

                return this.success(
                    "Ruby"
                );

            }


            /*
             * ============================================================
             * Dart / Flutter
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "pubspec.yaml"
                )
            ) {

                return this.success(
                    "Dart"
                );

            }


            /*
             * ============================================================
             * Elixir / BEAM
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "mix.exs"
                )
            ) {

                return this.success(
                    "BEAM"
                );

            }


            /*
             * ============================================================
             * Erlang / BEAM
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "rebar.config"
                )
            ) {

                return this.success(
                    "BEAM"
                );

            }


            /*
             * ============================================================
             * Clojure / JVM
             * ============================================================
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "project.clj"
                )
            ) {

                return this.success(
                    "JVM"
                );

            }


            /*
             * ============================================================
             * Unknown Runtime
             * ============================================================
             */

            return this.success(
                "Unknown"
            );

        } catch (error) {

            return this.failure([

                error instanceof Error
                    ? `Unable to detect runtime: ${error.message}`
                    : "Unable to detect runtime."

            ]);

        }

    }

}