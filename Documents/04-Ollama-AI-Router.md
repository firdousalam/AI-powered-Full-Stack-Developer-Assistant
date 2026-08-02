# Chapter 4 – Ollama Integration & AI Router

> **Build Local AI using Ollama, Multiple LLMs, Streaming Responses & AI Router**

---

# 📖 Chapter Overview

In this chapter, we will transform the Zeba AI backend into a fully functional AI-powered backend by integrating **Ollama**, an open-source framework for running Large Language Models (LLMs) locally.

Unlike cloud-based AI providers that require API keys and usage charges, Ollama enables developers to run AI models directly on their own machines, providing complete privacy, offline capabilities, and zero API costs.

To make our application intelligent and scalable, we will also build an **AI Router**, which automatically selects the most appropriate AI model based on the user's request.

Rather than sending every prompt to the same model, the AI Router will classify the request, choose the best model, apply the correct prompt template, and return the generated response.

By the end of this chapter, our backend will support multiple local AI models, intelligent model routing, streaming AI responses, reusable prompt templates, and memory optimization techniques.

This architecture also lays the foundation for future chapters involving Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), vector databases, and multi-agent AI workflows.

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Install and configure Ollama
- Understand how local LLMs work
- Download and manage multiple AI models
- Integrate Ollama with a Node.js backend
- Build an AI Router
- Route requests to different AI models
- Create reusable prompt templates
- Implement streaming AI responses
- Optimize AI memory usage
- Build reusable AI service classes
- Prepare the backend for RAG and MCP

---

# 🤖 What is Ollama?

Ollama is an open-source platform that enables developers to run modern Large Language Models directly on their local machines without relying on cloud providers.

Instead of sending sensitive data to external APIs, all processing happens locally, giving developers complete control over their AI environment.

### Advantages of Ollama

- ✅ Completely Free
- ✅ No API Keys Required
- ✅ Offline AI
- ✅ Privacy Focused
- ✅ Local Execution
- ✅ Fast Response Time
- ✅ Multiple Models
- ✅ REST API Support
- ✅ Streaming Responses
- ✅ Cross Platform (Windows, Linux, macOS)

---

# 🏗 Chapter Architecture

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

                        │

                        ▼

                     Ollama

                        │

                        ▼

                  AI Response
```

---

# 📚 Chapter Milestones

This chapter is divided into **10 practical milestones**, with each milestone producing a working feature that can be tested independently and committed to Git.

| Milestone | Episode | Topic |
|-----------|---------|------|
| 4.1 | Ollama Setup | Install & Configure Ollama |
| 4.2 | Models | Download & Manage AI Models |
| 4.3 | Ollama Service | Connect Node.js to Ollama |
| 4.4 | AI Router | Intelligent Model Selection |
| 4.5 | Prompt Templates | Reusable Prompt Engineering |
| 4.6 | Streaming | Streaming AI Responses |
| 4.7 | Model Management | Memory Optimization |
| 4.8 | Multi Model Support | Dynamic Model Switching |
| 4.9 | Chrome Extension Integration | Real AI Responses |
| 4.10 | Production Ready | Complete AI Backend |

---

# 🛠 Recommended AI Models (16 GB RAM)

The following models provide an excellent balance between speed, quality, and memory consumption on a 16 GB development machine.

| Purpose | Model | Approx. RAM |
|----------|---------------------|-------------|
| General Chat | llama3.2:3b | ~2 GB |
| Coding | qwen2.5-coder:7b | ~5 GB |
| Reasoning | deepseek-r1:7b | ~5 GB |
| Lightweight Chat | gemma3:4b | ~3 GB |
| Embeddings | nomic-embed-text | ~500 MB |

---

# 📦 Install Ollama

Download Ollama from the official website.

After installation, verify it is available.

```bash
ollama --version
```

Expected Output

```text
ollama version x.x.x
```

Start the Ollama server.

```bash
ollama serve
```

---

# 📥 Download AI Models

Download the required models.

```bash
ollama pull llama3.2:3b

ollama pull qwen2.5-coder:7b

ollama pull deepseek-r1:7b

ollama pull gemma3:4b

ollama pull nomic-embed-text
```

Depending on your internet connection, downloads may take several minutes.

---

# 📋 List Installed Models

Verify installed models.

```bash
ollama list
```

Example

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

Default Base URL

```text
http://localhost:11434
```

Common Endpoints

| Method | Endpoint | Purpose |
|---------|----------|----------|
| GET | /api/tags | List Models |
| POST | /api/chat | Chat |
| POST | /api/generate | Text Generation |
| POST | /api/embed | Generate Embeddings |

---

# 📁 Backend Folder Structure

```text
backend/

src/

├── ai/
│
├── prompts/
│
├── providers/
│
├── services/
│     ollama.service.ts
│     ai-router.service.ts
│     prompt.service.ts
│     model.service.ts
│
├── controllers/
│
├── routes/
│
├── websocket/
│
└── utils/
```

---

# 🔄 AI Request Flow

```text
Chrome Extension

↓

Background Worker

↓

Node.js Backend

↓

AI Router

↓

Model Selection

↓

Prompt Builder

↓

Ollama

↓

Streaming Response

↓

Chrome Extension
```

---

# 🧠 AI Router

The AI Router acts as the intelligence layer of the backend.

Instead of always using the same LLM, the router analyzes the incoming request and determines which model should process it.

This improves:

- Performance
- Accuracy
- Response Speed
- Memory Usage
- Future Scalability

---

# 🎯 Model Selection Strategy

| User Task | Selected Model |
|------------|----------------|
| General Chat | llama3.2 |
| Documentation | llama3.2 |
| Resume Review | llama3.2 |
| Code Generation | qwen2.5-coder |
| Debugging | qwen2.5-coder |
| Docker Review | qwen2.5-coder |
| Kubernetes | deepseek-r1 |
| System Design | deepseek-r1 |
| Embeddings | nomic-embed-text |

---

# 🔀 AI Router Decision Flow

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

Instead of sending raw prompts, we'll build reusable prompt templates.

### Chat Prompt

```text
You are a helpful AI assistant.

Answer clearly and concisely.
```

---

### Code Review Prompt

```text
Review the following code.

Identify:

• Bugs

• Security Issues

• Improvements

• Best Practices
```

---

### Kubernetes Prompt

```text
Explain the Kubernetes YAML.

Suggest improvements.

Identify security issues.
```

---

### Jenkins Prompt

```text
Review the Jenkins Pipeline.

Suggest optimizations.

Find possible failures.
```

---

# ⚡ Streaming Responses

Instead of waiting for the entire response, Ollama can stream tokens as they are generated.

Benefits

- Faster perceived performance
- Better user experience
- Progressive rendering
- Reduced waiting time

Streaming Flow

```text
User

↓

Chrome Extension

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

# 🧠 Memory Optimization

Running multiple AI models simultaneously can consume a large amount of RAM.

Recommended configuration for a 16 GB machine:

| Setting | Recommendation |
|----------|----------------|
| Active LLM | One at a time |
| Embedding Model | Always Loaded |
| Context Size | 4096 |
| Streaming | Enabled |
| Auto Unload | Enabled |

Best Practices

- Load only one large model.
- Use lightweight models for general chat.
- Keep embedding models permanently available.
- Unload unused models automatically.

---

# 📊 AI Router Decision Table

| User Prompt | Selected Model |
|-------------|----------------|
| Explain JavaScript | qwen2.5-coder |
| Review Dockerfile | qwen2.5-coder |
| Explain Kubernetes | deepseek-r1 |
| Generate README | llama3.2 |
| Resume Review | llama3.2 |
| SQL Query | qwen2.5-coder |
| General Chat | llama3.2 |

---

# 🔒 Error Handling

Possible Issues

### Ollama Not Running

Solution

```bash
ollama serve
```

---

### Model Missing

```bash
ollama pull model-name
```

---

### Timeout

Increase backend timeout configuration.

---

### Out of Memory

- Unload inactive models
- Use smaller LLMs
- Reduce context size

---

# 🧪 Testing Checklist

Verify each of the following:

- ✅ Ollama starts successfully
- ✅ Models download correctly
- ✅ Backend connects to Ollama
- ✅ AI Router selects the correct model
- ✅ Prompt templates work
- ✅ Streaming responses function correctly
- ✅ Chrome Extension receives AI responses
- ✅ Memory optimization behaves as expected

---

# 🚀 Future Enhancements

The AI Router built in this chapter will become the foundation for future AI capabilities.

Upcoming improvements include:

- Conversation Memory
- Prompt Library
- Function Calling
- Model Context Protocol (MCP)
- Retrieval-Augmented Generation (RAG)
- Vector Databases
- Multi-Agent Systems
- Tool Invocation
- Long-Term Memory

---

# 📁 Chapter Deliverables

By the end of Chapter 4, you will have:

- ✅ Ollama Installed
- ✅ Multiple Local AI Models
- ✅ AI Router
- ✅ Intelligent Model Selection
- ✅ Streaming Responses
- ✅ Prompt Templates
- ✅ Memory Optimization
- ✅ Multi-Model Architecture
- ✅ Reusable AI Services
- ✅ Chrome Extension Connected to Real AI

---

# 💾 Git Commit

```bash
git add .

git commit -m "feat(ai): integrate Ollama with AI Router"

git push origin develop
```

---

# 📖 Chapter Summary

In this chapter, you transformed the Zeba AI backend into a powerful local AI platform by integrating Ollama and multiple Large Language Models. You built an intelligent AI Router capable of selecting the best model for each request, implemented reusable prompt templates, enabled streaming responses, and optimized memory usage for a 16 GB development machine.

The architecture is now modular, scalable, and ready for advanced AI features such as Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), vector search, and multi-agent workflows.

---

# ⏭ Next Chapter

## Chapter 5 – Model Context Protocol (MCP)

In the next chapter, you will:

- Learn the Model Context Protocol (MCP)
- Build an MCP Gateway
- Integrate Filesystem MCP
- Connect GitHub MCP
- Add Docker MCP
- Add Kubernetes MCP
- Enable secure tool discovery
- Execute external developer tools
- Prepare Zeba AI for real-world developer automation

By the end of Chapter 5, Zeba AI will evolve from a conversational AI assistant into an intelligent developer platform capable of interacting with real development tools and environments.