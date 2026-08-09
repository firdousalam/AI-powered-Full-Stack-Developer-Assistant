import { LLMToolDefinition } from "../mcp/orchestration/tool-schema/llmTool.types";
import {
    AIMessage,
    AIProvider,
    AIResponse
} from "./ai-provider";

export class ClaudeProvider implements AIProvider {
    async generate(prompt: string, model: string): Promise<string> {
        console.log("Claude   Provider");

        return `
                    Claude   integration will be implemented in a future chapter.

                    Prompt:
                    ${prompt}

                    Model:
                    ${model}
                `;
    }

    async chat(
        prompt: string,
        model: string
    ): Promise<string> {

        console.log("Claude   Provider");

        return `
                    Claude   integration will be implemented in a future chapter.

                    Prompt:
                    ${prompt}

                    Model:
                    ${model}
                `;

    }

    async streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void> {

        onToken("Claude   streaming is not implemented yet.");

    }

    async chatWithTools(
        messages: AIMessage[],
        model: string,
        tools: LLMToolDefinition[]
    ): Promise<AIResponse> {

        throw new Error(
            "Tool calling is not implemented for Claude provider yet."
        );

    }

}