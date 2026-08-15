# 🚀 AI-Powered Full-Stack Developer Assistant

> **An open-source, project-aware AI Developer Platform that combines Local LLMs, MCP, Developer Tools, Project Intelligence, RAG, and Agentic AI to help developers understand, analyze, debug, modify, test, and maintain software projects.**

---

## 📌 Project Status

**Current Phase:** Phase 5 — MCP & Project Intelligence

**Current Focus:** Developer Tool Framework + Project Analyzer

**Architecture Status:** Core MCP infrastructure implemented; intelligent project analysis and AI-to-tool orchestration are under active development.

---

# 📖 Table of Contents

* [1. Project Overview](#1-project-overview)
* [2. Project Vision](#2-project-vision)
* [3. Why This Project](#3-why-this-project)
* [4. What the Project Will Do](#4-what-the-project-will-do)
* [5. Current Capabilities](#5-current-capabilities)
* [6. Future Capabilities](#6-future-capabilities)
* [7. Core Architecture](#7-core-architecture)
* [8. Complete Request Flow](#8-complete-request-flow)
* [9. Architecture Layers](#9-architecture-layers)
* [10. Chrome Extension](#10-chrome-extension)
* [11. Backend](#11-backend)
* [12. AI Service](#12-ai-service)
* [13. Ollama and Local LLMs](#13-ollama-and-local-llms)
* [14. MCP Architecture](#14-mcp-architecture)
* [15. MCP Gateway](#15-mcp-gateway)
* [16. Filesystem MCP Server](#16-filesystem-mcp-server)
* [17. Developer Tool Framework](#17-developer-tool-framework)
* [18. Project Analyzer](#18-project-analyzer)
* [19. AI-MCP Orchestration](#19-ai-mcp-orchestration)
* [20. RAG Architecture](#20-rag-architecture)
* [21. AI Developer Agent](#21-ai-developer-agent)
* [22. Code Modification and Validation](#22-code-modification-and-validation)
* [23. VS Code Extension](#23-vs-code-extension)
* [24. Advanced MCP Ecosystem](#24-advanced-mcp-ecosystem)
* [25. DevOps and Cloud](#25-devops-and-cloud)
* [26. MCP Marketplace](#26-mcp-marketplace)
* [27. Phase-Wise Roadmap](#27-phase-wise-roadmap)
* [28. Current Project Progress](#28-current-project-progress)
* [29. Technology Stack](#29-technology-stack)
* [30. Repository Structure](#30-repository-structure)
* [31. Development Strategy](#31-development-strategy)
* [32. Testing Strategy](#32-testing-strategy)
* [33. Local Development](#33-local-development)
* [34. Hardware Requirements](#34-hardware-requirements)
* [35. Security and Privacy](#35-security-and-privacy)
* [36. Design Principles](#36-design-principles)
* [37. Learning Outcomes](#37-learning-outcomes)
* [38. Long-Term Vision](#38-long-term-vision)
* [39. Contribution](#39-contribution)
* [40. License](#40-license)

---

# 1. Project Overview

The **AI-Powered Full-Stack Developer Assistant** is a full-stack AI development platform designed to assist software developers throughout the software development lifecycle.

The project starts with a browser-based AI assistant and progressively evolves into a **project-aware AI developer assistant**, then into an **AI developer agent**, and eventually into a broader **AI software engineering platform**.

The project combines:

```text
Artificial Intelligence
        +
Large Language Models
        +
Local AI
        +
MCP
        +
Developer Tools
        +
Project Analysis
        +
RAG
        +
Agentic Workflows
        +
Full-Stack Development
        +
DevOps
        +
Cloud Native Technologies
```

The project is intentionally built in phases so that each phase introduces an important engineering concept and produces a working capability.

---

# 2. Project Vision

The long-term goal is to build an AI system that can understand and work with real software projects.

A traditional AI chatbot works approximately like:

```text
Developer
   ↓
Prompt
   ↓
LLM
   ↓
Generic Response
```

The goal of this project is to evolve that into:

```text
Developer
   ↓
AI Developer Assistant
   ↓
Understand Developer Intent
   ↓
Understand Project
   ↓
Determine Required Context
   ↓
Select Developer Tools
   ↓
MCP Gateway
   ↓
Execute Tools
   ↓
Collect Project Information
   ↓
Reason Over Context
   ↓
Generate Response
```

The eventual agentic workflow becomes:

```text
Understand
    ↓
Analyze
    ↓
Plan
    ↓
Use Tools
    ↓
Modify
    ↓
Build
    ↓
Test
    ↓
Observe
    ↓
Fix
    ↓
Validate
    ↓
Deliver
```

---

# 3. Why This Project?

Modern developers work with increasingly complex systems.

A single project may contain:

* Frontend applications
* Backend services
* Databases
* APIs
* Containers
* Kubernetes manifests
* CI/CD pipelines
* Cloud infrastructure
* Configuration files
* Documentation
* Tests
* External services
* Multiple programming languages

An LLM alone does not automatically know the structure or current state of such a project.

The assistant therefore needs access to project information.

This project addresses that problem by combining:

```text
LLM
 +
MCP
 +
Developer Tools
 +
Project Analyzer
 +
RAG
```

The LLM provides reasoning.

MCP provides standardized tool access.

Developer Tools provide high-level development capabilities.

Project Analyzer provides structured project understanding.

RAG provides semantic retrieval.

Together they form the foundation for an AI software engineering assistant.

---

# 4. What the Project Will Do

The completed platform is intended to support workflows such as:

## Project Understanding

```text
"Explain this project."
```

The assistant can eventually determine:

* Programming languages
* Frameworks
* Runtime
* Package manager
* Build tools
* Entry points
* Architecture
* Docker usage
* Kubernetes usage
* Git configuration
* CI/CD configuration

---

## Code Understanding

```text
"Where is authentication implemented?"
```

The system can:

```text
Search Project
      ↓
Find Relevant Files
      ↓
Analyze Source
      ↓
Build Context
      ↓
Ask LLM
      ↓
Explain Authentication
```

---

## Debugging

```text
"Why is my application failing to start?"
```

The system can eventually inspect:

* Project configuration
* Entry point
* Dependencies
* Source code
* Build configuration
* Docker configuration
* Error information

and provide a project-specific diagnosis.

---

## Code Modification

Future versions will support requests such as:

```text
"Add validation to the registration API."
```

The agent can eventually:

```text
Understand Request
       ↓
Analyze Project
       ↓
Create Plan
       ↓
Modify Code
       ↓
Build
       ↓
Run Tests
       ↓
Analyze Errors
       ↓
Fix
       ↓
Validate
```

---

# 5. Current Capabilities

The project currently contains the foundations for:

* Chrome Extension
* Browser context extraction
* Node.js backend
* AI service
* Ollama/local LLM integration
* MCP architecture
* MCP Gateway
* MCP server registry
* MCP connection management
* MCP tool discovery
* MCP tool execution
* MCP health checking
* Filesystem MCP Server
* Developer Tool Framework foundation
* Project Analyzer foundation
* Project detection architecture

The original project documentation also defines broader functionality such as AI chat, browser extension support, RAG, vector databases, GitHub repository chat, Docker/Kubernetes assistance, OCR, voice, and production deployment. These are part of the broader roadmap rather than being treated as all-completed functionality today.

---

# 6. Future Capabilities

The roadmap includes:

* RAG
* Vector database
* Semantic code search
* Repository chat
* Documentation chat
* PDF chat
* Git integration
* GitHub integration
* Docker integration
* Kubernetes integration
* CI/CD integration
* AI developer agent
* Multi-step tool execution
* Code modification
* Automated testing
* Build/Test/Fix loops
* VS Code Extension
* Cloud deployment
* Advanced MCP ecosystem
* MCP Marketplace

---

# 7. Core Architecture

The architecture is designed around a reusable AI platform.

```text
                         ┌──────────────────────┐
                         │      Developer       │
                         └──────────┬───────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ▼                   ▼                   ▼
       ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
       │ Chrome         │  │ VS Code        │  │ Web            │
       │ Extension      │  │ Extension      │  │ Application    │
       └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
               │                   │                   │
               └───────────────────┼───────────────────┘
                                   ▼
                         ┌────────────────────┐
                         │    Backend API     │
                         │     Node.js        │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │    AI Service      │
                         └─────────┬──────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
           ┌────────────────┐          ┌──────────────────┐
           │ Ollama / LLM   │          │   MCP Gateway    │
           └────────────────┘          └────────┬─────────┘
                                                │
                        ┌───────────────────────┼──────────────────────┐
                        │                       │                      │
                        ▼                       ▼                      ▼
               ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
               │ Filesystem MCP │     │ Developer      │     │ Future MCP     │
               │ Server         │     │ Tools          │     │ Servers        │
               └────────────────┘     └───────┬────────┘     └────────────────┘
                                              │
                          ┌───────────────────┼───────────────────┐
                          │                   │                   │
                          ▼                   ▼                   ▼
                    ┌──────────┐       ┌──────────┐       ┌──────────────┐
                    │ Project  │       │ Source   │       │ Dependency   │
                    │ Analyzer │       │ Analyzer │       │ Analyzer     │
                    └──────────┘       └──────────┘       └──────────────┘
                                              │
                                              ▼
                                      Project Context
                                              │
                                              ▼
                                             LLM
```

---

# 8. Complete Request Flow

Consider:

> "Explain the authentication flow in this project."

The future request flow is:

```text
User
 ↓
Chrome / VS Code
 ↓
Backend API
 ↓
AI Service
 ↓
Intent Analysis
 ↓
Determine Required Context
 ↓
MCP Gateway
 ↓
Developer Tool
 ↓
Project / Source Analysis
 ↓
Relevant Context
 ↓
AI Prompt Construction
 ↓
Ollama / LLM
 ↓
Response
 ↓
Developer Client
```

The critical architectural concept is that the LLM does not need to inspect everything.

Only relevant context is collected.

---

# 9. Architecture Layers

The platform consists of several logical layers.

## Layer 1 — Client

Examples:

* Chrome Extension
* VS Code Extension
* Web UI

---

## Layer 2 — API

Responsible for:

* Requests
* Authentication
* Sessions
* Streaming
* API communication

---

## Layer 3 — AI Service

Responsible for:

* Prompt handling
* Context management
* Model selection
* AI reasoning
* Tool orchestration

---

## Layer 4 — MCP Gateway

Responsible for:

* MCP server registry
* Connections
* Tool discovery
* Tool execution
* Health monitoring

---

## Layer 5 — Developer Tools

Responsible for higher-level software-development operations.

---

## Layer 6 — Project Intelligence

Responsible for understanding the project.

---

## Layer 7 — External Systems

Potential systems include:

* Filesystem
* Git
* GitHub
* Docker
* Kubernetes
* Databases
* CI/CD
* Cloud services

---

# 10. Chrome Extension

The Chrome Extension is one of the initial developer interfaces.

The extension uses Chrome Manifest V3.

Architecture:

```text
Chrome Extension
│
├── Popup
├── Side Panel
├── Content Script
├── Background Service Worker
├── Context Menu
├── Browser Context Builder
└── Runtime Messaging
```

The extension can collect browser context and send it to the backend.

---

## Browser Context

The context system can process:

* Readable page content
* Headings
* Links
* Tables
* Forms
* Code blocks
* Page metadata

The browser context can be used to answer questions such as:

```text
"Explain this documentation page."
```

or:

```text
"Explain this code shown on the page."
```

---

# 11. Backend

The backend provides the central API layer.

Primary responsibilities:

```text
Client Request
     ↓
API
     ↓
Authentication / Validation
     ↓
AI Service
     ↓
MCP
     ↓
Response
```

Potential backend responsibilities include:

* REST APIs
* Authentication
* Request validation
* Error handling
* Logging
* AI communication
* MCP communication
* Streaming
* Workspace management

---

# 12. AI Service

The AI Service is the intelligence layer.

It is responsible for coordinating:

```text
User Prompt
     +
Browser Context
     +
Project Context
     +
MCP Tool Results
     +
RAG Results
     ↓
LLM
```

The AI Service should eventually be able to determine:

```text
Does this request require a tool?
        │
       Yes
        ↓
Which tool?
        ↓
What arguments?
        ↓
Execute
        ↓
Analyze result
        ↓
Need another tool?
        │
       Yes
        ↓
Continue
```

This is the foundation for agentic behavior.

---

# 13. Ollama and Local LLMs

Ollama provides the local model runtime.

The project is designed to support local models instead of requiring paid external APIs for the core development workflow.

Conceptually:

```text
AI Service
    ↓
Ollama
    ↓
Local Model
```

Possible model categories include:

* General-purpose LLM
* Coding model
* Reasoning model
* Embedding model

The exact models may change as the project evolves.

---

# 14. MCP Architecture

MCP stands for **Model Context Protocol**.

In this project, MCP provides the standardized tool integration layer.

Instead of embedding every developer operation directly into the AI Service:

```text
AI Service
 ├── Filesystem implementation
 ├── Git implementation
 ├── Docker implementation
 ├── Kubernetes implementation
 └── GitHub implementation
```

the architecture becomes:

```text
AI Service
     ↓
MCP Gateway
     ↓
MCP Servers
```

This provides modularity and extensibility.

---

# 15. MCP Gateway

The MCP Gateway acts as the central manager for MCP servers.

Responsibilities include:

### Server Registry

Maintain registered MCP servers.

### Connection Management

```text
connect()
disconnect()
```

### Tool Discovery

```text
discoverTools()
```

### Tool Execution

```text
executeTool()
```

### Health Monitoring

```text
healthCheck()
```

The conceptual architecture is:

```text
                  MCP Gateway
                       │
             ┌─────────┼─────────┐
             │         │         │
             ▼         ▼         ▼
        Filesystem   GitHub    Docker
           MCP        MCP       MCP
             │
             ▼
       Tool Discovery
             │
             ▼
       Tool Execution
```

---

# 16. Filesystem MCP Server

The Filesystem MCP Server provides controlled project filesystem operations.

Planned/implemented capabilities include:

```text
Read File
List Directory
File Exists
Read Multiple Files
File Metadata
Search Files
Project Tree
```

The architecture is:

```text
MCP Gateway
      ↓
Filesystem MCP Server
      ↓
FilesystemService
      ↓
Workspace
```

The filesystem layer is intentionally kept separate from higher-level developer intelligence.

---

# 17. Developer Tool Framework

The Developer Tool Framework is a major architectural improvement over simply exposing raw filesystem functions.

Low-level filesystem operations:

```text
readFile()
listDirectory()
getMetadata()
searchFiles()
```

Higher-level developer tools:

```text
analyzeProject()
analyzeDependencies()
searchSourceCode()
scanRoutes()
scanTodos()
analyzeSource()
getProjectTree()
getWorkspaceSummary()
```

The higher-level tools provide structured developer-oriented information.

This allows the AI to work with meaningful concepts rather than repeatedly performing low-level operations.

---

# 18. Project Analyzer

The Project Analyzer discovers the characteristics of a project.

The planned detector architecture is:

```text
Project Analyzer
│
├── Metadata Detector
├── Language Detector
├── Framework Detector
├── Runtime Detector
├── Package Manager Detector
├── Build Tool Detector
├── Entry Point Detector
├── Docker Detector
├── Kubernetes Detector
├── Git Detector
└── CI/CD Detector
```

The detectors produce structured information that is aggregated into:

```text
ProjectAnalysisResult
```

Example:

```json
{
  "language": "TypeScript",
  "framework": "Express",
  "runtime": "Node.js",
  "packageManager": "npm",
  "buildTool": "tsc",
  "entryPoint": "src/server.ts",
  "docker": true,
  "kubernetes": false,
  "git": true,
  "cicd": "GitHub Actions"
}
```

This allows the AI to understand a project without reading every file.

---

## Filesystem API Contract

Code-structure and filesystem detectors use the project's actual `FilesystemService` API.

### Directory Listing

```text
listDirectory()
```

returns:

```text
string[]
```

### Metadata

```text
getMetadata()
```

is used for file/directory metadata.

Detectors should not assume older APIs such as:

```text
DirectoryInfo.entries
getFileMetadata()
```

---

## Detector Validation

After implementing each detector:

```bash
npx tsc --noEmit
```

should be used as the TypeScript checkpoint.

This keeps detector development incremental and prevents multiple errors from accumulating.

---

# 19. AI-MCP Orchestration

After the Developer Tool Framework is complete, the next major step is intelligent orchestration.

The AI should decide when tools are required.

Example:

```text
User:
"Where is authentication implemented?"
```

The AI can determine:

```text
Required:
- Source search
- Project structure
- Authentication-related files
```

Then:

```text
AI
 ↓
MCP Gateway
 ↓
Developer Tool
 ↓
Results
 ↓
AI
 ↓
Answer
```

This is the transition from:

**LLM-powered chatbot**

to:

**tool-using AI assistant**.

---

# 20. RAG Architecture

RAG stands for Retrieval-Augmented Generation.

The purpose of RAG is to retrieve relevant information before generating an answer.

Architecture:

```text
Documents / Code / PDFs
        ↓
Chunking
        ↓
Embeddings
        ↓
Vector Database
        ↓
Similarity Search
        ↓
Relevant Context
        ↓
LLM
```

Potential components:

* Ollama embeddings
* ChromaDB
* LangChain/custom retrieval
* Code chunking
* Document chunking

---

## MCP vs RAG

MCP and RAG have different responsibilities.

### MCP

Useful for:

```text
Tools
Actions
Structured resources
Filesystem
Git
Docker
Kubernetes
```

### RAG

Useful for:

```text
Semantic retrieval
Documentation
Large codebases
PDFs
Historical information
Knowledge bases
```

They can work together:

```text
MCP
 +
RAG
 +
LLM
```

---

# 21. AI Developer Agent

The next evolution is an AI Developer Agent.

Instead of a single tool call:

```text
Prompt
 ↓
Tool
 ↓
Answer
```

the agent can perform multiple steps:

```text
Prompt
 ↓
Understand
 ↓
Plan
 ↓
Tool
 ↓
Observe
 ↓
Reason
 ↓
Tool
 ↓
Observe
 ↓
Reason
 ↓
Answer
```

For example:

```text
"Find why the login API is failing."
```

Possible agent workflow:

```text
1. Analyze project
2. Find authentication module
3. Find login endpoint
4. Inspect controller
5. Inspect service
6. Inspect database access
7. Inspect configuration
8. Analyze error
9. Form diagnosis
10. Explain solution
```

---

# 22. Code Modification and Validation

The eventual goal is not just to explain code.

The agent should eventually be able to modify it.

Example:

```text
"Add validation to the registration endpoint."
```

Target workflow:

```text
Developer Request
       ↓
Understand
       ↓
Analyze Project
       ↓
Find Relevant Files
       ↓
Create Plan
       ↓
Modify Code
       ↓
Build
       ↓
Run Tests
       ↓
Analyze Results
       ↓
Fix Errors
       ↓
Run Tests Again
       ↓
Validate
       ↓
Present Changes
```

This feedback loop is critical.

The agent should not simply generate code and assume it works.

---

# 23. VS Code Extension

VS Code integration is a major planned part of the project.

The key design principle is:

> **VS Code should be another client of the same AI Developer Platform.**

The architecture should therefore be:

```text
Chrome Extension ─┐
                  │
VS Code Extension ├──→ Backend API
                  │
Web Client ───────┘
                         ↓
                    AI Service
                         ↓
                    MCP Gateway
                         ↓
                Developer Tools
```

The backend and MCP infrastructure should not need to be duplicated.

---

## Planned VS Code Features

### Chat

Ask questions about the project.

### Explain Code

Select code and ask for an explanation.

### Fix Code

Ask the AI to identify and fix problems.

### Refactor

Request improvements to selected code.

### Generate Tests

Generate tests based on the actual implementation.

### Project Analysis

Analyze the complete workspace.

### Code Search

Search for functionality across the repository.

### Debugging

Provide errors and let the AI investigate relevant source files.

### Agent Mode

Eventually allow multi-step development workflows.

---

# 24. Advanced MCP Ecosystem

The long-term MCP ecosystem can include:

```text
MCP Gateway
│
├── Filesystem MCP
├── Git MCP
├── GitHub MCP
├── Docker MCP
├── Kubernetes MCP
├── Database MCP
├── CI/CD MCP
├── Cloud MCP
└── Custom MCP Servers
```

This allows the AI to work across the development lifecycle.

Example:

```text
GitHub
   ↓
CI/CD
   ↓
Docker
   ↓
Kubernetes
   ↓
Logs
   ↓
Source Code
   ↓
AI
```

A future request such as:

> "Why did my deployment fail?"

could potentially involve multiple systems automatically.

---

# 25. DevOps and Cloud

The project also has a long-term cloud-native direction.

Potential infrastructure:

```text
Docker
   ↓
Docker Compose
   ↓
Kubernetes
   ↓
Helm
   ↓
CI/CD
   ↓
Cloud
```

Potential operational capabilities:

* Containerization
* Kubernetes deployment
* Helm charts
* Jenkins
* GitHub Actions
* Health checks
* Metrics
* Logging
* Monitoring

Potential monitoring stack:

```text
Prometheus
+
Grafana
+
Loki
```

---

# 26. MCP Marketplace

A long-term goal is to allow developers to extend the platform through an MCP marketplace.

Conceptually:

```text
                    MCP Marketplace
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
       GitHub           Database          Cloud
        Tools             Tools            Tools
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                      MCP Gateway
                           ↓
                       AI Agent
```

Potential future marketplace models include:

* Free MCP tools
* Premium MCP tools
* Team tools
* Enterprise integrations
* Private MCP servers
* Developer-published tools

---

# 27. Phase-Wise Roadmap

The complete project roadmap is:

```text
Phase 1
Project Foundation
        ↓
Phase 2
Chrome Extension + Browser Context
        ↓
Phase 3
Backend + Ollama
        ↓
Phase 4
AI Context Integration
        ↓
Phase 5
MCP + Project Intelligence
        ↓
Phase 6
AI ↔ MCP Orchestration
        ↓
Phase 7
RAG + Vector Database
        ↓
Phase 8
AI Developer Agent
        ↓
Phase 9
Code Modification + Build/Test/Fix
        ↓
Phase 10
Advanced MCP Ecosystem
        ↓
Phase 11
VS Code Extension
        ↓
Phase 12
Cloud + Production
        ↓
Phase 13
MCP Marketplace
```

---

# 28. Current Project Progress

| Component                   | Status         |
| --------------------------- | -------------- |
| Project Foundation          | ✅ Complete     |
| Chrome Extension Foundation | ✅ Complete     |
| Browser Context             | ✅ Complete     |
| Backend Foundation          | ✅ Complete     |
| Ollama Integration          | ✅ Complete     |
| MCP Introduction            | ✅ Complete     |
| MCP Gateway                 | ✅ Complete     |
| MCP Server Registry         | ✅ Complete     |
| MCP Connections             | ✅ Complete     |
| MCP Tool Discovery          | ✅ Complete     |
| MCP Tool Execution          | ✅ Complete     |
| MCP Health Monitoring       | ✅ Complete     |
| Filesystem MCP Server       | ✅ Complete     |
| Developer Tool Framework    | 🟡 In Progress |
| Project Analyzer            | 🟡 In Progress |
| Project Detectors           | 🟡 In Progress |
| AI ↔ MCP Orchestration      | ⏳ Next         |
| RAG                         | ⏳ Planned      |
| Vector Database             | ⏳ Planned      |
| AI Developer Agent          | ⏳ Planned      |
| Code Modification           | ⏳ Planned      |
| Build/Test/Fix Loop         | ⏳ Planned      |
| Advanced MCP                | ⏳ Planned      |
| VS Code Extension           | ⏳ Planned      |
| Cloud Deployment            | ⏳ Planned      |
| MCP Marketplace             | ⏳ Future       |

---

# 29. Technology Stack

| Layer             | Technology                   |
| ----------------- | ---------------------------- |
| Language          | TypeScript                   |
| Frontend          | React                        |
| Build Tool        | Vite                         |
| Browser Extension | Chrome Manifest V3           |
| Backend           | Node.js                      |
| API               | Express                      |
| AI Runtime        | Ollama                       |
| LLM               | Local/Open-Source Models     |
| MCP               | Model Context Protocol       |
| MCP Gateway       | Node.js / TypeScript         |
| Vector Database   | ChromaDB                     |
| RAG               | LangChain / Custom Retrieval |
| Database          | MongoDB                      |
| Containers        | Docker                       |
| Orchestration     | Kubernetes                   |
| Packaging         | Helm                         |
| CI/CD             | Jenkins / GitHub Actions     |
| Monitoring        | Prometheus / Grafana         |
| Logging           | Loki                         |
| Version Control   | Git / GitHub                 |
| Future IDE        | VS Code Extension            |

The initial project documentation also identifies React/Vite/Tailwind/Zustand, Node.js/Express, Ollama, ChromaDB, MongoDB, Docker, Kubernetes, Helm, Jenkins, GitHub Actions, Prometheus, Grafana, and Loki as part of the technology direction.

---

# 30. Repository Structure

The repository is organized around major platform components.

```text
AI-powered-Full-Stack-Developer-Assistant/
│
├── chrome-extension/
│   ├── src/
│   ├── manifest
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── ai/
│   │   ├── mcp/
│   │   ├── developer-tools/
│   │   ├── project-analyzer/
│   │   └── ...
│   └── ...
│
├── dashboard/
│
├── docs/
│
├── docker/
│
├── kubernetes/
│
├── helm/
│
├── scripts/
│
├── .github/
│
├── README.md
├── LICENSE
├── CHANGELOG.md
└── CONTRIBUTING.md
```

The exact structure can evolve as implementation progresses.

---

# 31. Development Strategy

Development follows incremental milestones.

Each milestone should:

1. Introduce one major concept
2. Implement the architecture
3. Add working code
4. Test the implementation
5. Validate integration
6. Document the result
7. Commit the changes
8. Move to the next milestone

The project should avoid building the entire system at once.

---

# 32. Testing Strategy

Testing should happen continuously.

## TypeScript Validation

```bash
npx tsc --noEmit
```

This is especially important while implementing Project Analyzer detectors.

---

## Application Build

```bash
npm run build
```

---

## Unit Tests

Individual services, detectors, and tools should eventually have unit tests.

---

## Integration Tests

Important integration boundaries include:

```text
Chrome → Backend
Backend → AI
AI → MCP Gateway
Gateway → MCP Server
MCP → Developer Tool
Developer Tool → Filesystem
```

---

## End-to-End Testing

Eventually:

```text
User
 ↓
Chrome / VS Code
 ↓
Backend
 ↓
AI
 ↓
MCP
 ↓
Project
 ↓
Response
```

should be tested as an end-to-end workflow.

---

# 33. Local Development

The project is designed to support local development.

Typical local architecture:

```text
Chrome Extension
       ↓
Node.js Backend
       ↓
Ollama
       ↓
MCP Gateway
       ↓
Local Workspace
```

For future RAG:

```text
Ollama
   +
Embedding Model
   ↓
ChromaDB
```

For future infrastructure:

```text
Docker
   ↓
Kubernetes
```

---

# 34. Hardware Requirements

The initial project direction targets a development environment around:

| Component   | Recommended                         |
| ----------- | ----------------------------------- |
| RAM         | 16 GB minimum                       |
| CPU         | Modern Intel i5 / Ryzen 5 or better |
| Storage     | SSD                                 |
| OS          | Windows / Linux                     |
| Browser     | Chrome                              |
| Development | VS Code                             |
| Containers  | Docker                              |
| Local AI    | Ollama                              |

A 16 GB system should be treated as a practical development target, not a guarantee that every future model or workload will run comfortably.

---

# 35. Security and Privacy

Security becomes increasingly important as the project gains tool execution capabilities.

Future production architecture should consider:

### Authentication

```text
User
 ↓
Authentication
 ↓
Authorized Workspace
```

### Tool Permissions

Not every tool should automatically be allowed to execute every operation.

Potential permission categories:

```text
Read
Write
Execute
Network
Infrastructure
```

### Workspace Isolation

Each user's project/workspace should be isolated.

### Secrets

Sensitive configuration should not be placed directly into source code.

### Audit Logging

Future agent actions should be traceable:

```text
User Request
 ↓
Tool Selected
 ↓
Arguments
 ↓
Execution
 ↓
Result
```

This becomes especially important when the agent gains code modification and execution capabilities.

---

# 36. Design Principles

The project follows several important principles.

## 1. Local First

Prefer local/open-source AI where practical.

---

## 2. Modular Architecture

Each major capability should be independently replaceable.

---

## 3. Tool-Based Intelligence

The LLM should use tools instead of receiving unnecessary project data.

---

## 4. Project Awareness

The assistant should understand the actual project rather than providing only generic answers.

---

## 5. Incremental Agentic Development

Start with deterministic tool orchestration and progressively introduce more autonomous behavior.

---

## 6. Reusable Backend

Chrome, VS Code, Web, and future clients should use the same AI platform.

---

## 7. Validation

Generated or modified code should eventually be validated through builds and tests.

---

## 8. Extensibility

MCP should make it possible to add new developer capabilities without rewriting the entire AI system.

---

# 37. Learning Outcomes

Completing this project provides practical exposure to several areas of modern software engineering.

## Full Stack

* React
* Node.js
* Express
* TypeScript
* MongoDB
* REST APIs

## Browser Development

* Manifest V3
* Content Scripts
* Service Workers
* Chrome APIs
* Runtime Messaging

## AI Engineering

* LLMs
* Ollama
* Prompt Engineering
* Context Engineering
* Embeddings
* RAG
* Vector Databases
* AI Routing
* AI Agents

## MCP

* MCP Clients
* MCP Servers
* Tool Discovery
* Tool Execution
* MCP Gateway
* Custom Developer Tools

## Developer Intelligence

* Project Detection
* Framework Detection
* Language Detection
* Dependency Analysis
* Source Analysis
* Architecture Detection
* Code Search

## DevOps

* Docker
* Kubernetes
* Helm
* Jenkins
* GitHub Actions
* Monitoring
* Logging

## Developer Platforms

* Chrome Extensions
* VS Code Extensions
* AI APIs
* Local AI
* Cloud Deployment
* Marketplace Architecture

---

# 38. Long-Term Vision

The ultimate vision is to create a platform where developers can connect their development environment to an AI agent.

The complete concept is:

```text
                         DEVELOPER
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
           Chrome          VS Code         Web
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                     AI DEVELOPER AGENT
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
                 LLM                   MCP
                                        │
                ┌───────────────────────┼────────────────────────┐
                │                       │                        │
                ▼                       ▼                        ▼
           Filesystem                 Git                   GitHub
                │                       │                        │
                ├───────────────────────┼────────────────────────┤
                │                       │                        │
                ▼                       ▼                        ▼
             Docker               Kubernetes                CI/CD
                │                       │                        │
                └───────────────────────┼────────────────────────┘
                                        ▼
                                  PROJECT INTELLIGENCE
                                        │
                              ┌─────────┴─────────┐
                              ▼                   ▼
                            RAG              Project Analyzer
                              │                   │
                              └─────────┬─────────┘
                                        ▼
                                   AI REASONING
                                        │
                                        ▼
                                      PLAN
                                        │
                                        ▼
                                     MODIFY
                                        │
                                        ▼
                                      BUILD
                                        │
                                        ▼
                                      TEST
                                        │
                                  ┌─────┴─────┐
                                  │           │
                                FAIL        PASS
                                  │           │
                                  ▼           ▼
                                 FIX       COMPLETE
                                  │
                                  └──────→ TEST
```

---

# 39. Contribution

Contributions are welcome.

Potential contribution areas include:

* MCP servers
* Developer tools
* Project detectors
* AI orchestration
* RAG
* Agent workflows
* Testing
* Documentation
* Chrome Extension
* VS Code Extension
* Docker
* Kubernetes
* CI/CD
* Monitoring
* Security

Before contributing, contributors should understand the architectural boundaries between:

```text
Client
Backend
AI Service
MCP Gateway
MCP Servers
Developer Tools
Project Analyzer
```

---

# 40. License

This project is intended to use open-source technologies.

The repository license should define the terms under which the source code can be used, modified, and distributed.

---

# 🏁 Final Goal

The final goal of the project is to move through the following evolution:

```text
                  ┌───────────────────┐
                  │    AI Chatbot     │
                  └─────────┬─────────┘
                            ↓
                  ┌───────────────────┐
                  │ Context-Aware AI  │
                  └─────────┬─────────┘
                            ↓
                  ┌───────────────────┐
                  │ Project-Aware AI  │
                  └─────────┬─────────┘
                            ↓
                  ┌───────────────────┐
                  │ Tool-Using AI     │
                  └─────────┬─────────┘
                            ↓
                  ┌───────────────────┐
                  │ AI Developer Agent│
                  └─────────┬─────────┘
                            ↓
                  ┌───────────────────┐
                  │ AI Software       │
                  │ Engineering Agent │
                  └───────────────────┘
```

The project is therefore not simply about integrating an LLM into a Chrome Extension.

It is about building a **complete AI Developer Platform** where:

```text
AI
+
Project Understanding
+
MCP
+
Developer Tools
+
RAG
+
Agentic Workflows
+
Code Execution
+
Testing
+
Developer Interfaces
```

work together to help developers build and maintain real software.

---

## 🚀 Current Next Step

The immediate development target is:

```text
Finish Phase 5
      ↓
Developer Tool Framework
      ↓
Complete Project Analyzer
      ↓
Complete Detectors
      ↓
Expose Developer Tools through MCP
      ↓
Implement AI ↔ MCP Orchestration
```

Once this is complete, the project will have the foundation required to move from a **project-aware assistant** toward an **AI developer agent**.

---

## ⭐ Project Philosophy

> **Don't just ask AI to write code. Give AI the ability to understand the project, use developer tools, reason about the system, validate its work, and progressively become an AI software engineering partner.**

**Built with open-source technologies. Designed for developers. Evolving toward an AI software engineering platform.**
