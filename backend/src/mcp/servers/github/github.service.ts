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

export interface GitHubCodeScanningAlert {

    number: number;

    created_at: string;

    updated_at: string;

    url: string;

    html_url?: string;

    state: string;

    fixed_at?: string | null;

    dismissed_by?: {
        login: string;
        id: number;
    } | null;

    dismissed_at?: string | null;

    dismissed_reason?: string | null;

    dismissed_comment?: string | null;

    rule: {
        id: string;

        severity?: string | null;

        description: string;

        name?: string | null;

        security_severity_level?: string | null;

        help?: string | null;

        help_uri?: string | null;

        tags?: string[];
    };

    tool: {
        name: string;

        version?: string | null;

        guid?: string | null;
    };

    most_recent_instance?: {

        ref: string;

        analysis_key?: string | null;

        environment?: string | null;

        category?: string | null;

        commit_sha: string;

        location: {

            path: string;

            start_line: number;

            end_line?: number;

            start_column?: number | null;

            end_column?: number | null;
        };

        message?: {
            text: string;
        };

        state?: string | null;

        classifications?: string[];
    } | null;
}

export interface GitHubCodeScanningAlertsResponse {

    total_count: number;

    alerts: GitHubCodeScanningAlert[];
}

export interface GitHubSecretScanningAlert {

    number: number;

    created_at: string;

    updated_at: string;

    url: string;

    html_url?: string;

    state: string;

    secret_type: string;

    secret_type_display_name?: string;

    secret?: string;

    resolution?: string | null;

    resolved_by?: {
        login: string;
        id: number;
    } | null;

    resolved_at?: string | null;

    resolution_comment?: string | null;

    push_protection_bypassed?: boolean;

    push_protection_bypassed_by?: {
        login: string;
        id: number;
    } | null;

    push_protection_bypassed_at?: string | null;

    locations_url?: string;
}

export interface GitHubSecretScanningAlertsResponse {

    total_count: number;

    alerts: GitHubSecretScanningAlert[];
}


/**
 * ============================================================
 * GitHub Unified Security Intelligence
 * ============================================================
 *
 * Normalized security finding shared by:
 *
 * - Dependabot
 * - Code Scanning / CodeQL
 * - Secret Scanning
 *
 * This allows the AI layer to work with one consistent model
 * instead of understanding three different GitHub API models.
 * ============================================================
 */

export type GitHubSecurityFindingSource =
    | "dependabot"
    | "code_scanning"
    | "secret_scanning";

export type GitHubSecuritySeverity =
    | "critical"
    | "high"
    | "medium"
    | "moderate"
    | "low"
    | "unknown";

export interface GitHubSecurityFinding {

    /**
     * Origin of the security finding.
     */
    source:
    GitHubSecurityFindingSource;

    /**
     * GitHub alert number.
     */
    number: number;

    /**
     * Normalized severity.
     */
    severity:
    GitHubSecuritySeverity;

    /**
     * Current GitHub alert state.
     *
     * Examples:
     * open
     * dismissed
     * fixed
     * resolved
     */
    state: string;

    /**
     * Human-readable title.
     */
    title: string;

    /**
     * Detailed description.
     */
    description?: string;

    /**
     * Vulnerable dependency/package.
     */
    package?: string;

    /**
     * Package ecosystem.
     *
     * Examples:
     * npm
     * pip
     * maven
     */
    ecosystem?: string;

    /**
     * Vulnerable source file.
     */
    file?: string;

    /**
     * Source-code line.
     */
    line?: number;

    /**
     * CodeQL/security rule identifier.
     */
    rule?: string;

    /**
     * CVE identifier where available.
     */
    cve?: string;

    /**
     * GHSA identifier where available.
     */
    ghsa?: string;

    /**
     * GitHub alert URL.
     */
    url?: string;

    /**
     * Alert creation timestamp.
     */
    created_at?: string;

    /**
     * Alert update timestamp.
     */
    updated_at?: string;
}

/**
 * Unified collection of GitHub security findings.
 */
export interface GitHubSecurityFindingsResponse {

    total_count: number;

    findings: GitHubSecurityFinding[];
}

/**
 * High-level repository security overview.
 */
export interface GitHubSecurityOverview {

    repository: string;

    securityStatus:
    | "secure"
    | "warning"
    | "critical"
    | "unknown";

    totalFindings: number;

    openFindings: number;

    criticalFindings: number;

    highFindings: number;

    mediumFindings: number;

    lowFindings: number;

    dependabotFindings: number;

    codeScanningFindings: number;

    secretScanningFindings: number;
}
/**
 * Compact security summary intended for
 * AI/LLM consumption.
 */
export interface GitHubSecuritySummary {

    total: number;

    open: number;

    critical: number;

    high: number;

    medium: number;

    low: number;

    bySource: {
        dependabot: number;
        codeScanning: number;
        secretScanning: number;
    };

    bySeverity: Record<
        GitHubSecuritySeverity,
        number
    >;
}
/**
 * ============================================================
 * GitHub Security Configuration
 * ============================================================
 *
 * Represents repository-level security configuration exposed
 * to the AI developer assistant.
 */

/**
 * Repository security policy information.
 *
 * SECURITY.md is represented separately from the security
 * feature configuration because it is a repository document.
 */
export interface GitHubSecurityPolicy {

    /**
     * Whether a SECURITY.md file exists.
     */
    exists: boolean;

    /**
     * Repository URL of the security policy.
     */
    url?: string;

    /**
     * Path of the security policy file.
     */
    path?: string;

    /**
     * Default branch containing the policy.
     */
    branch?: string;
}

/**
 * Repository security feature availability.
 *
 * These fields describe whether GitHub reports the corresponding
 * security capability as enabled/available for the repository.
 */
export interface GitHubSecurityFeatures {

    /**
     * Dependabot alerts.
     */
    dependabotAlerts: boolean;

    /**
     * Dependabot security updates.
     */
    dependabotSecurityUpdates: boolean;

    /**
     * Dependabot version updates.
     */
    dependabotVersionUpdates: boolean;

    /**
     * Code scanning / CodeQL.
     */
    codeScanning: boolean;

    /**
     * Secret scanning.
     */
    secretScanning: boolean;

    /**
     * Secret scanning push protection.
     */
    secretScanningPushProtection: boolean;
}

/**
 * Complete repository security configuration.
 */
export interface GitHubSecurityConfiguration {

    /**
     * Repository owner.
     */
    owner: string;

    /**
     * Repository name.
     */
    repository: string;

    /**
     * Security policy information.
     */
    policy: GitHubSecurityPolicy;

    /**
     * Available security features.
     */
    features: GitHubSecurityFeatures;
}

/**
 * AI-friendly security configuration summary.
 */
export interface GitHubSecurityConfigurationSummary {

    /**
     * Whether the repository has a SECURITY.md policy.
     */
    hasSecurityPolicy: boolean;

    /**
     * Number of enabled security features.
     */
    enabledFeatures: number;

    /**
     * Number of security features available to inspect.
     */
    totalFeatures: number;

    /**
     * Whether all supported security features are enabled.
     */
    fullyConfigured: boolean;

    /**
     * Human-readable configuration status.
     */
    status:
    | "fully_configured"
    | "partially_configured"
    | "not_configured";

    /**
     * Individual feature configuration.
     */
    features: GitHubSecurityFeatures;
}

/**
 * GitHub repository feature configuration.
 */
export interface GitHubRepositoryFeatures {

    issues: boolean;

    projects: boolean;

    wiki: boolean;

    discussions: boolean;

    pages: boolean;
}


/**
 * GitHub repository merge configuration.
 */
export interface GitHubRepositoryMergeConfiguration {

    allowMergeCommit: boolean;

    allowSquashMerge: boolean;

    allowRebaseMerge: boolean;

    allowAutoMerge: boolean;

    deleteBranchOnMerge: boolean;

    allowUpdateBranch: boolean;
}


/**
 * Normalized GitHub repository administration information.
 *
 * This model is intentionally smaller than the raw GitHub
 * repository response so that it can be safely consumed
 * by the AI layer.
 */
export interface GitHubRepositoryAdministration {

    owner: string;

    repository: string;

    fullName: string;

    visibility:
    | "public"
    | "private"
    | "internal"
    | string;

    defaultBranch: string;

    archived: boolean;

    disabled: boolean;

    fork: boolean;

    isTemplate: boolean;

    features: GitHubRepositoryFeatures;

    merge: GitHubRepositoryMergeConfiguration;

    securityAndAnalysis: {

        dependabotAlerts: boolean;

        dependabotSecurityUpdates: boolean;

        secretScanning: boolean;

        secretScanningPushProtection: boolean;

        codeScanning: boolean;
    };
}
/**
 * Normalized required status check.
 */
export interface GitHubRequiredStatusCheck {

    context: string;

    appId?: number | null;
}


/**
 * Normalized branch protection information.
 */
export interface GitHubBranchProtection {

    branch: string;

    protected: boolean;

    requiredPullRequestReviews: {

        requiredApprovingReviewCount: number;

        dismissStaleReviews: boolean;

        requireCodeOwnerReviews: boolean;

        requireLastPushApproval: boolean;
    };

    requiredStatusChecks: {

        strict: boolean;

        contexts: GitHubRequiredStatusCheck[];
    };

    restrictions: {

        users: string[];

        teams: string[];

        apps: string[];
    };

    enforceAdmins: boolean;

    requiredSignedCommits: boolean;

    requiredLinearHistory: boolean;

    allowForcePushes: boolean;

    allowDeletions: boolean;
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

    /**
 * List Code Scanning / CodeQL alerts
 * for a GitHub repository.
 */
    public async listCodeScanningAlerts(
        owner: string,
        repository: string,
        state?: string,
        ref?: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubCodeScanningAlertsResponse> {

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
                "Code scanning page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "Code scanning perPage must be between 1 and 100."
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

        if (state?.trim()) {

            params.set(
                "state",
                state.trim()
            );
        }

        if (ref?.trim()) {

            params.set(
                "ref",
                ref.trim()
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/code-scanning/alerts?${params.toString()}`;

        const alerts =
            await this.request<GitHubCodeScanningAlert[]>(
                endpoint
            );

        return {
            total_count:
                alerts.length,

            alerts
        };
    }

    /**
 * Get a specific Code Scanning alert.
 */
    public async getCodeScanningAlert(
        owner: string,
        repository: string,
        alertNumber: number
    ): Promise<GitHubCodeScanningAlert> {

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
            !Number.isInteger(alertNumber) ||
            alertNumber <= 0
        ) {
            throw new Error(
                "Code scanning alert number must be a positive integer."
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/code-scanning/alerts/${alertNumber}`;

        return this.request<GitHubCodeScanningAlert>(
            endpoint
        );
    }

    /**
 * Get a summarized view of Code Scanning alerts.
 */
    public async getCodeScanningSummary(
        owner: string,
        repository: string
    ): Promise<{
        total: number;
        open: number;
        dismissed: number;
        fixed: number;
        bySeverity: Record<string, number>;
        byTool: Record<string, number>;
        byRule: Record<string, number>;
    }> {

        const response =
            await this.listCodeScanningAlerts(
                owner,
                repository,
                undefined,
                undefined,
                1,
                100
            );

        const bySeverity:
            Record<string, number> = {};

        const byTool:
            Record<string, number> = {};

        const byRule:
            Record<string, number> = {};

        let open = 0;
        let dismissed = 0;
        let fixed = 0;

        for (
            const alert of response.alerts
        ) {

            const severity =
                alert.rule.security_severity_level ??
                alert.rule.severity ??
                "unknown";

            bySeverity[severity] =
                (bySeverity[severity] ?? 0) + 1;

            const tool =
                alert.tool.name;

            byTool[tool] =
                (byTool[tool] ?? 0) + 1;

            const rule =
                alert.rule.id;

            byRule[rule] =
                (byRule[rule] ?? 0) + 1;

            switch (alert.state) {

                case "open":
                    open++;
                    break;

                case "dismissed":
                    dismissed++;
                    break;

                case "fixed":
                    fixed++;
                    break;
            }
        }

        return {
            total:
                response.alerts.length,

            open,

            dismissed,

            fixed,

            bySeverity,

            byTool,

            byRule
        };
    }

    /**
     * List secret scanning alerts for a GitHub repository.
     */
    public async listSecretScanningAlerts(
        owner: string,
        repository: string,
        state?: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<GitHubSecretScanningAlertsResponse> {

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
                "Secret scanning page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "Secret scanning perPage must be between 1 and 100."
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

        if (state?.trim()) {

            params.set(
                "state",
                state.trim()
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/secret-scanning/alerts?${params.toString()}`;

        const alerts =
            await this.request<GitHubSecretScanningAlert[]>(
                endpoint
            );

        return {
            total_count:
                alerts.length,

            alerts:
                alerts.map(
                    alert => ({
                        ...alert,

                        /**
                         * Never expose the actual secret
                         * to the MCP consumer / LLM.
                         */
                        secret: undefined
                    })
                )
        };
    }

    /**
 * Get a specific secret scanning alert.
 */
    public async getSecretScanningAlert(
        owner: string,
        repository: string,
        alertNumber: number
    ): Promise<GitHubSecretScanningAlert> {

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
            !Number.isInteger(alertNumber) ||
            alertNumber <= 0
        ) {
            throw new Error(
                "Secret scanning alert number must be a positive integer."
            );
        }

        const endpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/secret-scanning/alerts/${alertNumber}`;

        const alert =
            await this.request<GitHubSecretScanningAlert>(
                endpoint
            );

        return {
            ...alert,

            /**
             * Never return the detected secret itself.
             */
            secret: undefined
        };
    }

    /**
 * Get a summarized view of secret scanning alerts.
 */
    public async getSecretScanningSummary(
        owner: string,
        repository: string
    ): Promise<{
        total: number;
        open: number;
        resolved: number;
        byType: Record<string, number>;
        byResolution: Record<string, number>;
    }> {

        const response =
            await this.listSecretScanningAlerts(
                owner,
                repository,
                undefined,
                1,
                100
            );

        const byType:
            Record<string, number> = {};

        const byResolution:
            Record<string, number> = {};

        let open = 0;
        let resolved = 0;

        for (
            const alert of response.alerts
        ) {

            const type =
                alert.secret_type_display_name ??
                alert.secret_type ??
                "unknown";

            byType[type] =
                (byType[type] ?? 0) + 1;

            if (
                alert.state === "open"
            ) {

                open++;

            } else if (
                alert.state === "resolved"
            ) {

                resolved++;
            }

            if (
                alert.resolution
            ) {

                byResolution[
                    alert.resolution
                ] =
                    (
                        byResolution[
                        alert.resolution
                        ] ?? 0
                    ) + 1;
            }
        }

        return {

            total:
                response.alerts.length,

            open,

            resolved,

            byType,

            byResolution
        };
    }

    /**
 * ============================================================
 * Get Unified Repository Security Overview
 * ============================================================
 *
 * Aggregates:
 *
 * - Dependabot
 * - Code Scanning / CodeQL
 * - Secret Scanning
 *
 * into a single AI-friendly security overview.
 * ============================================================
 */
    /**
 * ============================================================
 * Get Unified Repository Security Overview
 * ============================================================
 *
 * Aggregates:
 *
 * - Dependabot
 * - Code Scanning / CodeQL
 * - Secret Scanning
 *
 * into a single AI-friendly security overview.
 * ============================================================
 */
    /**
 * ============================================================
 * Get Unified Repository Security Overview
 * ============================================================
 *
 * Aggregates:
 *
 * - Dependabot
 * - Code Scanning / CodeQL
 * - Secret Scanning
 *
 * into a single AI-friendly security overview.
 * ============================================================
 */
    public async getSecurityOverview(
        owner: string,
        repository: string
    ): Promise<GitHubSecurityOverview> {

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

        /**
         * --------------------------------------------------------
         * Dependabot
         * --------------------------------------------------------
         */

        const dependabotEndpoint =
            `/repos/${encodeURIComponent(owner.trim())}` +
            `/${encodeURIComponent(repository.trim())}` +
            `/dependabot/alerts?per_page=100`;

        const dependabotAlerts =
            await this.request<
                Array<{
                    number: number;
                    state: string;
                    security_advisory?: {
                        severity?: string | null;
                    } | null;
                }>
            >(
                dependabotEndpoint
            );

        /**
         * --------------------------------------------------------
         * Code Scanning
         * --------------------------------------------------------
         */

        const codeScanning =
            await this.getCodeScanningSummary(
                owner,
                repository
            );

        /**
         * --------------------------------------------------------
         * Secret Scanning
         * --------------------------------------------------------
         */

        const secretScanning =
            await this.getSecretScanningSummary(
                owner,
                repository
            );

        /**
         * --------------------------------------------------------
         * Dependabot statistics
         * --------------------------------------------------------
         */

        let dependabotCritical = 0;

        let dependabotHigh = 0;

        let dependabotMedium = 0;

        let dependabotLow = 0;

        let dependabotOpen = 0;

        for (
            const alert of dependabotAlerts
        ) {

            if (
                alert.state === "open"
            ) {
                dependabotOpen++;
            }

            const severity =
                alert.security_advisory
                    ?.severity
                    ?.toLowerCase();

            switch (severity) {

                case "critical":
                    dependabotCritical++;
                    break;

                case "high":
                    dependabotHigh++;
                    break;

                case "moderate":
                case "medium":
                    dependabotMedium++;
                    break;

                case "low":
                    dependabotLow++;
                    break;
            }
        }

        /**
         * --------------------------------------------------------
         * Code Scanning statistics
         * --------------------------------------------------------
         */

        const codeScanningTotal =
            codeScanning.total ?? 0;

        const codeScanningOpen =
            codeScanning.open ?? 0;

        const codeScanningCritical =
            codeScanning.bySeverity?.critical ?? 0;

        const codeScanningHigh =
            codeScanning.bySeverity?.high ?? 0;

        const codeScanningMedium =
            (codeScanning.bySeverity?.medium ?? 0) +
            (codeScanning.bySeverity?.moderate ?? 0);

        const codeScanningLow =
            codeScanning.bySeverity?.low ?? 0;

        /**
         * --------------------------------------------------------
         * Secret Scanning statistics
         * --------------------------------------------------------
         */

        const secretScanningTotal =
            secretScanning.total ?? 0;

        const secretScanningOpen =
            secretScanning.open ?? 0;

        /**
         * --------------------------------------------------------
         * Unified counts
         * --------------------------------------------------------
         */

        const totalFindings =
            dependabotAlerts.length +
            codeScanningTotal +
            secretScanningTotal;

        const openFindings =
            dependabotOpen +
            codeScanningOpen +
            secretScanningOpen;

        const criticalFindings =
            dependabotCritical +
            codeScanningCritical;

        const highFindings =
            dependabotHigh +
            codeScanningHigh;

        const mediumFindings =
            dependabotMedium +
            codeScanningMedium;

        const lowFindings =
            dependabotLow +
            codeScanningLow;

        /**
         * --------------------------------------------------------
         * Security status
         * --------------------------------------------------------
         */

        let securityStatus:
            GitHubSecurityOverview["securityStatus"];

        if (
            criticalFindings > 0
        ) {

            securityStatus =
                "critical";

        } else if (
            highFindings > 0
        ) {

            securityStatus =
                "warning";

        } else if (
            openFindings > 0
        ) {

            securityStatus =
                "warning";

        } else if (
            totalFindings === 0
        ) {

            securityStatus =
                "secure";

        } else {

            securityStatus =
                "warning";
        }

        /**
         * --------------------------------------------------------
         * Return normalized overview
         * --------------------------------------------------------
         */

        return {

            repository:
                `${owner}/${repository}`,

            securityStatus,

            totalFindings,

            openFindings,

            criticalFindings,

            highFindings,

            mediumFindings,

            lowFindings,

            dependabotFindings:
                dependabotAlerts.length,

            codeScanningFindings:
                codeScanningTotal,

            secretScanningFindings:
                secretScanningTotal
        };
    }

    /**
 * ============================================================
 * Get Unified Repository Security Findings
 * ============================================================
 *
 * Returns normalized security findings from:
 *
 * - Dependabot
 * - Code Scanning / CodeQL
 * - Secret Scanning
 *
 * The result uses the shared GitHubSecurityFinding model
 * so the AI layer does not need to understand the individual
 * GitHub security API response formats.
 * ============================================================
 */
    /**
 * ============================================================
 * Get Unified Repository Security Findings
 * ============================================================
 *
 * Normalizes:
 *
 * - Dependabot
 * - Code Scanning / CodeQL
 * - Secret Scanning
 *
 * into GitHubSecurityFinding[].
 * ============================================================
 */
    public async getSecurityFindings(
        owner: string,
        repository: string
    ): Promise<GitHubSecurityFinding[]> {

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

        const encodedOwner =
            encodeURIComponent(owner.trim());

        const encodedRepository =
            encodeURIComponent(repository.trim());

        /**
         * --------------------------------------------------------
         * Dependabot
         * --------------------------------------------------------
         */

        const dependabotEndpoint =
            `/repos/${encodedOwner}` +
            `/${encodedRepository}` +
            `/dependabot/alerts?per_page=100`;

        const dependabotAlerts =
            await this.request<
                Array<{
                    number: number;
                    state: string;
                    html_url?: string;

                    dependency?: {
                        package?: {
                            ecosystem?: string;
                            name?: string;
                        };
                        manifest_path?: string;
                        scope?: string;
                    };

                    security_advisory?: {
                        ghsa_id?: string;
                        cve_id?: string | null;
                        summary?: string;
                        description?: string;
                        severity?: string | null;
                        published_at?: string | null;
                        updated_at?: string | null;
                    };

                    security_vulnerability?: {
                        vulnerable_version_range?: string;
                        first_patched_version?: {
                            identifier?: string;
                        } | null;
                    };
                }>
            >(dependabotEndpoint);

        /**
         * --------------------------------------------------------
         * Code Scanning
         * --------------------------------------------------------
         */

        const codeScanningEndpoint =
            `/repos/${encodedOwner}` +
            `/${encodedRepository}` +
            `/code-scanning/alerts?per_page=100`;

        const codeScanningAlerts =
            await this.request<
                Array<{
                    number: number;
                    created_at?: string;
                    updated_at?: string;
                    html_url?: string;
                    state?: string;

                    rule?: {
                        id?: string;
                        severity?: string;
                        description?: string;
                        name?: string;
                        security_severity_level?: string | null;
                    };

                    tool?: {
                        name?: string;
                        version?: string;
                    };

                    most_recent_instance?: {
                        ref?: string;
                        commit_sha?: string;

                        location?: {
                            path?: string;
                            start_line?: number;
                            end_line?: number;
                            start_column?: number;
                            end_column?: number;
                        };
                    };
                }>
            >(codeScanningEndpoint);

        /**
         * --------------------------------------------------------
         * Secret Scanning
         * --------------------------------------------------------
         */

        const secretScanningEndpoint =
            `/repos/${encodedOwner}` +
            `/${encodedRepository}` +
            `/secret-scanning/alerts?per_page=100`;

        const secretScanningAlerts =
            await this.request<
                Array<{
                    number: number;
                    created_at?: string;
                    updated_at?: string;
                    html_url?: string;
                    state?: string;

                    secret_type?: string;
                    secret_type_display_name?: string;

                    resolution?: string | null;

                    resolved_by?: {
                        login?: string;
                    } | null;

                    resolved_at?: string | null;
                }>
            >(secretScanningEndpoint);

        /**
         * --------------------------------------------------------
         * Unified findings
         * --------------------------------------------------------
         */

        const findings:
            GitHubSecurityFinding[] = [];

        /**
         * --------------------------------------------------------
         * Dependabot findings
         * --------------------------------------------------------
         */

        for (
            const alert of dependabotAlerts
        ) {

            const severity =
                this.normalizeSecuritySeverity(
                    alert.security_advisory?.severity
                );

            findings.push({
                source: "dependabot",

                severity,

                state: alert.state,

                title: alert.security_advisory?.summary ??
                    `Dependabot alert #${alert.number}`,

                description: alert.security_advisory?.description ??
                    undefined,

                url: alert.html_url ??
                    undefined,

                rule: alert.security_advisory?.ghsa_id ??
                    undefined,

                cve: alert.security_advisory?.cve_id ??
                    undefined,

                package: alert.dependency?.package?.name ??
                    undefined,

                ecosystem: alert.dependency?.package?.ecosystem ??
                    undefined,

                file: alert.dependency?.manifest_path ??
                    undefined,

                line: undefined,

                created_at: alert.security_advisory?.published_at ??
                    undefined,

                updated_at: alert.security_advisory?.updated_at ??
                    undefined,
                number: 0
            });
        }

        /**
         * --------------------------------------------------------
         * Code Scanning findings
         * --------------------------------------------------------
         */

        for (
            const alert of codeScanningAlerts
        ) {

            const location =
                alert.most_recent_instance?.location;

            const severity =
                this.normalizeSecuritySeverity(
                    alert.rule?.security_severity_level ??
                    alert.rule?.severity
                );

            findings.push({
                source: "code_scanning",

                severity,

                state: alert.state ??
                    "open",

                title: alert.rule?.description ??
                    alert.rule?.name ??
                    `Code scanning alert #${alert.number}`,

                description: alert.rule?.description ??
                    undefined,

                url: alert.html_url ??
                    undefined,

                rule: alert.rule?.id ??
                    undefined,

                cve: undefined,

                package: undefined,

                ecosystem: undefined,

                file: location?.path ??
                    undefined,

                line: location?.start_line ??
                    undefined,

                created_at: alert.created_at ??
                    undefined,

                updated_at: alert.updated_at ??
                    undefined,
                number: 0
            });
        }

        /**
         * --------------------------------------------------------
         * Secret Scanning findings
         * --------------------------------------------------------
         *
         * Secret exposure is treated as critical for the
         * unified AI security model.
         */
        for (
            const alert of secretScanningAlerts
        ) {

            findings.push({
                source: "secret_scanning",

                severity: "critical",

                state: alert.state ??
                    "open",

                title: alert.secret_type_display_name ??
                    alert.secret_type ??
                    `Secret scanning alert #${alert.number}`,

                description: "GitHub secret scanning detected a potentially exposed secret.",

                url: alert.html_url ??
                    undefined,

                rule: alert.secret_type ??
                    undefined,

                cve: undefined,

                package: undefined,

                ecosystem: undefined,

                file: undefined,

                line: undefined,

                created_at: alert.created_at ??
                    undefined,

                updated_at: alert.updated_at ??
                    undefined,
                number: 0
            });
        }

        /**
         * --------------------------------------------------------
         * Stable severity ordering
         * --------------------------------------------------------
         */

        const severityRank:
            Record<GitHubSecuritySeverity, number> = {

            critical: 5,

            high: 4,

            moderate: 3,

            medium: 3,

            low: 2,

            unknown: 1
        };

        findings.sort(
            (a, b) =>
                severityRank[b.severity] -
                severityRank[a.severity]
        );

        return findings;
    }
    /**
     * Normalize GitHub security severity values.
     */
    private normalizeSecuritySeverity(
        severity?: string | null
    ): GitHubSecuritySeverity {

        switch (
        severity?.toLowerCase()
        ) {

            case "critical":
                return "critical";

            case "high":
                return "high";

            case "medium":
            case "moderate":
                return "medium";

            case "low":
                return "low";

            default:
                return "unknown";
        }
    }

    /**
 * ============================================================
 * Get Repository Security Summary
 * ============================================================
 *
 * Builds an AI-friendly security summary from the normalized
 * security findings returned by getSecurityFindings().
 *
 * Sources:
 *
 * - Dependabot
 * - Code Scanning / CodeQL
 * - Secret Scanning
 * ============================================================
 */
    /**
 * ============================================================
 * Get Repository Security Summary
 * ============================================================
 *
 * Builds an AI-friendly security summary from the normalized
 * security findings returned by getSecurityFindings().
 *
 * Sources:
 *
 * - Dependabot
 * - Code Scanning / CodeQL
 * - Secret Scanning
 * ============================================================
 */
    public async getSecuritySummary(
        owner: string,
        repository: string
    ): Promise<GitHubSecuritySummary> {

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

        const findings =
            await this.getSecurityFindings(
                owner,
                repository
            );

        /*
         * --------------------------------------------------------
         * Severity counters
         * --------------------------------------------------------
         */

        let critical = 0;
        let high = 0;
        let medium = 0;
        let low = 0;
        let moderate = 0;
        let unknown = 0;

        /*
         * --------------------------------------------------------
         * Source counters
         * --------------------------------------------------------
         */

        let dependabot = 0;
        let codeScanning = 0;
        let secretScanning = 0;

        /*
         * --------------------------------------------------------
         * Analyze findings
         * --------------------------------------------------------
         */

        for (
            const finding of findings
        ) {

            /*
             * Count by source.
             */
            switch (
            finding.source
            ) {

                case "dependabot":
                    dependabot++;
                    break;

                case "code_scanning":
                    codeScanning++;
                    break;

                case "secret_scanning":
                    secretScanning++;
                    break;
            }

            /*
             * Count by severity.
             */
            switch (
            finding.severity
            ) {

                case "critical":
                    critical++;
                    break;

                case "high":
                    high++;
                    break;

                case "moderate":
                    moderate++;
                    break;

                case "medium":
                    medium++;
                    break;

                case "low":
                    low++;
                    break;

                case "unknown":
                    unknown++;
                    break;
            }
        }

        /*
         * --------------------------------------------------------
         * Open findings
         * --------------------------------------------------------
         */

        const open =
            findings.filter(
                finding =>
                    finding.state === "open"
            ).length;

        /*
         * --------------------------------------------------------
         * Build severity map.
         * --------------------------------------------------------
         */

        const bySeverity:
            Record<
                GitHubSecuritySeverity,
                number
            > = {

            critical,

            high,

            moderate,

            medium,

            low,

            unknown
        };

        /*
         * --------------------------------------------------------
         * Return security summary.
         * --------------------------------------------------------
         */

        return {

            total:
                findings.length,

            open,

            critical,

            high,

            medium,

            low,

            bySource: {

                dependabot,

                codeScanning,

                secretScanning
            },

            bySeverity
        };
    }

    /**
 * ============================================================
 * Get Repository Security Policy
 * ============================================================
 *
 * Looks for SECURITY.md in the repository.
 *
 * Common locations checked:
 *
 * - SECURITY.md
 * - .github/SECURITY.md
 * - docs/SECURITY.md
 *
 * A missing SECURITY.md is treated as a valid result:
 *
 * {
 *     exists: false
 * }
 */
    public async getSecurityPolicy(
        owner: string,
        repository: string
    ): Promise<GitHubSecurityPolicy> {

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

        /*
         * --------------------------------------------------------
         * Get repository information first.
         *
         * This allows us to determine the default branch.
         * --------------------------------------------------------
         */

        const repositoryResult =
            await this.getRepository(
                owner,
                repository
            );

        const defaultBranch =
            repositoryResult.default_branch;

        /*
         * --------------------------------------------------------
         * SECURITY.md locations.
         *
         * GitHub commonly recognizes SECURITY.md from the root
         * and .github directory.
         *
         * docs/SECURITY.md is also checked as a useful fallback
         * for repositories that organize documentation there.
         * --------------------------------------------------------
         */

        const policyPaths = [
            "SECURITY.md",
            ".github/SECURITY.md",
            "docs/SECURITY.md"
        ];

        /*
         * --------------------------------------------------------
         * Check each possible location.
         * --------------------------------------------------------
         */

        for (
            const path of policyPaths
        ) {

            try {

                const content =
                    await this.getContents(
                        owner,
                        repository,
                        path,
                        defaultBranch
                    );

                /*
                 * A file response should contain a path and html_url.
                 *
                 * We intentionally do not return the contents of
                 * SECURITY.md here. This method is about configuration
                 * discovery rather than file reading.
                 */

                if (
                    content &&
                    !Array.isArray(content)
                ) {

                    return {

                        exists: true,

                        url:
                            content.html_url,

                        path:
                            content.path ?? path,

                        branch:
                            defaultBranch
                    };
                }

            } catch (error) {

                /*
                 * A missing policy file is expected.
                 *
                 * Continue checking the remaining locations.
                 *
                 * Other errors should also not prevent checking
                 * alternative policy locations because GitHub APIs
                 * can return different errors for unavailable paths.
                 */
                continue;
            }
        }

        /*
         * --------------------------------------------------------
         * No SECURITY.md found.
         * --------------------------------------------------------
         */

        return {

            exists: false
        };
    }

    /**
 * ============================================================
 * Get Repository Security Features
 * ============================================================
 *
 * Retrieves the security-and-analysis configuration for a
 * GitHub repository and normalizes it into the application's
 * GitHubSecurityFeatures model.
 *
 * Features:
 *
 * - Dependabot alerts
 * - Dependabot security updates
 * - Dependabot version updates
 * - Code scanning / CodeQL
 * - Secret scanning
 * - Secret scanning push protection
 */
    /**
* ============================================================
* Get Repository Security Features
* ============================================================
*/
    public async getSecurityFeatures(
        owner: string,
        repository: string
    ): Promise<GitHubSecurityFeatures> {

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
            `${this.config.apiUrl}/repos/` +
            `${encodeURIComponent(owner)}/` +
            `${encodeURIComponent(repository)}`;

        const response =
            await fetch(
                endpoint,
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
                `GitHub repository request failed: ` +
                `${response.status} ${response.statusText}`
            );
        }

        const result =
            await response.json() as {

                security_and_analysis?: {

                    dependabot_alerts?: {
                        status?: string;
                    };

                    dependabot_security_updates?: {
                        status?: string;
                    };

                    code_scanning?: {
                        status?: string;
                    };

                    secret_scanning?: {
                        status?: string;
                    };

                    secret_scanning_push_protection?: {
                        status?: string;
                    };
                };
            };

        const security =
            result.security_and_analysis ?? {};

        const isEnabled =
            (
                status?: string
            ): boolean =>
                status === "enabled";

        return {

            dependabotAlerts:
                isEnabled(
                    security
                        .dependabot_alerts
                        ?.status
                ),

            dependabotSecurityUpdates:
                isEnabled(
                    security
                        .dependabot_security_updates
                        ?.status
                ),

            /*
             * Dependabot version updates are configured through
             * dependabot.yml rather than the repository
             * security_and_analysis object.
             *
             * We leave this false here and will improve this
             * detection when we build the repository configuration
             * aggregation.
             */
            dependabotVersionUpdates:
                false,

            codeScanning:
                isEnabled(
                    security
                        .code_scanning
                        ?.status
                ),

            secretScanning:
                isEnabled(
                    security
                        .secret_scanning
                        ?.status
                ),

            secretScanningPushProtection:
                isEnabled(
                    security
                        .secret_scanning_push_protection
                        ?.status
                )
        };
    }

    /**
 * ============================================================
 * Get Repository Security Configuration Summary
 * ============================================================
 *
 * Produces an AI-friendly summary of the repository's
 * security configuration.
 *
 * Aggregates:
 *
 * - SECURITY.md policy
 * - Dependabot alerts
 * - Dependabot security updates
 * - Dependabot version updates
 * - Code scanning
 * - Secret scanning
 * - Secret scanning push protection
 */
    public async getSecurityConfigurationSummary(
        owner: string,
        repository: string
    ): Promise<GitHubSecurityConfigurationSummary> {

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

        /*
         * --------------------------------------------------------
         * Retrieve policy and security features.
         *
         * These operations are independent, so execute them in
         * parallel.
         * --------------------------------------------------------
         */

        const [
            policy,
            features
        ] = await Promise.all([

            this.getSecurityPolicy(
                owner,
                repository
            ),

            this.getSecurityFeatures(
                owner,
                repository
            )
        ]);

        /*
         * --------------------------------------------------------
         * Count enabled security features.
         * --------------------------------------------------------
         */

        const featureValues = [
            features.dependabotAlerts,
            features.dependabotSecurityUpdates,
            features.dependabotVersionUpdates,
            features.codeScanning,
            features.secretScanning,
            features.secretScanningPushProtection
        ];

        const totalFeatures =
            featureValues.length;

        const enabledFeatures =
            featureValues.filter(
                enabled => enabled
            ).length;

        /*
         * --------------------------------------------------------
         * Determine whether the repository is fully configured.
         *
         * SECURITY.md is intentionally NOT included in the
         * feature count because it is a repository policy document,
         * not a GitHub security-analysis feature.
         * --------------------------------------------------------
         */

        const fullyConfigured =
            enabledFeatures === totalFeatures &&
            policy.exists;

        /*
         * --------------------------------------------------------
         * Determine configuration status.
         * --------------------------------------------------------
         */

        let status:
            | "fully_configured"
            | "partially_configured"
            | "not_configured";

        if (fullyConfigured) {

            status =
                "fully_configured";

        } else if (
            enabledFeatures > 0 ||
            policy.exists
        ) {

            status =
                "partially_configured";

        } else {

            status =
                "not_configured";
        }

        /*
         * --------------------------------------------------------
         * Return normalized summary.
         * --------------------------------------------------------
         */

        return {

            hasSecurityPolicy:
                policy.exists,

            enabledFeatures,

            totalFeatures,

            fullyConfigured,

            status,

            features
        };
    }
    /**
     * Get normalized repository administration information.
     *
     * Aggregates repository settings, enabled features,
     * merge configuration and security-analysis configuration.
     */
    /**
 * Get normalized repository administration information.
 *
 * Aggregates repository settings, enabled features,
 * merge configuration and security-analysis configuration.
 */
    public async getRepositoryAdministration(
        owner: string,
        repository: string
    ): Promise<GitHubRepositoryAdministration> {

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

        /**
         * The repository model used elsewhere in the GitHub service
         * intentionally contains only a subset of the GitHub REST
         * repository response.
         *
         * Administration requires additional repository settings,
         * therefore use a dedicated response model here instead of
         * changing the shared GitHubRepository interface.
         */
        interface GitHubRepositoryAdministrationResponse {

            full_name: string;

            visibility?: string | null;

            default_branch: string;

            archived: boolean;

            disabled: boolean;

            fork?: boolean;

            is_template?: boolean;

            has_issues?: boolean;

            has_projects?: boolean;

            has_wiki?: boolean;

            has_discussions?: boolean;

            has_pages?: boolean;

            allow_merge_commit?: boolean;

            allow_squash_merge?: boolean;

            allow_rebase_merge?: boolean;

            allow_auto_merge?: boolean;

            delete_branch_on_merge?: boolean;

            allow_update_branch?: boolean;

            security_and_analysis?: {

                advanced_security?: {
                    status?: string;
                };

                dependabot?: {
                    status?: string;
                };

                dependabot_security_updates?: {
                    status?: string;
                };

                secret_scanning?: {
                    status?: string;
                };

                secret_scanning_push_protection?: {
                    status?: string;
                };
            };
        }

        const result =
            await this.request<GitHubRepositoryAdministrationResponse>(
                `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`
            );

        return {

            owner,

            repository,

            fullName:
                result.full_name,

            visibility:
                result.visibility ?? "unknown",

            defaultBranch:
                result.default_branch,

            archived:
                result.archived,

            disabled:
                result.disabled,

            fork:
                result.fork ?? false,

            isTemplate:
                result.is_template ?? false,

            features: {

                issues:
                    result.has_issues ?? false,

                projects:
                    result.has_projects ?? false,

                wiki:
                    result.has_wiki ?? false,

                discussions:
                    result.has_discussions ?? false,

                pages:
                    result.has_pages ?? false
            },

            merge: {

                allowMergeCommit:
                    result.allow_merge_commit ?? false,

                allowSquashMerge:
                    result.allow_squash_merge ?? false,

                allowRebaseMerge:
                    result.allow_rebase_merge ?? false,

                allowAutoMerge:
                    result.allow_auto_merge ?? false,

                deleteBranchOnMerge:
                    result.delete_branch_on_merge ?? false,

                allowUpdateBranch:
                    result.allow_update_branch ?? false
            },

            securityAndAnalysis: {

                dependabotAlerts:
                    result.security_and_analysis
                        ?.dependabot
                        ?.status === "enabled",

                dependabotSecurityUpdates:
                    result.security_and_analysis
                        ?.dependabot_security_updates
                        ?.status === "enabled",

                secretScanning:
                    result.security_and_analysis
                        ?.secret_scanning
                        ?.status === "enabled",

                secretScanningPushProtection:
                    result.security_and_analysis
                        ?.secret_scanning_push_protection
                        ?.status === "enabled",

                codeScanning:
                    result.security_and_analysis
                        ?.advanced_security
                        ?.status === "enabled"
            }
        };
    }
    /**
 * Get repository-level administration settings.
 */
    public async getRepositorySettings(
        owner: string,
        repository: string
    ): Promise<{
        visibility: string;
        defaultBranch: string;
        archived: boolean;
        disabled: boolean;
        fork: boolean;
        isTemplate: boolean;
    }> {

        const administration =
            await this.getRepositoryAdministration(
                owner,
                repository
            );

        return {
            visibility:
                administration.visibility,

            defaultBranch:
                administration.defaultBranch,

            archived:
                administration.archived,

            disabled:
                administration.disabled,

            fork:
                administration.fork,

            isTemplate:
                administration.isTemplate
        };
    }
    /**
 * Get repository feature configuration.
 */
    public async getRepositoryFeatures(
        owner: string,
        repository: string
    ): Promise<GitHubRepositoryFeatures> {

        const administration =
            await this.getRepositoryAdministration(
                owner,
                repository
            );

        return administration.features;
    }
    /**
 * Get repository merge configuration.
 */
    public async getRepositoryMergeConfiguration(
        owner: string,
        repository: string
    ): Promise<GitHubRepositoryMergeConfiguration> {

        const administration =
            await this.getRepositoryAdministration(
                owner,
                repository
            );

        return administration.merge;
    }

    /**
 * Get normalized branch protection information.
 *
 * Returns the protection configuration for a specific branch.
 */
    public async getBranchProtection(
        owner: string,
        repository: string,
        branch: string
    ): Promise<GitHubBranchProtection> {

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

        if (!branch?.trim()) {
            throw new Error(
                "GitHub branch name is required."
            );
        }

        interface BranchProtectionResponse {

            required_pull_request_reviews?: {

                required_approving_review_count?: number;

                dismiss_stale_reviews?: boolean;

                require_code_owner_reviews?: boolean;

                require_last_push_approval?: boolean;
            } | null;

            required_status_checks?: {

                strict?: boolean;

                contexts?: string[];

                checks?: Array<{
                    context: string;
                    app_id?: number | null;
                }>;
            } | null;

            restrictions?: {

                users?: Array<{
                    login: string;
                }>;

                teams?: Array<{
                    slug: string;
                }>;

                apps?: Array<{
                    slug: string;
                }>;
            } | null;

            enforce_admins?: {
                enabled?: boolean;
            } | null;

            required_signatures?: {
                enabled?: boolean;
            } | null;

            required_linear_history?: {
                enabled?: boolean;
            } | null;

            allow_force_pushes?: {
                enabled?: boolean;
            } | null;

            allow_deletions?: {
                enabled?: boolean;
            } | null;
        }

        const result =
            await this.request<BranchProtectionResponse>(
                `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/branches/${encodeURIComponent(branch)}/protection`
            );

        const statusChecks =
            result.required_status_checks;

        const requiredChecks:
            GitHubRequiredStatusCheck[] =
            statusChecks?.checks?.map(
                check => ({
                    context:
                        check.context,

                    appId:
                        check.app_id ?? null
                })
            ) ??
            statusChecks?.contexts?.map(
                context => ({
                    context
                })
            ) ??
            [];

        return {

            branch,

            protected: true,

            requiredPullRequestReviews: {

                requiredApprovingReviewCount:
                    result.required_pull_request_reviews
                        ?.required_approving_review_count ??
                    0,

                dismissStaleReviews:
                    result.required_pull_request_reviews
                        ?.dismiss_stale_reviews ??
                    false,

                requireCodeOwnerReviews:
                    result.required_pull_request_reviews
                        ?.require_code_owner_reviews ??
                    false,

                requireLastPushApproval:
                    result.required_pull_request_reviews
                        ?.require_last_push_approval ??
                    false
            },

            requiredStatusChecks: {

                strict:
                    statusChecks?.strict ??
                    false,

                contexts:
                    requiredChecks
            },

            restrictions: {

                users:
                    result.restrictions?.users
                        ?.map(user => user.login) ??
                    [],

                teams:
                    result.restrictions?.teams
                        ?.map(team => team.slug) ??
                    [],

                apps:
                    result.restrictions?.apps
                        ?.map(app => app.slug) ??
                    []
            },

            enforceAdmins:
                result.enforce_admins?.enabled ??
                false,

            requiredSignedCommits:
                result.required_signatures?.enabled ??
                false,

            requiredLinearHistory:
                result.required_linear_history?.enabled ??
                false,

            allowForcePushes:
                result.allow_force_pushes?.enabled ??
                false,

            allowDeletions:
                result.allow_deletions?.enabled ??
                false
        };
    }
    /**
 * List repository branches and their protection status.
 */
    public async listBranchProtection(
        owner: string,
        repository: string,
        page: number = 1,
        perPage: number = 30
    ): Promise<Array<{
        name: string;
        protected: boolean;
    }>> {

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
                "Branch page must be a positive integer."
            );
        }

        if (
            !Number.isInteger(perPage) ||
            perPage < 1 ||
            perPage > 100
        ) {
            throw new Error(
                "Branch perPage must be between 1 and 100."
            );
        }

        interface BranchResponse {

            name: string;

            protected: boolean;
        }

        const result =
            await this.request<BranchResponse[]>(
                `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/branches?per_page=${perPage}&page=${page}`
            );

        return result.map(
            branch => ({
                name:
                    branch.name,

                protected:
                    branch.protected
            })
        );
    }
    /**
 * Get simplified branch protection rules.
 */
    public async getBranchRules(
        owner: string,
        repository: string,
        branch: string
    ): Promise<{
        branch: string;
        protected: boolean;
        rules: string[];
    }> {

        const protection =
            await this.getBranchProtection(
                owner,
                repository,
                branch
            );

        const rules: string[] = [];

        if (
            protection.requiredPullRequestReviews
                .requiredApprovingReviewCount > 0
        ) {
            rules.push(
                `Requires ${protection.requiredPullRequestReviews.requiredApprovingReviewCount} approving review(s).`
            );
        }

        if (
            protection.requiredPullRequestReviews
                .dismissStaleReviews
        ) {
            rules.push(
                "Dismisses stale pull request reviews."
            );
        }

        if (
            protection.requiredPullRequestReviews
                .requireCodeOwnerReviews
        ) {
            rules.push(
                "Requires code owner review."
            );
        }

        if (
            protection.requiredPullRequestReviews
                .requireLastPushApproval
        ) {
            rules.push(
                "Requires approval of the most recent push."
            );
        }

        if (
            protection.requiredStatusChecks
                .contexts.length > 0
        ) {
            rules.push(
                "Requires status checks."
            );
        }

        if (
            protection.enforceAdmins
        ) {
            rules.push(
                "Branch protection is enforced for administrators."
            );
        }

        if (
            protection.requiredSignedCommits
        ) {
            rules.push(
                "Requires signed commits."
            );
        }

        if (
            protection.requiredLinearHistory
        ) {
            rules.push(
                "Requires linear history."
            );
        }

        if (
            !protection.allowForcePushes
        ) {
            rules.push(
                "Force pushes are blocked."
            );
        }

        if (
            !protection.allowDeletions
        ) {
            rules.push(
                "Branch deletion is blocked."
            );
        }

        return {

            branch,

            protected:
                protection.protected,

            rules
        };
    }

}