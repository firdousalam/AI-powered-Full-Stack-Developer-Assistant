// src/mcp/servers/github/github.tools.ts

import {
    MCPTool
} from "../../types";

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch
} from "./github.service";

/**
 * ============================================================
 * GitHub Tool Arguments
 * ============================================================
 */

export interface GitHubRepositoryArgs {
    owner: string;
    repository: string;
}

export interface GitHubContentsArgs {
    owner: string;
    repository: string;
    path?: string;
    ref?: string;
}

export interface GitHubBranchesArgs {
    owner: string;
    repository: string;
}

/**
 * ============================================================
 * GitHub MCP Tools
 * ============================================================
 */

export class GitHubTools {

    constructor(
        private readonly githubService: GitHubService
    ) { }

    /**
     * ========================================================
     * Return all GitHub MCP tools.
     * ========================================================
     */
    public getTools(): MCPTool[] {

        return [
            this.getRepositoryTool(),
            this.getContentsTool(),
            this.listBranchesTool()
        ];
    }

    /**
     * ========================================================
     * GitHub Repository MCP Tool
     * ========================================================
     */
    private getRepositoryTool(): MCPTool {

        return {
            name: "github_get_repository",

            description:
                "Get metadata and information about a GitHub repository.",

            execute: async (
                args: unknown
            ) => {

                const validatedArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                return this.getRepository(
                    validatedArgs
                );
            }
        };
    }

    /**
     * ========================================================
     * GitHub Contents MCP Tool
     * ========================================================
     */
    private getContentsTool(): MCPTool {

        return {
            name: "github_get_contents",

            description:
                "Get files or directory contents from a GitHub repository.",

            execute: async (
                args: unknown
            ) => {

                const validatedArgs =
                    this.validateContentsArguments(
                        args
                    );

                return this.getContents(
                    validatedArgs
                );
            }
        };
    }

    /**
     * ========================================================
     * GitHub Branches MCP Tool
     * ========================================================
     */
    private listBranchesTool(): MCPTool {

        return {
            name: "github_list_branches",

            description:
                "List branches available in a GitHub repository.",

            execute: async (
                args: unknown
            ) => {

                const validatedArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                return this.listBranches(
                    validatedArgs
                );
            }
        };
    }

    /**
     * ========================================================
     * Get Repository
     * ========================================================
     */
    public async getRepository(
        args: GitHubRepositoryArgs
    ): Promise<GitHubRepository> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getRepository(
            args.owner,
            args.repository
        );
    }

    /**
     * ========================================================
     * Get Repository Contents
     * ========================================================
     */
    public async getContents(
        args: GitHubContentsArgs
    ): Promise<
        GitHubContent |
        GitHubContent[]
    > {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getContents(
            args.owner,
            args.repository,
            args.path ?? "",
            args.ref
        );
    }

    /**
     * ========================================================
     * List Repository Branches
     * ========================================================
     */
    public async listBranches(
        args: GitHubBranchesArgs
    ): Promise<GitHubBranch[]> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getBranches(
            args.owner,
            args.repository
        );
    }

    /**
     * ========================================================
     * Validate Repository Arguments
     * ========================================================
     */
    private validateRepositoryArguments(
        args: unknown
    ): GitHubRepositoryArgs {

        if (
            !args ||
            typeof args !== "object"
        ) {
            throw new Error(
                "GitHub repository arguments are required."
            );
        }

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.owner !== "string" ||
            !value.owner.trim()
        ) {
            throw new Error(
                "GitHub repository owner is required."
            );
        }

        if (
            typeof value.repository !== "string" ||
            !value.repository.trim()
        ) {
            throw new Error(
                "GitHub repository name is required."
            );
        }

        return {
            owner: value.owner.trim(),
            repository: value.repository.trim()
        };
    }

    /**
     * ========================================================
     * Validate Contents Arguments
     * ========================================================
     */
    private validateContentsArguments(
        args: unknown
    ): GitHubContentsArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        const result: GitHubContentsArgs = {
            ...repositoryArgs
        };

        if (
            value.path !== undefined
        ) {

            if (
                typeof value.path !== "string"
            ) {
                throw new Error(
                    "GitHub repository path must be a string."
                );
            }

            result.path =
                value.path.trim();
        }

        if (
            value.ref !== undefined
        ) {

            if (
                typeof value.ref !== "string"
            ) {
                throw new Error(
                    "GitHub repository ref must be a string."
                );
            }

            result.ref =
                value.ref.trim();
        }

        return result;
    }
}