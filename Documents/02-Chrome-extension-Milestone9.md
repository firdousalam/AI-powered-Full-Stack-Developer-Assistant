# Chapter 2 – Milestone 9: Runtime Messaging

# 🎥 YouTube Episode 2.9

## Project

**AI-powered Full Stack Developer Assistant**

---

# Objective

In this milestone, we will implement **Runtime Messaging**, which is one of the most important concepts in Chrome Extension development.

A Chrome Extension consists of multiple isolated parts:

- Popup
- Background Service Worker
- Content Script
- Side Panel

These components **cannot directly call each other's functions** because they run in different execution contexts.

To communicate, Chrome provides the **Runtime Messaging API**.

By the end of this milestone, the following communication flow will work:

```
Popup

↓

Background Worker

↓

Content Script

↓

Popup
```

No backend is used in this milestone.

The Background Worker will return **mock responses**.

---

# Learning Objectives

By the end of this milestone you will understand:

- chrome.runtime.sendMessage()
- chrome.runtime.onMessage()
- Message Types
- Async Responses
- Popup ↔ Background Communication
- Background ↔ Content Script Communication
- Message Architecture
- Best Practices

---

# Runtime Messaging Architecture

```
                Chrome Extension

        ┌──────────────────────────┐
        │        Popup UI          │
        └─────────────┬────────────┘
                      │
          chrome.runtime.sendMessage()
                      │
                      ▼
        ┌──────────────────────────┐
        │ Background ServiceWorker │
        └─────────────┬────────────┘
                      │
             chrome.tabs.sendMessage()
                      │
                      ▼
        ┌──────────────────────────┐
        │     Content Script       │
        └─────────────┬────────────┘
                      │
              sendResponse()
                      │
                      ▼
                 Popup Updates
```

---

# Why Runtime Messaging?

Suppose a user clicks **Ask AI**.

The popup cannot directly access:

- Browser Tabs
- Context Menus
- Notifications
- Network APIs

Instead it sends a request to the Background Worker.

The Background Worker performs the work and returns the response.

---

# Folder Structure

```
chrome-extension/

src/

├── popup/
│     Popup.tsx
│
├── background/
│     background.ts
│
├── content/
│     content.ts
│
├── constants/
│
├── services/
│
├── hooks/
│
├── utils/
│
└── assets/
```

---

# Message Flow

```
User Clicks

↓

Popup

↓

chrome.runtime.sendMessage()

↓

Background Worker

↓

Mock AI Response

↓

Popup Updates UI
```

---

# Step 1 – Popup Sends a Message

File

```
src/popup/Popup.tsx
```

Example

```tsx
const sendMessage = () => {

    chrome.runtime.sendMessage(

        {

            type: "ASK_AI",

            prompt: "Explain Docker"

        },

        (response) => {

            console.log(response);

        }

    );

};
```

Explanation

Popup sends an object to the Background Worker.

The object contains:

- Message Type
- Prompt

---

# Step 2 – Message Object

Instead of sending plain strings,

always send structured objects.

Example

```ts
{

    type: "ASK_AI",

    prompt: "Explain Docker"

}
```

Benefits

- Easy to Extend
- Easy to Debug
- Cleaner Code

---

# Step 3 – Listen for Messages

File

```
src/background/background.ts
```

```ts
chrome.runtime.onMessage.addListener(

    (message, sender, sendResponse) => {

        console.log("Message Received");

        console.log(message);

        sendResponse({

            success: true,

            response: "Hello from Background Worker"

        });

        return true;

    }

);
```

---

# Step 4 – Verify Background Worker

Open

```
chrome://extensions
```

↓

Inspect

↓

Service Worker

Console

Expected

```
Message Received

{

type:"ASK_AI",

prompt:"Explain Docker"

}
```

---

# Step 5 – Receive Response in Popup

Update Popup

```tsx
chrome.runtime.sendMessage(

{

type:"ASK_AI",

prompt:"Explain Docker"

},

(response)=>{

console.log(response);

}

);
```

Expected

```
{

success:true,

response:"Hello from Background Worker"

}
```

---

# Step 6 – Display Response

Create state

```tsx
const [response,setResponse]=useState("");
```

Update

```tsx
chrome.runtime.sendMessage(

message,

(res)=>{

setResponse(res.response);

}

);
```

Display

```tsx
<p>

{response}

</p>
```

Popup

```
Hello from Background Worker
```

---

# Step 7 – Add Message Types

Avoid hardcoded strings.

Create

```
src/constants/message.constants.ts
```

```ts
export const MESSAGE_TYPES={

ASK_AI:"ASK_AI",

SELECTED_TEXT:"SELECTED_TEXT",

PING:"PING"

};
```

Use

```ts
MESSAGE_TYPES.ASK_AI
```

instead of

```ts
"ASK_AI"
```

---

# Step 8 – Handle Multiple Messages

Background

```ts
chrome.runtime.onMessage.addListener(

(message,sender,sendResponse)=>{

switch(message.type){

case "ASK_AI":

sendResponse({

response:"Mock AI Response"

});

break;

case "PING":

sendResponse({

response:"PONG"

});

break;

}

return true;

});
```

---

# Step 9 – Send Selected Text from Content Script

File

```
src/content/content.ts
```

```ts
const selectedText=window.getSelection()?.toString();

chrome.runtime.sendMessage({

type:"SELECTED_TEXT",

text:selectedText

});
```

---

# Step 10 – Background Receives Content Script Message

```ts
chrome.runtime.onMessage.addListener(

(message)=>{

console.log(message);

});
```

Console

```
{

type:"SELECTED_TEXT",

text:"Docker Compose"

}
```

---

# Step 11 – Background Sends Message to Content Script

Sometimes the Background Worker needs to communicate back to the Content Script.

```ts
chrome.tabs.sendMessage(

tab.id!,

{

type:"SHOW_MESSAGE",

text:"Hello Content Script"

}

);
```

This sends a message to the currently active browser tab.

---

# Step 12 – Content Script Receives Message

```ts
chrome.runtime.onMessage.addListener(

(message)=>{

console.log(

"Content Script Received",

message

);

});
```

Console

```
Content Script Received

{

type:"SHOW_MESSAGE",

text:"Hello Content Script"

}
```

---

# Step 13 – End-to-End Communication

Complete flow

```
Popup

↓

Background

↓

Content Script

↓

Background

↓

Popup
```

Current Result

Popup

↓

Background

↓

Mock Response

↓

Popup

Backend integration will be added in Chapter 3.

---

# Step 14 – Handle Runtime Errors

Sometimes the Background Worker is inactive.

Always check

```tsx
chrome.runtime.sendMessage(

message,

(response)=>{

if(chrome.runtime.lastError){

console.error(

chrome.runtime.lastError.message

);

return;

}

console.log(response);

}

);
```

Common Error

```
Could not establish connection.

Receiving end does not exist.
```

Solution

- Reload Extension
- Reload Website
- Ensure Background Worker is running

---

# Step 15 – Verify Communication

Open

```
chrome://extensions
```

↓

Inspect Popup

↓

Click

```
Send Message
```

Popup Console

```
{

success:true,

response:"Hello from Background Worker"

}
```

Service Worker Console

```
Message Received

{

type:"ASK_AI",

prompt:"Explain Docker"

}
```

---

# Step 16 – Test Content Script

Open

```
google.com
```

Highlight

```
Artificial Intelligence
```

Click

```
🤖 Ask AI
```

Background Console

```
{

type:"SELECTED_TEXT",

text:"Artificial Intelligence"

}
```

---

# Step 17 – Test Multiple Message Types

Send

```ts
{

type:"PING"

}
```

Response

```
PONG
```

Send

```ts
{

type:"ASK_AI"

}
```

Response

```
Mock AI Response
```

---

# Step 18 – Common Issues

## Receiving End Does Not Exist

Error

```
Unchecked runtime.lastError

Could not establish connection.

Receiving end does not exist.
```

Solution

- Reload Extension
- Reload Current Tab
- Verify Background Worker

---

## Undefined Response

Wrong

```ts
setResponse(response.response);
```

Correct

```ts
if(response){

setResponse(response.response);

}
```

---

## Background Doesn't Receive Messages

Verify

```
background.ts
```

contains

```ts
chrome.runtime.onMessage.addListener(...)
```

---

## Content Script Doesn't Receive Messages

Reload the webpage.

Content Scripts are injected only after page reload.

---

## Service Worker Inactive

This is normal.

Chrome stops the Background Worker when idle.

It automatically starts when:

- Popup sends a message
- Context Menu is clicked
- Notification is shown

---

# Best Practices

✅ Use Constants

✅ Use Message Types

✅ Always Return Objects

✅ Handle Errors

✅ Keep Messages Small

✅ Never Send Large Objects

✅ Separate UI from Business Logic

---

# Folder Structure After Milestone 9

```
chrome-extension/

src/

├── popup/
│     Popup.tsx
│
├── background/
│     background.ts
│
├── content/
│     content.ts
│
├── constants/
│     message.constants.ts
│
├── hooks/
│
├── services/
│
├── store/
│
├── utils/
│
└── assets/
```

---

# Deliverables

By the end of this milestone you have implemented:

- ✅ Runtime Messaging
- ✅ Popup → Background Communication
- ✅ Content Script → Background Communication
- ✅ Background → Content Script Communication
- ✅ Mock AI Response
- ✅ Error Handling
- ✅ Message Types
- ✅ End-to-End Communication Flow

---

# Git Commands

```bash
git add .

git commit -m "feat(extension): implement runtime messaging"

git push origin develop
```

---

# Summary

In this milestone, we learned how different parts of a Chrome Extension communicate using the Runtime Messaging API. We implemented communication between the Popup, Background Service Worker, and Content Script using `chrome.runtime.sendMessage()`, `chrome.runtime.onMessage.addListener()`, and `chrome.tabs.sendMessage()`. We also handled asynchronous responses, added basic error handling, and used structured message types to make communication scalable. Although the responses are mocked for now, this architecture is the foundation for integrating a real AI backend in the next chapter.

---

# Next Milestone

## 🎥 Milestone 10 – Polish the Extension

Topics

- Theme Support
- Settings Page
- Loading Spinner
- Toast Notifications
- Empty State
- Error Pages
- Build Optimization
- Production Ready Chrome Extension

After Milestone 10, the Chrome Extension foundation will be complete and ready to integrate with the Node.js AI Backend in Chapter 3.