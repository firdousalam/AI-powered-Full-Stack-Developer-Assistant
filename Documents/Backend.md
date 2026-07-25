Episode 2 – Backend (04-Backend-Architecture.md)
🎯 Goal

Build a scalable backend using Node.js + Express.

Architecture
Chrome Extension

↓

Express API

↓

Controllers

↓

Services

↓

Repositories

↓

MongoDB
Folder Structure
backend/

src/

config/

controllers/

routes/

middleware/

services/

repositories/

models/

validators/

auth/

mcp/

ai/

rag/

utils/

socket/

jobs/
Features
Authentication
Register
Login
JWT
Refresh Token
Chat
New Chat
Continue Chat
Streaming
Delete Chat
History
Search
Favorites
Bookmarks
MongoDB Collections
Users

Chats

Messages

PromptTemplates

Bookmarks

Favorites

History

Settings
API Design
POST /auth/login

POST /auth/register

POST /chat

GET /history

GET /models

POST /upload

POST /ocr

POST /pdf
Middleware
JWT Authentication
Validation
Logging
Error Handler
Rate Limiter
CORS
Deliverables
Express setup
MongoDB
JWT
Swagger
REST APIs
Error handling
Logging