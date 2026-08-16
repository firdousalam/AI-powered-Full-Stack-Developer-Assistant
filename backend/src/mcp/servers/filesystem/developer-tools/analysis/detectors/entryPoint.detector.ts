import {
    DetectorBase
} from "./base/detector.base";

import {
    DetectorResult
} from "../models";

import {
    workspaceReader
} from "../readers";


export class EntryPointDetector
    extends DetectorBase<string> {

    readonly name = "EntryPointDetector";


    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        /*
         * ============================================================
         * Node.js / TypeScript
         * ============================================================
         */

        const nodeEntryPoints = [

            "src/main.ts",
            "src/main.js",

            "src/server.ts",
            "src/server.js",

            "src/index.ts",
            "src/index.js",

            "src/app.ts",
            "src/app.js",

            "main.ts",
            "main.js",

            "server.ts",
            "server.js",

            "index.ts",
            "index.js",

            "app.ts",
            "app.js"

        ];


        for (const entryPoint of nodeEntryPoints) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {

                return this.success(
                    entryPoint
                );

            }

        }


        /*
         * ============================================================
         * Frontend
         * ============================================================
         */

        const frontendEntryPoints = [

            "src/main.tsx",
            "src/main.jsx",

            "src/index.tsx",
            "src/index.jsx",

            "src/App.tsx",
            "src/App.jsx"

        ];


        for (
            const entryPoint
            of frontendEntryPoints
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {

                return this.success(
                    entryPoint
                );

            }

        }


        /*
         * ============================================================
         * Next.js
         * ============================================================
         */

        const nextEntryPoints = [

            "app/page.tsx",
            "app/page.jsx",

            "src/app/page.tsx",
            "src/app/page.jsx",

            "pages/index.tsx",
            "pages/index.jsx",

            "src/pages/index.tsx",
            "src/pages/index.jsx"

        ];


        for (
            const entryPoint
            of nextEntryPoints
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {

                return this.success(
                    entryPoint
                );

            }

        }


        /*
         * ============================================================
         * Python
         * ============================================================
         */

        const pythonEntryPoints = [

            "main.py",
            "app.py",
            "server.py",

            "src/main.py",
            "src/app.py",
            "src/server.py"

        ];


        for (
            const entryPoint
            of pythonEntryPoints
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {

                return this.success(
                    entryPoint
                );

            }

        }


        /*
         * ============================================================
         * Java / Spring Boot
         * ============================================================
         */

        const javaEntryPoints = [

            "src/main/java/Application.java",
            "src/main/java/Main.java"

        ];


        for (
            const entryPoint
            of javaEntryPoints
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {

                return this.success(
                    entryPoint
                );

            }

        }


        /*
         * ============================================================
         * Go
         * ============================================================
         */

        const goEntryPoints = [

            "main.go",
            "cmd/main.go"

        ];


        for (
            const entryPoint
            of goEntryPoints
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {

                return this.success(
                    entryPoint
                );

            }

        }


        /*
         * ============================================================
         * Rust
         * ============================================================
         */

        const rustEntryPoints = [

            "src/main.rs",
            "src/lib.rs"

        ];


        for (
            const entryPoint
            of rustEntryPoints
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {

                return this.success(
                    entryPoint
                );

            }

        }


        /*
         * ============================================================
         * C / C++
         * ============================================================
         */

        const cppEntryPoints = [

            "main.cpp",
            "main.cc",
            "main.cxx",
            "main.c",

            "src/main.cpp",
            "src/main.cc",
            "src/main.cxx",
            "src/main.c"

        ];


        for (
            const entryPoint
            of cppEntryPoints
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {

                return this.success(
                    entryPoint
                );

            }

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