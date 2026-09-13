import { GitService } from './git.service';

import {
    DEFAULT_GIT_LOG_LIMIT,
    MAX_GIT_LOG_LIMIT,
} from './git.constants';

import type {
    GitBranch,
    GitBranchList,
    GitStatus,
    GitCommit,
    GitCommitList,
    GitCommitQueryOptions,
    GitDiff,
    GitDiffOptions,
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


/**
 * git_log
 *
 * Returns recent commits from the repository.
 */
export async function gitLog(
    gitService: GitService,
    workspacePath: string,
    options: GitCommitQueryOptions = {},
): Promise<GitCommitList> {
    return gitService.getLog(
        workspacePath,
        options,
    );
}

/**
 * git_commit_show
 *
 * Returns information about a specific commit.
 */
export async function gitCommitShow(
    gitService: GitService,
    workspacePath: string,
    commitReference: string,
): Promise<GitCommit> {
    return gitService.getCommit(
        workspacePath,
        commitReference,
    );
}

/**
 * git_commit_search
 *
 * Searches commit history using author,
 * date, branch, and limit filters.
 */
export async function gitCommitSearch(
    gitService: GitService,
    workspacePath: string,
    options: GitCommitQueryOptions = {},
): Promise<GitCommitList> {
    return gitService.searchCommits(
        workspacePath,
        options,
    );
}

export async function gitDiff(
    gitService: GitService,
    workspacePath: string,
    options: GitDiffOptions = {},
): Promise<GitDiff> {
    return gitService.getDiff(
        workspacePath,
        options,
    );
}

export async function gitCommitDiff(
    gitService: GitService,
    workspacePath: string,
    commitReference: string,
    options: GitDiffOptions = {},
): Promise<GitDiff> {
    return gitService.getCommitDiff(
        workspacePath,
        commitReference,
        options,
    );
}

export async function gitFileDiff(
    gitService: GitService,
    workspacePath: string,
    filePath: string,
    options: GitDiffOptions = {},
): Promise<GitDiff> {
    return gitService.getFileDiff(
        workspacePath,
        filePath,
        options,
    );
}

