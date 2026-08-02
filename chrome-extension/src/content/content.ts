/// <reference types="chrome"/>

import contextBuilderService from "../services/contextBuilder.service";

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        if (message.type !== "GET_BROWSER_CONTEXT") {
            console.log(sender)
            return;
        }

        try {

            const context =
                contextBuilderService.build(document);

            sendResponse(context);

        }
        catch (error) {

            console.error(error);

            sendResponse(null);

        }

        return true;
    }
);