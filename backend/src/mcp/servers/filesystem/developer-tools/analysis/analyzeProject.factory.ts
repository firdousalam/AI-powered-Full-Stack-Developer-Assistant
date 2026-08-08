import {
    AnalyzeProjectTool
} from "./analyzeProject.tool";

import {
    ProjectAnalyzerService
} from "./services";

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
} from "./detectors";


/**
 * Creates the AnalyzeProjectTool with all
 * required project detectors.
 *
 * This factory is responsible for dependency
 * wiring only.
 *
 * Detection logic belongs to the detectors.
 */
export function createAnalyzeProjectTool():
    AnalyzeProjectTool {

    const projectAnalyzerService =
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

    return new AnalyzeProjectTool(
        projectAnalyzerService
    );
}