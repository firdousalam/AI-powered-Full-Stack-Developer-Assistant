import {
    Dependency
} from "./dependency.interface";

import {
    DependencyProjectMetadata
} from "./dependencyProjectMetadata.interface";

import {
    PackageManagerInfo
} from "./packageManager.interface";

import {
    LockFileInfo
} from "./lockFile.interface";

/**
 * Complete dependency analysis result.
 *
 * This is the aggregated output produced by
 * DependencyAnalyzerService.
 */
export interface DependencyAnalysisResult {

    /**
     * Basic project information.
     */
    metadata: DependencyProjectMetadata;

    /**
     * Production dependencies.
     */
    dependencies: Dependency[];

    /**
     * Development dependencies.
     */
    devDependencies: Dependency[];

    /**
     * Package manager information.
     */
    packageManager: PackageManagerInfo;

    /**
     * Lock file information.
     */
    lockFile: LockFileInfo;

    /**
     * Peer dependencies.
     */
    peerDependencies: Dependency[];

    /**
     * Optional dependencies.
     */
    optionalDependencies: Dependency[];

    /**
     * Dependencies declared in
     * multiple sections.
     */
    duplicates: string[];

    /**
     * Dependencies that may be missing
     * from node_modules.
     */
    missing: string[];

}