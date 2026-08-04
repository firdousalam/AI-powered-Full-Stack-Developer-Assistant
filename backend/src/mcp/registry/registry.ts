import logger from "../logger/mcpLogger";
import {
    MCPServer,
    ServerStatus
} from "../types";

class MCPRegistry {

    private readonly servers = new Map<string, MCPServer>();

    /**
     * Register a new MCP Server
     */
    register(server: MCPServer): void {

        if (this.servers.has(server.id)) {

            logger.warn(

                `Server '${server.id}' is already registered.`

            );

            return;

        }

        this.servers.set(

            server.id,

            server

        );

        logger.info(

            `Registered MCP Server: ${server.name}`

        );

    }

    /**
     * Remove Server
     */
    unregister(serverId: string): boolean {

        const removed = this.servers.delete(serverId);

        if (removed) {

            logger.info(

                `Removed MCP Server: ${serverId}`

            );

        }

        return removed;

    }

    /**
     * Get Server
     */
    get(serverId: string): MCPServer | undefined {

        return this.servers.get(serverId);

    }

    /**
     * Get All Servers
     */
    getAll(): MCPServer[] {

        return [...this.servers.values()];

    }

    /**
     * Discover Connected Servers
     */
    discover(): MCPServer[] {

        return this.getAll().filter(

            server =>

                server.status === ServerStatus.CONNECTED

        );

    }

    /**
     * List Tools
     */
    getTools(serverId: string): string[] {

        const server = this.get(serverId);

        if (!server) {
            return [];
        }

        return server
            .discoverTools()
            .map(tool => tool.name);

    }

    /**
     * Check Server Status
     */
    getStatus(serverId: string): ServerStatus | null {

        return this.get(serverId)?.status ?? null;

    }

    /**
     * Update Server Status
     */
    updateStatus(

        serverId: string,

        status: ServerStatus

    ): void {

        const server = this.get(serverId);

        if (!server) {

            return;

        }

        server.status = status;

        logger.info(

            `${server.name} status → ${status}`

        );

    }

    /**
     * Check Registration
     */
    has(serverId: string): boolean {

        return this.servers.has(serverId);

    }

    /**
     * Remove Everything
     */
    clear(): void {

        this.servers.clear();

        logger.info(

            "MCP Registry cleared."

        );

    }

}

export default new MCPRegistry();