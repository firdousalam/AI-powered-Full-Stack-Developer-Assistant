import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export interface CiInfo {

    supported: boolean;

    provider: string;

    configurationFiles: string[];

}

export class CiDetector
    extends DetectorBase<CiInfo> {

    readonly name = "CiDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<CiInfo>> {

        const configurationFiles: string[] = [];

        let provider = "Unknown";

        const checks = [

            {
                file: ".github/workflows",
                provider: "GitHub Actions"
            },

            {
                file: ".gitlab-ci.yml",
                provider: "GitLab CI"
            },

            {
                file: "azure-pipelines.yml",
                provider: "Azure DevOps"
            },

            {
                file: "Jenkinsfile",
                provider: "Jenkins"
            }

        ];

        for (const check of checks) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    check.file
                )
            ) {

                configurationFiles.push(
                    check.file
                );

                if (provider === "Unknown") {

                    provider =
                        check.provider;

                }

            }

        }

        return this.success({

            supported:
                configurationFiles.length > 0,

            provider,

            configurationFiles

        });

    }

}