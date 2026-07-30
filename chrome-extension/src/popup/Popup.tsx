import { useEffect, useState } from "react";

function Popup() {

    const [prompt, setPrompt] = useState("");

    const [response, setResponse] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        const listener = (message: any) => {

            switch (message.type) {

                case "AI_STREAM":

                    setResponse(prev => prev + message.token);

                    break;

                case "AI_STREAM_END":

                    setLoading(false);

                    break;

                case "AI_STREAM_ERROR":

                    setLoading(false);

                    setError(message.error);

                    break;

            }

        };

        chrome.runtime.onMessage.addListener(listener);

        return () => {

            chrome.runtime.onMessage.removeListener(listener);

        };

    }, []);

    const sendMessage = () => {

        setResponse("");

        setError("");

        setLoading(true);

        chrome.runtime.sendMessage({

            type: "ASK_AI",

            prompt

        });

    };

    return (

        <div className="p-5">

            <textarea

                rows={5}

                className="border w-full p-2"

                value={prompt}

                onChange={(e) => setPrompt(e.target.value)}

                placeholder="Ask anything..."

            />

            <button

                disabled={loading}

                onClick={sendMessage}

                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"

            >

                {loading ? "Thinking..." : "Ask AI"}

            </button>

            {

                error &&

                <p className="text-red-600 mt-3">

                    {error}

                </p>

            }

            <div className="mt-5 whitespace-pre-wrap">

                {response}

            </div>

        </div>

    );

}

export default Popup;