# Milestone 4 – AI Route

## 🎥 Episode 3.4

---

# 🎯 Goal

Create the first AI API endpoint that the Chrome Extension will use to communicate with the backend.

At this stage, the endpoint **does not call any AI model**.

It simply returns a **mock response**, allowing us to verify the complete request and response flow between the Chrome Extension and the Node.js backend.

---

# 📚 Learning Objectives

By the end of this milestone, you will learn:

- Create REST POST APIs using Express
- Understand API versioning
- Create controllers and routes
- Receive JSON request bodies
- Send JSON responses
- Test APIs using Postman
- Prepare the backend for AI integration

---

# 🏗 Architecture

```text
Chrome Extension

        │

        ▼

POST /api/v1/ai/chat

        │

        ▼

Express Route

        │

        ▼

AI Controller

        │

        ▼

Mock Response

        │

        ▼

Chrome Extension
```

---

# 📁 Project Structure

```text
backend/

src/

├── app.ts
├── server.ts
│
├── config/
│
├── routes/
│   ├── index.ts
│   ├── health.routes.ts
│   └── ai.routes.ts
│
├── controllers/
│   ├── health.controller.ts
│   └── ai.controller.ts
│
├── services/
│
├── utils/
│
└── types/
```

---

# Step 1 – Understand the AI Endpoint

The Chrome Extension needs a backend endpoint to send AI prompts.

Instead of communicating directly with AI providers, the extension will always communicate with our backend.

Example Flow

```text
Popup

↓

Background Worker

↓

Backend

↓

AI Provider

↓

Backend

↓

Popup
```

In this milestone, the AI Provider is not implemented yet.

---

# Step 2 – Create AI Route

Create

```
src/routes/ai.routes.ts
```

```ts
import { Router } from "express";
import { chat } from "../controllers/ai.controller";

const router = Router();

router.post("/chat", chat);

export default router;
```

### Explanation

- Create a Router.
- Register a POST endpoint.
- Export the router.

---

# Step 3 – Create AI Controller

Create

```
src/controllers/ai.controller.ts
```

```ts
import { Request, Response } from "express";

export const chat = (
    req: Request,
    res: Response
) => {

    res.json({

        success: true,

        response: "Hello from DevPilot Backend"

    });

};
```

### Explanation

The controller currently ignores the request body and simply returns mock data.

Later this controller will call the AI Service.

---

# Step 4 – Register AI Route

Open

```
src/routes/index.ts
```

```ts
import { Router } from "express";

import healthRoutes from "./health.routes";
import aiRoutes from "./ai.routes";

const router = Router();

router.use("/health", healthRoutes);

router.use("/api/v1/ai", aiRoutes);

export default router;
```

### Explanation

Now every request to

```
POST /api/v1/ai/chat
```

will be handled by

```
ai.controller.ts
```

---

# Step 5 – Verify app.ts

Open

```
src/app.ts
```

```ts
import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

export default app;
```

### Why express.json()?

Without it, Express cannot read JSON request bodies.

---

# Step 6 – Start the Server

Run

```bash
npm run dev
```

Expected Output

```
🚀 Server running on port 3000
```

---

# Step 7 – Test Using Postman

Method

```
POST
```

URL

```
http://localhost:3000/api/v1/ai/chat
```

Headers

```
Content-Type

application/json
```

Body

```json
{
    "prompt": "Explain Docker"
}
```

Click

```
Send
```

Expected Response

```json
{
    "success": true,
    "response": "Hello from DevPilot Backend"
}
```

---

# Step 8 – Test Using Thunder Client

Method

```
POST
```

URL

```
http://localhost:3000/api/v1/ai/chat
```

Body

```json
{
    "prompt": "Explain Kubernetes"
}
```

Expected Response

```json
{
    "success": true,
    "response": "Hello from DevPilot Backend"
}
```

---

# Step 9 – Test Using cURL

```bash
curl -X POST http://localhost:3000/api/v1/ai/chat ^
-H "Content-Type: application/json" ^
-d "{\"prompt\":\"Explain Docker\"}"
```

Linux / macOS

```bash
curl -X POST http://localhost:3000/api/v1/ai/chat \
-H "Content-Type: application/json" \
-d '{"prompt":"Explain Docker"}'
```

Expected Response

```json
{
    "success": true,
    "response": "Hello from DevPilot Backend"
}
```

---

# Step 10 – Read the Request Body

Update

```
ai.controller.ts
```

```ts
import { Request, Response } from "express";

export const chat = (
    req: Request,
    res: Response
) => {

    console.log(req.body);

    res.json({

        success: true,

        response: "Hello from DevPilot Backend"

    });

};
```

Console Output

```json
{
    "prompt": "Explain Docker"
}
```

Now the backend can receive JSON from clients.

---

# Step 11 – Return Dynamic Mock Response (Optional)

Instead of a fixed response

```ts
const { prompt } = req.body;

res.json({

    success: true,

    response: `Mock AI Response for: ${prompt}`

});
```

Example Response

```json
{
    "success": true,
    "response": "Mock AI Response for: Explain Docker"
}
```

This makes testing easier.

---

# Step 12 – API Versioning

Notice the endpoint

```
/api/v1/ai/chat
```

Breaking it down

```
api

↓

v1

↓

ai

↓

chat
```

Advantages

- Future versions
- Backward compatibility
- Easier maintenance

Example

```
/api/v1/ai/chat

/api/v2/ai/chat
```

---

# Step 13 – Future Architecture

Currently

```text
Chrome Extension

↓

Backend

↓

Mock Response
```

Later

```text
Chrome Extension

↓

Backend

↓

AI Service

↓

Ollama

↓

Response

↓

Chrome Extension
```

Eventually

```text
Chrome Extension

↓

Backend

↓

AI Service

↓

Provider

├── Ollama

├── OpenAI

├── Gemini

└── Claude
```

---

# Step 14 – Connect Chrome Extension (Preview)

Later in Chapter 3, the Background Worker will call this endpoint.

Example

```ts
const response = await fetch(

    "http://localhost:3000/api/v1/ai/chat",

    {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            prompt: "Explain Docker"

        })

    }

);

const data = await response.json();

console.log(data);
```

Expected Response

```json
{
    "success": true,
    "response": "Hello from DevPilot Backend"
}
```

---

# Step 15 – Common Issues

## 1. Cannot POST /api/v1/ai/chat

Verify

```ts
router.use("/api/v1/ai", aiRoutes);
```

---

## 2. req.body is Undefined

Ensure

```ts
app.use(express.json());
```

is registered before routes.

---

## 3. 404 Not Found

Verify URL

```
http://localhost:3000/api/v1/ai/chat
```

---

## 4. Empty Request Body

Verify Header

```
Content-Type

application/json
```

---

## 5. Server Not Running

Run

```bash
npm run dev
```

---

# ✅ Testing Checklist

Verify the following

- [ ] Server starts successfully
- [ ] POST endpoint works
- [ ] HTTP Status Code is 200
- [ ] JSON request body is received
- [ ] JSON response is returned
- [ ] Tested in Postman
- [ ] Tested in Thunder Client
- [ ] Tested using cURL
- [ ] No runtime errors

---

# 📁 Folder Structure After Milestone 4

```text
backend/

src/

├── app.ts
├── server.ts
│
├── routes/
│   ├── index.ts
│   ├── health.routes.ts
│   └── ai.routes.ts
│
├── controllers/
│   ├── health.controller.ts
│   └── ai.controller.ts
│
├── services/
├── config/
├── utils/
└── types/
```

---

# 🎯 Deliverables

By the end of this milestone, you will have:

- ✅ AI Chat Route
- ✅ POST REST API
- ✅ Controller Layer
- ✅ Route Layer
- ✅ JSON Request Parsing
- ✅ JSON Response
- ✅ Mock AI Response
- ✅ Chrome Extension Ready for Backend Integration

---

# 💻 Git Commands

```bash
git add .

git commit -m "feat(backend): create ai chat route"

git push origin develop
```

---

# 🚀 Next Milestone

## Milestone 5 – Request Validation (Episode 3.5)

Next, we'll validate incoming requests using **Zod**.

Expected Request

```json
{
    "prompt": "Explain Docker",
    "model": "llama3"
}
```

We'll learn how to:

- Validate request bodies
- Return meaningful validation errors
- Reject invalid requests
- Improve API reliability
- Prepare the backend for real AI providers