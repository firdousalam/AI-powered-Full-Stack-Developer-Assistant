/// <reference types="chrome"/>
import { createContextMenus, MENU_IDS } from '../context-menu/contextMenu';
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



chrome.contextMenus.onClicked.addListener((info) => {

    const request = {

        action: info.menuItemId,

        text: info.selectionText

    };


    switch (info.menuItemId) {

        case MENU_IDS.ASK_AI:

            console.log("Ask AI");


            console.log(request);

            break;

        case MENU_IDS.EXPLAIN:

            console.log("Explain");


            console.log(request);

            chrome.notifications.create({

                type: "basic",

                iconUrl: "icons/icon.png",

                title: "DevPilot AI",

                message: "Request received"

            });

            break;

        case MENU_IDS.SUMMARIZE:

            console.log("Summarize");
            console.log(request);

            break;

        case MENU_IDS.TRANSLATE:

            console.log("Translate");

            console.log(request);

            break;

        case MENU_IDS.REVIEW_CODE:

            console.log("Review Code");

            console.log(request);

            break;

    }

});

console.log("✅ Background Worker Started");

// chrome.runtime.onMessage.addListener((message) => {

//     console.log("Message Received");

//     console.log(message);

// });

chrome.contextMenus.onClicked.addListener((info, tab) => {

    console.log("================================");
    console.log("Context Menu Clicked");
    console.log("Menu ID:", info.menuItemId);
    console.log("Selected Text:", info.selectionText);
    console.log(info);
    console.log("================================");
    console.log("tab", tab)

});