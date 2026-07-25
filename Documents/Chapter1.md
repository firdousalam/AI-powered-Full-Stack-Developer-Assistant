# Chapter 1 - Project Planning & System Architecture

> Build DevPilot AI – AI Developer Assistant using Chrome Extension, Ollama, MCP, RAG, Docker & Kubernetes

---

# Chapter Overview

In this chapter, we will plan the complete project before writing any code.

Professional software projects spend significant time on architecture and planning before development begins. This approach reduces technical debt and provides a clear roadmap for implementation.

By the end of this chapter, we will have:

- Designed the complete system architecture
- Selected the technology stack
- Created the GitHub repository
- Organized the project folder structure
- Prepared the documentation
- Installed all development tools
- Created the roadmap for the remaining chapters

---

# Learning Objectives

After completing this chapter, you will understand:

- Project scope
- Enterprise architecture
- Technology selection
- Folder organization
- Development workflow
- Git strategy
- Documentation strategy
- Development environment setup

---

# Project Overview

## What are we building?

DevPilot AI is a full-stack AI Developer Assistant that helps software engineers perform daily development tasks directly from a Chrome Extension.

The application supports:

- AI Chat
- Code Explanation
- Code Review
- GitHub Repository Analysis
- Docker Assistant
- Kubernetes Assistant
- Jenkins Assistant
- Resume Review
- PDF Chat
- Website Chat
- OCR
- Voice Assistant
- Prompt Library
- RAG
- MCP Integration

The entire application runs locally using Ollama, making it suitable for developers who prefer privacy and want to avoid paid API services.

---

# System Architecture

```text
                        Chrome Extension
                   (React + Manifest V3)

         Popup | SidePanel | Context Menu

                        │
                        ▼

                 Node.js Backend API

                        │

       ┌────────────────┼────────────────┐

       ▼                ▼                ▼

 Authentication     AI Router      MCP Gateway

       ▼                ▼                ▼

    MongoDB         Ollama         MCP Servers

                        │

       ┌────────────────┼────────────────┐

       ▼                ▼                ▼

  ChromaDB      Embedding Service       RAG

                        │

       ┌────────────────┼──────────────────────────┐

       ▼                ▼              ▼           ▼

Filesystem MCP    GitHub MCP    Docker MCP   Kubernetes MCP
```

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Zustand
- Axios

---

## Chrome Extension

- Manifest V3
- Service Worker
- Content Script
- Popup
- Side Panel
- Context Menu

---

## Backend

- Node.js
- Express
- JWT
- Swagger
- Multer
- Socket.IO

---

## AI

- Ollama
- LangChain
- AI Router
- Prompt Templates

---

## Vector Database

- ChromaDB

Future

- Qdrant

---

## Database

- MongoDB Community

---

## MCP Servers

- Filesystem MCP
- Docker MCP
- Kubernetes MCP
- Git MCP
- GitHub MCP

---

## DevOps

- Docker
- Docker Compose
- Kubernetes
- Helm
- Jenkins
- GitHub Actions

---

# Development Workflow

The project will follow this development flow:

```text
Planning

↓

GitHub Repository

↓

Chrome Extension

↓

Backend

↓

Ollama

↓

MCP

↓

Vector Database

↓

RAG

↓

AI Features

↓

Docker

↓

Kubernetes

↓

Jenkins

↓

Production
```

---

# Project Folder Structure

```text
DevPilot-AI/

├── chrome-extension/
│
├── backend/
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

---

# Documentation Strategy

Every chapter will have a dedicated document.

```text
docs/

01-Project-Planning.md

02-Chrome-Extension.md

03-Backend.md

04-Ollama-AI-Router.md

05-MCP.md

06-RAG-ChromaDB.md

07-AI-Features.md

08-OCR-Voice.md

09-Dashboard.md

10-Docker-Kubernetes.md

11-Jenkins-CICD.md

12-Production.md

13-Future-Roadmap.md
```

Each document includes:

- Objectives
- Architecture
- Folder Structure
- Code Explanation
- API Documentation
- Testing
- Troubleshooting
- Summary

---

# Git Strategy

Use Git from the first chapter.

Repository structure:

```text
main

develop

feature/chrome-extension

feature/backend

feature/ollama

feature/mcp

feature/rag

feature/dashboard

release/v1.0
```

Recommended commit format:

```text
feat: initialize project structure

feat: create chrome extension

feat: add backend authentication

feat: integrate ollama

feat: implement mcp gateway

feat: add chromadb

feat: implement rag pipeline

fix: resolve streaming issue

docs: update architecture
```

---

# Development Environment

Install the following software before proceeding:

| Tool | Version |
|------|----------|
| Node.js | 22+ |
| Git | Latest |
| VS Code | Latest |
| Docker Desktop | Latest |
| Kubernetes | Docker Desktop / Minikube |
| MongoDB Community | Latest |
| Ollama | Latest |
| Google Chrome | Latest |

---

# Recommended Ollama Models

Install these models:

```bash
ollama pull llama3.2:3b

ollama pull qwen2.5-coder:7b

ollama pull gemma3:4b

ollama pull deepseek-r1:7b

ollama pull nomic-embed-text
```

These models are selected to run efficiently on a 16 GB RAM development machine.

---

# GitHub Repository Setup

Create a new GitHub repository.

Suggested repository name:

```text
DevPilot-AI
```

Initialize with:

- README.md
- MIT License
- .gitignore (Node.js)

Clone the repository locally:

```bash
git clone https://github.com/<username>/DevPilot-AI.git

cd DevPilot-AI
```

---

# Initial Folder Creation

Create the project structure:

```bash
mkdir chrome-extension
mkdir backend
mkdir dashboard
mkdir docs
mkdir docker
mkdir kubernetes
mkdir helm
mkdir scripts
mkdir .github
```

---

# First Git Commit

```bash
git add .

git commit -m "feat: initialize DevPilot AI project"

git push origin main
```

---

# Roadmap

The remaining chapters will build the application in the following order:

1. Chrome Extension
2. Backend
3. Ollama & AI Router
4. MCP Integration
5. ChromaDB & Embeddings
6. RAG
7. AI Features
8. OCR & Voice
9. Dashboard
10. Docker & Kubernetes
11. Jenkins & GitHub Actions
12. Production Deployment
13. Future Enhancements

---

# Deliverables

At the end of this chapter, you will have:

- Project architecture designed
- GitHub repository created
- Folder structure prepared
- Documentation strategy established
- Development environment configured
- Git workflow defined
- Roadmap for the complete course

---

# Summary

In this chapter, we focused on planning the project before implementation. We defined the system architecture, selected the technology stack, prepared the repository structure, established documentation and Git strategies, and set up the local development environment.

In the next chapter, we will begin building the Chrome Extension using Manifest V3, React, Vite, Tailwind CSS, and Zustand.