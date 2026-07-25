# 🚀 Build DevPilot AI
## AI Developer Assistant using Chrome Extension, Ollama, MCP, RAG, Docker & Kubernetes

> Build a production-ready AI Developer Assistant from scratch using **100% free and open-source technologies**.

---

# 📖 Course Overview

This course will guide you through building **DevPilot AI**, an enterprise-grade AI Developer Assistant capable of:

- AI Chat
- Local LLMs using Ollama
- Chrome Extension (Manifest V3)
- Retrieval-Augmented Generation (RAG)
- Vector Database (ChromaDB)
- Model Context Protocol (MCP)
- GitHub Repository Chat
- PDF Chat
- Docker & Kubernetes Assistant
- Jenkins Assistant
- Resume Review
- Job Description Analyzer
- OCR
- Voice Assistant
- Production Deployment

By the end of this course, you will have built a complete AI platform that runs **entirely on your local machine** without requiring paid API keys.

---

# 🎯 Course Objectives

After completing this course, you will be able to:

- Build Chrome Extensions using Manifest V3
- Develop scalable Node.js backend applications
- Integrate local AI models using Ollama
- Implement Retrieval-Augmented Generation (RAG)
- Work with Vector Databases
- Build and integrate MCP servers
- Chat with PDFs and GitHub repositories
- Deploy applications using Docker and Kubernetes
- Automate deployments using Jenkins and GitHub Actions
- Publish a Chrome Extension

---

# 🏗 Final System Architecture

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

   Authentication    AI Router      MCP Gateway

        ▼                ▼                ▼

     MongoDB         Ollama         MCP Servers

                         │

        ┌────────────────┼────────────────┐

        ▼                ▼                ▼

   ChromaDB       Embedding Service      RAG

                         │

        ┌────────────────┼──────────────────────────────┐

        ▼                ▼              ▼               ▼

 Filesystem MCP    GitHub MCP     Docker MCP    Kubernetes MCP

                         │

                         ▼

                 Docker + Kubernetes

                         │

                         ▼

                  Jenkins + GitHub Actions
```

---

# 📚 Course Structure

The course consists of **13 chapters**.

Each chapter builds upon the previous one and results in a working feature.

---

# 📘 Chapter 1 – Project Planning & System Architecture

## Objective

Design the complete application before writing any code.

### Topics Covered

- Course Introduction
- Project Demonstration
- Enterprise Architecture
- System Design
- Feature Planning
- Folder Structure
- Technology Selection
- Git Strategy
- Documentation Strategy

### Deliverables

- GitHub Repository
- README.md
- Architecture Diagram
- Roadmap
- Development Environment Setup

---

# 📘 Chapter 2 – Chrome Extension Development

## Objective

Build the Chrome Extension using Manifest V3.

### Topics Covered

- Manifest V3
- React + Vite
- Tailwind CSS
- Zustand
- Popup
- Side Panel API
- Background Service Worker
- Content Script
- Context Menu
- Chrome Storage API
- Runtime Messaging

### Deliverables

- Popup Chat
- Side Panel
- Context Menu
- Chrome Storage
- Message Passing

---

# 📘 Chapter 3 – Backend Development

## Objective

Develop the backend API using Node.js and Express.

### Topics Covered

- Express.js
- Project Architecture
- MongoDB
- Mongoose
- REST APIs
- JWT Authentication
- Refresh Tokens
- Middleware
- Validation
- Logging
- Error Handling
- Swagger Documentation
- WebSocket

### Deliverables

- Authentication APIs
- Chat APIs
- User Management
- API Documentation

---

# 📘 Chapter 4 – Ollama & AI Router

## Objective

Integrate local Large Language Models.

### Topics Covered

- Installing Ollama
- Model Management
- Prompt Engineering
- AI Router
- Streaming Responses
- Memory Optimization
- Multi-Model Support

### Recommended Models

- llama3.2:3b
- qwen2.5-coder:7b
- gemma3:4b
- deepseek-r1:7b
- nomic-embed-text

### Deliverables

- AI Chat
- Model Selection
- Streaming Responses
- AI Routing

---

# 📘 Chapter 5 – Model Context Protocol (MCP)

## Objective

Integrate external developer tools using MCP.

### Topics Covered

- Introduction to MCP
- MCP Architecture
- MCP Gateway
- Tool Discovery
- Tool Execution
- Filesystem MCP
- GitHub MCP
- Docker MCP
- Kubernetes MCP
- Git MCP

### Deliverables

- Local File Analysis
- Repository Analysis
- Docker Integration
- Kubernetes Integration

---

# 📘 Chapter 6 – Embeddings, ChromaDB & RAG

## Objective

Implement semantic search using Retrieval-Augmented Generation.

### Topics Covered

- Embeddings
- Chunking
- ChromaDB
- Similarity Search
- Retrieval Pipeline
- Semantic Search
- Codebase Chat
- Documentation Chat
- PDF Chat

### Deliverables

- Code Search
- PDF Chat
- Documentation Search
- Repository Chat

---

# 📘 Chapter 7 – AI Productivity Features

## Objective

Develop productivity tools for developers.

### Topics Covered

- Prompt Library
- Chat History
- Favorites
- Bookmarks
- Resume Review
- Job Description Analyzer
- Interview Questions
- Code Review
- Documentation Generator
- Architecture Generator

### Deliverables

- AI Developer Toolkit

---

# 📘 Chapter 8 – OCR, Voice & File Processing

## Objective

Implement multimodal AI capabilities.

### Topics Covered

- Image Upload
- OCR using Tesseract
- Speech-to-Text
- Text-to-Speech
- Voice Commands
- Drag & Drop Upload
- Markdown Rendering
- Code Highlighting

### Deliverables

- OCR Assistant
- Voice Chat
- Image Analysis

---

# 📘 Chapter 9 – Dashboard & User Interface

## Objective

Build a production-ready frontend dashboard.

### Topics Covered

- Dashboard Layout
- Responsive UI
- Theme Switching
- Chat Interface
- Markdown Viewer
- Code Highlighting
- User Profile
- Settings
- Notification System

### Deliverables

- Complete Dashboard
- Responsive UI
- User Settings

---

# 📘 Chapter 10 – Docker & Kubernetes

## Objective

Containerize and orchestrate the application.

### Topics Covered

- Docker
- Docker Compose
- Multi-stage Builds
- Kubernetes
- Deployments
- Services
- Ingress
- ConfigMaps
- Secrets
- Helm Charts

### Deliverables

- Docker Images
- Kubernetes Deployment
- Helm Chart

---

# 📘 Chapter 11 – Jenkins, GitHub Actions & Monitoring

## Objective

Automate CI/CD and monitor the application.

### Topics Covered

- Jenkins Pipelines
- GitHub Actions
- Continuous Integration
- Continuous Deployment
- Prometheus
- Grafana
- Loki
- Application Logging
- Metrics
- Health Checks

### Deliverables

- Automated CI/CD
- Monitoring Dashboard
- Logging System

---

# 📘 Chapter 12 – Security & Production Deployment

## Objective

Prepare the application for production.

### Topics Covered

- JWT Security
- Rate Limiting
- Input Validation
- CORS
- Environment Variables
- Performance Optimization
- Packaging Chrome Extension
- Chrome Web Store
- Production Deployment

### Deliverables

- Production Build
- Chrome Extension Package
- Public GitHub Repository

---

# 📘 Chapter 13 – Future Enhancements

## Objective

Explore advanced AI capabilities and future improvements.

### Topics Covered

- AI Agents
- Multi-Agent Systems
- LangGraph
- Advanced MCP
- VS Code Extension
- Electron Desktop Application
- Mobile Application
- Plugin Marketplace
- Future Roadmap

### Deliverables

- Future Enhancement Plan
- Advanced Architecture

---

# 🗂 Final Project Structure

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

# 📄 Documentation Structure

Each chapter includes a dedicated Markdown guide.

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

Each guide should contain:

- Introduction
- Learning Objectives
- Architecture Diagrams
- Folder Structure
- Implementation Steps
- Source Code Explanation
- API Documentation
- Testing Guide
- Troubleshooting
- Git Commit Reference
- Next Chapter Preview

---

# 🛠 Technology Stack

| Layer | Technology |
|--------|------------|
| Chrome Extension | Manifest V3 |
| UI | React + Vite |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Backend | Node.js + Express |
| Database | MongoDB |
| AI Models | Ollama |
| Embeddings | nomic-embed-text |
| Vector Database | ChromaDB |
| RAG | LangChain |
| OCR | Tesseract |
| Authentication | JWT |
| API Documentation | Swagger |
| Containers | Docker |
| Orchestration | Kubernetes |
| Package Manager | Helm |
| CI/CD | Jenkins + GitHub Actions |
| Monitoring | Prometheus + Grafana |
| Logging | Loki |
| Version Control | Git + GitHub |

---

# 💻 Recommended Hardware

| Component | Recommendation |
|-----------|----------------|
| Operating System | Windows 11 / Ubuntu 24.04 |
| RAM | 16 GB Minimum |
| CPU | Intel i5 / Ryzen 5 or better |
| Storage | 100 GB SSD |
| Docker | Docker Desktop |
| Kubernetes | Docker Desktop Kubernetes / Minikube |
| Browser | Google Chrome |

---

# 🤖 Recommended Ollama Models

```bash
ollama pull llama3.2:3b
ollama pull qwen2.5-coder:7b
ollama pull gemma3:4b
ollama pull deepseek-r1:7b
ollama pull nomic-embed-text
```

These models are selected to run efficiently on a **16 GB RAM** development machine while providing strong support for coding, documentation, reasoning, and embeddings.

---

# 🎯 Final Outcome

By the end of this course, you will have built a production-ready AI Developer Assistant capable of:

- ✅ Chrome Extension (Manifest V3)
- ✅ AI Chat with Ollama
- ✅ Multi-Model AI Router
- ✅ Model Context Protocol (MCP)
- ✅ Retrieval-Augmented Generation (RAG)
- ✅ ChromaDB Vector Database
- ✅ GitHub Repository Chat
- ✅ PDF Chat
- ✅ OCR & Voice Assistant
- ✅ Docker & Kubernetes Assistant
- ✅ Jenkins & CI/CD Integration
- ✅ Production Deployment
- ✅ Chrome Web Store Ready Extension

This project demonstrates modern AI engineering, full-stack development, browser extension development, DevOps, and cloud-native practices using free and open-source technologies.