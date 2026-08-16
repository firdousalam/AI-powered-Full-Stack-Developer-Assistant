import {
    AIMessage,
    AIProvider,
    AIResponse
} from "./ai-provider";

import {
    LLMToolDefinition
} from "../mcp/orchestration/tool-schema";

export class ollamaProvider implements AIProvider {

    async chat(
        prompt: string,
        model: string
    ): Promise<string> {

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

        if (!response.ok) {
            throw new Error(
                `Ollama Chat Failed: ${response.status}`
            );
        }

        const data = await response.json();

        return data.message?.content ?? "";
    }


    async generate(
        prompt: string,
        model: string
    ): Promise<string> {

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

        if (!response.ok) {
            throw new Error(
                `Ollama Generate Failed: ${response.status}`
            );
        }

        const data = await response.json();

        return data.response ?? "";
    }


    async streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void> {

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

        if (!response.ok) {
            throw new Error(
                `Streaming Error: ${response.status}`
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

                const chunk =
                    decoder.decode(
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
        finally {
            reader.releaseLock();
        }
    }


    /**
     * ==========================================
     * Native Ollama Tool Calling
     * ==========================================
     */
    /**
 * ==========================================
 * Native Ollama Tool Calling
 * ==========================================
 */
    /**
 * ==========================================
 * Native Ollama Tool Calling
 * ==========================================
 */
    async chatWithTools(
        messages: AIMessage[],
        model: string,
        tools: LLMToolDefinition[]
    ): Promise<AIResponse> {

        console.log(
            "========== OLLAMA TOOL REQUEST =========="
        );


        console.log(
            "Model:",
            model
        );


        console.log(
            "Messages:",
            JSON.stringify(
                messages,
                null,
                2
            )
        );


        console.log(
            "Tools:",
            JSON.stringify(
                tools,
                null,
                2
            )
        );


        const response =
            await fetch(
                "http://localhost:11434/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        model,

                        stream: false,

                        messages,

                        tools

                    })

                }
            );


        /**
         * ==========================================
         * OLLAMA ERROR
         * ==========================================
         */

        if (!response.ok) {

            const errorText =
                await response.text();


            console.error(
                "========== OLLAMA ERROR =========="
            );


            console.error(
                "Status:",
                response.status
            );


            console.error(
                "Response:",
                errorText
            );


            throw new Error(
                `Ollama tool request failed: ${response.status} ${errorText}`
            );

        }


        /**
         * ==========================================
         * PARSE RESPONSE
         * ==========================================
         */

        const data =
            await response.json();


        console.log(
            "========== OLLAMA RESPONSE =========="
        );


        console.log(
            JSON.stringify(
                data,
                null,
                2
            )
        );


        /**
         * ==========================================
         * EXTRACT MESSAGE
         * ==========================================
         */

        const message =
            data.message;


        const toolCalls =
            Array.isArray(
                message?.tool_calls
            )
                ? message.tool_calls
                : [];


        /**
         * ==========================================
         * NORMALIZED RESPONSE
         * ==========================================
         */

        return {

            content:
                message?.content ?? "",

            toolCalls

        };

    }
}