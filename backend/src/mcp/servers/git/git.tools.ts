import { GitService } from './git.service';

import type {
    GitBranch,
    GitBranchList,
    GitStatus
} from './git.types';
/**
 * Git MCP tool names.
 */
export const GIT_STATUS_TOOL = 'git_status';

/**
 * Creates the Git status MCP tool.
 *
 * The tool delegates all Git operations to GitService.
 */
export function createGitStatusTool(
    gitService: GitService,
) {
    return {
        name: GIT_STATUS_TOOL,

        description:
            'Get the current Git repository status including branch, modified, added, deleted, untracked, ahead, and behind information.',

        inputSchema: {
            type: 'object',
            properties: {
                workspacePath: {
                    type: 'string',
                    description:
                        'Absolute path to the workspace or Git repository.',
                },
            },
            required: ['workspacePath'],
        },

        handler: async (input: {
            workspacePath: string;
        }): Promise<GitStatus> => {
            return gitService.getStatus(
                input.workspacePath,
            );
        },
    };
}

/**
 * git_branch_list
 *
 * Returns all local Git branches and the current branch.
 */
export async function gitBranchList(
    gitService: GitService,
    workspacePath: string,
): Promise<GitBranchList> {
    const current =
        await gitService.getCurrentBranch(
            workspacePath,
        );

    const branches =
        await gitService.listBranches(
            workspacePath,
        );

    return {
        current,
        branches,
    };
}

/**
 * git_branch_current
 *
 * Returns the currently checked-out Git branch.
 */
export async function gitBranchCurrent(
    gitService: GitService,
    workspacePath: string,
): Promise<string> {
    return gitService.getCurrentBranch(
        workspacePath,
    );
}

/**
 * git_branch_info
 *
 * Returns information about a specific Git branch.
 */
export async function gitBranchInfo(
    gitService: GitService,
    workspacePath: string,
    branchName: string,
): Promise<GitBranch> {
    return gitService.getBranchInfo(
        workspacePath,
        branchName,
    );
}