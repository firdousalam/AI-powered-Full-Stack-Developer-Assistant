


import { ProjectMetadata } from "./projectMetadata.interface";

import {
    DockerInfo
} from "../analysis/detectors/docker.detector";

import {
    KubernetesInfo
} from "../analysis/detectors/kubernetes.detector";

import {
    GitInfo
} from "../analysis/detectors/git.detector";

import {
    CiInfo
} from "../analysis/detectors/ci.detector";

export interface ProjectAnalysisResult {

    metadata: ProjectMetadata;

    language: string;

    framework: string;

    runtime: string;

    packageManager: string;

    buildTool: string;

    entryPoint: string;

    docker: DockerInfo;

    kubernetes: KubernetesInfo;

    git: GitInfo;

    ci: CiInfo;

}