import { AIProviderType } from "./provider.factory";

class ProviderStrategy {

    selectProvider(

        prompt: string

    ): AIProviderType {

        const input = prompt.toLowerCase();

        // Complex reasoning

        if (

            input.includes("architecture") ||

            input.includes("distributed") ||

            input.includes("microservices")

        ) {

            return AIProviderType.CLAUDE;

        }

        // Coding

        if (

            input.includes("typescript") ||

            input.includes("react") ||

            input.includes("docker") ||

            input.includes("node")

        ) {

            return AIProviderType.OLLAMA;

        }

        // Documentation

        if (

            input.includes("readme") ||

            input.includes("documentation")

        ) {

            return AIProviderType.OPENAI;

        }

        // Default

        return AIProviderType.OLLAMA;

    }

}

export default new ProviderStrategy();