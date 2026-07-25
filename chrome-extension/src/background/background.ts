/// <reference types="chrome"/>

console.log("✅ Background Worker Started");

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});

chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        console.log("Message Received");
        console.log(sender);

        console.log(message);

        sendResponse({
            success: true,
            response: "Hello from Background Worker"
        });

        return true;
    }
);