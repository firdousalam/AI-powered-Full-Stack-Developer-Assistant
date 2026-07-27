# Milestone 4.3 – Ollama REST API Integration

> 🎥 **Episode 4.3**  
> **Chapter 4 – Ollama Integration & AI Router**

---

# 📖 Milestone Overview

In the previous milestone, we downloaded and verified multiple Local Large Language Models (LLMs) using Ollama.

Now it's time to connect our **Node.js Backend** to Ollama through its **REST API**.

This milestone transforms our backend from returning mock responses to generating **real AI-powered responses** using local models running on our machine.

By the end of this milestone, the DevPilot backend will be able to communicate with Ollama and generate intelligent responses without relying on cloud AI providers.

---

# 🎯 Learning Objectives

After completing this milestone, you will be able to:

- Understand the Ollama REST API
- Connect the Node.js backend to Ollama
- Call `/api/chat`
- Call `/api/generate`
- Handle streaming and non-streaming responses
- Build the first AI-powered backend endpoint
- Test AI responses using Postman and cURL
- Prepare the backend for AI Router integration

---

# 🧠 Why REST API?

Ollama exposes every AI model through a simple HTTP REST API.

This means our Node.js backend can communicate with Ollama just like any other web service.

```
Node.js

↓

HTTP Request

↓

Ollama

↓

LLM

↓

AI Response
```

This architecture keeps the backend independent from any specific AI provider.

---

# 🏗 Architecture

```text
Chrome Extension

        │

        ▼

Node.js Backend

        │

        ▼

Ollama REST API

        │

        ▼

Local AI Model

        │

        ▼

Generated Response
```

---

# 🌐 Default Ollama Server

When Ollama is running, it starts a local HTTP server.

Default URL

```text
http://localhost:11434
```

---

# 📡 Important REST Endpoints

| Method | Endpoint | Purpose |
|----------|----------|----------|
| GET | `/api/tags` | List installed models |
| POST | `/api/chat` | Chat-based conversations |
| POST | `/api/generate` | Single prompt generation |
| POST | `/api/embed` | Generate embeddings |
| POST | `/api/pull` | Download a model |
| DELETE | `/api/delete` | Remove a model |

---

# 📁 Project Structure

```text
backend/

src/

├── services/
│     ollama.service.ts
│
├── controllers/
│     ai.controller.ts
│
├── routes/
│     ai.routes.ts
│
├── providers/
│
└── config/
```

---

# 🔹 Step 1 – Verify Ollama Server

Before writing any code, make sure Ollama is running.

Open a browser:

```text
http://localhost:11434
```

Expected response:

```text
Ollama is running
```

Or verify using cURL:

```bash
curl http://localhost:11434
```

---

# 🔹 Step 2 – Verify Installed Models

List available models:

```bash
curl http://localhost:11434/api/tags
```

Example response:

```json
{
  "models": [
    {
      "name": "llama3.2:3b"
    },
    {
      "name": "qwen2.5-coder:7b"
    },
    {
      "name": "deepseek-r1:7b"
    }
  ]
}
```

---

# 🔹 Step 3 – Test the Generate API

The `/api/generate` endpoint generates text from a single prompt.

Request:

```http
POST /api/generate
```

Example:

```json
{
  "model": "llama3.2:3b",
  "prompt": "Explain Docker"
}
```

Expected Response

```json
{
  "response": "Docker is a containerization platform..."
}
```

---

# 🔹 Step 4 – Test the Chat API

The `/api/chat` endpoint supports conversational interactions.

Request:

```http
POST /api/chat
```

Example:

```json
{
  "model": "llama3.2:3b",
  "messages": [
    {
      "role": "user",
      "content": "Explain Kubernetes"
    }
  ]
}
```

Expected Response

```json
{
  "message": {
    "role": "assistant",
    "content": "Kubernetes is an orchestration platform..."
  }
}
```

---

# 🔹 Step 5 – Install Axios

Our backend will use Axios to communicate with Ollama.

Install:

```bash
npm install axios
```

---

# 🔹 Step 6 – Create Ollama Service

Create:

```text
src/services/ollama.service.ts
```

Responsibilities:

- Connect to Ollama
- Send prompts
- Receive AI responses
- Handle errors
- Return structured results

This service keeps AI logic separate from controllers.

---

# 🔹 Step 7 – Build Generate Method

Create a function that:

- accepts a prompt
- accepts a model name
- calls `/api/generate`
- returns the generated response

Flow:

```text
Controller

↓

Ollama Service

↓

POST /api/generate

↓

Response
```

---

# 🔹 Step 8 – Build Chat Method

Create another method that calls:

```http
POST /api/chat
```

Flow:

```text
Controller

↓

Ollama Service

↓

POST /api/chat

↓

Assistant Response
```

---

# 🔹 Step 9 – Connect AI Controller

Instead of returning mock data:

```json
{
    "success": true,
    "response": "Hello from DevPilot Backend"
}
```

Return:

```text
Real AI Response
```

Flow:

```text
AI Controller

↓

AI Service

↓

Ollama Service

↓

Ollama

↓

Generated Response
```

---

# 🔹 Step 10 – Test Using Postman

Endpoint:

```http
POST http://localhost:3000/api/v1/ai/chat
```

Request

```json
{
    "prompt":"Explain Docker",
    "model":"llama3.2:3b"
}
```

Expected Response

```json
{
    "success": true,
    "response": "Docker is a container platform..."
}
```

---

# 🔹 Step 11 – Test Using cURL

```bash
curl --location 'http://localhost:3000/api/v1/ai/chat' \
--header 'Content-Type: application/json' \
--data '{
  "prompt":"Explain Docker",
  "model":"llama3.2:3b"
}'
```

Expected Output

```json
{
  "success": true,
  "response": "Docker is a platform for building, shipping, and running applications inside lightweight, portable containers..."
}
```

---

# 🔹 Step 12 – Streaming vs Non-Streaming

Ollama supports two response modes.

## Non-Streaming

Backend waits until the AI finishes generating.

```
User

↓

Backend

↓

Wait

↓

Complete Response
```

Simple to implement and ideal for APIs.

---

## Streaming

Tokens arrive one by one.

```
User

↓

Backend

↓

Ollama

↓

Streaming Tokens

↓

User
```

Benefits:

- Faster perceived response
- Better UX
- Ideal for chat applications
- Enables live typing effect

---

# 🔹 Step 13 – Error Handling

Handle common scenarios gracefully.

## Ollama Not Running

Error:

```text
ECONNREFUSED
```

Solution:

```bash
ollama serve
```

---

## Model Not Installed

Error:

```text
model not found
```

Solution:

```bash
ollama pull llama3.2:3b
```

---

## Invalid Model Name

Return:

```json
{
  "success": false,
  "message": "Requested AI model is not available."
}
```

---

## Request Timeout

Increase Axios timeout or retry if appropriate.

---

# 🧪 Testing Checklist

Verify the following:

- ✅ Ollama server is running
- ✅ Backend connects successfully
- ✅ `/api/generate` works
- ✅ `/api/chat` works
- ✅ AI responses are returned
- ✅ Errors are handled correctly
- ✅ Postman tests pass
- ✅ cURL tests pass

---

# 📚 Best Practices

- Keep Ollama logic inside a dedicated service
- Use environment variables for the Ollama URL
- Handle network failures gracefully
- Separate controller and service logic
- Log API requests during development
- Prepare for multiple AI providers

---

# 🎯 Deliverables

By the end of this milestone, you will have:

- ✅ Connected Node.js to Ollama
- ✅ Working Ollama Service
- ✅ `/api/generate` integration
- ✅ `/api/chat` integration
- ✅ Real AI-generated responses
- ✅ Axios-based communication
- ✅ Error handling
- ✅ Backend ready for AI Router

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(backend): integrate Ollama REST API"

git push origin develop
```

---

# 📖 Milestone Summary

In this milestone, we connected the DevPilot backend to Ollama using its REST API. We learned how to communicate with local AI models through the `/api/generate` and `/api/chat` endpoints, created a reusable Ollama service, replaced mock responses with real AI-generated content, and prepared the backend for streaming support and AI Router integration. This milestone marks the transition from a mock backend to a fully functional local AI backend powered by Ollama.

---

# ⏭ Next Milestone

## Milestone 4.4 – AI Router

In the next milestone, you will:

- Build the AI Router
- Detect user intent
- Automatically select the best AI model
- Route coding requests to Qwen
- Route reasoning tasks to DeepSeek
- Route general chat to Llama
- Create an extensible provider-based routing architecture