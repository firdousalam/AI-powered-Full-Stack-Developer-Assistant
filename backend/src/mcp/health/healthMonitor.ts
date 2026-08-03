import { registry } from "../registry";
import { logger } from "../logger";
import {
    gatewayConfig
} from "../config";

import {
    ServerStatus
} from "../types";

class HealthMonitor {

    private timer?: NodeJS.Timeout;

    /**
     * Start monitoring
     */
    start(): void {

        if (this.timer) {

            return;

        }

        logger.info(

            "Health Monitor started."

        );

        this.timer = setInterval(

            () => this.checkAllServers(),

            gatewayConfig.healthCheckInterval

        );

    }

    /**
     * Stop monitoring
     */
    stop(): void {

        if (!this.timer) {

            return;

        }

        clearInterval(this.timer);

        this.timer = undefined;

        logger.info(

            "Health Monitor stopped."

        );

    }

    /**
     * Check every registered server
     */
    private checkAllServers(): void {

        const servers = registry.getAll();

        for (const server of servers) {

            this.checkServer(server.id);

        }

    }

    /**
     * Check a single server
     */
    private checkServer(

        serverId: string

    ): void {

        const server = registry.get(serverId);

        if (!server) {

            return;

        }

        /**
         * Future:
         * Call the actual MCP ping/health endpoint.
         */

        const healthy =

            server.status === ServerStatus.CONNECTED;

        if (healthy) {

            logger.debug(

                `${server.name} is healthy.`

            );

            return;

        }

        logger.warn(

            `${server.name} is disconnected.`

        );

        registry.updateStatus(

            server.id,

            ServerStatus.DISCONNECTED

        );

        if (gatewayConfig.autoReconnect) {

            logger.info(

                `Reconnect scheduled for ${server.name}`

            );

            /**
             * Automatic reconnect
             * will be implemented
             * in a future milestone.
             */
        }

    }

}
export default new HealthMonitor();