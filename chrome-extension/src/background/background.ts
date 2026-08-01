/// <reference types="chrome" />

import {
    chatWithAI,
    streamChat
} from "../services/api.service";

import {
    ASK_AI,
    ASK_AI_STREAM,
    AI_STREAM,
    AI_STREAM_END,
    AI_STREAM_ERROR
} from "../constants/message.types";

import getBrowserContext
    from "../services/browserContext.service";
import browserContextService from "../services/browserContext.service";

console.log("🚀 Background Service Worker Started");

/**
 * ==========================================
 * Normal Chat API
 * ==========================================
 */
chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        if (message.type !== ASK_AI) {
            return;
        }

        (async () => {

            try {

                console.log("Collecting Browser Context...");

                const browserContext = await browserContextService.getBrowserContext();

                console.log(browserContext);

                const result =
                    await chatWithAI(

                        message.prompt,

                        message.model,

                        browserContext

                    );

                sendResponse(result);

            }

            catch (error) {

                console.error(error);

                sendResponse({

                    success: false,

                    response: "Background Worker Error"

                });

            }

        })();

        return true;

    }
);

/**
 * ==========================================
 * Streaming Chat API
 * ==========================================
 */
chrome.runtime.onMessage.addListener(
    (message, sender) => {

        if (message.type !== ASK_AI_STREAM) {
            return;
        }

        (async () => {

            try {

                console.log("Collecting Browser Context...");

                const browserContext = await browserContextService.getBrowserContext();

                await streamChat(

                    message.prompt,

                    message.model ?? "llama3.2:3b",

                    browserContext,

                    (token: string) => {

                        chrome.runtime.sendMessage({

                            type: AI_STREAM,

                            token

                        });

                    }

                );

                chrome.runtime.sendMessage({

                    type: AI_STREAM_END

                });

            }

            catch (error) {

                console.error(error);

                chrome.runtime.sendMessage({

                    type: AI_STREAM_ERROR,

                    error: "Streaming Failed"

                });

            }

        })();

        return true;

    }
);

console.log("✅ Background Ready");