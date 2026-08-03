# 📘 Chapter 5 – Model Context Protocol (MCP)

> **Build AI Agents with MCP, Tool Calling & External Developer Tools**

---

# 🎯 Chapter Goal

In this chapter, we will transform **Zeba AI** from a chatbot into a real **AI Agent**.

Until now, the AI could only answer questions using its internal knowledge.

After completing this chapter, it will be able to:

- 📂 Read local files
- 📊 Analyze complete software projects
- 📥 Clone Git repositories
- 🐙 Read and analyze GitHub repositories
- 🐳 Inspect Docker containers
- ☸️ Monitor Kubernetes clusters
- 🛠 Execute developer tools
- 🔍 Discover available tools automatically
- 🔐 Execute tools securely

This is exactly how modern AI assistants such as **Cursor**, **Claude Desktop**, **GitHub Copilot Agent**, and **Windsurf** interact with external developer tools.

---

# 🎥 Chapter Roadmap

| Episode | Milestone | Goal |
|----------|-----------|------|
| **5.1** | Introduction to MCP | Understand MCP concepts and architecture |
| **5.2** | MCP Gateway | Build an MCP Gateway and Tool Registry |
| **5.3** | MCP Client | Connect the backend to MCP servers |
| **5.4** | Tool Discovery | Discover available tools dynamically |
| **5.5** | Filesystem MCP | Read, search and analyze local files |
| **5.6** | GitHub MCP | Analyze repositories, commits, issues and pull requests |
| **5.7** | Docker MCP | Inspect containers, images, logs and networks |
| **5.8** | Kubernetes MCP | Query pods, deployments, services and namespaces |
| **5.9** | Git MCP | Branches, commits, history, diff and blame |
| **5.10** | Multi-Tool AI Agent | Intelligent tool routing and production-ready architecture |

---

# 📂 Milestone 5.1 – Introduction to MCP

## 🎥 Episode 5.1

## Goal

Learn what **Model Context Protocol (MCP)** is, why it exists, and how AI assistants communicate with external developer tools.

---

## Topics Covered

- What is MCP?
- Why LLMs need external tools
- MCP Components
- MCP Client vs MCP Server
- Transport Layer
- JSON-RPC Communication
- Tool Execution Flow
- Security Model

---

## Architecture

```text
Chrome Extension

        │

        ▼

Node.js Backend

        │

        ▼

MCP Client

        │

        ▼

MCP Server

        │

 ┌──────┼──────────┬──────────┐
 ▼      ▼          ▼          ▼

Filesystem GitHub Docker Kubernetes
```

---

## Deliverables

- ✅ Understanding MCP
- ✅ MCP Terminology
- ✅ Overall Architecture

---

# 📂 Milestone 5.2 – MCP Gateway

## 🎥 Episode 5.2

## Goal

Build an **MCP Gateway** responsible for managing multiple MCP servers.

---

## Topics Covered

- Gateway Pattern
- Server Registry
- Dynamic Registration
- Health Checking
- Connection Lifecycle
- Configuration Management

---

## Build

```text
src/mcp/

├── gateway.ts
├── registry.ts
├── types.ts
└── config.ts
```

---

## Deliverables

- ✅ MCP Gateway
- ✅ Server Registry
- ✅ Health Monitoring

---

# 📂 Milestone 5.3 – MCP Client

## 🎥 Episode 5.3

## Goal

Build a reusable MCP Client capable of communicating with any MCP Server.

---

## Topics Covered

- MCP Client
- JSON-RPC Protocol
- Request / Response Lifecycle
- Asynchronous Communication
- Error Handling
- Request Timeouts

---

## Build Flow

```text
MCP Client

      │

      ▼

Connect()

      │

      ▼

Discover Tools()

      │

      ▼

Execute Tool()
```

---

## Deliverables

- ✅ Generic MCP Client
- ✅ JSON-RPC Implementation
- ✅ Connection Manager

---

# 📂 Milestone 5.4 – Tool Discovery

## 🎥 Episode 5.4

## Goal

Automatically discover tools exposed by connected MCP servers.

---

## Topics Covered

- Tool Discovery
- Tool Metadata
- Tool Parameters
- Validation
- Dynamic Loading
- Tool Registry

---

## Build Flow

```text
Filesystem Server

        │

        ▼

list_tools

        │

        ▼

Backend

        │

        ▼

Tool Registry
```

---

## Deliverables

- ✅ Tool Discovery
- ✅ Dynamic Tool Registry
- ✅ Tool Metadata

---

# 📂 Milestone 5.5 – Filesystem MCP

## 🎥 Episode 5.5

## Goal

Allow Zeba AI to analyze and interact with local files.

---

## Topics Covered

- Read File
- Write File
- Search Files
- Delete Files
- Directory Listing
- Project Analysis

---

## Architecture

```text
AI

↓

Filesystem MCP

↓

Project Folder
```

---

## Deliverables

- ✅ Local File Analysis
- ✅ Project Structure Analysis
- ✅ Source Code Reading

---

# 📂 Milestone 5.6 – GitHub MCP

## 🎥 Episode 5.6

## Goal

Connect Zeba AI to GitHub repositories.

---

## Topics Covered

- Repository Analysis
- Pull Requests
- Issues
- Branches
- Commits
- Contributors

---

## Architecture

```text
AI

↓

GitHub MCP

↓

GitHub API
```

---

## Deliverables

- ✅ Repository Analysis
- ✅ Pull Request Review
- ✅ Commit History
- ✅ Issue Summary

---

# 📂 Milestone 5.7 – Docker MCP

## 🎥 Episode 5.7

## Goal

Allow Zeba AI to inspect Docker resources.

---

## Topics Covered

- Containers
- Images
- Networks
- Volumes
- Logs
- Docker Compose

---

## Deliverables

- ✅ List Containers
- ✅ Inspect Images
- ✅ View Container Logs
- ✅ Docker Health Analysis

---

# 📂 Milestone 5.8 – Kubernetes MCP

## 🎥 Episode 5.8

## Goal

Allow Zeba AI to inspect Kubernetes clusters.

---

## Topics Covered

- Pods
- Services
- Deployments
- ReplicaSets
- Namespaces
- Logs
- Events

---

## Deliverables

- ✅ Cluster Inspection
- ✅ Pod Logs
- ✅ Deployment Analysis
- ✅ Kubernetes Health Monitoring

---

# 📂 Milestone 5.9 – Git MCP

## 🎥 Episode 5.9

## Goal

Integrate Git operations into Zeba AI.

---

## Topics Covered

- Git Status
- Branches
- Commits
- Diff
- Blame
- History
- Stash

---

## Deliverables

- ✅ Repository Analysis
- ✅ Commit Review
- ✅ Branch Information
- ✅ Diff Explanation

---

# 📂 Milestone 5.10 – Multi-Tool AI Agent

## 🎥 Episode 5.10

## Goal

Build a production-ready AI Agent capable of intelligently selecting and executing multiple developer tools.

---

## Topics Covered

- Tool Selection
- AI Decision Making
- Multi-Tool Workflow
- Parallel Execution
- Fallback Strategy
- Permissions
- Logging
- Security

---

## Architecture

```text
User Prompt

        │

        ▼

Prompt Service

        │

        ▼

AI Router

        │

        ▼

MCP Gateway

        │

        ▼

Tool Discovery

        │

 ┌──────┼──────────┬──────────┬─────────┐
 ▼      ▼          ▼          ▼         ▼

Filesystem GitHub Docker Git Kubernetes

        │

        ▼

Result Aggregation

        │

        ▼

LLM

        │

        ▼

Final Response
```

---

## Deliverables

- ✅ Multi-Tool AI Agent
- ✅ Automatic Tool Selection
- ✅ Production-ready Agent Architecture

---

# 📁 Expected Project Structure

```text
backend/

src/

├── mcp/
│   ├── gateway/
│   ├── client/
│   ├── registry/
│   ├── servers/
│   ├── tools/
│   ├── transport/
│   ├── types/
│   └── config/
│
├── services/
│
├── controllers/
│
├── prompts/
│
├── memory/
│
└── routes/
```

---

# 🎯 Chapter Deliverables

By the end of **Chapter 5**, you will have built:

- ✅ MCP Gateway
- ✅ MCP Client
- ✅ Tool Discovery
- ✅ Tool Registry
- ✅ Filesystem MCP
- ✅ GitHub MCP
- ✅ Docker MCP
- ✅ Kubernetes MCP
- ✅ Git MCP
- ✅ Multi-Tool AI Agent
- ✅ Production-ready Agent Architecture

---

# 🚀 What's Next?

After completing **Chapter 5**, we will continue with:

## 📘 Chapter 6 – Retrieval-Augmented Generation (RAG)

Build an enterprise knowledge retrieval system using:

- Vector Databases
- Embeddings
- Semantic Search
- Document Indexing
- Knowledge Retrieval

---

## 📘 Chapter 7 – Multi-Agent AI System

Build specialized AI agents for:

- Coding
- DevOps
- Documentation
- Architecture
- Testing
- Code Review

These agents will collaborate through orchestration to solve complex software engineering tasks.

---

# 📖 Chapter Summary

In this chapter, we will transform Zeba AI into a true **AI Developer Agent** by integrating the **Model Context Protocol (MCP)**. We will build an MCP Gateway, connect multiple MCP servers, discover available tools dynamically, and enable the AI to interact with developer environments including the filesystem, GitHub, Docker, Kubernetes, and Git repositories. By the end of this chapter, Zeba AI will be capable of intelligently selecting and executing external tools, laying the foundation for advanced Retrieval-Augmented Generation (RAG), Multi-Agent systems, and production-ready AI development workflows.



# new doc


# 🚀 Chapter 5 – Model Context Protocol (MCP)

<div align="center">

![MCP](https://img.shields.io/badge/Model%20Context%20Protocol-MCP-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow)
![AI](https://img.shields.io/badge/AI-Ollama-red)

**Building an Enterprise AI Developer Assistant using the Model Context Protocol (MCP)**

</div>

---

# 📖 Overview

Welcome to **Chapter 5** of the **AI-powered Full Stack Developer Assistant** series.

In the previous chapters, we successfully built the foundation of our AI assistant.

Our application can now:

- ✅ Capture Browser Context from any webpage
- ✅ Communicate with our Express.js backend
- ✅ Stream responses from Ollama
- ✅ Maintain conversational interactions
- ✅ Build prompts dynamically
- ✅ Support multiple AI models

Although our assistant is already capable of answering questions based on browser content, it still has one major limitation:

> **It cannot access external developer tools or the user's local development environment.**

For example, if a developer asks:

- Explain my `package.json`
- Read my `Dockerfile`
- Analyze my Kubernetes deployment
- Search my project for TODO comments
- Review my Git history
- Explain my React application

The AI model cannot answer accurately because it has no direct access to those resources.

This chapter solves that problem using the **Model Context Protocol (MCP).**

---

# 🎯 Chapter Goals

By the end of this chapter, we will transform our backend into an intelligent orchestration platform capable of communicating with external developer tools.

Our assistant will learn how to:

- Read local project files
- Search folders
- Access GitHub repositories
- Work with Docker
- Deploy to Kubernetes
- Query databases
- Execute developer tools
- Build reusable AI workflows

---

# 🏗 Current Architecture

Before introducing MCP, our application architecture looks like this.

```text
Chrome Extension
        │
        ▼
Express Backend
        │
        ▼
AI Controller
        │
        ▼
AI Service
        │
        ▼
Ollama
        │
        ▼
AI Response
```

This architecture is simple and effective for browser-based AI assistance.

However, the AI has no visibility into the developer's local project or external tools.

---

# 🚨 Why MCP?

Modern AI applications are no longer limited to generating text.

They can:

- Execute tools
- Read files
- Query databases
- Deploy applications
- Analyze repositories
- Control containers
- Automate DevOps workflows

To achieve this securely and consistently, we use the **Model Context Protocol (MCP)**.

MCP provides a standardized way for AI applications to communicate with external systems without tightly coupling the language model to specific tools.

Instead of writing custom integrations for every service, we expose capabilities through MCP Servers.

---

# 🏛 Architecture After MCP

```text
                 Chrome Extension
                         │
                         ▼
                 Express Backend
                         │
                         ▼
                   AI Controller
                         │
                         ▼
                     AI Service
                         │
                         ▼
                    MCP Gateway
                         │
         ┌───────────────┼────────────────┐
         ▼               ▼                ▼
Filesystem MCP     GitHub MCP      Docker MCP
         │               │                │
         ▼               ▼                ▼
 Local Files      Git Repositories   Containers
```

The AI Service no longer communicates directly with external tools.

Instead, it delegates all tool execution to the MCP Gateway.

---

# 📚 Learning Objectives

After completing this chapter, you will understand:

- What the Model Context Protocol (MCP) is
- Why AI systems require external tools
- How MCP Clients communicate with MCP Servers
- The Gateway Pattern
- JSON-RPC communication
- stdio transport
- Dynamic tool discovery
- Server registration
- Health monitoring
- Secure tool execution
- Building production-ready MCP integrations

---

# 📂 Chapter Structure

This chapter is divided into multiple milestones.

| Milestone | Topic |
|-----------|-------|
| **5.1** | Introduction to MCP |
| **5.2** | MCP Gateway |
| **5.3** | Filesystem MCP Server |
| **5.4** | MCP Client |
| **5.5** | MCP Tool Registry |
| **5.6** | Connecting Multiple MCP Servers |
| **5.7** | MCP Health Monitoring |
| **5.8** | MCP Security |
| **5.9** | Integrating MCP with Zeba AI |
| **5.10** | GitHub, Docker & Kubernetes MCP Servers |

---

# 📁 Project Structure

By the end of this chapter, our backend will include a dedicated MCP module.

```text
backend
│
├── src
│
├── controllers
│
├── routes
│
├── services
│
├── ai
│
├── mcp
│   │
│   ├── gateway
│   │
│   ├── registry
│   │
│   ├── client
│   │
│   ├── servers
│   │
│   ├── tools
│   │
│   ├── config
│   │
│   ├── security
│   │
│   └── health
│
├── app.ts
│
└── server.ts
```

This modular structure makes it easy to add new MCP Servers without affecting the rest of the application.

---

# 🏗 What We Will Build

Throughout this chapter, we will progressively build an enterprise-ready MCP platform.

```text
Chrome Extension
        │
        ▼
Express Backend
        │
        ▼
AI Controller
        │
        ▼
AI Service
        │
        ▼
MCP Gateway
        │
        ▼
Server Registry
        │
 ┌──────┼────────────┬────────────┬─────────────┐
 ▼      ▼            ▼            ▼             ▼
Filesystem GitHub Docker Kubernetes PostgreSQL
```

The MCP Gateway becomes the single entry point for all external tool communication.

---

# 📦 Technologies Used

| Component | Technology |
|-----------|------------|
| Frontend | React + Vite |
| Extension | Chrome Extension (Manifest V3) |
| Backend | Node.js + Express |
| Language | TypeScript |
| AI Model | Ollama |
| Protocol | Model Context Protocol (MCP) |
| SDK | `@modelcontextprotocol/sdk` |
| Communication | JSON-RPC |
| Transport | stdio |

---

# 🎯 Expected Outcomes

By the end of Chapter 5, your AI assistant will be capable of:

- ✅ Reading project files
- ✅ Listing directories
- ✅ Searching source code
- ✅ Explaining project configuration
- ✅ Working with Git repositories
- ✅ Managing Docker containers
- ✅ Interacting with Kubernetes clusters
- ✅ Querying databases
- ✅ Executing developer tools through MCP
- ✅ Providing accurate, context-aware responses

---

# 📈 Skills You'll Gain

Completing this chapter will help you understand:

- Enterprise backend architecture
- AI tool integration
- MCP design patterns
- TypeScript architecture
- Gateway Pattern
- Registry Pattern
- JSON-RPC
- stdio communication
- Secure tool execution
- AI orchestration
- Developer productivity automation

These are valuable skills for building modern AI-powered developer platforms.

---

# 🚀 Final Architecture

By the end of this chapter, our application architecture will look like this:

```text
                        Chrome Extension
                               │
                               ▼
                        Express Backend
                               │
                               ▼
                         AI Controller
                               │
                               ▼
                           AI Service
                               │
                               ▼
                          MCP Gateway
                               │
                     ┌─────────┼──────────┐
                     ▼         ▼          ▼
               Server Registry Health Monitor Security
                               │
          ┌──────────┬──────────┬──────────┬──────────┐
          ▼          ▼          ▼          ▼          ▼
     Filesystem   GitHub     Docker   Kubernetes  PostgreSQL
```

This architecture is modular, scalable, and ready for future integrations such as Redis, MongoDB, AWS, Azure, Terraform, Jira, and many more.

---

# 📖 Recommended Learning Path

Follow the milestones in order:

1. **05.1 – Introduction to MCP**
2. **05.2 – MCP Gateway**
3. **05.3 – Filesystem MCP Server**
4. **05.4 – MCP Client**
5. **05.5 – MCP Tool Registry**
6. **05.6 – Connecting Multiple MCP Servers**
7. **05.7 – MCP Health Monitoring**
8. **05.8 – MCP Security**
9. **05.9 – Integrating MCP with Zeba AI**
10. **05.10 – GitHub, Docker & Kubernetes MCP Servers**

My suggested roadmap

This sequence fits your Zeba AI project well:

5.1 – Introduction to MCP ✅
5.2 – MCP Gateway & Infrastructure
5.3 – Filesystem MCP Server
5.4 – MCP Client (JSON-RPC + stdio)
5.5 – Integrate Filesystem Server with Zeba AI
5.6 – Build Custom Filesystem Tools
5.7 – GitHub MCP Server
5.8 – Docker MCP Server
5.9 – Kubernetes MCP Server
5.10 – Intelligent Tool Selection & AI Agent





Each milestone builds on the previous one, gradually evolving the backend into a production-ready AI developer platform.

---

# 🎉 What's Next?

In **Milestone 5.1 – Introduction to MCP**, we will explore:

- What is MCP?
- Why it was created
- MCP architecture
- Clients vs Servers
- JSON-RPC
- Transport layers
- Tool execution flow
- Security model

Once we understand these fundamentals, we will begin implementing the **MCP Gateway** and our first **Filesystem MCP Server**, enabling Zeba AI to interact with real project files and developer tools.


## updated 

Since you're building this as a production-quality project and YouTube course, I recommend this progression:

5.1 – Introduction to MCP (documentation only)
5.2 – MCP Gateway & Infrastructure (infrastructure only)
5.3 – Filesystem MCP Server (first working MCP server)
5.4 – Custom Filesystem Tools (developer-focused tools)
5.5 – GitHub MCP Server
5.6 – Docker MCP Server
5.7 – Kubernetes MCP Server
5.8 – Database MCP Servers (MongoDB/PostgreSQL/Redis)
5.9 – Multi-Server Tool Orchestration & AI Agent Integration