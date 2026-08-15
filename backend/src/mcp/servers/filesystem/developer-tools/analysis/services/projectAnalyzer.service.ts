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

import {
    ProjectAnalysisResult
} from "../models";

export class ProjectAnalyzerService {

    constructor(

        private readonly metadataDetector: MetadataDetector,

        private readonly languageDetector: LanguageDetector,

        private readonly frameworkDetector: FrameworkDetector,

        private readonly runtimeDetector: RuntimeDetector,

        private readonly packageManagerDetector: PackageManagerDetector,

        private readonly buildToolDetector: BuildToolDetector,

        private readonly entryPointDetector: EntryPointDetector,

        private readonly dockerDetector: DockerDetector,

        private readonly kubernetesDetector: KubernetesDetector,

        private readonly gitDetector: GitDetector,

        private readonly ciDetector: CiDetector

    ) { }

    async analyze(
        workspacePath: string
    ): Promise<ProjectAnalysisResult> {

        const [

            metadata,

            language,

            framework,

            runtime,

            packageManager,

            buildTool,

            entryPoint,

            docker,

            kubernetes,

            git,

            ci

        ] = await Promise.all([

            this.metadataDetector.detect(
                workspacePath
            ),

            this.languageDetector.detect(
                workspacePath
            ),

            this.frameworkDetector.detect(
                workspacePath
            ),

            this.runtimeDetector.detect(
                workspacePath
            ),

            this.packageManagerDetector.detect(
                workspacePath
            ),

            this.buildToolDetector.detect(
                workspacePath
            ),

            this.entryPointDetector.detect(
                workspacePath
            ),

            this.dockerDetector.detect(
                workspacePath
            ),

            this.kubernetesDetector.detect(
                workspacePath
            ),

            this.gitDetector.detect(
                workspacePath
            ),

            this.ciDetector.detect(
                workspacePath
            )

        ]);

        return {

            metadata: metadata.data,

            language: language.data,

            framework: framework.data,

            runtime: runtime.data,

            packageManager: packageManager.data,

            buildTool: buildTool.data,

            entryPoint: entryPoint.data,

            docker: docker.data,

            kubernetes: kubernetes.data,

            git: git,

            ci: ci.data

        };

    }

}