// src/mcp/servers/filesystem/filesystem.server.ts

import { FilesystemService } from "./filesystem.service";
import { FilesystemTools } from "./filesystem.tools";

import {
    MCPServer,
    MCPTool,
    ServerStatus,
    ToolRequest,
    ToolResponse
} from "../../types";

import MCPLogger from "../../logger/mcpLogger";

import {
    DeveloperToolRegistry,
    DeveloperToolMcpAdapter
} from "./developer-tools/base";

import {
    registerDeveloperTools
} from "./developer-tools/registerDeveloperTools";

export class FilesystemServer implements MCPServer {

    /**
     * Unique server identifier.
     */
    public readonly id = "filesystem-server";

    /**
     * Display name.
     */
    public readonly name = "Filesystem MCP Server";

    /**
     * Server version.
     */
    public readonly version = "1.0.0";

    /**
     * Transport type.
     */
    public readonly transport = "local";

    /**
     * Current server status.
     */
    public status: ServerStatus =
        ServerStatus.DISCONNECTED;

    /**
     * Final collection of MCP tools exposed
     * by this server.
     */
    private readonly tools =
        new Map<string, MCPTool>();

    /**
     * Registry containing all developer tools.
     *
     * These are higher-level AI developer tools
     * such as:
     *
     * - Analyze Project
     * - Dependency Analyzer
     * - Route Scanner
     * - TODO Scanner
     * - Workspace Summary
     *
     * Developer tools are later converted into
     * MCP tools using DeveloperToolMcpAdapter.
     */
    private readonly developerToolRegistry =
        new DeveloperToolRegistry();

    constructor(
        private readonly filesystemService: FilesystemService,
        private readonly filesystemTools: FilesystemTools
    ) { }

    /**
     * Register all low-level filesystem tools.
     *
     * Examples:
     *  - readFile
     *  - writeFile
     *  - searchFiles
     *  - listDirectory
     */
    private registerFilesystemTools(): void {

        const tools =
            this.filesystemTools.getTools();

        for (const tool of tools) {

            this.tools.set(
                tool.name,
                tool
            );

            MCPLogger.info(
                `Registered Filesystem Tool: ${tool.name}`
            );

        }

    }

    /**
     * Register all developer tools.
     *
     * Developer tools are framework-agnostic.
     *
     * Before exposing them through the MCP Server
     * they are wrapped using DeveloperToolMcpAdapter,
     * allowing them to behave like normal MCP tools.
     */
    private registerDeveloperTools(): void {

        const tools =
            this.developerToolRegistry.getAll();

        for (const tool of tools) {

            const adapter =
                new DeveloperToolMcpAdapter(tool);

            this.tools.set(
                adapter.name,
                adapter
            );

            MCPLogger.info(
                `Registered Developer Tool: ${adapter.name}`
            );

        }

    }

    /**
     * Register every tool exposed by this server.
     *
     * This includes:
     *
     * 1. Filesystem tools
     * 2. Developer tools
     */
    private registerTools(): void {

        this.registerFilesystemTools();

        this.registerDeveloperTools();

    }

    /**
     * Connect and initialize the server.
     *
     * Startup sequence:
     *
     * 1. Populate the developer tool registry.
     * 2. Register filesystem tools.
     * 3. Register developer tools.
     * 4. Mark the server as connected.
     */
    public async connect(): Promise<void> {

        if (this.status === ServerStatus.CONNECTED) {
            return;
        }

        this.status =
            ServerStatus.CONNECTING;

        MCPLogger.info(
            "Connecting Filesystem MCP Server..."
        );

        /**
         * Register all built-in developer tools.
         */
        registerDeveloperTools(
            this.developerToolRegistry
        );

        /**
         * Register every MCP tool.
         */
        this.registerTools();

        this.status =
            ServerStatus.CONNECTED;

        MCPLogger.info(
            "Filesystem MCP Server connected."
        );

    }

    /**
     * Disconnect the server.
     */
    public async disconnect(): Promise<void> {

        this.tools.clear();

        await this.filesystemService.dispose();

        this.status =
            ServerStatus.DISCONNECTED;

        MCPLogger.info(
            "Filesystem MCP Server disconnected."
        );

    }

    /**
     * Execute a registered MCP tool.
     */
    public async executeTool(
        request: ToolRequest
    ): Promise<ToolResponse> {

        const tool =
            this.tools.get(request.toolName);

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
     * Discover every MCP tool exposed
     * by this server.
     */
    public discoverTools(): MCPTool[] {

        return [...this.tools.values()];

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

            toolCount:
                this.tools.size,

            workspace:
                this.filesystemService.getWorkspaceRoot()

        };

    }

    /**
     * Health check.
     */
    public async healthCheck() {

        return this.filesystemService.health();

    }

    /**
     * Whether the server is connected.
     */
    public isConnected(): boolean {

        return this.status ===
            ServerStatus.CONNECTED;

    }

    /**
     * Determine whether a tool exists.
     */
    public hasTool(
        toolName: string
    ): boolean {

        return this.tools.has(
            toolName
        );

    }

    /**
     * Retrieve a tool by name.
     */
    public getTool(
        toolName: string
    ): MCPTool | undefined {

        return this.tools.get(
            toolName
        );

    }

    /**
     * Return every registered tool name.
     */
    public listTools(): string[] {

        return [...this.tools.keys()];

    }

    /**
     * Initialize the server.
     */
    public async initialize(): Promise<void> {

        await this.connect();

    }

    /**
     * Shutdown the server.
     */
    public async shutdown(): Promise<void> {

        await this.disconnect();

    }

}