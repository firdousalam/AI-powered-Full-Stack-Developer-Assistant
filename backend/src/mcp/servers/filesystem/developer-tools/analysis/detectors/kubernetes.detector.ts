import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export interface KubernetesInfo {

    supported: boolean;

    helm: boolean;

    manifests: string[];

}

export class KubernetesDetector
    extends DetectorBase<KubernetesInfo> {

    readonly name = "KubernetesDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<KubernetesInfo>> {

        const manifests: string[] = [];

        const manifestFiles = [

            "deployment.yaml",
            "deployment.yml",

            "service.yaml",
            "service.yml",

            "ingress.yaml",
            "ingress.yml",

            "k8s/deployment.yaml",
            "k8s/service.yaml",
            "k8s/ingress.yaml"

        ];

        for (const file of manifestFiles) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {

                manifests.push(file);

            }

        }

        const helm =
            await workspaceReader.exists(
                workspacePath,
                "Chart.yaml"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "helm/Chart.yaml"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "charts/Chart.yaml"
            );

        return this.success({

            supported:
                manifests.length > 0 ||
                helm,

            helm,

            manifests

        });

    }

}