import { FilesystemService } from "../../../filesystem.service";
import {
    BuildToolDetector,
    CiDetector,
    DockerDetector,
    EntryPointDetector,
    FrameworkDetector,
    GitDetector,
    KubernetesDetector,
    LanguageDetector,
    MetadataDetector,
    PackageManagerDetector,
    RuntimeDetector
} from "../detectors";

import { ProjectAnalyzerService } from "./projectAnalyzer.service";

export const projectAnalyzerService =
    new ProjectAnalyzerService(

        new MetadataDetector(
            new FilesystemService()
        ),

        new LanguageDetector(
            new FilesystemService()
        ),

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

export * from "./projectAnalyzer.service";