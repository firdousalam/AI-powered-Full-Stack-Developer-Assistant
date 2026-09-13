/**
 * Represents a Git remote.
 */
export interface GitRemote {
    name: string;
    fetchUrl: string;
    pushUrl: string;
}

/**
 * Result returned by Git remote operations.
 */
export interface GitRemoteResult {
    remotes: GitRemote[];
    total: number;
}