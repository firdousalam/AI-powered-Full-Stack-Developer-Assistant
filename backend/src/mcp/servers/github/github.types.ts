// src/mcp/servers/github/github.types.ts

/**
 * GitHub MCP configuration.
 *
 * API integration will be implemented in 5.7.2 / 5.7.3.
 */
export interface GitHubConfig {
    apiUrl: string;
    token?: string;
}

/**
 * Basic GitHub repository reference.
 *
 * This is intentionally small for the initial structure.
 * More GitHub-specific response models will be added
 * as individual tools are implemented.
 */
export interface GitHubRepositoryReference {
    owner: string;
    name: string;
}

/**
 * Common GitHub API error representation.
 */
export interface GitHubErrorResponse {
    message: string;
    status?: number;
}