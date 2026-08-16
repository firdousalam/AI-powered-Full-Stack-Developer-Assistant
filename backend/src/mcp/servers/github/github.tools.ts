// src/mcp/servers/github/github.tools.ts

import {
    MCPTool
} from "../../types";

import {
    GitHubService
} from "./github.service";

export class GitHubTools {

    constructor(
        private readonly githubService: GitHubService
    ) { }

    /**
     * Returns all supported GitHub MCP tools.
     *
     * Individual tools will be added in the following
     * 5.7.x implementation steps.
     */
    public getTools(): MCPTool[] {
        return [];
    }

    /**
     * Expose the service for future tool implementations.
     *
     * This keeps the dependency explicit and avoids creating
     * another GitHubService instance inside individual tools.
     */
    protected getService(): GitHubService {
        return this.githubService;
    }
}