import { gateway } from "../gateway";
import { registry } from "../registry";
import { healthMonitor } from "../health";
import { logger } from "../logger";

import {
    FilesystemServer,
    FilesystemService,
    FilesystemTools
} from "../servers/filesystem";

class MCPBootstrap {

    private filesystemServer?: FilesystemServer;

    /**
     * Initialize MCP Infrastructure
     */
    public async initialize(): Promise<void> {

        logger.info("Initializing MCP Infrastructure...");

        /**
         * ------------------------------------
         * Create Filesystem Module
         * ------------------------------------
         */

        const filesystemService =
            new FilesystemService();

        const filesystemTools =
            new FilesystemTools(filesystemService);

        this.filesystemServer =
            new FilesystemServer(
                filesystemService,
                filesystemTools
            );

        /**
         * ------------------------------------
         * Register Server
         * ------------------------------------
         */

        //  registry.register(this.filesystemServer);

        gateway.registerServer(this.filesystemServer);

        // /**
        //  * ------------------------------------
        //  * Connect Server
        //  * ------------------------------------
        //  */



        await gateway.connect(
            this.filesystemServer.id
        );

        if (
            !gateway.hasServer(
                this.filesystemServer.id
            )
        ) {

            throw new Error(
                `Filesystem MCP Server '${this.filesystemServer.id}' is not registered.`
            );

        }


        logger.info(
            `Registered Servers: ${registry.getAll().length}`
        );

        logger.info(
            `Registered Tools: ${this.filesystemServer.discoverTools().length}`
        );

        /**
         * ------------------------------------
         * Start Health Monitor
         * ------------------------------------
         */

        healthMonitor.start();

        logger.info("MCP Infrastructure Ready.");

    }

    /**
     * Graceful Shutdown
     */
    public async shutdown(): Promise<void> {

        logger.info(
            "Stopping MCP Infrastructure..."
        );

        if (this.filesystemServer) {

            await this.filesystemServer.disconnect();

        }

        healthMonitor.stop();

        logger.info(
            "MCP Infrastructure Stopped."
        );

    }

}

export default new MCPBootstrap();