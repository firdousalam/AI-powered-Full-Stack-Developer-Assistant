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

In this milestone, we transformed the DevPilot AI backend from a traditional request-response API into a real-time AI streaming service. Using Ollama's streaming capabilities and Server-Sent Events, the backend now delivers AI-generated content token by token, providing a significantly more responsive user experience. This architecture lays the foundation for conversational AI, live code generation, and future features such as Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), and multi-agent workflows.

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
