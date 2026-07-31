import { AIProvider } from "./ai-provider";

export class ollamaProvider implements AIProvider {

    async chat(

        prompt: string,

        model: string

    ): Promise<string> {

        try {

            const response = await fetch(

                "http://localhost:11434/api/chat",

                {
                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        model,

                        stream: false,

                        messages: [

                            {

                                role: "user",

                                content: prompt

                            }

                        ]

                    })

                }

            );

            if (!response.ok)

                throw new Error("Ollama Chat Failed");

            const data = await response.json();

            return data.message.content;

        }

        catch (error) {

            console.error(error);

            throw error;

        }

    }

    async generate(

        prompt: string,

        model: string

    ): Promise<string> {

        try {

            const response = await fetch(

                "http://localhost:11434/api/generate",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        model,

                        prompt,

                        stream: false

                    })

                }

            );

            if (!response.ok)

                throw new Error("Generate Failed");

            const data = await response.json();

            return data.response;

        }

        catch (error) {

            console.error(error);

            throw error;

        }

    }

    async streamChat(

        prompt: string,

        model: string,

        onToken: (token: string) => void

    ): Promise<void> {

        try {

            const response = await fetch(

                "http://localhost:11434/api/chat",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        model,

                        stream: true,

                        messages: [

                            {

                                role: "user",

                                content: prompt

                            }

                        ]

                    })

                }

            );

            if (!response.body)

                throw new Error("ReadableStream Missing");

            const reader = response.body.getReader();

            const decoder = new TextDecoder();

            while (true) {

                const { done, value } = await reader.read();

                if (done)

                    break;

                const chunk = decoder.decode(value);

                const lines = chunk

                    .split("\n")

                    .filter(line => line.trim() !== "");

                for (const line of lines) {

                    try {

                        const json = JSON.parse(line);

                        if (json.message?.content) {

                            onToken(json.message.content);

                        }

                    }

                    catch {

                        // Ignore malformed JSON fragments

                    }

                }

            }

        }

        catch (error) {

            console.error(error);

            throw error;

        }

    }

}
