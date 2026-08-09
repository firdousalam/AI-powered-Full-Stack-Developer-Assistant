import { gateway } from "../../gateway";

import {
    MCPTool
} from "../../types";

export class McpToolDiscoveryService {

    public discoverTools(): MCPTool[] {

        return gateway.discoverTools();

    }

    public discoverServerTools(
        serverId: string
    ): MCPTool[] {

        return gateway.discoverServerTools(
            serverId
        );

    }

}