import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

export class MissingDependencyDetector
    extends DependencyDetectorBase<string[]> {

    readonly name = "MissingDependencyDetector";

    protected emptyResult(): string[] {

        return [];

    }

    protected async detectInternal(
        packageJson: Record<string, any>,
        workspacePath: string
    ): Promise<string[]> {

        const nodeModulesPath = path.join(
            workspacePath,
            "node_modules"
        );

        const exists =
            await filesystemService.exists(
                nodeModulesPath
            );

        if (exists) {

            return [];

        }

        return Object.keys(
            packageJson.dependencies ?? {}
        );

    }

}