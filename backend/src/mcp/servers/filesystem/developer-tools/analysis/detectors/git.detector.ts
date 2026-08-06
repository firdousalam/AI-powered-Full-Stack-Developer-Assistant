import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export interface GitInfo {

    supported: boolean;

    gitDirectory: boolean;

    gitIgnore: boolean;

    github: boolean;

}

export class GitDetector
    extends DetectorBase<GitInfo> {

    readonly name = "GitDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<GitInfo>> {

        const gitDirectory =
            await workspaceReader.exists(
                workspacePath,
                ".git"
            );

        const gitIgnore =
            await workspaceReader.exists(
                workspacePath,
                ".gitignore"
            );

        const github =
            await workspaceReader.exists(
                workspacePath,
                ".github"
            );

        return this.success({

            supported:
                gitDirectory ||
                gitIgnore,

            gitDirectory,

            gitIgnore,

            github

        });

    }

}