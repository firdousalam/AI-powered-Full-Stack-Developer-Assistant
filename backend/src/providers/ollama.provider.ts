import { AIProvider } from "./AIProvider";

export class OllamaProvider implements AIProvider {

    async chat(prompt: string) {

        return {

            provider: "Ollama",

            response: `Mock response from Ollama for "${prompt}"`

        };

    }

}