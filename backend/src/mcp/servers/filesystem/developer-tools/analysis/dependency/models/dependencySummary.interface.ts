import { Dependency } from "./dependency.interface";

/**
 * Summary of all project dependencies.
 */
export interface DependencySummary {

    /**
     * Production dependencies.
     */
    dependencies: Dependency[];

    /**
     * Development dependencies.
     */
    devDependencies: Dependency[];

    /**
     * Peer dependencies.
     */
    peerDependencies: Dependency[];

    /**
     * Optional dependencies.
     */
    optionalDependencies: Dependency[];

}