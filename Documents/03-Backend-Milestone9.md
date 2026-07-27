# Milestone 9 – Connect Chrome Extension to Backend

## 🎥 Episode 3.9

# 🎯 Goal

In the previous milestones, the Chrome Extension communicated only with the Background Worker and received **mock responses**.

In this milestone, we'll connect the extension to the **Node.js Backend API**.

The Background Worker will make an HTTP request to the backend, receive the AI response, and send it back to the popup.

By the end of this milestone, your extension will become a **real client-server application**.

---

# 📚 What You'll Learn

- Connect Chrome Extension with Node.js Backend
- Send HTTP Requests using Fetch API
- Background Worker as API Gateway
- Runtime Messaging
- Error Handling
- Display Backend Response in Popup

---

# 🏗️ Architecture

```
Popup

↓

Background Worker

↓

Backend API

↓

AI Service

↓

Provider

↓

Background Worker

↓

Popup
```

---

# 📁 Project Structure

```
chrome-extension/

src/

├── popup/
│     Popup.tsx
│
├── background/
│     background.ts
│
├── services/
│     api.service.ts
│
├── constants/
│
└── types/
```

Backend

```
backend/

src/

├── routes/
├── controllers/
├── services/
├── providers/
└── app.ts
```

---

# Step 1 – Start Backend Server

Move into the backend project.

```bash
cd backend
```

Run the development server.

```bash
npm run dev
```

Expected Output

```
Server running at

http://localhost:3000
```

---

# Step 2 – Verify Health API

Open

```
http://localhost:3000/health
```

Expected Response

```json
{
  "status": "OK",
  "version": "1.0.0",
  "uptime": 35
}
```

This confirms that the backend is running.

---

# Step 3 – Verify AI API

Open Postman or VS Code REST Client.

Send a POST request.

```
POST

http://localhost:3000/api/v1/ai/chat
```

Body

```json
{
  "prompt": "Explain Docker",
  "model": "llama3"
}
```

Expected Response

```json
{
  "success": true,
  "response": "Hello from DevPilot Backend"
}
```

Do not continue until this works.

---

# Step 4 – Create API Service

Create

```
chrome-extension/

src/

services/

api.service.ts
```

Purpose

All backend API calls should be centralized in one place.

Benefits

- Cleaner code
- Reusable APIs
- Easy maintenance
- Easy testing

---

# Step 5 – Create Backend URL Constant

Create

```
src/constants/api.constants.ts
```

Example

```ts
export const API_BASE_URL =
    "http://localhost:3000";
```

Add another constant.

```ts
export const AI_CHAT_API =
    "/api/v1/ai/chat";
```

Now URLs are never hardcoded.

---

# Step 6 – Create Chat API Function

Inside

```
api.service.ts
```

Create

```ts
export async function chatWithAI(
    prompt: string,
    model: string
){}
```

Purpose

This function will

- send request
- receive response
- return JSON

---

# Step 7 – Call Backend using Fetch

Inside

```
chatWithAI()
```

Call

```ts
fetch(
    "http://localhost:3000/api/v1/ai/chat"
)
```

Method

```
POST
```

Headers

```
Content-Type

application/json
```

Body

```json
{
    "prompt":"Explain Docker",
    "model":"llama3"
}
```

---

# Step 8 – Parse JSON Response

After Fetch

```ts
const response =
await fetch(...);

const data =
await response.json();
```

Return

```ts
return data;
```

Expected

```json
{
    "success":true,
    "response":"Hello from DevPilot Backend"
}
```

```ts
export async function chatWithAI(
    prompt: string,
    model: string
) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/v1/ai/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt,
                    model
                })
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("Backend Error:", error);

        return {
            success: false,
            response: "Backend unavailable"
        };
    }
}

```

---

# Step 9 – Import API Service into Background Worker

Open

```
background.ts
```

Import

```
chatWithAI()
```

Purpose

Background Worker should become the only component that communicates with the backend.

Architecture

```
Popup

↓

Background

↓

Backend
```

Popup should never call the backend directly.

---

# Step 10 – Update Runtime Message Listener

Current Flow

```
Popup

↓

Background

↓

Mock Response
```

Replace

```ts
response:
"Mock AI Response"
```

with

```ts
const result =
await chatWithAI(
    message.prompt,
    "llama3"
);
```

Then

```ts
sendResponse(result);
```

---

# Step 11 – Make Listener Asynchronous

Because Fetch is asynchronous.

Use

```ts
chrome.runtime.onMessage.addListener(
(message,sender,sendResponse)=>{

    async function process(){

    }

    process();

    return true;

});
```

Always return

```ts
true
```

Otherwise Chrome closes the messaging channel before the backend responds.

---

# Step 12 – Update Popup

Current

```
Popup

↓

Background

↓

Mock
```

No code changes are required if the popup is already sending

```ts
chrome.runtime.sendMessage()
```

The popup will automatically receive the backend response.

Example

```ts
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

---

# Step 13 – Display Backend Response

Current popup

```ts
setResponse(

response.response

);
```

Expected UI

```
Hello from DevPilot Backend
```

The popup now displays the actual backend response.

---

# Step 14 – Handle API Errors

Inside

```
api.service.ts
```

Wrap the request.

```ts
try{

...

}

catch(error){

...
}
```

Return

```json
{
    "success":false,
    "response":"Backend unavailable"
}
```

Now the extension won't crash if the backend is offline.

---

# Step 15 – Handle Runtime Errors

Inside

```
Popup.tsx
```

Check

```ts
if(
chrome.runtime.lastError
){

console.error(

chrome.runtime.lastError.message

);

return;

}
```

Useful Errors

```
Could not establish connection

Backend unavailable

Network Error
```

---

# Step 16 – Improve Loading State

Before sending the request

```ts
setLoading(true);
```

After response

```ts
setLoading(false);
```

UI

```
Ask AI

↓

Loading...

↓

Response
```

This improves the user experience.

---

# Step 17 – Verify Network Request

Open

```
chrome://extensions
```

Enable

```
Developer Mode
```

Inspect

```
Service Worker
```

Open the

```
Network
```

tab.

Click

```
Send Message
```

Verify

```
POST

/api/v1/ai/chat
```

Status

```
200 OK
```

---

# Step 18 – Test Complete Flow

Click

```
Send Message
```

Flow

```
Popup

↓

Background

↓

Backend

↓

AI Service

↓

Provider

↓

Background

↓

Popup
```

Expected Response

```
Hello from DevPilot Backend
```

---

# Step 19 – Verify Backend Logs

Backend Console

```
POST

/api/v1/ai/chat
```

You should see

```
Incoming Request

↓

Validation

↓

Controller

↓

Service

↓

Provider

↓

Response
```

This confirms the request reached the backend.

---

# Step 20 – End-to-End Testing

## Test 1

Backend Running

Click

```
Send Message
```

Expected

```
Hello from DevPilot Backend
```

---

## Test 2

Stop Backend

```
CTRL + C
```

Click

```
Send Message
```

Expected

```
Backend unavailable
```

No crashes.

---

## Test 3

Restart Backend

```
npm run dev
```

Click

```
Send Message
```

Everything works again.

---

# Common Issues

## CORS Error

Install

```bash
npm install cors
```

Enable CORS.

```ts
app.use(cors());
```

---

## Fetch Failed

Verify backend URL.

```
http://localhost:3000
```

---

## Network Error

Check backend is running.

```
npm run dev
```

---

## Could Not Establish Connection

Reload the Chrome Extension.

```
chrome://extensions

↓

Reload
```

---

## Background Not Receiving Messages

Ensure

```ts
return true;
```

is present inside

```
chrome.runtime.onMessage.addListener()
```

---

## Response Undefined

Verify backend returns

```json
{
    "success":true,
    "response":"..."
}
```

---

# Best Practices

✅ Keep all backend calls inside `api.service.ts`

✅ Never call the backend directly from Popup

✅ Always use Background Worker as the API gateway

✅ Handle network failures gracefully

✅ Show loading indicators

✅ Return consistent API response formats

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
├── services/
│     api.service.ts
│
├── constants/
│     api.constants.ts
│
├── types/
│
└── assets/
```

Backend

```
backend/

src/

├── app.ts
├── routes/
├── controllers/
├── services/
├── providers/
└── utils/
```

---

# Deliverables

By the end of this milestone, you will have:

- ✅ Chrome Extension connected to the backend
- ✅ API Service Layer
- ✅ Background Worker calling the backend
- ✅ Popup receiving backend responses
- ✅ Loading State
- ✅ Runtime Messaging
- ✅ Error Handling
- ✅ End-to-End Communication

---

# Runtime Flow

```
Popup

↓

chrome.runtime.sendMessage()

↓

Background Worker

↓

chatWithAI()

↓

POST /api/v1/ai/chat

↓

Backend Controller

↓

AI Service

↓

Provider

↓

Response

↓

Background Worker

↓

Popup

↓

Display Result
```

---

# Git Commit

```bash
git add .

git commit -m "feat(extension): connect backend api"

git push origin develop
```

---

# 🎉 Milestone Complete

Congratulations! 🎉

You have successfully connected your Chrome Extension with your Node.js backend.

Your project is now a true full-stack application where:

- The **Popup** sends requests.
- The **Background Worker** acts as the communication bridge.
- The **Node.js Backend** processes the request.
- The **Provider Layer** prepares AI responses.
- The **Popup** displays the backend response.

In the next milestone, you'll make the backend production-ready with centralized error handling, environment configuration, logging, API versioning, and final cleanup.