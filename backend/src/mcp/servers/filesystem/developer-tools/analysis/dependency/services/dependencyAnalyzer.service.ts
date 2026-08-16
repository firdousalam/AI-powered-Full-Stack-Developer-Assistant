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

        const runDetector = async <T>(
            name: string,
            detector: {
                detect(
                    workspacePath: string
                ): Promise<{
                    success: boolean;
                    data: T;
                    error?: string;
                }>;
            }
        ): Promise<T> => {

            const start = Date.now();

            try {

                const result =
                    await detector.detect(
                        workspacePath
                    );

                const duration =
                    Date.now() - start;

                console.log(
                    `[DependencyAnalyzer] ${name}: ${duration}ms`
                );

                if (!result.success) {

                    console.warn(
                        `[DependencyAnalyzer] ${name} failed:`,
                        result.error
                    );

                    return [] as T;
                }

                return result.data;

            } catch (error) {

                const duration =
                    Date.now() - start;

                console.error(
                    `[DependencyAnalyzer] ${name} failed after ${duration}ms`,
                    error
                );

                return [] as T;
            }
        };


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

            runDetector(
                "MetadataDetector",
                this.metadataDetector
            ),

            runDetector(
                "DependencyDetector",
                this.dependencyDetector
            ),

            runDetector(
                "DevDependencyDetector",
                this.devDependencyDetector
            ),

            runDetector(
                "PackageManagerDetector",
                this.packageManagerDetector
            ),

            runDetector(
                "LockFileDetector",
                this.lockFileDetector
            ),

            runDetector(
                "PeerDependencyDetector",
                this.peerDependencyDetector
            ),

            runDetector(
                "OptionalDependencyDetector",
                this.optionalDependencyDetector
            ),

            runDetector(
                "DuplicateDependencyDetector",
                this.duplicateDependencyDetector
            ),

            runDetector(
                "MissingDependencyDetector",
                this.missingDependencyDetector
            )

        ]);


        return {

            metadata:
                metadata as DependencyAnalysisResult["metadata"],

            dependencies:
                dependencies as DependencyAnalysisResult["dependencies"],

            devDependencies:
                devDependencies as DependencyAnalysisResult["devDependencies"],

            packageManager:
                packageManager as DependencyAnalysisResult["packageManager"],

            lockFile:
                lockFile as DependencyAnalysisResult["lockFile"],

            peerDependencies:
                peerDependencies as DependencyAnalysisResult["peerDependencies"],

            optionalDependencies:
                optionalDependencies as DependencyAnalysisResult["optionalDependencies"],

            duplicates:
                duplicates as DependencyAnalysisResult["duplicates"],

            missing:
                missing as DependencyAnalysisResult["missing"]

        };
    }

}