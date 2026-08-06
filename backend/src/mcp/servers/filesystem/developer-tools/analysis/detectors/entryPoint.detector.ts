import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export class EntryPointDetector extends DetectorBase<string> {

    readonly name = "EntryPointDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        const entryPoints = [

            // NestJS / Backend
            "src/main.ts",
            "src/server.ts",
            "src/index.ts",

            // JavaScript
            "src/main.js",
            "src/server.js",
            "src/index.js",

            // Root
            "main.ts",
            "server.ts",
            "index.ts",

            "main.js",
            "server.js",
            "index.js",

            "app.ts",
            "app.js"

        ];

        for (const entry of entryPoints) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    entry
                )
            ) {

                return this.success(entry);

            }

        }

        return this.success("Unknown");

    }

}