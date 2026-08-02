# Milestone 4.5 – Streaming AI Responses

## 🎥 Episode 4.5

# Goal

Implement **real-time AI streaming** using Ollama and Server-Sent Events (SSE).

Instead of waiting for the entire response to be generated, the backend will stream tokens to the Chrome Extension as soon as they are produced.

This creates a much smoother and more responsive user experience similar to ChatGPT, Claude, and GitHub Copilot.

---

# Learning Objectives

After completing this milestone, you will be able to:

* Understand AI streaming
* Understand token-by-token generation
* Enable Ollama streaming
* Implement Server-Sent Events (SSE)
* Stream AI responses to the frontend
* Handle connection lifecycle
* Build responsive AI applications
* Prepare for real-time conversations

---

# Why Streaming?

Without streaming:

```text
User

↓

Send Prompt

↓

AI Generates Entire Response

↓

Return Complete Response

↓

Display
```

The user waits several seconds before seeing any output.

---

With streaming:

```text
User

↓

Send Prompt

↓

AI Starts Generating

↓

Token

↓

Token

↓

Token

↓

Display Immediately
```

The user sees the response appear instantly while it is still being generated.

---

# Advantages of Streaming

* Better User Experience
* Faster Perceived Performance
* Lower Waiting Time
* Real-time AI Conversations
* Professional UI
* Similar to ChatGPT

---

# Architecture

```text
Chrome Extension

        │

        ▼

Background Worker

        │

        ▼

Node.js Backend

        │

        ▼

AI Service

        │

        ▼

AI Router

        │

        ▼

Ollama

        │

        ▼

Streaming Tokens

        │

        ▼

Chrome Extension
```

---

# What is Server-Sent Events (SSE)?

Server-Sent Events is an HTTP-based protocol that allows a server to continuously send data to a connected client.

Unlike traditional REST APIs, the server does not close the connection after sending the first response.

Instead, it streams data continuously until the generation is complete.

---

# Streaming Workflow

```text
User Prompt

↓

POST /api/v1/ai/chat/stream

↓

AI Controller

↓

AI Service

↓

AI Router

↓

Ollama

↓

Generate Token

↓

Send Token

↓

Generate Token

↓

Send Token

↓

Complete Response

↓

Close Connection
```

---

# Folder Structure

```text
backend/

src/

├── controllers/
│      ai.controller.ts
│
├── services/
│      ai.service.ts
│      ai-router.service.ts
│      ollama.service.ts
│
├── routes/
│      ai.routes.ts
│
└── types/
```

---

# Step 1 – Understand Ollama Streaming

Ollama supports streaming by default.

Endpoint:

```http
POST /api/chat
```

Request:

```json
{
    "model":"llama3.2:3b",
    "messages":[
        {
            "role":"user",
            "content":"Explain Docker"
        }
    ],
    "stream":true
}
```

Notice:

```json
"stream": true
```

This enables token streaming.

---

# Step 2 – Create Streaming Method

Add a new method inside:

```text
src/services/ollama.service.ts
```

Responsibilities:

* Accept prompt
* Accept model
* Enable streaming
* Return ReadableStream
* Forward tokens

---

# Step 3 – Update AI Service

Current Flow

```text
Controller

↓

Ollama Service
```

New Flow

```text
Controller

↓

AI Service

↓

AI Router

↓

Ollama Service
```

The AI Service should:

* Detect request type
* Select the correct model
* Enable streaming
* Forward stream

---

# Step 4 – Create Streaming Controller

Instead of waiting for a full response:

```text
Controller

↓

Receive Token

↓

Write Token

↓

Receive Token

↓

Write Token

↓

Finish
```

The controller becomes responsible for forwarding the stream to the client.

---

# Step 5 – Configure SSE Headers

The response must remain open while streaming.

Typical headers include:

* Content-Type: text/event-stream
* Cache-Control: no-cache
* Connection: keep-alive

These headers tell the browser to keep listening for new data.

---

# Step 6 – Update AI Routes

Add a new endpoint:

```http
POST /api/v1/ai/chat/stream
```

Existing endpoints:

```text
POST /api/v1/ai/chat

POST /api/v1/ai/generate
```

New endpoint:

```text
POST /api/v1/ai/chat/stream
```

---

# Step 7 – Test Using Postman

Request:

```http
POST http://localhost:3000/api/v1/ai/chat/stream
```

Body:

```json
{
    "prompt":"Explain Docker",
    "model":"llama3.2:3b"
}
```

Expected Result

Instead of receiving one large JSON response, Postman should begin displaying streamed text as it is generated.

---

# Step 8 – Update Chrome Extension

Current flow:

```text
Popup

↓

Background

↓

Backend

↓

Response

↓

Popup
```

New flow:

```text
Popup

↓

Background

↓

Streaming Endpoint

↓

Token

↓

Popup

↓

Token

↓

Popup

↓

Token

↓

Popup
```


# Milestone 4.5 – Streaming AI Responses

# Part 1 – Update `api.service.ts`

## 🎯 Goal

Replace the existing REST API call with a streaming implementation.

Instead of waiting for the backend to return the complete response, the Chrome Extension will start receiving tokens immediately.

---

# Current Flow

Current implementation:

```text
Popup

↓

Background Worker

↓

POST /chat

↓

Wait

↓

Complete Response

↓

Popup
```

Current service:

```ts
export async function chatWithAI(
    prompt: string,
    model: string
) {

    const response = await fetch(
        "http://localhost:3000/api/v1/ai/chat"
    );

    return response.json();

}
```

Problems:

* Waits for the entire response.
* No streaming.
* Poor user experience.
* Not suitable for long AI responses.

---

# New Flow

```text
Popup

↓

Background Worker

↓

POST /chat/stream

↓

ReadableStream

↓

Token

↓

Background

↓

Popup

↓

Token

↓

Popup
```

---

# Step 1 – Create Streaming Function

Open

```text
src/services/api.service.ts
```

Replace the old method with the following.

```ts
export async function streamChat(

    prompt: string,

    model: string,

    onToken: (token: string) => void

) {

    const response = await fetch(

        "http://localhost:3000/api/v1/ai/chat/stream",

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

    if (!response.ok) {

        throw new Error("Streaming request failed");

    }

    if (!response.body) {

        throw new Error("ReadableStream not supported");

    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    while (true) {

        const { done, value } = await reader.read();

        if (done) {

            break;

        }

        const chunk = decoder.decode(

            value,

            {

                stream: true

            }

        );

        onToken(chunk);

    }

}
```

---

# Step 2 – Understanding fetch()

Unlike a normal REST request:

```ts
const response = await fetch(url);
```

This response contains:

```text
Response

↓

Headers

↓

Body

↓

ReadableStream
```

The important part is:

```ts
response.body
```

Instead of JSON,

we receive:

```text
ReadableStream<Uint8Array>
```

---

# Step 3 – What is ReadableStream?

Think of it like water flowing through a pipe.

Instead of receiving everything at once,

you receive small pieces continuously.

```text
AI

↓

Token

↓

Token

↓

Token

↓

Token
```

---

# Step 4 – Get Stream Reader

```ts
const reader = response.body.getReader();
```

This creates a reader capable of reading the stream.

```text
ReadableStream

↓

Reader

↓

read()

↓

Chunk
```

---

# Step 5 – Decode Binary Data

Ollama sends binary bytes.

Example:

```text
68 65 6c 6c 6f
```

Humans need:

```text
Hello
```

Use

```ts
const decoder = new TextDecoder();
```

Then

```ts
decoder.decode(value);
```

---

# Step 6 – Read Until Complete

Streaming never knows how many chunks exist.

So we loop forever.

```ts
while (true) {

}
```

Inside:

```ts
const {

    done,

    value

} = await reader.read();
```

Two possibilities:

### More Data

```text
done = false
```

Receive another chunk.

---

### Stream Finished

```text
done = true
```

Exit the loop.

```ts
break;
```

---

# Step 7 – Decode Each Chunk

Each chunk is binary.

Convert it into text.

```ts
const chunk = decoder.decode(

    value,

    {

        stream: true

    }

);
```

The

```ts
stream: true
```

parameter tells the decoder:

> More chunks are coming.

---

# Step 8 – Send Token Back

Instead of returning the complete response,

immediately send every token.

```ts
onToken(chunk);
```

The callback is provided by the Background Worker.

Flow:

```text
Chunk

↓

Decode

↓

onToken()

↓

Background

↓

Popup
```

---

# Step 9 – Complete Flow

```text
fetch()

↓

ReadableStream

↓

Reader

↓

Read Chunk

↓

Decode

↓

Token

↓

Callback

↓

Background Worker
```

---

# Step 10 – Error Handling

Always check:

```ts
if (!response.ok) {

    throw new Error(

        "Streaming request failed"

    );

}
```

Otherwise,

404

500

Network Errors

may silently fail.

---

Also verify

```ts
response.body
```

exists.

```ts
if (!response.body) {

    throw new Error(

        "ReadableStream not supported"

    );

}
```

---

# Final Code

```ts
export async function streamChat(

    prompt: string,

    model: string,

    onToken: (token: string) => void

) {

    const response = await fetch(

        "http://localhost:3000/api/v1/ai/chat/stream",

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

    if (!response.ok) {

        throw new Error("Streaming request failed");

    }

    if (!response.body) {

        throw new Error("ReadableStream not supported");

    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    while (true) {

        const {

            done,

            value

        } = await reader.read();

        if (done) {

            break;

        }

        const token = decoder.decode(

            value,

            {

                stream: true

            }

        );

        onToken(token);

    }

}
```

---

# Testing

This function alone will not display anything.

It should be called from the Background Worker like this:

```ts
streamChat(

    "Explain Docker",

    "llama3.2:3b",

    (token) => {

        console.log(token);

    }

);
```

Expected output:

```text
Docker

 is

 an

 open-source

 platform

...
```

Each piece appears as soon as Ollama generates it.

---

# Best Practices

* Keep networking code inside `api.service.ts`.
* Never call `fetch()` directly from the popup.
* Always validate `response.ok`.
* Always verify `response.body`.
* Use `TextDecoder` for streamed binary data.
* Stream tokens immediately instead of buffering.
* Keep this service reusable for future providers (OpenAI, Gemini, Claude).

---

# Deliverables

By the end of Part 1, you will have:

* ✅ Streaming API service
* ✅ ReadableStream support
* ✅ Token decoding
* ✅ Callback-based token forwarding
* ✅ Error handling
* ✅ Foundation for real-time AI streaming

# Milestone 4.5 – Streaming AI Responses

# Part 2 – Update `background.ts`

## 🎯 Goal

The Background Worker acts as the bridge between the Popup and the Backend.

Instead of waiting for the entire AI response, it will:

* Receive the popup request
* Call the streaming API
* Receive tokens from the backend
* Forward each token to the popup
* Clean up the connection when streaming finishes

---

# Previous Flow

```text
Popup

↓

chrome.runtime.sendMessage()

↓

Background Worker

↓

POST /api/v1/ai/chat

↓

Wait...

↓

Entire Response

↓

Popup
```

The popup only receives data once.

---

# New Flow

```text
Popup

↓

chrome.runtime.sendMessage()

↓

Background Worker

↓

POST /api/v1/ai/chat/stream

↓

Streaming Response

↓

Token

↓

Popup

↓

Token

↓

Popup

↓

Token

↓

Popup
```

---

# Why Update the Background Worker?

The popup should **never communicate directly with the backend**.

Instead:

```text
Popup

↓

Background Worker

↓

Backend
```

Advantages:

* Better security
* Centralized networking
* Easier authentication later
* Cleaner architecture
* Easier debugging

---

# Step 1 – Import Streaming Service

Open:

```text
src/background/background.ts
```

Import the new API service.

```ts
import { streamChat } from "../services/api.service";
```

---

# Step 2 – Handle Streaming Request

Inside

```ts
chrome.runtime.onMessage.addListener(...)
```

replace the old implementation.

Instead of

```ts
case "ASK_AI":

    const result = await chatWithAI(
        message.prompt,
        "llama3.2:3b"
    );

    sendResponse(result);

    break;
```

create a new asynchronous process.

```ts
case "ASK_AI":

    processStream();

    break;
```

---

# Step 3 – Create processStream()

Inside the listener:

```ts
async function processStream() {

}
```

Complete example:

```ts
async function processStream() {

    try {

        await streamChat(

            message.prompt,

            "llama3.2:3b",

            (token) => {

                console.log(token);

            }

        );

    }

    catch (error) {

        console.error(error);

    }

}
```

Current output:

```text
Docker

 is

 an

 open-source

 platform
```

Streaming is working.

---

# Step 4 – Forward Tokens

Printing to the console isn't useful.

Forward every token.

Replace

```ts
console.log(token);
```

with

```ts
chrome.runtime.sendMessage({

    type: "AI_STREAM",

    token

});
```

Now every generated token is broadcast to the extension.

---

# Updated Flow

```text
Ollama

↓

Backend

↓

Background Worker

↓

chrome.runtime.sendMessage()

↓

Popup
```

---

# Step 5 – Notify Completion

When streaming ends,

inform the popup.

After

```ts
await streamChat(...)
```

add

```ts
chrome.runtime.sendMessage({

    type: "AI_STREAM_END"

});
```

Now the popup knows that generation has finished.

---

# Step 6 – Handle Errors

If something fails:

```ts
catch (error) {

    chrome.runtime.sendMessage({

        type: "AI_STREAM_ERROR",

        error: "Streaming Failed"

    });

}
```

The popup can display:

```text
Something went wrong.
```

instead of hanging forever.

---

# Step 7 – Return true

Because streaming is asynchronous,

Chrome must keep the messaging channel alive.

Always finish the listener with

```ts
return true;
```

Example

```ts
chrome.runtime.onMessage.addListener(

    (message, sender, sendResponse) => {

        processStream();

        return true;

    }

);
```

Never remove this.

---

# Step 8 – Final Background Worker

```ts
chrome.runtime.onMessage.addListener(

    (message) => {

        async function processStream() {

            try {

                await streamChat(

                    message.prompt,

                    "llama3.2:3b",

                    (token) => {

                        chrome.runtime.sendMessage({

                            type: "AI_STREAM",

                            token

                        });

                    }

                );

                chrome.runtime.sendMessage({

                    type: "AI_STREAM_END"

                });

            }

            catch (error) {

                console.error(error);

                chrome.runtime.sendMessage({

                    type: "AI_STREAM_ERROR",

                    error: "Streaming Failed"

                });

            }

        }

        switch (message.type) {

            case "ASK_AI":

                processStream();

                break;

        }

        return true;

    }

);
```

---

# Message Types

Your extension now exchanges four message types.

## Popup → Background

```text
ASK_AI
```

Starts AI generation.

---

## Background → Popup

```text
AI_STREAM
```

Contains one streamed token.

Example

```json
{
    "type": "AI_STREAM",
    "token": "Docker"
}
```

---

## Background → Popup

```text
AI_STREAM_END
```

Generation completed.

---

## Background → Popup

```text
AI_STREAM_ERROR
```

Something failed.

---

# Runtime Flow

```text
Popup

↓

ASK_AI

↓

Background

↓

Backend

↓

Streaming Tokens

↓

AI_STREAM

↓

Popup

↓

AI_STREAM

↓

Popup

↓

AI_STREAM_END

↓

Popup
```

---

# Cleanup

When streaming finishes:

* Stop reading the stream
* Notify popup
* Allow the popup to enable the Send button
* Ready for another request

---

# Testing

Open:

```text
chrome://extensions
```

↓

Inspect Background Worker

Click

```text
Send Message
```

Expected Console

```text
Selected Model:

llama3.2:3b

Docker

is

an

open-source

containerization

platform...
```

No errors should appear.

---

# Best Practices

* Keep all networking inside the Background Worker.
* Never let the Popup call the backend directly.
* Always return `true` from asynchronous listeners.
* Notify the popup when streaming starts, ends, or fails.
* Use message types instead of hardcoded logic.
* Keep streaming logic isolated from UI rendering.

---

# Deliverables

By completing Part 2, you now have:

* ✅ Background Worker streaming support
* ✅ Token forwarding
* ✅ Runtime messaging
* ✅ Stream completion notification
* ✅ Error notification
* ✅ Proper asynchronous messaging
* ✅ Production-ready messaging architecture

---

# Next Part

In **Part 3**, we'll update **`Popup.tsx`** to:

* Receive `AI_STREAM` messages
* Append tokens to the UI
* Display the AI typing effect
* Show a loading indicator
* Handle `AI_STREAM_END`
* Handle `AI_STREAM_ERROR`
* Reset the UI for the next request


# Milestone 4.5 – Streaming AI Responses

# Part 3 – Update Popup UI for Real-Time AI Streaming

## 🎥 Episode 4.5

---

# 🎯 Goal

In this milestone, we will transform the Popup from a traditional request-response interface into a **real-time AI chat interface**.

Instead of waiting for the entire AI response, the popup will:

* Receive streaming tokens from the Background Worker
* Display the response as it is generated
* Show a loading indicator while the AI is thinking
* Handle streaming completion
* Handle streaming errors
* Reset itself for the next request

The final experience will be very similar to ChatGPT, Claude, or GitHub Copilot Chat.

---

# Current Flow

Currently, the popup waits until the backend finishes generating the response.

```text
User

↓

Click Send

↓

Waiting...

↓

Waiting...

↓

Waiting...

↓

Entire Response Appears
```

Example

```text
User:

Explain Docker

↓

3 Seconds Later

↓

Docker is an open-source platform...
```

---

# New Streaming Flow

```text
User

↓

Click Send

↓

Thinking...

↓

D

↓

Do

↓

Doc

↓

Dock

↓

Docker

↓

Docker is

↓

Docker is an

↓

Docker is an open-source platform...
```

The user immediately sees progress.

---

# Popup Responsibilities

The popup should now:

* Send the initial request
* Listen for streaming messages
* Append incoming tokens
* Display loading state
* Handle completion
* Handle errors
* Allow another request

---

# Updated Architecture

```text
Popup

↓

ASK_AI

↓

Background Worker

↓

Backend

↓

Streaming Tokens

↓

Background Worker

↓

AI_STREAM

↓

Popup UI
```

---

# Step 1 – Update Popup State

Open

```text
src/popup/Popup.tsx
```

Replace the current state.

Old

```ts
const [response, setResponse] = useState("");
```

New

```ts
const [response, setResponse] = useState("");

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");
```

Purpose

| State    | Description                 |
| -------- | --------------------------- |
| response | AI response shown in the UI |
| loading  | Displays loading indicator  |
| error    | Displays streaming errors   |

---

# Step 2 – Reset Before Sending

Before sending a new request,

clear previous data.

```ts
setResponse("");

setError("");

setLoading(true);
```

Never mix two conversations.

---

# Step 3 – Send Runtime Message

The popup only starts the process.

```ts
chrome.runtime.sendMessage({

    type: "ASK_AI",

    prompt: prompt

});
```

Notice

The popup no longer expects a callback.

Streaming messages arrive separately.

Old

```ts
sendMessage(..., callback)
```

New

```ts
sendMessage(...)
```

---

# Step 4 – Listen for Streaming Messages

Use

```ts
useEffect(() => {

}, []);
```

Inside,

register a runtime listener.

```ts
useEffect(() => {

    const listener = (

        message: any

    ) => {

    };

    chrome.runtime.onMessage.addListener(

        listener

    );

    return () => {

        chrome.runtime.onMessage.removeListener(

            listener

        );

    };

}, []);
```

Always remove listeners when the popup closes.

---

# Step 5 – Receive Tokens

Handle

```text
AI_STREAM
```

Example

```ts
if (

    message.type === "AI_STREAM"

) {

    setResponse(

        previous => previous + message.token

    );

}
```

Instead of replacing the response,

append every token.

Current

```text
Docker
```

Receive

```text
 is
```

New state

```text
Docker is
```

Receive

```text
 an
```

New state

```text
Docker is an
```

Continue until streaming finishes.

---

# Step 6 – Display Typing Effect

Because React updates automatically,

every

```ts
setResponse()
```

causes a re-render.

Example

```text
D

↓

Do

↓

Doc

↓

Dock

↓

Docker

↓

Docker is

↓

Docker is an

↓

Docker is an open-source...
```

No animation library is required.

React creates the typing effect naturally.

---

# Step 7 – Handle Stream Completion

Background Worker sends

```text
AI_STREAM_END
```

Handle it.

```ts
if (

    message.type === "AI_STREAM_END"

) {

    setLoading(false);

}
```

Hide loading indicator.

Enable Send button.

Ready for another request.

---

# Step 8 – Handle Streaming Errors

If

```text
AI_STREAM_ERROR
```

arrives,

display an error.

```ts
if (

    message.type === "AI_STREAM_ERROR"

) {

    setLoading(false);

    setError(

        message.error

    );

}
```

Possible output

```text
Streaming Failed
```

or

```text
Unable to connect to backend
```

---

# Step 9 – Show Loading Indicator

While

```ts
loading === true
```

display

```tsx
<p>

Thinking...

</p>
```

or

```tsx
<p>

Generating Response...

</p>
```

The loading message disappears after

```text
AI_STREAM_END
```

---

# Step 10 – Disable Send Button

Prevent duplicate requests.

```tsx
<button

disabled={loading}

>

Send Message

</button>
```

While streaming,

the user cannot start another request.

---

# Step 11 – Display Errors

Below the response,

display

```tsx
{

error && (

<p>

{error}

</p>

)

}
```

Example

```text
Unable to connect to backend
```

---

# Step 12 – Display AI Response

Simply render

```tsx
<p>

{response}

</p>
```

React updates continuously.

---

# Complete Popup Flow

```text
Click Send

↓

Reset UI

↓

Loading=true

↓

Send Runtime Message

↓

Receive AI_STREAM

↓

Append Token

↓

Re-render

↓

Receive AI_STREAM

↓

Append Token

↓

Re-render

↓

Receive AI_STREAM_END

↓

Loading=false

↓

Ready
```

---

# Runtime Messages

Popup now understands four message types.

## ASK_AI

Starts AI generation.

---

## AI_STREAM

Contains one generated token.

Example

```json
{
    "type":"AI_STREAM",
    "token":"Docker"
}
```

---

## AI_STREAM_END

Generation completed.

---

## AI_STREAM_ERROR

Something failed.

---

# User Experience

Old

```text
Click

↓

Wait

↓

Wait

↓

Wait

↓

Entire Response
```

New

```text
Click

↓

Thinking...

↓

D

↓

Do

↓

Doc

↓

Dock

↓

Docker

↓

Docker is

↓

Docker is an

↓

Docker is an open-source platform...
```

The application feels dramatically faster.

---

# Connection Cleanup

When

```text
AI_STREAM_END
```

arrives

perform cleanup.

```text
Loading=false

↓

Enable Button

↓

Stop Listening

↓

Ready
```

React removes listeners automatically when the popup closes because

```ts
removeListener()
```

is called.

---

# Testing Checklist

Verify:

✅ Loading indicator appears

✅ Tokens arrive continuously

✅ Response grows progressively

✅ Send button is disabled

✅ Stream finishes correctly

✅ Loading disappears

✅ Error messages display correctly

✅ Multiple requests work

✅ No duplicated listeners

---

# Best Practices

* Never call the backend directly from the popup.
* Always communicate through the Background Worker.
* Remove runtime listeners inside `useEffect`.
* Append streamed tokens instead of replacing text.
* Disable input while streaming.
* Display meaningful loading and error states.
* Reset the popup before each new request.
* Keep rendering logic separate from networking logic.

---

# Deliverables

By completing Part 3, you will have:

* ✅ Real-time AI typing effect
* ✅ Progressive token rendering
* ✅ Loading indicator
* ✅ Error handling
* ✅ Runtime message listener
* ✅ Automatic UI updates
* ✅ Stream completion handling
* ✅ Production-ready streaming popup

---

# Summary

In this milestone, the Popup becomes a fully interactive real-time AI interface. Instead of waiting for a complete response, it listens for streamed tokens from the Background Worker and appends them to the screen as they arrive. React automatically re-renders the component after each token, producing a smooth typing animation similar to ChatGPT. Proper loading states, error handling, listener cleanup, and stream completion make the implementation robust and ready for future enhancements such as conversation history, markdown rendering, syntax highlighting, and multi-turn AI conversations.


---

# Step 9 – Update Popup UI

Instead of:

```text
Response

↓

Display Entire Response
```

Display progressively:

```text
H

He

Hel

Hell

Hello

Hello World
```

The user sees the AI typing in real time.

---

# Step 10 – Connection Cleanup

When streaming finishes:

* Close stream
* Release resources
* Stop listeners
* End response

Always ensure connections are cleaned up properly.

---

# Error Handling

Handle the following situations gracefully:

## Ollama Not Running

Start Ollama:

```bash
ollama serve
```

---

## Model Not Installed

Download the required model:

```bash
ollama pull llama3.2:3b
```

---

## Connection Lost

Close the stream and notify the user.

---

## Timeout

Abort the request and return an appropriate error.

---

# Testing Checklist

Verify:

* SSE endpoint works
* Streaming begins immediately
* Tokens appear progressively
* Connection closes correctly
* Popup updates continuously
* Errors are handled gracefully
* Ollama responses stream correctly

---

# Best Practices

* Stream only when required
* Always close connections
* Log streaming errors
* Keep controllers lightweight
* Delegate business logic to services
* Reuse AI Router
* Reuse Prompt Templates
* Keep streaming logic isolated
* Test slow models and fast models separately

---

# Deliverables

By the end of this milestone, you will have:

* ✅ Ollama Streaming Enabled
* ✅ Server-Sent Events (SSE)
* ✅ Streaming AI Endpoint
* ✅ Streaming AI Service
* ✅ Streaming Chrome Extension
* ✅ Real-time AI Responses
* ✅ Connection Cleanup
* ✅ Production-ready Streaming Architecture

---

# Git Commit

```bash
git add .

git commit -m "feat(ai): implement streaming ai responses"

git push origin develop
```

---

# Milestone Summary

In this milestone, we transformed the Zeba AI backend from a traditional request-response API into a real-time AI streaming service. Using Ollama's streaming capabilities and Server-Sent Events, the backend now delivers AI-generated content token by token, providing a significantly more responsive user experience. This architecture lays the foundation for conversational AI, live code generation, and future features such as Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), and multi-agent workflows.

# Milestone 4.5 – Streaming AI Responses (Steps 2–6)

## 🎥 Episode 4.5

---

# Step 2 – Create Streaming Method

## Goal

Create a new method inside the Ollama service that communicates with Ollama using **streaming mode**.

Instead of waiting for the complete AI response, Ollama will return a stream of tokens.

---

## File

```text
src/services/ollama.service.ts
```

---

## Current Method

Currently, we already have something similar to:

```ts
async chat(prompt: string, model: string) {

    const response = await axios.post(

        `${this.baseUrl}/api/chat`,

        {

            model,

            messages: [

                {

                    role: "user",

                    content: prompt

                }

            ]

        }

    );

    return response.data.message.content;

}
```

This waits until Ollama finishes generating the entire response.

---

## Create a New Method

Add a second method called **streamChat()**.

```ts
import axios from "axios";

class OllamaService {

    private baseUrl = "http://localhost:11434";

    async streamChat(

        prompt: string,

        model: string

    ) {

        const response = await axios({

            method: "POST",

            url: `${this.baseUrl}/api/chat`,

            responseType: "stream",

            data: {

                model,

                stream: true,

                messages: [

                    {

                        role: "user",

                        content: prompt

                    }

                ]

            }

        });

        return response.data;

    }

}

export default new OllamaService();
```

---

## What Changed?

### Enable Streaming

```ts
stream: true
```

This tells Ollama:

> Don't wait until the entire answer is finished.

Instead, generate one token at a time.

---

### Response Type

```ts
responseType: "stream"
```

Normally Axios returns JSON.

With streaming enabled it returns a **Readable Stream**.

---

### Return Stream

Instead of returning text:

```ts
return response.data.message.content;
```

Return the stream:

```ts
return response.data;
```

---

# Flow

```text
Controller

↓

Ollama Service

↓

POST /api/chat

↓

Readable Stream

↓

Controller
```

---

# Step 3 – Update AI Service

## Current Flow

```text
Controller

↓

Ollama Service
```

---

## New Flow

```text
Controller

↓

AI Service

↓

AI Router

↓

Ollama Service
```

---

## Why?

The AI Service should decide:

* Which model to use
* Whether to stream
* Which provider to call

The controller should not know these details.

---

## Update AI Service

File

```text
src/services/ai.service.ts
```

```ts
import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";

class AIService {

    async streamChat(

        prompt: string

    ) {

        const route = aiRouter.selectModel(prompt);

        console.log("Selected Model:", route.model);

        return ollamaService.streamChat(

            prompt,

            route.model

        );

    }

}

export default new AIService();
```

---

# Flow

```text
Prompt

↓

AI Router

↓

Model Selected

↓

Ollama Streaming

↓

Readable Stream
```

---

# Step 4 – Create Streaming Controller

## Goal

The controller should receive the stream from the service and immediately send it to the client.

---

## File

```text
src/controllers/ai.controller.ts
```

---

## Add New Controller

```ts
import { Request, Response } from "express";

import aiService from "../services/ai.service";

export async function streamChat(

    req: Request,

    res: Response

) {

    try {

        const {

            prompt

        } = req.body;

        const stream = await aiService.streamChat(

            prompt

        );

        stream.pipe(res);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Streaming Failed"

        });

    }

}
```

---

## Why stream.pipe(res)?

Instead of this:

```text
Wait

↓

Receive Entire Response

↓

Send Response
```

We do:

```text
Receive Token

↓

Send Token

↓

Receive Token

↓

Send Token

↓

Finish
```

---

# Step 5 – Configure SSE Headers

Before sending any data, configure the HTTP response.

---

## Update Controller

```ts
res.setHeader(

    "Content-Type",

    "text/event-stream"

);

res.setHeader(

    "Cache-Control",

    "no-cache"

);

res.setHeader(

    "Connection",

    "keep-alive"

);
```

---

## Final Controller

```ts
export async function streamChat(

    req: Request,

    res: Response

) {

    try {

        res.setHeader(

            "Content-Type",

            "text/event-stream"

        );

        res.setHeader(

            "Cache-Control",

            "no-cache"

        );

        res.setHeader(

            "Connection",

            "keep-alive"

        );

        const stream = await aiService.streamChat(

            req.body.prompt

        );

        stream.pipe(res);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Streaming Failed"

        });

    }

}
```

---

## Why These Headers?

### Content-Type

```text
text/event-stream
```

Tells the browser that streaming data will follow.

---

### Cache-Control

```text
no-cache
```

Prevents proxies and browsers from buffering the stream.

---

### Connection

```text
keep-alive
```

Keeps the HTTP connection open while the AI generates tokens.

---

# Step 6 – Update AI Routes

## File

```text
src/routes/ai.routes.ts
```

---

## Current Routes

```ts
router.post(

    "/chat",

    validate(chatSchema),

    chat

);

router.post(

    "/generate",

    generate

);
```

---

## Add Streaming Route

```ts
import {

    chat,

    generate,

    streamChat

} from "../controllers/ai.controller";
```

Then add:

```ts
router.post(

    "/chat/stream",

    validate(chatSchema),

    streamChat

);
```

---

## Final Routes

```ts
router.post(

    "/chat",

    validate(chatSchema),

    chat

);

router.post(

    "/generate",

    generate

);

router.post(

    "/chat/stream",

    validate(chatSchema),

    streamChat

);
```

---

# Available Endpoints

| Method | Endpoint                 | Purpose                      |
| ------ | ------------------------ | ---------------------------- |
| POST   | `/api/v1/ai/chat`        | Normal AI response           |
| POST   | `/api/v1/ai/generate`    | Text generation              |
| POST   | `/api/v1/ai/chat/stream` | Real-time streaming response |

---

# Request Example

```http
POST /api/v1/ai/chat/stream
```

```json
{
    "prompt": "Explain Docker",
    "model": "llama3.2:3b"
}
```

---

# Request Flow

```text
Chrome Extension

↓

POST /chat/stream

↓

AI Controller

↓

AI Service

↓

AI Router

↓

Selected Model

↓

Ollama

↓

Streaming Tokens

↓

Controller

↓

Browser
```

---

# Testing

Run the backend:

```bash
npm run dev
```

Test with Postman:

```http
POST http://localhost:3000/api/v1/ai/chat/stream
```

Expected behavior:

* HTTP connection remains open.
* Ollama starts sending data immediately.
* Tokens arrive continuously until generation completes.
* The connection closes automatically after the final token.


curl.exe http://localhost:11434/api/chat `
-H "Content-Type: application/json" `
-d "{\"model\":\"llama3.2:3b\",\"messages\":[{\"role\":\"user\",\"content\":\"Explain Docker\"}],\"stream\":true}"

curl.exe http://localhost:11434/api/chat -H "Content-Type: application/json" -d "{\"model\":\"llama3.2:3b\",\"messages\":[{\"role\":\"user\",\"content\":\"Explain Docker\"}],\"stream\":true}"
---

# Best Practices

* Keep controllers lightweight.
* Place routing logic in `AI Router`.
* Keep Ollama-specific code inside `ollama.service.ts`.
* Always return streams instead of buffering large responses.
* Use SSE headers for browser compatibility.
* Log selected models during development.
* Handle stream errors gracefully.
* Prepare this architecture for WebSocket support in future milestones.

---

# Deliverables

By completing Steps 2–6, you will have:

* ✅ Ollama Streaming Service
* ✅ Streaming AI Service
* ✅ Streaming Controller
* ✅ SSE Configuration
* ✅ Streaming API Endpoint
* ✅ Production-ready streaming architecture


---

# Next Milestone

## Milestone 4.6 – Prompt Engineering & Prompt Templates

In the next milestone, you will:

* Create reusable prompt templates
* Build a Prompt Service
* Separate prompts from business logic
* Support multiple prompt types
* Improve AI response quality
* Prepare prompts for different AI providers
