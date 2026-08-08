import { Dependency } from "./dependency.interface";

import { PackageManagerInfo } from "./packageManager.interface";

/**
 * Complete dependency analysis.
 */
export interface DependencyAnalysisResult {

    /**
     * Project name.
     */
    project: string;

    /**
     * Package manager information.
     */
    packageManager: PackageManagerInfo;

    /**
     * Dependency summary.
     */
    summary: {

        dependencies: Dependency[];

        devDependencies: Dependency[];

        peerDependencies: Dependency[];

        optionalDependencies: Dependency[];

    };

    /**
     * Duplicate package names.
     */
    duplicates: string[];

    /**
     * Missing packages.
     */
    missing: string[];

}