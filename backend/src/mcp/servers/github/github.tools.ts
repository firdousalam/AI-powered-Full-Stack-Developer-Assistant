// src/mcp/servers/github/github.tools.ts

import {
    MCPTool
} from "../../types";



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

export interface GitHubListCommitsArgs {
    owner: string;
    repository: string;
    path?: string;
    ref?: string;
}

export interface GitHubCompareCommitsArgs {
    owner: string;
    repository: string;
    base: string;
    head: string;
}

export interface GitHubGetTreeArgs {
    owner: string;
    repository: string;
    ref?: string;
}

export interface GitHubListReleasesArgs {
    owner: string;
    repository: string;
}

export interface GitHubListTagsArgs {
    owner: string;
    repository: string;
}

export interface GitHubSearchRepositoriesArgs {
    query: string;
    page?: number;
    perPage?: number;
}
import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue,
    GitHubPullRequest,
    GitHubCommit,
    GitHubCompareResponse,
    GitHubTreeResponse,
    GitHubRelease,
    GitHubTag,
    GitHubRepositorySearchResponse
} from "./github.service";

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
            this.listPullRequestsTool(),
            this.listCommitsTool(),
            this.compareCommitsTool(),
            this.getTreeTool(),
            this.listReleasesTool(),
            this.listTagsTool(),
            this.searchRepositoriesTool()
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

    public async listCommits(
        args: GitHubListCommitsArgs
    ): Promise<GitHubCommit[]> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listCommits(
            args.owner,
            args.repository,
            args.path,
            args.ref
        );
    }
    private listCommitsTool(): MCPTool {

        return {
            name: "github_list_commits",

            description:
                "List commit history for a GitHub repository, optionally filtered by file path or branch.",

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
                            "Optional file or directory path. When provided, only commits affecting this path are returned."
                    },

                    ref: {
                        type: "string",
                        description:
                            "Optional branch, tag, or commit SHA. Defaults to the repository's default branch."
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
                    this.validateListCommitsArguments(
                        args
                    );

                return this.listCommits(
                    validatedArgs
                );
            }
        };
    }

    private validateListCommitsArguments(
        args: unknown
    ): GitHubListCommitsArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        const result: GitHubListCommitsArgs = {
            ...repositoryArgs
        };

        if (
            value.path !== undefined
        ) {

            if (
                typeof value.path !== "string"
            ) {
                throw new Error(
                    "GitHub commit path must be a string."
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
                    "GitHub commit ref must be a string."
                );
            }

            result.ref =
                value.ref.trim();
        }

        return result;
    }
    public async compareCommits(
        args: GitHubCompareCommitsArgs
    ): Promise<GitHubCompareResponse> {

        this.validateRepositoryArguments(
            args
        );

        if (
            !args.base ||
            !args.base.trim()
        ) {
            throw new Error(
                "GitHub comparison base is required."
            );
        }

        if (
            !args.head ||
            !args.head.trim()
        ) {
            throw new Error(
                "GitHub comparison head is required."
            );
        }

        return this.githubService.compareCommits(
            args.owner,
            args.repository,
            args.base.trim(),
            args.head.trim()
        );
    }
    private compareCommitsTool(): MCPTool {

        return {
            name: "github_compare_commits",

            description:
                "Compare two GitHub branches, tags, or commits and return changed files, commit history, additions, deletions, and available patches.",

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

                    base: {
                        type: "string",
                        description:
                            "Base branch, tag, or commit SHA for the comparison."
                    },

                    head: {
                        type: "string",
                        description:
                            "Head branch, tag, or commit SHA for the comparison."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "base",
                    "head"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateCompareCommitsArguments(
                        args
                    );

                return this.compareCommits(
                    validatedArgs
                );
            }
        };
    }
    private validateCompareCommitsArguments(
        args: unknown
    ): GitHubCompareCommitsArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.base !== "string" ||
            !value.base.trim()
        ) {
            throw new Error(
                "GitHub comparison base is required."
            );
        }

        if (
            typeof value.head !== "string" ||
            !value.head.trim()
        ) {
            throw new Error(
                "GitHub comparison head is required."
            );
        }

        return {
            ...repositoryArgs,

            base:
                value.base.trim(),

            head:
                value.head.trim()
        };
    }
    public async getTree(
        args: GitHubGetTreeArgs
    ): Promise<GitHubTreeResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getTree(
            args.owner,
            args.repository,
            args.ref
        );
    }

    private getTreeTool(): MCPTool {

        return {
            name: "github_get_tree",

            description:
                "Get the repository-wide file and directory tree from GitHub.",

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

                    ref: {
                        type: "string",
                        description:
                            "Optional branch, tag, or commit SHA. Defaults to HEAD."
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
                    this.validateGetTreeArguments(
                        args
                    );

                return this.getTree(
                    validatedArgs
                );
            }
        };
    }
    private validateGetTreeArguments(
        args: unknown
    ): GitHubGetTreeArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        const result: GitHubGetTreeArgs = {
            ...repositoryArgs
        };

        if (
            value.ref !== undefined
        ) {

            if (
                typeof value.ref !== "string"
            ) {
                throw new Error(
                    "GitHub tree ref must be a string."
                );
            }

            result.ref =
                value.ref.trim();
        }

        return result;
    }

    public async listReleases(
        args: GitHubListReleasesArgs
    ): Promise<GitHubRelease[]> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listReleases(
            args.owner,
            args.repository
        );
    }

    public async listTags(
        args: GitHubListTagsArgs
    ): Promise<GitHubTag[]> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listTags(
            args.owner,
            args.repository
        );
    }

    private listReleasesTool(): MCPTool {

        return {
            name: "github_list_releases",

            description:
                "List published releases from a GitHub repository.",

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
                    this.validateListReleasesArguments(
                        args
                    );

                return this.listReleases(
                    validatedArgs
                );
            }
        };
    }

    private validateListReleasesArguments(
        args: unknown
    ): GitHubListReleasesArgs {

        return this.validateRepositoryArguments(
            args
        );
    }

    private listTagsTool(): MCPTool {

        return {
            name: "github_list_tags",

            description:
                "List Git tags from a GitHub repository.",

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
                    this.validateListTagsArguments(
                        args
                    );

                return this.listTags(
                    validatedArgs
                );
            }
        };
    }
    private validateListTagsArguments(
        args: unknown
    ): GitHubListTagsArgs {

        return this.validateRepositoryArguments(
            args
        );
    }
    public async searchRepositories(
        args: GitHubSearchRepositoriesArgs
    ): Promise<GitHubRepositorySearchResponse> {

        if (
            !args.query ||
            !args.query.trim()
        ) {
            throw new Error(
                "GitHub repository search query is required."
            );
        }

        return this.githubService.searchRepositories(
            args.query,
            args.page,
            args.perPage
        );
    }
    private searchRepositoriesTool(): MCPTool {

        return {
            name: "github_search_repositories",

            description:
                "Search GitHub repositories using a search query and optional GitHub search qualifiers.",

            inputSchema: {
                type: "object",

                properties: {
                    query: {
                        type: "string",
                        description:
                            "GitHub repository search query. GitHub search qualifiers such as language:, stars:, topic:, and user: may be used."
                    },

                    page: {
                        type: "number",
                        description:
                            "Page number. Defaults to 1."
                    },

                    perPage: {
                        type: "number",
                        description:
                            "Number of repositories to return per page. Defaults to 30 and has a maximum of 100."
                    }
                },

                required: [
                    "query"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateSearchRepositoriesArguments(
                        args
                    );

                return this.searchRepositories(
                    validatedArgs
                );
            }
        };
    }

    private validateSearchRepositoriesArguments(
        args: unknown
    ): GitHubSearchRepositoriesArgs {

        if (
            !args ||
            typeof args !== "object"
        ) {
            throw new Error(
                "GitHub repository search arguments are required."
            );
        }

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.query !== "string" ||
            !value.query.trim()
        ) {
            throw new Error(
                "GitHub repository search query is required."
            );
        }

        const result:
            GitHubSearchRepositoriesArgs = {
            query:
                value.query.trim()
        };

        if (
            value.page !== undefined
        ) {

            if (
                typeof value.page !== "number" ||
                !Number.isInteger(value.page) ||
                value.page < 1
            ) {
                throw new Error(
                    "GitHub repository search page must be a positive integer."
                );
            }

            result.page =
                value.page;
        }

        if (
            value.perPage !== undefined
        ) {

            if (
                typeof value.perPage !== "number" ||
                !Number.isInteger(value.perPage) ||
                value.perPage < 1 ||
                value.perPage > 100
            ) {
                throw new Error(
                    "GitHub repository search perPage must be between 1 and 100."
                );
            }

            result.perPage =
                value.perPage;
        }

        return result;
    }

}