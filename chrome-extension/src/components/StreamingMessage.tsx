import {
    useRef,
    useEffect
} from "react";

import ReactMarkdown from "react-markdown";

interface Props {

    content: string;

    loading: boolean;

}

function StreamingMessage({

    content,

    loading

}: Props) {

    const bottomRef =

        useRef<HTMLDivElement>(null);

    /**
     * Auto-scroll while streaming.
     */
    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [content]);

    /**
     * Copy AI response.
     */
    const copyResponse = async () => {

        await navigator.clipboard.writeText(

            content

        );

    };

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 16,
                background: "#fafafa"
            }}
        >

            <ReactMarkdown>

                {content}

            </ReactMarkdown>

            {

                loading && (

                    <span
                        style={{
                            animation:
                                "blink 1s infinite",
                            fontWeight: "bold"
                        }}
                    >
                        ▋
                    </span>

                )

            }

            <div
                ref={bottomRef}
            />

            <button
                onClick={copyResponse}
                style={{
                    marginTop: 20
                }}
            >
                📋 Copy
            </button>

        </div>

    );

}

export default StreamingMessage;