import type {
    LLMToolDefinition
} from "../tool-schema";

import {
    toolCatalogService
} from "../tool-catalog";

import {
    mcpToolExecutorService
} from "../tool-execution";

import {
    AIContext,
} from "../interfaces/ai-context.interface";

import {
    OrchestrationRequest,
} from "../interfaces/orchestration-request.interface";

import {
    ToolExecutionResult,
} from "../interfaces/orchestration-result.interface";

import {
    AIContextEnricherService,
} from "../services/ai-context-enricher.service";

export class McpOrchestratorService {

    private readonly contextEnricher =
        new AIContextEnricherService();


    public getTools(): LLMToolDefinition[] {

        return toolCatalogService.getTools();

    }


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

        const serverId =
            "filesystem";

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


    public enrichContext(
        request: OrchestrationRequest,
        toolResults: ToolExecutionResult[],
    ): AIContext {

        return this.contextEnricher.enrich(
            request,
            toolResults,
        );

    }

}




/**
 * Singleton
 */
export const mcpOrchestratorService =
    new McpOrchestratorService();