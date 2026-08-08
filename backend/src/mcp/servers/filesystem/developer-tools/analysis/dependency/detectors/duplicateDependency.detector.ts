import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

export class DuplicateDependencyDetector
    extends DependencyDetectorBase<string[]> {

    readonly name = "DuplicateDependencyDetector";

    protected emptyResult(): string[] {

        return [];

    }

    protected async detectInternal(
        packageJson: Record<string, any>,
        _workspacePath: string
    ): Promise<string[]> {

        const sections = [

            packageJson.dependencies ?? {},

            packageJson.devDependencies ?? {},

            packageJson.peerDependencies ?? {},

            packageJson.optionalDependencies ?? {}

        ];

        const seen =
            new Set<string>();

        const duplicates =
            new Set<string>();

        for (const section of sections) {

            for (const name of Object.keys(section)) {

                if (seen.has(name)) {

                    duplicates.add(name);

                } else {

                    seen.add(name);

                }

            }

        }

        return [...duplicates];

    }

}