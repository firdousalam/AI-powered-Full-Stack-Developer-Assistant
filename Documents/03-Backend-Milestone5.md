# Milestone 5 – Request Validation

## 🎥 Episode 3.5

---

# 🎯 Goal

Validate all incoming API requests using **Zod** before they reach the business logic.

Request validation is one of the most important aspects of backend development. It ensures that only properly formatted data is processed by the application.

By implementing validation, we can prevent invalid requests from reaching controllers and services, resulting in a more secure, reliable, and maintainable API.

---

# 📚 Learning Objectives

By the end of this milestone, you will learn:

- Why request validation is important
- Install and configure Zod
- Create reusable validation schemas
- Validate incoming request bodies
- Return meaningful validation errors
- Keep controllers clean
- Prepare the backend for AI integrations

---

# 🏗 Architecture

```text
Chrome Extension

        │

        ▼

POST /api/v1/ai/chat

        │

        ▼

Validation Middleware (Zod)

        │

        ▼

Controller

        │

        ▼

AI Service

        │

        ▼

Mock Response
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
├── controllers/
│   ├── ai.controller.ts
│   └── health.controller.ts
│
├── middleware/
│   └── validate.middleware.ts
│
├── routes/
│   ├── ai.routes.ts
│   ├── health.routes.ts
│   └── index.ts
│
├── schemas/
│   └── ai.schema.ts
│
├── services/
│
├── types/
│
└── utils/
```

---

# Step 1 – Why Validation?

Suppose a client sends

```json
{
    "prompt": "",
    "model": 123
}
```

or

```json
{}
```

Without validation, your application may:

- Crash
- Produce incorrect responses
- Throw runtime exceptions
- Send bad requests to AI providers

Validation prevents these issues before they reach the controller.

---

# Step 2 – Install Zod

Install Zod

```bash
npm install zod
```

Verify

```bash
npm list zod
```

Expected Output

```
zod@4.x.x
```

---

# Step 3 – Create Validation Schema

Create

```
src/schemas/ai.schema.ts
```

```ts
import { z } from "zod";

export const chatSchema = z.object({

    prompt: z.string().min(1),

    model: z.string().min(1)

});
```

---

# Explanation

The schema expects

```json
{
    "prompt": "Explain Docker",
    "model": "llama3"
}
```

Rules

- prompt must be a string
- prompt cannot be empty
- model must be a string
- model cannot be empty

---

# Step 4 – Create Validation Middleware

Create

```
src/middleware/validate.middleware.ts
```

```ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =

(schema: ZodSchema) =>

(req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse(req.body);

    if (!result.success) {

        return res.status(400).json({

            success: false,

            errors: result.error.issues

        });

    }

    req.body = result.data;

    next();

};
```

---

# Explanation

The middleware

- Reads request body
- Validates it
- Returns validation errors
- Calls next() only when validation succeeds

---

# Step 5 – Apply Middleware

Open

```
src/routes/ai.routes.ts
```

```ts
import { Router } from "express";

import { chat } from "../controllers/ai.controller";

import { validate } from "../middleware/validate.middleware";

import { chatSchema } from "../schemas/ai.schema";

const router = Router();

router.post(

    "/chat",

    validate(chatSchema),

    chat

);

export default router;
```

---

# Request Flow

```text
Incoming Request

↓

Validation

↓

Valid?

↓

YES

↓

Controller

↓

Response
```

Invalid Request

```text
Incoming Request

↓

Validation

↓

NO

↓

400 Bad Request
```

---

# Step 6 – Update Controller

Open

```
src/controllers/ai.controller.ts
```

```ts
import { Request, Response } from "express";

export const chat = (

req: Request,

res: Response

) => {

    const {

        prompt,

        model

    } = req.body;

    console.log(prompt);

    console.log(model);

    res.json({

        success: true,

        response: "Hello from DevPilot Backend"

    });

};
```

Since the request has already been validated, the controller can safely use the data.

---

# Step 7 – Test Valid Request

POST

```
/api/v1/ai/chat
```

Body

```json
{
    "prompt": "Explain Docker",
    "model": "llama3"
}
```

Expected Response

```json
{
    "success": true,
    "response": "Hello from DevPilot Backend"
}
```

Console

```
Explain Docker

llama3
```

---

# Step 8 – Test Missing Prompt

Request

```json
{
    "model": "llama3"
}
```

Expected Response

```json
{
    "success": false,
    "errors": [
        {
            "path": [
                "prompt"
            ],
            "message": "Invalid input"
        }
    ]
}
```

---

# Step 9 – Test Empty Prompt

Request

```json
{
    "prompt": "",
    "model": "llama3"
}
```

Expected Response

```json
{
    "success": false,
    "errors": [
        {
            "message": "Too small"
        }
    ]
}
```

---

# Step 10 – Test Wrong Data Type

Request

```json
{
    "prompt": 123,
    "model": true
}
```

Expected Response

```json
{
    "success": false,
    "errors": [
        {
            "path": [
                "prompt"
            ]
        },
        {
            "path": [
                "model"
            ]
        }
    ]
}
```

---

# Step 11 – Improve Validation Messages

Update schema

```ts
import { z } from "zod";

export const chatSchema = z.object({

    prompt: z

        .string()

        .min(1, "Prompt is required"),

    model: z

        .string()

        .min(1, "Model is required")

});
```

Now validation errors become easier to understand.

Example

```json
{
    "success": false,
    "errors": [
        {
            "message": "Prompt is required"
        }
    ]
}
```

---

# Step 12 – Validate Additional Fields (Optional)

You can extend the schema

```ts
export const chatSchema = z.object({

    prompt: z.string().min(1),

    model: z.string(),

    temperature: z.number().optional(),

    maxTokens: z.number().optional()

});
```

Example Request

```json
{
    "prompt": "Explain Docker",
    "model": "llama3",
    "temperature": 0.7,
    "maxTokens": 500
}
```

---

# Step 13 – Why Middleware?

Without Middleware

```text
Route

↓

Controller

↓

Validation

↓

Business Logic
```

Every controller repeats validation logic.

With Middleware

```text
Route

↓

Validation Middleware

↓

Controller

↓

Business Logic
```

Controllers remain clean and focused.

---

# Step 14 – Future Flow

Current

```text
Popup

↓

Backend

↓

Validation

↓

Mock Response
```

Future

```text
Popup

↓

Backend

↓

Validation

↓

AI Service

↓

Provider

↓

Ollama

↓

Response
```

---

# Step 15 – Common Issues

## Issue 1 – Cannot Find Module "zod"

Run

```bash
npm install zod
```

---

## Issue 2 – Validation Never Runs

Verify

```ts
validate(chatSchema)
```

is added before the controller.

---

## Issue 3 – req.body Undefined

Verify

```ts
app.use(express.json());
```

is registered.

---

## Issue 4 – Invalid Requests Reach Controller

Ensure middleware calls

```ts
return res.status(400)
```

when validation fails.

---

## Issue 5 – Empty Strings Accepted

Use

```ts
.min(1)
```

instead of

```ts
z.string()
```

---

# ✅ Testing Checklist

Verify

- [ ] Zod installed
- [ ] Schema created
- [ ] Middleware created
- [ ] Middleware applied to route
- [ ] Valid request succeeds
- [ ] Missing fields fail
- [ ] Empty fields fail
- [ ] Wrong data types fail
- [ ] Controller receives validated data

---

# 📁 Folder Structure After Milestone 5

```text
backend/

src/

├── app.ts
├── server.ts
│
├── config/
│
├── controllers/
│   ├── ai.controller.ts
│   └── health.controller.ts
│
├── middleware/
│   └── validate.middleware.ts
│
├── routes/
│   ├── ai.routes.ts
│   ├── health.routes.ts
│   └── index.ts
│
├── schemas/
│   └── ai.schema.ts
│
├── services/
├── types/
└── utils/
```

---

# 🎯 Deliverables

By the end of this milestone, you will have:

- ✅ Zod Installed
- ✅ Validation Schema
- ✅ Validation Middleware
- ✅ Request Body Validation
- ✅ Clean Controllers
- ✅ Meaningful Error Responses
- ✅ Invalid Request Protection
- ✅ Backend Ready for AI Service Integration

---

# 💻 Git Commands

```bash
git add .

git commit -m "feat(backend): add request validation"

git push origin develop
```

---

# 🚀 Next Milestone

## Milestone 6 – Middleware (Episode 3.6)

In the next milestone, we'll make the backend production-ready by adding:

- CORS
- Helmet
- Morgan
- Global Error Handler
- Request Logger
- Request ID Generation

This will significantly improve the security, debugging, and maintainability of the backend.