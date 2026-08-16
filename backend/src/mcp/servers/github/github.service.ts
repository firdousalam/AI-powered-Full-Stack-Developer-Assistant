import {
    GITHUB_CONFIG
} from "./github.constants";

import {
    GitHubConfig,
    GitHubErrorResponse,
    GitHubRepositoryReference
} from "./github.types";

/**
 * Service responsible for communicating with the GitHub REST API.
 *
 * This service contains GitHub-specific API logic.
 * MCP tool logic should remain inside github.tools.ts.
 */
export class GitHubService {
    private readonly config: GitHubConfig;


    constructor(config?: Partial<GitHubConfig>) {
        this.config = {
            apiUrl: config?.apiUrl ?? GITHUB_CONFIG.API_URL,
            token: config?.token ?? process.env[GITHUB_CONFIG.TOKEN_ENV]
        };
    }

    /**
 * Returns the configured GitHub API URL.
 */
    public getApiUrl(): string {
        return this.config.apiUrl;
    }

    /**
     * Performs a lightweight health check for the GitHub service.
     */
    public async health(): Promise<{
        status: "healthy" | "unhealthy";
        apiUrl: string;
    }> {
        try {
            return {
                status: "healthy",
                apiUrl: this.config.apiUrl,
            };
        } catch {
            return {
                status: "unhealthy",
                apiUrl: this.config.apiUrl,
            };
        }
    }

    /**
     * Releases GitHub service resources.
     */
    public async dispose(): Promise<void> {
        // No resources currently require explicit cleanup.
    }
    /**
     * Execute an authenticated or unauthenticated GitHub API request.
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.config.apiUrl}${endpoint}`;

        const headers = new Headers(options.headers);

        headers.set("Accept", "application/vnd.github+json");
        headers.set("X-GitHub-Api-Version", "2022-11-28");

        if (this.config.token) {
            headers.set(
                "Authorization",
                `Bearer ${this.config.token}`
            );
        }

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            let error: GitHubErrorResponse = {
                message: response.statusText,
                status: response.status
            };

            try {
                const body = await response.json();

                if (body?.message) {
                    error = {
                        message: body.message,
                        status: response.status
                    };
                }
            } catch {
                // Keep the default error when the response is not JSON.
            }

            throw new Error(
                `GitHub API request failed (${error.status}): ${error.message}`
            );
        }

        return response.json() as Promise<T>;
    }

    /**
     * Get basic information about a GitHub repository.
     */
    async getRepository(
        repository: GitHubRepositoryReference
    ): Promise<unknown> {
        return this.request(
            `/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}`
        );
    }

    /**
     * Get the contents of a repository directory or file.
     *
     * When path is omitted, the repository root is returned.
     */
    async getRepositoryContents(
        repository: GitHubRepositoryReference,
        path = ""
    ): Promise<unknown> {
        const encodedPath = path
            .split("/")
            .filter(Boolean)
            .map(segment => encodeURIComponent(segment))
            .join("/");

        const endpoint =
            `/repos/${encodeURIComponent(repository.owner)}` +
            `/${encodeURIComponent(repository.name)}/contents` +
            (encodedPath ? `/${encodedPath}` : "");

        return this.request(endpoint);
    }

    /**
     * Get a specific file from a GitHub repository.
     */
    async getFileContent(
        repository: GitHubRepositoryReference,
        path: string
    ): Promise<unknown> {
        return this.getRepositoryContents(repository, path);
    }

    /**
     * Get repository branches.
     */
    async listBranches(
        repository: GitHubRepositoryReference
    ): Promise<unknown> {
        return this.request(
            `/repos/${encodeURIComponent(repository.owner)}` +
            `/${encodeURIComponent(repository.name)}/branches`
        );
    }

    /**
     * Get repository commits.
     */
    async listCommits(
        repository: GitHubRepositoryReference
    ): Promise<unknown> {
        return this.request(
            `/repos/${encodeURIComponent(repository.owner)}` +
            `/${encodeURIComponent(repository.name)}/commits`
        );
    }
}