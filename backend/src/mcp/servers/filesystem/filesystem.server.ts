
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



export class FilesystemServer implements MCPServer {

    public readonly id = "filesystem-server";

    public readonly name = "Filesystem MCP Server";

    public readonly version = "1.0.0";

    public readonly transport = "local";

    public status: ServerStatus = ServerStatus.DISCONNECTED;

    private readonly tools = new Map<string, MCPTool>();

    constructor(
        private readonly filesystemService: FilesystemService,
        private readonly filesystemTools: FilesystemTools
    ) { }

    /**
     * Connect the server.
     */
    public async connect(): Promise<void> {

        if (this.status === ServerStatus.CONNECTED) {
            return;
        }

        this.status = ServerStatus.CONNECTING;

        MCPLogger.info(
            "Connecting Filesystem MCP Server..."
        );

        this.registerTools();

        this.status = ServerStatus.CONNECTED;

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

        this.status = ServerStatus.DISCONNECTED;

        MCPLogger.info(
            "Filesystem MCP Server disconnected."
        );
    }

    /**
     * Register all filesystem tools.
     */
    private registerTools(): void {

        const tools =
            this.filesystemTools.getTools();

        for (const tool of tools) {

            this.tools.set(tool.name, tool);

            MCPLogger.info(
                `Registered MCP Tool: ${tool.name}`
            );

        }

    }

    /**
     * Execute a tool.
     */
    public async executeTool(
        request: ToolRequest
    ): Promise<ToolResponse> {

        const tool =
            this.tools.get(request.toolName);

        if (!tool) {

            return {

                success: false,

                error: `Unknown tool '${request.toolName}'`

            };

        }

        try {

            MCPLogger.info(
                `Executing Tool: ${tool.name}`
            );

            const result =
                await tool.execute(request.args);

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
     * Discover all tools.
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

            toolCount: this.tools.size,

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
     * Whether server is connected.
     */
    public isConnected(): boolean {

        return this.status === ServerStatus.CONNECTED;

    }

    /**
     * Tool existence.
     */
    public hasTool(
        toolName: string
    ): boolean {

        return this.tools.has(toolName);

    }

    /**
     * Get tool by name.
     */
    public getTool(
        toolName: string
    ): MCPTool | undefined {

        return this.tools.get(toolName);

    }

    /**
     * List tool names.
     */
    public listTools(): string[] {

        return [...this.tools.keys()];

    }

    /**
     * Initialize server.
     */
    public async initialize(): Promise<void> {

        await this.connect();

    }

    /**
     * Shutdown server.
     */
    public async shutdown(): Promise<void> {

        await this.disconnect();

    }

}
