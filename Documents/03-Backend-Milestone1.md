# Milestone 1 – Backend Project Setup

# 🎥 Episode 3.1

## 🎯 Objective

In this milestone, we will create the backend application for the **Zeba AI Chrome Extension**.

Until now, our Chrome Extension has been working with **mock responses**. From this chapter onward, we will build a real backend that will eventually connect to AI models such as **Ollama**, **OpenAI**, **Gemini**, and **Claude**.

At the end of this milestone, you will have:

- A Node.js project
- Express server
- TypeScript configuration
- Development scripts
- Running backend server
- Ready for API development

---

# 🏗️ Final Architecture After Milestone 1

```text
AI-powered-Full-Stack-Developer-Assistant/

│

├── chrome-extension/        ✅ Completed
│

├── backend/                 🚀 New

│      ├── package.json

│      ├── tsconfig.json

│      └── src/

│            └── server.ts
```

---

# 📚 Topics Covered

- Why do we need a backend?
- Create Backend Folder
- Initialize Node.js Project
- Install Dependencies
- Install Development Dependencies
- Configure TypeScript
- Create Folder Structure
- Create Express Server
- Configure Scripts
- Start Development Server
- Verify Backend
- Troubleshooting
- Git Commit

---

# Why Do We Need a Backend?

Currently our Chrome Extension looks like this.

```text
Popup

↓

Background Worker

↓

Mock Response

↓

Popup
```

Everything is running inside Chrome.

But once we integrate AI, GitHub APIs, authentication, and databases, we need a backend.

The future architecture will become:

```text
Chrome Extension

↓

Background Worker

↓

Node.js Backend

↓

AI Provider

↓

Response

↓

Chrome Extension
```

The backend will be responsible for:

- AI API Calls
- Authentication
- Rate Limiting
- Logging
- Database
- Prompt History
- User Settings
- GitHub Integration
- Ollama Integration
- OpenAI Integration

---

# Step 1 – Navigate to Project Root

Current project:

```text
AI-powered-Full-Stack-Developer-Assistant/

└── chrome-extension/
```

Go to the project root.

```bash
cd AI-powered-Full-Stack-Developer-Assistant
```

---

# Step 2 – Create Backend Folder

Create a new folder.

```bash
mkdir backend
```

Move into it.

```bash
cd backend
```

Verify

```bash
pwd
```

Windows

```text
AI-powered-Full-Stack-Developer-Assistant/backend
```

---

# Step 3 – Initialize Node.js Project

Run

```bash
npm init -y
```

Output

```text
package.json created
```

Your project now contains

```text
backend/

package.json
```

Open package.json

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"No test specified\""
  }
}
```

---

# Step 4 – Install Runtime Dependencies

Install Express.

```bash
npm install express
```

Install additional libraries that we'll use in later milestones.

```bash
npm install cors helmet morgan dotenv axios uuid zod
```

Explanation

| Package | Purpose |
|----------|----------|
| express | Web framework |
| cors | Allow Chrome Extension requests |
| helmet | Security headers |
| morgan | Request logging |
| dotenv | Environment variables |
| axios | HTTP client |
| uuid | Request IDs |
| zod | Request validation |

Verify

```bash
npm list --depth=0
```

---

# Step 5 – Install Development Dependencies

Install TypeScript and development tools.

```bash
npm install -D

typescript

ts-node

tsx

@types/node

@types/express

@types/cors

@types/morgan

nodemon
```

Explanation

| Package | Purpose |
|----------|----------|
| typescript | TypeScript compiler |
| ts-node | Execute TypeScript directly |
| tsx | Fast TypeScript runtime |
| nodemon | Auto restart server |
| @types/node | Node typings |
| @types/express | Express typings |

Verify

```bash
npm list --depth=0
```

---

# Step 6 – Initialize TypeScript

Create tsconfig.

```bash
npx tsc --init
```

Output

```text
Created tsconfig.json
```

---

# Step 7 – Configure TypeScript

Replace the generated file with the following configuration.

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",

    "module": "NodeNext",

    "moduleResolution": "NodeNext",

    "rootDir": "./src",

    "outDir": "./dist",

    "strict": true,

    "esModuleInterop": true,

    "skipLibCheck": true,

    "forceConsistentCasingInFileNames": true,

    "types": ["node"],

    "sourceMap": true
  },

  "include": [
    "src"
  ]
}
```

Explanation

| Option | Purpose |
|----------|----------|
| rootDir | Source folder |
| outDir | Build output |
| strict | Strong typing |
| NodeNext | Latest Node module system |
| sourceMap | Easier debugging |

---

# Step 8 – Create Source Folder

Create src.

```bash
mkdir src
```

Verify

```text
backend/

src/

package.json

tsconfig.json
```

---

# Step 9 – Create server.ts

Create

```text
src/server.ts
```

Code

```typescript
import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (_req, res) => {

    res.send("🚀 DevPilot Backend Running");

});

app.listen(PORT, () => {

    console.log(`Server started on http://localhost:${PORT}`);

});
```

Explanation

- Creates Express application
- Registers one route
- Starts server on port 3000

---

# Step 10 – Update package.json Scripts

Replace scripts with:

```json
"scripts": {

    "dev":"tsx watch src/server.ts",

    "build":"tsc",

    "start":"node dist/server.js"

}
```

Explanation

### npm run dev

Starts development server with auto reload.

### npm run build

Compiles TypeScript.

### npm start

Runs production build.

---

# Step 11 – Start Backend Server

Run

```bash
npm run dev
```

Console

```text
Server started on http://localhost:3000
```

---

# Step 12 – Verify in Browser

Open

```text
http://localhost:3000
```

Expected

```text
🚀 DevPilot Backend Running
```

Congratulations!

Your backend is running successfully.

---

# Step 13 – Verify Using Postman

Method

```text
GET
```

URL

```text
http://localhost:3000
```

Response

```text
🚀 DevPilot Backend Running
```

---

# Step 14 – Verify Using curl

Windows PowerShell

```bash
curl http://localhost:3000
```

Response

```text
🚀 DevPilot Backend Running
```

---

# Step 15 – Build the Project

Compile TypeScript.

```bash
npm run build
```

Output

```text
dist/

server.js
```

Verify

```text
backend/

dist/

server.js
```

---

# Step 16 – Run Production Build

Run

```bash
npm start
```

Console

```text
Server started on http://localhost:3000
```

Everything works.

---

# Step 17 – Final Folder Structure

```text
backend/

├── dist/
│
├── node_modules/
│
├── src/
│     └── server.ts
│
├── package.json
│
├── package-lock.json
│
└── tsconfig.json
```

---

# Step 18 – Common Issues

## Error

```text
Cannot find module 'express'
```

Solution

```bash
npm install express
```

---

## Error

```text
Cannot find name process
```

Solution

```bash
npm install -D @types/node
```

---

## Error

```text
tsx is not recognized
```

Solution

```bash
npm install -D tsx
```

---

## Error

```text
Port 3000 already in use
```

Use another port.

```typescript
const PORT = 5000;
```

Or stop the process using port 3000.

---

## Error

```text
Cannot find module dist/server.js
```

Run

```bash
npm run build
```

before

```bash
npm start
```

---

# Step 19 – Expected Result

```text
Browser

↓

http://localhost:3000

↓

🚀 DevPilot Backend Running
```

Backend is successfully running.

---

# 📁 Deliverables

At the end of this milestone, you should have:

- ✅ Node.js project initialized
- ✅ Express installed
- ✅ TypeScript configured
- ✅ Development scripts
- ✅ Production build
- ✅ Running backend server
- ✅ Ready for Express architecture

---

# 🧪 Verification Checklist

- ✅ `npm install` completed
- ✅ `npm run dev` starts the server
- ✅ Browser opens `http://localhost:3000`
- ✅ `npm run build` generates `dist/server.js`
- ✅ `npm start` runs the compiled application

---

# 💻 Git Commit

```bash
git add .

git commit -m "feat(backend): initialize Node.js backend"
```

---

# 🚀 Next Milestone

In **Milestone 2 – Express Architecture**, we will transform this simple server into a production-ready backend by introducing:

- `app.ts`
- Modular routing
- Controllers
- Services
- Configuration management
- Environment variables
- Enterprise folder structure

By the end of the next milestone, your backend will resemble the architecture used in real-world Node.js applications.