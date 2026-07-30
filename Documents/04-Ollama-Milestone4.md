# Milestone 4.4 – AI Router | Intelligent Model Selection

> 🎥 **Episode 4.4**  
> **Chapter 4 – Ollama Integration & AI Router**

---

# 📖 Milestone Overview

In the previous milestone, we successfully connected our Node.js backend to **Ollama** and generated responses from local AI models.

Currently, every request uses a single model, regardless of the task.

This approach works, but it is not efficient.

For example:

- Asking a coding question should use a coding model.
- Asking an architecture question should use a reasoning model.
- General conversation should use a lightweight chat model.

In this milestone, we will build an **AI Router** that automatically selects the best AI model based on the user's request.

This is the same design pattern used by many modern AI platforms that support multiple models.

---

# 🎯 Learning Objectives

After completing this milestone, you will be able to:

- Understand the AI Router concept
- Classify user requests
- Select AI models dynamically
- Build a reusable routing service
- Separate routing logic from business logic
- Improve AI performance and efficiency
- Prepare the backend for multiple AI providers

---

# 🤖 What is an AI Router?

An AI Router is responsible for deciding **which AI model should answer a user's request**.

Instead of always using the same model, the router analyzes the request and chooses the most appropriate model.

For example:

```text
User Prompt

↓

AI Router

↓

Best AI Model

↓

AI Response
```

---

# ❓ Why Do We Need an AI Router?

Different AI models are optimized for different tasks.

Using a single model for everything can result in:

- Slower responses
- Higher memory usage
- Lower quality answers
- Poor coding performance
- Inefficient hardware utilization

An AI Router solves these problems by selecting the right model for each request.

---

# 🏗 Architecture

```text
Chrome Extension

        │

        ▼

Node.js Backend

        │

        ▼

AI Controller

        │

        ▼

AI Service

        │

        ▼

AI Router

        │

 ┌──────┼───────────────┐

 ▼      ▼               ▼

Chat   Coding      Reasoning

 ▼      ▼               ▼

Llama  Qwen      DeepSeek

        │

        ▼

Ollama

        │

        ▼

AI Response
```

---

# 📁 Project Structure

```text
backend/

src/

├── services/
│
│   ├── ai-router.service.ts
│   ├── ollama.service.ts
│   ├── ai.service.ts
│
├── providers/
│
├── controllers/
│
├── routes/
│
└── prompts/
```

---

# 🧠 AI Router Responsibilities

The AI Router should:

- Inspect the user's prompt
- Detect the task type
- Select the best AI model
- Forward the request to Ollama
- Return the generated response

The router should **never** generate AI responses itself. It only decides which model to use.

---

# 🛠 Supported Models

For a 16 GB RAM development machine, we recommend the following models:

| Task | Recommended Model |
|------|-------------------|
| General Chat | llama3.2:3b |
| Coding | qwen2.5-coder:7b |
| Architecture | deepseek-r1:7b |
| Documentation | llama3.2:3b |
| Resume Review | llama3.2:3b |
| Embeddings | nomic-embed-text |

---

# 🧩 Model Selection Strategy

The router uses simple keyword-based intent detection in this milestone.

Later chapters will improve this using AI-based classification.

Example:

| User Prompt | Selected Model |
|-------------|----------------|
| Explain JavaScript | qwen2.5-coder |
| Review Dockerfile | qwen2.5-coder |
| Explain Kubernetes | deepseek-r1 |
| Explain React Hooks | qwen2.5-coder |
| Resume Review | llama3.2 |
| Generate README | llama3.2 |
| General Chat | llama3.2 |

---

# 🔄 Request Flow

```text
User Prompt

↓

AI Controller

↓

AI Service

↓

AI Router

↓

Select Model

↓

Ollama Service

↓

Ollama

↓

Generated Response

↓

Chrome Extension
```

---

# 🔹 Step 1 – Create AI Router Service

Create:

```text
src/services/ai-router.service.ts
```

This service will contain all routing logic.

Responsibilities:

- Detect request type
- Select model
- Return model name

---

# 🔹 Step 2 – Create Model Configuration

Instead of hardcoding model names throughout the application, define them in one place.

Example:

```text
General Chat

↓

llama3.2:3b

Coding

↓

qwen2.5-coder:7b

Reasoning

↓

deepseek-r1:7b
```

This makes future model changes simple.

---

# 🔹 Step 3 – Detect Coding Requests

Examples:

- JavaScript
- TypeScript
- React
- Node.js
- Docker
- Kubernetes
- SQL
- Express
- API
- CSS

If the prompt contains these keywords,

select:

```text
qwen2.5-coder:7b
```

---

# 🔹 Step 4 – Detect Reasoning Requests

Examples:

- Design
- Architecture
- System Design
- Microservices
- Scalability
- Distributed Systems

Select:

```text
deepseek-r1:7b
```

---

# 🔹 Step 5 – General Chat

If no special keywords are detected,

use:

```text
llama3.2:3b
```

This becomes the default model.

---

# 🔹 Step 6 – Integrate AI Router

Current flow:

```text
Controller

↓

Ollama Service
```

New flow:

```text
Controller

↓

AI Service

↓

AI Router

↓

Ollama Service
```

This keeps the application modular and easier to maintain.

---

# 🔹 Step 7 – Test Different Prompts

## General Chat

```text
Who invented Java?
```

Expected Model

```text
llama3.2:3b
```

---

## Coding

```text
Explain Express Middleware
```

Expected Model

```text
qwen2.5-coder:7b
```

---

## Docker

```text
Explain Docker Compose
```

Expected Model

```text
qwen2.5-coder:7b
```

---

## Kubernetes

```text
Explain Kubernetes Ingress
```

Expected Model

```text
deepseek-r1:7b
```

---

## Architecture

```text
Design an E-commerce Microservices Architecture
```

Expected Model

```text
deepseek-r1:7b
```

---

# 🔹 Step 8 – Log Selected Model

During development, log the selected model.

Example:

```text
Prompt:

Explain Docker

↓

Selected Model:

qwen2.5-coder:7b
```

This helps verify that routing is working correctly.

---

# 🔹 Step 9 – Error Handling

If no model is selected,

fallback to:

```text
llama3.2:3b
```

Never allow routing to fail because of an unknown request.

---

# 🔹 Step 10 – Future Improvements

Our first AI Router uses simple keyword matching.

In future chapters, we will enhance it with:

- AI-based intent detection
- Prompt classification
- Cost-aware routing
- Response quality scoring
- Multi-provider routing
- Fallback providers
- Load balancing
- Conversation memory

---

# 🧪 Testing Checklist

Verify the following:

- ✅ General chat selects Llama
- ✅ Coding prompts select Qwen
- ✅ Architecture prompts select DeepSeek
- ✅ Unknown prompts use the default model
- ✅ Router logs the selected model
- ✅ AI responses are generated successfully

---

# 💡 Best Practices

- Keep routing logic separate from controllers
- Avoid hardcoded model names across the project
- Use configuration files for model mappings
- Always define a default model
- Keep routing deterministic and easy to test
- Log selected models during development
- Make the router easily extensible for future AI providers

---

# 📁 Deliverables

By the end of this milestone, you will have:

- ✅ AI Router Service
- ✅ Intelligent Model Selection
- ✅ Keyword-based Intent Detection
- ✅ Configurable Model Mapping
- ✅ Automatic Model Routing
- ✅ Cleaner AI Architecture
- ✅ Foundation for Multi-Provider Support

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): implement intelligent ai router"

git push origin develop
```

---

# 📖 Milestone Summary

In this milestone, we built an **AI Router** that intelligently selects the most appropriate local AI model based on the user's request. Instead of sending every prompt to the same model, the router analyzes the request, detects its intent, and routes it to the best model for coding, reasoning, or general conversation. This design improves response quality, reduces unnecessary resource usage, and prepares the backend for future support of multiple AI providers such as Ollama, OpenAI, Gemini, and Claude.

---

# ⏭ Next Milestone

## Milestone 4.5 – Streaming AI Responses

In the next milestone, you will:

- Enable streaming responses from Ollama
- Understand token-by-token generation
- Implement Server-Sent Events (SSE)
- Stream responses to the Chrome Extension
- Improve perceived performance
- Prepare the backend for real-time AI conversations