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

/**
 * Options used when executing a Git command.
 */
export interface GitCommandOptions {
    /**
     * Working directory in which Git should execute.
     */
    cwd: string;

    /**
     * Maximum execution time in milliseconds.
     *
     * If omitted, GitService uses the configured default timeout.
     */
    timeout?: number;
}

/**
 * Structured result returned by GitService command execution.
 */
export interface GitCommandResult {
    /**
     * Whether the Git command completed successfully.
     */
    success: boolean;

    /**
     * Git command arguments.
     */
    command: string[];

    /**
     * Standard output produced by Git.
     */
    stdout: string;

    /**
     * Standard error produced by Git.
     */
    stderr: string;

    /**
     * Git process exit code.
     *
     * Undefined when the process failed before an exit code
     * could be obtained.
     */
    exitCode?: number;

    /**
     * Whether the command exceeded its timeout.
     */
    timedOut: boolean;

    /**
     * Error message when command execution failed.
     */
    error?: string;
}

/**
 * Structured Git working-tree status.
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
 * Information about a Git branch.
 */
export interface GitBranch {
    name: string;
    current: boolean;
    remote?: string;
}

/**
 * Structured list of Git branches.
 */
export interface GitBranchList {
    current: string;
    branches: string[];
}

/**
 * Options used when querying Git commit history.
 */
export interface GitCommitQueryOptions {
    /**
     * Maximum number of commits to return.
     */
    limit?: number;

    /**
     * Filter commits by author.
     */
    author?: string;

    /**
     * Include commits after this date.
     *
     * Git-compatible date expression.
     */
    since?: string;

    /**
     * Include commits before this date.
     *
     * Git-compatible date expression.
     */
    until?: string;

    /**
     * Branch, tag, or commit reference to search.
     */
    branch?: string;
}

/**
 * Structured result returned by Git log queries.
 */
export interface GitCommitList {
    commits: GitCommit[];

    /**
     * Number of commits returned.
     */
    count: number;

    /**
     * Whether more commits may exist beyond the requested limit.
     */
    hasMore: boolean;
}