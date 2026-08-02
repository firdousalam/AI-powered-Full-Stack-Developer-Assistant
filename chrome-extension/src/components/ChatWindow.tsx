import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export interface ChatMessage {

    id: string;

    role: "user" | "assistant";

    content: string;

}

interface ChatWindowProps {

    messages: ChatMessage[];

    loading: boolean;

}

function ChatWindow({

    messages,

    loading

}: ChatWindowProps) {

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);

    const copyToClipboard = async (

        text: string

    ) => {

        try {

            await navigator.clipboard.writeText(text);

            alert("Copied!");

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div

            style={{

                border: "1px solid #ddd",

                borderRadius: 8,

                padding: 15,

                height: 450,

                overflowY: "auto",

                background: "#fafafa"

            }}

        >

            {

                messages.map(message => (

                    <div

                        key={message.id}

                        style={{

                            marginBottom: 20,

                            display: "flex",

                            flexDirection: "column",

                            alignItems:

                                message.role === "user"

                                    ? "flex-end"

                                    : "flex-start"

                        }}

                    >

                        <div

                            style={{

                                maxWidth: "85%",

                                background:

                                    message.role === "user"

                                        ? "#1976d2"

                                        : "#ffffff",

                                color:

                                    message.role === "user"

                                        ? "#fff"

                                        : "#222",

                                padding: 12,

                                borderRadius: 8,

                                boxShadow:

                                    "0 1px 4px rgba(0,0,0,.1)"

                            }}

                        >

                            <ReactMarkdown>

                                {message.content}

                            </ReactMarkdown>

                        </div>

                        {

                            message.role === "assistant" && (

                                <button

                                    style={{

                                        marginTop: 6,

                                        fontSize: 12,

                                        cursor: "pointer"

                                    }}

                                    onClick={() =>

                                        copyToClipboard(

                                            message.content

                                        )

                                    }

                                >

                                    📋 Copy

                                </button>

                            )

                        }

                    </div>

                ))

            }

            {

                loading && (

                    <div

                        style={{

                            color: "#1976d2",

                            fontStyle: "italic"

                        }}

                    >

                        🤖 AI is typing...

                    </div>

                )

            }

            <div ref={bottomRef} />

        </div>

    );

}

export default ChatWindow;