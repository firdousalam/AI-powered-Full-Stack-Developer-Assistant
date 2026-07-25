export const MENU_IDS = {

    ASK_AI: "ask-ai",

    EXPLAIN: "explain",

    SUMMARIZE: "summarize",

    TRANSLATE: "translate",

    REVIEW_CODE: "review-code"

};

export function createContextMenus() {

    console.log("Creating Context Menus");

    chrome.contextMenus.create({

        id: MENU_IDS.ASK_AI,

        title: "🤖 Ask DevPilot AI",

        contexts: ["selection"]

    });

    chrome.contextMenus.create({

        id: MENU_IDS.EXPLAIN,

        title: "Explain",

        contexts: ["selection"]

    });

    chrome.contextMenus.create({

        id: MENU_IDS.SUMMARIZE,

        title: "Summarize",

        contexts: ["selection"]

    });

    chrome.contextMenus.create({

        id: MENU_IDS.TRANSLATE,

        title: "Translate",

        contexts: ["selection"]

    });

    chrome.contextMenus.create({

        id: MENU_IDS.REVIEW_CODE,

        title: "Review Code",

        contexts: ["selection"]

    });

}