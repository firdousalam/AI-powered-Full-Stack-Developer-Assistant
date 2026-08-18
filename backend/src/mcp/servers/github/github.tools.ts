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

export interface GitHubGetUserArgs {
    username: string;
}

export interface GitHubGetOrganizationArgs {
    organization: string;
}

export interface GitHubListContributorsArgs {
    owner: string;
    repository: string;
    page?: number;
    perPage?: number;
}

export interface GitHubListCollaboratorsArgs {
    owner: string;
    repository: string;
    page?: number;
    perPage?: number;
}
export interface GitHubRepositoryStatisticsArgs {
    owner: string;
    repository: string;
}

export interface GitHubRepositoryLanguagesArgs {
    owner: string;
    repository: string;
}

export interface GitHubListWorkflowRunsArgs {
    owner: string;
    repository: string;

    workflowId?: number;
    branch?: string;
    status?: string;

    page?: number;
    perPage?: number;
}

export interface GitHubGetWorkflowRunArgs {
    owner: string;
    repository: string;
    runId: number;
}

export interface GitHubListWorkflowJobsArgs {
    owner: string;
    repository: string;
    runId: number;
    page?: number;
    perPage?: number;
}

export interface GitHubGetWorkflowJobArgs {
    owner: string;
    repository: string;
    jobId: number;
}

export interface GitHubGetWorkflowJobLogsArgs {
    owner: string;
    repository: string;
    jobId: number;
}

export interface GitHubListWorkflowArtifactsArgs {
    owner: string;
    repository: string;
    page?: number;
    perPage?: number;
}

export interface GitHubListDiscussionsArgs {

    owner: string;

    repository: string;

    page?: number;

    perPage?: number;
}

export interface GitHubGetDiscussionArgs {

    owner: string;

    repository: string;

    discussionNumber: number;
}

export interface GitHubListDiscussionCommentsArgs {

    owner: string;

    repository: string;

    discussionNumber: number;

    first?: number;
}

export interface GitHubListDiscussionCategoriesArgs {

    owner: string;

    repository: string;
}

export interface GitHubListCodeScanningAlertsArgs {

    owner: string;

    repository: string;

    state?: string;

    ref?: string;

    page?: number;

    perPage?: number;
}

export interface GitHubGetCodeScanningAlertArgs {

    owner: string;

    repository: string;

    alertNumber: number;
}

export interface GitHubCodeScanningSummaryArgs {

    owner: string;

    repository: string;
}

export interface GitHubListSecretScanningAlertsArgs {

    owner: string;

    repository: string;

    state?: string;

    page?: number;

    perPage?: number;
}

export interface GitHubGetSecretScanningAlertArgs {

    owner: string;

    repository: string;

    alertNumber: number;
}

export interface GitHubSecretScanningSummaryArgs {

    owner: string;

    repository: string;
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
    GitHubRepositorySearchResponse,
    GitHubUser,
    GitHubOrganization,
    GitHubContributor,
    GitHubCollaborator,
    GitHubRepositoryStatistics,
    GitHubRepositoryLanguages,
    GitHubWorkflow,
    GitHubWorkflowRun,
    GitHubWorkflowRunsResponse,
    GitHubWorkflowJob,
    GitHubWorkflowJobsResponse,
    GitHubArtifact,
    GitHubArtifactsResponse,
    GitHubDiscussionsResponse,
    GitHubDiscussion,
    GitHubDiscussionCommentsResponse,
    GitHubDiscussionCategoriesResponse,
    GitHubCodeScanningAlertsResponse,
    GitHubCodeScanningAlert,
    GitHubSecretScanningAlertsResponse,
    GitHubSecretScanningAlert
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
            this.searchRepositoriesTool(),
            this.getUserTool(),
            this.getOrganizationTool(),
            this.listContributorsTool(),
            this.listCollaboratorsTool(),
            this.getRepositoryStatisticsTool(),
            this.getRepositoryLanguagesTool(),

            this.listWorkflowsTool(),
            this.listWorkflowRunsTool(),
            this.getWorkflowRunTool(),

            this.listWorkflowJobsTool(),
            this.getWorkflowJobTool(),
            this.getWorkflowJobLogsTool(),
            this.listWorkflowArtifactsTool(),

            this.listDiscussionsTool(),
            this.getDiscussionTool(),
            this.listDiscussionCommentsTool(),
            this.listDiscussionCategoriesTool(),

            this.listCodeScanningAlertsTool(),
            this.getCodeScanningAlertTool(),
            this.getCodeScanningSummaryTool(),

            this.listSecretScanningAlertsTool(),
            this.getSecretScanningAlertTool(),
            this.getSecretScanningSummaryTool(),

            /*
            * Security findings tools
            */
            this.getSecurityFindingsTool(),
            this.getSecuritySummaryTool(),

            /*
             * Security configuration tools
             */
            this.getSecurityPolicyTool(),
            this.getSecurityFeaturesTool(),
            this.getSecurityConfigurationSummaryTool(),

            /*
            * Repository Administration
            */
            this.getRepositoryAdministrationTool(),

            this.getRepositorySettingsTool(),

            this.getRepositoryFeaturesTool(),

            this.getRepositoryMergeConfigurationTool(),

            /*
            * Branch Protection
            */
            this.getListBranchProtectionTool(),

            this.getBranchProtectionTool(),

            this.getBranchRulesTool(),

            /*
            * Repository Environments
            */
            this.getListEnvironmentsTool(),

            this.getGetEnvironmentTool(),

            this.getGetEnvironmentSummaryTool(),

            /*
            * Repository Projects
            */
            this.getListProjectsTool(),

            this.getGetProjectTool(),

            this.getGetProjectSummaryTool(),

            /*
            * Advanced Issues
            */
            this.getListAdvancedIssuesTool(),

            this.getIssueTimelineTool(),

            this.getIssueSummaryTool(),

            /*
            * Advanced Pull Requests
            */
            this.getPullRequestReviewersTool(),

            this.getPullRequestReviewsTool(),

            this.getPullRequestReviewCommentsTool(),

            this.getPullRequestChecksTool(),

            this.getPullRequestSummaryTool(),

            /*
            * Repository Webhooks / Events
            */

            this.getListWebhooksTool(),

            this.getGetWebhookTool(),

            this.getListWebhookDeliveriesTool(),

            this.getGetWebhookDeliveryTool(),



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
    public async getUser(
        args: GitHubGetUserArgs
    ): Promise<GitHubUser> {

        if (
            !args.username ||
            !args.username.trim()
        ) {
            throw new Error(
                "GitHub username is required."
            );
        }

        return this.githubService.getUser(
            args.username.trim()
        );
    }
    public async getOrganization(
        args: GitHubGetOrganizationArgs
    ): Promise<GitHubOrganization> {

        if (
            !args.organization ||
            !args.organization.trim()
        ) {
            throw new Error(
                "GitHub organization name is required."
            );
        }

        return this.githubService.getOrganization(
            args.organization.trim()
        );
    }
    private getUserTool(): MCPTool {

        return {
            name: "github_get_user",

            description:
                "Get public profile and repository statistics for a GitHub user.",

            inputSchema: {
                type: "object",

                properties: {
                    username: {
                        type: "string",
                        description:
                            "GitHub username."
                    }
                },

                required: [
                    "username"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateGetUserArguments(
                        args
                    );

                return this.getUser(
                    validatedArgs
                );
            }
        };
    } private validateGetUserArguments(
        args: unknown
    ): GitHubGetUserArgs {

        if (
            !args ||
            typeof args !== "object"
        ) {
            throw new Error(
                "GitHub user arguments are required."
            );
        }

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.username !== "string" ||
            !value.username.trim()
        ) {
            throw new Error(
                "GitHub username is required."
            );
        }

        return {
            username:
                value.username.trim()
        };
    }
    private getOrganizationTool(): MCPTool {

        return {
            name: "github_get_organization",

            description:
                "Get public profile and repository statistics for a GitHub organization.",

            inputSchema: {
                type: "object",

                properties: {
                    organization: {
                        type: "string",
                        description:
                            "GitHub organization name."
                    }
                },

                required: [
                    "organization"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateGetOrganizationArguments(
                        args
                    );

                return this.getOrganization(
                    validatedArgs
                );
            }
        };
    }
    private validateGetOrganizationArguments(
        args: unknown
    ): GitHubGetOrganizationArgs {

        if (
            !args ||
            typeof args !== "object"
        ) {
            throw new Error(
                "GitHub organization arguments are required."
            );
        }

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.organization !== "string" ||
            !value.organization.trim()
        ) {
            throw new Error(
                "GitHub organization name is required."
            );
        }

        return {
            organization:
                value.organization.trim()
        };
    }

    public async listContributors(
        args: GitHubListContributorsArgs
    ): Promise<GitHubContributor[]> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listContributors(
            args.owner,
            args.repository,
            args.page,
            args.perPage
        );
    }

    public async listCollaborators(
        args: GitHubListCollaboratorsArgs
    ): Promise<GitHubCollaborator[]> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listCollaborators(
            args.owner,
            args.repository,
            args.page,
            args.perPage
        );
    }
    private listContributorsTool(): MCPTool {

        return {
            name: "github_list_contributors",

            description:
                "List contributors to a GitHub repository, including their contribution counts.",

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

                    page: {
                        type: "number",
                        description:
                            "Page number. Defaults to 1."
                    },

                    perPage: {
                        type: "number",
                        description:
                            "Number of contributors per page. Defaults to 30 and has a maximum of 100."
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
                    this.validateListContributorsArguments(
                        args
                    );

                return this.listContributors(
                    validatedArgs
                );
            }
        };
    }
    private validateListContributorsArguments(
        args: unknown
    ): GitHubListContributorsArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        const result:
            GitHubListContributorsArgs = {
            ...repositoryArgs
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
                    "GitHub contributors page must be a positive integer."
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
                    "GitHub contributors perPage must be between 1 and 100."
                );
            }

            result.perPage =
                value.perPage;
        }

        return result;
    }

    private listCollaboratorsTool(): MCPTool {

        return {
            name: "github_list_collaborators",

            description:
                "List collaborators with access to a GitHub repository. This operation may require authentication and appropriate repository permissions.",

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

                    page: {
                        type: "number",
                        description:
                            "Page number. Defaults to 1."
                    },

                    perPage: {
                        type: "number",
                        description:
                            "Number of collaborators per page. Defaults to 30 and has a maximum of 100."
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
                    this.validateListCollaboratorsArguments(
                        args
                    );

                return this.listCollaborators(
                    validatedArgs
                );
            }
        };
    }

    private validateListCollaboratorsArguments(
        args: unknown
    ): GitHubListCollaboratorsArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        const result:
            GitHubListCollaboratorsArgs = {
            ...repositoryArgs
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
                    "GitHub collaborators page must be a positive integer."
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
                    "GitHub collaborators perPage must be between 1 and 100."
                );
            }

            result.perPage =
                value.perPage;
        }

        return result;
    }

    public async getRepositoryStatistics(
        args: GitHubRepositoryStatisticsArgs
    ): Promise<GitHubRepositoryStatistics> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getRepositoryStatistics(
            args.owner,
            args.repository
        );
    }

    private getRepositoryStatisticsTool(): MCPTool {

        return {
            name: "github_get_repository_statistics",

            description:
                "Get developer-oriented statistics and activity metadata for a GitHub repository, including stars, forks, watchers, issues, language, size, default branch, timestamps, and repository status.",

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

                return this.getRepositoryStatistics(
                    validatedArgs
                );
            }
        };
    }

    public async getRepositoryLanguages(
        args: GitHubRepositoryLanguagesArgs
    ): Promise<GitHubRepositoryLanguages> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getRepositoryLanguages(
            args.owner,
            args.repository
        );
    }
    private getRepositoryLanguagesTool(): MCPTool {

        return {
            name: "github_get_repository_languages",

            description:
                "Get the programming languages used by a GitHub repository, including byte counts and percentage distribution.",

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

                return this.getRepositoryLanguages(
                    validatedArgs
                );
            }
        };
    }
    public async listWorkflows(
        args: {
            owner: string;
            repository: string;
        }
    ): Promise<GitHubWorkflow[]> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listWorkflows(
            args.owner,
            args.repository
        );
    }
    public async listWorkflowRuns(
        args: GitHubListWorkflowRunsArgs
    ): Promise<GitHubWorkflowRunsResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listWorkflowRuns(
            args.owner,
            args.repository,
            args.workflowId,
            args.branch,
            args.status,
            args.page,
            args.perPage
        );
    }
    public async getWorkflowRun(
        args: GitHubGetWorkflowRunArgs
    ): Promise<GitHubWorkflowRun> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getWorkflowRun(
            args.owner,
            args.repository,
            args.runId
        );
    }
    private listWorkflowsTool(): MCPTool {

        return {
            name: "github_list_workflows",

            description:
                "List GitHub Actions workflows configured for a repository.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub username or organization."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
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

                return this.listWorkflows(
                    validatedArgs
                );
            }
        };
    }
    private listWorkflowRunsTool(): MCPTool {

        return {
            name: "github_list_workflow_runs",

            description:
                "List GitHub Actions workflow runs, optionally filtered by workflow, branch, status, page, or page size.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    workflowId: {
                        type: "number",
                        description:
                            "Optional GitHub workflow ID."
                    },

                    branch: {
                        type: "string",
                        description:
                            "Optional branch filter."
                    },

                    status: {
                        type: "string",
                        description:
                            "Optional workflow status filter such as completed, in_progress, queued, or failure."
                    },

                    page: {
                        type: "number",
                        description:
                            "Page number. Defaults to 1."
                    },

                    perPage: {
                        type: "number",
                        description:
                            "Number of runs per page. Maximum 100."
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
                    this.validateListWorkflowRunsArguments(
                        args
                    );

                return this.listWorkflowRuns(
                    validatedArgs
                );
            }
        };
    }
    private validateListWorkflowRunsArguments(
        args: unknown
    ): GitHubListWorkflowRunsArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        const result:
            GitHubListWorkflowRunsArgs = {
            ...repositoryArgs
        };

        if (
            value.workflowId !== undefined
        ) {

            if (
                typeof value.workflowId !== "number" ||
                !Number.isInteger(value.workflowId) ||
                value.workflowId <= 0
            ) {
                throw new Error(
                    "workflowId must be a positive integer."
                );
            }

            result.workflowId =
                value.workflowId;
        }

        if (
            value.branch !== undefined
        ) {

            if (
                typeof value.branch !== "string" ||
                !value.branch.trim()
            ) {
                throw new Error(
                    "branch must be a non-empty string."
                );
            }

            result.branch =
                value.branch;
        }

        if (
            value.status !== undefined
        ) {

            if (
                typeof value.status !== "string" ||
                !value.status.trim()
            ) {
                throw new Error(
                    "status must be a non-empty string."
                );
            }

            result.status =
                value.status;
        }

        if (
            value.page !== undefined
        ) {

            if (
                typeof value.page !== "number" ||
                !Number.isInteger(value.page) ||
                value.page < 1
            ) {
                throw new Error(
                    "page must be a positive integer."
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
                    "perPage must be between 1 and 100."
                );
            }

            result.perPage =
                value.perPage;
        }

        return result;
    }
    private getWorkflowRunTool(): MCPTool {

        return {
            name: "github_get_workflow_run",

            description:
                "Get detailed information about a specific GitHub Actions workflow run.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    runId: {
                        type: "number",
                        description:
                            "GitHub Actions workflow run ID."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "runId"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateGetWorkflowRunArguments(
                        args
                    );

                return this.getWorkflowRun(
                    validatedArgs
                );
            }
        };
    }
    private validateGetWorkflowRunArguments(
        args: unknown
    ): GitHubGetWorkflowRunArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.runId !== "number" ||
            !Number.isInteger(value.runId) ||
            value.runId <= 0
        ) {
            throw new Error(
                "runId must be a positive integer."
            );
        }

        return {
            ...repositoryArgs,
            runId: value.runId
        };
    }

    public async listWorkflowJobs(
        args: GitHubListWorkflowJobsArgs
    ): Promise<GitHubWorkflowJobsResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listWorkflowJobs(
            args.owner,
            args.repository,
            args.runId,
            args.page,
            args.perPage
        );
    }
    public async getWorkflowJob(
        args: GitHubGetWorkflowJobArgs
    ): Promise<GitHubWorkflowJob> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getWorkflowJob(
            args.owner,
            args.repository,
            args.jobId
        );
    }
    public async getWorkflowJobLogs(
        args: GitHubGetWorkflowJobLogsArgs
    ): Promise<string> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getWorkflowJobLogs(
            args.owner,
            args.repository,
            args.jobId
        );
    }
    public async listWorkflowArtifacts(
        args: GitHubListWorkflowArtifactsArgs
    ): Promise<GitHubArtifactsResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listWorkflowArtifacts(
            args.owner,
            args.repository,
            args.page,
            args.perPage
        );
    }
    private validatePagination(
        value: Record<string, unknown>
    ): {
        page?: number;
        perPage?: number;
    } {

        const result: {
            page?: number;
            perPage?: number;
        } = {};

        if (value.page !== undefined) {

            if (
                typeof value.page !== "number" ||
                !Number.isInteger(value.page) ||
                value.page < 1
            ) {
                throw new Error(
                    "page must be a positive integer."
                );
            }

            result.page =
                value.page;
        }

        if (value.perPage !== undefined) {

            if (
                typeof value.perPage !== "number" ||
                !Number.isInteger(value.perPage) ||
                value.perPage < 1 ||
                value.perPage > 100
            ) {
                throw new Error(
                    "perPage must be between 1 and 100."
                );
            }

            result.perPage =
                value.perPage;
        }

        return result;
    }
    private validateWorkflowJobArguments(
        args: unknown
    ): GitHubListWorkflowJobsArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.runId !== "number" ||
            !Number.isInteger(value.runId) ||
            value.runId <= 0
        ) {
            throw new Error(
                "runId must be a positive integer."
            );
        }

        return {
            ...repositoryArgs,
            runId: value.runId,
            ...this.validatePagination(value)
        };
    }
    private validateWorkflowJobIdArguments(
        args: unknown
    ): GitHubGetWorkflowJobArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.jobId !== "number" ||
            !Number.isInteger(value.jobId) ||
            value.jobId <= 0
        ) {
            throw new Error(
                "jobId must be a positive integer."
            );
        }

        return {
            ...repositoryArgs,
            jobId: value.jobId
        };
    }
    private listWorkflowJobsTool(): MCPTool {

        return {
            name: "github_list_workflow_jobs",

            description:
                "List jobs belonging to a GitHub Actions workflow run, including job status, conclusion, timing, and steps.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    runId: {
                        type: "number",
                        description:
                            "GitHub Actions workflow run ID."
                    },

                    page: {
                        type: "number"
                    },

                    perPage: {
                        type: "number"
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "runId"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateWorkflowJobArguments(
                        args
                    );

                return this.listWorkflowJobs(
                    validatedArgs
                );
            }
        };
    }

    private getWorkflowJobTool(): MCPTool {

        return {
            name: "github_get_workflow_job",

            description:
                "Get detailed information about a GitHub Actions job and its execution steps.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    jobId: {
                        type: "number",
                        description:
                            "GitHub Actions job ID."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "jobId"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateWorkflowJobIdArguments(
                        args
                    );

                return this.getWorkflowJob(
                    validatedArgs
                );
            }
        };
    }
    private getWorkflowJobLogsTool(): MCPTool {

        return {
            name: "github_get_workflow_job_logs",

            description:
                "Retrieve the logs produced by a GitHub Actions job for CI/CD failure analysis.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    jobId: {
                        type: "number",
                        description:
                            "GitHub Actions job ID."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "jobId"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const validatedArgs =
                    this.validateWorkflowJobIdArguments(
                        args
                    );

                return this.getWorkflowJobLogs(
                    validatedArgs
                );
            }
        };
    }
    private listWorkflowArtifactsTool(): MCPTool {

        return {
            name: "github_list_workflow_artifacts",

            description:
                "List artifacts generated by GitHub Actions workflows for a repository.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    page: {
                        type: "number"
                    },

                    perPage: {
                        type: "number"
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

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                const value =
                    args as Record<string, unknown>;

                return this.listWorkflowArtifacts({
                    ...repositoryArgs,
                    ...this.validatePagination(value)
                });
            }
        };
    }
    public async listDiscussions(
        args: GitHubListDiscussionsArgs
    ): Promise<GitHubDiscussionsResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listDiscussions(
            args.owner,
            args.repository,
            args.page,
            args.perPage
        );
    }
    public async getDiscussion(
        args: GitHubGetDiscussionArgs
    ): Promise<GitHubDiscussion> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getDiscussion(
            args.owner,
            args.repository,
            args.discussionNumber
        );
    }

    public async listDiscussionComments(
        args: GitHubListDiscussionCommentsArgs
    ): Promise<GitHubDiscussionCommentsResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listDiscussionComments(
            args.owner,
            args.repository,
            args.discussionNumber,
            args.first
        );
    }
    public async listDiscussionCategories(
        args: GitHubListDiscussionCategoriesArgs
    ): Promise<GitHubDiscussionCategoriesResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listDiscussionCategories(
            args.owner,
            args.repository
        );
    }
    private validateDiscussionNumberArguments(
        args: unknown
    ): GitHubGetDiscussionArgs {

        const repositoryArgs =
            this.validateRepositoryArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        if (
            typeof value.discussionNumber !== "number" ||
            !Number.isInteger(
                value.discussionNumber
            ) ||
            value.discussionNumber <= 0
        ) {
            throw new Error(
                "discussionNumber must be a positive integer."
            );
        }

        return {
            ...repositoryArgs,

            discussionNumber:
                value.discussionNumber
        };
    }
    private validateDiscussionCommentsArguments(
        args: unknown
    ): GitHubListDiscussionCommentsArgs {

        const base =
            this.validateDiscussionNumberArguments(
                args
            );

        const value =
            args as Record<string, unknown>;

        let first:
            number | undefined;

        if (
            value.first !== undefined
        ) {

            if (
                typeof value.first !== "number" ||
                !Number.isInteger(value.first) ||
                value.first < 1 ||
                value.first > 100
            ) {
                throw new Error(
                    "first must be between 1 and 100."
                );
            }

            first =
                value.first;
        }

        return {
            ...base,
            first
        };
    }
    private listDiscussionsTool(): MCPTool {

        return {

            name:
                "github_list_discussions",

            description:
                "List GitHub Discussions for a repository, including titles, authors, categories, and answer status.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
                    },

                    page: {
                        type:
                            "number"
                    },

                    perPage: {
                        type:
                            "number"
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

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                const value =
                    args as Record<string, unknown>;

                return this.listDiscussions({
                    ...repositoryArgs,

                    ...this.validatePagination(
                        value
                    )
                });
            }
        };
    }
    private getDiscussionTool(): MCPTool {

        return {

            name:
                "github_get_discussion",

            description:
                "Get a specific GitHub Discussion including its body, category, author, and accepted answer information.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
                    },

                    discussionNumber: {
                        type:
                            "number"
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "discussionNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                return this.getDiscussion(
                    this.validateDiscussionNumberArguments(
                        args
                    )
                );
            }
        };
    }

    private listDiscussionCommentsTool(): MCPTool {

        return {

            name:
                "github_list_discussion_comments",

            description:
                "List comments and community responses for a GitHub Discussion.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
                    },

                    discussionNumber: {
                        type:
                            "number"
                    },

                    first: {
                        type:
                            "number"
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "discussionNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                return this.listDiscussionComments(
                    this.validateDiscussionCommentsArguments(
                        args
                    )
                );
            }
        };
    }
    private listDiscussionCategoriesTool(): MCPTool {

        return {

            name:
                "github_list_discussion_categories",

            description:
                "List Discussion categories configured for a GitHub repository.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
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

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                return this.listDiscussionCategories(
                    repositoryArgs
                );
            }
        };
    }

    public async listCodeScanningAlerts(
        args: GitHubListCodeScanningAlertsArgs
    ): Promise<GitHubCodeScanningAlertsResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listCodeScanningAlerts(
            args.owner,
            args.repository,
            args.state,
            args.ref,
            args.page,
            args.perPage
        );
    }

    public async getCodeScanningAlert(
        args: GitHubGetCodeScanningAlertArgs
    ): Promise<GitHubCodeScanningAlert> {

        this.validateRepositoryArguments(
            args
        );

        if (
            !Number.isInteger(args.alertNumber) ||
            args.alertNumber <= 0
        ) {
            throw new Error(
                "alertNumber must be a positive integer."
            );
        }

        return this.githubService.getCodeScanningAlert(
            args.owner,
            args.repository,
            args.alertNumber
        );
    }

    public async getCodeScanningSummary(
        args: GitHubCodeScanningSummaryArgs
    ) {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getCodeScanningSummary(
            args.owner,
            args.repository
        );
    }

    private listCodeScanningAlertsTool(): MCPTool {

        return {

            name:
                "github_list_code_scanning_alerts",

            description:
                "List GitHub Code Scanning and CodeQL security alerts for a repository.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
                    },

                    state: {
                        type:
                            "string",

                        description:
                            "Alert state such as open, dismissed, or fixed."
                    },

                    ref: {
                        type:
                            "string",

                        description:
                            "Git reference such as a branch or commit."
                    },

                    page: {
                        type:
                            "number"
                    },

                    perPage: {
                        type:
                            "number"
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

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                const value =
                    args as Record<string, unknown>;

                return this.listCodeScanningAlerts({
                    ...repositoryArgs,

                    state:
                        typeof value.state === "string"
                            ? value.state
                            : undefined,

                    ref:
                        typeof value.ref === "string"
                            ? value.ref
                            : undefined,

                    page:
                        typeof value.page === "number"
                            ? value.page
                            : undefined,

                    perPage:
                        typeof value.perPage === "number"
                            ? value.perPage
                            : undefined
                });
            }
        };
    }

    private getCodeScanningAlertTool(): MCPTool {

        return {

            name:
                "github_get_code_scanning_alert",

            description:
                "Get detailed information about a specific GitHub Code Scanning or CodeQL security alert.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
                    },

                    alertNumber: {
                        type:
                            "number"
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "alertNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                const value =
                    args as Record<string, unknown>;

                if (
                    typeof value.alertNumber !== "number" ||
                    !Number.isInteger(
                        value.alertNumber
                    ) ||
                    value.alertNumber <= 0
                ) {
                    throw new Error(
                        "alertNumber must be a positive integer."
                    );
                }

                return this.getCodeScanningAlert({
                    ...repositoryArgs,

                    alertNumber:
                        value.alertNumber
                });
            }
        };
    }

    private getCodeScanningSummaryTool(): MCPTool {

        return {

            name:
                "github_get_code_scanning_summary",

            description:
                "Get a security summary of GitHub Code Scanning and CodeQL alerts grouped by state, severity, tool, and rule.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
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

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                return this.getCodeScanningSummary(
                    repositoryArgs
                );
            }
        };
    }
    public async listSecretScanningAlerts(
        args: GitHubListSecretScanningAlertsArgs
    ): Promise<GitHubSecretScanningAlertsResponse> {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.listSecretScanningAlerts(
            args.owner,
            args.repository,
            args.state,
            args.page,
            args.perPage
        );
    }

    public async getSecretScanningAlert(
        args: GitHubGetSecretScanningAlertArgs
    ): Promise<GitHubSecretScanningAlert> {

        this.validateRepositoryArguments(
            args
        );

        if (
            !Number.isInteger(args.alertNumber) ||
            args.alertNumber <= 0
        ) {
            throw new Error(
                "alertNumber must be a positive integer."
            );
        }

        return this.githubService.getSecretScanningAlert(
            args.owner,
            args.repository,
            args.alertNumber
        );
    }

    public async getSecretScanningSummary(
        args: GitHubSecretScanningSummaryArgs
    ) {

        this.validateRepositoryArguments(
            args
        );

        return this.githubService.getSecretScanningSummary(
            args.owner,
            args.repository
        );
    }
    private listSecretScanningAlertsTool(): MCPTool {

        return {

            name:
                "github_list_secret_scanning_alerts",

            description:
                "List GitHub secret scanning alerts for a repository without exposing detected secret values.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
                    },

                    state: {
                        type:
                            "string",

                        description:
                            "Alert state such as open or resolved."
                    },

                    page: {
                        type:
                            "number"
                    },

                    perPage: {
                        type:
                            "number"
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

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                const value =
                    args as Record<string, unknown>;

                return this.listSecretScanningAlerts({

                    ...repositoryArgs,

                    state:
                        typeof value.state === "string"
                            ? value.state
                            : undefined,

                    page:
                        typeof value.page === "number"
                            ? value.page
                            : undefined,

                    perPage:
                        typeof value.perPage === "number"
                            ? value.perPage
                            : undefined
                });
            }
        };
    }
    private getSecretScanningAlertTool(): MCPTool {

        return {

            name:
                "github_get_secret_scanning_alert",

            description:
                "Get detailed metadata about a GitHub secret scanning alert without returning the detected secret.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
                    },

                    alertNumber: {
                        type:
                            "number"
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "alertNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                const value =
                    args as Record<string, unknown>;

                if (
                    typeof value.alertNumber !== "number" ||
                    !Number.isInteger(
                        value.alertNumber
                    ) ||
                    value.alertNumber <= 0
                ) {
                    throw new Error(
                        "alertNumber must be a positive integer."
                    );
                }

                return this.getSecretScanningAlert({

                    ...repositoryArgs,

                    alertNumber:
                        value.alertNumber
                });
            }
        };
    }
    private getSecretScanningSummaryTool(): MCPTool {

        return {

            name:
                "github_get_secret_scanning_summary",

            description:
                "Get a security summary of GitHub secret scanning alerts grouped by secret type and resolution.",

            inputSchema: {

                type:
                    "object",

                properties: {

                    owner: {
                        type:
                            "string"
                    },

                    repository: {
                        type:
                            "string"
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

                const repositoryArgs =
                    this.validateRepositoryArguments(
                        args
                    );

                return this.getSecretScanningSummary(
                    repositoryArgs
                );
            }
        };
    }

    /**
 * ============================================================
 * GitHub Security Findings Tool
 * ============================================================
 */
    public getSecurityFindingsTool(): MCPTool {

        return {

            name:
                "github_get_security_findings",

            description:
                "Get normalized security findings for a GitHub repository, including Dependabot, Code Scanning, and Secret Scanning findings.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    if (!owner) {
                        throw new Error(
                            "GitHub repository owner is required."
                        );
                    }

                    if (!repository) {
                        throw new Error(
                            "GitHub repository name is required."
                        );
                    }

                    return this.githubService
                        .getSecurityFindings(
                            owner,
                            repository
                        );
                }
        };
    }

    /**
 * ============================================================
 * GitHub Security Summary Tool
 * ============================================================
 */
    public getSecuritySummaryTool(): MCPTool {

        return {

            name:
                "github_get_security_summary",

            description:
                "Get an AI-friendly security summary for a GitHub repository, including total findings, open findings, severity counts, and findings grouped by security source.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    if (!owner) {
                        throw new Error(
                            "GitHub repository owner is required."
                        );
                    }

                    if (!repository) {
                        throw new Error(
                            "GitHub repository name is required."
                        );
                    }

                    return this.githubService
                        .getSecuritySummary(
                            owner,
                            repository
                        );
                }
        };
    }

    /**
 * ============================================================
 * GitHub Security Policy Tool
 * ============================================================
 */
    public getSecurityPolicyTool(): MCPTool {

        return {

            name:
                "github_get_security_policy",

            description:
                "Check whether a GitHub repository has a SECURITY.md policy and return its location.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    if (!owner) {
                        throw new Error(
                            "GitHub repository owner is required."
                        );
                    }

                    if (!repository) {
                        throw new Error(
                            "GitHub repository name is required."
                        );
                    }

                    return this.githubService
                        .getSecurityPolicy(
                            owner,
                            repository
                        );
                }
        };
    }

    /**
 * ============================================================
 * GitHub Security Features Tool
 * ============================================================
 */
    public getSecurityFeaturesTool(): MCPTool {

        return {

            name:
                "github_get_security_features",

            description:
                "Get the security features enabled for a GitHub repository, including Dependabot, Code Scanning, Secret Scanning, and push protection.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    if (!owner) {
                        throw new Error(
                            "GitHub repository owner is required."
                        );
                    }

                    if (!repository) {
                        throw new Error(
                            "GitHub repository name is required."
                        );
                    }

                    return this.githubService
                        .getSecurityFeatures(
                            owner,
                            repository
                        );
                }
        };
    }

    /**
 * ============================================================
 * GitHub Security Configuration Summary Tool
 * ============================================================
 */
    public getSecurityConfigurationSummaryTool(): MCPTool {

        return {

            name:
                "github_get_security_configuration_summary",

            description:
                "Get an AI-friendly summary of a GitHub repository's security configuration and enabled security features.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    if (!owner) {
                        throw new Error(
                            "GitHub repository owner is required."
                        );
                    }

                    if (!repository) {
                        throw new Error(
                            "GitHub repository name is required."
                        );
                    }

                    return this.githubService
                        .getSecurityConfigurationSummary(
                            owner,
                            repository
                        );
                }
        };
    }
    /**
     * Get complete repository administration information.
     */
    public getRepositoryAdministrationTool(): MCPTool {

        return {

            name:
                "github_get_repository_administration",

            description:
                "Get normalized GitHub repository administration information including repository settings, features, merge configuration, and security-analysis configuration.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    if (!owner) {
                        throw new Error(
                            "GitHub repository owner is required."
                        );
                    }

                    if (!repository) {
                        throw new Error(
                            "GitHub repository name is required."
                        );
                    }

                    return this.githubService
                        .getRepositoryAdministration(
                            owner,
                            repository
                        );
                }
        };
    }
    /**
 * Get repository settings.
 */
    public getRepositorySettingsTool(): MCPTool {

        return {

            name:
                "github_get_repository_settings",

            description:
                "Get GitHub repository settings including visibility, default branch, archive status, fork status, and template status.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    return this.githubService
                        .getRepositorySettings(
                            owner,
                            repository
                        );
                }
        };
    }
    /**
 * Get repository feature configuration.
 */
    public getRepositoryFeaturesTool(): MCPTool {

        return {

            name:
                "github_get_repository_features",

            description:
                "Get GitHub repository feature configuration including Issues, Projects, Wiki, Discussions, and Pages.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    return this.githubService
                        .getRepositoryFeatures(
                            owner,
                            repository
                        );
                }
        };
    }
    /**
 * Get repository merge configuration.
 */
    public getRepositoryMergeConfigurationTool(): MCPTool {

        return {

            name:
                "github_get_repository_merge_configuration",

            description:
                "Get GitHub repository merge configuration including merge commits, squash merging, rebase merging, auto merge, branch deletion, and update branch settings.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    return this.githubService
                        .getRepositoryMergeConfiguration(
                            owner,
                            repository
                        );
                }
        };
    }

    /**
 * List repository branches and protection status.
 */
    public getListBranchProtectionTool(): MCPTool {

        return {

            name:
                "github_list_branch_protection",

            description:
                "List repository branches and indicate which branches are protected.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    page: {
                        type: "number"
                    },

                    perPage: {
                        type: "number"
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    return this.githubService
                        .listBranchProtection(
                            owner,
                            repository,
                            Number(args?.page ?? 1),
                            Number(args?.perPage ?? 30)
                        );
                }
        };
    }
    /**
 * Get complete branch protection configuration.
 */
    public getBranchProtectionTool(): MCPTool {

        return {

            name:
                "github_get_branch_protection",

            description:
                "Get detailed branch protection configuration for a GitHub repository branch.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    branch: {
                        type: "string"
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "branch"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    const branch =
                        String(
                            args?.branch ?? ""
                        ).trim();

                    return this.githubService
                        .getBranchProtection(
                            owner,
                            repository,
                            branch
                        );
                }
        };
    }
    /**
 * Get simplified branch protection rules.
 */
    public getBranchRulesTool(): MCPTool {

        return {

            name:
                "github_get_branch_rules",

            description:
                "Get a simplified, AI-friendly summary of branch protection rules.",

            inputSchema: {

                type: "object",

                properties: {

                    owner: {
                        type: "string"
                    },

                    repository: {
                        type: "string"
                    },

                    branch: {
                        type: "string"
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "branch"
                ]
            },

            execute:
                async (
                    args?: Record<string, unknown>
                ): Promise<unknown> => {

                    const owner =
                        String(
                            args?.owner ?? ""
                        ).trim();

                    const repository =
                        String(
                            args?.repository ?? ""
                        ).trim();

                    const branch =
                        String(
                            args?.branch ?? ""
                        ).trim();

                    return this.githubService
                        .getBranchRules(
                            owner,
                            repository,
                            branch
                        );
                }
        };
    }
    /**
 * List repository environments.
 */
    private getListEnvironmentsTool(): MCPTool {
        return {
            name: "github_list_environments",

            description:
                "List deployment environments configured for a GitHub repository.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    page: {
                        type: "number",
                        description:
                            "Page number. Defaults to 1.",
                        minimum: 1
                    },

                    perPage: {
                        type: "number",
                        description:
                            "Number of environments per page. Defaults to 30. Maximum is 100.",
                        minimum: 1,
                        maximum: 100
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                const owner =
                    String(args?.owner ?? "");

                const repository =
                    String(args?.repository ?? "");

                const page =
                    Number(args?.page ?? 1);

                const perPage =
                    Number(args?.perPage ?? 30);

                return this.githubService.listEnvironments(
                    owner,
                    repository,
                    page,
                    perPage
                );
            }
        };
    }
    /**
 * Get a repository environment.
 */
    private getGetEnvironmentTool(): MCPTool {
        return {
            name: "github_get_environment",

            description:
                "Get the configuration and protection settings of a GitHub repository environment.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    environment: {
                        type: "string",
                        description:
                            "GitHub environment name."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "environment"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                const owner =
                    String(args?.owner ?? "");

                const repository =
                    String(args?.repository ?? "");

                const environment =
                    String(args?.environment ?? "");

                return this.githubService.getEnvironment(
                    owner,
                    repository,
                    environment
                );
            }
        };
    }
    /**
 * Get an AI-friendly summary of repository environments.
 */
    private getGetEnvironmentSummaryTool(): MCPTool {
        return {
            name: "github_get_environment_summary",

            description:
                "Get an AI-friendly summary of repository environments, including protection settings, required reviewers, wait timers, and branch policies.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                const owner =
                    String(args?.owner ?? "");

                const repository =
                    String(args?.repository ?? "");

                return this.githubService
                    .getEnvironmentSummary(
                        owner,
                        repository
                    );
            }
        };
    }

    private getListProjectsTool(): MCPTool {
        return {
            name: "github_list_projects",

            description:
                "List projects associated with a GitHub repository.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                return this.githubService.listProjects(
                    String(args?.owner ?? ""),
                    String(args?.repository ?? "")
                );
            }
        };
    }
    private getGetProjectTool(): MCPTool {
        return {
            name: "github_get_project",

            description:
                "Get detailed information about a GitHub repository project.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    projectNumber: {
                        type: "number",
                        description:
                            "GitHub project number."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "projectNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                return this.githubService.getProject(
                    String(args?.owner ?? ""),
                    String(args?.repository ?? ""),
                    Number(args?.projectNumber ?? 0)
                );
            }
        };
    }
    private getGetProjectSummaryTool(): MCPTool {
        return {
            name: "github_get_project_summary",

            description:
                "Get an AI-friendly summary of projects associated with a GitHub repository.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                return this.githubService
                    .getProjectSummary(
                        String(args?.owner ?? ""),
                        String(args?.repository ?? "")
                    );
            }
        };
    }
    private getListAdvancedIssuesTool(): MCPTool {
        return {
            name:
                "github_list_advanced_issues",

            description:
                "List GitHub repository issues with advanced filtering by state, labels, assignee, milestone and pagination.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    state: {
                        type: "string",
                        enum: [
                            "open",
                            "closed",
                            "all"
                        ],
                        description:
                            "Issue state filter."
                    },

                    labels: {
                        type: "string",
                        description:
                            "Comma-separated issue labels."
                    },

                    assignee: {
                        type: "string",
                        description:
                            "GitHub username assigned to the issue."
                    },

                    milestone: {
                        type: "string",
                        description:
                            "Milestone number or * for issues assigned to milestones."
                    },

                    page: {
                        type: "number",
                        minimum: 1,
                        description:
                            "Page number."
                    },

                    perPage: {
                        type: "number",
                        minimum: 1,
                        maximum: 100,
                        description:
                            "Number of results per page."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                return this.githubService
                    .listAdvancedIssues(
                        String(
                            args?.owner ?? ""
                        ),

                        String(
                            args?.repository ?? ""
                        ),

                        (
                            args?.state === "closed" ||
                            args?.state === "all"
                        )
                            ? args.state
                            : "open",

                        args?.labels
                            ? String(args.labels)
                            : undefined,

                        args?.assignee
                            ? String(args.assignee)
                            : undefined,

                        args?.milestone
                            ? String(args.milestone)
                            : undefined,

                        Number(
                            args?.page ?? 1
                        ),

                        Number(
                            args?.perPage ?? 30
                        )
                    );
            }
        };
    }
    private getIssueTimelineTool(): MCPTool {
        return {
            name:
                "github_get_issue_timeline",

            description:
                "Get the event timeline of a GitHub issue.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    issueNumber: {
                        type: "number",
                        minimum: 1,
                        description:
                            "GitHub issue number."
                    },

                    page: {
                        type: "number",
                        minimum: 1,
                        description:
                            "Page number."
                    },

                    perPage: {
                        type: "number",
                        minimum: 1,
                        maximum: 100,
                        description:
                            "Number of events per page."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "issueNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                return this.githubService
                    .getIssueTimeline(
                        String(
                            args?.owner ?? ""
                        ),

                        String(
                            args?.repository ?? ""
                        ),

                        Number(
                            args?.issueNumber ?? 0
                        ),

                        Number(
                            args?.page ?? 1
                        ),

                        Number(
                            args?.perPage ?? 30
                        )
                    );
            }
        };
    }
    private getIssueSummaryTool(): MCPTool {
        return {
            name:
                "github_get_issue_summary",

            description:
                "Get an AI-friendly summary of repository issues.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ): Promise<unknown> => {

                return this.githubService
                    .getIssueSummary(
                        String(
                            args?.owner ?? ""
                        ),

                        String(
                            args?.repository ?? ""
                        )
                    );
            }
        };
    }
    private getPullRequestReviewersTool(): MCPTool {

        return {
            name:
                "github_get_pull_request_reviewers",

            description:
                "Get reviewers currently requested for a GitHub pull request.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    pullNumber: {
                        type: "number",
                        description:
                            "Pull request number.",
                        minimum: 1
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "pullNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                const owner =
                    String(args?.owner ?? "");

                const repository =
                    String(args?.repository ?? "");

                const pullNumber =
                    Number(args?.pullNumber);

                return this.githubService
                    .getPullRequestReviewers(
                        owner,
                        repository,
                        pullNumber
                    );
            }
        };
    }

    private getPullRequestReviewsTool(): MCPTool {

        return {
            name:
                "github_get_pull_request_reviews",

            description:
                "Get reviews submitted on a GitHub pull request.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    pullNumber: {
                        type: "number",
                        description:
                            "Pull request number.",
                        minimum: 1
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "pullNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                return this.githubService
                    .getPullRequestReviews(
                        String(args?.owner ?? ""),
                        String(args?.repository ?? ""),
                        Number(args?.pullNumber)
                    );
            }
        };
    }
    private getPullRequestReviewCommentsTool(): MCPTool {

        return {
            name:
                "github_get_pull_request_review_comments",

            description:
                "Get review comments for a GitHub pull request.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    pullNumber: {
                        type: "number",
                        description:
                            "Pull request number.",
                        minimum: 1
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "pullNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                return this.githubService
                    .getPullRequestReviewComments(
                        String(args?.owner ?? ""),
                        String(args?.repository ?? ""),
                        Number(args?.pullNumber)
                    );
            }
        };
    }
    private getPullRequestChecksTool(): MCPTool {

        return {
            name:
                "github_get_pull_request_checks",

            description:
                "Get CI check runs associated with a GitHub pull request.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    pullNumber: {
                        type: "number",
                        description:
                            "Pull request number.",
                        minimum: 1
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "pullNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                return this.githubService
                    .getPullRequestChecks(
                        String(args?.owner ?? ""),
                        String(args?.repository ?? ""),
                        Number(args?.pullNumber)
                    );
            }
        };
    }
    private getPullRequestSummaryTool(): MCPTool {

        return {
            name:
                "github_get_pull_request_summary",

            description:
                "Get an AI-friendly summary of a GitHub pull request including reviewers, reviews, comments and CI checks.",

            inputSchema: {
                type: "object",

                properties: {
                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    pullNumber: {
                        type: "number",
                        description:
                            "Pull request number.",
                        minimum: 1
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "pullNumber"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) => {

                return this.githubService
                    .getPullRequestSummary(
                        String(args?.owner ?? ""),
                        String(args?.repository ?? ""),
                        Number(args?.pullNumber)
                    );
            }
        };
    }

    private getListWebhooksTool(): MCPTool {

        return {
            name:
                "github_list_webhooks",

            description:
                "List webhooks configured for a GitHub repository.",

            inputSchema: {
                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    page: {
                        type: "number",
                        description:
                            "Page number.",
                        minimum: 1
                    },

                    perPage: {
                        type: "number",
                        description:
                            "Number of webhooks per page.",
                        minimum: 1,
                        maximum: 100
                    }
                },

                required: [
                    "owner",
                    "repository"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) =>
                this.githubService.listWebhooks(
                    String(args?.owner ?? ""),
                    String(args?.repository ?? ""),
                    Number(args?.page ?? 1),
                    Number(args?.perPage ?? 30)
                )
        };
    }

    private getGetWebhookTool(): MCPTool {

        return {
            name:
                "github_get_webhook",

            description:
                "Get a specific webhook configured for a GitHub repository.",

            inputSchema: {
                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    hookId: {
                        type: "number",
                        description:
                            "GitHub webhook ID.",
                        minimum: 1
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "hookId"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) =>
                this.githubService.getWebhook(
                    String(args?.owner ?? ""),
                    String(args?.repository ?? ""),
                    Number(args?.hookId)
                )
        };
    }
    private getListWebhookDeliveriesTool(): MCPTool {

        return {
            name:
                "github_list_webhook_deliveries",

            description:
                "List recent deliveries for a GitHub repository webhook.",

            inputSchema: {
                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    hookId: {
                        type: "number",
                        description:
                            "GitHub webhook ID.",
                        minimum: 1
                    },

                    perPage: {
                        type: "number",
                        description:
                            "Number of deliveries to return.",
                        minimum: 1,
                        maximum: 100
                    },

                    cursor: {
                        type: "string",
                        description:
                            "Cursor for delivery pagination."
                    },

                    status: {
                        type: "string",
                        enum: [
                            "success",
                            "failure"
                        ],
                        description:
                            "Filter deliveries by outcome."
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "hookId"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) =>
                this.githubService.listWebhookDeliveries(
                    String(args?.owner ?? ""),
                    String(args?.repository ?? ""),
                    Number(args?.hookId),
                    Number(args?.perPage ?? 30),
                    args?.cursor
                        ? String(args.cursor)
                        : undefined,
                    args?.status === "success" ||
                        args?.status === "failure"
                        ? args.status
                        : undefined
                )
        };
    }
    private getGetWebhookDeliveryTool(): MCPTool {

        return {
            name:
                "github_get_webhook_delivery",

            description:
                "Inspect a specific GitHub repository webhook delivery.",

            inputSchema: {
                type: "object",

                properties: {

                    owner: {
                        type: "string",
                        description:
                            "GitHub repository owner."
                    },

                    repository: {
                        type: "string",
                        description:
                            "GitHub repository name."
                    },

                    hookId: {
                        type: "number",
                        description:
                            "GitHub webhook ID.",
                        minimum: 1
                    },

                    deliveryId: {
                        type: "number",
                        description:
                            "GitHub webhook delivery ID.",
                        minimum: 1
                    }
                },

                required: [
                    "owner",
                    "repository",
                    "hookId",
                    "deliveryId"
                ]
            },

            execute: async (
                args?: Record<string, unknown>
            ) =>
                this.githubService.getWebhookDelivery(
                    String(args?.owner ?? ""),
                    String(args?.repository ?? ""),
                    Number(args?.hookId),
                    Number(args?.deliveryId)
                )
        };
    }

}