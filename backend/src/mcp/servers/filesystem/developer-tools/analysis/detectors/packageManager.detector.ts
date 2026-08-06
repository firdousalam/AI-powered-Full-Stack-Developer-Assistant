import { DetectorBase } from "./base/detector.base";

import { workspaceReader } from "../readers";

export class PackageManagerDetector
    extends DetectorBase<string> {

    readonly name =
        "PackageManagerDetector";

    async detect(workspacePath: string) {

        if (
            await workspaceReader.exists(
                workspacePath,
                "pnpm-lock.yaml"
            )
        ) {

            return this.success(
                "pnpm"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "yarn.lock"
            )
        ) {

            return this.success(
                "yarn"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "bun.lockb"
            )
        ) {

            return this.success(
                "bun"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "package-lock.json"
            )
        ) {

            return this.success(
                "npm"
            );

        }

        return this.success(
            "Unknown"
        );

    }

}