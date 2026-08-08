import {
    MetadataDetector,
    DependencyDetector,
    DevDependencyDetector,
    PackageManagerDetector,
    LockFileDetector,
    PeerDependencyDetector,
    OptionalDependencyDetector,
    DuplicateDependencyDetector,
    MissingDependencyDetector
} from "../detectors";

import {
    DependencyAnalysisResult
} from "../models";

export class DependencyAnalyzerService {

    constructor(

        private readonly metadataDetector:
            MetadataDetector,

        private readonly dependencyDetector:
            DependencyDetector,

        private readonly devDependencyDetector:
            DevDependencyDetector,

        private readonly packageManagerDetector:
            PackageManagerDetector,

        private readonly lockFileDetector:
            LockFileDetector,

        private readonly peerDependencyDetector:
            PeerDependencyDetector,

        private readonly optionalDependencyDetector:
            OptionalDependencyDetector,

        private readonly duplicateDependencyDetector:
            DuplicateDependencyDetector,

        private readonly missingDependencyDetector:
            MissingDependencyDetector

    ) { }

    /**
     * Analyze all dependencies in the workspace.
     *
     * This service only orchestrates detectors.
     *
     * It does not contain dependency detection logic.
     */
    async analyze(
        workspacePath: string
    ): Promise<DependencyAnalysisResult> {

        const [

            metadata,

            dependencies,

            devDependencies,

            packageManager,

            lockFile,

            peerDependencies,

            optionalDependencies,

            duplicates,

            missing

        ] = await Promise.all([

            this.metadataDetector.detect(
                workspacePath
            ),

            this.dependencyDetector.detect(
                workspacePath
            ),

            this.devDependencyDetector.detect(
                workspacePath
            ),

            this.packageManagerDetector.detect(
                workspacePath
            ),

            this.lockFileDetector.detect(
                workspacePath
            ),

            this.peerDependencyDetector.detect(
                workspacePath
            ),

            this.optionalDependencyDetector.detect(
                workspacePath
            ),

            this.duplicateDependencyDetector.detect(
                workspacePath
            ),

            this.missingDependencyDetector.detect(
                workspacePath
            )

        ]);

        return {

            metadata:
                metadata.data,

            dependencies:
                dependencies.data,

            devDependencies:
                devDependencies.data,

            packageManager:
                packageManager.data,

            lockFile:
                lockFile.data,

            peerDependencies:
                peerDependencies.data,

            optionalDependencies:
                optionalDependencies.data,

            duplicates:
                duplicates.data,

            missing:
                missing.data

        };

    }

}