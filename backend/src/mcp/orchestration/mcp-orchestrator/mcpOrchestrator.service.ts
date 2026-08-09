import type {
    LLMToolDefinition
} from "../tool-schema";

import {
    toolCatalogService
} from "../tool-catalog";

import {
    mcpToolExecutorService
} from "../tool-execution";


export class McpOrchestratorService {

    /**
     * ==========================================
     * Discover available MCP tools
     * ==========================================
     */
    public getTools(): LLMToolDefinition[] {

        return toolCatalogService.getTools();

    }


    /**
     * ==========================================
     * Execute MCP Tool
     * ==========================================
     *
     * AI layer -> Orchestrator -> Executor -> Gateway
     */
    public async executeTool(
        toolName: string,
        toolArguments: Record<string, unknown>
    ): Promise<unknown> {

        console.log(
            "========== MCP TOOL EXECUTION =========="
        );

        console.log(
            "Tool:",
            toolName
        );

        console.log(
            "Arguments:",
            toolArguments
        );


        /**
         * The current MCP server hosting
         * the developer/filesystem tools.
         *
         * IMPORTANT:
         * This must match the serverId registered
         * in your MCP Gateway.
         */
        const serverId = "filesystem";


        const result =
            await mcpToolExecutorService.execute(
                serverId,
                toolName,
                toolArguments
            );


        console.log(
            "========== MCP TOOL RESULT =========="
        );

        console.log(
            result
        );


        return result;

    }

}


/**
 * Singleton
 */
export const mcpOrchestratorService =
    new McpOrchestratorService();