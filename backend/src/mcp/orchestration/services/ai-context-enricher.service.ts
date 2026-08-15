import { OrchestrationRequest } from "../interfaces/orchestration-request.interface";
import { AIContext } from "../interfaces/ai-context.interface";
import { ToolExecutionResult } from "../interfaces/orchestration-result.interface";

export class AIContextEnricherService {

    enrich(
        request: OrchestrationRequest,
        toolResults: ToolExecutionResult[],
    ): AIContext {

        const items = toolResults
            .filter((result) => result.status === "success")
            .map((result) => ({
                source: result.serverName ?? "mcp",
                toolName: result.toolName,
                data: result.data,
                metadata: {
                    executionTimeMs: result.executionTimeMs,
                },
            }));

        return {
            userMessage: request.userMessage,

            workspacePath: request.workspacePath,

            items,

            metadata: {
                toolCount: toolResults.length,
                successfulToolCount: items.length,
            },
        };
    }
}