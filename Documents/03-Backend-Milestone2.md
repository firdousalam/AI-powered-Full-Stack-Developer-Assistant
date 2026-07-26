# Milestone 2 – Express Architecture

# 🎥 Episode 3.2

## 🎯 Objective

In Milestone 1, we created a basic Express server that responds with a simple message.

While this works for small applications, it quickly becomes difficult to maintain as the project grows.

In this milestone, we will refactor the project into a scalable enterprise architecture similar to what is used in production applications.

By the end of this milestone, you will have:

- Modular Express architecture
- Separate server and application files
- Environment configuration
- Routes
- Controllers
- Services
- Configuration folder
- Utilities folder
- Enterprise folder structure

This architecture will become the foundation for every future feature in the project.

---

# 🏗 Current Architecture

```text
backend/

src/

└── server.ts
```

Everything is inside one file.

As the project grows this file will become hundreds of lines long.

---

# 🏗 Target Architecture

```text
backend/

src/

├── app.ts

├── server.ts

├── config/

│      env.ts

├── controllers/

│      health.controller.ts

├── routes/

│      health.routes.ts

├── services/

│      health.service.ts

├── middlewares/

├── providers/

├── validators/

├── constants/

├── types/

├── utils/

└── interfaces/
```

This is the architecture we will continue using throughout the course.

---

# Why Enterprise Architecture?

Instead of writing everything inside one file:

```text
server.ts

↓

Routes

↓

Business Logic

↓

Database

↓

AI Calls

↓

Validation

↓

Authentication
```

We separate responsibilities.

```text
Request

↓

Route

↓

Controller

↓

Service

↓

Provider

↓

Response
```

Benefits:

- Easy to maintain
- Easier testing
- Reusable code
- Scalable
- Industry standard

---

# Folder Responsibilities

| Folder | Responsibility |
|----------|---------------|
| routes | API endpoints |
| controllers | Handle requests and responses |
| services | Business logic |
| config | Environment configuration |
| utils | Helper functions |
| middlewares | Authentication, logging, errors |
| providers | AI providers |
| validators | Request validation |
| constants | Application constants |
| interfaces | Shared interfaces |
| types | Custom TypeScript types |

---

# Step 1 – Create Folder Structure

Inside

```text
backend/src
```

Create folders.

```bash
mkdir config
mkdir routes
mkdir controllers
mkdir services
mkdir middlewares
mkdir providers
mkdir validators
mkdir constants
mkdir utils
mkdir interfaces
mkdir types
```

Verify

```text
src/

├── config/
├── routes/
├── controllers/
├── services/
├── middlewares/
├── providers/
├── validators/
├── constants/
├── utils/
├── interfaces/
├── types/
├── app.ts
└── server.ts
```

---

# Step 2 – Create app.ts

Create

```text
src/app.ts
```

Purpose

The application configuration lives here.

It creates the Express app, registers middleware, and mounts routes.

Example

```typescript
import express from "express";

const app = express();

app.use(express.json());

export default app;
```

Explanation

- Creates Express application
- Enables JSON request parsing
- Exports the configured app

Notice

No port number is used here.

---

# Step 3 – Update server.ts

Move server startup logic here.

Replace the previous code with:

```typescript
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);

});
```

Responsibilities

- Starts server
- Reads port
- Nothing else

---

# Step 4 – Why app.ts and server.ts?

Instead of

```text
server.ts

↓

Everything
```

We now have

```text
server.ts

↓

Starts Server

↓

app.ts

↓

Configures Express
```

Benefits

- Easy testing
- Cleaner code
- Better scalability

---

# Step 5 – Create Configuration Folder

Create

```text
src/config/env.ts
```

Purpose

All environment configuration will be managed here.

Example

```typescript
export const env = {

    PORT: process.env.PORT || 3000,

    NODE_ENV: process.env.NODE_ENV || "development"

};
```

Later we will also include:

- OpenAI Key
- Ollama URL
- GitHub Token
- Database URL

Never hardcode these values.

---

# Step 6 – Install dotenv

Install

```bash
npm install dotenv
```

Purpose

Load values from a `.env` file.

---

# Step 7 – Create .env

Create

```text
backend/.env
```

Example

```env
PORT=3000

NODE_ENV=development
```

Do not commit sensitive values to Git.

---

# Step 8 – Load Environment Variables

Update

```text
src/app.ts
```

```typescript
import dotenv from "dotenv";

dotenv.config();

import express from "express";

const app = express();

app.use(express.json());

export default app;
```

Now all environment variables are available through `process.env`.

---

# Step 9 – Create Controller

Create

```text
src/controllers/health.controller.ts
```

Example

```typescript
import { Request, Response } from "express";

export const healthController = (

    _req: Request,

    res: Response

) => {

    res.send("Backend Running");

};
```

Purpose

Controllers handle:

- Request
- Response

They should not contain business logic.

---

# Step 10 – Create Service

Create

```text
src/services/health.service.ts
```

Example

```typescript
export const healthService = () => {

    return {

        status: "OK"

    };

};
```

Purpose

Business logic belongs here.

Controllers simply call services.

---

# Step 11 – Update Controller

```typescript
import { Request, Response } from "express";

import { healthService } from "../services/health.service";

export const healthController = (

    _req: Request,

    res: Response

) => {

    res.json(

        healthService()

    );

};
```

Flow

```text
Browser

↓

Route

↓

Controller

↓

Service

↓

Controller

↓

Browser
```

---

# Step 12 – Create Route

Create

```text
src/routes/health.routes.ts
```

Example

```typescript
import { Router } from "express";

import {

    healthController

} from "../controllers/health.controller";

const router = Router();

router.get(

    "/",

    healthController

);

export default router;
```

Purpose

Routes map URLs to controllers.

---

# Step 13 – Register Routes

Update

```text
src/app.ts
```

```typescript
import dotenv from "dotenv";

dotenv.config();

import express from "express";

import healthRoutes from "./routes/health.routes";

const app = express();

app.use(express.json());

app.use(

    "/health",

    healthRoutes

);

export default app;
```

Now

```text
GET

/health
```

calls

```text
healthController()
```

---

# Step 14 – Verify API

Run

```bash
npm run dev
```

Open

```text
http://localhost:3000/health
```

Expected Response

```json
{
    "status":"OK"
}
```

Success!

Our layered architecture is working.

---

# Step 15 – Create Utils Folder

Create helper file.

```text
src/utils/logger.ts
```

Example

```typescript
export const logger = (

    message: string

) => {

    console.log(

        `[DevPilot] ${message}`

    );

};
```

Usage

```typescript
logger("Server Started");
```

Benefits

Instead of writing

```typescript
console.log()
```

everywhere, we use a reusable helper.

---

# Step 16 – Project Flow

```text
Client

↓

Route

↓

Controller

↓

Service

↓

Provider

↓

Controller

↓

Response
```

Later

Provider becomes

```text
Ollama

↓

OpenAI

↓

Claude

↓

Gemini
```

No code changes are required in controllers.

---

# Step 17 – Final Folder Structure

```text
backend/

src/

├── app.ts

├── server.ts

├── config/

│      env.ts

├── routes/

│      health.routes.ts

├── controllers/

│      health.controller.ts

├── services/

│      health.service.ts

├── middlewares/

├── providers/

├── validators/

├── constants/

├── interfaces/

├── types/

└── utils/

       logger.ts
```

---

# Step 18 – Best Practices

✅ Keep controllers small

✅ Put business logic inside services

✅ Keep routes simple

✅ Never hardcode environment variables

✅ Use config folder

✅ Use utils for reusable code

✅ One responsibility per file

---

# Step 19 – Common Issues

## Route Not Found

Verify

```typescript
app.use("/health", healthRoutes);
```

---

## Environment Variable Undefined

Check

```typescript
dotenv.config();
```

is called before accessing `process.env`.

---

## Cannot Find Module

Run

```bash
npm install
```

---

## Port Already In Use

Update

```env
PORT=5000
```

Restart server.

---

## JSON Not Parsed

Verify

```typescript
app.use(express.json());
```

exists.

---

# Step 20 – Verification Checklist

Run

```bash
npm run dev
```

Verify

- ✅ Server starts successfully
- ✅ `/health` endpoint works
- ✅ Folder structure created
- ✅ Routes call controllers
- ✅ Controllers call services
- ✅ Environment variables load correctly
- ✅ Logger utility created

---

# 📁 Deliverables

By the end of this milestone you will have:

- ✅ Enterprise folder structure
- ✅ app.ts
- ✅ server.ts
- ✅ Configuration folder
- ✅ Environment variables
- ✅ Route layer
- ✅ Controller layer
- ✅ Service layer
- ✅ Utility layer
- ✅ Production-ready architecture

---

# 🏗 Architecture Summary

```text
Browser

↓

Express Route

↓

Controller

↓

Service

↓

Provider (Future)

↓

Controller

↓

Response
```

This layered design makes the backend easy to extend as we add AI providers, authentication, databases, and other features in later milestones.

---

# 💻 Git Commit

```bash
git add .

git commit -m "feat(backend): create express architecture"
```

---

# 🚀 Next Milestone

In **Milestone 3 – Health API**, we will enhance the simple health endpoint to return detailed application information such as:

- Backend status
- Application version
- Server uptime
- Current environment
- Timestamp

This endpoint will also be used by the Chrome Extension to verify that the backend is available before sending AI requests.