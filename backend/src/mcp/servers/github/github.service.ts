import type { GitHubConfig } from "./github.types";

export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    private: boolean;

    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;

    size: number;

    language: string | null;

    visibility?: string | null;

    archived: boolean;
    disabled: boolean;

    default_branch: string;

    created_at: string;
    updated_at: string;
    pushed_at: string | null;
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

export interface GitHubContributor {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;

    contributions: number;

    type: string;
}

export interface GitHubCollaborator {
    login: string;
    id: number;

    avatar_url: string;
    html_url: string;

    type: string;

    permissions?: {
        pull?: boolean;
        triage?: boolean;
        push?: boolean;
        maintain?: boolean;
        admin?: boolean;
    };
}

export interface GitHubRepositoryStatistics {
    fullName: string;

    stars: number;
    forks: number;
    watchers: number;

    openIssues: number;

    sizeKb: number;

    language: string | null;

    defaultBranch: string;

    visibility: string | null;

    archived: boolean;
    disabled: boolean;

    createdAt: string;
    updatedAt: string;
    pushedAt: string | null;

    openIssuesAndPullRequests: number;

    htmlUrl: string;
}

export interface GitHubRepositoryLanguage {
    language: string;
    bytes: number;
    percentage: number;
}

export interface GitHubRepositoryLanguages {
    totalBytes: number;
    languages: GitHubRepositoryLanguage[];
}

export interface GitHubWorkflow {
    id: number;
    name: string;
    path: string;
    state: string;
    html_url: string;
    created_at: string;
    updated_at: string;
}

export interface GitHubWorkflowRun {
    id: number;
    name: string;
    workflow_id: number;

    head_branch: string | null;
    head_sha: string;

    status: string;
    conclusion: string | null;

    event: string;

    html_url: string;

    created_at: string;
    updated_at: string;

    run_number: number;
    run_attempt?: number;
}

export interface GitHubWorkflowRunsResponse {
    total_count: number;
    workflow_runs: GitHubWorkflowRun[];
}

export interface GitHubWorkflowJob {

    id: number;

    run_id: number;

    workflow_name?: string | null;

    head_branch: string | null;

    head_sha: string;

    run_attempt?: number;

    node_id?: string;

    url: string;

    html_url: string;

    status: string;

    conclusion: string | null;

    started_at: string | null;

    completed_at: string | null;

    name: string;

    steps?: GitHubWorkflowStep[];
}

export interface GitHubWorkflowStep {

    name: string;

    status: string;

    conclusion: string | null;

    number: number;

    started_at: string | null;

    completed_at: string | null;
}

export interface GitHubWorkflowJobsResponse {

    total_count: number;

    jobs: GitHubWorkflowJob[];
}

export interface GitHubArtifact {

    id: number;

    node_id?: string;

    name: string;

    size_in_bytes: number;

    url: string;

    archive_download_url: string;

    expired: boolean;

    created_at: string;

    expires_at: string | null;

    updated_at: string;

    workflow_run?: {
        id: number;
        repository_id?: number;
        head_repository_id?: number;
        head_branch?: string;
        head_sha?: string;
    } | null;
}

export interface GitHubArtifactsResponse {

    total_count: number;

    artifacts: GitHubArtifact[];
}

export interface GitHubDiscussion {

    id: number;

    number: number;

    title: string;

    body: string;

    html_url: string;

    category: {
        id: number;
        name: string;
        slug?: string;
        emoji?: string;
    };

    user: {
        login: string;
        id: number;
        avatar_url?: string;
        html_url?: string;
    };

    state?: string;

    locked?: boolean;

    answer_chosen_at?: string | null;

    answer_chosen_by?: {
        login: string;
        id: number;
    } | null;

    created_at: string;

    updated_at: string;
}

export interface GitHubDiscussionComment {

    id: number;

    body: string;

    html_url: string;

    user: {
        login: string;
        id: number;
        avatar_url?: string;
        html_url?: string;
    };

    created_at: string;

    updated_at: string;
}

export interface GitHubDiscussionCategory {

    id: number;

    repository_id?: number;

    name: string;

    description?: string;

    emoji?: string;

    emoji_html?: string;

    slug: string;

    created_at?: string;

    updated_at?: string;
}

export interface GitHubDiscussionsResponse {

    total_count?: number;

    discussions: GitHubDiscussion[];
}

export interface GitHubDiscussionCommentsResponse {

    total_count?: number;

    comments: GitHubDiscussionComment[];
}

export interface GitHubDiscussionCategoriesResponse {

    total_count?: number;

    categories: GitHubDiscussionCategory[];
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

    /**
 * Get a GitHub user's public profile.
 */
    public async getUser(
        username: string
    ): Promise<GitHubUser> {

        if (!username?.trim()) {
            throw new Error(
                "GitHub username is required."
            );
        }

        return this.request<GitHubUser>(
            `/users/${encodeURIComponent(username.trim())}`
        );
    }

    /**
 * Get a GitHub organization's public profile.
 */
    public async getOrganization(
        organization: string
    ): Promise<GitHubOrganization> {

        if (!organization?.trim()) {
            throw new Error(
                "GitHub organization name is required."
            );
        }

        return this.request<GitHubOrganization>(
            `/orgs/${encodeURIComponent(organization.trim())}`
        );
    }

    /**
 * List contributors to a GitHub repository.
 *
 * Contributors are returned in descending order
 * of contribution count by GitHub.
 */
    public async listContributors(
        owner: string,
        repository: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubContributor[]> {

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

        if (
            !Number.isInteger(page) ||
            page < 1
        ) {
            throw new Error(
                "GitHub contributors page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "GitHub contributors perPage must be between 1 and 100."
            );
        }

        const params =
            new URLSearchParams();

        params.set(
            "page",
            String(page)
        );

        params.set(
            "per_page",
            String(perPage)
        );

        const endpoint =
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}` +
            `/contributors?${params.toString()}`;

        return this.request<GitHubContributor[]>(
            endpoint
        );
    }
    /**
     * List collaborators for a GitHub repository.
     *
     * This endpoint may require authentication and
     * appropriate repository permissions.
     */
    public async listCollaborators(
        owner: string,
        repository: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubCollaborator[]> {

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

        if (
            !Number.isInteger(page) ||
            page < 1
        ) {
            throw new Error(
                "GitHub collaborators page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "GitHub collaborators perPage must be between 1 and 100."
            );
        }

        const params =
            new URLSearchParams();

        params.set(
            "page",
            String(page)
        );

        params.set(
            "per_page",
            String(perPage)
        );

        const endpoint =
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}` +
            `/collaborators?${params.toString()}`;

        return this.request<GitHubCollaborator[]>(
            endpoint
        );
    }

    /**
 * Get developer-oriented repository statistics.
 */
    public async getRepositoryStatistics(
        owner: string,
        repository: string
    ): Promise<GitHubRepositoryStatistics> {

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

        const result =
            await this.getRepository(
                owner.trim(),
                repository.trim()
            );

        return {
            fullName:
                result.full_name,

            stars:
                result.stargazers_count,

            forks:
                result.forks_count,

            watchers:
                result.watchers_count,

            openIssues:
                result.open_issues_count,

            sizeKb:
                result.size,

            language:
                result.language ?? null,

            defaultBranch:
                result.default_branch,

            visibility:
                result.visibility ?? null,

            archived:
                result.archived,

            disabled:
                result.disabled,

            createdAt:
                result.created_at,

            updatedAt:
                result.updated_at,

            pushedAt:
                result.pushed_at ?? null,

            openIssuesAndPullRequests:
                result.open_issues_count,

            htmlUrl:
                result.html_url
        };
    }

    /**
 * Get programming languages used by a GitHub repository.
 *
 * GitHub returns language usage as byte counts.
 * This method converts those counts into
 * AI-friendly percentages.
 */
    public async getRepositoryLanguages(
        owner: string,
        repository: string
    ): Promise<GitHubRepositoryLanguages> {

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

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/languages`;

        const response =
            await this.request<Record<string, number>>(
                endpoint
            );

        const totalBytes =
            Object.values(response)
                .reduce(
                    (total, bytes) =>
                        total + bytes,
                    0
                );

        if (totalBytes === 0) {

            return {
                totalBytes: 0,
                languages: []
            };
        }

        const languages =
            Object.entries(response)
                .map(
                    ([language, bytes]) => ({
                        language,
                        bytes,
                        percentage:
                            Number(
                                (
                                    bytes /
                                    totalBytes *
                                    100
                                ).toFixed(2)
                            )
                    })
                )
                .sort(
                    (a, b) =>
                        b.bytes - a.bytes
                );

        return {
            totalBytes,
            languages
        };
    }

    /**
 * List GitHub Actions workflows for a repository.
 */
    public async listWorkflows(
        owner: string,
        repository: string
    ): Promise<GitHubWorkflow[]> {

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

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/actions/workflows`;

        const response =
            await this.request<{
                total_count: number;
                workflows: GitHubWorkflow[];
            }>(endpoint);

        return response.workflows;
    }

    /**
 * List GitHub Actions workflow runs.
 *
 * Optionally filters by workflow, branch and status.
 */
    public async listWorkflowRuns(
        owner: string,
        repository: string,
        workflowId?: number,
        branch?: string,
        status?: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubWorkflowRunsResponse> {

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

        if (
            !Number.isInteger(page) ||
            page < 1
        ) {
            throw new Error(
                "Workflow runs page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "Workflow runs perPage must be between 1 and 100."
            );
        }

        const params =
            new URLSearchParams();

        params.set(
            "page",
            String(page)
        );

        params.set(
            "per_page",
            String(perPage)
        );

        if (workflowId !== undefined) {
            params.set(
                "workflow_id",
                String(workflowId)
            );
        }

        if (branch?.trim()) {
            params.set(
                "branch",
                branch.trim()
            );
        }

        if (status?.trim()) {
            params.set(
                "status",
                status.trim()
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/actions/runs?${params.toString()}`;

        return this.request<GitHubWorkflowRunsResponse>(
            endpoint
        );
    }

    /**
 * Get details for a specific GitHub Actions workflow run.
 */
    public async getWorkflowRun(
        owner: string,
        repository: string,
        runId: number
    ): Promise<GitHubWorkflowRun> {

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

        if (
            !Number.isInteger(runId) ||
            runId <= 0
        ) {
            throw new Error(
                "GitHub workflow run ID must be a positive integer."
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/actions/runs/${runId}`;

        return this.request<GitHubWorkflowRun>(
            endpoint
        );
    }

    /**
 * List jobs belonging to a GitHub Actions workflow run.
 */
    public async listWorkflowJobs(
        owner: string,
        repository: string,
        runId: number,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubWorkflowJobsResponse> {

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

        if (
            !Number.isInteger(runId) ||
            runId <= 0
        ) {
            throw new Error(
                "Workflow run ID must be a positive integer."
            );
        }

        if (
            !Number.isInteger(page) ||
            page < 1
        ) {
            throw new Error(
                "Workflow jobs page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "Workflow jobs perPage must be between 1 and 100."
            );
        }

        const params =
            new URLSearchParams();

        params.set(
            "page",
            String(page)
        );

        params.set(
            "per_page",
            String(perPage)
        );

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/actions/runs/${runId}/jobs?${params.toString()}`;

        return this.request<GitHubWorkflowJobsResponse>(
            endpoint
        );
    }
    /**
 * Get details about a specific GitHub Actions job.
 */
    public async getWorkflowJob(
        owner: string,
        repository: string,
        jobId: number
    ): Promise<GitHubWorkflowJob> {

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

        if (
            !Number.isInteger(jobId) ||
            jobId <= 0
        ) {
            throw new Error(
                "Workflow job ID must be a positive integer."
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/actions/jobs/${jobId}`;

        return this.request<GitHubWorkflowJob>(
            endpoint
        );
    }
    /**
 * Retrieve logs for a GitHub Actions job.
 *
 * GitHub returns the job log as text.
 */
    public async getWorkflowJobLogs(
        owner: string,
        repository: string,
        jobId: number
    ): Promise<string> {

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

        if (
            !Number.isInteger(jobId) ||
            jobId <= 0
        ) {
            throw new Error(
                "Workflow job ID must be a positive integer."
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/actions/jobs/${jobId}/logs`;

        return this.request<string>(
            endpoint
        );
    }
    private async requestText(
        endpoint: string
    ): Promise<string> {

        const response =
            await fetch(
                `${this.config.apiUrl}${endpoint}`,
                {
                    method: "GET",

                    headers: {
                        Accept:
                            "application/vnd.github+json",

                        ...(this.config.token
                            ? {
                                Authorization:
                                    `Bearer ${this.config.token}`
                            }
                            : {})
                    }
                }
            );

        if (!response.ok) {
            throw new Error(
                `GitHub API request failed: ${response.status} ${response.statusText}`
            );
        }

        return response.text();
    }
    /**
 * List artifacts generated by GitHub Actions
 * for a repository.
 */
    public async listWorkflowArtifacts(
        owner: string,
        repository: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubArtifactsResponse> {

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

        if (
            !Number.isInteger(page) ||
            page < 1
        ) {
            throw new Error(
                "Artifacts page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "Artifacts perPage must be between 1 and 100."
            );
        }

        const params =
            new URLSearchParams();

        params.set(
            "page",
            String(page)
        );

        params.set(
            "per_page",
            String(perPage)
        );

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/actions/artifacts?${params.toString()}`;

        return this.request<GitHubArtifactsResponse>(
            endpoint
        );
    }

    /**
 * List GitHub Discussions for a repository.
 */
    public async listDiscussions(
        owner: string,
        repository: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubDiscussionsResponse> {

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

        if (
            !Number.isInteger(page) ||
            page < 1
        ) {
            throw new Error(
                "Discussions page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "Discussions perPage must be between 1 and 100."
            );
        }

        /**
         * GitHub GraphQL uses cursor-based pagination.
         *
         * We expose page/perPage to the MCP layer and internally
         * advance through GraphQL cursors until the requested page
         * is reached.
         */
        let cursor: string | null = null;

        let currentPage = 1;

        /**
         * Explicit GraphQL response type.
         *
         * Keeping this type named prevents TypeScript from getting
         * into circular inference when the response is used later
         * in the function.
         */
        type DiscussionsQueryResult = {
            repository: {
                discussions: {
                    totalCount: number;

                    nodes: Array<{
                        id: string;
                        number: number;
                        title: string;
                        body: string;
                        url: string;
                        createdAt: string;
                        updatedAt: string;
                        locked: boolean;

                        category: {
                            id: string;
                            name: string;
                            slug: string;
                            emoji?: string;
                        };

                        author: {
                            login: string;
                            databaseId: number;
                            avatarUrl?: string;
                            url: string;
                        } | null;

                        answerChosenAt: string | null;

                        answerChosenBy: {
                            login: string;
                            databaseId: number;
                        } | null;
                    }>;

                    pageInfo: {
                        hasNextPage: boolean;
                        endCursor: string | null;
                    };
                };
            };
        };

        const query = `
        query(
            $owner: String!
            $repository: String!
            $first: Int!
            $after: String
        ) {
            repository(
                owner: $owner
                name: $repository
            ) {
                discussions(
                    first: $first
                    after: $after
                    orderBy: {
                        field: UPDATED_AT
                        direction: DESC
                    }
                ) {
                    totalCount

                    nodes {
                        id
                        number
                        title
                        body
                        url
                        createdAt
                        updatedAt
                        locked

                        category {
                            id
                            name
                            slug
                            emoji
                        }

                        author {
                            login
                            databaseId
                            avatarUrl
                            url
                        }

                        answerChosenAt

                        answerChosenBy {
                            login
                            databaseId
                        }
                    }

                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }
        }
    `;

        while (currentPage <= page) {

            const result: DiscussionsQueryResult =
                await this.graphqlRequest<DiscussionsQueryResult>(
                    query,
                    {
                        owner,
                        repository,
                        first: perPage,
                        after: cursor
                    }
                );

            const discussions:
                DiscussionsQueryResult["repository"]["discussions"] =
                result.repository.discussions;

            /**
             * Requested page reached.
             */
            if (
                currentPage === page
            ) {

                return {
                    total_count:
                        discussions.totalCount,

                    discussions:
                        discussions.nodes.map(
                            (
                                discussion:
                                    DiscussionsQueryResult[
                                    "repository"
                                    ]["discussions"]["nodes"][number]
                            ) => ({
                                id: Number(
                                    discussion.id
                                        .split("/")
                                        .pop() ?? 0
                                ),

                                number:
                                    discussion.number,

                                title:
                                    discussion.title,

                                body:
                                    discussion.body,

                                html_url:
                                    discussion.url,

                                category: {
                                    id: Number(
                                        discussion.category.id
                                            .split("/")
                                            .pop() ?? 0
                                    ),

                                    name:
                                        discussion.category.name,

                                    slug:
                                        discussion.category.slug,

                                    emoji:
                                        discussion.category.emoji
                                },

                                user: {
                                    login:
                                        discussion.author?.login ??
                                        "unknown",

                                    id:
                                        discussion.author?.databaseId ??
                                        0,

                                    avatar_url:
                                        discussion.author?.avatarUrl,

                                    html_url:
                                        discussion.author?.url
                                },

                                locked:
                                    discussion.locked,

                                answer_chosen_at:
                                    discussion.answerChosenAt,

                                answer_chosen_by:
                                    discussion.answerChosenBy
                                        ? {
                                            login:
                                                discussion
                                                    .answerChosenBy
                                                    .login,

                                            id:
                                                discussion
                                                    .answerChosenBy
                                                    .databaseId
                                        }
                                        : null,

                                created_at:
                                    discussion.createdAt,

                                updated_at:
                                    discussion.updatedAt
                            })
                        )
                };
            }

            /**
             * There are no more pages available.
             */
            if (
                !discussions.pageInfo.hasNextPage
            ) {

                return {
                    total_count:
                        discussions.totalCount,

                    discussions: []
                };
            }

            /**
             * Move to the next GraphQL page.
             */
            cursor =
                discussions.pageInfo.endCursor;

            currentPage++;
        }

        return {
            discussions: []
        };
    }

    private async graphqlRequest<T>(
        query: string,
        variables: Record<string, unknown>
    ): Promise<T> {

        const response =
            await fetch(
                `${this.config.apiUrl}/graphql`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Accept:
                            "application/vnd.github+json",

                        ...(this.config.token
                            ? {
                                Authorization:
                                    `Bearer ${this.config.token}`
                            }
                            : {})
                    },

                    body: JSON.stringify({
                        query,
                        variables
                    })
                }
            );

        if (!response.ok) {

            throw new Error(
                `GitHub GraphQL request failed: ${response.status} ${response.statusText}`
            );
        }

        const result =
            await response.json() as {
                data?: T;
                errors?: Array<{
                    message: string;
                }>;
            };

        if (
            result.errors &&
            result.errors.length > 0
        ) {

            throw new Error(
                result.errors
                    .map(error => error.message)
                    .join("; ")
            );
        }

        if (!result.data) {

            throw new Error(
                "GitHub GraphQL response did not contain data."
            );
        }

        return result.data;
    }
    /**
     * Get a specific GitHub Discussion.
     */
    public async getDiscussion(
        owner: string,
        repository: string,
        discussionNumber: number
    ): Promise<GitHubDiscussion> {

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

        if (
            !Number.isInteger(discussionNumber) ||
            discussionNumber <= 0
        ) {
            throw new Error(
                "Discussion number must be a positive integer."
            );
        }

        const query = `
        query(
            $owner: String!
            $repository: String!
            $number: Int!
        ) {
            repository(
                owner: $owner
                name: $repository
            ) {
                discussion(
                    number: $number
                ) {
                    id
                    number
                    title
                    body
                    url
                    createdAt
                    updatedAt
                    locked

                    category {
                        id
                        name
                        slug
                        emoji
                    }

                    author {
                        login
                        databaseId
                        avatarUrl
                        url
                    }

                    answerChosenAt

                    answerChosenBy {
                        login
                        databaseId
                    }
                }
            }
        }
    `;

        const result =
            await this.graphqlRequest<{
                repository: {
                    discussion: {
                        id: string;
                        number: number;
                        title: string;
                        body: string;
                        url: string;
                        createdAt: string;
                        updatedAt: string;
                        locked: boolean;

                        category: {
                            id: string;
                            name: string;
                            slug: string;
                            emoji?: string;
                        };

                        author: {
                            login: string;
                            databaseId: number;
                            avatarUrl?: string;
                            url: string;
                        } | null;

                        answerChosenAt: string | null;

                        answerChosenBy: {
                            login: string;
                            databaseId: number;
                        } | null;
                    } | null;
                };
            }>(
                query,
                {
                    owner,
                    repository,
                    number: discussionNumber
                }
            );

        if (
            !result.repository.discussion
        ) {
            throw new Error(
                `GitHub Discussion #${discussionNumber} was not found.`
            );
        }

        const discussion =
            result.repository.discussion;

        return {
            id: Number(
                discussion.id
                    .split("/")
                    .pop() ?? 0
            ),

            number:
                discussion.number,

            title:
                discussion.title,

            body:
                discussion.body,

            html_url:
                discussion.url,

            category: {
                id: Number(
                    discussion.category.id
                        .split("/")
                        .pop() ?? 0
                ),

                name:
                    discussion.category.name,

                slug:
                    discussion.category.slug,

                emoji:
                    discussion.category.emoji
            },

            user: {
                login:
                    discussion.author?.login ??
                    "unknown",

                id:
                    discussion.author?.databaseId ??
                    0,

                avatar_url:
                    discussion.author?.avatarUrl,

                html_url:
                    discussion.author?.url
            },

            locked:
                discussion.locked,

            answer_chosen_at:
                discussion.answerChosenAt,

            answer_chosen_by:
                discussion.answerChosenBy
                    ? {
                        login:
                            discussion.answerChosenBy.login,

                        id:
                            discussion.answerChosenBy.databaseId
                    }
                    : null,

            created_at:
                discussion.createdAt,

            updated_at:
                discussion.updatedAt
        };
    }

    /**
 * List comments for a GitHub Discussion.
 */
    public async listDiscussionComments(
        owner: string,
        repository: string,
        discussionNumber: number,
        first: number = 30
    ): Promise<GitHubDiscussionCommentsResponse> {

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

        if (
            !Number.isInteger(discussionNumber) ||
            discussionNumber <= 0
        ) {
            throw new Error(
                "Discussion number must be a positive integer."
            );
        }

        if (
            !Number.isInteger(first) ||
            first < 1 ||
            first > 100
        ) {
            throw new Error(
                "first must be between 1 and 100."
            );
        }

        const query = `
        query(
            $owner: String!
            $repository: String!
            $number: Int!
            $first: Int!
        ) {
            repository(
                owner: $owner
                name: $repository
            ) {
                discussion(
                    number: $number
                ) {
                    comments(
                        first: $first
                    ) {
                        totalCount

                        nodes {
                            id
                            body
                            url
                            createdAt
                            updatedAt

                            author {
                                login
                                databaseId
                                avatarUrl
                                url
                            }
                        }
                    }
                }
            }
        }
    `;

        const result =
            await this.graphqlRequest<{
                repository: {
                    discussion: {
                        comments: {
                            totalCount: number;

                            nodes: Array<{
                                id: string;
                                body: string;
                                url: string;
                                createdAt: string;
                                updatedAt: string;

                                author: {
                                    login: string;
                                    databaseId: number;
                                    avatarUrl?: string;
                                    url: string;
                                } | null;
                            }>;
                        };
                    } | null;
                };
            }>(
                query,
                {
                    owner,
                    repository,
                    number: discussionNumber,
                    first
                }
            );

        if (
            !result.repository.discussion
        ) {
            throw new Error(
                `GitHub Discussion #${discussionNumber} was not found.`
            );
        }

        const comments =
            result.repository.discussion.comments;

        return {
            total_count:
                comments.totalCount,

            comments:
                comments.nodes.map(
                    comment => ({
                        id: Number(
                            comment.id
                                .split("/")
                                .pop() ?? 0
                        ),

                        body:
                            comment.body,

                        html_url:
                            comment.url,

                        user: {
                            login:
                                comment.author?.login ??
                                "unknown",

                            id:
                                comment.author?.databaseId ??
                                0,

                            avatar_url:
                                comment.author?.avatarUrl,

                            html_url:
                                comment.author?.url
                        },

                        created_at:
                            comment.createdAt,

                        updated_at:
                            comment.updatedAt
                    })
                )
        };
    }

    /**
 * List Discussion categories for a repository.
 */
    public async listDiscussionCategories(
        owner: string,
        repository: string
    ): Promise<GitHubDiscussionCategoriesResponse> {

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

        const query = `
        query(
            $owner: String!
            $repository: String!
        ) {
            repository(
                owner: $owner
                name: $repository
            ) {
                discussionCategories(
                    first: 100
                ) {
                    totalCount

                    nodes {
                        id
                        name
                        description
                        emoji
                        emojiHTML
                        slug
                        createdAt
                        updatedAt
                    }
                }
            }
        }
    `;

        const result =
            await this.graphqlRequest<{
                repository: {
                    discussionCategories: {
                        totalCount: number;

                        nodes: Array<{
                            id: string;
                            name: string;
                            description: string;
                            emoji: string;
                            emojiHTML: string;
                            slug: string;
                            createdAt: string;
                            updatedAt: string;
                        }>;
                    };
                };
            }>(
                query,
                {
                    owner,
                    repository
                }
            );

        const categories =
            result.repository
                .discussionCategories;

        return {
            total_count:
                categories.totalCount,

            categories:
                categories.nodes.map(
                    category => ({
                        id: Number(
                            category.id
                                .split("/")
                                .pop() ?? 0
                        ),

                        name:
                            category.name,

                        description:
                            category.description,

                        emoji:
                            category.emoji,

                        emoji_html:
                            category.emojiHTML,

                        slug:
                            category.slug,

                        created_at:
                            category.createdAt,

                        updated_at:
                            category.updatedAt
                    })
                )
        };
    }

}