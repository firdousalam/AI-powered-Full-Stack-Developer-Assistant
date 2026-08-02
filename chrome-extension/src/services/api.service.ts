import type {

    BrowserContext

} from "../types/browser.types";

const API_URL =

    "http://localhost:3000/api/v1/ai";

/**
 * ==========================================
 * Standard Chat API
 * ==========================================
 */

export async function chatWithAI(

    prompt: string,

    model: string,

    browserContext: BrowserContext

) {

    try {

        console.log("========== CHAT ==========");

        console.log("Prompt:", prompt);

        console.log("Model:", model);

        console.log("Browser Context:", browserContext);

        const response = await fetch(

            `${API_URL}/chat`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    prompt,

                    model,

                    browserContext

                })

            }

        );
        console.log(response)
        if (!response.ok) {

            throw new Error(

                "Backend request failed"

            );

        }

        return await response.json();

    }

    catch (error) {

        console.error(

            "Chat API Error:",

            error

        );

        return {

            success: false,

            response:

                "Unable to connect to backend."

        };

    }

}

export async function streamChat(

    prompt: string,

    model: string,

    browserContext: BrowserContext,

    onToken: (token: string) => void

) {

    console.log("========== STREAM ==========");

    console.log(browserContext);

    const response = await fetch(

        `${API_URL}/chat/stream`,

        {

            method: "POST",

            headers: {

                "Content-Type":

                    "application/json"

            },

            body: JSON.stringify({

                prompt,

                model,

                browserContext

            })

        }

    );
    console.log("streamresponse", response);
    if (!response.ok) {

        throw new Error(

            "Streaming request failed"

        );

    }

    if (!response.body) {

        throw new Error(

            "ReadableStream missing"

        );

    }

    const reader =

        response.body.getReader();

    const decoder =

        new TextDecoder();

    while (true) {

        const {

            done,

            value

        } = await reader.read();

        if (done)

            break;

        const chunk = decoder.decode(

            value,

            {

                stream: true

            }

        );

        const lines =

            chunk

                .split("\n")

                .filter(

                    line => line.trim() !== ""

                );

        for (const line of lines) {

            try {

                const json =

                    JSON.parse(line);

                if (

                    json.message?.content

                ) {

                    onToken(

                        json.message.content

                    );

                }

            }

            catch (error) {

                // Ignore malformed chunks
                console.error(

                    "Chat API Error:",

                    error

                );
                /*
                return {

                    success: false,

                    response:

                        "Unable to connect to backend."

                };
                */

            }

        }

    }

}