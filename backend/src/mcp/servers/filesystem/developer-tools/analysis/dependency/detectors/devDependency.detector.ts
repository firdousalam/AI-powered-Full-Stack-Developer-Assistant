import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

import {
    Dependency
} from "../models";

export class DevDependencyDetector
    extends DependencyDetectorBase<Dependency[]> {

    /**
     * Detector name.
     */
    readonly name = "DevDependencyDetector";

    /**
     * Default result.
     */
    protected emptyResult(): Dependency[] {

        return [];

    }

    /**
     * Extract development dependencies
     * from package.json.
     */
    protected async detectInternal(
        packageJson: Record<string, any>,
        _workspacePath: string
    ): Promise<Dependency[]> {

        const devDependencies =
            packageJson.devDependencies ?? {};

        return Object.entries(
            devDependencies
        ).map(

            ([name, version]) => ({

                name,

                version: String(version)

            })

        );

    }

}