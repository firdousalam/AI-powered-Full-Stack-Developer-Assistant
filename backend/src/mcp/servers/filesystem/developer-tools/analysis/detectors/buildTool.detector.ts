import {
    DetectorBase
} from "./base/detector.base";

import {
    DetectorResult
} from "../models";

import {
    workspaceReader
} from "../readers";


export class BuildToolDetector
    extends DetectorBase<string> {

    readonly name = "BuildToolDetector";


    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        /*
         * ============================================================
         * Frontend / JavaScript / TypeScript
         * ============================================================
         */

        const frontendBuildTools: Record<string, string> = {

            "vite.config.ts":
                "Vite",

            "vite.config.js":
                "Vite",

            "vite.config.mjs":
                "Vite",

            "vite.config.cjs":
                "Vite",

            "webpack.config.js":
                "Webpack",

            "webpack.config.ts":
                "Webpack",

            "webpack.config.mjs":
                "Webpack",

            "webpack.config.cjs":
                "Webpack",

            "rollup.config.js":
                "Rollup",

            "rollup.config.ts":
                "Rollup",

            "rollup.config.mjs":
                "Rollup",

            "rollup.config.cjs":
                "Rollup",

            ".parcelrc":
                "Parcel",

            "parcel.config.js":
                "Parcel",

            "parcel.config.ts":
                "Parcel",

            "esbuild.config.js":
                "esbuild",

            "esbuild.config.ts":
                "esbuild",

            "esbuild.config.mjs":
                "esbuild",

            "tsup.config.ts":
                "tsup",

            "tsup.config.js":
                "tsup",

            "gulpfile.js":
                "Gulp",

            "gulpfile.ts":
                "Gulp",

            "Gruntfile.js":
                "Grunt",

            "Gruntfile.ts":
                "Grunt"

        };


        for (
            const [file, tool]
            of Object.entries(frontendBuildTools)
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {

                return this.success(tool);

            }

        }


        /*
         * ============================================================
         * Monorepo / Build Orchestration
         * ============================================================
         */

        const monorepoBuildTools: Record<string, string> = {

            "turbo.json":
                "Turbo",

            "nx.json":
                "Nx",

            "lerna.json":
                "Lerna",

            "rush.json":
                "Rush"

        };


        for (
            const [file, tool]
            of Object.entries(monorepoBuildTools)
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {

                return this.success(tool);

            }

        }


        /*
         * ============================================================
         * Next.js
         * ============================================================
         *
         * Next.js has its own build system.
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "next.config.js"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "next.config.mjs"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "next.config.ts"
            )
        ) {

            return this.success(
                "Next.js"
            );

        }


        /*
         * ============================================================
         * Java / JVM
         * ============================================================
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "pom.xml"
            )
        ) {

            return this.success(
                "Maven"
            );

        }


        if (
            await workspaceReader.exists(
                workspacePath,
                "build.gradle"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "build.gradle.kts"
            )
        ) {

            return this.success(
                "Gradle"
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
                "pyproject.toml"
            )
        ) {

            /*
             * pyproject.toml can be used by multiple tools.
             * We use it as a generic Python build/project
             * configuration indicator here.
             */
            return this.success(
                "Python Build"
            );

        }


        if (
            await workspaceReader.exists(
                workspacePath,
                "setup.py"
            )
        ) {

            return this.success(
                "setuptools"
            );

        }


        if (
            await workspaceReader.exists(
                workspacePath,
                "setup.cfg"
            )
        ) {

            return this.success(
                "setuptools"
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
                "Cargo"
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
         * C / C++
         * ============================================================
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "CMakeLists.txt"
            )
        ) {

            return this.success(
                "CMake"
            );

        }


        if (
            await workspaceReader.exists(
                workspacePath,
                "Makefile"
            )
        ) {

            return this.success(
                "Make"
            );

        }


        /*
         * ============================================================
         * Unknown
         * ============================================================
         */

        return this.success(
            "Unknown"
        );

    }

}