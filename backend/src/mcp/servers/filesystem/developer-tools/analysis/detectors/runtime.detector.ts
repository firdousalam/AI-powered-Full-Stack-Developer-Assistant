import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export class RuntimeDetector extends DetectorBase<string> {

    readonly name = "RuntimeDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        if (
            await workspaceReader.exists(
                workspacePath,
                "package.json"
            )
        ) {
            return this.success("Node.js");
        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "requirements.txt"
            )
        ) {
            return this.success("Python");
        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "pom.xml"
            )
        ) {
            return this.success("Java");
        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "build.gradle"
            )
        ) {
            return this.success("Java");
        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "go.mod"
            )
        ) {
            return this.success("Go");
        }

        if (
            await workspaceReader.exists(
                workspacePath,
                "Cargo.toml"
            )
        ) {
            return this.success("Rust");
        }

        if (
            await workspaceReader.exists(
                workspacePath,
                ".csproj"
            )
        ) {
            return this.success(".NET");
        }

        return this.success("Unknown");

    }

}