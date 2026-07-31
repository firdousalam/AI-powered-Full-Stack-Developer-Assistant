# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.8 – Preparing for Multi-Provider AI Support

## 🎥 Episode 4.8

---

# 🎯 Goal

Throughout this chapter, we have built a powerful AI backend using **Ollama** and local Large Language Models (LLMs). While running AI locally provides excellent privacy, zero API costs, and offline capabilities, production AI systems rarely rely on a single provider.

Different AI providers excel at different tasks:

- Ollama provides free local inference.
- OpenAI offers high-quality general reasoning.
- Gemini provides strong multimodal capabilities.
- Claude excels at long-context understanding and document analysis.

To build a scalable enterprise AI platform, our backend should not depend on a single provider.

Instead, we will design an architecture where all AI providers implement a common interface, allowing DevPilot AI to switch providers without changing the business logic.

By the end of this milestone, our backend will be ready to support multiple AI providers with automatic provider selection and fallback strategies.

---

# 🎯 Learning Objectives

After completing this milestone, you will be able to:

- Understand multi-provider AI architecture
- Abstract AI providers behind a common interface
- Build reusable provider implementations
- Add support for Ollama, OpenAI, Gemini, and Claude
- Implement Provider Factory Pattern
- Implement automatic provider fallback
- Select providers dynamically
- Build cloud-ready AI architecture

---

# 🤔 Why Multi-Provider AI?

Imagine these scenarios:

- Ollama is not running.
- OpenAI API rate limit is exceeded.
- Gemini is temporarily unavailable.
- Claude provides a better answer for large documents.
- The user prefers local AI for privacy.

Without abstraction, every controller would need provider-specific logic.

With abstraction, switching providers becomes effortless.

---

# ❌ Traditional Architecture

```text
Controller

↓

Ollama

```

Problems:

- Tight coupling
- Hard to extend
- Difficult to test
- Difficult to switch providers
- Vendor lock-in

---

# ✅ Enterprise Architecture

```text
Controller

↓

AI Service

↓

Provider Factory

↓

AI Provider Interface

      │

 ┌────┼──────────────┬───────────────┬──────────────┐

 ▼    ▼              ▼               ▼

Ollama OpenAI      Gemini        Claude
```

This architecture follows the **Open/Closed Principle**, allowing us to add new providers without modifying existing business logic.

---

# 🏗 High-Level Architecture

```text
Chrome Extension

↓

Backend API

↓

AI Service

↓

Provider Factory

↓

AI Provider Interface

↓

Selected Provider

↓

AI Response
```

---

# 📁 Project Structure

Create a dedicated folder for AI providers.

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
├── prompts/
│
├── memory/
│
└── config/
```

---

# 🔹 Step 1 – Create AI Provider Interface

Create:

```text
src/providers/ai-provider.ts
```

The interface defines a common contract for every AI provider.

Every provider must implement:

- Chat
- Streaming Chat
- Health Check

Example:

```typescript
export interface AIProvider {

    chat(
        prompt: string,
        model: string
    ): Promise<string>;

    streamChat(
        prompt: string,
        model: string
    ): Promise<ReadableStream>;

}
```

---

# 🔹 Step 2 – Create Ollama Provider

Move all Ollama-specific logic into:

```text
src/providers/ollama.provider.ts
```

Responsibilities:

- Call Ollama REST API
- Handle streaming
- Parse responses
- Implement AIProvider interface

---

# 🔹 Step 3 – Prepare OpenAI Provider

Create:

```text
src/providers/openai.provider.ts
```

Responsibilities:

- Call OpenAI Chat Completions API
- Support GPT models
- Handle authentication
- Support streaming

Initially, this provider can contain placeholder implementations until API integration is added in future chapters.

---

# 🔹 Step 4 – Prepare Gemini Provider

Create:

```text
src/providers/gemini.provider.ts
```

Responsibilities:

- Connect to Google Gemini API
- Support streaming
- Handle authentication
- Process responses

---

# 🔹 Step 5 – Prepare Claude Provider

Create:

```text
src/providers/claude.provider.ts
```

Responsibilities:

- Connect to Anthropic Claude API
- Handle streaming responses
- Manage authentication
- Parse AI responses

---

# 🔹 Step 6 – Build Provider Factory

Create:

```text
src/providers/provider.factory.ts
```

Responsibilities:

- Receive provider name
- Return correct provider instance
- Hide provider creation logic
- Centralize provider selection

Flow:

```text
AI Service

↓

Provider Factory

↓

Requested Provider

↓

Provider Instance
```

---

# 🔹 Step 7 – Provider Selection Strategy

Provider selection may depend on:

- User preference
- Availability
- Cost
- Performance
- Privacy
- Prompt type

Example decision table:

| Request Type | Preferred Provider |
|--------------|--------------------|
| Local Development | Ollama |
| Coding Assistance | Ollama |
| General Chat | OpenAI |
| Vision Tasks | Gemini |
| Large Documents | Claude |

---

# 🔹 Step 8 – Automatic Provider Fallback

If the preferred provider fails, automatically try another provider.

Example flow:

```text
User Prompt

↓

Ollama

↓

Unavailable

↓

OpenAI

↓

Unavailable

↓

Gemini

↓

Success
```

Benefits:

- Improved reliability
- High availability
- Better user experience

---

# 🔹 Step 9 – Update AI Service

Current Flow

```text
AI Service

↓

Ollama Service
```

New Flow

```text
AI Service

↓

Provider Factory

↓

Selected Provider

↓

AI Response
```

The AI Service no longer knows which provider is being used.

It only communicates through the common AIProvider interface.

---

# 🔹 Step 10 – Future Cloud Deployment

Once the provider abstraction is complete, DevPilot AI can support:

- Local AI (Ollama)
- OpenAI
- Gemini
- Claude
- Azure OpenAI
- AWS Bedrock
- Groq
- Together AI
- OpenRouter
- Hugging Face Inference API

Adding a new provider becomes as simple as implementing the AIProvider interface.

---

# 🔄 Provider Selection Flow

```text
User Prompt

↓

AI Service

↓

Provider Factory

↓

Provider Selected

↓

AI Provider

↓

AI Response
```

---

# 🧪 Testing Checklist

Verify the following:

- ✅ AI Provider interface is implemented.
- ✅ Ollama provider works correctly.
- ✅ Provider Factory returns the correct provider.
- ✅ AI Service no longer depends directly on Ollama.
- ✅ Fallback strategy works as expected.
- ✅ New providers can be added without modifying AI Service.
- ✅ Architecture supports hybrid local and cloud deployments.

---

# 💡 Best Practices

- Keep provider-specific code isolated.
- Never hardcode provider logic inside controllers.
- Use dependency injection or factory patterns.
- Design providers to be easily replaceable.
- Implement graceful fallback strategies.
- Keep authentication separate from provider logic.
- Support streaming consistently across providers.
- Log provider selection during development.

---

# 📁 Deliverables

By the end of this milestone, you will have:

- ✅ AI Provider Interface
- ✅ Ollama Provider
- ✅ OpenAI Provider Skeleton
- ✅ Gemini Provider Skeleton
- ✅ Claude Provider Skeleton
- ✅ Provider Factory
- ✅ Provider Selection Strategy
- ✅ Automatic Provider Fallback
- ✅ Hybrid AI Architecture
- ✅ Enterprise-ready Multi-Provider Design

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat(ai): prepare multi-provider architecture"

git push origin develop
```

---

# 📖 Milestone Summary

In this milestone, we redesigned the AI layer to support multiple providers through a common abstraction. By introducing an AI Provider interface and a Provider Factory, we decoupled the application from any single AI vendor. This architecture enables DevPilot AI to seamlessly switch between Ollama, OpenAI, Gemini, Claude, and future providers while supporting automatic fallback strategies and hybrid local/cloud deployments. The result is a flexible, maintainable, and production-ready AI architecture capable of evolving with the rapidly changing AI ecosystem.

---

# ⏭ What's Next?

## Milestone 4.9 – Chapter Wrap-up & Production Architecture

In the final milestone of Chapter 4, we will:

- Review the complete AI architecture
- Optimize project structure
- Validate end-to-end AI workflows
- Review best practices
- Prepare for Model Context Protocol (MCP)
- Finalize the production-ready AI backend
- Complete Chapter 4 deliverables
- Prepare DevPilot AI for external tool integration