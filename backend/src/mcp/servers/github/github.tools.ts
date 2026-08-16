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

export interface GitHubReadFileArgs {
    owner: string;
    repository: string;
    path: string;
    ref?: string;
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
            this.listBranchesTool(),
            this.readFileTool()
        ];
    }

    private validateReadFileArguments(
        args: unknown
    ): GitHubReadFileArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.path !== "string" ||
            !value.path.trim()
        ) {
            throw new Error(
                "GitHub file path is required."
            );
        }

        const result: GitHubReadFileArgs = {
            ...repositoryArgs,
            path: value.path.trim()
        };

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

    private readFileTool(): MCPTool {

        return {
            name: "github_read_file",

            description:
                "Read and return the text content of a file from a GitHub repository.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub username or organization that owns the repository."
                    },

                    repository: {
                        type: "string",
                        description:
                            "Name of the GitHub repository."
                    },

                    path: {
                        type: "string",
                        description:
                            "Path of the file inside the repository."
                    },

                    ref: {
                        type: "string",
                        description:
                            "Git branch, tag, or commit SHA. If omitted, the repository default branch is used."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "path"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateReadFileArguments(
                        args
                    );

                return this.readFile(
                    validatedArgs
                );
            }
        };
    }
    public async readFile(
        args: GitHubReadFileArgs
    ): Promise<{
        owner: string;
        repository: string;
        path: string;
        ref?: string;
        content: string;
    }> {

        this.validateRepositoryArguments(
            args
        );

        if (
            !args.path ||
            !args.path.trim()
        ) {
            throw new Error(
                "GitHub file path is required."
            );
        }

        const result =
            await this.githubService.getContents(
                args.owner,
                args.repository,
                args.path,
                args.ref
            );

        if (
            Array.isArray(result)
        ) {
            throw new Error(
                `The specified path '${args.path}' is a directory, not a file.`
            );
        }

        if (
            result.type !== "file"
        ) {
            throw new Error(
                `The specified path '${args.path}' is not a file.`
            );
        }

        if (
            !result.content
        ) {
            throw new Error(
                `GitHub did not return content for '${args.path}'.`
            );
        }

        if (
            result.encoding &&
            result.encoding !== "base64"
        ) {
            throw new Error(
                `Unsupported GitHub content encoding: ${result.encoding}`
            );
        }

        const content =
            Buffer.from(
                result.content.replace(/\s/g, ""),
                "base64"
            ).toString("utf-8");

        return {
            owner: args.owner,
            repository: args.repository,
            path: result.path,
            ref: args.ref,
            content
        };
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

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub username or organization that owns the repository."
                    },

                    repository: {
                        type: "string",
                        description:
                            "Name of the GitHub repository."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
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
                "Get a file or directory contents from a GitHub repository.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub username or organization that owns the repository."
                    },

                    repository: {
                        type: "string",
                        description:
                            "Name of the GitHub repository."
                    },

                    path: {
                        type: "string",
                        description:
                            "Path to the file or directory inside the repository. Use an empty string or omit this field to access the repository root."
                    },

                    ref: {
                        type: "string",
                        description:
                            "Git branch, tag, or commit SHA to read from. If omitted, GitHub uses the repository default branch."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
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
                "List all branches available in a GitHub repository.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub username or organization that owns the repository."
                    },

                    repository: {
                        type: "string",
                        description:
                            "Name of the GitHub repository."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
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