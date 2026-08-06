import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export class BuildToolDetector extends DetectorBase<string> {

    readonly name = "BuildToolDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        const buildTools: Record<string, string> = {

            // Frontend
            "vite.config.ts": "Vite",
            "vite.config.js": "Vite",

            "webpack.config.js": "Webpack",
            "webpack.config.ts": "Webpack",

            "rollup.config.js": "Rollup",
            "rollup.config.ts": "Rollup",

            // Monorepo
            "turbo.json": "Turbo",
            "nx.json": "Nx",

            // Java
            "pom.xml": "Maven",
            "build.gradle": "Gradle",

            // Python
            "pyproject.toml": "Poetry",

            // Rust
            "Cargo.toml": "Cargo"

        };

        for (const [file, tool] of Object.entries(buildTools)) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {

                return this.success(tool);

            }

        }

        return this.success("Unknown");

    }

}