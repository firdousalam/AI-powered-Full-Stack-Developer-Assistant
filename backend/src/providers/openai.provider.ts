import { AIProvider } from "./AIProvider";

export class OpenAIProvider implements AIProvider {

    async chat(prompt: string) {

        return {

            provider: "OpenAI",

            response: `Mock response from OpenAI for "${prompt}"`

        };

    }

}