/**
 * Git MCP Server constants.
 */

/**
 * Default Git executable.
 */
export const DEFAULT_GIT_PATH = 'git';

/**
 * Default Git command timeout in milliseconds.
 */
export const DEFAULT_GIT_TIMEOUT = 30_000;

/**
 * Git MCP Server name.
 */
export const GIT_MCP_SERVER_NAME = 'git';

/**
 * Git MCP tool names.
 */
export const GIT_TOOL_NAMES = {
    STATUS: 'git_status',
    CURRENT_BRANCH: 'git_branch_current',
    BRANCH_LIST: 'git_branch_list',
    BRANCH_INFO: 'git_branch_info',
    LOG: 'git_log',
    COMMIT_SHOW: 'git_commit_show',
    COMMIT_SEARCH: 'git_commit_search',
    DIFF: 'git_diff',
    COMMIT_DIFF: 'git_commit_diff',
    FILE_DIFF: 'git_file_diff',
    BLAME: 'git_blame',
    FILE_HISTORY: 'git_file_history',
    TAG_LIST: 'git_tag_list',
    REMOTE_LIST: 'git_remote_list',
    REMOTE_INFO: 'git_remote_info',
} as const;