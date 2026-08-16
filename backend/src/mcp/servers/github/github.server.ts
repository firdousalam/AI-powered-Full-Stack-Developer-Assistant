// src/mcp/servers/github/github.server.ts

import {
    MCPServer,
    MCPTool,
    ServerStatus,
    ToolRequest,
    ToolResponse
} from "../../types";

import MCPLogger from "../../logger/mcpLogger";

import {
    GitHubService
} from "./github.service";

import {
    GitHubTools
} from "./github.tools";

import {
    GITHUB_SERVER
} from "./github.constants";

export class GitHubServer implements MCPServer {

    /**
     * Unique server identifier.
     */
    public readonly id =
        GITHUB_SERVER.ID;

    /**
     * Display name.
     */
    public readonly name =
        GITHUB_SERVER.NAME;

    /**
     * Server version.
     */
    public readonly version =
        GITHUB_SERVER.VERSION;

    /**
     * Transport type.
     */
    public readonly transport =
        GITHUB_SERVER.TRANSPORT;

    /**
     * Current server status.
     */
    public status: ServerStatus =
        ServerStatus.DISCONNECTED;

    /**
     * MCP tools exposed by this server.
     */
    private readonly tools =
        new Map<string, MCPTool>();

    constructor(
        private readonly githubService: GitHubService,
        private readonly githubTools: GitHubTools
    ) { }

    /**
     * Register all GitHub MCP tools.
     */
    private registerTools(): void {

        const tools =
            this.githubTools.getTools();

        for (const tool of tools) {

            this.tools.set(
                tool.name,
                tool
            );

            MCPLogger.info(
                `Registered GitHub Tool: ${tool.name}`
            );
        }
    }

    /**
     * Connect and initialize the GitHub MCP server.
     */
    public async connect(): Promise<void> {

        if (
            this.status ===
            ServerStatus.CONNECTED
        ) {
            return;
        }

        this.status =
            ServerStatus.CONNECTING;

        MCPLogger.info(
            "Connecting GitHub MCP Server..."
        );

        this.registerTools();

        this.status =
            ServerStatus.CONNECTED;

        MCPLogger.info(
            "GitHub MCP Server connected."
        );

        MCPLogger.info(
            `Registered ${this.tools.size} MCP tools.`
        );
    }

    /**
     * Disconnect the GitHub MCP server.
     */
    public async disconnect(): Promise<void> {

        this.tools.clear();

        await this.githubService.dispose();

        this.status =
            ServerStatus.DISCONNECTED;

        MCPLogger.info(
            "GitHub MCP Server disconnected."
        );
    }

    /**
     * Execute a registered MCP tool.
     */
    public async executeTool(
        request: ToolRequest
    ): Promise<ToolResponse> {

        const tool =
            this.tools.get(
                request.toolName
            );

        if (!tool) {

            return {
                success: false,
                error:
                    `Unknown tool '${request.toolName}'`
            };
        }

        try {

            MCPLogger.info(
                `Executing Tool: ${tool.name}`
            );

            const result =
                await tool.execute(
                    request.args
                );

            return {
                success: true,
                data: result
            };

        } catch (error) {

            MCPLogger.error(
                `Tool ${tool.name} failed`,
                error
            );

            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error"
            };
        }
    }

    /**
     * Discover every MCP tool exposed by
     * this server.
     */
    public discoverTools(): MCPTool[] {

        return [
            ...this.tools.values()
        ];
    }

    /**
     * Return server metadata.
     */
    public getMetadata() {

        return {
            id: this.id,
            name: this.name,
            version: this.version,
            transport: this.transport,
            status: this.status,
            toolCount: this.tools.size,
            apiUrl:
                this.githubService.getApiUrl()
        };
    }

    /**
     * Health check.
     */
    public async healthCheck() {

        return this.githubService.health();
    }

    /**
     * Whether the server is connected.
     */
    public isConnected(): boolean {

        return (
            this.status ===
            ServerStatus.CONNECTED
        );
    }
}