import { AIProvider } from "./AIProvider";

export class GeminiProvider implements AIProvider {

    async chat(prompt: string) {

        return {

            provider: "Gemini",

            response: `Mock response from Gemini for "${prompt}"`

        };

    }

}