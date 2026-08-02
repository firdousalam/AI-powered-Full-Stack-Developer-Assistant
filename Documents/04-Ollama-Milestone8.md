# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.8 – Preparing for Multi-Provider AI Support

# Part 1 – AI Provider Interface & Ollama Provider

> **Building an Extensible AI Provider Architecture**

---

# 📖 Introduction

Until now, our application communicates directly with **Ollama**.

```
AI Service
      │
      ▼
Ollama Service
      │
      ▼
Ollama
```

Although this works well, it tightly couples our application to a single AI provider.

If tomorrow we want to integrate:

- OpenAI
- Gemini
- Claude
- Azure OpenAI
- AWS Bedrock
- Groq
- Together AI

we would need to rewrite large parts of our backend.

That is not a scalable architecture.

---

# 🎯 Goal

In this milestone we will redesign the AI layer using an **AI Provider Interface**.

Instead of depending directly on Ollama, every provider will implement the same interface.

This follows one of the most important Object-Oriented Programming principles:

> **Program to an interface, not an implementation.**

---

# 🎯 Learning Objectives

After completing this milestone you will be able to:

- Design an AI Provider Interface
- Understand the Strategy Pattern
- Build provider-independent AI services
- Create reusable provider implementations
- Support multiple AI providers
- Separate provider-specific code
- Prepare the backend for cloud AI providers
- Build enterprise-grade AI architecture

---

# 🏗 Current Architecture

Currently, the AI Service directly calls Ollama.

```text
Chrome Extension
        │
        ▼
 AI Controller
        │
        ▼
   AI Service
        │
        ▼
 Ollama Service
        │
        ▼
     Ollama
```

This architecture works but is tightly coupled.

---

# 🚀 New Architecture

After introducing AI Providers, the flow becomes:

```text
Chrome Extension
        │
        ▼
 AI Controller
        │
        ▼
   AI Service
        │
        ▼
 Provider Factory
        │
        ▼
 AI Provider Interface
        │
 ┌──────┼─────────────┐
 ▼      ▼             ▼
Ollama OpenAI      Gemini
        ▼
     Claude
```

The AI Service no longer knows which provider is being used.

It only communicates with the interface.

---

# 💡 Why Use an Interface?

Suppose today we only support Ollama.

Tomorrow we decide to use GPT-5.

Without an interface:

```
AI Service

↓

if(provider==="ollama")

↓

call Ollama

↓

else if(provider==="openai")

↓

call OpenAI

↓

else if(...)
```

The service quickly becomes difficult to maintain.

With an interface:

```
AI Service

↓

Provider Interface

↓

Selected Provider
```

The AI Service never changes when a new provider is added.

Only the new provider class is created.

---

# 📁 Project Structure

Create a new folder:

```text
backend/

src/

├── providers/
│
├── services/
│
├── controllers/
│
├── prompts/
│
├── memory/
│
└── routes/
```

After this milestone:

```text
backend/

src/

├── providers/
│
│   ├── ai-provider.ts
│
│   ├── ollama.provider.ts
│
│   ├── openai.provider.ts
│
│   ├── gemini.provider.ts
│
│   ├── claude.provider.ts
│
│   └── provider.factory.ts
│
├── services/
│
├── controllers/
│
└── routes/
```

---

# 🔹 Step 1 – Create AI Provider Interface

Create:

```text
src/providers/ai-provider.ts
```

This interface defines the common contract that every AI provider must implement.

---

## Complete Code

```typescript
export interface AIProvider {

    chat(

        prompt: string,

        model: string

    ): Promise<string>;

    generate(

        prompt: string,

        model: string

    ): Promise<string>;

    streamChat(

        prompt: string,

        model: string,

        onToken: (token: string) => void

    ): Promise<void>;

}
```

---

# 📖 Understanding the Interface

This interface defines three core capabilities that every AI provider must support.

## chat()

Used for conversational AI.

Example:

```
User

↓

"Explain Docker"

↓

AI Chat Response
```

Signature:

```typescript
chat(

    prompt: string,

    model: string

): Promise<string>
```

---

## generate()

Used for completion-style requests.

Example:

```
Generate README

↓

Generate SQL

↓

Generate Kubernetes YAML
```

Signature:

```typescript
generate(

    prompt: string,

    model: string

): Promise<string>
```

---

## streamChat()

Used for real-time AI responses.

Example:

```
Token 1

↓

Token 2

↓

Token 3

↓

Finished
```

Signature:

```typescript
streamChat(

    prompt,

    model,

    onToken

)
```

Instead of returning one large string, it streams tokens as they are generated.

---

# Why Interfaces Matter

Every provider must implement these three methods.

For example:

Ollama

```
chat()

generate()

streamChat()
```

OpenAI

```
chat()

generate()

streamChat()
```

Gemini

```
chat()

generate()

streamChat()
```

Claude

```
chat()

generate()

streamChat()
```

Since they all follow the same contract, the AI Service can switch providers without changing its own code.

---

# 🔹 Step 2 – Create Ollama Provider

Now move all Ollama-specific logic into a dedicated provider.

Create:

```text
src/providers/ollama.provider.ts
```

---

# Responsibilities

The Ollama Provider should:

- Call the Ollama REST API
- Handle chat requests
- Handle generate requests
- Support streaming responses
- Parse Ollama responses
- Hide Ollama-specific implementation details

---

# Complete Code

```typescript
import { AIProvider } from "./ai-provider";

class OllamaProvider implements AIProvider {

    async chat(

        prompt: string,

        model: string

    ): Promise<string> {

        try {

            const response = await fetch(

                "http://localhost:11434/api/chat",

                {
                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        model,

                        stream: false,

                        messages: [

                            {

                                role: "user",

                                content: prompt

                            }

                        ]

                    })

                }

            );

            if (!response.ok)

                throw new Error("Ollama Chat Failed");

            const data = await response.json();

            return data.message.content;

        }

        catch (error) {

            console.error(error);

            throw error;

        }

    }

    async generate(

        prompt: string,

        model: string

    ): Promise<string> {

        try {

            const response = await fetch(

                "http://localhost:11434/api/generate",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        model,

                        prompt,

                        stream: false

                    })

                }

            );

            if (!response.ok)

                throw new Error("Generate Failed");

            const data = await response.json();

            return data.response;

        }

        catch (error) {

            console.error(error);

            throw error;

        }

    }

    async streamChat(

        prompt: string,

        model: string,

        onToken: (token: string) => void

    ): Promise<void> {

        try {

            const response = await fetch(

                "http://localhost:11434/api/chat",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        model,

                        stream: true,

                        messages: [

                            {

                                role: "user",

                                content: prompt

                            }

                        ]

                    })

                }

            );

            if (!response.body)

                throw new Error("ReadableStream Missing");

            const reader = response.body.getReader();

            const decoder = new TextDecoder();

            while (true) {

                const { done, value } = await reader.read();

                if (done)

                    break;

                const chunk = decoder.decode(value);

                const lines = chunk

                    .split("\n")

                    .filter(line => line.trim() !== "");

                for (const line of lines) {

                    try {

                        const json = JSON.parse(line);

                        if (json.message?.content) {

                            onToken(json.message.content);

                        }

                    }

                    catch {

                        // Ignore malformed JSON fragments

                    }

                }

            }

        }

        catch (error) {

            console.error(error);

            throw error;

        }

    }

}

export default new OllamaProvider();
```

---

# 🔍 How `chat()` Works

```text
AI Service

↓

Ollama Provider

↓

POST /api/chat

↓

Ollama

↓

Assistant Message

↓

Return Text
```

---

# 🔍 How `generate()` Works

```text
AI Service

↓

Ollama Provider

↓

POST /api/generate

↓

Generated Response

↓

Return Text
```

---

# 🔍 How `streamChat()` Works

```text
AI Service

↓

Ollama Provider

↓

POST /api/chat (stream=true)

↓

ReadableStream

↓

Token

↓

Token

↓

Token

↓

onToken()

↓

Popup UI
```

---

# 🛡 Error Handling

The provider handles common issues such as:

- Ollama not running
- Network failures
- Invalid responses
- Missing streams
- Malformed JSON chunks

Errors are logged and re-thrown so higher layers can decide how to respond.

---

# ✅ Benefits of the Provider Pattern

After completing this part, our backend gains several advantages:

- Provider-specific code is isolated.
- The AI Service no longer depends directly on Ollama.
- New providers can be added without modifying business logic.
- Streaming and non-streaming APIs follow the same interface.
- The architecture is ready for OpenAI, Gemini, Claude, Azure OpenAI, AWS Bedrock, and future providers.


# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.8 – Preparing for Multi-Provider AI Support

# Part 2 – Cloud AI Providers & Provider Factory

> **Build a Provider Factory to support Ollama, OpenAI, Gemini and Claude using a common AI Provider architecture.**

---

# 📖 Overview

In Part 1, we created the **AIProvider interface** and implemented the **OllamaProvider**.

Our backend now communicates with Ollama through a common interface instead of directly calling Ollama APIs.

In this part, we'll prepare our backend for cloud AI providers by creating provider implementations for:

- OpenAI
- Google Gemini
- Anthropic Claude

Although these providers will initially contain placeholder implementations, the architecture will be fully prepared for future API integration.

Finally, we'll build a **Provider Factory** that dynamically returns the correct provider instance at runtime.

---

# 🎯 Learning Objectives

After completing this part, you will be able to:

- Build provider classes for cloud AI services
- Understand provider abstraction
- Create reusable provider implementations
- Build a Provider Factory
- Select AI providers dynamically
- Prepare Zeba AI for hybrid AI deployments

---

# 🏗 Current Architecture

```text
AI Service

↓

Ollama Provider

↓

Ollama
```

Only Ollama is supported.

---

# 🏗 New Architecture

```text
                AI Service
                     │
                     ▼
             Provider Factory
                     │
      ┌──────────────┼───────────────┐
      ▼              ▼               ▼
 OllamaProvider  OpenAIProvider  GeminiProvider
                                     │
                                     ▼
                              ClaudeProvider
```

The AI Service no longer knows which provider is being used.

---

# 📁 Project Structure

```text
src/

providers/

├── ai-provider.ts
├── ollama.provider.ts
├── openai.provider.ts
├── gemini.provider.ts
├── claude.provider.ts
└── provider.factory.ts
```

---

# 🔹 Step 1 – Create OpenAI Provider

Create:

```text
src/providers/openai.provider.ts
```

This provider will eventually connect to the OpenAI Chat Completions API.

For now, we'll implement placeholder methods.

```typescript
import { AIProvider } from "./ai-provider";

export class OpenAIProvider implements AIProvider {

    async chat(
        prompt: string,
        model: string
    ): Promise<string> {

        console.log("OpenAI Provider");

        return `
OpenAI integration will be implemented in a future chapter.

Prompt:
${prompt}

Model:
${model}
`;

    }

    async streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void> {

        onToken("OpenAI streaming is not implemented yet.");

    }

}
```

---

## Responsibilities

The OpenAI Provider will eventually:

- Authenticate using API Keys
- Call the Chat Completions API
- Handle streaming responses
- Parse AI responses
- Handle errors and retries

---

# 🔹 Step 2 – Create Gemini Provider

Create:

```text
src/providers/gemini.provider.ts
```

```typescript
import { AIProvider } from "./ai-provider";

export class GeminiProvider implements AIProvider {

    async chat(
        prompt: string,
        model: string
    ): Promise<string> {

        console.log("Gemini Provider");

        return `
Gemini integration will be implemented in a future chapter.

Prompt:
${prompt}

Model:
${model}
`;

    }

    async streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void> {

        onToken("Gemini streaming is not implemented yet.");

    }

}
```

---

## Responsibilities

The Gemini Provider will later:

- Connect to Gemini API
- Authenticate securely
- Support streaming
- Parse responses
- Handle provider-specific errors

---

# 🔹 Step 3 – Create Claude Provider

Create:

```text
src/providers/claude.provider.ts
```

```typescript
import { AIProvider } from "./ai-provider";

export class ClaudeProvider implements AIProvider {

    async chat(
        prompt: string,
        model: string
    ): Promise<string> {

        console.log("Claude Provider");

        return `
Claude integration will be implemented in a future chapter.

Prompt:
${prompt}

Model:
${model}
`;

    }

    async streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void> {

        onToken("Claude streaming is not implemented yet.");

    }

}
```

---

## Responsibilities

The Claude Provider will eventually:

- Connect to Anthropic API
- Support Claude models
- Handle authentication
- Stream responses
- Parse JSON output

---

# 🔹 Step 4 – Build Provider Factory

Create:

```text
src/providers/provider.factory.ts
```

This factory centralizes provider creation.

Instead of scattering provider selection logic throughout the application, everything is managed from one location.

```typescript
import { AIProvider } from "./ai-provider";

import { OllamaProvider } from "./ollama.provider";
import { OpenAIProvider } from "./openai.provider";
import { GeminiProvider } from "./gemini.provider";
import { ClaudeProvider } from "./claude.provider";

export enum AIProviderType {

    OLLAMA = "ollama",

    OPENAI = "openai",

    GEMINI = "gemini",

    CLAUDE = "claude"

}

export class ProviderFactory {

    static create(

        provider: AIProviderType

    ): AIProvider {

        switch (provider) {

            case AIProviderType.OPENAI:

                return new OpenAIProvider();

            case AIProviderType.GEMINI:

                return new GeminiProvider();

            case AIProviderType.CLAUDE:

                return new ClaudeProvider();

            case AIProviderType.OLLAMA:

            default:

                return new OllamaProvider();

        }

    }

}
```

---

# 🔹 Step 5 – Provider Selection Flow

Instead of directly creating provider objects, the AI Service asks the Provider Factory.

```text
AI Service

↓

Provider Factory

↓

Requested Provider

↓

Provider Instance

↓

Chat()

↓

AI Response
```

---

# 🔹 Step 6 – Example Usage

```typescript
import {

    ProviderFactory,

    AIProviderType

} from "../providers/provider.factory";

const provider = ProviderFactory.create(

    AIProviderType.OLLAMA

);

const response = await provider.chat(

    "Explain Docker",

    "llama3.2:3b"

);

console.log(response);
```

Switching to OpenAI is as simple as:

```typescript
const provider = ProviderFactory.create(

    AIProviderType.OPENAI

);
```

No other code changes are required.

---

# 🔹 Step 7 – Future Configuration

In future milestones, the provider type will be loaded from configuration.

Example:

```env
AI_PROVIDER=ollama
```

or

```env
AI_PROVIDER=openai
```

or

```env
AI_PROVIDER=gemini
```

Then the application can dynamically select the provider:

```typescript
const provider = ProviderFactory.create(

    process.env.AI_PROVIDER as AIProviderType

);
```

---

# 🧪 Testing

For now, test each provider manually.

## Ollama

```typescript
const provider = ProviderFactory.create(

    AIProviderType.OLLAMA

);
```

Expected:

Real AI response from Ollama.

---

## OpenAI

```typescript
const provider = ProviderFactory.create(

    AIProviderType.OPENAI

);
```

Expected:

Placeholder message indicating future implementation.

---

## Gemini

```typescript
const provider = ProviderFactory.create(

    AIProviderType.GEMINI

);
```

Expected:

Placeholder message.

---

## Claude

```typescript
const provider = ProviderFactory.create(

    AIProviderType.CLAUDE

);
```

Expected:

Placeholder message.

---

# 💡 Best Practices

- Keep provider implementations isolated.
- Never mix provider-specific code inside controllers.
- Use the Provider Factory for all provider creation.
- Keep authentication inside provider classes.
- Implement streaming consistently across providers.
- Avoid hardcoding provider selection.

---

# 📦 Deliverables

By the end of this part, you will have:

- ✅ OpenAI Provider
- ✅ Gemini Provider
- ✅ Claude Provider
- ✅ Placeholder streaming support
- ✅ Provider Factory
- ✅ Dynamic provider selection
- ✅ Hybrid AI architecture
- ✅ Foundation for cloud AI integration

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): implement cloud providers and provider factory"

git push origin develop
```

---

# 📖 Part Summary

In this part, we extended the AI provider architecture beyond Ollama by introducing placeholder providers for OpenAI, Gemini, and Claude. We also built a centralized Provider Factory that dynamically returns the correct provider implementation based on the requested AI platform. This design follows the Factory Pattern, keeping provider-specific logic isolated while allowing the AI Service to remain completely independent of the underlying AI vendor. The backend is now fully prepared for hybrid deployments where local models and cloud-based AI services can coexist seamlessly.

---
# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.8 – Preparing for Multi-Provider AI Support

# Part 3 – Integrating Provider Factory with AI Service

> **Integrate the Provider Factory into the AI workflow to dynamically select AI providers, support fallback strategies, and prepare Zeba AI for hybrid local and cloud deployments.**

---

# 📖 Overview

In the previous part, we created a flexible provider architecture consisting of:

- AI Provider Interface
- Ollama Provider
- OpenAI Provider
- Gemini Provider
- Claude Provider
- Provider Factory

Although all providers are now available, our AI Service still communicates directly with the Ollama provider.

In this part, we'll refactor the AI Service to use the Provider Factory so that the backend can dynamically switch providers without changing business logic.

---

# 🎯 Learning Objectives

After completing this part, you will be able to:

- Integrate Provider Factory into AI Service
- Dynamically load providers
- Configure providers using environment variables
- Implement provider fallback
- Handle provider failures gracefully
- Build a provider-independent AI architecture

---

# 🏗 Current Architecture

```text
Chrome Extension

↓

Backend

↓

AI Service

↓

Ollama Provider

↓

Ollama
```

Only Ollama is supported.

---

# 🏗 New Architecture

```text
Chrome Extension

↓

Backend

↓

AI Service

↓

Provider Factory

↓

Selected Provider

↓

Ollama
OpenAI
Gemini
Claude

↓

AI Response
```

---

# 📁 Project Structure

```text
src/

providers/

├── ai-provider.ts
├── ollama.provider.ts
├── openai.provider.ts
├── gemini.provider.ts
├── claude.provider.ts
└── provider.factory.ts

services/

├── ai.service.ts

config/

├── ai.config.ts
```

---

# 🔹 Step 1 – Create AI Configuration

Instead of hardcoding the provider, create a configuration file.

Create:

```text
src/config/ai.config.ts
```

```typescript
import { AIProviderType } from "../providers/provider.factory";

export const AI_CONFIG = {

    provider:

        (process.env.AI_PROVIDER as AIProviderType)

        ||

        AIProviderType.OLLAMA,

    enableFallback: true,

    fallbackProvider: AIProviderType.OLLAMA

};
```

---

## Why use a configuration file?

Without configuration:

```typescript
ProviderFactory.create(
    AIProviderType.OLLAMA
);
```

Hardcoded values make switching providers difficult.

With configuration:

```typescript
ProviderFactory.create(
    AI_CONFIG.provider
);
```

The provider can now be changed without modifying code.

---

# 🔹 Step 2 – Configure Environment Variables

Add to your `.env` file:

```env
AI_PROVIDER=ollama
```

Examples:

Use OpenAI

```env
AI_PROVIDER=openai
```

Use Gemini

```env
AI_PROVIDER=gemini
```

Use Claude

```env
AI_PROVIDER=claude
```

Restart the backend after changing the value.

---

# 🔹 Step 3 – Update AI Service

Current implementation

```text
AI Service

↓

Ollama Service
```

New implementation

```text
AI Service

↓

Provider Factory

↓

Selected Provider

↓

Chat()
```

---

Update:

```text
src/services/ai.service.ts
```

```typescript
import aiRouter from "./ai-router.service";
import promptService from "./prompt.service";

import { AI_CONFIG } from "../config/ai.config";

import {

    ProviderFactory

} from "../providers/provider.factory";

class AIService {

    async chat(

        prompt: string

    ) {

        const formattedPrompt =

            promptService.buildPrompt(prompt);

        const route =

            aiRouter.selectModel(prompt);

        const provider =

            ProviderFactory.create(

                AI_CONFIG.provider

            );

        console.log("===================================");

        console.log("Provider :", AI_CONFIG.provider);

        console.log("Model    :", route.model);

        console.log("Reason   :", route.reason);

        console.log("===================================");

        return provider.chat(

            formattedPrompt,

            route.model

        );

    }

}

export default new AIService();
```

---

## Flow

```text
User Prompt

↓

Prompt Service

↓

Formatted Prompt

↓

AI Router

↓

Model Selected

↓

Provider Factory

↓

Provider

↓

AI Response
```

---

# 🔹 Step 4 – Integrate Streaming

Streaming should also use the selected provider.

Add a streaming method.

```typescript
async streamChat(

    prompt: string,

    onToken: (token: string) => void

) {

    const formattedPrompt =

        promptService.buildPrompt(prompt);

    const route =

        aiRouter.selectModel(prompt);

    const provider =

        ProviderFactory.create(

            AI_CONFIG.provider

        );

    return provider.streamChat(

        formattedPrompt,

        route.model,

        onToken

    );

}
```

---

Streaming Flow

```text
Popup

↓

Controller

↓

AI Service

↓

Provider Factory

↓

Selected Provider

↓

Streaming

↓

Popup
```

---

# 🔹 Step 5 – Update AI Controller

Your controller does not need to know which provider is being used.

```text
Controller

↓

AI Service

↓

Provider Factory

↓

Provider
```

Controller remains simple:

```typescript
const result = await aiService.chat(

    req.body.prompt

);

res.json(result);
```

---

# 🔹 Step 6 – Implement Provider Fallback

Sometimes cloud providers fail.

Reasons include:

- Network issues
- API quota exceeded
- Invalid API key
- Timeout
- Provider outage

Instead of failing immediately, we can automatically switch to another provider.

---

Flow

```text
OpenAI

↓

Failed

↓

Fallback

↓

Ollama

↓

Success
```

---

Update AI Service:

```typescript
async chat(

    prompt: string

) {

    const formattedPrompt =

        promptService.buildPrompt(prompt);

    const route =

        aiRouter.selectModel(prompt);

    try {

        const provider =

            ProviderFactory.create(

                AI_CONFIG.provider

            );

        return await provider.chat(

            formattedPrompt,

            route.model

        );

    }

    catch (error) {

        console.error(

            "Primary provider failed:",

            error

        );

        if (

            AI_CONFIG.enableFallback

        ) {

            console.log(

                "Switching to fallback provider..."

            );

            const fallbackProvider =

                ProviderFactory.create(

                    AI_CONFIG.fallbackProvider

                );

            return fallbackProvider.chat(

                formattedPrompt,

                route.model

            );

        }

        throw error;

    }

}
```

---

Fallback Architecture

```text
User

↓

OpenAI

↓

Failed

↓

Provider Factory

↓

Fallback

↓

Ollama

↓

Response
```

---

# 🔹 Step 7 – Logging

Log useful information during development.

```typescript
console.log("========================");

console.log(

    "Provider:",

    AI_CONFIG.provider

);

console.log(

    "Model:",

    route.model

);

console.log(

    "Fallback:",

    AI_CONFIG.enableFallback

);

console.log("========================");
```

Example output

```text
========================

Provider: ollama

Model: qwen2.5-coder:7b

Fallback: true

========================
```

---

# 🔹 Step 8 – Testing

## Test Ollama

```env
AI_PROVIDER=ollama
```

Expected:

```text
Provider: ollama
```

Real AI response.

---

## Test OpenAI

```env
AI_PROVIDER=openai
```

Expected:

```text
Provider: openai
```

Placeholder response.

---

## Test Gemini

```env
AI_PROVIDER=gemini
```

Expected:

```text
Provider: gemini
```

Placeholder response.

---

## Test Claude

```env
AI_PROVIDER=claude
```

Expected:

```text
Provider: claude
```

Placeholder response.

---

## Test Fallback

Force an exception inside the OpenAI Provider.

Expected output:

```text
Provider failed

↓

Fallback Provider

↓

Ollama
```

The user still receives a successful response.

---

# 🧪 Testing Checklist

Verify the following:

- ✅ Provider loaded from configuration
- ✅ AI Service uses Provider Factory
- ✅ Prompt Service still works
- ✅ AI Router still selects correct model
- ✅ Streaming uses selected provider
- ✅ Fallback activates on provider failure
- ✅ Logs show provider selection
- ✅ Controllers remain provider-independent

---

# 💡 Best Practices

- Never instantiate providers directly inside controllers.
- Keep provider selection centralized in the Provider Factory.
- Load provider configuration from environment variables.
- Implement graceful fallback for production reliability.
- Log provider selection during development.
- Keep AI Service independent of provider-specific implementations.

---

# 📦 Deliverables

By the end of this part, you will have:

- ✅ Provider Factory integrated into AI Service
- ✅ Dynamic provider selection
- ✅ Environment-based configuration
- ✅ Streaming support through providers
- ✅ Automatic fallback strategy
- ✅ Provider-independent AI Service
- ✅ Hybrid AI architecture

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): integrate provider factory with ai service"

git push origin develop
```

---

# 📖 Part Summary

In this part, we fully integrated the Provider Factory into the AI Service, allowing Zeba AI to dynamically select the configured AI provider at runtime. We introduced environment-based configuration, implemented provider fallback strategies, and ensured that both standard and streaming requests use the same provider abstraction. This architecture completely decouples business logic from provider implementations, making it easy to switch between Ollama, OpenAI, Gemini, Claude, or future providers without changing the application's core logic.

---
# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.8 – Preparing for Multi-Provider AI Support

# Part 4 – Multi-Provider Strategy & Production Architecture

> **Implement intelligent provider selection strategies, automatic failover, health monitoring, retry mechanisms, and design a production-ready hybrid AI architecture for Zeba AI.**

---

# 📖 Overview

In the previous part, we integrated the Provider Factory into the AI Service, allowing Zeba AI to dynamically switch between AI providers such as Ollama, OpenAI, Gemini, and Claude.

However, the application still relies on a manually configured provider.

A production AI system should make this decision automatically.

Different providers excel at different tasks:

- Local models are free and private.
- Cloud models are generally more powerful.
- Some providers are better for reasoning.
- Some providers are better for coding.
- Some providers are faster.
- Some providers are cheaper.

Instead of manually choosing a provider, we'll build an intelligent Provider Strategy Engine.

---

# 🎯 Learning Objectives

After completing this part, you will be able to:

- Build Provider Selection Strategies
- Implement Cost-aware Routing
- Route AI requests based on complexity
- Monitor Provider Health
- Retry failed requests
- Automatically switch providers
- Design enterprise AI architecture
- Prepare Zeba AI for production deployments

---

# 🏗 Current Architecture

```text
Chrome Extension

↓

AI Service

↓

Provider Factory

↓

Configured Provider

↓

Response
```

Provider selection is static.

---

# 🏗 New Architecture

```text
Chrome Extension

↓

AI Service

↓

Provider Strategy

↓

Provider Factory

↓

Provider

↓

Health Monitor

↓

Retry Engine

↓

Fallback Provider

↓

Response
```

---

# 📁 Updated Project Structure

```text
src/

providers/

├── ai-provider.ts
├── provider.factory.ts
├── provider.strategy.ts
├── provider.health.ts
├── retry.service.ts
├── ollama.provider.ts
├── openai.provider.ts
├── gemini.provider.ts
└── claude.provider.ts
```

---

# 🔹 Step 1 – Build Provider Strategy

Create

```text
src/providers/provider.strategy.ts
```

Purpose

Instead of selecting providers manually, this class decides which provider should be used.

Responsibilities

- Detect request complexity
- Detect request type
- Select provider
- Apply enterprise routing rules

---

## Example Strategy

```typescript
import { AIProviderType } from "./provider.factory";

class ProviderStrategy {

    selectProvider(

        prompt: string

    ): AIProviderType {

        const input = prompt.toLowerCase();

        // Complex reasoning

        if (

            input.includes("architecture") ||

            input.includes("distributed") ||

            input.includes("microservices")

        ) {

            return AIProviderType.CLAUDE;

        }

        // Coding

        if (

            input.includes("typescript") ||

            input.includes("react") ||

            input.includes("docker") ||

            input.includes("node")

        ) {

            return AIProviderType.OLLAMA;

        }

        // Documentation

        if (

            input.includes("readme") ||

            input.includes("documentation")

        ) {

            return AIProviderType.OPENAI;

        }

        // Default

        return AIProviderType.OLLAMA;

    }

}

export default new ProviderStrategy();
```

---

# 🧠 Provider Selection Flow

```text
User Prompt

↓

Provider Strategy

↓

Best Provider

↓

Provider Factory

↓

Provider Instance

↓

Response
```

---

# 🔹 Step 2 – Route Requests Based on Task Complexity

Different requests require different models.

Example

| Task | Complexity | Provider |
|--------|------------|-----------|
| Hello | Low | Ollama |
| Explain Docker | Medium | Ollama |
| Review TypeScript | Medium | Ollama |
| Architecture Design | High | Claude |
| Research Paper | High | OpenAI |
| Long Documentation | High | OpenAI |

---

## Example

Prompt

```text
Explain Docker Compose
```

↓

Provider

```text
Ollama
```

---

Prompt

```text
Design Netflix Architecture
```

↓

Provider

```text
Claude
```

---

Prompt

```text
Generate Product Documentation
```

↓

Provider

```text
OpenAI
```

---

# 🔹 Step 3 – Cost-aware Routing

Cloud providers cost money.

Ollama is free.

Strategy

```text
Simple Request

↓

Ollama

↓

Free
```

Large request

↓

Cloud

↓

Higher Quality

---

Example

```typescript
if (

    prompt.length < 500

)

    return AIProviderType.OLLAMA;

return AIProviderType.OPENAI;
```

---

# 🔹 Step 4 – Health Monitoring

Sometimes providers become unavailable.

Examples

- Ollama stopped
- API quota exceeded
- Timeout
- Invalid API key

Instead of waiting for failures, periodically check provider health.

---

Create

```text
src/providers/provider.health.ts
```

Example

```typescript
class ProviderHealth {

    private health = {

        ollama: true,

        openai: true,

        gemini: true,

        claude: true

    };

    isHealthy(

        provider: string

    ) {

        return this.health[provider];

    }

    setHealth(

        provider: string,

        status: boolean

    ) {

        this.health[provider] = status;

    }

}

export default new ProviderHealth();
```

---

Health Flow

```text
AI Request

↓

Health Check

↓

Healthy?

↓

Yes

↓

Continue

↓

No

↓

Fallback
```

---

# 🔹 Step 5 – Retry Service

Network failures happen.

Instead of immediately failing:

Retry.

Create

```text
src/providers/retry.service.ts
```

Example

```typescript
class RetryService {

    async execute(

        fn: () => Promise<any>,

        retries = 3

    ) {

        let lastError;

        for (

            let i = 0;

            i < retries;

            i++

        ) {

            try {

                return await fn();

            }

            catch (error) {

                lastError = error;

            }

        }

        throw lastError;

    }

}

export default new RetryService();
```

---

Retry Flow

```text
Request

↓

Failed

↓

Retry

↓

Success
```

or

```text
Retry

↓

Retry

↓

Retry

↓

Fallback
```

---

# 🔹 Step 6 – Automatic Failover

If retries fail

↓

Automatically switch providers.

Flow

```text
OpenAI

↓

Timeout

↓

Retry

↓

Retry

↓

Retry

↓

Failed

↓

Claude

↓

Success
```

---

Example

```typescript
try {

    return await primary.chat(

        prompt,

        model

    );

}

catch {

    return fallback.chat(

        prompt,

        model

    );

}
```

---

# 🔹 Step 7 – Update AI Service

Instead of

```text
Config

↓

Factory
```

Use

```text
Strategy

↓

Factory
```

Example

```typescript
const providerType =

    providerStrategy.selectProvider(

        prompt

    );

const provider =

    ProviderFactory.create(

        providerType

    );
```

---

Complete Flow

```text
Prompt

↓

Prompt Service

↓

Provider Strategy

↓

Provider Factory

↓

Provider

↓

Retry

↓

Fallback

↓

Response
```

---

# 🔹 Step 8 – Logging

Useful production logs

```typescript
console.log("================================");

console.log("Prompt :", prompt);

console.log("Provider :", providerType);

console.log("Retry Enabled");

console.log("Health OK");

console.log("================================");
```

---

Example Output

```text
================================

Prompt:
Explain Docker

Provider:
Ollama

Retry Enabled

Health OK

================================
```

---

# 🔹 Step 9 – Testing

## Test 1

Prompt

```text
Hello
```

Expected

```text
Ollama
```

---

## Test 2

Prompt

```text
Explain Docker
```

Expected

```text
Ollama
```

---

## Test 3

Prompt

```text
Design Distributed Architecture
```

Expected

```text
Claude
```

---

## Test 4

Disable Claude

Expected

```text
Claude

↓

Failed

↓

OpenAI
```

---

## Test 5

Disable Internet

Expected

```text
Cloud Provider

↓

Failed

↓

Ollama
```

---

# 🧪 Testing Checklist

Verify the following:

- ✅ Provider Strategy selects the correct provider
- ✅ Coding prompts route to Ollama
- ✅ Architecture prompts route to Claude
- ✅ Documentation prompts route to OpenAI
- ✅ Health monitoring detects unavailable providers
- ✅ Retry mechanism retries failed requests
- ✅ Automatic fallback switches providers
- ✅ AI Service remains provider-independent
- ✅ Logs show routing decisions

---

# 💡 Best Practices

- Never hardcode provider names inside business logic.
- Keep provider selection inside the Provider Strategy.
- Monitor provider health continuously.
- Retry transient failures before failing over.
- Prefer local models for low-cost requests.
- Use cloud providers only when needed.
- Log provider selection and failover events.
- Keep retry counts configurable.

---

# 🏢 Production Architecture

```text
Chrome Extension

↓

Backend API

↓

AI Controller

↓

AI Service

↓

Prompt Service

↓

AI Router

↓

Provider Strategy

↓

Provider Factory

↓

Health Monitor

↓

Retry Service

↓

Primary Provider

↓

Fallback Provider

↓

Response

↓

Popup UI
```

This layered architecture separates responsibilities and makes the backend scalable, maintainable, and easy to extend.

---

# 📦 Deliverables

By the end of this part, you will have:

- ✅ Intelligent Provider Strategy
- ✅ Task-based Provider Selection
- ✅ Cost-aware Routing
- ✅ Provider Health Monitoring
- ✅ Retry Mechanism
- ✅ Automatic Failover
- ✅ Production-ready Hybrid AI Architecture
- ✅ Enterprise AI Design

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): implement provider strategy and production architecture"

git push origin develop
```

---

# 📖 Part Summary

In this part, we transformed Zeba AI into a production-ready multi-provider platform by introducing a Provider Strategy Engine, cost-aware routing, provider health monitoring, retry mechanisms, and automatic failover. Instead of relying on a single configured provider, the backend now intelligently selects the most suitable AI provider based on the user's request and system conditions. This architecture enables hybrid deployments that combine local models such as Ollama with cloud providers like OpenAI, Gemini, and Claude, delivering higher reliability, scalability, and flexibility for enterprise AI applications.

---

# 🎉 Milestone 4.8 Completed

Congratulations! You have successfully prepared Zeba AI for hybrid local and cloud AI deployments.

Your backend now supports:

- ✅ AI Provider Interface
- ✅ Ollama Provider
- ✅ OpenAI Provider (Ready)
- ✅ Gemini Provider (Ready)
- ✅ Claude Provider (Ready)
- ✅ Provider Factory
- ✅ Dynamic Provider Selection
- ✅ Intelligent Provider Strategy
- ✅ Automatic Failover
- ✅ Retry Engine
- ✅ Health Monitoring
- ✅ Production-ready Hybrid AI Architecture

Zeba AI is now architected to support multiple AI providers and is ready for future enterprise-scale enhancements.