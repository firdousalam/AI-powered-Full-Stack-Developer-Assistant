/// <reference types="chrome" />

import {
    useEffect,
    useState,
    useCallback,
    useRef
} from "react";

import BrowserContextCard from "./components/BrowserContextCard";
import PromptInput from "./components/PromptInput";
import ChatWindow from "./components/ChatWindow";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage";

import type { ChatMessage } from "../types/chat.types";
import type { BrowserContext } from "../types/browserContext.types";

import browserContextService from "../services/browserContext.service";

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
     * Send Browser Context Toggle
     * ===========================
     */

    const [
        sendBrowserContext,
        setSendBrowserContext
    ] = useState(true);



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
     * Streaming Response
     * ===========================
     */

    const [
        streamingResponse,
        setStreamingResponse
    ] = useState("");



    /**
     * ===========================
     * Loading
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
     * AI Model
     * ===========================
     */

    const [
        model,
        setModel
    ] = useState("llama3.2:3b");



    /**
     * ===========================
     * Stream Reference
     * ===========================
     */

    const streamRef = useRef("");



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
     * Load Context Startup
     * ===========================
     */

    useEffect(() => {

        loadBrowserContext();

    }, [
        loadBrowserContext
    ]);



    /**
     * ===========================
     * Runtime Listener
     * ===========================
     */

    useEffect(() => {


        const listener = (
            message: any
        ) => {


            switch (message.type) {


                case AI_STREAM:


                    streamRef.current +=
                        message.token;


                    setStreamingResponse(
                        streamRef.current
                    );

                    break;



                case AI_STREAM_END:


                    setMessages(prev => [

                        ...prev,

                        {

                            id:
                                Date.now()
                                    .toString(),

                            role: "assistant",

                            content:
                                streamRef.current

                        }

                    ]);


                    streamRef.current = "";

                    setStreamingResponse("");

                    setLoading(false);


                    break;



                case AI_STREAM_ERROR:


                    streamRef.current = "";

                    setStreamingResponse("");

                    setLoading(false);


                    setError(
                        message.error ??
                        "Streaming failed."
                    );


                    break;


            }


        };



        chrome.runtime
            .onMessage
            .addListener(listener);



        return () => {

            chrome.runtime
                .onMessage
                .removeListener(listener);

        };


    }, []);




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

                id:
                    Date.now()
                        .toString(),

                role: "user",

                content: prompt

            }

        ]);



        chrome.runtime.sendMessage({

            type: ASK_AI_STREAM,

            prompt,

            model,


            /**
             * Send context only
             * when user enables it
             */

            browserContext:

                sendBrowserContext
                    ? browserContext
                    : null


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
     * Refresh Context
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


        <div

            className="popup-container"

            style={{

                minWidth: "400px",

                width: "400px",

                minHeight: "600px",

                padding: "12px",

                boxSizing: "border-box"

            }}

        >



            <header className="popup-header">


                <h2>

                    Zeba AI

                </h2>


            </header>




            {
                browserContext &&

                (

                    <BrowserContextCard

                        context={browserContext}

                    />

                )
            }





            {
                error &&

                (

                    <ErrorMessage

                        message={error}

                    />

                )
            }





            {
                loading &&

                (

                    <LoadingIndicator

                        message="AI is thinking..."

                    />

                )
            }





            <ChatWindow


                messages={messages}


                streamingMessage={
                    streamingResponse
                }


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





                <label

                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}

                >

                    <input

                        type="checkbox"

                        checked={
                            sendBrowserContext
                        }

                        onChange={e =>

                            setSendBrowserContext(
                                e.target.checked
                            )

                        }

                    />


                    Send Browser Context


                </label>






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