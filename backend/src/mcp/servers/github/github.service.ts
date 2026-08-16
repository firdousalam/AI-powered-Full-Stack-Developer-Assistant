import type { GitHubConfig } from "./github.types";

export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    default_branch: string;
}

export interface GitHubContent {
    name: string;
    path: string;
    sha: string;
    size?: number;
    type: "file" | "dir";
    html_url?: string;
    download_url?: string | null;

    /**
     * Base64 encoded file content returned by GitHub.
     */
    content?: string;

    /**
     * Encoding used by GitHub for the content.
     */
    encoding?: string;
}

export interface GitHubCodeSearchItem {
    name: string;
    path: string;
    sha: string;
    html_url: string;
    repository: {
        id: number;
        name: string;
        full_name: string;
    };
}

export interface GitHubCodeSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubCodeSearchItem[];
}


export interface GitHubBranch {
    name: string;
    protected: boolean;
}

export interface GitHubApiError {
    message: string;
    documentation_url?: string;
    status?: number;
}

export interface GitHubIssueUser {
    login: string;
}

export interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body: string | null;
    state: "open" | "closed";
    html_url: string;
    user: GitHubIssueUser;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    labels: Array<{
        name: string;
    }>;
}
export interface GitHubIssueUser {
    login: string;
}

export interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body: string | null;
    state: "open" | "closed";
    html_url: string;
    user: GitHubIssueUser;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    labels: Array<{
        name: string;
    }>;
}

export interface GitHubPullRequestUser {
    login: string;
}

export interface GitHubPullRequest {
    id: number;
    number: number;
    title: string;
    body: string | null;
    state: "open" | "closed";
    html_url: string;
    user: GitHubPullRequestUser;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    merged_at: string | null;
    draft: boolean;
    head: {
        ref: string;
        sha: string;
    };
    base: {
        ref: string;
        sha: string;
    };
}

export interface GitHubCommitAuthor {
    name: string;
    email: string;
    date: string;
}

export interface GitHubCommitUser {
    login: string;
}

export interface GitHubCommit {
    sha: string;

    html_url: string;

    commit: {
        message: string;

        author: GitHubCommitAuthor;

        committer: GitHubCommitAuthor;
    };

    author: GitHubCommitUser | null;

    committer: GitHubCommitUser | null;
}

export interface GitHubFileChange {
    filename: string;
    status:
    | "added"
    | "modified"
    | "deleted"
    | "renamed"
    | "copied"
    | "changed";

    additions: number;
    deletions: number;
    changes: number;

    blob_url?: string;
    raw_url?: string;
    previous_filename?: string;

    patch?: string;
}

export interface GitHubCompareResponse {
    status: string;

    ahead_by: number;
    behind_by: number;

    total_commits: number;

    commits: GitHubCommit[];

    files: GitHubFileChange[];
}

export interface GitHubTreeItem {
    path: string;
    mode: string;
    type: "blob" | "tree" | "commit";
    sha: string;
    size?: number;
    url?: string;
}

export interface GitHubTreeResponse {
    sha: string;
    url: string;
    tree: GitHubTreeItem[];
    truncated: boolean;
}

export interface GitHubRelease {
    id: number;
    tag_name: string;
    name: string | null;
    body: string | null;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string | null;
    html_url: string;
    target_commitish: string;
    author: GitHubIssueUser;
}

export interface GitHubTag {
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    zipball_url?: string;
    tarball_url?: string;
}
export interface GitHubRepositorySearchItem
    extends GitHubRepository {
    score?: number;
    full_name: string;
}

export interface GitHubRepositorySearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubRepositorySearchItem[];
}

export interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    type: string;

    name?: string | null;
    company?: string | null;
    blog?: string | null;
    location?: string | null;
    email?: string | null;
    bio?: string | null;

    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;

    created_at: string;
    updated_at: string;
}

export interface GitHubOrganization {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;

    name?: string | null;
    company?: string | null;
    blog?: string | null;
    location?: string | null;
    email?: string | null;
    description?: string | null;

    public_repos: number;
    followers: number;
    following: number;

    created_at: string;
    updated_at: string;
}


export class GitHubService {
    private readonly config: GitHubConfig;

    constructor(config: GitHubConfig) {
        this.config = {
            ...config,
            apiUrl: config.apiUrl.replace(/\/+$/, ""),
        };
    }

    /**
     * Returns the configured GitHub API URL.
     */
    public getApiUrl(): string {
        return this.config.apiUrl;
    }

    /**
     * Returns whether authentication is configured.
     */
    public isAuthenticated(): boolean {
        return Boolean(this.config.token);
    }

    /**
     * Builds headers for GitHub API requests.
     */
    private getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        };

        if (this.config.token) {
            headers.Authorization = `Bearer ${this.config.token}`;
        }

        return headers;
    }

    /**
     * Performs a GitHub API request.
     */
    private async request<T>(
        path: string,
        options: RequestInit = {},
    ): Promise<T> {
        const url = `${this.config.apiUrl}/${path.replace(/^\/+/, "")}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                ...this.getHeaders(),
                ...(options.headers ?? {}),
            },
        });

        if (!response.ok) {
            let errorMessage = `GitHub API request failed with status ${response.status}`;

            try {
                const error = (await response.json()) as GitHubApiError;

                if (error.message) {
                    errorMessage = error.message;
                }
            } catch {
                // Keep the default HTTP error message.
            }

            throw new Error(errorMessage);
        }

        return (await response.json()) as T;
    }

    /**
     * Gets a GitHub repository.
     */
    public async getRepository(
        owner: string,
        repository: string,
    ): Promise<GitHubRepository> {
        return this.request<GitHubRepository>(
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`,
        );
    }

    /**
     * Gets repository contents.
     */
    public async getContents(
        owner: string,
        repository: string,
        path = "",
        ref?: string,
    ): Promise<GitHubContent | GitHubContent[]> {
        const encodedPath = path
            .split("/")
            .filter(Boolean)
            .map((segment) => encodeURIComponent(segment))
            .join("/");

        const query = ref
            ? `?ref=${encodeURIComponent(ref)}`
            : "";

        return this.request<GitHubContent | GitHubContent[]>(
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/contents/${encodedPath}${query}`,
        );
    }

    /**
     * Gets repository branches.
     */
    public async getBranches(
        owner: string,
        repository: string,
    ): Promise<GitHubBranch[]> {
        return this.request<GitHubBranch[]>(
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/branches`,
        );
    }

    /**
     * Performs a lightweight GitHub health check.
     */
    public async health(): Promise<{
        status: "healthy" | "unhealthy";
        apiUrl: string;
        authenticated: boolean;
    }> {
        try {
            await this.request<{
                current_user_url: string;
            }>("/");

            return {
                status: "healthy",
                apiUrl: this.config.apiUrl,
                authenticated: this.isAuthenticated(),
            };
        } catch {
            return {
                status: "unhealthy",
                apiUrl: this.config.apiUrl,
                authenticated: this.isAuthenticated(),
            };
        }
    }

    /**
     * Releases resources used by the service.
     */
    public async dispose(): Promise<void> {
        // No persistent resources currently require cleanup.
    }

    /**
 * Search code across a GitHub repository.
 *
 * GitHub search queries support GitHub's code-search syntax.
 *
 * Examples:
 *
 *   getRepository
 *   filename:package.json
 *   extension:ts MCPTool
 *   path:src githubService
 */
    public async searchCode(
        owner: string,
        repository: string,
        query: string,
    ): Promise<GitHubCodeSearchResponse> {

        if (!query?.trim()) {
            throw new Error(
                "GitHub code search query is required."
            );
        }

        const searchQuery =
            `${query.trim()} repo:${owner}/${repository}`;

        return this.request<GitHubCodeSearchResponse>(
            `/search/code?q=${encodeURIComponent(searchQuery)}`
        );
    }

    /**
 * List issues from a GitHub repository.
 *
 * Pull requests are also returned by GitHub's
 * issues API, so they are explicitly filtered out.
 */
    public async listIssues(
        owner: string,
        repository: string,
        state: "open" | "closed" | "all" = "open"
    ): Promise<GitHubIssue[]> {

        if (!owner?.trim()) {
            throw new Error(
                "GitHub repository owner is required."
            );
        }

        if (!repository?.trim()) {
            throw new Error(
                "GitHub repository name is required."
            );
        }

        const params =
            new URLSearchParams({
                state,
                per_page: "100"
            });

        const issues =
            await this.request<GitHubIssue[]>(
                `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/issues?${params.toString()}`
            );

        /*
         * GitHub's /issues endpoint includes pull requests.
         *
         * Pull requests contain a pull_request property.
         * Our GitHubIssue interface intentionally does not
         * expose that property, so use a small runtime check.
         */
        return issues.filter(
            issue =>
                !(
                    "pull_request" in
                    (issue as unknown as Record<string, unknown>)
                )
        );
    }

    /**
 * List pull requests from a GitHub repository.
 */
    public async listPullRequests(
        owner: string,
        repository: string,
        state: "open" | "closed" | "all" = "open"
    ): Promise<GitHubPullRequest[]> {

        if (!owner?.trim()) {
            throw new Error(
                "GitHub repository owner is required."
            );
        }

        if (!repository?.trim()) {
            throw new Error(
                "GitHub repository name is required."
            );
        }

        const params =
            new URLSearchParams({
                state,
                per_page: "100"
            });

        return this.request<GitHubPullRequest[]>(
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/pulls?${params.toString()}`
        );
    }

    /**
 * List commits from a GitHub repository.
 *
 * An optional path can be supplied to retrieve
 * the history of a specific file or directory.
 *
 * An optional ref can be supplied to retrieve
 * history for a specific branch, tag, or commit SHA.
 */
    public async listCommits(
        owner: string,
        repository: string,
        path?: string,
        ref?: string
    ): Promise<GitHubCommit[]> {

        if (!owner?.trim()) {
            throw new Error(
                "GitHub repository owner is required."
            );
        }

        if (!repository?.trim()) {
            throw new Error(
                "GitHub repository name is required."
            );
        }

        const params =
            new URLSearchParams();

        if (path?.trim()) {
            params.set(
                "path",
                path.trim()
            );
        }

        if (ref?.trim()) {
            params.set(
                "sha",
                ref.trim()
            );
        }

        params.set(
            "per_page",
            "100"
        );

        const query =
            params.toString();

        const endpoint =
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/commits` +
            (query ? `?${query}` : "");

        return this.request<GitHubCommit[]>(
            endpoint
        );
    }
    /**
 * Compare two commits, branches, or tags in a GitHub repository.
 *
 * Examples:
 *
 *   main...feature-branch
 *   abc123...def456
 *   v1.0.0...v1.1.0
 */
    public async compareCommits(
        owner: string,
        repository: string,
        base: string,
        head: string
    ): Promise<GitHubCompareResponse> {

        if (!owner?.trim()) {
            throw new Error(
                "GitHub repository owner is required."
            );
        }

        if (!repository?.trim()) {
            throw new Error(
                "GitHub repository name is required."
            );
        }

        if (!base?.trim()) {
            throw new Error(
                "GitHub comparison base is required."
            );
        }

        if (!head?.trim()) {
            throw new Error(
                "GitHub comparison head is required."
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}` +
            `/compare/${encodeURIComponent(base.trim())}...${encodeURIComponent(head.trim())}`;

        return this.request<GitHubCompareResponse>(
            endpoint
        );
    }

    /**
 * Get the complete Git tree for a repository.
 *
 * The recursive option allows the agent to receive
 * the repository structure in a single request.
 *
 * ref can be a branch, tag, or commit SHA.
 */
    public async getTree(
        owner: string,
        repository: string,
        ref?: string
    ): Promise<GitHubTreeResponse> {

        if (!owner?.trim()) {
            throw new Error(
                "GitHub repository owner is required."
            );
        }

        if (!repository?.trim()) {
            throw new Error(
                "GitHub repository name is required."
            );
        }

        const treeRef =
            ref?.trim() || "HEAD";

        const endpoint =
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}` +
            `/git/trees/${encodeURIComponent(treeRef)}?recursive=1`;

        return this.request<GitHubTreeResponse>(
            endpoint
        );
    }

    /**
 * List Git tags from a GitHub repository.
 */
    public async listTags(
        owner: string,
        repository: string
    ): Promise<GitHubTag[]> {

        if (!owner?.trim()) {
            throw new Error(
                "GitHub repository owner is required."
            );
        }

        if (!repository?.trim()) {
            throw new Error(
                "GitHub repository name is required."
            );
        }

        return this.request<GitHubTag[]>(
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/tags?per_page=100`
        );
    }
    /**
 * List releases from a GitHub repository.
 */
    public async listReleases(
        owner: string,
        repository: string
    ): Promise<GitHubRelease[]> {

        if (!owner?.trim()) {
            throw new Error(
                "GitHub repository owner is required."
            );
        }

        if (!repository?.trim()) {
            throw new Error(
                "GitHub repository name is required."
            );
        }

        return this.request<GitHubRelease[]>(
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/releases?per_page=100`
        );
    }

    /**
 * Search GitHub repositories using GitHub's
 * repository search API.
 *
 * The query can contain GitHub search qualifiers,
 * for example:
 *
 *   typescript
 *   nodejs language:typescript
 *   mcp stars:>100
 *   react topic:frontend
 */
    public async searchRepositories(
        query: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubRepositorySearchResponse> {

        if (!query?.trim()) {
            throw new Error(
                "GitHub repository search query is required."
            );
        }

        if (
            !Number.isInteger(page) ||
            page < 1
        ) {
            throw new Error(
                "GitHub repository search page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "GitHub repository search perPage must be between 1 and 100."
            );
        }

        const params =
            new URLSearchParams();

        params.set(
            "q",
            query.trim()
        );

        params.set(
            "page",
            String(page)
        );

        params.set(
            "per_page",
            String(perPage)
        );

        const endpoint =
            `/search/repositories?${params.toString()}`;

        return this.request<GitHubRepositorySearchResponse>(
            endpoint
        );
    }

}