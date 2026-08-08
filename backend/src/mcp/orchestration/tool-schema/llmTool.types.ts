/**
 * Provider-neutral tool definition.
 *
 * This structure intentionally contains no
 * OpenAI, Ollama, Gemini, Anthropic, etc.
 * specific fields.
 */
export interface LLMToolDefinition {

    name: string;

    description: string;

    parameters: Record<string, unknown>;

}