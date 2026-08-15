import { FilesystemService } from "../../../filesystem.service";

import {
    DetectorBase
} from "./base/detector.base";

import {
    ProjectMetadata
} from "../models";

export class MetadataDetector
    extends DetectorBase<ProjectMetadata> {

    readonly name = "metadata";

    constructor(
        private readonly filesystemService: FilesystemService
    ) {
        super();
    }

    async detect(
        workspacePath: string
    ) {

        try {

            const packageFile =
                await this.filesystemService.readFile(
                    "package.json"
                );

            const packageJson =
                JSON.parse(
                    packageFile.content.toString()
                );

            const metadata: ProjectMetadata = {

                name:
                    typeof packageJson.name === "string"
                        ? packageJson.name
                        : undefined,

                version:
                    typeof packageJson.version === "string"
                        ? packageJson.version
                        : undefined,

                description:
                    typeof packageJson.description === "string"
                        ? packageJson.description
                        : undefined,

                author:
                    typeof packageJson.author === "string"
                        ? packageJson.author
                        : undefined,

                license:
                    typeof packageJson.license === "string"
                        ? packageJson.license
                        : undefined

            };

            return this.success(
                metadata
            );

        } catch (error) {

            return this.failure([
                error instanceof Error
                    ? `Unable to read project metadata: ${error.message}`
                    : "Unable to read project metadata."
            ]);

        }

    }

}