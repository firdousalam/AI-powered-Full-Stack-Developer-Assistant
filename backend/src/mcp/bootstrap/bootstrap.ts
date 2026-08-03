// import gateway from "../gateway";
import { registry } from "../registry";
import { healthMonitor } from "../health";

import { logger } from "../logger";

class MCPBootstrap {

    /**
     * Initialize MCP Infrastructure
     */
    async initialize(): Promise<void> {

        logger.info(

            "Initializing MCP Infrastructure..."

        );

        /**
         * Future:
         * Register Filesystem Server
         * Register GitHub Server
         * Register Docker Server
         */

        logger.info(

            `Registered Servers: ${registry.getAll().length}`

        );

        healthMonitor.start();

        logger.info(

            "MCP Infrastructure Ready."

        );

    }

    /**
     * Gracefully Shutdown
     */
    async shutdown(): Promise<void> {

        logger.info(

            "Stopping MCP Infrastructure..."

        );

        healthMonitor.stop();

        logger.info(

            "MCP Infrastructure Stopped."

        );

    }

}

export default new MCPBootstrap();