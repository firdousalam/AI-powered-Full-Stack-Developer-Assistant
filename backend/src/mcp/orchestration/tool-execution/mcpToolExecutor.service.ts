import { gateway } from "../../gateway";
import {
    ToolRequest,
    ToolResponse
} from "../../types";

export class McpToolExecutorService {

    /**
     * Execute an MCP tool through the gateway.
     *
     * The AI layer never directly accesses
     * DeveloperTool or FilesystemService.
     */
    public async execute(
        serverId: string,
        toolName: string,
        arguments_: Record<string, unknown>
    ): Promise<ToolResponse> {

        const request: ToolRequest = {

            serverId,

            toolName,

            args: arguments_

        };

        return gateway.executeTool(request);

    }

}

export const mcpToolExecutorService =
    new McpToolExecutorService();