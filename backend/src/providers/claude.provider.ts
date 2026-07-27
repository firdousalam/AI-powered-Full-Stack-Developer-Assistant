import { AIProvider } from "./AIProvider";

export class ClaudeProvider implements AIProvider {

    async chat(prompt: string) {

        return {

            provider: "Claude",

            response: `Mock response from Claude for "${prompt}"`

        };

    }

}