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

            const response = await fetch("http://localhost:11434/api/chat", {
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
            });


            if (!response.ok) {

                throw new Error(

                    `Streaming Error : ${response.status}`

                );

            }

            if (!response.body) {

                throw new Error(

                    "ReadableStream not available."

                );

            }

            const reader =
                response.body.getReader();

            const decoder =
                new TextDecoder("utf-8");

            try {

                while (true) {

                    const {

                        done,

                        value

                    } = await reader.read();

                    if (done) {

                        break;

                    }

                    const chunk = decoder.decode(

                        value,

                        {

                            stream: true

                        }

                    );

                    if (chunk) {


                        onToken(chunk);

                    }

                }

            }

            catch (error) {

                console.error(

                    "Streaming Error:",

                    error

                );

                throw error;

            }

            finally {

                reader.releaseLock();

            }

        }
        catch {

        }
    }
}

