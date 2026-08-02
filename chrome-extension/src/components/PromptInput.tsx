import { useState } from "react";

interface PromptInputProps {

    loading: boolean;

    onSubmit: (prompt: string) => void;

}

function PromptInput({

    loading,

    onSubmit

}: PromptInputProps) {

    const [prompt, setPrompt] = useState("");

    const handleSubmit = () => {

        if (!prompt.trim()) {

            return;

        }

        onSubmit(prompt);

        setPrompt("");

    };

    const handleChange = (

        event: React.ChangeEvent<HTMLTextAreaElement>

    ) => {

        setPrompt(event.target.value);

        event.target.style.height = "auto";

        event.target.style.height =

            `${event.target.scrollHeight}px`;

    };

    const handleKeyDown = (

        event: React.KeyboardEvent<HTMLTextAreaElement>

    ) => {

        if (

            event.key === "Enter" &&

            !event.shiftKey

        ) {

            event.preventDefault();

            handleSubmit();

        }

    };

    return (

        <div>

            <textarea

                rows={3}

                placeholder="Ask DevPilot AI..."

                value={prompt}

                disabled={loading}

                onChange={handleChange}

                onKeyDown={handleKeyDown}

                style={{

                    width: "100%",

                    resize: "none",

                    overflow: "hidden",

                    padding: 10,

                    borderRadius: 6,

                    border: "1px solid #ccc",

                    fontSize: 14

                }}

            />

            <button

                onClick={handleSubmit}

                disabled={loading}

                style={{

                    marginTop: 12,

                    width: "100%",

                    padding: 10,

                    borderRadius: 6,

                    cursor: loading

                        ? "not-allowed"

                        : "pointer"

                }}

            >

                {

                    loading

                        ? "Thinking..."

                        : "Ask AI"

                }

            </button>

        </div>

    );

}

export default PromptInput;