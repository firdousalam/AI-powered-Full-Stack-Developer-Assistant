# Episode 3 – Ollama Integration (05-AI-Architecture.md)
🎯 Goal

Connect the backend to Ollama and introduce an AI Router so different local models can be used based on the task.

# Architecture
# Chrome Extension

↓

# Backend

↓

AI Router

├── Llama 3.2

├── Qwen2.5-Coder

├── Gemma 3

├── DeepSeek R1

↓

# Ollama
AI Router
User Prompt

↓

Intent Detection

↓

Coding?

↓

Qwen

--------------------

Chat?

↓

Llama

--------------------

Reasoning?

↓

DeepSeek

--------------------

Documents?

↓

Gemma
Ollama Models
Model	Purpose
llama3.2:3b	Chat
qwen2.5-coder:7b	Coding
gemma3:4b	Documents
deepseek-r1:7b	Reasoning
nomic-embed-text	Embeddings
Backend Modules
ai/

providers/

router/

prompts/

stream/

embeddings/

utils/
Prompt Types
Explain Code
Debug
Kubernetes
Docker
Jenkins
AWS
Azure
Resume Review
Interview Questions
Deliverables
Ollama integration
Streaming responses
AI Router
Model selection
Prompt templates