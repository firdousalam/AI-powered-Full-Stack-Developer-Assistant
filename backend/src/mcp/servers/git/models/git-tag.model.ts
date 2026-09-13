/**
 * Represents a Git tag.
 */
export interface GitTag {
    name: string;
    commit: string;
    message?: string;
    annotated: boolean;
}

/**
 * Result returned by Git tag operations.
 */
export interface GitTagResult {
    tags: GitTag[];
    total: number;
}