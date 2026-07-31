import { AIProvider } from "./ai-provider";

import { OpenAIProvider } from "./openai.provider";
import { GeminiProvider } from "./gemini.provider";
import { ClaudeProvider } from "./claude.provider";
import { ollamaProvider } from "./ollama.provider";

export enum AIProviderType {

    OLLAMA = "ollama",

    OPENAI = "openai",

    GEMINI = "gemini",

    CLAUDE = "claude"

}

export class ProviderFactory {

    static create(

        provider: AIProviderType

    ): AIProvider {

        switch (provider) {

            case AIProviderType.OPENAI:

                return new OpenAIProvider();

            case AIProviderType.GEMINI:

                return new GeminiProvider();

            case AIProviderType.CLAUDE:

                return new ClaudeProvider();

            case AIProviderType.OLLAMA:

            default:

                return new ollamaProvider();

        }

    }

}