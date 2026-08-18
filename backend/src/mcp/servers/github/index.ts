// src/mcp/servers/github/index.ts

import {
    GitHubServer
} from "./github.server";

import {
    GitHubService
} from "./github.service";

import {
    GitHubTools
} from "./github.tools";

import type {
    GitHubConfig
} from "./github.types";

/**
 * ============================================================
 * Configuration
 * ============================================================
 */

const githubConfig: GitHubConfig = {
    apiUrl: process.env.GITHUB_API_URL ?? "https://api.github.com",
    token: process.env.GITHUB_TOKEN,
};

/**
 * ============================================================
 * Singleton Instances
 * ============================================================
 */

const githubService = new GitHubService(githubConfig);

export const githubTools =
    new GitHubTools(
        githubService
    );

export const githubServer =
    new GitHubServer(
        githubService,
        githubTools
    );

/**
 * ============================================================
 * Class Exports
 * ============================================================
 */

export {
    GitHubServer,
    GitHubService,
    GitHubTools
};

/**
 * ============================================================
 * Types
 * ============================================================
 */

export * from "./github.types";

/**
 * ============================================================
 * Constants
 * ============================================================
 */

export * from "./github.constants";

/**
 * ============================================================
 * Factory
 * ============================================================
 *
 * Intended for unit tests or creating isolated instances.
 *
 * The application should normally use the singleton
 * `githubServer` exported above.
 * ============================================================
 */

export function createGitHubServer(
    config: GitHubConfig = githubConfig
): GitHubServer {

    const service =
        new GitHubService(
            config
        );

    const tools =
        new GitHubTools(
            service
        );

    return new GitHubServer(
        service,
        tools
    );
}