import { DeveloperToolRegistry } from "./base";

import { AnalyzeProjectTool } from "./analysis";

import {
    MetadataDetector,
    LanguageDetector,
    FrameworkDetector,
    RuntimeDetector,
    PackageManagerDetector,
    BuildToolDetector,
    EntryPointDetector,
    DockerDetector,
    KubernetesDetector,
    GitDetector,
    CiDetector
} from "./analysis/detectors";

import { ProjectAnalyzerService } from "./analysis/services";

export function registerDeveloperTools(
    registry: DeveloperToolRegistry
): void {

    const analyzerService =
        new ProjectAnalyzerService(

            new MetadataDetector(),

            new LanguageDetector(),

            new FrameworkDetector(),

            new RuntimeDetector(),

            new PackageManagerDetector(),

            new BuildToolDetector(),

            new EntryPointDetector(),

            new DockerDetector(),

            new KubernetesDetector(),

            new GitDetector(),

            new CiDetector()

        );

    registry.register(

        new AnalyzeProjectTool(
            analyzerService
        )

    );

}