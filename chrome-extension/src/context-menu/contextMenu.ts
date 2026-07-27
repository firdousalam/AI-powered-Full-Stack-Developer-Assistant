export const MENU_IDS = {

    ASK_AI: "ASK_AI",

    EXPLAIN: "EXPLAIN",

    SUMMARIZE: "SUMMARIZE",

    TRANSLATE: "TRANSLATE",

    REVIEW_CODE: "REVIEW_CODE",

    SELECTED_TEXT: "SELECTED_TEXT"

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