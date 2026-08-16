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
}