# Milestone 5 – Content Script
## Episode 2.5 – Inject UI into Web Pages

---

# 🎯 Objective

In this milestone, we will build the **Content Script** for the DevPilot AI Chrome Extension.

The Content Script is responsible for injecting JavaScript into web pages, allowing the extension to interact with the page's content.

By the end of this milestone, you will have:

- A floating **🤖 Ask AI** button on supported websites.
- Ability to read selected text.
- Runtime messaging between the Content Script and Background Worker.
- Foundation for Website Chat, Code Review, OCR, and AI Assistant features.

---

# 📚 Learning Objectives

After completing this milestone, you will understand:

- What is a Content Script?
- How Chrome injects scripts into web pages
- Manifest V3 Content Scripts
- DOM Manipulation
- Runtime Messaging
- Reading Selected Text
- Injecting Custom UI
- Event Handling
- Preventing Duplicate Injection

---

# 🏗 Architecture


Chrome Browser

↓

Website (Google / GitHub / StackOverflow)

↓

Content Script

↓

Floating AI Button

↓

Read Selected Text

↓

Background Worker

↓

Backend (Later)


---

# 📂 Folder Structure


chrome-extension/

src/

├── content/
│ └── content.ts


---

# Step 1 – Create Content Script

Create


src/content/content.ts


Add:

```ts
console.log("✅ DevPilot Content Script Loaded");
Verify

Open

https://google.com

Press

F12

Open

Console

Expected

✅ DevPilot Content Script Loaded
Step 2 – Create Helper Function

Add

function getSelectedText(): string {
    return window.getSelection()?.toString() || "";
}

Purpose

This helper returns the currently selected text from the webpage.

Example

Selected text

Artificial Intelligence

Returns

Artificial Intelligence
Step 3 – Create Floating Button

Create the button.

const button = document.createElement("button");

button.innerText = "🤖 Ask AI";
Step 4 – Style the Button
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";

button.style.padding = "12px 18px";

button.style.background = "#2563eb";
button.style.color = "#ffffff";

button.style.border = "none";
button.style.borderRadius = "10px";

button.style.cursor = "pointer";

button.style.zIndex = "999999";

Result


                     🤖 Ask AI


Always visible at the bottom-right corner.

Step 5 – Prevent Duplicate Buttons

Before adding the button to the page:

if (!document.getElementById("devpilot-floating-button")) {

    button.id = "devpilot-floating-button";

    document.body.appendChild(button);

}

Purpose

Some websites dynamically reload their DOM (for example, GitHub).

Without this check, multiple floating buttons could be added.

Step 6 – Handle Button Click
button.addEventListener("click", () => {

    console.log("Button Clicked");

});

Verify

Open Console

Click the button

Expected

Button Clicked
Step 7 – Read Selected Text

Update the click handler.

button.addEventListener("click", () => {

    const text = getSelectedText();

    console.log(text);

});
Verify

Select

Artificial Intelligence

Click

🤖 Ask AI

Console

Artificial Intelligence
Step 8 – Handle Empty Selection

Improve the click handler.

button.addEventListener("click", () => {

    const text = getSelectedText();

    if (!text) {

        alert("Please select some text.");

        return;

    }

    console.log(text);

});

Expected

If no text is selected:

Please select some text.
Step 9 – Display Selected Text

Instead of logging, display the selected text.

alert(getSelectedText());

Result

Selected Text

Artificial Intelligence
Step 10 – Send Runtime Message

Instead of alerting, send the selected text to the Background Worker.

chrome.runtime.sendMessage({

    type: "SELECTED_TEXT",

    text: getSelectedText()

});

Purpose

This prepares the extension for backend integration.

Step 11 – Update Background Worker

Open


src/background/background.ts


Add

console.log("✅ Background Worker Started");

chrome.runtime.onMessage.addListener((message) => {

    console.log("Message Received");

    console.log(message);

});

Expected

Message Received

{
    type: "SELECTED_TEXT",
    text: "Docker Compose"
}
Step 12 – Hover Animation
button.addEventListener("mouseenter", () => {

    button.style.transform = "scale(1.1)";

});
button.addEventListener("mouseleave", () => {

    button.style.transform = "scale(1)";

});

Result

The floating button slightly enlarges on hover.

Step 13 – Test on Multiple Websites

Verify on

✅ Google
✅ GitHub
✅ Stack Overflow

Check

Content Script loads
Floating button appears
Text selection works
Runtime message is sent
No JavaScript errors
Expected Workflow

Open Website

↓

Content Script Injected

↓

Floating Button Appears

↓

Select Text

↓

Click 🤖 Ask AI

↓

Read Selected Text

↓

Background Worker Receives Message

↓

Ready for Backend Integration

Troubleshooting
Floating Button Does Not Appear

Possible causes

Content Script not injected
Manifest error
Extension not reloaded
Wrong matches pattern

Solution

Reload the extension

chrome://extensions

Refresh the webpage.

Console Log Missing

Verify

F12

↓

Console

Expected

✅ DevPilot Content Script Loaded

If missing

Check manifest.json
Ensure content.ts is bundled correctly
Reload the extension
Selected Text Empty

Ensure you actually highlight text before clicking the button.

Runtime Message Not Received

Check

chrome://extensions

↓

Inspect

Service Worker

Verify

Message Received

appears in the Service Worker console.

Folder Structure After Milestone 5

chrome-extension/

src/

├── popup/

├── background/
│   └── background.ts

├── content/
│   └── content.ts

├── services/

├── hooks/

├── store/

├── utils/

└── assets/

Deliverables

By the end of this milestone you will have:

✅ Content Script
✅ Floating AI Button
✅ Selected Text Reader
✅ Runtime Messaging
✅ Background Worker Communication
✅ Website Integration
Git Commit
git add .

git commit -m "feat(extension): implement content script"

git push origin develop
What's Next?

In Milestone 6, we will implement the Context Menu API.

New features include:

Ask DevPilot AI
Explain Code
Explain Selected Text
Translate
Review Code

The Context Menu will communicate with the Background Worker and prepare the extension for AI-powered actions.


This document fits the same enterprise-style structure as your previous milestones and is ready to be added to your repository as:

```text
Learning-Doc/
└── Chapter-02-Chrome-Extension/
    └── 02.5-Content-Script.md