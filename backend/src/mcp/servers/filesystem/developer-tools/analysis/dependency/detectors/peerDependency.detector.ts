import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

import {
    Dependency
} from "../models";

export class PeerDependencyDetector
    extends DependencyDetectorBase<Dependency[]> {

    readonly name = "PeerDependencyDetector";

    protected emptyResult(): Dependency[] {

        return [];

    }

    protected async detectInternal(
        packageJson: Record<string, any>,
        _workspacePath: string
    ): Promise<Dependency[]> {

        const peerDependencies =
            packageJson.peerDependencies ?? {};

        return Object.entries(
            peerDependencies
        ).map(

            ([name, version]) => ({

                name,

                version: String(version)

            })

        );

    }

}