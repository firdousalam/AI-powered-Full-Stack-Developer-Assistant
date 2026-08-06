import {
    BuildTool,
    CiProvider,
    Framework,
    PackageManager,
    ProgrammingLanguage,
    Runtime
} from "../models/projectTypes";

import { ProjectMetadata } from "../models/projectMetadata.interface";

export interface ProjectSummary {

    metadata: ProjectMetadata;

    language: ProgrammingLanguage;

    framework: Framework;

    runtime: Runtime;

    packageManager: PackageManager;

    buildTool: BuildTool;

    entryPoint?: string;

    docker: boolean;

    dockerCompose: boolean;

    kubernetes: boolean;

    git: boolean;

    ci: CiProvider;

}