import { useState } from "react";

function Popup() {

    const [response, setResponse] = useState("");

    const sendMessage = () => {

        chrome.runtime.sendMessage(
            {
                type: "ASK_AI",
                prompt: "Hello AI"
            },
            (res) => {

                console.log(res);

                setResponse(res.response);

            }
        );

    };

    return (

        <div className="p-5">

            <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Send Message
            </button>

            <p className="mt-5">
                {response}
            </p>

        </div>

    );

}

export default Popup;