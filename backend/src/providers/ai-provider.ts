import {
    LLMToolDefinition
} from "../mcp/orchestration/tool-schema";

export interface AIResponse {
    content?: string;
    toolCalls?: AIToolCall[];
}
export interface AIMessage {
    role: "system" | "user" | "assistant" | "tool";
    content?: string;

    tool_calls?: any[];

    tool_call_id?: string;
}

export interface AIToolCall {
    id?: string;

    function: {
        name: string;
        arguments: Record<string, unknown>;
    };
}

export interface AIProvider {

    chat(
        prompt: string,
        model: string
    ): Promise<string>;

    generate(
        prompt: string,
        model: string
    ): Promise<string>;

    streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void>;

    chatWithTools(
        messages: AIMessage[],
        model: string,
        tools: LLMToolDefinition[]
    ): Promise<AIResponse>;
}