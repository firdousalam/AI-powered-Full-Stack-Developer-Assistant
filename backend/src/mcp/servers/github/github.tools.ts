// src/mcp/servers/github/github.tools.ts

import {
    MCPTool
} from "../../types";

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue,
    GitHubPullRequest
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

export interface GitHubSearchCodeArgs {
    owner: string;
    repository: string;
    query: string;
}

export interface GitHubListIssuesArgs {
    owner: string;
    repository: string;
    state?: "open" | "closed" | "all";
}
export interface GitHubListPullRequestsArgs {
    owner: string;
    repository: string;
    state?: "open" | "closed" | "all";
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
            this.readFileTool(),
            this.searchCodeTool(),
            this.listIssuesTool(),
            this.listPullRequestsTool()
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

    public async searchCode(
        args: GitHubSearchCodeArgs
    ): Promise<GitHubCodeSearchResponse> {

        this.validateRepositoryArguments(
            args
        );

        if (
            !args.query ||
            !args.query.trim()
        ) {
            throw new Error(
                "GitHub code search query is required."
            );
        }

        return this.githubService.searchCode(
            args.owner,
            args.repository,
            args.query.trim()
        );
    }
    private searchCodeTool(): MCPTool {

        return {
            name: "github_search_code",

            description:
                "Search for source code, symbols, filenames, or text within a GitHub repository.",

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

                    query: {
                        type: "string",
                        description:
                            "Code search query. Can search for symbols, text, filenames, extensions, or other GitHub-supported code search terms."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "query"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateSearchCodeArguments(
                        args
                    );

                return this.searchCode(
                    validatedArgs
                );
            }
        };
    }
    private validateSearchCodeArguments(
        args: unknown
    ): GitHubSearchCodeArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.query !== "string" ||
            !value.query.trim()
        ) {
            throw new Error(
                "GitHub code search query is required."
            );
        }

        return {
            ...repositoryArgs,
            query: value.query.trim()
        };
    }
    public async listIssues(
        args: GitHubListIssuesArgs
    ): Promise<GitHubIssue[]> {

        this.validateRepositoryArguments(
            args
        );

        const state =
            args.state ?? "open";

        return this.githubService.listIssues(
            args.owner,
            args.repository,
            state
        );
    }

    private listIssuesTool(): MCPTool {

        return {
            name: "github_list_issues",

            description:
                "List issues from a GitHub repository. Pull requests are excluded from the results.",

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

                    state: {
                        type: "string",
                        description:
                            "Issue state to return. Defaults to open.",
                        enum: [
                            "open",
                            "closed",
                            "all"
                        ]
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
                    this.validateListIssuesArguments(
                        args
                    );

                return this.listIssues(
                    validatedArgs
                );
            }
        };
    }
    private validateListIssuesArguments(
        args: unknown
    ): GitHubListIssuesArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        const result: GitHubListIssuesArgs = {
            ...repositoryArgs
        };

        if (
            value.state !== undefined
        ) {

            if (
                value.state !== "open" &&
                value.state !== "closed" &&
                value.state !== "all"
            ) {
                throw new Error(
                    "GitHub issue state must be open, closed, or all."
                );
            }

            result.state =
                value.state;
        }

        return result;
    }
    public async listPullRequests(
        args: GitHubListPullRequestsArgs
    ): Promise<GitHubPullRequest[]> {

        this.validateRepositoryArguments(
            args
        );

        const state =
            args.state ?? "open";

        return this.githubService.listPullRequests(
            args.owner,
            args.repository,
            state
        );
    }

    private listPullRequestsTool(): MCPTool {

        return {
            name: "github_list_pull_requests",

            description:
                "List pull requests from a GitHub repository.",

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

                    state: {
                        type: "string",
                        description:
                            "Pull request state to return. Defaults to open.",

                        enum: [
                            "open",
                            "closed",
                            "all"
                        ]
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
                    this.validateListPullRequestsArguments(
                        args
                    );

                return this.listPullRequests(
                    validatedArgs
                );
            }
        };
    }

    private validateListPullRequestsArguments(
        args: unknown
    ): GitHubListPullRequestsArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        const result: GitHubListPullRequestsArgs = {
            ...repositoryArgs
        };

        if (
            value.state !== undefined
        ) {

            if (
                value.state !== "open" &&
                value.state !== "closed" &&
                value.state !== "all"
            ) {
                throw new Error(
                    "GitHub pull request state must be open, closed, or all."
                );
            }

            result.state =
                value.state;
        }

        return result;
    }

}