import {
    DetectorBase
} from "./base/detector.base";

import {
    DetectorResult
} from "../models";

import {
    workspaceReader
} from "../readers";


export interface KubernetesInfo {

    detected: boolean;

    manifests: string[];

    directories: string[];

    helm: boolean;

    kustomize: boolean;

}


export class KubernetesDetector
    extends DetectorBase<KubernetesInfo> {

    readonly name = "KubernetesDetector";


    async detect(
        workspacePath: string
    ): Promise<DetectorResult<KubernetesInfo>> {

        /*
         * ============================================================
         * Kubernetes manifest files
         * ============================================================
         */

        const manifestFiles = [

            "deployment.yaml",
            "deployment.yml",

            "service.yaml",
            "service.yml",

            "statefulset.yaml",
            "statefulset.yml",

            "daemonset.yaml",
            "daemonset.yml",

            "configmap.yaml",
            "configmap.yml",

            "secret.yaml",
            "secret.yml",

            "ingress.yaml",
            "ingress.yml",

            "namespace.yaml",
            "namespace.yml",

            "job.yaml",
            "job.yml",

            "cronjob.yaml",
            "cronjob.yml"

        ];


        const manifests: string[] = [];


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


        /*
         * ============================================================
         * Kubernetes directories
         * ============================================================
         */

        const kubernetesDirectories = [

            "k8s",

            "kubernetes",

            "manifests"

        ];


        const directories: string[] = [];


        for (
            const directory
            of kubernetesDirectories
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    directory
                )
            ) {

                directories.push(directory);

            }

        }


        /*
         * ============================================================
         * Kustomize
         * ============================================================
         */

        const kustomize =
            await workspaceReader.exists(
                workspacePath,
                "kustomization.yaml"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "kustomization.yml"
            );


        /*
         * ============================================================
         * Helm
         * ============================================================
         *
         * Chart.yaml / Chart.yml is the primary Helm indicator.
         */

        const helm =
            await workspaceReader.exists(
                workspacePath,
                "Chart.yaml"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "Chart.yml"
            );


        /*
         * ============================================================
         * Overall Kubernetes detection
         * ============================================================
         */

        const detected =
            manifests.length > 0 ||
            directories.length > 0 ||
            helm ||
            kustomize;


        /*
         * ============================================================
         * Result
         * ============================================================
         */

        return this.success({

            detected,

            manifests,

            directories,

            helm,

            kustomize

        });

    }

}