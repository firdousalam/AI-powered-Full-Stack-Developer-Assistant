import {
    DetectorBase
} from "./base/detector.base";

import {
    DetectorResult
} from "../models";

import {
    workspaceReader
} from "../readers";


export interface DockerInfo {

    detected: boolean;

    dockerfile?: string;

    composeFile?: string;

    dockerignore: boolean;

}


export class DockerDetector
    extends DetectorBase<DockerInfo> {

    readonly name = "DockerDetector";


    async detect(
        workspacePath: string
    ): Promise<DetectorResult<DockerInfo>> {

        /*
         * ============================================================
         * Dockerfile
         * ============================================================
         */

        const dockerfiles = [

            "Dockerfile",

            "Dockerfile.dev",

            "Dockerfile.development",

            "Dockerfile.prod",

            "Dockerfile.production",

            "Dockerfile.test"

        ];


        let dockerfile: string | undefined;


        for (const file of dockerfiles) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {

                dockerfile = file;

                break;

            }

        }


        /*
         * ============================================================
         * Docker Compose
         * ============================================================
         */

        const composeFiles = [

            "docker-compose.yml",

            "docker-compose.yaml",

            "compose.yml",

            "compose.yaml"

        ];


        let composeFile: string | undefined;


        for (const file of composeFiles) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {

                composeFile = file;

                break;

            }

        }


        /*
         * ============================================================
         * .dockerignore
         * ============================================================
         */

        const dockerignore =
            await workspaceReader.exists(
                workspacePath,
                ".dockerignore"
            );


        /*
         * ============================================================
         * Docker directory
         * ============================================================
         */

        const dockerDirectory =
            await workspaceReader.exists(
                workspacePath,
                "docker"
            );


        /*
         * ============================================================
         * Detection result
         * ============================================================
         */

        const detected =
            Boolean(
                dockerfile ||
                composeFile ||
                dockerignore ||
                dockerDirectory
            );


        return this.success({

            detected,

            dockerfile,

            composeFile,

            dockerignore

        });

    }

}