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

console.log("🚀 Background Service Worker Started");

/**
 * ==========================================
 * Normal Chat API
 * ==========================================
 */
chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        if (message.type !== ASK_AI) {
            console.log(sender)
            return;
        }

        (async () => {

            try {

                console.log("=================================");
                console.log("ASK_AI Received");
                console.log("Prompt :", message.prompt);
                console.log("Model  :", message.model);
                console.log("=================================");

                const result = await chatWithAI(
                    message.prompt,
                    message.model ?? "llama3.2:3b"
                );

                console.log("Backend Response:", result);

                sendResponse(result);

            } catch (error) {

                console.error("Chat Error:", error);

                sendResponse({
                    success: false,
                    response: "Backend Error"
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
            console.log(sender)
            return;
        }

        (async () => {

            try {

                console.log("=================================");
                console.log("STREAM REQUEST");
                console.log("Prompt :", message.prompt);
                console.log("Model  :", message.model);
                console.log("=================================");

                await streamChat(
                    message.prompt,
                    message.model ?? "llama3.2:3b",

                    (token: string) => {

                        console.log("TOKEN:", token);

                        chrome.runtime.sendMessage(
                            {
                                type: AI_STREAM,
                                token
                            },
                            () => {

                                if (chrome.runtime.lastError) {

                                    console.warn(
                                        "Popup not listening:",
                                        chrome.runtime.lastError.message
                                    );

                                }

                            }
                        );

                    }
                );

                chrome.runtime.sendMessage(
                    {
                        type: AI_STREAM_END
                    },
                    () => {

                        if (chrome.runtime.lastError) {

                            console.warn(
                                chrome.runtime.lastError.message
                            );

                        }

                    }
                );

            } catch (error) {

                console.error("Streaming Error:", error);

                chrome.runtime.sendMessage(
                    {
                        type: AI_STREAM_ERROR,
                        error: "Streaming Failed"
                    },
                    () => {

                        if (chrome.runtime.lastError) {

                            console.warn(
                                chrome.runtime.lastError.message
                            );

                        }

                    }
                );

            }

        })();

        return true;

    }
);

console.log("✅ Background Ready");