import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

import {
    Dependency
} from "../models";

export class DependencyDetector
    extends DependencyDetectorBase<Dependency[]> {

    /**
     * Detector name.
     */
    readonly name = "DependencyDetector";

    /**
     * Default result.
     */
    protected emptyResult(): Dependency[] {

        return [];

    }

    /**
     * Extract production dependencies.
     */
    protected async detectInternal(
        packageJson: Record<string, any>,
        _workspacePath: string
    ): Promise<Dependency[]> {

        const dependencies =
            packageJson.dependencies ?? {};

        return Object.entries(
            dependencies
        ).map(

            ([name, version]) => ({

                name,

                version: String(version)

            })

        );

    }

}