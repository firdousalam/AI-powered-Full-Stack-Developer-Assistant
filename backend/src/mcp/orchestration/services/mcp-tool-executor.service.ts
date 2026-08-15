import mcpGateway from "../../gateway/gateway";

import {
    ToolRequest,
    ToolResponse,
} from "../../types";

import {
    SelectedTool,
} from "../interfaces/tool-selection-result.interface";

import {
    ToolExecutionResult,
} from "../interfaces/orchestration-result.interface";

export class McpToolExecutorService {

    async execute(
        tool: SelectedTool,
        serverId: string,
    ): Promise<ToolExecutionResult> {

        const startTime = Date.now();

        const request: ToolRequest = {
            serverId,
            toolName: tool.toolName,
            args: tool.arguments,
        };

        try {

            const response: ToolResponse =
                await mcpGateway.executeTool(request);

            const executionTimeMs =
                Date.now() - startTime;

            if (!response.success) {

                return {
                    toolName: tool.toolName,
                    serverName: serverId,
                    status: "failed",
                    error: response.error,
                    executionTimeMs,
                };

            }

            return {
                toolName: tool.toolName,
                serverName: serverId,
                status: "success",
                data: response.data,
                executionTimeMs,
            };

        } catch (error) {

            const executionTimeMs =
                Date.now() - startTime;

            return {
                toolName: tool.toolName,
                serverName: serverId,
                status: "failed",
                error: this.getErrorMessage(error),
                executionTimeMs,
            };

        }
    }

    private getErrorMessage(
        error: unknown,
    ): string {

        if (error instanceof Error) {
            return error.message;
        }

        return String(error);
    }
}