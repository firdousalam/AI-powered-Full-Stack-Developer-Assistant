import { gateway } from "../../gateway";
import {
    DiscoveredTool
} from "./toolDiscovery.types";

export class McpToolDiscoveryService {

    /**
     * Discover all tools registered
     * in the MCP Gateway.
     */
    public discoverTools(): DiscoveredTool[] {

        const tools =
            gateway.discoverTools();

        return tools.map(tool => ({

            name:
                tool.name,

            description:
                tool.description,

            inputSchema:
                tool.inputSchema

        }));

    }

}