# Chapter 5 - Model Context Protocol (MCP)

> **Integrate Model Context Protocol (MCP) into DevPilot AI to securely connect AI models with developer tools, local resources, and external services.**

---

# 📖 Chapter Overview

Until now, our AI assistant can answer questions using local LLMs running on Ollama.

However, an AI model cannot directly:

- Read your local files
- Access Git repositories
- Execute Docker commands
- Inspect Kubernetes clusters
- Analyze Jenkins pipelines
- Read PDFs
- Query databases

This is where **Model Context Protocol (MCP)** comes in.

MCP acts as a secure bridge between AI models and external tools.

By the end of this chapter, DevPilot AI will be able to communicate with multiple MCP servers and securely use tools to answer user requests.

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Understand Model Context Protocol (MCP)
- Build an MCP Gateway
- Connect multiple MCP Servers
- Invoke tools dynamically
- Secure tool execution
- Connect Ollama with MCP
- Design scalable MCP architecture
- Prepare the application for RAG integration

---

# 🤖 What is MCP?

Model Context Protocol (MCP) is an open protocol that allows AI models to communicate with external applications through standardized tools.

Instead of giving an LLM direct access to your computer, MCP provides a secure and structured interface.

Think of MCP as:

```text
LLM

↓

MCP Client

↓

MCP Server

↓

Tool

↓

Result

↓

LLM
```

---

# 🚀 Why Use MCP?

Without MCP:

```text
User

↓

LLM

↓

Answer (Limited Knowledge)
```

The AI only knows:

- Training Data
- Prompt
- Conversation History

It cannot interact with your local environment.

---

With MCP:

```text
User

↓

LLM

↓

MCP

↓

Developer Tools

↓

Real-Time Data

↓

LLM

↓

Answer
```

Now the AI can:

- Read source code
- Search repositories
- Execute Docker commands
- Inspect Kubernetes clusters
- Analyze Jenkins pipelines
- Search PDFs
- Read Markdown
- Access databases

---

# 🏗 MCP Architecture

```text
                  Chrome Extension

                         │

                         ▼

                  Node.js Backend

                         │

                  AI Router Service

                         │

                  MCP Gateway

                         │

      ┌──────────────────┼───────────────────┐

      ▼                  ▼                   ▼

Filesystem MCP      GitHub MCP        Docker MCP

      ▼                  ▼                   ▼

 Local Files       Git Repository      Containers

                         │

      ┌──────────────────┼───────────────────┐

      ▼                  ▼                   ▼

 Kubernetes MCP      Jenkins MCP      PDF MCP

      ▼

   Local Cluster

                         │

                         ▼

                     Ollama
```

---

# 📦 MCP Components

## MCP Client

Responsible for:

- Sending requests
- Discovering tools
- Receiving responses

In our project:

```text
Node.js Backend
```

acts as the MCP Client.

---

## MCP Server

Responsible for:

- Registering tools
- Executing tools
- Returning structured responses

Examples:

- Filesystem MCP
- Docker MCP
- GitHub MCP

---

## Tool

A Tool is simply a function.

Examples:

```text
readFile()

searchRepository()

listContainers()

kubectlGetPods()

gitStatus()
```

---

# 📂 Project Structure

```text
backend/

src/

├── mcp/
│
├── gateway/
│   └── mcp.gateway.ts
│
├── clients/
│   └── mcp.client.ts
│
├── servers/
│   ├── filesystem/
│   ├── github/
│   ├── docker/
│   ├── kubernetes/
│   ├── jenkins/
│   └── pdf/
│
├── tools/
│
├── services/
│
└── routes/
```

---

# 🔄 MCP Workflow

```text
User

↓

Chrome Extension

↓

Backend

↓

AI Router

↓

MCP Gateway

↓

Filesystem MCP

↓

Read File

↓

Result

↓

LLM

↓

Final Answer
```

---

# 🔌 MCP Gateway

The MCP Gateway is the central component responsible for managing all MCP servers.

Responsibilities:

- Tool Discovery
- Tool Selection
- Authentication
- Error Handling
- Logging
- Tool Execution
- Response Formatting

---

# 🗂 Supported MCP Servers

## 1. Filesystem MCP

Purpose:

Read local project files.

Supported Operations:

- Read File
- List Directory
- Search Files
- Search Text

Example:

```text
Explain auth.service.ts
```

---

## 2. GitHub MCP

Purpose:

Access Git repositories.

Operations:

- List Repositories
- Read README
- Search Files
- Pull Requests
- Issues

Example:

```text
Summarize this repository.
```

---

## 3. Docker MCP

Purpose:

Interact with Docker.

Operations:

- List Containers
- Images
- Logs
- Docker Compose

Example:

```text
Show all running containers.
```

---

## 4. Kubernetes MCP

Purpose:

Manage Kubernetes.

Operations:

- Pods
- Deployments
- Services
- Ingress
- Logs
- Events

Example:

```text
Explain why my pod is crashing.
```

---

## 5. Jenkins MCP

Purpose:

Interact with Jenkins.

Operations:

- Pipelines
- Builds
- Console Logs
- Build Status

Example:

```text
Why did my pipeline fail?
```

---

## 6. PDF MCP

Purpose:

Read PDF documents.

Operations:

- Extract Text
- Search
- Summarize

Example:

```text
Explain Chapter 4.
```

---

# 🧠 AI + MCP Flow

```text
User Question

↓

Intent Detection

↓

Need Tool?

↓

Yes

↓

MCP Gateway

↓

Execute Tool

↓

Tool Result

↓

LLM

↓

Answer
```

---

# 🎯 Tool Selection

Examples:

| User Prompt | Tool |
|-------------|------|
| Explain Dockerfile | Filesystem MCP |
| Show Git commits | GitHub MCP |
| List Docker containers | Docker MCP |
| Explain Kubernetes YAML | Filesystem MCP |
| Why is Jenkins failing? | Jenkins MCP |
| Explain this PDF | PDF MCP |

---

# 🔐 Security

Security is critical.

Never allow unrestricted execution.

Allowed:

- Read Files
- List Files
- Search Files
- Read Logs
- Git Operations

Restricted:

- Delete Files
- Format Disk
- Execute Unknown Scripts
- Remove Containers
- Delete Kubernetes Resources

---

# 🧾 Tool Registration

Each MCP Server registers its available tools.

Example:

```text
Filesystem MCP

├── read_file

├── search_files

├── list_directory

└── file_metadata
```

---

# ⚡ Dynamic Tool Discovery

Instead of hardcoding tools:

```text
Backend

↓

Discover Tools

↓

Cache Tool List

↓

Execute Selected Tool
```

Benefits:

- Easily add new MCP servers
- No backend code changes
- Better scalability

---

# 📡 Request Lifecycle

```text
Chrome Extension

↓

REST API

↓

Authentication

↓

AI Router

↓

MCP Gateway

↓

Tool Execution

↓

Result

↓

Prompt Builder

↓

Ollama

↓

Response

↓

Chrome Extension
```

---

# 🧪 Testing

Verify:

- MCP Gateway starts
- Filesystem MCP connects
- Docker MCP works
- GitHub MCP works
- Kubernetes MCP connects
- Tool discovery succeeds
- Tool execution succeeds
- AI receives tool responses

---

# 🐞 Common Issues

## MCP Server Offline

Solution:

Start the server.

---

## Tool Not Found

Solution:

Refresh tool discovery.

---

## Permission Denied

Solution:

Verify filesystem permissions.

---

## Docker Connection Failed

Solution:

Verify Docker Desktop is running.

---

## Kubernetes Connection Failed

Solution:

Check kubeconfig.

```bash
kubectl config current-context
```

---

# 🚀 Future MCP Servers

As DevPilot AI grows, we can add more servers.

Examples:

- Jira MCP
- Confluence MCP
- PostgreSQL MCP
- MySQL MCP
- Redis MCP
- AWS MCP
- Azure MCP
- GCP MCP
- Slack MCP
- Gmail MCP
- Notion MCP

No changes to the AI Router will be required because the MCP Gateway supports dynamic tool discovery.

---

# 📁 Deliverables

By the end of this chapter, you will have:

- ✅ MCP Gateway
- ✅ MCP Client
- ✅ Filesystem MCP
- ✅ GitHub MCP
- ✅ Docker MCP
- ✅ Kubernetes MCP
- ✅ Jenkins MCP
- ✅ Dynamic Tool Discovery
- ✅ Secure Tool Execution
- ✅ AI + MCP Integration

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat: integrate Model Context Protocol (MCP) gateway"

git push origin develop
```

---

# 📖 Summary

In this chapter, we introduced the Model Context Protocol (MCP) and integrated it into the DevPilot AI architecture. We built an MCP Gateway to connect the AI Router with multiple MCP servers, enabling the AI to securely access local files, GitHub repositories, Docker, Kubernetes, Jenkins, and PDF documents. This architecture provides a standardized and extensible way for the AI to interact with external tools while maintaining security and scalability.

---

# ⏭ Next Chapter

## Chapter 6 – Embeddings, ChromaDB & Retrieval-Augmented Generation (RAG)

In the next chapter, we will build the intelligence layer of DevPilot AI by:

- Understanding Embeddings
- Installing ChromaDB
- Generating Vector Embeddings
- Building the RAG Pipeline
- Implementing Semantic Search
- Indexing Source Code and Documents
- Chatting with PDFs and Codebases
- Preparing the platform for enterprise-scale AI search