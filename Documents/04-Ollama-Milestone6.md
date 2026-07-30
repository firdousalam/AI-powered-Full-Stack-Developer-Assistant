# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.6 – Prompt Engineering & Prompt Templates

## 🎥 Episode 4.6 (Part 1)

# Introduction to Prompt Engineering & Architecture

---

# 📖 Goal

In the previous milestone, our **AI Router** intelligently selected the best AI model based on the user's request.

However, there is still one major problem.

Our backend sends the **raw user prompt** directly to the AI model.

Example:

```
Explain Docker
```

Although this works, the response quality depends entirely on how the user asks the question.

Some users ask detailed questions.

Some ask only one sentence.

Some provide almost no context.

Because of this, the AI often produces:

- Short answers
- Missing details
- Inconsistent formatting
- Different response quality for similar questions

Professional AI applications solve this problem using **Prompt Engineering**.

Instead of sending only the user's input, they build a structured prompt that tells the AI:

- Who it is
- What role it should play
- How to think
- How to answer
- Which format to follow

This milestone introduces **Prompt Engineering** into our DevPilot AI backend.

---

# 🎯 Learning Objectives

After completing this milestone, you will be able to:

- Understand Prompt Engineering
- Build reusable Prompt Templates
- Create a Prompt Service
- Separate prompts from business logic
- Support multiple prompt categories
- Improve AI response quality
- Build enterprise-grade prompt architecture
- Prepare prompts for multiple AI providers

---

# 🤖 What is Prompt Engineering?

Prompt Engineering is the process of designing instructions that help a Large Language Model (LLM) generate better responses.

Think of the AI as a very intelligent software engineer.

If you ask:

```
Explain Docker
```

The AI has very little guidance.

Instead, we can provide instructions.

Example:

```
You are an experienced DevOps Engineer.

Explain Docker to a beginner.

Provide:

1. Definition
2. Why Docker exists
3. Real-world Example
4. Advantages
5. Common Interview Questions

Keep the explanation simple.
Use Markdown formatting.
```

Both prompts ask the same question.

The second prompt almost always produces a much higher-quality answer.

---

# 💡 Why Prompt Engineering Matters

Prompt Engineering is one of the most valuable skills in AI application development.

Large Language Models generate responses based on the instructions they receive.

Better instructions produce better outputs.

Prompt Engineering helps us:

- Produce consistent answers
- Improve response quality
- Reduce hallucinations
- Standardize formatting
- Improve maintainability
- Reuse prompts across multiple providers

Without Prompt Engineering, every response depends entirely on the user's wording.

With Prompt Engineering, we guide the AI toward predictable and professional results.

---

# 📊 Example Comparison

## Without Prompt Engineering

User Prompt

```
Explain Docker
```

Possible AI Response

```
Docker is a container platform.
```

The response is technically correct but lacks depth.

---

## With Prompt Engineering

Prompt Template

```
You are a Senior DevOps Engineer.

Explain Docker.

Include:

• Definition
• Architecture
• Advantages
• Common Commands
• Best Practices
• Interview Questions

Use Markdown formatting.
```

Possible AI Response

```
# Docker

## What is Docker?

...

## Architecture

...

## Advantages

...

## Common Commands

...

## Interview Questions

...
```

The response becomes structured, professional, and much more useful.

---

# ❌ Current Architecture

Our current backend follows this flow:

```text
Chrome Extension

        │

        ▼

Backend API

        │

        ▼

AI Service

        │

        ▼

AI Router

        │

        ▼

Ollama
```

The AI Service simply forwards the raw prompt to Ollama.

No formatting.

No reusable instructions.

No prompt optimization.

---

# ⚠ Problems with Current Architecture

Current limitations include:

- Raw user prompts
- Inconsistent responses
- Hardcoded instructions
- Difficult maintenance
- Poor scalability
- Repeated prompt logic
- Difficult provider migration

As more AI features are added, the application becomes harder to maintain.

---

# ✅ New Architecture

Instead of sending raw prompts, we'll introduce a dedicated Prompt Service.

```text
Chrome Extension

        │

        ▼

Backend API

        │

        ▼

AI Service

        │

        ▼

Prompt Service

        │

        ▼

AI Router

        │

        ▼

Ollama
```

The Prompt Service builds a professional prompt before it reaches Ollama.

---

# 🏗 Prompt Service Architecture

The Prompt Service becomes responsible for prompt generation.

Responsibilities include:

- Detect prompt category
- Select prompt template
- Build the final prompt
- Return formatted prompt
- Keep templates centralized
- Reuse prompts across providers

Instead of writing prompts throughout the application, everything is managed in one location.

---

# 🚀 Benefits of Prompt Service

Using a dedicated Prompt Service provides several advantages.

## Cleaner Code

Controllers remain small.

Business logic stays inside services.

Prompt logic stays inside Prompt Service.

---

## Better Maintainability

Changing a prompt only requires updating one file.

No controller modifications are necessary.

---

## Reusability

The same prompt can be used by:

- Ollama
- OpenAI
- Gemini
- Claude

No duplicated code.

---

## Easier Testing

Prompt generation can be tested independently.

Example:

```
Input:

Explain Docker

↓

Expected Prompt

↓

Verify Output
```

No AI model is required for testing prompt generation.

---

# 📁 Updated Project Structure

Create a dedicated folder for prompt templates.

```text
backend/

src/

├── prompts/
│
├── services/
│   ├── prompt.service.ts
│   ├── ai.service.ts
│   ├── ai-router.service.ts
│   └── ollama.service.ts
│
├── controllers/
│
├── routes/
│
├── config/
│
├── types/
│
└── middlewares/
```

This keeps prompt-related code completely separate from business logic.

---

# 📂 Prompt Folder

The new **prompts** folder stores reusable templates.

Example:

```text
src/

prompts/

├── chat.prompt.ts

├── code-review.prompt.ts

├── docker.prompt.ts

├── kubernetes.prompt.ts

├── jenkins.prompt.ts

├── sql.prompt.ts

├── documentation.prompt.ts

└── architecture.prompt.ts
```

Each file focuses on one specific AI task.

---

# 🎯 Prompt Types

Our application will support multiple prompt categories.

| Prompt Type | Purpose |
|-------------|---------|
| Chat | General conversation |
| Code Review | Review source code |
| Explain Code | Explain programming concepts |
| Docker | Containerization assistance |
| Kubernetes | Cluster management |
| Jenkins | CI/CD pipeline review |
| SQL | SQL query generation |
| Documentation | README and documentation generation |
| Resume Review | Resume analysis |
| Architecture | System design discussions |

Each category uses a different prompt template.

---

# 🔄 Prompt Flow

The complete prompt lifecycle becomes:

```text
User Prompt

      │

      ▼

Prompt Service

      │

      ▼

Prompt Template

      │

      ▼

Formatted Prompt

      │

      ▼

AI Router

      │

      ▼

Ollama

      │

      ▼

AI Response
```

Every prompt is enhanced before reaching the AI model.

---

# 🔹 Step 1 – Create Prompt Folder

Create a new folder inside the backend project.

```text
backend/

src/

└── prompts/
```

This folder will contain every reusable prompt template used by the application.

---

## Why a Separate Folder?

As the application grows, we may have dozens of prompt templates.

Examples include:

- Chat
- Docker
- Kubernetes
- Jenkins
- GitHub
- SQL
- Resume Review
- Architecture
- Code Review
- Security Review

Keeping them in one folder makes them easy to locate, edit, and reuse.

---

# 🔹 Step 2 – Create Prompt Types

Instead of hardcoding strings throughout the application, define all prompt categories in a single enum.

Create the file:

```text
src/types/prompt.types.ts
```

Add the following code:

```typescript
export enum PromptType {
    CHAT = "chat",
    CODE_REVIEW = "code-review",
    DOCKER = "docker",
    KUBERNETES = "kubernetes",
    JENKINS = "jenkins",
    SQL = "sql",
    DOCUMENTATION = "documentation",
    ARCHITECTURE = "architecture"
}
```

---

## Why Use an Enum?

Instead of writing:

```typescript
if(type==="docker")
```

or

```typescript
if(type==="Docker")
```

or

```typescript
if(type==="DOCKER")
```

We simply write:

```typescript
PromptType.DOCKER
```

Benefits include:

- No spelling mistakes
- Strong TypeScript support
- Better auto-completion
- Easier refactoring
- Cleaner code

---

# 📌 Summary

In this first part of Milestone 4.6, we introduced **Prompt Engineering** and explained why enterprise AI applications should never send raw user prompts directly to a language model.

We redesigned the backend architecture by introducing a dedicated **Prompt Service**, created a reusable **prompts** folder, and defined centralized **Prompt Types** using a TypeScript enum. These changes lay the foundation for building high-quality, reusable, and maintainable prompt templates that will improve AI responses and support multiple AI providers in future milestones.

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): create prompt engineering architecture"
```

---

# ⏭ Next Part

In **Part 2 – Prompt Templates**, we will create reusable prompt templates for:

- Chat
- Code Review
- Docker
- Kubernetes
- Jenkins

Each template will be implemented as a dedicated TypeScript file and designed to generate consistent, high-quality AI responses.

# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.6 – Prompt Engineering & Prompt Templates

## 🎥 Episode 4.6 (Part 2)

# Building Reusable Prompt Templates

---

# 📖 Goal

In Part 1, we introduced **Prompt Engineering** and designed the architecture for a dedicated **Prompt Service**.

In this milestone, we will create reusable prompt templates that provide consistent instructions to the AI before every request.

Instead of writing prompts inside controllers or services, each prompt will live in its own file.

This approach keeps the project modular, reusable, and easy to maintain.

---

# 🎯 Learning Objectives

After completing this part, you will be able to:

- Create reusable prompt templates
- Separate prompts into dedicated files
- Build prompts for different AI tasks
- Standardize AI responses
- Prepare prompts for multiple AI providers
- Improve response consistency

---

# 📁 Updated Folder Structure

Create a dedicated **prompts** folder inside the backend project.

```text
backend/

src/

├── prompts/
│
├── services/
│
├── controllers/
│
├── routes/
│
└── types/
```

After this milestone, the prompts folder will contain:

```text
src/

prompts/

├── chat.prompt.ts
├── code-review.prompt.ts
├── docker.prompt.ts
├── kubernetes.prompt.ts
├── jenkins.prompt.ts
├── sql.prompt.ts
├── documentation.prompt.ts
└── architecture.prompt.ts
```

Each file is responsible for building **one specific type of prompt**.

---

# Why Separate Prompt Files?

Instead of writing huge if-else blocks like this:

```typescript
if(type==="docker"){
   ...
}

if(type==="jenkins"){
   ...
}

if(type==="chat"){
   ...
}
```

We simply call

```typescript
dockerPrompt(prompt)

chatPrompt(prompt)

jenkinsPrompt(prompt)
```

Advantages

- Cleaner code
- Easy maintenance
- Easier testing
- Easy provider migration
- Easy prompt improvements

---

# Prompt Architecture

```text
User Prompt

↓

Prompt Service

↓

Prompt Template

↓

Formatted Prompt

↓

AI Router

↓

Ollama
```

---

# 🔹 Step 3 – Create Chat Prompt

Create

```text
src/prompts/chat.prompt.ts
```

### Complete Code

```typescript
export const chatPrompt = (
    userPrompt: string
): string => `
You are DevPilot AI.

You are a Senior Full Stack Software Engineer with expertise in:

- JavaScript
- TypeScript
- React
- Node.js
- Express
- MongoDB
- Docker
- Kubernetes
- Jenkins
- AWS

Instructions:

- Answer clearly.
- Keep explanations beginner friendly.
- Use Markdown formatting.
- Include examples whenever possible.
- Keep the response concise but informative.

User Question:

${userPrompt}
`;
```

---

## Explanation

This prompt is used for general conversations.

Examples

```
Explain JavaScript Closures

What is MongoDB?

Explain REST API
```

Instead of giving random responses, the AI is instructed to behave like an experienced software engineer.

---

# Chat Prompt Flow

```text
User

↓

Explain Docker

↓

Chat Prompt

↓

You are DevPilot AI...

↓

Ollama

↓

Structured Response
```

---

# 🔹 Step 4 – Create Code Review Prompt

Create

```text
src/prompts/code-review.prompt.ts
```

### Complete Code

```typescript
export const codeReviewPrompt = (
    code: string
): string => `
You are a Senior Software Architect.

Review the following code carefully.

Provide:

## Bugs

## Security Issues

## Performance Problems

## Code Smells

## Best Practices

## Suggested Improvements

Respond using Markdown.

Source Code:

${code}
`;
```

---

## Explanation

Instead of simply explaining the code, this prompt instructs the AI to perform a professional code review.

Example

Input

```typescript
const password="123";
```

AI Response

```
Security Issue

Hardcoded password detected.

Recommendation

Move the password to environment variables.
```

---

# Code Review Flow

```text
Source Code

↓

Prompt Template

↓

Senior Software Architect

↓

Review

↓

Suggestions
```

---

# 🔹 Step 5 – Create Docker Prompt

Create

```text
src/prompts/docker.prompt.ts
```

### Complete Code

```typescript
export const dockerPrompt = (
    userPrompt: string
): string => `
You are a Docker Expert.

Explain the following Docker topic.

Your response must include:

# Overview

# Architecture

# Commands

# Real World Example

# Best Practices

# Common Mistakes

# Interview Questions

Topic:

${userPrompt}
`;
```

---

## Explanation

This prompt specializes in Docker.

Example

```
Explain Docker Compose
```

The AI will automatically produce

- Overview
- Commands
- Examples
- Best Practices

instead of only giving a short explanation.

---

# Docker Prompt Flow

```text
Explain Docker Compose

↓

Docker Prompt

↓

Docker Expert

↓

Ollama

↓

Professional Docker Guide
```

---

# 🔹 Step 6 – Create Kubernetes Prompt

Create

```text
src/prompts/kubernetes.prompt.ts
```

### Complete Code

```typescript
export const kubernetesPrompt = (
    userPrompt: string
): string => `
You are a Kubernetes Solution Architect.

Explain the following Kubernetes topic.

Include:

# Overview

# Architecture

# YAML Example

# Security Best Practices

# Production Recommendations

# Common Mistakes

Topic:

${userPrompt}
`;
```

---

## Explanation

Kubernetes topics usually require

- diagrams
- YAML
- architecture
- security

This prompt ensures every Kubernetes answer follows a consistent structure.

Example

```
Explain Kubernetes Ingress
```

AI Response

```
Overview

Architecture

Ingress Controller

Sample YAML

Best Practices

Security
```

---

# Kubernetes Prompt Flow

```text
User Prompt

↓

Prompt Template

↓

Kubernetes Architect

↓

Ollama

↓

Structured Kubernetes Guide
```

---

# 🔹 Step 7 – Create Jenkins Prompt

Create

```text
src/prompts/jenkins.prompt.ts
```

### Complete Code

```typescript
export const jenkinsPrompt = (
    userPrompt: string
): string => `
You are a Senior DevOps Engineer.

Review the following Jenkins Pipeline.

Explain:

# Pipeline Stages

# Best Practices

# Performance Improvements

# Security Issues

# Common Failures

# Recommended Changes

Pipeline:

${userPrompt}
`;
```

---

## Explanation

Instead of simply explaining Jenkins, the AI becomes an experienced DevOps engineer.

Example

```
Review this Jenkins Pipeline
```

The AI automatically reviews

- stages
- optimizations
- failures
- security

---

# Jenkins Prompt Flow

```text
Pipeline

↓

Prompt Template

↓

DevOps Engineer

↓

Ollama

↓

Pipeline Review
```

---

# Template Comparison

| Prompt | AI Role | Purpose |
|----------|----------|----------|
| Chat | Software Engineer | General questions |
| Code Review | Software Architect | Code analysis |
| Docker | Docker Expert | Containerization |
| Kubernetes | Kubernetes Architect | Cluster Management |
| Jenkins | DevOps Engineer | CI/CD Review |

---

# Why Different Templates?

Every AI task requires different instructions.

Example

General Chat

```
Explain JavaScript.
```

Docker

```
Explain Docker Compose.
```

Kubernetes

```
Explain Ingress Controller.
```

Jenkins

```
Review Pipeline.
```

Using the same prompt for every request would reduce response quality.

Specialized templates significantly improve accuracy.

---

# Best Practices

✔ Keep one prompt per file

✔ Each template should solve only one problem

✔ Give the AI a clear role

✔ Specify expected output

✔ Use Markdown formatting

✔ Include examples whenever appropriate

✔ Reuse templates across providers

---

# Testing Checklist

Verify the following

- ✅ Chat prompt builds correctly
- ✅ Code Review prompt formats correctly
- ✅ Docker prompt includes all sections
- ✅ Kubernetes prompt includes YAML section
- ✅ Jenkins prompt includes pipeline review
- ✅ Prompt templates return formatted strings
- ✅ No prompt logic exists inside controllers

---

# Deliverables

By the end of this part, you will have

- ✅ Chat Prompt Template
- ✅ Code Review Prompt Template
- ✅ Docker Prompt Template
- ✅ Kubernetes Prompt Template
- ✅ Jenkins Prompt Template
- ✅ Dedicated Prompt Folder
- ✅ Reusable Prompt Architecture
- ✅ Provider-independent Prompt Design

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): create reusable prompt templates"
```

---

# 📖 Part Summary

In this part, we created reusable Prompt Templates for different AI tasks including Chat, Code Review, Docker, Kubernetes, and Jenkins. Each template gives the AI a specific role, defines the expected response structure, and improves consistency across the application. By separating prompts into dedicated files, the backend becomes cleaner, easier to maintain, and ready to support multiple AI providers such as Ollama, OpenAI, Gemini, and Claude.

---

# ⏭ Next Part

**Part 3 – Prompt Service Integration**

In the next part, we will:

- Build `prompt.service.ts`
- Detect prompt types automatically
- Generate formatted prompts
- Integrate Prompt Service into AI Service
- Update the backend request flow
- Test complete end-to-end prompt generation

# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.6 – Prompt Engineering & Prompt Templates

## 🎥 Episode 4.6 (Part 3)

# Prompt Service Integration

---

# 📖 Goal

In the previous milestone, we created reusable prompt templates for different AI tasks such as Chat, Docker, Kubernetes, Jenkins, and Code Review.

However, these templates are not yet being used by our backend.

Currently, the AI Service receives the user's prompt and immediately sends it to the AI Router for model selection.

```text
User Prompt

↓

AI Service

↓

AI Router

↓

Ollama
```

This means the AI model still receives the raw user prompt.

In this milestone, we will introduce a dedicated **Prompt Service** that is responsible for selecting the correct prompt template and generating a high-quality prompt before it reaches Ollama.

---

# 🎯 Learning Objectives

After completing this milestone, you will be able to:

- Build a Prompt Service
- Detect prompt categories
- Select the correct prompt template
- Integrate Prompt Service with AI Service
- Separate prompt logic from business logic
- Create a scalable AI architecture
- Prepare for multiple AI providers

---

# Current Architecture

```text
Chrome Extension

        │

        ▼

Backend API

        │

        ▼

AI Service

        │

        ▼

AI Router

        │

        ▼

Ollama
```

The AI Service only selects the model.

---

# New Architecture

```text
Chrome Extension

        │

        ▼

Backend API

        │

        ▼

AI Service

        │

        ▼

Prompt Service

        │

        ▼

AI Router

        │

        ▼

Ollama
```

Now the AI Service has two responsibilities:

- Build the prompt
- Select the model

---

# Why Introduce Prompt Service?

Imagine supporting twenty different AI tasks.

Without Prompt Service:

```text
Controller

↓

if Chat

↓

if Docker

↓

if Kubernetes

↓

if Jenkins

↓

if Resume

↓

if SQL

↓

if Architecture

↓

Ollama
```

Controllers become huge.

Business logic becomes difficult to maintain.

---

With Prompt Service:

```text
Controller

↓

AI Service

↓

Prompt Service

↓

Prompt Template

↓

AI Router

↓

Ollama
```

Everything remains modular.

---

# Project Structure

```text
backend/

src/

├── prompts/
│
│   ├── chat.prompt.ts
│   ├── docker.prompt.ts
│   ├── kubernetes.prompt.ts
│   ├── jenkins.prompt.ts
│   └── code-review.prompt.ts
│
├── services/
│
│   ├── prompt.service.ts
│   ├── ai.service.ts
│   ├── ai-router.service.ts
│   └── ollama.service.ts
│
├── controllers/
│
├── routes/
│
└── types/
```

---

# 🔹 Step 8 – Create Prompt Service

Create

```text
src/services/prompt.service.ts
```

The Prompt Service is responsible for:

- Detecting prompt category
- Selecting the prompt template
- Building the final prompt
- Returning the formatted prompt

---

# Responsibilities

The Prompt Service should

✔ Detect prompt type

✔ Choose template

✔ Format prompt

✔ Return final prompt

---

# Import Prompt Templates

```typescript
import { chatPrompt } from "../prompts/chat.prompt";
import { dockerPrompt } from "../prompts/docker.prompt";
import { kubernetesPrompt } from "../prompts/kubernetes.prompt";
import { jenkinsPrompt } from "../prompts/jenkins.prompt";
import { codeReviewPrompt } from "../prompts/code-review.prompt";
```

---

# Complete prompt.service.ts

```typescript
import { chatPrompt } from "../prompts/chat.prompt";
import { dockerPrompt } from "../prompts/docker.prompt";
import { kubernetesPrompt } from "../prompts/kubernetes.prompt";
import { jenkinsPrompt } from "../prompts/jenkins.prompt";
import { codeReviewPrompt } from "../prompts/code-review.prompt";

class PromptService {

    buildPrompt(userPrompt: string): string {

        const prompt = userPrompt.toLowerCase();

        if (prompt.includes("docker")) {
            return dockerPrompt(userPrompt);
        }

        if (prompt.includes("kubernetes")) {
            return kubernetesPrompt(userPrompt);
        }

        if (prompt.includes("jenkins")) {
            return jenkinsPrompt(userPrompt);
        }

        if (
            prompt.includes("review code") ||
            prompt.includes("code review")
        ) {
            return codeReviewPrompt(userPrompt);
        }

        return chatPrompt(userPrompt);
    }

}

export default new PromptService();
```

---

# How It Works

Example

Input

```
Explain Docker Compose
```

Prompt Service

↓

```
dockerPrompt()
```

Output

```
You are a Docker Expert...

Explain Docker Compose

Include:

Overview

Commands

Best Practices

Interview Questions
```

Instead of sending only

```
Explain Docker Compose
```

we now send a professional prompt.

---

# Prompt Detection Logic

| User Prompt | Selected Template |
|--------------|------------------|
| Explain Docker | Docker Prompt |
| Explain Kubernetes | Kubernetes Prompt |
| Review Jenkins Pipeline | Jenkins Prompt |
| Review Code | Code Review Prompt |
| Everything Else | Chat Prompt |

---

# Prompt Flow

```text
User Prompt

↓

Prompt Service

↓

Keyword Detection

↓

Prompt Template

↓

Formatted Prompt
```

---

# 🔹 Step 9 – Integrate Prompt Service

Current AI Service

```text
AI Service

↓

AI Router

↓

Ollama
```

---

New AI Service

```text
AI Service

↓

Prompt Service

↓

AI Router

↓

Ollama
```

---

# Update ai.service.ts

Import Prompt Service

```typescript
import promptService from "./prompt.service";
import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";
```

---

# Complete ai.service.ts

```typescript
import promptService from "./prompt.service";
import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";

class AIService {

    async chat(userPrompt: string) {

        // Build professional prompt
        const formattedPrompt =
            promptService.buildPrompt(userPrompt);

        // Select best model
        const route =
            aiRouter.selectModel(userPrompt);

        console.log("=================================");
        console.log("Original Prompt:");
        console.log(userPrompt);

        console.log("---------------------------------");

        console.log("Formatted Prompt:");
        console.log(formattedPrompt);

        console.log("---------------------------------");

        console.log("Selected Model:");
        console.log(route.model);

        console.log("=================================");

        return await ollamaService.chat(

            formattedPrompt,

            route.model

        );

    }

}

export default new AIService();
```

---

# Why AI Router Still Uses Original Prompt?

Notice

```typescript
aiRouter.selectModel(userPrompt)
```

NOT

```typescript
aiRouter.selectModel(formattedPrompt)
```

Reason

Model selection depends on the user's intent.

Not on the generated prompt.

Example

User

```
Explain Docker
```

Prompt Template

```
You are a Docker Expert...
```

If we classify the formatted prompt, every prompt would contain words like

```
Engineer

Architecture

Software

Docker

Best Practices
```

making routing less accurate.

Always classify using the original prompt.

---

# AI Service Flow

```text
User Prompt

↓

Prompt Service

↓

Formatted Prompt

↓

AI Router

↓

Best Model

↓

Ollama

↓

AI Response
```

---

# Controller Flow

The controller becomes much simpler.

```text
Controller

↓

AI Service

↓

Response
```

No prompt logic.

No routing logic.

No business logic.

Controllers simply delegate the work.

---

# End-to-End Architecture

```text
Chrome Extension

        │

        ▼

POST /api/v1/ai/chat

        │

        ▼

AI Controller

        │

        ▼

AI Service

        │

        ├──────────────┐
        │              │
        ▼              ▼

Prompt Service    AI Router

        │              │

        └──────┬───────┘
               ▼

        Ollama Service

               ▼

          Ollama API

               ▼

         AI Response

               ▼

Chrome Extension
```

---

# What Happens During One Request?

Example

User

```
Explain Docker Compose
```

Step 1

Controller receives request.

↓

Step 2

AI Service receives prompt.

↓

Step 3

Prompt Service builds

```
You are a Docker Expert...

Explain Docker Compose...

Include:

Overview

Commands

Best Practices
```

↓

Step 4

AI Router selects

```
qwen2.5-coder:7b
```

↓

Step 5

Ollama Service sends

Formatted Prompt

+

Selected Model

↓

Step 6

Ollama generates response.

↓

Step 7

Controller returns response.

---

# Testing

Test using Postman.

Endpoint

```http
POST /api/v1/ai/chat
```

---

Request

```json
{
    "prompt":"Explain Docker Compose"
}
```

---

Console Output

```
Original Prompt

Explain Docker Compose

---------------------

Formatted Prompt

You are a Docker Expert.

Explain Docker Compose.

Include:

Overview

Commands

Best Practices

---------------------

Selected Model

qwen2.5-coder:7b
```

---

# More Test Cases

## General Chat

Request

```json
{
    "prompt":"Explain JavaScript Closures"
}
```

Expected

Prompt Template

```
Chat Prompt
```

Model

```
llama3.2:3b
```

---

## Docker

Request

```json
{
    "prompt":"Explain Docker Compose"
}
```

Expected

Prompt Template

```
Docker Prompt
```

Model

```
qwen2.5-coder:7b
```

---

## Kubernetes

```json
{
    "prompt":"Explain Kubernetes Ingress"
}
```

Expected

Prompt

```
Kubernetes Prompt
```

Model

```
deepseek-r1:7b
```

---

## Jenkins

```json
{
    "prompt":"Review this Jenkins Pipeline"
}
```

Expected

Prompt

```
Jenkins Prompt
```

Model

```
qwen2.5-coder:7b
```

---

## Code Review

```json
{
    "prompt":"Review this code"
}
```

Expected

Prompt

```
Code Review Prompt
```

Model

```
qwen2.5-coder:7b
```

---

# Best Practices

✔ Keep Prompt Service independent

✔ Keep AI Router independent

✔ Never mix routing with prompt generation

✔ Controllers should never know prompt templates

✔ Services should remain single-purpose

✔ Always classify using the original prompt

✔ Send formatted prompts to Ollama

---

# Testing Checklist

Verify the following:

- ✅ Prompt Service builds the correct template
- ✅ AI Router still selects the correct model
- ✅ AI Service integrates both services correctly
- ✅ Ollama receives the formatted prompt
- ✅ Controllers remain thin
- ✅ Console logs show the selected model
- ✅ Console logs show the formatted prompt
- ✅ Responses are more structured than before

---

# Deliverables

By the end of this milestone, you will have:

- ✅ Prompt Service
- ✅ Prompt Template Integration
- ✅ AI Service Refactoring
- ✅ Modular Prompt Architecture
- ✅ Cleaner Controllers
- ✅ Better AI Responses
- ✅ Enterprise Service Design

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): integrate prompt service with ai service"

git push origin develop
```

---

# 📖 Part Summary

In this part, we integrated the **Prompt Service** into the AI pipeline, transforming raw user input into structured prompts before sending requests to Ollama. The AI Service now orchestrates both prompt generation and model selection, while controllers remain lightweight and focused only on handling HTTP requests. This modular architecture improves maintainability, enables reusable prompt templates, and provides a solid foundation for supporting multiple AI providers, advanced prompt engineering, and future features such as Retrieval-Augmented Generation (RAG) and Model Context Protocol (MCP).

---

# ⏭ Next Part

**Part 4 – Testing, Best Practices & Milestone Summary**

In the final part, we will:

- Test all prompt types
- Validate end-to-end prompt generation
- Review best practices
- Verify architecture
- Complete the milestone with deliverables, Git commit, and summary.


# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.6 – Prompt Engineering & Prompt Templates

## 🎥 Episode 4.6 (Part 4)

# Testing, Best Practices & Milestone Summary

---

# 📖 Goal

In the previous parts, we designed a complete Prompt Engineering architecture for the DevPilot AI backend.

We:

- Created reusable prompt templates
- Built a centralized Prompt Service
- Integrated the Prompt Service into the AI Service
- Connected the Prompt Service with the AI Router
- Sent professionally formatted prompts to Ollama

In this final part, we will verify that everything works correctly, test every prompt category, review best practices, validate the complete architecture, and summarize the milestone.

---

# 🎯 Learning Objectives

After completing this part, you will be able to:

- Test every prompt template
- Verify AI Router and Prompt Service integration
- Debug prompt generation
- Validate end-to-end AI requests
- Apply Prompt Engineering best practices
- Understand the complete AI request lifecycle

---

# Complete Architecture

Our backend architecture now looks like this.

```text
Chrome Extension

        │

        ▼

POST /api/v1/ai/chat

        │

        ▼

AI Controller

        │

        ▼

AI Service

        │

 ┌──────┴───────────┐

 ▼                  ▼

Prompt Service   AI Router

 │                  │

 └────────┬─────────┘

          ▼

   Ollama Service

          ▼

      Ollama API

          ▼

    AI Response

          ▼

Chrome Extension
```

This architecture separates responsibilities and keeps every component focused on a single task.

---

# End-to-End Request Flow

Every request follows the same sequence.

```text
User Prompt

↓

AI Controller

↓

AI Service

↓

Prompt Service

↓

Prompt Template

↓

Formatted Prompt

↓

AI Router

↓

Model Selection

↓

Ollama Service

↓

Ollama

↓

Generated Response

↓

Chrome Extension
```

---

# Testing Overview

Before moving to the next milestone, verify every major feature.

Testing should confirm:

- Prompt templates work
- Prompt Service selects the correct template
- AI Router selects the correct model
- Ollama receives the formatted prompt
- AI response quality has improved

---

# Test 1 – General Chat

Request

```http
POST /api/v1/ai/chat
```

Body

```json
{
    "prompt":"Explain JavaScript Closures"
}
```

---

## Expected Prompt

The Prompt Service should generate the Chat Prompt.

Example

```text
You are DevPilot AI.

You are an experienced Software Engineer.

Answer clearly.

Explain JavaScript Closures.
```

---

## Expected Model

```text
llama3.2:3b
```

---

## Expected Result

The response should include:

- Definition
- Example
- Explanation
- Markdown formatting

---

# Test 2 – Docker Prompt

Request

```json
{
    "prompt":"Explain Docker Compose"
}
```

---

## Expected Prompt

```text
You are a Docker Expert.

Explain Docker Compose.

Include:

Overview

Commands

Best Practices

Interview Questions
```

---

## Expected Model

```text
qwen2.5-coder:7b
```

---

## Expected Response

The AI should return:

- Docker overview
- Compose explanation
- Commands
- YAML example
- Best practices

---

# Test 3 – Kubernetes Prompt

Request

```json
{
    "prompt":"Explain Kubernetes Ingress"
}
```

---

## Expected Prompt

```text
You are a Kubernetes Architect.

Explain Kubernetes Ingress.

Include:

Architecture

YAML

Security

Best Practices
```

---

## Expected Model

```text
deepseek-r1:7b
```

---

## Expected Response

The response should include:

- Architecture
- Ingress Controller
- YAML example
- Security recommendations

---

# Test 4 – Jenkins Prompt

Request

```json
{
    "prompt":"Review this Jenkins Pipeline"
}
```

---

## Expected Prompt

```text
You are a DevOps Engineer.

Review this Jenkins Pipeline.

Explain:

Stages

Security

Performance

Best Practices
```

---

## Expected Model

```text
qwen2.5-coder:7b
```

---

## Expected Response

The AI should review:

- Pipeline stages
- Security issues
- Performance improvements
- Recommended changes

---

# Test 5 – Code Review Prompt

Request

```json
{
    "prompt":"Review this TypeScript code"
}
```

---

## Expected Prompt

```text
You are a Senior Software Architect.

Review the following code.

Provide:

Bugs

Security

Performance

Best Practices
```

---

## Expected Model

```text
qwen2.5-coder:7b
```

---

## Expected Response

The AI should identify:

- Bugs
- Code smells
- Security issues
- Better coding practices

---

# Console Verification

During development, verify the console output.

Example

```text
====================================

Original Prompt

Explain Docker Compose

------------------------------------

Formatted Prompt

You are a Docker Expert.

Explain Docker Compose.

Include:

Overview

Commands

Best Practices

------------------------------------

Selected Model

qwen2.5-coder:7b

====================================
```

This confirms that:

- Prompt Service is working
- AI Router is working
- AI Service is correctly coordinating both

---

# Validate Prompt Service

Verify that each request uses the correct template.

| User Prompt | Prompt Template |
|-------------|-----------------|
| Explain Docker | Docker Prompt |
| Explain Kubernetes | Kubernetes Prompt |
| Review Jenkins Pipeline | Jenkins Prompt |
| Review TypeScript Code | Code Review Prompt |
| Explain JavaScript | Chat Prompt |

---

# Validate AI Router

Verify that the AI Router selects the correct model.

| Request | Expected Model |
|----------|----------------|
| General Chat | llama3.2:3b |
| Docker | qwen2.5-coder:7b |
| Kubernetes | deepseek-r1:7b |
| Jenkins | qwen2.5-coder:7b |
| Code Review | qwen2.5-coder:7b |

---

# Validate Ollama Integration

Confirm the following:

- Ollama is running
- Selected model exists
- Formatted prompt reaches Ollama
- Response is generated successfully

Example

```bash
ollama list
```

Expected

```text
llama3.2:3b

qwen2.5-coder:7b

deepseek-r1:7b

gemma3:4b

nomic-embed-text
```

---

# Compare Response Quality

## Without Prompt Engineering

Prompt

```
Explain Docker
```

Possible Response

```
Docker is a container platform.
```

---

## With Prompt Engineering

Prompt

```
You are a Docker Expert.

Explain Docker.

Include:

Overview

Commands

Best Practices

Interview Questions
```

Response

```
# Docker

## Overview

...

## Architecture

...

## Commands

...

## Best Practices

...

## Interview Questions

...
```

The second response is more complete, structured, and useful.

---

# Best Practices

Follow these recommendations when designing prompt-based AI systems.

### Keep prompts separate from controllers

Controllers should only receive requests and return responses.

---

### Keep prompt templates reusable

Each template should solve one specific task.

---

### Avoid hardcoded prompts

Never write prompts directly inside controllers or services.

---

### Use one file per prompt

This improves readability and maintainability.

---

### Give the AI a role

Examples:

- Senior Software Engineer
- Docker Expert
- Kubernetes Architect
- DevOps Engineer

Role-based prompting significantly improves response quality.

---

### Specify the output format

Instead of asking:

```
Explain Docker
```

Ask:

```
Explain Docker.

Include:

Overview

Architecture

Examples

Commands

Interview Questions
```

Structured prompts produce structured responses.

---

### Always use Markdown

Markdown responses are easier to read in:

- Chrome Extension
- Documentation
- GitHub
- VS Code

---

### Keep Prompt Service independent

Prompt generation should never depend on routing logic.

---

### Keep AI Router independent

Routing should only decide **which model** is used.

It should never generate prompts.

---

# Common Mistakes

Avoid the following mistakes.

❌ Hardcoding prompts inside controllers

❌ Mixing routing and prompt generation

❌ One huge prompt for every task

❌ Duplicating prompt logic

❌ Skipping testing

❌ Ignoring response formatting

---

# Testing Checklist

Before moving to the next milestone, verify the following.

- ✅ Chat Prompt works
- ✅ Docker Prompt works
- ✅ Kubernetes Prompt works
- ✅ Jenkins Prompt works
- ✅ Code Review Prompt works
- ✅ Prompt Service selects the correct template
- ✅ AI Router selects the correct model
- ✅ Ollama receives formatted prompts
- ✅ AI responses are more structured
- ✅ Controllers remain clean
- ✅ Services have a single responsibility
- ✅ Console logs show prompt and model selection

---

# Deliverables

By the end of this milestone, you will have:

- ✅ Prompt Templates
- ✅ Prompt Service
- ✅ Prompt Type Detection
- ✅ AI Service Integration
- ✅ Centralized Prompt Management
- ✅ Better AI Response Quality
- ✅ Enterprise Prompt Architecture
- ✅ Reusable Prompt Design
- ✅ Multi-Provider Ready Architecture

---

# Git Commit

```bash
git add .

git commit -m "feat(ai): implement prompt engineering service"

git push origin develop
```

---

# Milestone Summary

In this milestone, we transformed the DevPilot AI backend from sending raw user prompts to generating intelligent, reusable, and structured prompts through a dedicated **Prompt Service**. We created specialized prompt templates for different domains such as Chat, Docker, Kubernetes, Jenkins, and Code Review, integrated them into the AI Service, and combined them with the AI Router for intelligent model selection. This architecture produces more consistent, maintainable, and higher-quality AI responses while keeping controllers lightweight and business logic modular.

The backend is now well-prepared for future enhancements such as Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), OpenAI, Gemini, Claude integration, conversation memory, and advanced AI workflows.

---

# Chapter 4 Progress

After completing Milestone **4.6**, the DevPilot AI backend now includes:

- ✅ Ollama Integration
- ✅ Multiple Local AI Models
- ✅ AI Router
- ✅ Intelligent Model Selection
- ✅ Streaming AI Responses
- ✅ Prompt Engineering
- ✅ Prompt Templates
- ✅ Prompt Service
- ✅ Improved AI Response Quality

---

# ⏭ Next Milestone

## Milestone 4.7 – Memory Optimization & Context Management

In the next milestone, we will build conversation memory and context management for long-running AI interactions.

You will learn how to:

- Understand AI context windows
- Manage conversation history
- Optimize token usage
- Prevent context overflow
- Build a Conversation Memory Service
- Prepare the backend for Retrieval-Augmented Generation (RAG)
- Support long-running AI conversations
- Build a production-ready conversational AI architecture