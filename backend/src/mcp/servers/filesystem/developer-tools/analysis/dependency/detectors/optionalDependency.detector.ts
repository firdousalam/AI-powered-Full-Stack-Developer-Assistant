import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

import {
    Dependency
} from "../models";

export class OptionalDependencyDetector
    extends DependencyDetectorBase<Dependency[]> {

    readonly name = "OptionalDependencyDetector";

    protected emptyResult(): Dependency[] {

        return [];

    }

    protected async detectInternal(
        packageJson: Record<string, any>,
        _workspacePath: string
    ): Promise<Dependency[]> {

        const optionalDependencies =
            packageJson.optionalDependencies ?? {};

        return Object.entries(
            optionalDependencies
        ).map(

            ([name, version]) => ({

                name,

                version: String(version)

            })

        );

    }

}