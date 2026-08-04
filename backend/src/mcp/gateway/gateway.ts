import { registry } from "../registry";
import { logger } from "../logger";

import {
    MCPServer,
    MCPTool,
    ToolRequest,
    ToolResponse
} from "../types";

class MCPGateway {

    /**
     * Register a new MCP Server
     */
    public registerServer(
        server: MCPServer
    ): void {

        registry.register(server);

        logger.info(
            `Gateway registered server: ${server.name}`
        );

    }

    /**
     * Connect Server
     */
    public async connect(
        serverId: string
    ): Promise<boolean> {

        const server = registry.get(serverId);

        if (!server) {

            logger.error(
                `Server '${serverId}' not found.`
            );

            return false;

        }

        await server.connect();

        logger.info(
            `${server.name} connected.`
        );

        return true;

    }

    /**
     * Disconnect Server
     */
    public async disconnect(
        serverId: string
    ): Promise<boolean> {

        const server = registry.get(serverId);

        if (!server) {

            logger.warn(
                `Server '${serverId}' not found.`
            );

            return false;

        }

        await server.disconnect();

        logger.info(
            `${server.name} disconnected.`
        );

        return true;

    }

    /**
     * Execute Tool
     */
    public async executeTool(
        request: ToolRequest
    ): Promise<ToolResponse> {

        const server = registry.get(
            request.serverId
        );

        if (!server) {

            return {

                success: false,

                error: `Server '${request.serverId}' not found.`

            };

        }

        logger.info(
            `Executing '${request.toolName}' on '${server.name}'.`
        );

        return await server.executeTool(request);

    }

    /**
     * Discover All Tools
     */
    public discoverTools(): MCPTool[] {

        return registry
            .getAll()
            .flatMap(server => server.discoverTools());

    }

    /**
     * Discover Tools for a Specific Server
     */
    public discoverServerTools(
        serverId: string
    ): MCPTool[] {

        const server = registry.get(serverId);

        if (!server) {
            return [];
        }

        return server.discoverTools();

    }

    /**
     * Health Check
     */
    public async healthCheck() {

        const servers = registry.getAll();

        return Promise.all(

            servers.map(async (server) => ({

                id: server.id,

                name: server.name,

                version: server.version,

                status: server.status,

                health: await server.healthCheck()

            }))

        );

    }

    /**
     * List Registered Servers
     */
    public getServers(): MCPServer[] {

        return registry.getAll();

    }

    /**
     * Get Server
     */
    public getServer(
        serverId: string
    ): MCPServer | undefined {

        return registry.get(serverId);

    }

    /**
     * Check Registration
     */
    public hasServer(
        serverId: string
    ): boolean {

        return registry.has(serverId);

    }

}

export default new MCPGateway();