/// <reference types="chrome" />

import { useEffect, useState, useCallback } from "react";

import BrowserContextCard from "./components/BrowserContextCard";
import PromptInput from "./components/PromptInput";
import ChatWindow from "./components/ChatWindow";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage";
import type { ChatMessage } from "../types/chat.types";

import browserContextService from "../services/browserContext.service";

import type { BrowserContext } from "../types/browserContext.types";

import {
    ASK_AI_STREAM,
    AI_STREAM,
    AI_STREAM_END,
    AI_STREAM_ERROR
} from "../constants/message.types";



export default function Popup() {

    /**
     * ===========================
     * Browser Context
     * ===========================
     */

    const [

        browserContext,

        setBrowserContext

    ] = useState<BrowserContext | null>(null);

    /**
     * ===========================
     * Chat Messages
     * ===========================
     */

    const [

        messages,

        setMessages

    ] = useState<ChatMessage[]>([]);

    /**
     * ===========================
     * Current Streaming Response
     * ===========================
     */

    const [

        streamingResponse,

        setStreamingResponse

    ] = useState("");

    /**
     * ===========================
     * Loading State
     * ===========================
     */

    const [

        loading,

        setLoading

    ] = useState(false);

    /**
     * ===========================
     * Error
     * ===========================
     */

    const [

        error,

        setError

    ] = useState("");

    /**
     * ===========================
     * Selected AI Model
     * ===========================
     */

    const [

        model,

        setModel

    ] = useState("llama3.2:3b");

    /**
     * ===========================
     * Load Browser Context
     * ===========================
     */

    const loadBrowserContext = useCallback(

        async () => {

            try {

                const context =

                    await browserContextService
                        .getBrowserContext();

                setBrowserContext(context);

            }

            catch (err) {

                console.error(err);

                setError(

                    "Unable to load browser context."

                );

            }

        },

        []

    );

    /**
     * ===========================
     * Load Context on Startup
     * ===========================
     */

    useEffect(() => {

        loadBrowserContext();

    }, [loadBrowserContext]);

    /**
     * ==================================
     * Runtime Listener
     * ==================================
     */

    useEffect(() => {

        const listener = (

            message: any

        ) => {

            switch (message.type) {

                case AI_STREAM:

                    setStreamingResponse(

                        previous =>

                            previous + message.token

                    );

                    break;

                case AI_STREAM_END:

                    setMessages(previous => [

                        ...previous,

                        {

                            id: Date.now().toString(),

                            role: "assistant",

                            content: streamingResponse

                        }

                    ]);

                    setStreamingResponse("");

                    setLoading(false);

                    break;

                case AI_STREAM_ERROR:

                    setLoading(false);

                    setError(

                        message.error ??

                        "Streaming failed."

                    );

                    break;
            }
        };

        chrome.runtime.onMessage.addListener(listener);

        return () => {

            chrome.runtime.onMessage.removeListener(listener);

        };

    }, [streamingResponse]);

    /**
     * ===========================
     * Send Prompt
     * ===========================
     */

    const handleSendPrompt = (

        prompt: string

    ) => {

        if (!prompt.trim()) {

            return;

        }

        setError("");

        setLoading(true);

        setStreamingResponse("");

        setMessages(previous => [

            ...previous,

            {

                id: Date.now().toString(),

                role: "user",

                content: prompt

            }

        ]);

        chrome.runtime.sendMessage({

            type: ASK_AI_STREAM,

            prompt,

            model

        });

    };

    /**
     * ===========================
     * Clear Chat
     * ===========================
     */

    const clearChat = () => {

        setMessages([]);

        setStreamingResponse("");

        setError("");

    };

    /**
     * ===========================
     * Refresh Browser Context
     * ===========================
     */

    const refreshContext = async () => {

        await loadBrowserContext();

    };

    /**
     * ===========================
     * Render
     * ===========================
     */

    return (

        <div className="popup-container" style={{
            minWidth: "400px",
            width: "400px",
            minHeight: "600px",
            padding: "12px",
            boxSizing: "border-box"
        }}>

            <header className="popup-header">

                <h2>

                    Zeba AI

                </h2>

            </header>

            {

                browserContext && (

                    <BrowserContextCard

                        context={browserContext}

                    />

                )

            }

            {

                error && (

                    <ErrorMessage

                        message={error}

                    />

                )

            }

            {

                loading && (

                    <LoadingIndicator

                        message="AI is thinking..."

                    />

                )

            }

            <ChatWindow

                messages={messages}

                streamingMessage={streamingResponse}

            />

            <PromptInput

                onSubmit={handleSendPrompt}

                loading={loading}

            />

            <footer

                className="popup-footer"

            >

                <button

                    onClick={refreshContext}

                >

                    Refresh Context

                </button>

                <button

                    onClick={clearChat}

                >

                    Clear Chat

                </button>

                <select

                    value={model}

                    onChange={e =>

                        setModel(

                            e.target.value

                        )

                    }

                >

                    <option>

                        llama3.2:3b

                    </option>

                    <option>

                        qwen3:4b

                    </option>

                    <option>

                        mistral

                    </option>

                </select>

            </footer>

        </div>

    );

}