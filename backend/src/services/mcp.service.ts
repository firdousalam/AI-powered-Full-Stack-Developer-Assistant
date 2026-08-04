import { gateway } from "../mcp/gateway";

import {
    MCPServer,
    MCPTool,
    ToolRequest,
    ToolResponse
} from "../mcp/types";

import { logger } from "../mcp/logger";

class MCPService {

    /**
     * ============================================================
     * Get All Registered Servers
     * ============================================================
     */
    public getServers(): MCPServer[] {

        return gateway.getServers();

    }

    /**
     * ============================================================
     * Get Server By Id
     * ============================================================
     */
    public getServer(
        serverId: string
    ): MCPServer | undefined {

        return gateway.getServer(serverId);

    }

    /**
     * ============================================================
     * Discover All Tools
     * ============================================================
     */
    public discoverTools(): MCPTool[] {

        return gateway.discoverTools();

    }

    /**
     * ============================================================
     * Discover Tools For Server
     * ============================================================
     */
    public discoverServerTools(
        serverId: string
    ): MCPTool[] {

        return gateway.discoverServerTools(serverId);

    }

    /**
     * ============================================================
     * Execute MCP Tool
     * ============================================================
     */
    public async executeTool(
        request: ToolRequest
    ): Promise<ToolResponse> {

        logger.info(

            `Executing MCP Tool '${request.toolName}'`

        );

        return await gateway.executeTool(request);

    }

    /**
     * ============================================================
     * Server Health
     * ============================================================
     */
    public async healthCheck() {

        return await gateway.healthCheck();

    }

    /**
     * ============================================================
     * Connect Server
     * ============================================================
     */
    public async connect(
        serverId: string
    ): Promise<boolean> {

        return await gateway.connect(serverId);

    }

    /**
     * ============================================================
     * Disconnect Server
     * ============================================================
     */
    public async disconnect(
        serverId: string
    ): Promise<boolean> {

        return await gateway.disconnect(serverId);

    }

    /**
     * ============================================================
     * Check Server Registration
     * ============================================================
     */
    public hasServer(
        serverId: string
    ): boolean {

        return gateway.hasServer(serverId);

    }

}

export default new MCPService();