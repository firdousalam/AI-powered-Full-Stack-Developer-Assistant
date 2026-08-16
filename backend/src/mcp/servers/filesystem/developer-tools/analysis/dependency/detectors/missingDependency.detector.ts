import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";


export class MissingDependencyDetector
    extends DependencyDetectorBase<string[]> {

    readonly name =
        "MissingDependencyDetector";


    protected emptyResult(): string[] {

        return [];

    }


    protected async detectInternal(
        packageJson: Record<string, any>,
        workspacePath: string
    ): Promise<string[]> {

        const dependencies = {

            ...(packageJson.dependencies ?? {}),

            ...(packageJson.devDependencies ?? {}),

            ...(packageJson.peerDependencies ?? {}),

            ...(packageJson.optionalDependencies ?? {})

        };


        const missing: string[] = [];


        for (const dependencyName of Object.keys(dependencies)) {

            const dependencyPath =
                path.join(
                    workspacePath,
                    "node_modules",
                    dependencyName
                );


            const exists =
                await filesystemService.exists(
                    dependencyPath
                );


            if (!exists) {

                missing.push(
                    dependencyName
                );

            }

        }


        return missing;

    }

}