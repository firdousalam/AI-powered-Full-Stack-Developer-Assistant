import { AIProviderType } from "../providers/provider.factory";

export const AI_CONFIG = {

    provider:

        (process.env.AI_PROVIDER as AIProviderType)

        ||

        AIProviderType.OLLAMA,

    enableFallback: true,

    fallbackProvider: AIProviderType.OLLAMA

};