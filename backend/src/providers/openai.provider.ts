import { AIProvider } from "./ai-provider";

export class OpenAIProvider implements AIProvider {
    async generate(prompt: string, model: string): Promise<string> {
        console.log("OpenAI Provider");

        return `
                    OpenAI integration will be implemented in a future chapter.

                    Prompt:
                    ${prompt}

                    Model:
                    ${model}
                `;
    }

    async chat(
        prompt: string,
        model: string
    ): Promise<string> {

        console.log("OpenAI Provider");

        return `
                    OpenAI integration will be implemented in a future chapter.

                    Prompt:
                    ${prompt}

                    Model:
                    ${model}
                `;

    }

    async streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void> {

        onToken("OpenAI streaming is not implemented yet.");

    }

}