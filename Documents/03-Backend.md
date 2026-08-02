# Chapter 3 – Node.js Backend API

## 🎯 Chapter Objective

In this chapter, we will build the backend API for the **Zeba AI Chrome Extension**. The backend will act as the communication layer between the Chrome Extension and AI providers such as **Ollama**, **OpenAI**, **Gemini**, and **Claude**.

Unlike Chapter 2, where we focused on building the Chrome Extension foundation, this chapter focuses on creating a scalable, production-ready backend using **Node.js**, **Express**, and **TypeScript**.

By the end of this chapter, the Chrome Extension will communicate with a backend server instead of returning mock responses.

---

# 🏗 Chapter 3 Breakdown

Just like Chapter 2, Chapter 3 is divided into **10 milestones**. Each milestone ends with a working feature and a Git commit.

---

# Milestone 1 – Backend Project Setup

## 🎥 Episode 3.1

## Goal

Create the Node.js backend project and verify that it runs successfully.

---

## Topics

- Create Node.js project
- Configure TypeScript
- Install Express
- Setup npm scripts
- Start development server

---

## Deliverable

```text
backend/

├── package.json
├── tsconfig.json
└── src/
    └── server.ts
```

---

## Expected Result

```text
http://localhost:3000

↓

Server Running
```

---

## Git Commit

```bash
git add .

git commit -m "feat(backend): initialize Node.js backend"
```

---

# Milestone 2 – Express Architecture

## 🎥 Episode 3.2

## Goal

Create a scalable Express application architecture following enterprise standards.

---

## Topics

- app.ts
- server.ts
- Folder Structure
- Routes
- Controllers
- Services
- Environment Variables

---

## Deliverable

```text
backend/

src/

├── app.ts
├── server.ts
├── routes/
├── controllers/
├── services/
├── config/
└── utils/
```

---

## Expected Result

A clean and scalable Express application architecture.

---

## Git Commit

```bash
git commit -m "feat(backend): create express architecture"
```

---

# Milestone 3 – Health API

## 🎥 Episode 3.3

## Goal

Create a Health Check endpoint that verifies whether the backend is running.

---

## Endpoint

```http
GET /health
```

---

## Response

```json
{
  "status": "OK",
  "version": "1.0.0",
  "uptime": 123
}
```

---

## Purpose

The Chrome Extension will use this endpoint to verify that the backend is online before sending AI requests.

---

## Expected Result

```text
Browser

↓

GET /health

↓

{
   status : OK
}
```

---

## Git Commit

```bash
git commit -m "feat(backend): implement health api"
```

---

# Milestone 4 – AI Route

## 🎥 Episode 3.4

## Goal

Create the first AI endpoint.

---

## Endpoint

```http
POST /api/v1/ai/chat
```

---

## Initial Response

Return mock data only.

```json
{
  "success": true,
  "response": "Hello from DevPilot Backend"
}
```

---

## Expected Flow

```text
Chrome Extension

↓

Backend API

↓

Mock Response

↓

Chrome Extension
```

---

## Git Commit

```bash
git commit -m "feat(backend): create ai chat route"
```

---

# Milestone 5 – Validation

## 🎥 Episode 3.5

## Goal

Validate incoming API requests using **Zod**.

---

## Example Request

```json
{
  "prompt": "Explain Docker",
  "model": "llama3"
}
```

---

## Topics

- Install Zod
- Create validation schema
- Validate request body
- Handle invalid requests
- Return validation errors

---

## Expected Result

Only valid requests should be processed.

---

## Git Commit

```bash
git commit -m "feat(backend): add request validation"
```

---

# Milestone 6 – Middleware

## 🎥 Episode 3.6

## Goal

Implement common Express middleware used in production applications.

---

## Middleware

- CORS
- Helmet
- Morgan
- Error Handler
- Request Logger
- Request ID Generator

---

## Architecture

```text
Request

↓

Logger

↓

CORS

↓

Helmet

↓

Routes

↓

Controller

↓

Error Handler
```

---

## Expected Result

Every request is logged and secured.

---

## Git Commit

```bash
git commit -m "feat(backend): implement middleware"
```

---

# Milestone 7 – Service Layer

## 🎥 Episode 3.7

## Goal

Separate business logic from controllers.

---

## Architecture

```text
Controller

↓

AI Service

↓

Provider
```

---

## Benefits

- Clean Controllers
- Reusable Business Logic
- Easy Unit Testing
- Better Maintainability

---

## Git Commit

```bash
git commit -m "feat(backend): implement service layer"
```

---

# Milestone 8 – AI Provider Pattern

## 🎥 Episode 3.8

## Goal

Create a provider architecture for multiple AI providers.

---

## Provider Structure

```text
Provider

├── Ollama

├── OpenAI

├── Gemini

└── Claude
```

---

## Topics

- Provider Interface
- Provider Factory
- Mock Provider Responses
- Extensible Design

---

## Expected Result

Each provider returns mock responses while maintaining a common interface.

---

## Git Commit

```bash
git commit -m "feat(backend): implement provider architecture"
```

---

# Milestone 9 – Connect Chrome Extension

## 🎥 Episode 3.9

## Goal

Replace runtime mock responses with backend API communication.

---

## Endpoint

```http
POST http://localhost:3000/api/v1/ai/chat
```

---

## Runtime Flow

```text
Popup

↓

Background Worker

↓

Backend

↓

Background Worker

↓

Popup
```

---

## Expected Result

The popup receives responses from the backend instead of returning mock runtime data.

---

## Git Commit

```bash
git commit -m "feat(extension): connect backend api"
```

---

# Milestone 10 – Production Ready

## 🎥 Episode 3.10

## Goal

Prepare the backend for production deployment.

---

## Add

- Environment Configuration
- Centralized Error Handling
- Logging
- API Versioning
- Project Cleanup
- Build Verification

---

## Final Architecture

```text
Chrome Extension

        │

        ▼

Node.js Backend

        │

        ▼

AI Service

        │

        ▼

Provider Layer

   ┌──────────────┴──────────────┐

   ▼                             ▼

Ollama                       OpenAI
```

---

## Expected Result

A production-ready backend architecture ready for AI integration.

---

## Git Commit

```bash
git commit -m "feat(backend): complete backend foundation"
```

---

# 📁 Repository Structure

As the project evolves into a complete full-stack application, the repository structure should look like this:

```text
AI-powered-Full-Stack-Developer-Assistant/

├── chrome-extension/      ✅ Completed (Chapter 2)
│
├── backend/               🚀 Chapter 3
│
├── docs/
│
├── screenshots/
│
├── README.md
│
└── docker-compose.yml     (Added in a later chapter)
```

---

# 🎯 Chapter Summary

By the end of Chapter 3, you will have built a scalable backend foundation that includes:

- ✅ Node.js + Express + TypeScript setup
- ✅ Enterprise project architecture
- ✅ Health Check API
- ✅ AI Chat API
- ✅ Request Validation using Zod
- ✅ Production Middleware
- ✅ Service Layer Architecture
- ✅ AI Provider Pattern
- ✅ Chrome Extension Integration
- ✅ Production-ready Backend

---

# 🚀 What's Next?

After completing Chapter 3, your Chrome Extension will communicate with a real backend instead of mock responses.

This backend will then be extended in future chapters to integrate:

- Ollama
- OpenAI
- Gemini
- Claude
- GitHub APIs
- LangChain
- Docker
- Kubernetes
- CI/CD Pipelines

At this point, the project transitions from a standalone Chrome Extension into a complete **AI-Powered Full-Stack Developer Assistant** platform.