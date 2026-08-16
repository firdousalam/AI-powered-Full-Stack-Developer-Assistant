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

import {
    ToolTimeoutService,
} from "../services/tool-timeout.service";

import {
    ToolExecutionErrorService,
} from "../services/tool-execution-error.service";

import {
    ToolTimeoutError,
} from "../services/tool-timeout.error";
export class McpOrchestratorService {

    private readonly contextEnricher =
        new AIContextEnricherService();

    private readonly timeoutService =
        new ToolTimeoutService();

    private readonly errorService =
        new ToolExecutionErrorService();

    public getTools(): LLMToolDefinition[] {

        return toolCatalogService.getTools();

    }


    public async executeTool(
        toolName: string,
        toolArguments: Record<string, unknown>,
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
            "filesystem-server";


        const timeoutMs =
            30_000;


        try {

            const result =
                await this.timeoutService.execute(

                    mcpToolExecutorService.execute(
                        serverId,
                        toolName,
                        toolArguments,
                    ),

                    timeoutMs,

                );


            console.log(
                "========== MCP TOOL RESULT =========="
            );

            console.log(
                result
            );


            return result;

        } catch (error) {

            if (error instanceof ToolTimeoutError) {

                console.error(
                    "========== MCP TOOL TIMEOUT =========="
                );

                console.error(
                    error.message
                );


                return {

                    success: false,

                    timeout: true,

                    error: error.message,

                };

            }


            const errorMessage =
                this.errorService.getMessage(
                    error,
                );


            console.error(
                "========== MCP TOOL ERROR =========="
            );

            console.error(
                errorMessage
            );


            return {

                success: false,

                timeout: false,

                error: errorMessage,

            };

        }

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