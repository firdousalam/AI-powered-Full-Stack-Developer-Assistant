# Chapter 3 – Node.js Backend API

# Milestone 7 – Service Layer

## 🎥 Episode 3.7

---

# 🎯 Goal

Implement a **Service Layer** to separate business logic from the controllers.

In enterprise applications, controllers should only receive the HTTP request and return the HTTP response. All business logic should reside inside services.

This architecture improves maintainability, scalability, readability, and makes unit testing much easier.

---

# 📚 Learning Objectives

By the end of this milestone, you will learn:

- Why a Service Layer is important
- Responsibilities of Controllers
- Responsibilities of Services
- How Controllers communicate with Services
- Returning responses from Services
- Creating reusable business logic
- Enterprise project architecture

---

# 🏗 Architecture

```text
Client

        │

        ▼

Routes

        │

        ▼

Controller

        │

        ▼

AI Service

        │

        ▼

Mock Provider

        │

        ▼

Controller

        │

        ▼

Client
```

---

# Why Do We Need a Service Layer?

Without a Service Layer, controllers quickly become very large.

Bad Example

```text
Controller

↓

Validation

↓

Business Logic

↓

Database

↓

AI Calls

↓

Formatting

↓

Response
```

The controller becomes difficult to maintain.

A better approach is:

```text
Controller

↓

Service

↓

Provider

↓

Controller
```

Each layer has one responsibility.

---

# Project Structure

```
backend/

src/

├── app.ts

├── server.ts

├── config/

├── controllers/
│      ai.controller.ts

├── routes/
│      ai.routes.ts

├── services/
│      ai.service.ts

├── middleware/

├── schemas/

├── utils/

└── types/
```

---

# Folder Responsibilities

## controllers/

Responsible for:

- Receiving HTTP requests
- Calling services
- Returning HTTP responses

No business logic should exist here.

---

## services/

Responsible for:

- Business logic
- AI request processing
- Calling external providers
- Data transformation

---

# Step 1 – Create Service Folder

Create:

```
src/services
```

Inside it create:

```
ai.service.ts
```

---

# Step 2 – Create AI Service

File

```
src/services/ai.service.ts
```

```ts
class AIService {

    async chat(prompt: string, model: string) {

        return {
            success: true,
            response: "Hello from AI Service",
            prompt,
            model
        };

    }

}

export default new AIService();
```

This service returns mock data for now.

Later it will call:

- Ollama
- OpenAI
- Gemini
- Claude

---

# Step 3 – Update Controller

Open

```
src/controllers/ai.controller.ts
```

Import the service.

```ts
import AIService from "../services/ai.service";
```

---

# Step 4 – Call the Service

Instead of returning the response directly from the controller, call the service.

```ts
const result = await AIService.chat(
    prompt,
    model
);

res.json(result);
```

Now the controller delegates the work to the service.

---

# Step 5 – Keep Controller Lightweight

The controller should now look similar to:

```ts
export const chat = async (req, res) => {

    const { prompt, model } = req.body;

    const result = await AIService.chat(
        prompt,
        model
    );

    res.json(result);

};
```

Notice that the controller no longer contains business logic.

---

# Step 6 – Build the Project

Run

```bash
npm run build
```

Expected Output

```
Build completed successfully.
```

---

# Step 7 – Start the Server

Run

```bash
npm run dev
```

Console

```
Server running on http://localhost:3000
```

---

# Step 8 – Test Using Postman

Request

```
POST

http://localhost:3000/api/v1/ai/chat
```

Body

```json
{
    "prompt": "Explain Docker",
    "model": "llama3"
}
```

Response

```json
{
    "success": true,
    "response": "Hello from AI Service",
    "prompt": "Explain Docker",
    "model": "llama3"
}
```

---

# Step 9 – Test Using cURL

```bash
curl --location 'http://localhost:3000/api/v1/ai/chat' \
--header 'Content-Type: application/json' \
--data '{
    "prompt":"Explain Docker",
    "model":"llama3"
}'
```

Expected Response

```json
{
    "success": true,
    "response": "Hello from AI Service",
    "prompt": "Explain Docker",
    "model": "llama3"
}
```

---

# Step 10 – Understand the Flow

```
POST Request

↓

Express Route

↓

AI Controller

↓

AI Service

↓

Mock Response

↓

Controller

↓

Browser
```

This layered flow is used in production applications because each component has a single responsibility.

---

# Step 11 – Why Use a Service Layer?

Without a Service Layer:

```
Controller

↓

Validation

↓

AI Calls

↓

Prompt Engineering

↓

Response Formatting

↓

Logging

↓

HTTP Response
```

Controllers become large and difficult to maintain.

With a Service Layer:

```
Controller

↓

AI Service

↓

Provider

↓

Response
```

Each layer focuses on one job, making the application easier to extend and test.

---

# Step 12 – Future Architecture

The current service returns mock data.

In the next milestones it will connect to AI providers.

Future flow

```text
Chrome Extension

↓

Backend

↓

Controller

↓

AI Service

↓

AI Provider

↓

Ollama

↓

AI Service

↓

Controller

↓

Chrome Extension
```

No provider integration is required in this milestone.

---

# Step 13 – Best Practices

✅ Controllers should only handle HTTP requests and responses.

✅ Services should contain all business logic.

✅ Keep controllers thin and services reusable.

✅ Avoid duplicating logic across controllers.

✅ Use dependency injection in larger projects.

✅ Return plain objects from services.

✅ Handle errors centrally using middleware.

---

# Step 14 – Verify the Milestone

Checklist

- ✅ Project builds successfully.
- ✅ Server starts without errors.
- ✅ AI Service is created.
- ✅ Controller calls the AI Service.
- ✅ API returns mock response.
- ✅ Business logic is separated from the controller.
- ✅ Clean enterprise architecture is implemented.

---

# Final Architecture

```text
Client

        │

        ▼

Routes

        │

        ▼

Controller

        │

        ▼

AI Service

        │

        ▼

(Mock Provider)

        │

        ▼

Controller

        │

        ▼

Client
```

---

# Benefits of Service Layer

- ✅ Clean Controllers
- ✅ Reusable Business Logic
- ✅ Easy Unit Testing
- ✅ Better Maintainability
- ✅ Easier Integration with AI Providers
- ✅ Scalable Architecture
- ✅ Enterprise-Ready Design

---

# Deliverables

By the end of this milestone, you will have:

- ✅ AI Service implementation
- ✅ Thin Controllers
- ✅ Business Logic separated into services
- ✅ Mock AI response returned through the service
- ✅ Enterprise-grade backend architecture

---

# Git Commit

```bash
git add .

git commit -m "feat(backend): implement service layer"

git push origin develop
```

---

# What's Next?

➡️ **Milestone 8 – AI Provider Pattern**

In the next milestone, you'll implement the **Provider Pattern** by creating interchangeable AI providers for:

- Ollama
- OpenAI
- Gemini
- Claude

Initially, each provider will return mock responses, preparing the backend for real AI integrations in later chapters.