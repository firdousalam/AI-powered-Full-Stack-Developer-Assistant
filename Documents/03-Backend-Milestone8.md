# Chapter 3 – Node.js Backend API

# Milestone 8 – AI Provider Pattern

## 🎥 Episode 3.8

---

# 🎯 Goal

Implement the **AI Provider Pattern** to support multiple AI providers through a common interface.

Instead of tightly coupling the application to one AI model, we'll create a flexible architecture that allows switching between providers such as **Ollama**, **OpenAI**, **Gemini**, and **Claude** with minimal code changes.

For this milestone, every provider will return **mock responses only**.

---

# 📚 Learning Objectives

By the end of this milestone, you will learn:

- What the Provider Pattern is
- Why enterprise applications use provider abstraction
- Creating a common provider interface
- Implementing multiple providers
- Creating a Provider Factory
- Selecting providers dynamically
- Building an extensible AI architecture

---

# Why Use the Provider Pattern?

Without a Provider Pattern:

```text
Controller

↓

if(model=="ollama")

↓

else if(model=="openai")

↓

else if(model=="gemini")

↓

else if(model=="claude")
```

Every new provider requires updating the controller or service.

This violates the **Open/Closed Principle**.

---

With the Provider Pattern:

```text
Controller

↓

AI Service

↓

Provider Factory

↓

AI Provider

↓

Response
```

Adding a new provider only requires creating a new provider class.

No controller changes are required.

---

# Final Architecture

```text
Chrome Extension

        │

        ▼

Backend API

        │

        ▼

Controller

        │

        ▼

AI Service

        │

        ▼

Provider Factory

        │

        ├──────────────┐
        │              │
        ▼              ▼

Ollama Provider   OpenAI Provider

        │              │
        ▼              ▼

Gemini Provider   Claude Provider
```

---

# Project Structure

```
backend/

src/

├── controllers/

├── routes/

├── services/
│      ai.service.ts

├── providers/
│
│      AIProvider.ts
│
│      ProviderFactory.ts
│
│      ollama.provider.ts
│
│      openai.provider.ts
│
│      gemini.provider.ts
│
│      claude.provider.ts
│
├── middleware/

├── schemas/

└── config/
```

---

# Step 1 – Create Providers Folder

Create

```
src/providers
```

Inside create

```
AIProvider.ts

ProviderFactory.ts

ollama.provider.ts

openai.provider.ts

gemini.provider.ts

claude.provider.ts
```

---

# Step 2 – Create Provider Interface

File

```
src/providers/AIProvider.ts
```

```ts
export interface AIProvider {

    chat(

        prompt: string

    ): Promise<any>;

}
```

Every provider must implement this interface.

---

# Step 3 – Create Ollama Provider

File

```
src/providers/ollama.provider.ts
```

```ts
import { AIProvider } from "./AIProvider";

export class OllamaProvider implements AIProvider {

    async chat(prompt: string) {

        return {

            provider: "Ollama",

            response: `Mock response from Ollama for "${prompt}"`

        };

    }

}
```

---

# Step 4 – Create OpenAI Provider

File

```
src/providers/openai.provider.ts
```

```ts
import { AIProvider } from "./AIProvider";

export class OpenAIProvider implements AIProvider {

    async chat(prompt: string) {

        return {

            provider: "OpenAI",

            response: `Mock response from OpenAI for "${prompt}"`

        };

    }

}
```

---

# Step 5 – Create Gemini Provider

File

```
src/providers/gemini.provider.ts
```

```ts
import { AIProvider } from "./AIProvider";

export class GeminiProvider implements AIProvider {

    async chat(prompt: string) {

        return {

            provider: "Gemini",

            response: `Mock response from Gemini for "${prompt}"`

        };

    }

}
```

---

# Step 6 – Create Claude Provider

File

```
src/providers/claude.provider.ts
```

```ts
import { AIProvider } from "./AIProvider";

export class ClaudeProvider implements AIProvider {

    async chat(prompt: string) {

        return {

            provider: "Claude",

            response: `Mock response from Claude for "${prompt}"`

        };

    }

}
```

---

# Step 7 – Create Provider Factory

File

```
src/providers/ProviderFactory.ts
```

```ts
import { AIProvider } from "./AIProvider";

import { OllamaProvider } from "./ollama.provider";

import { OpenAIProvider } from "./openai.provider";

import { GeminiProvider } from "./gemini.provider";

import { ClaudeProvider } from "./claude.provider";

export class ProviderFactory {

    static create(model: string): AIProvider {

        switch (model.toLowerCase()) {

            case "ollama":

                return new OllamaProvider();

            case "openai":

                return new OpenAIProvider();

            case "gemini":

                return new GeminiProvider();

            case "claude":

                return new ClaudeProvider();

            default:

                return new OllamaProvider();

        }

    }

}
```

The factory selects the correct provider based on the requested model.

---

# Step 8 – Update AI Service

Open

```
src/services/ai.service.ts
```

Replace the mock implementation with:

```ts
import { ProviderFactory } from "../providers/ProviderFactory";

class AIService {

    async chat(

        prompt: string,

        model: string

    ) {

        const provider =

            ProviderFactory.create(model);

        return await provider.chat(prompt);

    }

}

export default new AIService();
```

Now the AI Service delegates the request to the appropriate provider.

---

# Step 9 – Controller Remains Unchanged

The controller should still call the service:

```ts
const result = await AIService.chat(

    prompt,

    model

);

res.json(result);
```

The controller does not need to know which provider is being used.

---

# Step 10 – Test with Ollama

Request

```http
POST /api/v1/ai/chat
```

Body

```json
{
    "prompt":"Explain Docker",
    "model":"ollama"
}
```

Response

```json
{
    "provider":"Ollama",
    "response":"Mock response from Ollama for \"Explain Docker\""
}
```

---

# Step 11 – Test with OpenAI

Request

```json
{
    "prompt":"Explain Docker",
    "model":"openai"
}
```

Response

```json
{
    "provider":"OpenAI",
    "response":"Mock response from OpenAI for \"Explain Docker\""
}
```

---

# Step 12 – Test with Gemini

Request

```json
{
    "prompt":"Explain Docker",
    "model":"gemini"
}
```

Response

```json
{
    "provider":"Gemini",
    "response":"Mock response from Gemini for \"Explain Docker\""
}
```

---

# Step 13 – Test with Claude

Request

```json
{
    "prompt":"Explain Docker",
    "model":"claude"
}
```

Response

```json
{
    "provider":"Claude",
    "response":"Mock response from Claude for \"Explain Docker\""
}
```

---

# Step 14 – Test Unknown Model

Request

```json
{
    "prompt":"Explain Docker",
    "model":"unknown"
}
```

Since the factory defaults to Ollama:

```json
{
    "provider":"Ollama",
    "response":"Mock response from Ollama for \"Explain Docker\""
}
```

---

# Step 15 – Build the Project

Run

```bash
npm run build
```

Expected Result

```
Build completed successfully.
```

---

# Step 16 – Run the Server

```bash
npm run dev
```

Console

```
Server running on

http://localhost:3000
```

---

# Step 17 – Verify the Architecture

```
Request

↓

Controller

↓

AI Service

↓

Provider Factory

↓

Selected Provider

↓

Mock Response

↓

Controller

↓

Client
```

Each layer has a single responsibility.

---

# Step 18 – Benefits of Provider Pattern

✅ Easy to add new providers

✅ Clean architecture

✅ No changes required in controllers

✅ Easy unit testing

✅ Better maintainability

✅ Enterprise-ready design

✅ Supports Dependency Injection

---

# Step 19 – Future Integration

Currently every provider returns mock responses.

In later chapters, replace the mock implementations with real APIs.

Example:

Ollama

```ts
POST http://localhost:11434/api/generate
```

OpenAI

```text
https://api.openai.com/v1/chat/completions
```

Gemini

```text
Google Gemini REST API
```

Claude

```text
Anthropic Claude API
```

No changes will be required in the Controller or AI Service.

Only the provider implementations will change.

---

# Step 20 – Verify the Milestone

Checklist

- ✅ Provider interface created.
- ✅ Ollama provider implemented.
- ✅ OpenAI provider implemented.
- ✅ Gemini provider implemented.
- ✅ Claude provider implemented.
- ✅ Provider Factory created.
- ✅ AI Service uses Provider Factory.
- ✅ Controller remains unchanged.
- ✅ API returns provider-specific mock responses.
- ✅ Project builds successfully.

---

# Final Architecture

```text
Chrome Extension

        │

        ▼

Backend API

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

Provider Factory

        │

        ├──────────────┐
        │              │
        ▼              ▼

Ollama        OpenAI

        │              │

        ▼              ▼

Gemini        Claude

        │

        ▼

Mock Response

        │

        ▼

Chrome Extension
```

---

# Deliverables

By the end of this milestone, you will have:

- ✅ AI Provider Interface
- ✅ Ollama Provider
- ✅ OpenAI Provider
- ✅ Gemini Provider
- ✅ Claude Provider
- ✅ Provider Factory
- ✅ AI Service Integration
- ✅ Enterprise Provider Architecture
- ✅ Mock Responses from Multiple Providers

---

# Best Practices

- ✅ Program against interfaces, not implementations.
- ✅ Keep providers focused on external API communication.
- ✅ Use a factory to create provider instances.
- ✅ Avoid provider-specific logic in controllers.
- ✅ Make adding new providers require minimal changes.
- ✅ Prepare for dependency injection in future milestones.

---

# Git Commit

```bash
git add .

git commit -m "feat(backend): implement provider architecture"

git push origin develop
```

---

# What's Next?

➡️ **Milestone 9 – Connect Chrome Extension**

In the next milestone, you'll replace the mock runtime messaging with real HTTP communication between the Chrome Extension and the Node.js backend.

The request flow will become:

```text
Popup

↓

Background Worker

↓

Node.js Backend

↓

AI Service

↓

Provider

↓

Mock Response

↓

Background Worker

↓

Popup
```

This transforms your project from a standalone Chrome Extension into a complete full-stack AI application.
```