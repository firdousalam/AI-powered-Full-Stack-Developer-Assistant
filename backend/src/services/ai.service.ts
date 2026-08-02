import type {
    BrowserContext
} from "../types/browserContext.types";
import promptService from "./prompt.service";
import aiRouter from "./ai-router.service";
import { AI_CONFIG } from "../config/ai.config";
import { ProviderFactory } from "../providers/provider.factory";
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

        if (!response.ok) {

            throw new Error(

                `Backend Error : ${response.status}`

            );

        }

        const result = await response.json();

        return result;

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

/**
 * ==========================================
 * Streaming Chat API
 * ==========================================
 */
export async function streamChat(

    prompt: string,

    model: string,

    browserContext: BrowserContext,

    onToken: (token: string) => void

) {



    /**
        * Build final AI prompt
        */
    const finalPrompt =

        promptService.buildPrompt(

            prompt,

            browserContext

        );
    console.log("========== streamChat REQUEST ==========", browserContext)
    /**
     * Select model
     */
    const route =

        aiRouter.selectModel(

            model ?? prompt

        );

    console.log(

        "Selected Model:",

        route.model

    );
    const provider =

        ProviderFactory.create(

            AI_CONFIG.provider

        );


    // const response = await fetch("http://localhost:11434/api/chat", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         model,
    //         stream: true,
    //         messages: [
    //             {
    //                 role: "user",
    //                 content: prompt
    //             }
    //         ]
    //     })
    // });


    return provider.streamChat(

        finalPrompt,

        route.model,

        onToken

    );
    /*

    console.log("Status:", response.status);

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

    }*/

}