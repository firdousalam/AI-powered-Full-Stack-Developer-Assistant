import { useEffect, useState } from "react";

import {
    ASK_AI_STREAM,
    AI_STREAM,
    AI_STREAM_END,
    AI_STREAM_ERROR
} from "../constants/message.types";

/**
 * Runtime message received from Background Service Worker
 */
interface RuntimeMessage {
    type: string;
    token?: string;
    error?: string;
}

function Popup() {

    const [prompt, setPrompt] = useState("");

    const [response, setResponse] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    /**
     * ============================================
     * Listen for Background Messages
     * ============================================
     */
    useEffect(() => {

        const listener = (
            message: RuntimeMessage,
            sender: chrome.runtime.MessageSender
        ) => {

            console.log("Popup Received:", message);
            console.log("Sender:", sender);

            switch (message.type) {

                case AI_STREAM:

                    if (message.token) {
                        setResponse(prev => prev + message.token);
                    }

                    break;

                case AI_STREAM_END:

                    console.log("Streaming Finished");

                    setLoading(false);

                    break;

                case AI_STREAM_ERROR:

                    console.error(message.error);

                    setLoading(false);

                    setError(message.error ?? "Unknown Error");

                    break;
            }
        };

        chrome.runtime.onMessage.addListener(listener);

        return () => {

            chrome.runtime.onMessage.removeListener(listener);

        };

    }, []);

    /**
     * ============================================
     * Send Prompt
     * ============================================
     */
    const sendPrompt = () => {

        if (!prompt.trim()) {

            setError("Please enter a prompt.");

            return;
        }

        setResponse("");

        setError("");

        setLoading(true);

        chrome.runtime.sendMessage(
            {
                type: ASK_AI_STREAM,
                prompt,
                model: "llama3.2:3b"
            },
            () => {

                if (chrome.runtime.lastError) {

                    console.error(
                        chrome.runtime.lastError.message
                    );

                    setLoading(false);

                    setError(chrome.runtime.lastError.message ?? "Unknown Error");
                }
            }
        );
    };

    /**
     * ============================================
     * UI
     * ============================================
     */
    return (

        <div
            style={{
                width: 420,
                padding: 20,
                fontFamily: "Arial"
            }}
        >

            <h2>🚀 DevPilot AI</h2>

            <textarea
                rows={6}
                style={{
                    width: "100%",
                    padding: 10,
                    resize: "vertical"
                }}
                placeholder="Ask anything..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <button
                onClick={sendPrompt}
                disabled={loading}
                style={{
                    width: "100%",
                    marginTop: 15,
                    padding: 10,
                    cursor: loading ? "not-allowed" : "pointer"
                }}
            >
                {loading ? "Thinking..." : "Ask AI"}
            </button>

            {loading && (

                <p
                    style={{
                        marginTop: 15,
                        color: "#1976d2"
                    }}
                >
                    🤖 AI is typing...
                </p>

            )}

            {error && (

                <p
                    style={{
                        color: "red",
                        marginTop: 15
                    }}
                >
                    {error}
                </p>

            )}

            <div
                style={{
                    marginTop: 20,
                    minHeight: 180,
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    padding: 12,
                    whiteSpace: "pre-wrap",
                    overflowY: "auto"
                }}
            >
                {response}
            </div>

        </div>

    );
}

export default Popup;