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

/**
 * ============================================================
 * Singleton Instances
 * ============================================================
 */

export const githubService =
    new GitHubService();

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

export function createGitHubServer(): GitHubServer {

    const service =
        new GitHubService();

    const tools =
        new GitHubTools(
            service
        );

    return new GitHubServer(
        service,
        tools
    );
}