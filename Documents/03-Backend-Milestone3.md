# Milestone 3 – Health API

## 🎥 Episode 3.3

---

# 🎯 Goal

Create a **Health Check API** that verifies whether the backend is running successfully.

This endpoint will be the first REST API exposed by the backend and will later be used by the Chrome Extension to verify that the backend is online before sending AI requests.

---

# 📚 Learning Objectives

By the end of this milestone, you will learn:

- What is a Health Check API?
- Why every production application needs one
- How to create REST APIs using Express
- How to organize routes and controllers
- How to calculate server uptime
- How to return JSON responses
- How to test APIs using Browser, Postman, Thunder Client, and cURL

---

# 🏗 Architecture

```text
Chrome Extension

        │

        ▼

GET /health

        │

        ▼

Express Backend

        │

        ▼

Health Controller

        │

        ▼

JSON Response
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
│   └── health.routes.ts
│
├── controllers/
│   └── health.controller.ts
│
├── services/
│
├── utils/
│
└── types/
```

---

# Step 1 – Understand Health APIs

A Health API is one of the most common endpoints in backend development.

It allows:

- Monitoring tools
- Load Balancers
- Docker
- Kubernetes
- Chrome Extension
- Developers

to verify whether the application is alive and running.

Typical Health Endpoints

```http
GET /health

GET /healthz

GET /status

GET /ping
```

---

# Step 2 – Create the Health Route

Create a new file:

```
src/routes/health.routes.ts
```

```ts
import { Router } from "express";
import { getHealth } from "../controllers/health.controller";

const router = Router();

router.get("/", getHealth);

export default router;
```

### Explanation

- Create an Express Router.
- Register the GET endpoint.
- Export the router.

---

# Step 3 – Create the Health Controller

Create:

```
src/controllers/health.controller.ts
```

```ts
import { Request, Response } from "express";

export const getHealth = (
    req: Request,
    res: Response
) => {

    res.json({
        status: "OK",
        version: "1.0.0",
        uptime: process.uptime()
    });

};
```

### Explanation

`process.uptime()` returns the number of seconds since the Node.js application started.

Example

```
125.34
```

Meaning

The server has been running for approximately **125 seconds**.

---

# Step 4 – Register the Route

Open

```
src/routes/index.ts
```

```ts
import { Router } from "express";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/health", healthRoutes);

export default router;
```

### Explanation

Now every request to

```
GET /health
```

will be handled by

```
health.controller.ts
```

---

# Step 5 – Connect Routes to Express

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

### Explanation

Register every application route using

```ts
app.use(routes);
```

---

# Step 6 – Start the Backend

Run

```bash
npm run dev
```

Expected Output

```
🚀 Server running on port 3000
```

---

# Step 7 – Test in Browser

Open

```
http://localhost:3000/health
```

Expected Response

```json
{
    "status": "OK",
    "version": "1.0.0",
    "uptime": 18.52
}
```

---

# Step 8 – Test Using Postman

Method

```
GET
```

URL

```
http://localhost:3000/health
```

Click

```
Send
```

Expected Response

```json
{
    "status": "OK",
    "version": "1.0.0",
    "uptime": 32.18
}
```

---

# Step 9 – Test Using Thunder Client

Inside VS Code

```
New Request

↓

GET

↓

http://localhost:3000/health

↓

Send
```

Expected Response

```json
{
    "status": "OK",
    "version": "1.0.0",
    "uptime": 48.91
}
```

---

# Step 10 – Test Using cURL

```bash
curl http://localhost:3000/health
```

Output

```json
{
    "status":"OK",
    "version":"1.0.0",
    "uptime":74.66
}
```

---

# Step 11 – Understanding process.uptime()

Node.js provides

```ts
process.uptime();
```

Example

```
Application Started

↓

10 seconds later

↓

process.uptime()

↓

10.22
```

Every request returns the latest uptime.

Example

```
Request 1

↓

12 sec

Request 2

↓

41 sec

Request 3

↓

80 sec
```

The value continuously increases until the server restarts.

---

# Step 12 – Improve the Response (Optional)

You can add more useful metadata.

```ts
res.json({

    status: "OK",

    version: "1.0.0",

    uptime: process.uptime(),

    timestamp: new Date().toISOString(),

    environment: process.env.NODE_ENV || "development"

});
```

Example

```json
{
    "status": "OK",
    "version": "1.0.0",
    "uptime": 60.31,
    "timestamp": "2026-07-27T12:15:20.245Z",
    "environment": "development"
}
```

---

# Step 13 – Why the Chrome Extension Needs This

Before sending an AI request, the Chrome Extension can verify whether the backend is online.

Architecture

```text
Popup

↓

GET /health

↓

Status = OK ?

↓

Yes

↓

POST /api/v1/ai/chat
```

If the backend is unavailable

```text
Popup

↓

GET /health

↓

Connection Failed

↓

Show

Backend Offline
```

This avoids unnecessary API failures and improves the user experience.

---

# Step 14 – HTTP Status Codes

Normal Response

```
200 OK
```

Server Failure

```
500 Internal Server Error
```

Route Not Found

```
404 Not Found
```

A healthy application should always return **200 OK**.

---

# Step 15 – Common Issues

## Issue 1 – Cannot GET /health

### Cause

Route is not registered.

Verify

```ts
app.use(routes);
```

---

## Issue 2 – Server Not Running

Run

```bash
npm run dev
```

---

## Issue 3 – Port Already in Use

Error

```
EADDRINUSE: address already in use :::3000
```

Solution

Stop the process using port **3000**, or change the application's port.

---

## Issue 4 – JSON Not Displayed

Ensure the controller returns JSON.

```ts
res.json({...});
```

---

## Issue 5 – Wrong URL

Correct

```
http://localhost:3000/health
```

Incorrect

```
http://localhost:3000/api/health
```

unless you intentionally configure an `/api` prefix.

---

# ✅ Testing Checklist

Verify the following:

- [ ] Backend starts successfully
- [ ] `/health` endpoint works
- [ ] HTTP Status Code is 200
- [ ] `status` is `"OK"`
- [ ] `version` is `"1.0.0"`
- [ ] `uptime` increases over time
- [ ] Tested using Browser
- [ ] Tested using Postman
- [ ] Tested using Thunder Client
- [ ] Tested using cURL

---

# 📁 Folder Structure After Milestone 3

```text
backend/

src/

├── app.ts
├── server.ts
│
├── routes/
│   ├── index.ts
│   └── health.routes.ts
│
├── controllers/
│   └── health.controller.ts
│
├── services/
├── config/
├── utils/
└── types/
```

---

# 🎯 Deliverables

By the end of this milestone, you will have:

- ✅ Express Health Check API
- ✅ Route and Controller separation
- ✅ JSON API Response
- ✅ Dynamic Server Uptime
- ✅ Browser Testing
- ✅ Postman Testing
- ✅ Thunder Client Testing
- ✅ cURL Testing
- ✅ Backend Ready for Chrome Extension Integration

---

# 💻 Git Commands

```bash
git add .

git commit -m "feat(backend): implement health api"

git push origin develop
```

---

# 🚀 Next Milestone

## Milestone 4 – AI Route (Episode 3.4)

Next, we'll create the first AI endpoint.

```
POST /api/v1/ai/chat
```

Initially, it will return a mock response.

```json
{
    "success": true,
    "response": "Hello from DevPilot Backend"
}
```

This endpoint will later become the primary API used by the Chrome Extension to communicate with AI providers such as:

- Ollama
- OpenAI
- Gemini
- Claude

Once completed, your Chrome Extension will be able to communicate with your Node.js backend instead of using mock runtime responses.