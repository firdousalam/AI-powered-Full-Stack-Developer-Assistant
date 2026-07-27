import { AIProvider } from "./AIProvider";

import { OllamaProvider } from "./ollama.provider";

import { OpenAIProvider } from "./openai.provider";

import { GeminiProvider } from "./gemini.provider";

import { ClaudeProvider } from "./claude.provider";

export class ProviderFactory {

    static create(model: string): AIProvider {

        switch (model.toLowerCase()) {

            case "ollama":

                return new OllamaProvider();

            case "openai":

                return new OpenAIProvider();

            case "gemini":

                return new GeminiProvider();

            case "claude":

                return new ClaudeProvider();

            default:

                return new OllamaProvider();

        }

    }

}