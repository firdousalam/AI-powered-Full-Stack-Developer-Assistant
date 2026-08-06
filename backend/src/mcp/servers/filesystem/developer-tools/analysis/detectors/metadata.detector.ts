import path from "node:path";

import { filesystemService } from "../../../services";

import {
    ProjectDetector,
    DetectorResult,
    ProjectMetadata
} from "../models"

export class MetadataDetector
    implements ProjectDetector<ProjectMetadata> {

    readonly name = "MetadataDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<ProjectMetadata>> {

        const packageJsonPath = path.join(
            workspacePath,
            "package.json"
        );

        const exists =
            await filesystemService.exists(
                packageJsonPath
            );

        if (!exists) {

            return {

                detector: this.name,

                success: true,

                data: {

                    name: "",

                    version: "",

                    description: "",

                    author: "",

                    license: ""

                },

                warnings: [
                    "package.json not found."
                ]

            };

        }

        try {

            const content =
                await filesystemService.readFile(
                    packageJsonPath
                );

            const packageJson =
                JSON.parse(content);

            return {

                detector: this.name,

                success: true,

                data: {

                    name:
                        packageJson.name ?? "",

                    version:
                        packageJson.version ?? "",

                    description:
                        packageJson.description ?? "",

                    author:
                        typeof packageJson.author === "string"
                            ? packageJson.author
                            : packageJson.author?.name ?? "",

                    license:
                        packageJson.license ?? ""

                },

                warnings: []

            };

        } catch {

            return {

                detector: this.name,

                success: false,

                data: {

                    name: "",

                    version: "",

                    description: "",

                    author: "",

                    license: ""

                },

                warnings: [
                    "Failed to parse package.json."
                ]

            };

        }

    }

}