import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export interface DockerInfo {

    supported: boolean;

    dockerfile: boolean;

    dockerCompose: boolean;

    composeFiles: string[];

}

export class DockerDetector
    extends DetectorBase<DockerInfo> {

    readonly name = "DockerDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<DockerInfo>> {

        const dockerfile =
            await workspaceReader.exists(
                workspacePath,
                "Dockerfile"
            );

        const composeFiles: string[] = [];

        if (
            await workspaceReader.exists(
                workspacePath,
                "docker-compose.yml"
            )
        ) {

            composeFiles.push(
                "docker-compose.yml"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "docker-compose.yaml"
            )
        ) {

            composeFiles.push(
                "docker-compose.yaml"
            );

        }

        return this.success({

            supported:
                dockerfile ||
                composeFiles.length > 0,

            dockerfile,

            dockerCompose:
                composeFiles.length > 0,

            composeFiles

        });

    }

}