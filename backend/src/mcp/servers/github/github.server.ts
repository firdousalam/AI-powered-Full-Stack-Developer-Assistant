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

/**
 * ============================================================
 * GitHub MCP Server
 * ============================================================
 *
 * Responsible for:
 *
 * - GitHub MCP server lifecycle
 * - GitHub tool registration
 * - Tool discovery
 * - Tool execution
 * - Server metadata
 * - Health monitoring
 *
 * Architecture:
 *
 * GitHubServer
 *      ↓
 * GitHubTools
 *      ↓
 * GitHubService
 *      ↓
 * GitHub REST API
 *
 * ============================================================
 */

export class GitHubServer implements MCPServer {

    /**
     * ========================================================
     * Server Metadata
     * ========================================================
     */

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
     * ========================================================
     * Registered MCP Tools
     * ========================================================
     */

    private readonly tools =
        new Map<string, MCPTool>();

    /**
     * ========================================================
     * Constructor
     * ========================================================
     */

    constructor(
        private readonly githubService: GitHubService,
        private readonly githubTools: GitHubTools
    ) { }

    /**
     * ========================================================
     * Register Tools
     * ========================================================
     *
     * Gets all GitHub tools from GitHubTools and registers
     * them inside the server tool registry.
     */
    private registerTools(): void {

        const tools =
            this.githubTools.getTools();

        for (const tool of tools) {

            if (
                this.tools.has(
                    tool.name
                )
            ) {

                MCPLogger.warn(
                    `GitHub Tool already registered: ${tool.name}`
                );

                continue;
            }

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
     * ========================================================
     * Connect
     * ========================================================
     *
     * Initializes the GitHub MCP server and registers all
     * available GitHub tools.
     */
    public async connect(): Promise<void> {

        if (
            this.status ===
            ServerStatus.CONNECTED
        ) {
            MCPLogger.info(
                "GitHub MCP Server is already connected."
            );

            return;
        }

        this.status =
            ServerStatus.CONNECTING;

        MCPLogger.info(
            "Connecting GitHub MCP Server..."
        );

        try {

            this.registerTools();

            this.status =
                ServerStatus.CONNECTED;

            MCPLogger.info(
                "GitHub MCP Server connected."
            );

            MCPLogger.info(
                `Registered ${this.tools.size} MCP tools.`
            );

        } catch (error) {

            this.status =
                ServerStatus.DISCONNECTED;

            MCPLogger.error(
                "Failed to connect GitHub MCP Server.",
                error
            );

            throw error;
        }
    }

    /**
     * ========================================================
     * Disconnect
     * ========================================================
     *
     * Clears registered tools and releases GitHub service
     * resources.
     */
    public async disconnect(): Promise<void> {

        if (
            this.status ===
            ServerStatus.DISCONNECTED
        ) {
            return;
        }

        MCPLogger.info(
            "Disconnecting GitHub MCP Server..."
        );

        this.tools.clear();

        await this.githubService.dispose();

        this.status =
            ServerStatus.DISCONNECTED;

        MCPLogger.info(
            "GitHub MCP Server disconnected."
        );
    }

    /**
     * ========================================================
     * Execute Tool
     * ========================================================
     *
     * Executes a registered GitHub MCP tool.
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
                `Executing GitHub Tool: ${tool.name}`
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
                `GitHub Tool ${tool.name} failed`,
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
     * ========================================================
     * Discover Tools
     * ========================================================
     *
     * Returns every GitHub MCP tool currently registered.
     */
    public discoverTools(): MCPTool[] {

        return [
            ...this.tools.values()
        ];
    }

    /**
     * ========================================================
     * Metadata
     * ========================================================
     *
     * Returns metadata about the GitHub MCP server.
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
     * ========================================================
     * Health Check
     * ========================================================
     *
     * Delegates the health check to GitHubService.
     */
    public async healthCheck() {

        return this.githubService.health();
    }

    /**
     * ========================================================
     * Connection Status
     * ========================================================
     */
    public isConnected(): boolean {

        return (
            this.status ===
            ServerStatus.CONNECTED
        );
    }
}

/**
 * Explicit class export.
 *
 * This also makes the export visible to index.ts:
 *
 * import { GitHubServer } from "./github.server";
 */
//export { GitHubServer };