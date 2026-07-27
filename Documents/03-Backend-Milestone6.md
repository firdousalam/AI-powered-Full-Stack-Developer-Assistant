# Milestone 6 – Middleware

## 🎥 Episode 3.6

# Goal

Implement production-ready Express middleware to improve security, logging, debugging, and error handling.

By the end of this milestone, every incoming request will pass through a middleware pipeline before reaching the controller.

---

# Learning Objectives

In this milestone you will learn:

- What middleware is in Express
- Middleware execution order
- Installing and configuring production middleware
- Implementing request logging
- Securing APIs using Helmet
- Enabling CORS
- Generating Request IDs
- Creating a Global Error Handler

---

# Prerequisites

Complete the previous milestones:

- ✅ Milestone 1 – Backend Setup
- ✅ Milestone 2 – Express Architecture
- ✅ Milestone 3 – Health API
- ✅ Milestone 4 – AI Route
- ✅ Milestone 5 – Request Validation

Current project structure:

```text
backend/

src/

├── app.ts
├── server.ts
├── routes/
├── controllers/
├── services/
├── middleware/
├── config/
├── utils/
└── validators/
```

---

# What is Middleware?

Middleware is a function that executes between the incoming HTTP request and the route handler.

Instead of directly reaching the controller, the request travels through multiple middleware.

Example:

```text
Client

↓

Request

↓

Middleware

↓

Controller

↓

Response
```

Middleware can:

- Log requests
- Authenticate users
- Validate requests
- Add security headers
- Handle errors
- Parse JSON
- Generate Request IDs

---

# Middleware Flow

```text
Client

↓

Morgan Logger

↓

Request ID

↓

CORS

↓

Helmet

↓

Express JSON

↓

Routes

↓

Controllers

↓

Global Error Handler

↓

Response
```

---

# Step 1 – Install Required Packages

Install the middleware packages.

```bash
npm install cors helmet morgan uuid
```

Install TypeScript definitions.

```bash
npm install -D @types/cors @types/morgan
```

---

# Step 2 – Create Middleware Folder

Project structure

```text
src/

middleware/

├── error.middleware.ts

├── logger.middleware.ts

├── requestId.middleware.ts
```

Purpose

| File | Responsibility |
|-------|----------------|
| error.middleware.ts | Handle application errors |
| logger.middleware.ts | Custom request logging |
| requestId.middleware.ts | Generate unique request IDs |

---

# Step 3 – Configure Express JSON

Open

```
src/app.ts
```

Import Express.

```ts
import express from "express";
```

Enable JSON parsing.

```ts
app.use(express.json());
```

Now Express can parse JSON request bodies.

Example Request

```json
{
    "prompt":"Explain Docker"
}
```

Without this middleware:

```
req.body

↓

undefined
```

---

# Step 4 – Enable CORS

Import CORS.

```ts
import cors from "cors";
```

Register middleware.

```ts
app.use(cors());
```

Purpose

Allows requests from your Chrome Extension.

Without CORS

```
Access-Control-Allow-Origin

Missing
```

Browser Error

```
Blocked by CORS Policy
```

---

# Step 5 – Configure Helmet

Install already completed.

Import.

```ts
import helmet from "helmet";
```

Enable.

```ts
app.use(helmet());
```

Helmet automatically adds security headers.

Example

```
X-Frame-Options

↓

DENY
```

```
X-Content-Type-Options

↓

nosniff
```

```
Content-Security-Policy
```

Your backend becomes more secure without additional code.

---

# Step 6 – Configure Morgan

Import Morgan.

```ts
import morgan from "morgan";
```

Enable logging.

```ts
app.use(morgan("dev"));
```

Run

```
GET /health
```

Console

```
GET /health 200 8 ms
```

Morgan logs

- Method
- Route
- Status
- Response Time

---

# Step 7 – Create Request ID Middleware

Create

```
src/middleware/requestId.middleware.ts
```

Example

```ts
import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

export function requestIdMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    req.headers["x-request-id"] = uuid();

    next();
}
```

Register it.

```ts
app.use(requestIdMiddleware);
```

Every request now receives a unique Request ID.

Example

```
x-request-id

↓

5c14d6bc-f932...
```

Useful for

- Debugging
- Logging
- Distributed systems

---

# Step 8 – Create Custom Logger

Create

```
src/middleware/logger.middleware.ts
```

Example

```ts
import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    console.log("==========");

    console.log(req.method);

    console.log(req.url);

    console.log(req.headers["x-request-id"]);

    console.log("==========");

    next();

}
```

Register

```ts
app.use(loggerMiddleware);
```

Console

```
==========

POST

/api/v1/ai/chat

5c14d6bc....

==========
```

---

# Step 9 – Create Global Error Handler

Create

```
src/middleware/error.middleware.ts
```

Example

```ts
import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {

    console.error(err);

    res.status(500).json({

        success: false,

        message: err.message

    });

}
```

Register it after all routes.

```ts
app.use(errorMiddleware);
```

Important

The Error Handler must always be the last middleware.

---

# Step 10 – Update app.ts

Final middleware order

```ts
app.use(morgan("dev"));

app.use(requestIdMiddleware);

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);
```

Middleware order is very important.

---

# Step 11 – Test Health API

Run

```bash
npm run dev
```

Open

```
http://localhost:3000/health
```

Expected Response

```json
{
    "status":"OK",
    "version":"1.0.0",
    "uptime":25
}
```

Console

```
GET /health

200

6 ms
```

---

# Step 12 – Test AI Route

Use Postman

or

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
    "success":true,
    "response":"Hello from DevPilot Backend"
}
```

Console

```
POST

/api/v1/ai/chat

200

12 ms
```

---

# Step 13 – Test Validation Error

Request

```json
{
    "prompt":""
}
```

Response

```json
{
    "success":false,
    "errors":[
        {
            "path":["prompt"]
        }
    ]
}
```

Validation still works correctly.

---

# Step 14 – Test Error Handler

Temporarily throw an error.

```ts
throw new Error("Something went wrong");
```

Response

```json
{
    "success":false,
    "message":"Something went wrong"
}
```

Console

```
Error: Something went wrong
```

Global error handling works correctly.

---

# Step 15 – Verify Security Headers

Open

```
http://localhost:3000/health
```

Open Browser Developer Tools

↓

Network

↓

health

↓

Headers

Verify

```
X-Frame-Options

↓

DENY
```

```
X-Content-Type-Options

↓

nosniff
```

Helmet is working successfully.

---

# Step 16 – Verify CORS

Open the Chrome Extension.

Send an API request.

If configured correctly,

No CORS errors should appear.

---

# Step 17 – Common Issues

## express.json() Missing

Problem

```
req.body

↓

undefined
```

Solution

```ts
app.use(express.json());
```

---

## CORS Error

Problem

```
Access to fetch blocked
```

Solution

```ts
app.use(cors());
```

---

## Morgan Not Logging

Verify

```ts
app.use(morgan("dev"));
```

must be before routes.

---

## Error Handler Never Executes

Ensure

```ts
app.use(errorMiddleware);
```

is the final middleware.

---

## Helmet Headers Missing

Verify

```ts
app.use(helmet());
```

is registered.

---

# Best Practices

- ✅ Register middleware in the correct order
- ✅ Keep middleware small and focused
- ✅ Use Helmet for security
- ✅ Use Morgan for logging
- ✅ Generate Request IDs for tracing
- ✅ Handle errors globally
- ✅ Avoid duplicate logging
- ✅ Keep controllers lightweight

---

# Folder Structure After Milestone 6

```text
backend/

src/

├── app.ts

├── server.ts

├── routes/

├── controllers/

├── services/

├── middleware/
│
├── error.middleware.ts
│
├── logger.middleware.ts
│
└── requestId.middleware.ts

├── validators/

├── config/

└── utils/
```

---

# Deliverables

By the end of this milestone you will have:

- ✅ Express Middleware Pipeline
- ✅ CORS Configuration
- ✅ Helmet Security
- ✅ Morgan Logging
- ✅ Request ID Generator
- ✅ Global Error Handler
- ✅ Production Ready Middleware Structure

---

# Architecture Summary

```text
Client

↓

Morgan Logger

↓

Request ID Middleware

↓

CORS

↓

Helmet

↓

Express JSON

↓

Routes

↓

Controllers

↓

Global Error Handler

↓

Response
```

---

# Git Commit

```bash
git add .

git commit -m "feat(backend): implement middleware"

git push origin develop
```

---

# Next Milestone

In **Milestone 7 – Service Layer**, you will refactor the application to separate business logic from controllers using a clean service architecture.

Architecture Preview

```text
Controller

↓

AI Service

↓

Provider

↓

Mock Response
```