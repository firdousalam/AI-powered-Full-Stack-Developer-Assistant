# Chapter 3 - Backend Development

> **Build DevPilot AI Backend using Node.js, Express, MongoDB, JWT & WebSocket**

---

# 📖 Chapter Overview

In this chapter, we will build the backend API for **DevPilot AI**.

The backend acts as the brain of the application. It connects the Chrome Extension with AI models, MongoDB, MCP servers, Vector Database, and external services.

By the end of this chapter, you will have a production-ready backend architecture following industry best practices.

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Design scalable backend architecture
- Build REST APIs using Express
- Connect MongoDB
- Implement JWT Authentication
- Build reusable services
- Create API documentation with Swagger
- Implement WebSocket for streaming AI responses
- Add centralized logging
- Handle errors globally
- Validate API requests
- Organize enterprise-level folder structure

---

# 🏗 Backend Architecture

```text
                   Chrome Extension

                         │

                    REST / WebSocket

                         │

                         ▼

                  Express API Server

                         │

 ┌───────────────────────┼────────────────────────┐

 ▼                       ▼                        ▼

Authentication      AI Controller         Chat Controller

 ▼                       ▼                        ▼

JWT Service        AI Router Service     Chat Service

                         │

 ┌───────────────────────┼────────────────────────┐

 ▼                       ▼                        ▼

MongoDB           Ollama Service          MCP Gateway

                         │

 ┌───────────────────────┼────────────────────────┐

 ▼                       ▼                        ▼

Vector DB         GitHub MCP         Docker MCP

                         │

                         ▼

                  Kubernetes MCP
```

---

# 🛠 Technology Stack

| Layer | Technology |
|---------|------------|
| Runtime | Node.js 22+ |
| Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcrypt |
| API Documentation | Swagger |
| Validation | express-validator |
| File Upload | Multer |
| Logging | Winston + Morgan |
| WebSocket | Socket.IO |
| Environment | dotenv |

---

# 📁 Backend Folder Structure

```text
backend/

├── src/
│
├── config/
│   ├── database.ts
│   ├── swagger.ts
│   ├── logger.ts
│   └── environment.ts
│
├── controllers/
│   ├── auth.controller.ts
│   ├── chat.controller.ts
│   ├── ai.controller.ts
│   ├── user.controller.ts
│   └── upload.controller.ts
│
├── services/
│   ├── auth.service.ts
│   ├── chat.service.ts
│   ├── ai.service.ts
│   ├── ollama.service.ts
│   ├── embedding.service.ts
│   └── rag.service.ts
│
├── repositories/
│   ├── user.repository.ts
│   ├── chat.repository.ts
│   └── history.repository.ts
│
├── models/
│   ├── User.ts
│   ├── Chat.ts
│   └── Prompt.ts
│
├── routes/
│   ├── auth.routes.ts
│   ├── chat.routes.ts
│   ├── ai.routes.ts
│   └── upload.routes.ts
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── logger.middleware.ts
│   ├── validation.middleware.ts
│   └── upload.middleware.ts
│
├── websocket/
│   └── socket.ts
│
├── utils/
│
├── types/
│
├── app.ts
└── server.ts

package.json
.env
Dockerfile
README.md
```

---

# 📦 Required Packages

## Runtime Dependencies

```bash
npm install express mongoose dotenv cors helmet compression jsonwebtoken bcrypt multer socket.io swagger-ui-express swagger-jsdoc express-validator axios uuid
```

## Development Dependencies

```bash
npm install -D typescript ts-node nodemon @types/node @types/express @types/jsonwebtoken @types/bcrypt @types/multer @types/cors @types/uuid eslint prettier
```

---

# 🔐 Authentication

Authentication will use JWT.

Workflow

```text
User Login

↓

Validate Credentials

↓

Generate JWT

↓

Return Token

↓

Chrome Extension Stores Token

↓

Authenticated Requests
```

---

# 🗄 MongoDB Collections

```text
users

chat_history

prompt_library

bookmarks

favorites

settings

uploaded_files

embeddings

audit_logs
```

---

# 📡 REST API Design

## Authentication APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/refresh |
| POST | /api/auth/logout |

---

## Chat APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/chat |
| GET | /api/chat/history |
| DELETE | /api/chat/:id |

---

## AI APIs

| Method | Endpoint |
|---------|----------|
| GET | /api/models |
| POST | /api/ai/chat |
| POST | /api/ai/stream |

---

## User APIs

| Method | Endpoint |
|---------|----------|
| GET | /api/user/profile |
| PUT | /api/user/profile |
| PUT | /api/user/settings |

---

## Upload APIs

| Method | Endpoint |
|---------|----------|
| POST | /api/upload/file |
| POST | /api/upload/image |
| POST | /api/upload/pdf |

---

# 🔄 Request Flow

```text
Chrome Extension

↓

Express Route

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Service

↓

Controller

↓

Response
```

---

# 🔌 WebSocket Architecture

Streaming AI responses will use Socket.IO.

```text
Chrome Extension

↓

WebSocket

↓

Express Server

↓

AI Router

↓

Ollama

↓

Streaming Response

↓

Chrome Extension
```

---

# 📚 Swagger API Documentation

Swagger URL

```text
http://localhost:3000/api-docs
```

Documentation includes:

- Authentication
- AI APIs
- Chat APIs
- Upload APIs
- User APIs

---

# 📋 Logging Strategy

Two loggers will be used.

## Morgan

Logs incoming HTTP requests.

Example

```text
POST /api/chat 200 250ms
```

---

## Winston

Logs:

- Errors
- Warnings
- Information
- AI Requests
- Database Events

---

# ⚠ Global Error Handling

A centralized middleware will handle:

- Validation Errors
- JWT Errors
- MongoDB Errors
- AI Errors
- File Upload Errors
- Internal Server Errors

Example Response

```json
{
  "success": false,
  "message": "Invalid Token",
  "status": 401
}
```

---

# ✅ Request Validation

Validation examples:

- Email
- Password
- Prompt Length
- File Size
- Image Type
- PDF Size

Benefits:

- Security
- Better API Responses
- Prevent Invalid Requests

---

# 🌍 Environment Variables

Example

```env
PORT=3000

NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/devpilot

JWT_SECRET=your-secret-key

JWT_EXPIRES_IN=7d

OLLAMA_URL=http://localhost:11434

CHROMADB_URL=http://localhost:8000
```

---

# 🔒 Security Best Practices

Implement:

- Helmet
- CORS
- Rate Limiting
- JWT Authentication
- Password Hashing
- Input Validation
- Secure Headers
- Environment Variables

---

# 🧪 Testing

Verify:

- Server starts
- MongoDB connects
- JWT authentication works
- Swagger loads
- WebSocket connects
- CRUD APIs function correctly

Useful tools:

- Postman
- Bruno
- Thunder Client

---

# 🐞 Common Issues

## MongoDB Connection Failed

Possible Causes:

- MongoDB service not running
- Incorrect connection string
- Firewall

---

## JWT Invalid

Possible Causes:

- Incorrect secret
- Expired token
- Missing Authorization header

---

## Port Already in Use

Solution:

```bash
netstat -ano | findstr :3000
```

Kill the process or change the port.

---

## CORS Error

Possible Causes:

- Backend URL not allowed
- Incorrect frontend origin

---

# 📁 Deliverables

By the end of this chapter, you will have:

- ✅ Express Backend
- ✅ MongoDB Integration
- ✅ JWT Authentication
- ✅ REST APIs
- ✅ Swagger Documentation
- ✅ WebSocket Support
- ✅ Global Error Handling
- ✅ Logging
- ✅ Validation
- ✅ Enterprise Folder Structure

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat: create backend architecture with Express and MongoDB"

git push origin develop
```

---

# 📖 Summary

In this chapter, we built the backend foundation for DevPilot AI. We designed a scalable architecture using Node.js, Express, MongoDB, JWT, WebSocket, and Swagger. We organized the application into controllers, services, repositories, and middleware while adding logging, validation, and centralized error handling. This backend will power the Chrome Extension and provide APIs for AI services, document processing, authentication, and future integrations.

---

# ⏭ Next Chapter

## Chapter 4 – Ollama Integration & AI Router

In the next chapter, we will:

- Install Ollama
- Download lightweight models for a 16 GB RAM machine
- Integrate Ollama with Node.js
- Build an AI Router
- Support multiple AI models
- Stream AI responses
- Optimize prompts and memory usage
- Prepare the backend for RAG and MCP integration