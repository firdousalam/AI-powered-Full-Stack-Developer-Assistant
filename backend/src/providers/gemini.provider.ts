import { LLMToolDefinition } from "../mcp/orchestration/tool-schema/llmTool.types";
import {
    AIMessage,
    AIProvider,
    AIResponse
} from "./ai-provider";

export class GeminiProvider implements AIProvider {
    async generate(prompt: string, model: string): Promise<string> {
        console.log("Gemini  Provider");

        return `
                    Gemini  integration will be implemented in a future chapter.

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

        console.log("Gemini  Provider");

        return `
                    Gemini  integration will be implemented in a future chapter.

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

        onToken("Gemini  streaming is not implemented yet.");

    }

    async chatWithTools(
        messages: AIMessage[],
        model: string,
        tools: LLMToolDefinition[]
    ): Promise<AIResponse> {

        throw new Error(
            "Tool calling is not implemented for Gemini provider yet."
        );

    }

}