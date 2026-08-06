import { DetectorBase } from "./base/detector.base";

import { workspaceReader } from "../readers";

export class LanguageDetector
    extends DetectorBase<string> {

    readonly name = "LanguageDetector";

    async detect(workspacePath: string) {

        if (
            await workspaceReader.exists(
                workspacePath,
                "tsconfig.json"
            )
        ) {

            return this.success(
                "TypeScript"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "jsconfig.json"
            )
        ) {

            return this.success(
                "JavaScript"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "requirements.txt"
            )
        ) {

            return this.success(
                "Python"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "pom.xml"
            )
        ) {

            return this.success(
                "Java"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "go.mod"
            )
        ) {

            return this.success(
                "Go"
            );

        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "Cargo.toml"
            )
        ) {

            return this.success(
                "Rust"
            );

        }

        return this.success(
            "Unknown"
        );

    }

}