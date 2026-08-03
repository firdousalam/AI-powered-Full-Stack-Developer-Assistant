import { registry } from "../registry";

import { logger } from "../logger";

import {

    MCPServer,

    MCPTool,

    ServerStatus,

    ToolRequest,

    ToolResponse

} from "../types";

class MCPGateway {

    /**
     * Register a new MCP Server
     */
    registerServer(

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
    async connect(

        serverId: string

    ): Promise<boolean> {

        const server = registry.get(serverId);

        if (!server) {

            logger.error(

                `Server '${serverId}' not found.`

            );

            return false;

        }

        server.status = ServerStatus.CONNECTED;

        logger.info(

            `${server.name} connected.`

        );

        return true;

    }

    /**
     * Disconnect Server
     */
    async disconnect(

        serverId: string

    ): Promise<boolean> {

        const server = registry.get(serverId);

        if (!server) {

            return false;

        }

        server.status =

            ServerStatus.DISCONNECTED;

        logger.warn(

            `${server.name} disconnected.`

        );

        return true;

    }

    /**
     * Execute Tool
     */
    async executeTool(

        request: ToolRequest

    ): Promise<ToolResponse> {

        const server = registry.get(

            request.serverId

        );

        if (!server) {

            return {

                success: false,

                error: "Server not found."

            };

        }

        const tool = server.tools.find(

            tool =>

                tool.name === request.toolName

        );

        if (!tool) {

            return {

                success: false,

                error: "Tool not found."

            };

        }

        logger.info(

            `Executing ${tool.name} on ${server.name}`

        );

        const result = await tool.execute(

            request.arguments

        );

        return {

            success: true,

            data: result

        };

    }

    /**
     * Discover All Tools
     */
    discoverTools(): MCPTool[] {

        return registry

            .getAll()

            .flatMap(

                server => server.tools

            );

    }

    /**
     * Health Check
     */
    healthCheck() {

        return registry

            .getAll()

            .map(server => ({

                id: server.id,

                name: server.name,

                status: server.status

            }));

    }

}

export default new MCPGateway();