# Milestone 4.2 – Download AI Models

> 🎥 **Episode 4.2**

## 🎯 Goal

Download multiple Local Large Language Models (LLMs) using Ollama, compare their capabilities, understand hardware requirements, and prepare the backend for intelligent model selection using the AI Router.

---

# 📖 Introduction

One of the biggest advantages of **Ollama** is its ability to run multiple AI models locally on your machine without requiring internet access or paid API subscriptions.

Unlike cloud AI providers, Ollama allows you to:

- Download multiple models
- Switch between models instantly
- Compare outputs
- Run coding-specific models
- Run chat-specific models
- Keep all data private

By the end of this milestone, you will have several AI models installed locally and understand which model should be used for different developer tasks.

---

# 🎯 Learning Objectives

After completing this milestone, you will be able to:

- Download AI models from Ollama
- Understand different model categories
- Compare coding vs chat models
- Monitor RAM usage
- Manage installed models
- Remove unused models
- Test model responses
- Prepare models for the AI Router

---

# 🏗 Architecture

```text
             Ollama

                │

      Download AI Models

                │

      ┌─────────┼─────────┐

      ▼         ▼         ▼

  Chat LLM   Code LLM   Embedding

      │         │         │

      ▼         ▼         ▼

   Backend AI Router
```

---

# 📦 Understanding AI Models

Different AI models are optimized for different purposes.

| Model Type | Purpose |
|------------|---------|
| Chat Model | General conversation |
| Code Model | Programming assistance |
| Reasoning Model | Complex problem solving |
| Embedding Model | Semantic search and RAG |
| Lightweight Model | Fast responses with low RAM usage |

---

# 💻 Recommended Models (16 GB RAM)

These models provide an excellent balance between quality and performance.

| Purpose | Model | Approx. RAM |
|---------|--------|-------------|
| General Chat | llama3.2:3b | ~2 GB |
| Coding | qwen2.5-coder:7b | ~5 GB |
| Reasoning | deepseek-r1:7b | ~5 GB |
| Lightweight | gemma3:4b | ~3 GB |
| Embeddings | nomic-embed-text | ~500 MB |

---

# 📥 Download Your First Model

Download the Llama 3.2 model.

```bash
ollama pull llama3.2:3b
```

Example output

```text
pulling manifest...

pulling layers...

verifying checksum...

writing manifest...

success
```

---

# 📥 Download Coding Model

Install Qwen Coder.

```bash
ollama pull qwen2.5-coder:7b
```

This model is highly optimized for:

- JavaScript
- TypeScript
- React
- Node.js
- Docker
- Kubernetes
- SQL
- Python
- DevOps

---

# 📥 Download DeepSeek

```bash
ollama pull deepseek-r1:7b
```

Ideal for:

- Architecture Design
- Debugging
- System Design
- Complex Reasoning

---

# 📥 Download Gemma

```bash
ollama pull gemma3:4b
```

Ideal for:

- Lightweight AI
- Quick Chat
- Documentation
- Small memory footprint

---

# 📥 Download Embedding Model

```bash
ollama pull nomic-embed-text
```

This model is used for:

- Semantic Search
- RAG
- Vector Database
- Similarity Search

---

# 📋 View Installed Models

List all downloaded models.

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

# 🧪 Test a Model

Run an interactive session.

```bash
ollama run llama3.2:3b
```

Example

```text
>>> Explain Docker in simple terms.
```

AI Response

```text
Docker is a containerization platform that allows applications to run consistently across different environments...
```

Exit the interactive chat

```text
/bye
```

or

```bash
Ctrl + D
```

---

# 🧪 Test the Coding Model

```bash
ollama run qwen2.5-coder:7b
```

Example prompt

```text
Write a Node.js Express API.
```

The model should generate production-ready code.

---

# 🧪 Test the Reasoning Model

```bash
ollama run deepseek-r1:7b
```

Example

```text
Design a scalable microservice architecture.
```

Observe how reasoning-focused models provide more structured answers.

---

# 🧠 Compare Model Performance

Try the same prompt with different models.

Prompt

```text
Explain Docker Compose.
```

| Model | Strength |
|--------|----------|
| llama3.2 | Simple explanation |
| qwen2.5-coder | Developer-focused explanation |
| deepseek-r1 | Deep architectural reasoning |
| gemma3 | Fast concise response |

This comparison helps determine which model should be selected automatically by the AI Router.

---

# 🗑 Remove an Unused Model

If disk space becomes limited, remove a model.

```bash
ollama rm gemma3:4b
```

Verify

```bash
ollama list
```

---

# 📊 Check Running Models

View currently loaded models.

```bash
ollama ps
```

Example

```text
NAME                PROCESSOR

llama3.2:3b         100% GPU
```

or

```text
NAME                PROCESSOR

llama3.2:3b         CPU
```

---

# 📊 Check Available Models Online

Search available models.

```bash
ollama search llama
```

Or browse

https://ollama.com/library

Popular models include:

- Llama
- Qwen
- Gemma
- DeepSeek
- Mistral
- Phi
- CodeLlama
- TinyLlama

---

# 📦 Recommended Development Setup

For a typical 16 GB RAM development machine:

| Component | Recommendation |
|-----------|----------------|
| Chat Model | llama3.2:3b |
| Code Model | qwen2.5-coder:7b |
| Reasoning | deepseek-r1:7b |
| Embedding | nomic-embed-text |
| Active Models | 1–2 at a time |

---

# 🧠 Model Selection Strategy

The AI Router will eventually select models automatically.

| User Request | Selected Model |
|--------------|----------------|
| General Chat | llama3.2 |
| Explain JavaScript | qwen2.5-coder |
| Generate Dockerfile | qwen2.5-coder |
| Kubernetes YAML Review | deepseek-r1 |
| Resume Review | llama3.2 |
| README Generation | llama3.2 |
| Semantic Search | nomic-embed-text |

---

# ⚠ Common Issues

## Download Fails

Check internet connectivity.

Retry:

```bash
ollama pull llama3.2:3b
```

---

## Model Not Found

Ensure the model name is correct.

View available models:

```bash
ollama search
```

or visit:

https://ollama.com/library

---

## Out of Memory

Symptoms:

- Slow response
- System freezes
- Model exits unexpectedly

Solutions:

- Close unused applications
- Run only one large model at a time
- Remove unused models
- Choose a smaller model

---

## Ollama Not Running

Check service status.

```bash
ollama ps
```

If not running:

```bash
ollama serve
```

> **Note:** On Windows, if Ollama Desktop is already running in the system tray, `ollama serve` may display:
>
> ```text
> Error: listen tcp 127.0.0.1:11434: bind: Only one usage of each socket address...
> ```
>
> This is expected because the Ollama server is already running.

---

# 🧪 Verification Checklist

Verify each of the following:

- ✅ Ollama installed successfully
- ✅ Multiple AI models downloaded
- ✅ `ollama list` displays installed models
- ✅ `ollama run` works
- ✅ AI responses generated locally
- ✅ Disk space verified
- ✅ RAM usage understood
- ✅ Models ready for backend integration

---

# 📁 Deliverables

By the end of this milestone, you will have:

- ✅ Multiple Local AI Models
- ✅ Coding Model
- ✅ Chat Model
- ✅ Reasoning Model
- ✅ Embedding Model
- ✅ Model Comparison Knowledge
- ✅ RAM Usage Understanding
- ✅ Models Ready for AI Router

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): download and configure local ai models"

git push origin develop
```

---

# 📖 Summary

In this milestone, you installed multiple local AI models using Ollama and explored their strengths for different development tasks. You learned how to download, test, list, and remove models while understanding their memory requirements and performance characteristics. This provides the foundation for building an AI Router that automatically selects the most appropriate model based on the user's request.

---

# ⏭ Next Milestone

## Milestone 4.3 – Ollama REST API Integration

In the next milestone, you will:

- Understand the Ollama REST API
- Connect the Node.js backend to Ollama
- Call `/api/chat` and `/api/generate`
- Handle streaming and non-streaming responses
- Build the first real AI-powered backend endpoint
```