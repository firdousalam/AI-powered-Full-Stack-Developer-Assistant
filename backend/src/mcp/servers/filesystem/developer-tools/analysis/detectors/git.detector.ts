import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export interface GitInfo {
    isGitRepository: boolean;
    branch?: string;
    remote?: string;
    isDirty?: boolean;
}

export class GitDetector {
    async detect(workspacePath: string): Promise<GitInfo> {
        const isGitRepository = await this.isGitRepository(workspacePath);

        if (!isGitRepository) {
            return {
                isGitRepository: false,
            };
        }

        const branch = await this.getCurrentBranch(workspacePath);
        const remote = await this.getRemote(workspacePath);
        const isDirty = await this.isWorkingTreeDirty(workspacePath);

        return {
            isGitRepository: true,
            branch,
            remote,
            isDirty,
        };
    }

    private async isGitRepository(
        workspacePath: string,
    ): Promise<boolean> {
        try {
            await execFileAsync(
                "git",
                ["rev-parse", "--is-inside-work-tree"],
                {
                    cwd: workspacePath,
                },
            );

            return true;
        } catch {
            return false;
        }
    }

    private async getCurrentBranch(
        workspacePath: string,
    ): Promise<string | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["branch", "--show-current"],
                {
                    cwd: workspacePath,
                },
            );

            const branch = stdout.trim();

            return branch || undefined;
        } catch {
            return undefined;
        }
    }

    private async getRemote(
        workspacePath: string,
    ): Promise<string | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["config", "--get", "remote.origin.url"],
                {
                    cwd: workspacePath,
                },
            );

            const remote = stdout.trim();

            return remote || undefined;
        } catch {
            return undefined;
        }
    }

    private async isWorkingTreeDirty(
        workspacePath: string,
    ): Promise<boolean | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["status", "--porcelain"],
                {
                    cwd: workspacePath,
                },
            );

            return stdout.trim().length > 0;
        } catch {
            return undefined;
        }
    }
}