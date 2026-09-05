import { GitService } from './git.service';
import type { GitStatus } from './git.types';

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