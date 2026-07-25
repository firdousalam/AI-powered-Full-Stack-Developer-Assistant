# Chapter 4 - Ollama Integration & AI Router

> **Build Local AI using Ollama, Multiple LLMs, Streaming Responses & AI Router**

---

# 📖 Chapter Overview

In this chapter, we will integrate **Ollama** into the DevPilot AI backend.

Instead of relying on paid APIs like OpenAI or Gemini, we will use **100% free local Large Language Models (LLMs)** running on our own machine.

We'll also build an **AI Router**, which intelligently selects the best model for a given task.

By the end of this chapter, you'll have a backend capable of:

- Running multiple local AI models
- Selecting the appropriate model dynamically
- Streaming responses
- Managing prompts
- Optimizing memory usage
- Preparing for RAG and MCP integration

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Install and configure Ollama
- Download and manage local AI models
- Integrate Ollama with Node.js
- Build an AI Router
- Support multiple AI models
- Stream AI responses
- Optimize LLM memory usage
- Design prompt templates
- Build reusable AI services

---

# 🤖 What is Ollama?

Ollama is an open-source framework that allows you to run Large Language Models locally on your computer.

Advantages:

- Completely Free
- No API Keys
- Offline AI
- Privacy Focused
- Fast Response Time
- Supports Multiple Models
- REST API
- Streaming Support
- Cross Platform

---

# 🏗 AI Architecture

```text
                Chrome Extension

                        │

                  REST / WebSocket

                        │

                        ▼

                 Node.js Backend

                        │

                  AI Router Service

                        │

        ┌───────────────┼────────────────┐

        ▼               ▼                ▼

 Code Model      Chat Model      Embedding Model

        ▼               ▼                ▼

Qwen2.5-Coder     Llama3.2       nomic-embed-text

        ▼

      Ollama

        ▼

   AI Response
```

---

# 🛠 Recommended Models (16 GB RAM)

The following models provide excellent performance on a 16 GB development machine.

| Purpose | Model | RAM Usage |
|----------|------------------|-----------|
| General Chat | llama3.2:3b | ~2 GB |
| Coding | qwen2.5-coder:7b | ~5 GB |
| Reasoning | deepseek-r1:7b | ~5 GB |
| Lightweight | gemma3:4b | ~3 GB |
| Embeddings | nomic-embed-text | ~500 MB |

---

# 📦 Install Ollama

Download and install Ollama.

Verify installation:

```bash
ollama --version
```

Start Ollama:

```bash
ollama serve
```

---

# 📥 Download AI Models

```bash
ollama pull llama3.2:3b

ollama pull qwen2.5-coder:7b

ollama pull deepseek-r1:7b

ollama pull gemma3:4b

ollama pull nomic-embed-text
```

---

# 📋 List Installed Models

```bash
ollama list
```

Example output:

```text
NAME                    SIZE

llama3.2:3b             2.0 GB

qwen2.5-coder:7b        4.7 GB

deepseek-r1:7b          4.8 GB

gemma3:4b               3.1 GB

nomic-embed-text        274 MB
```

---

# 🌐 Ollama REST API

Default URL

```text
http://localhost:11434
```

Useful endpoints

| Method | Endpoint |
|----------|----------|
| GET | /api/tags |
| POST | /api/chat |
| POST | /api/generate |
| POST | /api/embed |

---

# 📁 Project Structure

```text
backend/

src/

├── ai/
│
├── prompts/
│
├── services/
│   ├── ollama.service.ts
│   ├── ai-router.service.ts
│   ├── prompt.service.ts
│   └── model.service.ts
│
├── controllers/
│
├── routes/
│
└── websocket/
```

---

# 🔄 AI Request Flow

```text
Chrome Extension

↓

Backend API

↓

AI Router

↓

Select Model

↓

Ollama

↓

Streaming Response

↓

Chrome Extension
```

---

# 🧠 AI Router

The AI Router decides which model should process the user's request.

Benefits:

- Better Performance
- Lower Memory Usage
- Faster Responses
- Easier Future Expansion

---

# 🎯 Model Selection Strategy

| Task | Model |
|------|-------|
| General Chat | llama3.2 |
| Coding | qwen2.5-coder |
| Debugging | qwen2.5-coder |
| Architecture | deepseek-r1 |
| Resume Review | llama3.2 |
| Documentation | llama3.2 |
| Embeddings | nomic-embed-text |

---

# 🔀 AI Router Flow

```text
User Prompt

↓

Intent Detection

↓

Task Classification

↓

Model Selection

↓

Prompt Builder

↓

Ollama

↓

AI Response
```

---

# 📝 Prompt Templates

Instead of sending raw prompts, create reusable prompt templates.

Examples:

## Chat Prompt

```text
You are a helpful AI assistant.
Answer clearly and concisely.
```

---

## Code Review Prompt

```text
Review the following code.

Identify:

- Bugs

- Security Issues

- Improvements

- Best Practices
```

---

## Kubernetes Prompt

```text
Explain the Kubernetes YAML.

Suggest improvements.

Identify security issues.
```

---

## Jenkins Prompt

```text
Review the Jenkins pipeline.

Suggest optimizations.

Find possible failures.
```

---

# ⚡ Streaming Responses

Streaming allows users to see the AI response as it is generated.

Benefits:

- Faster User Experience
- Better Responsiveness
- Lower Perceived Latency

Workflow:

```text
User

↓

WebSocket

↓

Backend

↓

Ollama

↓

Token Stream

↓

Chrome Extension
```

---

# 🧠 Memory Optimization (16 GB RAM)

Recommended approach:

- Load one large model at a time
- Use smaller models for general chat
- Unload unused models automatically
- Keep embedding model lightweight

Recommended configuration:

| Setting | Recommendation |
|----------|----------------|
| Active LLM | One at a time |
| Embedding Model | Always Available |
| Context Size | 4096 |
| Streaming | Enabled |

---

# 📊 AI Router Decision Table

| User Request | Selected Model |
|---------------|----------------|
| Explain JavaScript | qwen2.5-coder |
| Review Dockerfile | qwen2.5-coder |
| Explain Kubernetes | deepseek-r1 |
| Resume Review | llama3.2 |
| General Chat | llama3.2 |
| Create SQL Query | qwen2.5-coder |
| Generate README | llama3.2 |

---

# 🔒 Error Handling

Possible issues:

## Ollama Not Running

Solution:

```bash
ollama serve
```

---

## Model Not Installed

Solution:

```bash
ollama pull model-name
```

---

## Timeout

Increase request timeout.

---

## Out of Memory

Unload large models.

Use smaller models.

---

# 🧪 Testing

Verify the following:

- Ollama starts successfully
- Models are installed
- Backend connects to Ollama
- AI Router selects the correct model
- Streaming works
- Responses are returned correctly

---

# 🚀 Future Improvements

In upcoming chapters, we will enhance the AI Router with:

- Conversation Memory
- Prompt Library
- Function Calling
- MCP Tool Invocation
- RAG Integration
- Vector Search
- Multi-Agent Workflows

---

# 📁 Deliverables

By the end of this chapter, you will have:

- ✅ Ollama Installed
- ✅ Multiple Local AI Models
- ✅ AI Router
- ✅ Streaming Responses
- ✅ Prompt Templates
- ✅ Model Selection Logic
- ✅ Memory Optimization
- ✅ Reusable AI Services

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat: integrate Ollama with AI Router"

git push origin develop
```

---

# 📖 Summary

In this chapter, we integrated Ollama into the DevPilot AI backend and configured multiple local language models optimized for a 16 GB RAM machine. We designed an AI Router that automatically selects the best model based on the user's request, implemented prompt templates, enabled streaming responses, and established memory optimization strategies. This architecture provides a flexible and scalable foundation for upcoming features such as Retrieval-Augmented Generation (RAG), MCP server integration, and advanced AI workflows.

---

# ⏭ Next Chapter

## Chapter 5 – Model Context Protocol (MCP)

In the next chapter, we will:

- Understand the Model Context Protocol (MCP)
- Build an MCP Gateway
- Connect Filesystem MCP
- Integrate GitHub MCP
- Add Docker MCP
- Add Kubernetes MCP
- Enable secure tool discovery and execution
- Prepare DevPilot AI to interact with external developer tools