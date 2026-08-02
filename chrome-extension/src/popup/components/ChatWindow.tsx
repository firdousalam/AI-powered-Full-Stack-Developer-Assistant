import { useEffect, useRef } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ChatMessage } from "../../types/chat.types";


interface ChatWindowProps {

    messages: ChatMessage[];

    streamingMessage?: string;

    loading?: boolean;

}

export default function ChatWindow({

    messages,

    streamingMessage = "",

    loading = false

}: ChatWindowProps) {

    const bottomRef = useRef<HTMLDivElement>(null);

    /**
     * Auto Scroll
     */

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [

        messages,

        streamingMessage,

        loading

    ]);

    /**
     * Copy Code
     */

    const copyCode = async (

        code: string

    ) => {

        await navigator.clipboard.writeText(code);

    };

    return (

        <div

            className="chat-window"

            style={{

                height: "420px",

                overflowY: "auto",

                padding: 12,

                border: "1px solid #ddd",

                borderRadius: 8,

                background: "#fafafa"

            }}

        >

            {/* Previous Messages */}

            {

                messages.map(message => (

                    <div

                        key={message.id}

                        style={{

                            marginBottom: 20,

                            display: "flex",

                            justifyContent:

                                message.role === "user"

                                    ? "flex-end"

                                    : "flex-start"

                        }}

                    >

                        <div

                            style={{

                                maxWidth: "90%",

                                background:

                                    message.role === "user"

                                        ? "#2563eb"

                                        : "#ffffff",

                                color:

                                    message.role === "user"

                                        ? "#fff"

                                        : "#111",

                                padding: 12,

                                borderRadius: 12,

                                boxShadow:

                                    "0 2px 6px rgba(0,0,0,.08)"

                            }}

                        >

                            <ReactMarkdown

                                remarkPlugins={[remarkGfm]}

                                components={{

                                    code({

                                        inline,

                                        className,

                                        children,

                                        ...props

                                    }: any) {

                                        const match =

                                            /language-(\w+)/.exec(

                                                className || ""

                                            );

                                        const code =

                                            String(children).replace(

                                                /\n$/,

                                                ""

                                            );

                                        if (!inline && match) {

                                            return (

                                                <div

                                                    style={{

                                                        position: "relative"

                                                    }}

                                                >

                                                    <button

                                                        onClick={() =>

                                                            copyCode(code)

                                                        }

                                                        style={{

                                                            position: "absolute",

                                                            right: 10,

                                                            top: 10,

                                                            cursor: "pointer"

                                                        }}

                                                    >

                                                        Copy

                                                    </button>

                                                    <SyntaxHighlighter

                                                        style={oneDark}

                                                        language={match[1]}

                                                        PreTag="div"

                                                    >

                                                        {code}

                                                    </SyntaxHighlighter>

                                                </div>

                                            );

                                        }

                                        return (

                                            <code

                                                {...props}

                                                className={className}

                                            >

                                                {children}

                                            </code>

                                        );

                                    }

                                }}

                            >

                                {message.content}

                            </ReactMarkdown>

                        </div>

                    </div>

                ))

            }

            {/* Streaming Assistant */}

            {

                streamingMessage && (

                    <div

                        style={{

                            display: "flex",

                            justifyContent: "flex-start",

                            marginBottom: 20

                        }}

                    >

                        <div

                            style={{

                                maxWidth: "90%",

                                background: "#ffffff",

                                padding: 12,

                                borderRadius: 12,

                                boxShadow:

                                    "0 2px 6px rgba(0,0,0,.08)"

                            }}

                        >

                            <ReactMarkdown

                                remarkPlugins={[remarkGfm]}

                            >

                                {

                                    streamingMessage +

                                    "▋"

                                }

                            </ReactMarkdown>

                        </div>

                    </div>

                )

            }

            {/* Loading */}

            {

                loading &&

                !streamingMessage && (

                    <div

                        style={{

                            color: "#666",

                            fontStyle: "italic"

                        }}

                    >

                        AI is thinking...

                    </div>

                )

            }

            <div ref={bottomRef} />

        </div>

    );

}