/**
 * Git MCP configuration.
 *
 * Defines configuration required by the Git MCP Server.
 */
export interface GitConfig {
    /**
     * Path to the Git executable.
     *
     * If omitted, the system Git executable will be used.
     */
    gitPath?: string;

    /**
     * Maximum execution time for a Git operation in milliseconds.
     */
    timeout?: number;
}

/**
 * Represents a Git repository.
 */
export interface GitRepository {
    /**
     * Whether the provided workspace is a Git repository.
     */
    isRepository: boolean;

    /**
     * Absolute path to the repository root.
     */
    root: string;

    /**
     * Current branch name.
     */
    currentBranch: string;
}

/**
 * Represents the current Git working-tree status.
 */
export interface GitStatus {
    /**
     * Current branch name.
     */
    branch: string;

    /**
     * Number of commits the local branch is ahead of its upstream.
     */
    ahead: number;

    /**
     * Number of commits the local branch is behind its upstream.
     */
    behind: number;

    /**
     * Modified files.
     */
    modified: string[];

    /**
     * Added/staged files.
     */
    added: string[];

    /**
     * Deleted files.
     */
    deleted: string[];

    /**
     * Untracked files.
     */
    untracked: string[];
}

/**
 * Represents a Git branch.
 */
export interface GitBranch {
    /**
     * Branch name.
     */
    name: string;

    /**
     * Whether this is the currently checked-out branch.
     */
    current: boolean;

    /**
     * Whether the branch is local.
     */
    local: boolean;

    /**
     * Optional upstream branch.
     */
    upstream?: string;
}

/**
 * Represents a Git commit.
 */
export interface GitCommit {
    /**
     * Full commit hash.
     */
    hash: string;

    /**
     * Commit author name.
     */
    author: string;

    /**
     * Commit author email.
     */
    email?: string;

    /**
     * Commit message.
     */
    message: string;

    /**
     * Commit date.
     */
    date: string;
}

/**
 * Represents a Git diff.
 */
export interface GitDiff {
    /**
     * Number of files changed.
     */
    filesChanged: number;

    /**
     * Number of inserted lines.
     */
    insertions: number;

    /**
     * Number of deleted lines.
     */
    deletions: number;

    /**
     * Files included in the diff.
     */
    files: string[];

    /**
     * Raw diff content.
     *
     * This will be populated by GitService when required.
     */
    content?: string;
}

/**
 * Represents a Git tag.
 */
export interface GitTag {
    /**
     * Tag name.
     */
    name: string;

    /**
     * Optional tag message.
     */
    message?: string;

    /**
     * Commit hash associated with the tag.
     */
    commit?: string;
}

/**
 * Represents a Git remote.
 */
export interface GitRemote {
    /**
     * Remote name, for example "origin".
     */
    name: string;

    /**
     * Fetch URL.
     */
    fetchUrl: string;

    /**
     * Push URL.
     */
    pushUrl: string;
}

/**
 * Represents Git blame information for a line.
 */
export interface GitBlame {
    /**
     * Commit hash responsible for the line.
     */
    hash: string;

    /**
     * Author of the change.
     */
    author: string;

    /**
     * Line number.
     */
    line: number;

    /**
     * Source line content.
     */
    content: string;

    /**
     * Commit date.
     */
    date?: string;
}