import { useState } from "react";

import { useStorage } from "../hooks/useStorage";

import { STORAGE_KEYS } from "../types/storage.types";
import { saveData } from "../services/storage.service";

function Popup() {

    const theme = useStorage(STORAGE_KEYS.THEME) as string;

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

            <p className="mb-5">

                Theme :
                <strong>
                    {" "}
                    {theme || "Not Set"}
                </strong>

            </p>

            <button

                onClick={sendMessage}

                className="bg-blue-600 text-white px-4 py-2 rounded"

            >

                Send Message

            </button>

            <p className="mt-5">

                {response}

            </p>

            <button

                onClick={async () => {

                    await saveData(

                        STORAGE_KEYS.THEME,

                        "dark"

                    );

                }}

            >

                Save Dark Theme

            </button>

            <button

                onClick={async () => {
                    console.log(STORAGE_KEYS.THEME, "light")
                    await saveData(

                        STORAGE_KEYS.THEME,

                        "light"

                    )

                }}

            >

                Light Mode

            </button>

        </div>

    );

}

export default Popup;