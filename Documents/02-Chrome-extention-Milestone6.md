# Milestone 6 – Context Menu

# 🎥 YouTube Episode 2.6

**Project:** Zeba AI – AI Full Stack Developer Assistant

**Chapter:** Chrome Extension Development (Manifest V3)

**Milestone:** Context Menu

---

# 📖 Chapter Overview

In this milestone, we will implement one of the most useful features of any developer-focused Chrome Extension: the **Chrome Context Menu API**.

Instead of opening the extension popup every time, users can simply **right-click on selected text** and send it directly to Zeba AI.

This feature provides a native browser experience and lays the foundation for future AI capabilities such as:

- Explain Code
- Review Code
- Translate Text
- Summarize Documentation
- Ask AI

By the end of this milestone, the Context Menu will communicate with the Background Service Worker and prepare the extension for backend integration.

---

# 🎯 Learning Objectives

After completing this milestone, you will understand:

- Chrome Context Menu API
- Manifest V3 Context Menus
- Background Service Workers
- Runtime Events
- Selected Text Handling
- Context Menu Click Events
- Message Passing
- Chrome Notifications (Preview)
- Extension Architecture

---

# 🏗 System Architecture

```
User

↓

Highlight Text

↓

Right Click

↓

Chrome Context Menu

↓

Background Service Worker

↓

Popup (Later)

↓

Node Backend (Later)

↓

AI Router (Later)

↓

Ollama / Gemini / OpenAI (Later)
```

---

# 🧩 What is a Context Menu?

The Context Menu is the menu displayed when users right-click on a webpage.

Example

```
Copy

Paste

Search Google

-------------------

Ask Zeba AI

Explain

Summarize

Translate

Review Code
```

Instead of copying text into ChatGPT manually, users can send it directly to Zeba AI.

---

# 📂 Folder Structure

```
chrome-extension/

src/

├── background/
│      background.ts
│
├── context-menu/
│      contextMenu.ts
│
├── popup/
│
├── content/
│
├── services/
│
└── utils/
```

---

# Why Create a Separate Context Menu Folder?

Although the Context Menu is registered from the Background Worker, placing its logic in a separate module keeps the project clean.

Responsibilities

background/

- Extension startup
- Runtime messages
- Notifications
- Authentication
- Event listeners

context-menu/

- Menu creation
- Menu click handling
- Menu configuration

This follows the Single Responsibility Principle.

---

# Step 1 – Create Folder

Create

```
src/context-menu/
```

Inside it create

```
contextMenu.ts
```

---

# Step 2 – Define Menu IDs

Create constants.

```ts
export const MENU_IDS = {

    ASK_AI: "ask-ai",

    EXPLAIN: "explain",

    SUMMARIZE: "summarize",

    TRANSLATE: "translate",

    REVIEW_CODE: "review-code"

};
```

Why?

Instead of writing strings everywhere, we use constants.

Bad

```ts
if(menuId==="ask-ai")
```

Good

```ts
if(menuId===MENU_IDS.ASK_AI)
```

---

# Step 3 – Create Context Menu Function

```ts
export function createContextMenus() {

    console.log("Creating Context Menus");

}
```

Nothing else yet.

---

# Step 4 – Register Menus

Inside

```ts
createContextMenus();
```

Add

```ts
chrome.contextMenus.create({

    id: MENU_IDS.ASK_AI,

    title: "🤖 Ask Zeba AI",

    contexts: ["selection"]

});
```

Explanation

| Property | Purpose |
|-----------|----------|
| id | Unique identifier |
| title | Menu label |
| contexts | Show only when text is selected |

---

# Step 5 – Add Remaining Menus

```ts
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
```

---

# Expected Result

Right Click

↓

```
Ask Zeba AI

Explain

Summarize

Translate

Review Code
```

---

# Step 6 – Import into Background Worker

Open

```
src/background/background.ts
```

Import

```ts
import { createContextMenus } from "../context-menu/contextMenu";
```

---

# Step 7 – Create Menus on Installation

```ts
chrome.runtime.onInstalled.addListener(() => {

    console.log("Extension Installed");

    createContextMenus();

});
```

Why?

Menus should only be created once when the extension is installed or updated.

---

# Step 8 – Reload Extension

Go to

```
chrome://extensions
```

Reload the extension.

Open

```
google.com
```

Highlight text.

Right click.

Expected

```
Ask Zeba AI

Explain

Summarize

Translate

Review Code
```

---

# Step 9 – Handle Menu Clicks

Inside

```
background.ts
```

```ts
chrome.contextMenus.onClicked.addListener((info, tab) => {

    console.log(info);

});
```

Now click

```
Explain
```

Console

```
info.menuItemId

↓

"explain"
```

---

# Step 10 – Read Selected Text

```ts
chrome.contextMenus.onClicked.addListener((info) => {

    console.log(info.selectionText);

});
```

Example

Selected

```
Docker Compose
```

Console

```
Docker Compose
```

---

# Step 11 – Determine Which Menu Was Clicked

```ts
chrome.contextMenus.onClicked.addListener((info) => {

    switch(info.menuItemId){

        case "ask-ai":

            console.log("Ask AI");

            break;

        case "explain":

            console.log("Explain");

            break;

        case "summarize":

            console.log("Summarize");

            break;

        case "translate":

            console.log("Translate");

            break;

        case "review-code":

            console.log("Review Code");

            break;

    }

});
```

---

# Better Version

Use constants.

```ts
switch(info.menuItemId){

case MENU_IDS.ASK_AI:

...

}
```

---

# Step 12 – Prepare Runtime Message

Instead of logging.

Create

```ts
const request={

    action:info.menuItemId,

    text:info.selectionText

};

console.log(request);
```

Output

```json
{
    "action":"summarize",
    "text":"Kubernetes Deployment"
}
```

This request will later be sent to the backend.

---

# Step 13 – Future Backend Flow

```
Context Menu

↓

Background Worker

↓

Node Backend

↓

AI Router

↓

Ollama

↓

Response

↓

Popup
```

Nothing to implement yet.

Only understand the architecture.

---

# Step 14 – Optional Notification

Show a Chrome notification.

```ts
chrome.notifications.create({

    type:"basic",

    iconUrl:"icons/icon-128.png",

    title:"Zeba AI",

    message:"Request received"

});
```

Expected

```
Zeba AI

Request received
```

---

# Step 15 – Test Cases

## Test 1

Open

```
google.com
```

Highlight

```
Artificial Intelligence
```

Right Click

↓

Explain

Console

```
Explain

Artificial Intelligence
```

---

## Test 2

Open

```
github.com
```

Select code.

Click

```
Review Code
```

Console

```
Review Code

const app=express()
```

---

## Test 3

Open

```
stackoverflow.com
```

Select an answer.

Click

```
Summarize
```

Console

Displays selected text.

---

# Common Issues

## Context Menu Doesn't Appear

Possible Causes

- Missing permission

Manifest must include

```json
"permissions":[
    "contextMenus"
]
```

---

## Nothing Happens

Reload extension.

Chrome only updates context menus after reload.

---

## Selected Text Undefined

Use

```
contexts:["selection"]
```

instead of

```
contexts:["page"]
```

---

## Duplicate Menus

Before creating menus.

```ts
chrome.contextMenus.removeAll(()=>{
    createContextMenus();
});
```

This avoids duplicate entries during development.

---

# Folder Structure After Milestone 6

```
chrome-extension/

src/

├── popup/

├── background/
│      background.ts

├── content/
│      content.ts

├── context-menu/
│      contextMenu.ts

├── services/

├── hooks/

├── store/

├── utils/

└── assets/
```

---

# Deliverables

By the end of this milestone you will have:

- ✅ Context Menu API
- ✅ Right Click Menu
- ✅ Selected Text Reader
- ✅ Background Worker Integration
- ✅ Runtime Events
- ✅ Developer Workflow

---

# Git Commit

```bash
git add .

git commit -m "feat(extension): implement context menu"

git push origin develop
```

---

# Preview of Milestone 7

In the next milestone, we will build the **Zeba AI Side Panel**, which will become the primary workspace for long AI conversations.

Features include:

- AI Chat
- Chat History
- Prompt Library
- Bookmarks
- Favorites
- Model Selector
- Settings

The Side Panel will eventually connect to the Node.js backend and support conversations with Ollama, MCP servers, GitHub repositories, PDFs, and websites.