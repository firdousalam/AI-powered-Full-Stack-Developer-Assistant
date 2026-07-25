# Chapter 6 - Embeddings, ChromaDB & Retrieval-Augmented Generation (RAG)

> **Build an AI that can search, understand, and answer questions about your own code, documents, PDFs, Kubernetes manifests, Dockerfiles, and GitHub repositories using ChromaDB and Ollama.**

---

# 📖 Chapter Overview

Large Language Models (LLMs) are powerful, but they have one major limitation:

They **don't know anything about your private data** unless you provide it.

For example, if you ask:

> Explain my Kubernetes deployment.

The LLM has never seen your deployment YAML.

Instead of sending the entire project every time, we'll build a **Retrieval-Augmented Generation (RAG)** pipeline.

Our RAG system will:

- Read your project
- Split files into chunks
- Generate embeddings
- Store vectors in ChromaDB
- Perform semantic search
- Send only the most relevant chunks to Ollama

This makes responses:

- Faster
- More accurate
- Much cheaper
- Scalable

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Understand Embeddings
- Understand Vector Databases
- Install ChromaDB
- Generate Embeddings
- Index Local Projects
- Build a RAG Pipeline
- Perform Semantic Search
- Integrate RAG with Ollama
- Build Codebase Chat
- Build PDF Chat
- Build Documentation Chat

---

# 🤔 Why RAG?

Without RAG

```text
User

↓

LLM

↓

Answer
```

Problem:

The LLM only knows:

- Training Data
- User Prompt

It doesn't know:

- Your source code
- PDFs
- Internal documentation
- Kubernetes YAML
- Dockerfiles
- Jenkins Pipelines

---

With RAG

```text
User

↓

Embedding

↓

Vector Search

↓

Relevant Documents

↓

LLM

↓

Answer
```

Now the LLM answers using your own knowledge.

---

# 🏗 RAG Architecture

```text
                User

                 │

                 ▼

          Chrome Extension

                 │

                 ▼

          Node.js Backend

                 │

                 ▼

           AI Router

                 │

                 ▼

           RAG Service

                 │

      ┌──────────┼──────────────┐

      ▼                         ▼

Embedding Service         ChromaDB

      │                         ▲

      ▼                         │

nomic-embed-text        Similarity Search

      │

      ▼

Relevant Chunks

      │

      ▼

 Ollama (Qwen/Llama)

      │

      ▼

AI Response
```

---

# 🧠 What is an Embedding?

An embedding converts text into numbers.

Example:

```text
"Kubernetes"

↓

[0.22, 0.81, -0.14, ...]
```

Documents with similar meaning produce similar vectors.

Example

```text
Docker

↓

[0.23,0.84,-0.15]

Kubernetes

↓

[0.24,0.83,-0.16]
```

These vectors are very close together.

---

# 📦 Why ChromaDB?

ChromaDB is an open-source vector database designed for AI applications.

Advantages:

- Free
- Lightweight
- Docker Support
- LangChain Integration
- REST API
- Fast Similarity Search
- Easy Local Setup

Perfect for learning and local development.

---

# 🛠 Install ChromaDB

Using Docker:

```bash
docker run -d \
  --name chromadb \
  -p 8000:8000 \
  chromadb/chroma
```

Verify:

```text
http://localhost:8000
```

---

# 📂 Backend Folder Structure

```text
backend/

src/

├── rag/
│   ├── rag.service.ts
│   ├── retrieval.service.ts
│   └── ranking.service.ts
│
├── embeddings/
│   ├── embedding.service.ts
│   └── chunk.service.ts
│
├── vectordb/
│   ├── chromadb/
│   ├── repositories/
│   └── adapters/
│
├── indexing/
│   ├── file.indexer.ts
│   ├── pdf.indexer.ts
│   └── github.indexer.ts
│
└── prompts/
```

---

# 📚 Documents We Will Index

## Source Code

- JavaScript
- TypeScript
- Python
- Java
- Go
- C#

---

## Infrastructure

- Dockerfile
- docker-compose.yml
- Jenkinsfile
- Helm Charts
- Kubernetes YAML
- Terraform

---

## Documentation

- README
- Markdown
- Wiki
- Design Documents
- Architecture Documents

---

## PDFs

- Books
- Notes
- Resume
- Research Papers

---

## Logs

- Jenkins Logs
- Kubernetes Logs
- Docker Logs
- Application Logs

---

# 🔄 RAG Pipeline

```text
Project Files

↓

Read Files

↓

Split into Chunks

↓

Generate Embeddings

↓

Store in ChromaDB

↓

User Question

↓

Generate Question Embedding

↓

Similarity Search

↓

Top Matching Chunks

↓

Prompt Builder

↓

Ollama

↓

Final Answer
```

---

# 📖 Chunking Strategy

Large files must be split into smaller pieces.

Example

README.md

```text
5000 lines

↓

Chunk 1

Chunk 2

Chunk 3

Chunk 4
```

Recommended:

| Setting | Value |
|----------|-------|
| Chunk Size | 500-800 tokens |
| Chunk Overlap | 100 tokens |

---

# 🧠 Embedding Model

We'll use:

```text
nomic-embed-text
```

Install:

```bash
ollama pull nomic-embed-text
```

Generate embedding:

```text
Document

↓

Embedding Model

↓

Vector

↓

Store in ChromaDB
```

---

# 🔎 Semantic Search

Instead of keyword search:

```text
Docker

↓

Only finds "Docker"
```

Semantic Search:

```text
Container

↓

Docker

↓

Podman

↓

Container Runtime

↓

OCI
```

Much more powerful.

---

# 🧾 Metadata

Each chunk stores metadata.

Example

```json
{
  "file": "auth.service.ts",
  "language": "typescript",
  "module": "authentication",
  "chunk": 12
}
```

Benefits:

- Faster filtering
- Better search
- Source attribution

---

# 🗃 ChromaDB Collections

Recommended collections:

```text
codebase

documents

pdfs

kubernetes

docker

jenkins

github

architecture

resume
```

---

# 💬 Codebase Chat

Example

User:

```text
Explain auth.service.ts
```

Workflow

```text
Question

↓

Embedding

↓

Vector Search

↓

Top 10 Chunks

↓

Ollama

↓

Answer
```

---

# 📄 PDF Chat

Example

```text
Summarize Chapter 5
```

Workflow

```text
Upload PDF

↓

Extract Text

↓

Chunk

↓

Embeddings

↓

ChromaDB

↓

Chat
```

---

# 🐙 GitHub Repository Chat

Example

```text
Explain authentication flow
```

Workflow

```text
Repository

↓

Indexer

↓

Embeddings

↓

Vector DB

↓

Question

↓

Answer
```

---

# ☸ Kubernetes Chat

Example

```text
Why is my pod restarting?
```

Workflow

```text
Deployment YAML

↓

Embeddings

↓

Similarity Search

↓

LLM

↓

Answer
```

---

# 🐳 Docker Chat

Example

```text
Explain Dockerfile
```

Searches:

- Dockerfile
- Compose
- Build Logs

Returns an optimized explanation.

---

# 🤝 MCP + RAG

This is where everything comes together.

Example:

```text
Explain my project.
```

Workflow

```text
User

↓

Filesystem MCP

↓

Read Files

↓

Embedding Service

↓

ChromaDB

↓

Top Chunks

↓

Ollama

↓

Answer
```

---

# 📈 Indexing Workflow

```text
GitHub Repo

↓

Clone

↓

Read Files

↓

Chunk

↓

Embedding

↓

Vector DB
```

Can also index:

- Local Folder
- PDFs
- Markdown
- Documentation

---

# ⚡ Performance Tips

For a 16 GB RAM machine:

- Use `nomic-embed-text`
- Index only changed files
- Batch embeddings
- Cache vectors
- Reuse ChromaDB collections
- Limit retrieval to Top 5-10 chunks

---

# 🧪 Testing

Verify:

- ChromaDB is running
- Embeddings are generated
- Files are indexed
- Similarity search returns results
- Ollama receives relevant context
- AI answers are based on indexed data

---

# 🐞 Common Issues

## ChromaDB Not Running

Solution:

```bash
docker start chromadb
```

---

## No Search Results

Possible causes:

- Collection is empty
- Documents not indexed
- Wrong embedding model

---

## Poor Answers

Possible causes:

- Chunk size too large
- Wrong prompt
- Too many retrieved chunks

---

## Slow Indexing

Solution:

- Batch processing
- Incremental indexing
- Skip binary files

---

# 🚀 Future Enhancements

In later chapters, we'll add:

- Incremental Indexing
- Hybrid Search (Keyword + Vector)
- Re-ranking Models
- Conversation Memory
- Multi-Repository Search
- Multi-Collection Search
- Cloud Vector Databases (Qdrant)

---

# 📁 Deliverables

By the end of this chapter, you will have:

- ✅ ChromaDB Installed
- ✅ Embedding Service
- ✅ Chunking Service
- ✅ Vector Storage
- ✅ Semantic Search
- ✅ Codebase Chat
- ✅ PDF Chat
- ✅ GitHub Repository Chat
- ✅ Kubernetes Documentation Chat
- ✅ Docker Documentation Chat
- ✅ Complete RAG Pipeline

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat: implement RAG pipeline using ChromaDB and Ollama embeddings"

git push origin develop
```

---

# 📖 Summary

In this chapter, we built the Retrieval-Augmented Generation (RAG) layer for DevPilot AI. We introduced embeddings, installed ChromaDB, created an indexing pipeline, generated vector embeddings using `nomic-embed-text`, and implemented semantic search. By combining ChromaDB with Ollama, the AI can now answer questions using private source code, PDFs, documentation, Kubernetes manifests, Dockerfiles, and GitHub repositories. This significantly improves the accuracy and usefulness of the assistant while keeping all data local.

---

# ⏭ Next Chapter

## Chapter 7 – AI Productivity Features

In the next chapter, we will build the user-facing AI features that make DevPilot AI a complete developer assistant, including:

- Prompt Library
- Chat History
- Bookmarks
- Favorites
- Resume Review
- Job Description Analyzer
- Interview Question Generator
- Code Review Assistant
- Architecture Generator
- Documentation Generator
- Multi-Model Chat Experience