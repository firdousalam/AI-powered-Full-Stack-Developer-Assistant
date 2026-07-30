/// <reference types="chrome"/>
import { createContextMenus, MENU_IDS } from '../context-menu/contextMenu';
import { chatWithAI } from '../services/api.service'
import { streamChat } from '../services/api.stream';
console.log("✅ Background Worker Started");

// chrome.runtime.onInstalled.addListener(() => {
//     console.log("Extension Installed");
// });
chrome.runtime.onInstalled.addListener(() => {

    console.log("Extension Installed");

    createContextMenus();

});

// chrome.runtime.onMessage.addListener(
//     (message, sender, sendResponse) => {

//         console.log("Message Received");
//         console.log(sender);

//         console.log(message);

//         sendResponse({
//             success: true,
//             response: "Hello from Background Worker"
//         });

//         return true;
//     }
// );

// chrome.runtime.onMessage.addListener(

//     (message, sender, sendResponse) => {

//         console.log("Message Received from sender ", sender);

//         console.log(message);

//         sendResponse({

//             success: true,

//             response: "Hello from Background Worker"

//         });

//         return true;

//     }

// );

// chrome.runtime.onMessage.addListener(


//     async (message, sender, sendResponse) => {
//         console.log("sender", sender)
//         console.log("message", message)


//         switch (message.type) {

//             case "ASK_AI":

//                 const result =
//                     await chatWithAI(
//                         message.prompt,
//                         "llama3"
//                     );
//                 sendResponse(result);

//                 break;

//             case "PING":

//                 sendResponse({

//                     response: "PONG"

//                 });

//                 break;

//         }

//         return true;

//     });

// chrome.runtime.sendMessage(

//     onmessage,

//     (response) => {

//         if (chrome.runtime.lastError) {

//             console.error(

//                 chrome.runtime.lastError.message

//             );

//             return;

//         }

//         console.log(response);

//     }

// );

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        console.log("Sender:", sender);
        console.log("Message:", message);

        console.log(MENU_IDS)
        async function process() {
            console.log(MENU_IDS)
            async function processStream() {
                try {
                    await streamChat(message.prompt, "llama3.2:3b", (token) => {
                        chrome.runtime.sendMessage({ type: "AI_STREAM", token });
                    });
                    chrome.runtime.sendMessage({ type: "AI_STREAM_END" });
                } catch (error) {
                    console.error(error);
                    chrome.runtime.sendMessage({ type: "AI_STREAM_ERROR", error: "Streaming Failed" });
                }
            }

            switch (message.type) {

                case MENU_IDS.ASK_AI:

                    // const resultA = await chatWithAI(
                    //     message.prompt,
                    //     "llama3"
                    // );
                    // console.log(resultA)
                    // sendResponse(resultA);

                    // break;

                    processStream();
                    break;

                case MENU_IDS.SUMMARIZE:

                    const resultS = await chatWithAI(
                        message.prompt,
                        "llama3"
                    );
                    console.log(resultS)
                    sendResponse(resultS);

                    break;

                case MENU_IDS.TRANSLATE:

                    const resultT = await chatWithAI(
                        message.prompt,
                        "llama3"
                    );
                    console.log(resultT)
                    sendResponse(resultT);

                    break;

                case MENU_IDS.REVIEW_CODE:

                    const resultR = await chatWithAI(
                        message.prompt,
                        "llama3"
                    );
                    console.log(resultR)
                    sendResponse(resultR);

                    break;
                case MENU_IDS.EXPLAIN:

                    const resultE = await chatWithAI(
                        message.prompt,
                        "llama3"
                    );
                    console.log(resultE)
                    sendResponse(resultE);

                    break;

                case MENU_IDS.SELECTED_TEXT:

                    const result = await chatWithAI(
                        message.prompt,
                        "llama3"
                    );
                    console.log(result)
                    sendResponse(result);

                    break;

                default:

                    const resultD = await chatWithAI(
                        message.prompt,
                        "llama3"
                    );
                    console.log(resultD)
                    sendResponse(resultD);

                    break;
            }
        }

        process();

        // VERY IMPORTANT
        return true;
    }
);

console.log("✅ Background Worker Started");

// chrome.runtime.onMessage.addListener((message) => {

//     console.log("Message Received");

//     console.log(message);

// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {

//     console.log("================================");
//     console.log("Context Menu Clicked");
//     console.log("Menu ID:", info.menuItemId);
//     console.log("Selected Text:", info.selectionText);
//     console.log(info);
//     console.log("================================");
//     console.log("tab", tab)

// });

chrome.storage.onChanged.addListener(

    (changes) => {

        if (changes.theme) {

            console.log(

                changes.theme.newValue

            );

        }

    });


