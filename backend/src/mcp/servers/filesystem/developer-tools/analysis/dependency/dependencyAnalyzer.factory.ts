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
} from "./detectors";

import {
    DependencyAnalyzerService
} from "./services";

import {
    DependencyAnalyzerTool
} from "./dependencyAnalyzer.tool";


/**
 * Creates a fully configured DependencyAnalyzerTool.
 *
 * This factory is responsible only for
 * dependency injection and object construction.
 */
export function createDependencyAnalyzerTool():
    DependencyAnalyzerTool {

    const metadataDetector =
        new MetadataDetector();

    const dependencyDetector =
        new DependencyDetector();

    const devDependencyDetector =
        new DevDependencyDetector();

    const packageManagerDetector =
        new PackageManagerDetector();

    const lockFileDetector =
        new LockFileDetector();

    const peerDependencyDetector =
        new PeerDependencyDetector();

    const optionalDependencyDetector =
        new OptionalDependencyDetector();

    const duplicateDependencyDetector =
        new DuplicateDependencyDetector();

    const missingDependencyDetector =
        new MissingDependencyDetector();


    const dependencyAnalyzerService =
        new DependencyAnalyzerService(

            metadataDetector,

            dependencyDetector,

            devDependencyDetector,

            packageManagerDetector,

            lockFileDetector,

            peerDependencyDetector,

            optionalDependencyDetector,

            duplicateDependencyDetector,

            missingDependencyDetector

        );


    return new DependencyAnalyzerTool(
        dependencyAnalyzerService
    );

}