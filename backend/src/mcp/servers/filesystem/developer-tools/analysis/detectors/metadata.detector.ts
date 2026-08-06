import { DetectorBase } from "./base/detector.base";

import {
    DetectorResult
} from "../models";

import { workspaceReader } from "../readers";

export interface ProjectMetadata {

    projectName?: string;

    description?: string;

    version?: string;

    author?: string;

    license?: string;

}

export class MetadataDetector
    extends DetectorBase<ProjectMetadata> {

    readonly name = "MetadataDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<ProjectMetadata>> {

        const packageJson =
            await workspaceReader.readPackageJson<any>(
                workspacePath
            );

        if (!packageJson) {

            return this.failure([
                "package.json not found."
            ]);

        }

        return this.success({

            projectName: packageJson.name,

            description: packageJson.description,

            version: packageJson.version,

            author: packageJson.author,

            license: packageJson.license

        });

    }

}