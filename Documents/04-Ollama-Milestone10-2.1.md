# 📄 09 — Backend Integration

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

In the previous chapters, we successfully built the frontend portion of Zeba AI's browser context system.

The Chrome Extension can now:

- Detect the active browser tab
- Read the current URL
- Capture the page title
- Collect browser metadata
- Capture selected text
- Send prompts to the Background Service Worker
- Stream AI responses back to the popup

However, although this information is collected inside the browser, it is **not yet being utilized by the AI model**.

The backend currently receives only the user's prompt.

```text
Explain this code.
```

Modern AI assistants like Cursor AI, Claude Code, GitHub Copilot Chat, Continue.dev, and Windsurf go much further.

They enrich every AI request with contextual information before it reaches the Large Language Model (LLM).

This process is known as **Context Injection**.

---

# Learning Objectives

By the end of this chapter, you will be able to:

- Extend the backend API to accept browser context
- Design reusable Browser Context models
- Inject browser context into AI prompts
- Build context-aware Prompt Engineering
- Update Express controllers
- Enhance the AI service layer
- Preserve provider abstraction
- Prepare the architecture for Retrieval-Augmented Generation (RAG)
- Build an enterprise-ready backend pipeline

---

# Why Backend Context Injection?

Suppose a developer visits the React documentation and highlights the following code:

```tsx
useEffect(() => {
    fetchData();
}, []);
```

The developer asks:

```text
Explain this.
```

Without browser context, the AI receives:

```text
Explain this.
```

The model has no idea what "this" refers to.

---

Now imagine the backend injects browser context.

The AI receives:

```text
User Prompt

Explain this.

--------------------------------

Current URL

https://react.dev/reference/react/useEffect

--------------------------------

Page Title

React – useEffect

--------------------------------

Hostname

react.dev

--------------------------------

Selected Text

useEffect(() => {
    fetchData();
}, []);

--------------------------------

Language

en
```

The difference in response quality is dramatic.

---

# Backend Architecture

```
Chrome Extension

        │

        ▼

Background Worker

        │

        ▼

Browser Context

        │

        ▼

Express API

        │

        ▼

AI Controller

        │

        ▼

AI Service

        │

        ▼

Prompt Builder

        │

        ▼

Provider Factory

        │

        ▼

Ollama / OpenAI / Gemini

        │

        ▼

Large Language Model
```

Every request now passes through a context injection pipeline before reaching the model.

---

# Backend Folder Structure

After implementing browser context support, the backend evolves into:

```text
backend/

src/

├── controllers/
│
│   └── ai.controller.ts
│
├── services/
│
│   ├── ai.service.ts
│   ├── prompt.service.ts
│   ├── browserContext.service.ts
│   └── ai-router.service.ts
│
├── providers/
│
├── config/
│
├── types/
│
│   ├── browserContext.types.ts
│   └── ai.types.ts
│
├── routes/
│
└── app.ts
```

Each layer has a clear responsibility.

---

# Browser Context Request Flow

```
Popup

        │

        ▼

Background

        │

        ▼

Browser Context Service

        │

        ▼

Context Object

        │

        ▼

Backend API

        │

        ▼

AI Controller

        │

        ▼

AI Service

        │

        ▼

Prompt Service

        │

        ▼

LLM
```

---

# Browser Context Object

The backend will receive a structured object.

```ts
{
    url: "...",
    title: "...",
    hostname: "...",
    protocol: "...",
    language: "...",
    selectedText: "...",
    timestamp: "..."
}
```

Instead of treating browser information as random strings, we model it as a strongly typed object.

---

# Browser Context Type

Create a shared type.

```text
src/

types/

browserContext.types.ts
```

Example:

```ts
export interface BrowserContext {

    url: string;

    title: string;

    hostname: string;

    protocol: string;

    language: string;

    selectedText?: string;

    timestamp: string;

}
```

Strong typing improves maintainability and reduces runtime errors.

---

# Updating the Request Body

Previously, the backend accepted:

```json
{
  "prompt": "...",
  "model": "..."
}
```

After this chapter:

```json
{
  "prompt": "...",
  "model": "...",
  "browserContext": {

      "url": "...",

      "title": "...",

      "hostname": "...",

      "selectedText": "...",

      "language": "...",

      "timestamp": "..."

  }
}
```

---

# AI Controller Responsibilities

The controller becomes responsible for:

- Receiving browser context
- Validating request data
- Passing structured objects to the service layer
- Returning AI responses

The controller should remain thin and avoid business logic.

---

# AI Service Responsibilities

The service layer now performs:

- Browser context processing
- Prompt construction
- Provider selection
- Model routing
- AI request execution
- Error handling

Business logic should always live here.

---

# Prompt Builder Evolution

Previously:

```
User Prompt

↓

LLM
```

Now:

```
User Prompt

+

Browser Context

↓

Formatted Prompt

↓

LLM
```

This allows the AI model to reason using the user's browsing context.

---

# Context Injection Strategy

Instead of sending raw JSON to the model, the backend converts the context into a human-readable prompt.

Example:

```text
You are an AI coding assistant.

Current Page

React – useEffect

Current URL

https://react.dev/reference/react/useEffect

Selected Text

useEffect(() => {
    fetchData();
}, []);

User Question

Explain this code.
```

This format is easier for most LLMs to understand.

---

# Benefits of Context Injection

Injecting browser context provides:

- More accurate explanations
- Better code understanding
- Documentation awareness
- Website awareness
- Less ambiguity
- Improved prompt quality
- Better developer experience

---

# Provider Independence

The backend architecture remains provider-agnostic.

```
Prompt Builder

↓

Provider Factory

↓

Ollama

or

OpenAI

or

Gemini
```

Every provider receives the same enriched prompt.

No provider-specific code is required.

---

# Future Context Sources

Browser context is only the first layer.

Future milestones will inject:

```
Prompt

+

Browser Context

+

DOM Extraction

+

Conversation Memory

+

Retrieved Documents

+

Workspace Files

+

Git History

+

MCP Tools

↓

LLM
```

This layered architecture enables enterprise-grade AI assistants.

---

# Error Handling

The backend should gracefully handle:

- Missing browser context
- Invalid URLs
- Empty prompts
- Unsupported models
- Provider failures
- Network errors

If browser context is unavailable, the AI should still respond using the user's prompt.

---

# Security Considerations

Never trust client-side input blindly.

Validate:

- URL format
- Text length
- Required fields
- Timestamp format

Reject malformed requests before they reach the AI service.

---

# Production Best Practices

- Keep controllers lightweight
- Place business logic inside services
- Use strong TypeScript models
- Avoid hardcoded prompt strings
- Separate prompt generation from AI execution
- Preserve provider abstraction
- Log context for debugging (avoid sensitive data in production)
- Validate incoming requests

---

# Architecture Summary

```
Browser

        │

        ▼

Popup

        │

        ▼

Background

        │

        ▼

Browser Context

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

Prompt Builder

        │

        ▼

Provider Factory

        │

        ▼

LLM
```

---

# Deliverables

By the end of this chapter, you will have successfully implemented:

- ✅ Backend browser context support
- ✅ BrowserContext TypeScript model
- ✅ Updated API request model
- ✅ Context-aware AI requests
- ✅ Prompt injection pipeline
- ✅ Updated AI service architecture
- ✅ Provider-independent context handling
- ✅ Enterprise-ready backend structure
- ✅ Foundation for RAG
- ✅ Foundation for Workspace Awareness

---

# Milestone Progress

After completing this chapter, Zeba AI now supports:

- ✅ Active browser tab detection
- ✅ Current URL extraction
- ✅ Page title collection
- ✅ Browser metadata
- ✅ Selected text capture
- ✅ Chrome Tabs API integration
- ✅ Runtime Messaging
- ✅ Content Script communication
- ✅ Browser Context Service
- ✅ Production-ready React popup
- ✅ Streaming AI responses
- ✅ Backend Context Injection
- ✅ Context-aware Prompt Engineering
- ✅ Multi-provider AI architecture

---

# 📌 Next Chapter

In the next chapter, we will implement **Prompt Engineering & Intelligent Context Injection**.

Topics include:

- Building dynamic AI prompts
- Formatting browser context for LLMs
- Context prioritization
- Prompt templates
- Token optimization
- Prompt compression
- Multi-source context merging
- Preparing prompts for Retrieval-Augmented Generation (RAG)

By the end of the next chapter, Zeba AI will generate structured, context-rich prompts that significantly improve the quality and relevance of AI responses, bringing it one step closer to enterprise-grade coding assistants such as Cursor AI, Claude Code, GitHub Copilot Chat, and Windsurf.


09-Backend-Integration/

├── 09.1-Backend-Architecture.md
# 📄 09.1 — Backend Architecture

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

In the previous milestone, we enhanced the Chrome Extension by enabling it to collect valuable browser context, including the active tab, current URL, page title, browser metadata, and selected text. This transformed Zeba AI from a simple chat interface into a browser-aware assistant capable of understanding what the user is currently viewing.

However, collecting browser context alone is not enough.

The real intelligence of an AI assistant comes from how this contextual information is processed before being sent to the Large Language Model (LLM).

This chapter introduces the backend architecture responsible for receiving browser context, enriching user prompts, selecting the appropriate AI provider, and generating high-quality responses.

By the end of this chapter, you will understand how professional AI assistants like Cursor AI, GitHub Copilot Chat, Claude Code, Continue.dev, and Windsurf organize their backend pipelines to support context-aware conversations.

---

# Learning Objectives

After completing this chapter, you will be able to:

- Understand the complete backend architecture of Zeba AI
- Learn how browser context flows through the backend
- Understand the responsibilities of each backend layer
- Build scalable service-oriented architecture
- Understand Prompt Injection
- Understand Context Injection
- Keep AI providers independent of business logic
- Prepare the architecture for RAG
- Prepare the architecture for MCP (Model Context Protocol)
- Design an enterprise-ready AI backend

---

# Why Backend Architecture Matters

Suppose a user visits the React documentation and highlights the following code.

```tsx
useEffect(() => {
    fetchData();
}, []);
```

The user asks:

```text
Explain this.
```

Without backend processing, the request looks like:

```text
Explain this.
```

The model has no context.

---

Instead, our backend converts it into something like:

```text
Current Page

React – useEffect

Current URL

https://react.dev/reference/react/useEffect

Hostname

react.dev

Selected Text

useEffect(() => {
    fetchData();
}, []);

User Prompt

Explain this.
```

The quality of the AI response increases dramatically because the model understands exactly what the user is referring to.

This process is called **Context Injection**.

---

# High-Level Architecture

```
                    Chrome Extension

                           │

                           ▼

                    Background Worker

                           │

                           ▼

                  Browser Context Object

                           │

                           ▼

                   Express REST API

                           │

                           ▼

                    AI Controller

                           │

                           ▼

                     AI Service

                           │

                           ▼

                  Prompt Service

                           │

                           ▼

                  Provider Factory

                           │

          ┌────────────────┼─────────────────┐
          │                │                 │
          ▼                ▼                 ▼

       Ollama          OpenAI API        Gemini API

                           │

                           ▼

                     Large Language Model
```

Each layer has a single responsibility.

This separation keeps the application modular, scalable, and easy to maintain.

---

# Backend Responsibilities

The backend performs much more than forwarding requests.

It is responsible for:

- Receiving browser context
- Validating requests
- Formatting prompts
- Injecting contextual information
- Selecting AI providers
- Selecting AI models
- Executing requests
- Handling streaming
- Logging
- Error handling
- Future RAG integration
- Future MCP integration

---

# Backend Folder Structure

After implementing browser context support, the backend structure evolves into:

```text
backend/

src/

├── config/
│
│   └── ai.config.ts
│
├── controllers/
│
│   └── ai.controller.ts
│
├── providers/
│
│   ├── ai-provider.ts
│   ├── ollama.provider.ts
│   ├── openai.provider.ts
│   ├── gemini.provider.ts
│   ├── provider.factory.ts
│   └── provider.strategy.ts
│
├── routes/
│
│   └── ai.routes.ts
│
├── services/
│
│   ├── ai.service.ts
│   ├── prompt.service.ts
│   ├── ai-router.service.ts
│   └── browserContext.service.ts
│
├── types/
│
│   ├── browserContext.types.ts
│   └── ai.types.ts
│
├── app.ts
│
└── server.ts
```

Each directory has a clear purpose.

---

# Request Lifecycle

Every AI request follows the same lifecycle.

```
User

   │

   ▼

Popup

   │

   ▼

Background Worker

   │

   ▼

Browser Context Service

   │

   ▼

REST API

   │

   ▼

AI Controller

   │

   ▼

AI Service

   │

   ▼

Prompt Builder

   │

   ▼

Provider Factory

   │

   ▼

Selected AI Provider

   │

   ▼

Large Language Model

   │

   ▼

Streaming Response

   │

   ▼

Popup UI
```

Notice that browser context is collected before the request reaches the backend.

---

# AI Controller

The controller is the entry point of every request.

Responsibilities:

- Receive HTTP request
- Validate request body
- Extract browser context
- Extract prompt
- Call AI Service
- Return JSON response

The controller should never contain business logic.

Think of it as the receptionist of the application.

---

# AI Service

The AI Service contains the application's core business logic.

Responsibilities:

- Process browser context
- Select AI model
- Call Prompt Service
- Select AI provider
- Handle fallback providers
- Execute AI request
- Handle streaming

Everything related to AI belongs here.

---

# Prompt Service

The Prompt Service is responsible for transforming raw data into high-quality prompts.

Instead of sending:

```text
Explain this.
```

It builds:

```text
Current Page

React – useEffect

Current URL

https://react.dev/reference/react/useEffect

Selected Text

useEffect(() => {
    fetchData();
}, []);

User Prompt

Explain this.
```

Prompt Engineering is isolated inside this service so it can evolve independently.

---

# Provider Factory

One of the strengths of Zeba AI is that it supports multiple AI providers.

```
Prompt

        │

        ▼

Provider Factory

        │

 ┌──────┴─────────┐

 ▼                ▼

Ollama        OpenAI

        │

        ▼

Gemini
```

The rest of the application doesn't care which provider is used.

Changing providers requires only updating the configuration.

---

# Browser Context Injection

Browser context becomes another source of information.

Instead of sending:

```
Prompt
```

we send:

```
Prompt

+

Browser Context
```

Later milestones will inject additional sources.

---

# Future Context Sources

The architecture has been intentionally designed to support multiple context sources.

```
Prompt

+

Browser Context

+

Conversation Memory

+

Retrieved Documents

+

Workspace Files

+

Git Repository

+

Terminal Output

+

MCP Tools

+

Code Index

↓

LLM
```

This layered approach is how enterprise AI assistants achieve much higher response quality.

---

# Browser Context Object

The browser sends structured information.

Example:

```json
{
    "url": "https://react.dev/reference/react/useEffect",
    "title": "React – useEffect",
    "hostname": "react.dev",
    "protocol": "https",
    "language": "en-US",
    "selectedText": "useEffect(() => { fetchData(); }, []);",
    "timestamp": "2026-08-01T12:30:00Z"
}
```

The backend never works with random strings.

Everything is strongly typed.

---

# Context Injection Pipeline

```
Browser Context

        │

        ▼

Validation

        │

        ▼

Prompt Formatting

        │

        ▼

Prompt Injection

        │

        ▼

Provider Selection

        │

        ▼

AI Request
```

Each step has a dedicated responsibility.

---

# Separation of Concerns

A common mistake is placing everything inside one file.

Instead, Zeba AI follows a layered architecture.

```
Controller

↓

Service

↓

Prompt Builder

↓

Provider

↓

LLM
```

Each layer knows only what it needs to know.

---

# Why This Architecture Scales

Suppose tomorrow we add:

- Azure OpenAI
- Anthropic Claude
- DeepSeek
- Groq
- Mistral

No changes are required inside:

- Popup
- Background Worker
- AI Controller

Only the Provider Factory grows.

Similarly, if we add:

- RAG
- Vector Database
- MCP
- File System Tools

Only the AI Service evolves.

This is why enterprise software emphasizes loose coupling and modular design.

---

# Error Handling Strategy

Each layer handles only the errors it owns.

```
Popup

↓

Display Error

-----------------

Background

↓

Runtime Error

-----------------

Controller

↓

HTTP Error

-----------------

Service

↓

Business Logic Error

-----------------

Provider

↓

API Error
```

This layered error handling improves debugging and maintainability.

---

# Logging Strategy

Useful log points include:

```text
Request Received

↓

Browser Context Collected

↓

Prompt Built

↓

Provider Selected

↓

Model Selected

↓

Request Sent

↓

Streaming Started

↓

Streaming Completed
```

Avoid logging sensitive user information in production environments.

---

# Architecture Benefits

This design provides:

- Clear separation of responsibilities
- Easy provider replacement
- Better testing
- Easier debugging
- Enterprise scalability
- Maintainable codebase
- Future-ready architecture

---

# Preparing for RAG

Later, browser context will become only one piece of the final prompt.

```
Prompt

+

Browser Context

+

Conversation Memory

+

Retrieved Documents

+

Workspace Files

↓

Prompt Builder

↓

LLM
```

Nothing in the architecture needs to change.

We simply inject more context.

---

# Preparing for MCP

The same architecture will later support:

```
Prompt

+

Browser Context

+

Workspace

+

Git Repository

+

Terminal

+

Filesystem

+

Tool Outputs

↓

LLM
```

This is exactly how modern AI coding assistants operate.

---

# Best Practices

Throughout the implementation, follow these guidelines:

- Keep controllers lightweight
- Place business logic in services
- Use strong TypeScript types
- Avoid hardcoding prompt templates
- Keep providers interchangeable
- Validate all incoming requests
- Log important events
- Handle failures gracefully
- Design for future scalability

---

# Chapter Summary

In this chapter, we explored the overall backend architecture that powers Zeba AI's context-aware capabilities.

We learned how browser context flows from the Chrome Extension into the Express backend, how responsibilities are divided across controllers, services, prompt builders, and providers, and why this layered architecture is essential for building scalable, maintainable AI applications.

This architecture also lays the foundation for upcoming milestones, including Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), workspace awareness, and autonomous AI agents.

---

# Deliverables

By the end of this chapter, you have:

- ✅ Understood the backend architecture
- ✅ Learned the request lifecycle
- ✅ Explored service-oriented design
- ✅ Understood context injection
- ✅ Learned provider abstraction
- ✅ Prepared the backend for RAG
- ✅ Prepared the backend for MCP
- ✅ Designed an enterprise-ready AI pipeline

---

# 📌 Next Chapter

In the next chapter, we will implement the **Browser Context Type System** by creating a strongly typed `browserContext.types.ts` model.

You will learn how to:

- Design reusable TypeScript interfaces
- Model browser metadata
- Validate browser context
- Share types across services
- Improve type safety throughout the backend

This type system will become the foundation for prompt generation, context injection, Retrieval-Augmented Generation (RAG), and future enterprise AI capabilities.

├── 09.2-browserContext.types.md

# 📄 09.2 — BrowserContext Types

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

In the previous chapter, we designed the overall backend architecture for handling browser context.

Before we begin injecting browser context into AI prompts, we need a standardized way to represent that information throughout the application.

This is where **TypeScript interfaces** become extremely important.

Rather than passing loosely structured JavaScript objects throughout the application, we define a strongly typed **BrowserContext** model that is shared across controllers, services, providers, and prompt builders.

This chapter focuses entirely on designing a production-ready type system for browser context.

---

# Learning Objectives

By the end of this chapter, you will be able to:

- Understand why TypeScript interfaces matter
- Design reusable data models
- Create a strongly typed Browser Context object
- Improve IDE IntelliSense
- Reduce runtime errors
- Share types across the backend
- Prepare the project for RAG and MCP

---

# Why Strong Typing Matters

Imagine sending browser context as a plain JavaScript object.

```ts
const context = {

    page: "...",

    url: "...",

    something: "...",

    data: "..."

};
```

There is no guarantee that another developer—or even you in the future—will remember what each property means.

Even worse, property names may change accidentally.

```ts
context.pageTitle

context.title

context.currentTitle

context.page
```

All four might refer to the same value.

This leads to bugs that are difficult to detect.

---

With TypeScript interfaces, we define the structure once.

```ts
interface BrowserContext {

    url: string;

    title: string;

    hostname: string;

    protocol: string;

    language: string;

}
```

Now every part of the application follows the same contract.

---

# Browser Context Lifecycle

```
Chrome Extension

        │

        ▼

Background Worker

        │

        ▼

Browser Context

        │

        ▼

Express API

        │

        ▼

BrowserContext Interface

        │

        ▼

AI Service

        │

        ▼

Prompt Service

        │

        ▼

LLM
```

Notice how the same object flows through every layer.

---

# Backend Folder Structure

Create a new folder.

```text
backend/

src/

types/

    browserContext.types.ts
```

Keeping all shared interfaces in a dedicated `types` folder makes them reusable throughout the project.

---

# Complete Implementation

## browserContext.types.ts

```ts
/**
 * ==========================================
 * Browser Context Interface
 * ==========================================
 *
 * Represents metadata collected from
 * the active browser tab.
 */

export interface BrowserContext {

    /**
     * Current page URL
     */
    url: string;

    /**
     * Current page title
     */
    title: string;

    /**
     * Hostname
     *
     * Example:
     * react.dev
     */
    hostname: string;

    /**
     * Protocol
     *
     * Example:
     * https
     */
    protocol: string;

    /**
     * Browser language
     *
     * Example:
     * en-US
     */
    language: string;

    /**
     * Selected text on the page
     */
    selectedText?: string;

    /**
     * Chrome Tab ID
     */
    tabId?: number;

    /**
     * Chrome Window ID
     */
    windowId?: number;

    /**
     * ISO Timestamp
     */
    timestamp: string;

}
```

---

# Understanding Each Property

## url

```ts
url: string;
```

Stores the complete URL.

Example

```
https://react.dev/reference/react/useEffect
```

The AI can determine:

- Documentation site
- Repository
- StackOverflow
- Blog
- API Reference

without needing additional context.

---

## title

```ts
title: string;
```

Stores the page title.

Example

```
React – useEffect
```

The title often summarizes the page more effectively than the URL.

---

## hostname

```ts
hostname: string;
```

Example

```
react.dev
```

Useful for:

- Source identification
- Website categorization
- RAG filtering
- Prompt engineering

---

## protocol

```ts
protocol: string;
```

Example

```
https
```

Although simple, this field becomes useful when:

- validating URLs
- analytics
- browser diagnostics

---

## language

```ts
language: string;
```

Example

```
en-US
```

Future use cases:

- multilingual prompts
- automatic translation
- localized AI responses

---

## selectedText

```ts
selectedText?: string;
```

This is the most valuable property.

Example

```tsx
useEffect(() => {

    fetchData();

}, []);
```

Instead of asking

```
Explain React Hooks.
```

the user simply highlights the code and asks

```
Explain this.
```

The AI already knows what "this" refers to.

Notice the `?`.

The property is optional because the user may not select anything.

---

## tabId

```ts
tabId?: number;
```

Example

```
812
```

Useful later for:

- refreshing context
- DOM extraction
- Content Script communication

---

## windowId

```ts
windowId?: number;
```

Allows the extension to distinguish multiple Chrome windows.

Useful for:

- multi-window support
- workspace management

---

## timestamp

```ts
timestamp: string;
```

Example

```
2026-08-01T12:10:25.122Z
```

Useful for:

- analytics
- logging
- conversation history
- debugging

---

# Example Browser Context Object

```ts
const browserContext: BrowserContext = {

    url:

        "https://react.dev/reference/react/useEffect",

    title:

        "React – useEffect",

    hostname:

        "react.dev",

    protocol:

        "https",

    language:

        "en-US",

    selectedText:

`useEffect(() => {

    fetchData();

}, []);`,

    tabId:

        103,

    windowId:

        1,

    timestamp:

        new Date().toISOString()

};
```

This object is passed throughout the application.

---

# Where This Interface Is Used

```
BrowserContext

        │

        ▼

Background Worker

        │

        ▼

API Request

        │

        ▼

AI Controller

        │

        ▼

AI Service

        │

        ▼

Prompt Service

        │

        ▼

Future RAG

        │

        ▼

Future MCP
```

One interface powers the entire AI pipeline.

---

# Importing the Interface

Anywhere browser context is required.

```ts
import type {

    BrowserContext

} from "../types/browserContext.types";
```

Using `import type` ensures that only the type information is imported, reducing the generated JavaScript bundle.

---

# Using the Interface

Example

```ts
async function processContext(

    context: BrowserContext

) {

    console.log(

        context.url

    );

}
```

TypeScript now provides:

- IntelliSense
- autocomplete
- compile-time checking

---

# Benefits of Strong Typing

Without interfaces

```
context.page

context.pageTitle

context.title

context.name
```

All might exist.

Nobody knows.

---

With interfaces

```
BrowserContext

↓

url

title

hostname

protocol

language

selectedText

tabId

windowId

timestamp
```

Everything is standardized.

---

# Preparing for Future Milestones

The BrowserContext interface will continue to grow.

Future versions may include:

```ts
interface BrowserContext {

    ...

    html?: string;

    markdown?: string;

    dom?: string;

    codeBlocks?: string[];

    images?: string[];

    forms?: string[];

    tables?: string[];

}
```

No existing code needs to change.

Only the interface evolves.

---

# Preparing for RAG

Later we will combine:

```
Browser Context

+

Conversation Memory

+

Retrieved Documents

+

Workspace Files

↓

Prompt Builder
```

Because BrowserContext is already strongly typed, integration becomes straightforward.

---

# Preparing for MCP

Model Context Protocol (MCP) will extend this object further.

```ts
interface BrowserContext {

    ...

    workspaceId?: string;

    activeFile?: string;

    gitBranch?: string;

    terminalOutput?: string;

}
```

The architecture is designed to support these additions without breaking existing functionality.

---

# Best Practices

When designing TypeScript models:

- Keep interfaces small and focused
- Use optional fields only when necessary
- Prefer descriptive property names
- Group shared interfaces under a dedicated `types` folder
- Use `import type` for type-only imports
- Avoid using `any`
- Keep interfaces reusable across services

---

# Common Mistakes

### Using `any`

```ts
context: any
```

Avoid this.

You lose all type safety.

---

### Inconsistent Property Names

Avoid

```ts
page

pageTitle

title

currentTitle
```

Choose one.

Our standard is:

```ts
title
```

---

### Mixing Business Logic

Interfaces should only describe data.

Never place functions inside them unless necessary.

Incorrect

```ts
interface BrowserContext {

    url: string;

    getHostname(): string;

}
```

Interfaces should remain simple data contracts.

---

# Chapter Summary

In this chapter, we designed a production-ready `BrowserContext` interface that standardizes how browser metadata is represented throughout Zeba AI.

By using strong TypeScript typing, we improve maintainability, readability, and scalability while laying the foundation for advanced capabilities such as Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), workspace awareness, and autonomous AI agents.

This interface becomes the backbone of every context-aware AI request moving forward.

---

# Deliverables

By the end of this chapter, you have successfully implemented:

- ✅ `browserContext.types.ts`
- ✅ Strongly typed Browser Context model
- ✅ Reusable TypeScript interface
- ✅ Optional property handling
- ✅ Type-safe backend architecture
- ✅ Shared data contract
- ✅ Foundation for Prompt Injection
- ✅ Foundation for RAG
- ✅ Foundation for MCP

---

# 📌 Next Chapter

In the next chapter, we will update the **Chrome Extension API Service** (`api.service.ts`) so it can transmit the complete `BrowserContext` object to the backend along with the user's prompt.

You will learn how to:

- Update API request payloads
- Extend TypeScript function signatures
- Send structured browser context
- Improve request validation
- Prepare the backend for intelligent context injection

By the end of the next chapter, every AI request will include rich browser context, enabling Zeba AI to generate more accurate, relevant, and context-aware responses.


├── 09.3-api.service.md

# 📄 09.3 — API Service Integration

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

In the previous chapter, we created a strongly typed **BrowserContext** interface that standardizes browser metadata throughout the application.

Now it's time to use it.

This chapter updates the Chrome Extension's **API Service** so that every AI request includes not only the user's prompt, but also the collected browser context.

Instead of sending:

```text
Explain this.
```

Zeba AI will now send:

```text
Prompt

+

Current URL

+

Page Title

+

Selected Text

+

Browser Metadata
```

This small architectural change dramatically improves the quality of AI responses and lays the foundation for future capabilities such as Retrieval-Augmented Generation (RAG), workspace awareness, and Model Context Protocol (MCP).

---

# Learning Objectives

By the end of this chapter, you will be able to:

- Understand the API Service's role
- Extend API request payloads
- Pass browser context to the backend
- Use TypeScript interfaces across frontend and backend
- Support both standard and streaming AI requests
- Improve request scalability
- Prepare for future RAG integration

---

# Why Update the API Service?

Previously, every request looked like this:

```
Popup

    │

    ▼

API Service

    │

    ▼

POST /chat

{

    prompt,

    model

}
```

The backend knew nothing about the user's browser.

---

Now the request becomes:

```
Popup

    │

    ▼

API Service

    │

    ▼

POST /chat

{

    prompt,

    model,

    browserContext

}
```

The AI can now understand:

- Which webpage is open
- What documentation is being viewed
- Which code is selected
- The browser language
- The current hostname

---

# Request Flow

```
Popup

      │

      ▼

Browser Context Service

      │

      ▼

Browser Context Object

      │

      ▼

API Service

      │

      ▼

Express Backend

      │

      ▼

AI Service

      │

      ▼

Prompt Builder

      │

      ▼

LLM
```

---

# Project Structure

```
extension/

src/

services/

├── api.service.ts
└── browserContext.service.ts

types/

└── browser.types.ts
```

---

# Existing API Service

Previously our request only contained:

```ts
body: JSON.stringify({

    prompt,

    model

});
```

This was sufficient for a chatbot.

It is **not** sufficient for a context-aware assistant.

---

# Updated Function Signature

We extend the API functions by adding a new parameter.

```ts
import type {

    BrowserContext

} from "../types/browser.types";
```

---

## chatWithAI()

Old signature

```ts
chatWithAI(

    prompt,

    model

)
```

New signature

```ts
chatWithAI(

    prompt,

    model,

    browserContext

)
```

---

# Complete Production Implementation

## api.service.ts

```ts
import type {

    BrowserContext

} from "../types/browser.types";

const API_URL =

    "http://localhost:3000/api/v1/ai";

/**
 * ==========================================
 * Standard Chat API
 * ==========================================
 */

export async function chatWithAI(

    prompt: string,

    model: string,

    browserContext: BrowserContext

) {

    try {

        console.log("========== CHAT ==========");

        console.log("Prompt:", prompt);

        console.log("Model:", model);

        console.log("Browser Context:", browserContext);

        const response = await fetch(

            `${API_URL}/chat`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    prompt,

                    model,

                    browserContext

                })

            }

        );

        if (!response.ok) {

            throw new Error(

                "Backend request failed"

            );

        }

        return await response.json();

    }

    catch (error) {

        console.error(

            "Chat API Error:",

            error

        );

        return {

            success: false,

            response:

                "Unable to connect to backend."

        };

    }

}
```

---

# Updating Streaming Requests

Streaming requests must also include browser context.

---

## Updated Function Signature

```ts
streamChat(

    prompt,

    model,

    browserContext,

    onToken

)
```

---

# Complete Streaming Implementation

```ts
export async function streamChat(

    prompt: string,

    model: string,

    browserContext: BrowserContext,

    onToken: (token: string) => void

) {

    console.log("========== STREAM ==========");

    console.log(browserContext);

    const response = await fetch(

        `${API_URL}/chat/stream`,

        {

            method: "POST",

            headers: {

                "Content-Type":

                    "application/json"

            },

            body: JSON.stringify({

                prompt,

                model,

                browserContext

            })

        }

    );

    if (!response.ok) {

        throw new Error(

            "Streaming request failed"

        );

    }

    if (!response.body) {

        throw new Error(

            "ReadableStream missing"

        );

    }

    const reader =

        response.body.getReader();

    const decoder =

        new TextDecoder();

    while (true) {

        const {

            done,

            value

        } = await reader.read();

        if (done)

            break;

        const chunk = decoder.decode(

            value,

            {

                stream: true

            }

        );

        const lines =

            chunk

            .split("\n")

            .filter(

                line => line.trim() !== ""

            );

        for (const line of lines) {

            try {

                const json =

                    JSON.parse(line);

                if (

                    json.message?.content

                ) {

                    onToken(

                        json.message.content

                    );

                }

            }

            catch {

                // Ignore malformed chunks

            }

        }

    }

}
```

---

# Request Payload

The extension now sends:

```json
{

    "prompt":

        "Explain this.",

    "model":

        "llama3.2:3b",

    "browserContext": {

        "url":

        "https://react.dev/reference/react/useEffect",

        "title":

        "React – useEffect",

        "hostname":

        "react.dev",

        "protocol":

        "https",

        "language":

        "en-US",

        "selectedText":

        "useEffect(() => { fetchData(); }, []);",

        "timestamp":

        "2026-08-01T12:00:00Z"

    }

}
```

---

# Data Flow

```
Prompt

+

Browser Context

        │

        ▼

API Service

        │

        ▼

JSON Request

        │

        ▼

Express Backend
```

---

# Why Send the Entire Object?

A common mistake is sending individual fields.

Example:

```ts
body: JSON.stringify({

    prompt,

    url,

    title,

    hostname,

    protocol,

    language,

    selectedText

});
```

This quickly becomes difficult to maintain.

Instead:

```ts
body: JSON.stringify({

    prompt,

    model,

    browserContext

});
```

Advantages:

- Cleaner code
- Easier to extend
- Easier to debug
- Future-proof

---

# Logging

Useful debug logs:

```ts
console.log(

    "Browser Context:",

    browserContext

);
```

Example output:

```text
Browser Context:

{

    url:

    "https://react.dev/reference/react/useEffect",

    title:

    "React – useEffect",

    hostname:

    "react.dev",

    selectedText:

    "useEffect(() => {...})"

}
```

---

# Error Handling

The API Service should gracefully handle failures.

Examples:

- Backend offline
- Invalid JSON
- Timeout
- Network unavailable
- Streaming interrupted

Always return a user-friendly response instead of crashing the extension.

---

# Best Practices

✔ Pass a single context object instead of multiple parameters.

✔ Keep API functions focused on communication only.

✔ Do not build prompts inside the API layer.

✔ Keep browser context immutable after collection.

✔ Reuse shared TypeScript interfaces.

✔ Log requests during development only.

✔ Validate backend responses.

---

# Preparing for Future Features

The `browserContext` object can grow without changing the API design.

Future request:

```json
{

    "prompt": "...",

    "browserContext": {

        "...": "...",

        "dom": "...",

        "markdown": "...",

        "codeBlocks": [],

        "workspace": {},

        "retrievedDocuments": [],

        "gitContext": {}

    }

}
```

No changes are required to `api.service.ts`.

---

# Chapter Summary

In this chapter, we upgraded the Chrome Extension's API Service to support context-aware AI requests.

Instead of sending only the user's prompt, the extension now transmits a complete `BrowserContext` object containing browser metadata and selected content. This greatly improves the AI's understanding of the user's intent while keeping the communication layer clean, modular, and scalable.

This design also prepares Zeba AI for future enhancements such as DOM extraction, RAG, workspace awareness, and MCP without requiring major architectural changes.

---

# Deliverables

By the end of this chapter, you have implemented:

- ✅ Updated `chatWithAI()`
- ✅ Updated `streamChat()`
- ✅ BrowserContext request payload
- ✅ Shared TypeScript interface usage
- ✅ Streaming support with browser context
- ✅ Improved request architecture
- ✅ Foundation for Prompt Injection
- ✅ Future-ready API communication layer

---

# 📌 Next Chapter

In the next chapter, we will update the **AI Controller** (`ai.controller.ts`) to receive the `browserContext` object from the API request, validate it, and forward it to the AI Service.

You will learn how to:

- Parse browser context from incoming requests
- Validate request payloads
- Keep controllers lightweight
- Forward context to the service layer
- Prepare the backend for prompt and context injection

By the end of the next chapter, the backend will be capable of accepting complete context-aware AI requests from the Chrome Extension.


├── 09.4-ai.controller.md

# 📄 09.4 — AI Controller Integration

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

In the previous chapter, we updated the Chrome Extension's `api.service.ts` to send the complete **Browser Context** object to the backend along with the user's prompt.

The next step is to receive this information inside the Express backend.

This chapter focuses on updating the **AI Controller** so it can:

- Receive browser context from the request
- Validate incoming data
- Forward browser context to the AI Service
- Keep business logic outside the controller
- Prepare the backend for Prompt Injection

The controller acts as the entry point of every AI request.

---

# Learning Objectives

By the end of this chapter you will be able to:

- Understand Controller responsibilities
- Receive Browser Context from the frontend
- Validate incoming requests
- Keep controllers lightweight
- Forward requests to the Service Layer
- Support streaming responses
- Build enterprise-grade Express controllers

---

# Request Flow

```
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

        ▼

Prompt Service

        │

        ▼

Provider Factory

        │

        ▼

LLM
```

---

# Controller Responsibilities

A controller should only perform four tasks.

```
Receive Request

        │

        ▼

Validate Request

        │

        ▼

Call Service

        │

        ▼

Return Response
```

Notice that:

✔ No AI logic

✔ No Prompt Engineering

✔ No Provider Selection

✔ No Model Selection

All business logic belongs inside the Service Layer.

---

# Updated Request

The frontend now sends

```json
{

    "prompt":"Explain this",

    "model":"llama3.2:3b",

    "browserContext":{

        "url":"https://react.dev",

        "title":"React",

        "hostname":"react.dev",

        "protocol":"https",

        "language":"en-US",

        "selectedText":"useEffect(...)"

    }

}
```

The controller must extract all three values.

---

# Folder Structure

```
backend/

src/

controllers/

    ai.controller.ts
```

---

# Import Required Types

```ts
import { Request, Response } from "express";

import aiService from "../services/ai.service";

import type {

    BrowserContext

} from "../types/browserContext.types";
```

---

# Complete Production Implementation

## ai.controller.ts

```ts
import {

    Request,

    Response

} from "express";

import aiService from "../services/ai.service";

import type {

    BrowserContext

} from "../types/browserContext.types";

class AIController {

    /**
     * =========================================
     * Standard Chat API
     * =========================================
     */
    async chat(

        req: Request,

        res: Response

    ) {

        try {

            const {

                prompt,

                model,

                browserContext

            }: {

                prompt: string;

                model: string;

                browserContext: BrowserContext;

            } = req.body;

            if (!prompt) {

                return res.status(400).json({

                    success: false,

                    message: "Prompt is required."

                });

            }

            console.log("========== CHAT ==========");

            console.log("Prompt:", prompt);

            console.log("Model:", model);

            console.log(

                "Browser Context:",

                browserContext

            );

            const response =

                await aiService.chat(

                    prompt,

                    browserContext,

                    model

                );

            return res.json({

                success: true,

                response

            });

        }

        catch (error) {

            console.error(

                "AI Controller Error:",

                error

            );

            return res.status(500).json({

                success: false,

                message: "Internal Server Error"

            });

        }

    }

    /**
     * =========================================
     * Streaming Chat API
     * =========================================
     */
    async streamChat(

        req: Request,

        res: Response

    ) {

        try {

            const {

                prompt,

                model,

                browserContext

            }: {

                prompt: string;

                model: string;

                browserContext: BrowserContext;

            } = req.body;

            if (!prompt) {

                return res.status(400).end();

            }

            res.setHeader(

                "Content-Type",

                "application/json"

            );

            res.setHeader(

                "Transfer-Encoding",

                "chunked"

            );

            await aiService.streamChat(

                prompt,

                browserContext,

                model,

                (token: string) => {

                    res.write(

                        JSON.stringify({

                            message: {

                                content: token

                            }

                        }) + "\n"

                    );

                }

            );

            res.end();

        }

        catch (error) {

            console.error(error);

            res.status(500).end();

        }

    }

}

export default new AIController();
```

---

# Request Parsing

The controller extracts the request body.

```ts
const {

    prompt,

    model,

    browserContext

} = req.body;
```

This keeps the request handling simple and readable.

---

# Browser Context

The browser context is now available throughout the backend.

```ts
console.log(browserContext);
```

Example

```text
{

    url:

    "https://react.dev/reference/react/useEffect",

    title:

    "React – useEffect",

    hostname:

    "react.dev",

    protocol:

    "https",

    language:

    "en-US",

    selectedText:

    "useEffect(() => {...})"

}
```

---

# Input Validation

Controllers should always validate required fields.

```ts
if (!prompt) {

    return res.status(400).json({

        success:false,

        message:"Prompt is required."

    });

}
```

Future validation may include:

- browserContext

- selectedText

- URL format

- model existence

---

# Calling AI Service

Notice how the controller simply forwards data.

```ts
const response =

    await aiService.chat(

        prompt,

        browserContext,

        model

    );
```

The controller does **not** build prompts.

The controller does **not** select providers.

The controller does **not** call Ollama directly.

Everything belongs inside AI Service.

---

# Streaming Controller

Streaming requests follow the same pattern.

```
Receive Request

↓

Extract Context

↓

Call AI Service

↓

Write Tokens

↓

End Response
```

---

# Streaming Response

Every token is forwarded immediately.

```ts
res.write(

    JSON.stringify({

        message:{

            content:token

        }

    }) + "\n"

);
```

This allows the frontend to display text in real time.

---

# Controller Architecture

```
HTTP Request

        │

        ▼

Controller

        │

        ▼

Validation

        │

        ▼

AI Service

        │

        ▼

Prompt Builder

        │

        ▼

Provider

        │

        ▼

LLM
```

---

# Why Controllers Stay Thin

A common mistake is writing AI logic inside controllers.

Avoid:

```ts
controller

↓

Prompt Building

↓

Provider Selection

↓

Ollama

↓

Response
```

Instead

```text
Controller

↓

Service

↓

Prompt Builder

↓

Provider
```

Each layer has one responsibility.

---

# Logging

Useful development logs

```ts
console.log(

    "Prompt:",

    prompt

);

console.log(

    "Browser Context:",

    browserContext

);

console.log(

    "Model:",

    model

);
```

Avoid logging sensitive information in production.

---

# Error Handling

Controllers should catch unexpected failures.

```ts
catch(error){

    console.error(error);

    return res.status(500).json({

        success:false,

        message:

        "Internal Server Error"

    });

}
```

Never expose stack traces to users.

---

# Best Practices

✔ Keep controllers small

✔ Validate inputs

✔ Forward data to services

✔ Return consistent responses

✔ Avoid business logic

✔ Handle errors centrally

✔ Log requests during development

✔ Use TypeScript types

---

# Common Mistakes

### Putting Prompt Engineering Here

Incorrect

```ts
const prompt =

"React Docs..." + prompt;
```

Prompt engineering belongs in `prompt.service.ts`.

---

### Calling Providers Directly

Incorrect

```ts
ollama.chat(...)
```

Always call

```ts
aiService.chat(...)
```

---

### Mixing Validation and Business Logic

Controllers validate requests.

Services perform business operations.

Keep them separate.

---

# Preparing for Future Features

Soon the controller will also receive

```json
{

    "browserContext":{},

    "conversationMemory":[],

    "retrievedDocuments":[],

    "workspaceContext":{},

    "toolResults":[]

}
```

The controller will continue forwarding data without modification.

---

# Chapter Summary

In this chapter, we updated the AI Controller to receive browser context from the Chrome Extension, validate incoming requests, and forward the data to the AI Service.

By keeping the controller lightweight and free of business logic, we created a scalable architecture that is easy to maintain and extend.

This controller now acts as the gateway between the frontend and the backend, enabling future features such as Prompt Injection, Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), and workspace-aware AI.

---

# Deliverables

By the end of this chapter you have implemented:

- ✅ Updated `ai.controller.ts`
- ✅ Browser Context request parsing
- ✅ Type-safe request handling
- ✅ Request validation
- ✅ AI Service integration
- ✅ Streaming controller
- ✅ Proper error handling
- ✅ Enterprise controller architecture

---

# 📌 Next Chapter

In the next chapter, we will update **`ai.service.ts`** to perform **Context Injection**.

Instead of forwarding only the user's prompt, the AI Service will combine:

- User Prompt
- Browser Context
- Selected Text
- Page Title
- Current URL

into a single structured prompt before sending it to the Prompt Service.

This is where Zeba AI truly becomes a **context-aware AI assistant**.

├── 09.5-ai.service.md

# 📄 09.5 — AI Service (Context Injection)

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

In the previous chapter, the **AI Controller** successfully received the browser context from the Chrome Extension and forwarded it to the Service Layer.

Now we arrive at one of the most important components in the entire Context-Aware AI architecture—the **AI Service**.

The AI Service is responsible for orchestrating the complete AI request lifecycle. It acts as the central coordinator between the Controller, Prompt Builder, AI Provider, and the browser context collected by the Chrome Extension.

This chapter transforms Zeba AI from a simple chatbot into a true context-aware AI assistant by injecting browser information into every prompt before it reaches the Large Language Model (LLM).

This is the same architectural principle used by professional AI assistants such as:

- GitHub Copilot Chat
- Cursor AI
- Claude Code
- Windsurf
- Continue.dev

---

# Learning Objectives

By the end of this chapter, you will be able to:

- Understand the responsibilities of the AI Service
- Inject browser context into prompts
- Separate orchestration from prompt engineering
- Support multiple AI providers
- Handle fallback providers
- Support streaming AI responses
- Build a scalable AI orchestration layer

---

# AI Service Responsibilities

The AI Service is responsible for coordinating the complete AI pipeline.

```
Controller

      │

      ▼

AI Service

      │

      ▼

Prompt Builder

      │

      ▼

Provider Factory

      │

      ▼

Selected Provider

      │

      ▼

LLM
```

Unlike the Controller, the AI Service contains business logic.

---

# Responsibilities

The AI Service performs the following tasks:

- Accept user prompt
- Receive browser context
- Build AI context
- Generate final prompt
- Select AI model
- Select AI provider
- Call provider
- Return response
- Support streaming
- Handle fallback providers

---

# Updated Request Flow

```
Chrome Extension

      │

      ▼

Background Worker

      │

      ▼

Express Controller

      │

      ▼

AI Service

      │

      ▼

Prompt Builder

      │

      ▼

Provider Factory

      │

      ▼

Ollama / OpenAI / Gemini

      │

      ▼

LLM Response
```

---

# Folder Structure

```
backend/

src/

services/

    ai.service.ts
```

---

# Complete Production Code

## ai.service.ts

```ts
import promptService from "./prompt.service";

import aiRouter from "./ai-router.service";

import { AI_CONFIG } from "../config/ai.config";

import {

    ProviderFactory

} from "../providers/provider.factory";

import type {

    BrowserContext

} from "../types/browserContext.types";

class AIService {

    /**
     * ======================================
     * Standard Chat
     * ======================================
     */
    async chat(

        prompt: string,

        browserContext: BrowserContext,

        model?: string

    ) {

        console.log("========== AI SERVICE ==========");

        console.log("Prompt:", prompt);

        console.log("Browser Context:");

        console.log(browserContext);

        /**
         * Build final AI prompt
         */
        const finalPrompt =

            promptService.buildPrompt(

                prompt,

                browserContext

            );

        /**
         * Select model
         */
        const route =

            aiRouter.selectModel(

                model ?? prompt

            );

        console.log(

            "Selected Model:",

            route.model

        );

        try {

            const provider =

                ProviderFactory.create(

                    AI_CONFIG.provider

                );

            return await provider.chat(

                finalPrompt,

                route.model

            );

        }

        catch (error) {

            console.error(

                "Primary Provider Failed",

                error

            );

            if (

                AI_CONFIG.enableFallback

            ) {

                console.log(

                    "Switching to fallback provider..."

                );

                const fallback =

                    ProviderFactory.create(

                        AI_CONFIG.fallbackProvider

                    );

                return await fallback.chat(

                    finalPrompt,

                    route.model

                );

            }

            throw error;

        }

    }

    /**
     * ======================================
     * Streaming Chat
     * ======================================
     */
    async streamChat(

        prompt: string,

        browserContext: BrowserContext,

        model: string,

        onToken: (token: string) => void

    ) {

        const finalPrompt =

            promptService.buildPrompt(

                prompt,

                browserContext

            );

        const route =

            aiRouter.selectModel(

                model

            );

        const provider =

            ProviderFactory.create(

                AI_CONFIG.provider

            );

        return provider.streamChat(

            finalPrompt,

            route.model,

            onToken

        );

    }

}

export default new AIService();
```

---

# Step 1 — Receive Browser Context

The AI Service receives three inputs.

```ts
chat(

    prompt,

    browserContext,

    model

)
```

This keeps the Service Layer independent of Express.

---

# Step 2 — Build Prompt

This is the most important step.

```ts
const finalPrompt =

    promptService.buildPrompt(

        prompt,

        browserContext

    );
```

Instead of sending

```
Explain this.
```

we now send

```
Current URL

Current Page

Selected Text

Browser Language

Prompt
```

This dramatically improves AI quality.

---

# Prompt Injection Flow

```
Prompt

+

Browser Context

↓

Prompt Builder

↓

Final Prompt

↓

Provider
```

---

# Step 3 — Model Selection

We continue using the AI Router.

```ts
const route =

    aiRouter.selectModel(

        model ?? prompt

    );
```

The router can decide:

```
Llama

↓

CodeLlama

↓

DeepSeek

↓

OpenAI

↓

Gemini
```

depending on configuration.

---

# Step 4 — Provider Factory

Instead of calling Ollama directly

```ts
ollama.chat(...)
```

we use

```ts
ProviderFactory.create(...)
```

Benefits:

- provider abstraction
- multiple AI vendors
- future scalability

---

# Step 5 — Call Provider

```ts
provider.chat(

    finalPrompt,

    route.model

);
```

Notice that the provider never receives browser context.

It only receives the completed prompt.

This keeps providers simple.

---

# Step 6 — Streaming

Streaming follows the same architecture.

```
Browser Context

↓

Prompt Builder

↓

Provider

↓

Stream Tokens

↓

Popup
```

---

# Streaming Implementation

```ts
provider.streamChat(

    finalPrompt,

    route.model,

    onToken

);
```

The AI Service prepares the prompt once.

The provider streams tokens continuously.

---

# Fallback Provider

If Ollama is unavailable

```
Ollama

↓

Error

↓

OpenAI

↓

Success
```

Implementation

```ts
if (

    AI_CONFIG.enableFallback

) {

    const fallback =

        ProviderFactory.create(

            AI_CONFIG.fallbackProvider

        );

    return fallback.chat(

        finalPrompt,

        route.model

    );

}
```

---

# Logging

Useful during development

```ts
console.log(prompt);

console.log(browserContext);

console.log(finalPrompt);
```

Avoid logging prompts in production.

---

# Architecture

```
Controller

      │

      ▼

AI Service

      │

      ▼

Prompt Builder

      │

      ▼

Model Router

      │

      ▼

Provider Factory

      │

      ▼

Provider

      │

      ▼

LLM
```

---

# Separation of Responsibilities

## Controller

Responsible for

- HTTP
- Validation
- Response

---

## AI Service

Responsible for

- Context Injection
- Provider Selection
- Model Selection
- Streaming
- Business Logic

---

## Prompt Service

Responsible for

- Prompt Engineering
- Context Formatting

---

## Provider

Responsible for

- AI Communication

---

# Benefits

Using this architecture provides:

- Clean separation of concerns
- Easy testing
- Multiple AI providers
- Easy provider switching
- Future RAG support
- Future MCP support
- Workspace awareness
- Production scalability

---

# Future Expansion

Soon the AI Service will receive additional information.

```
Prompt

+

Browser Context

+

Conversation Memory

+

Retrieved Documents

+

Workspace Context

+

Git Context

+

Terminal Output

↓

Prompt Builder
```

No changes will be required in the Controller.

Only the AI Service orchestration evolves.

---

# Best Practices

✔ Keep AI logic inside the Service Layer

✔ Keep controllers lightweight

✔ Never call providers directly from controllers

✔ Build prompts using Prompt Service

✔ Keep providers unaware of browser context

✔ Log during development only

✔ Handle fallback providers gracefully

✔ Keep streaming logic consistent

---

# Common Mistakes

### Calling Provider Directly

```ts
ollama.chat(...)
```

Always use

```ts
ProviderFactory.create(...)
```

---

### Building Prompt Here

Avoid

```ts
const finalPrompt =

prompt +

browserContext.url;
```

Prompt construction belongs inside

```
prompt.service.ts
```

---

### Mixing HTTP Logic

Never use

```ts
req.body
```

inside the AI Service.

Controllers should extract request data.

---

# Chapter Summary

In this chapter, we transformed the AI Service into the central orchestration layer of Zeba AI.

The service now receives browser context, delegates prompt construction to the Prompt Service, selects the appropriate AI model and provider, supports streaming responses, and handles fallback providers.

By separating orchestration from prompt engineering and provider communication, we created a clean, extensible architecture that can easily support future enhancements such as Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), workspace awareness, and autonomous AI agents.

---

# Deliverables

By the end of this chapter you have implemented:

- ✅ Updated `ai.service.ts`
- ✅ Browser Context Injection
- ✅ Prompt Builder integration
- ✅ Provider Factory integration
- ✅ Model routing
- ✅ Streaming support
- ✅ Fallback provider support
- ✅ Production-ready AI orchestration layer

---

# 📌 Next Chapter

In the next chapter, we will implement **Prompt Injection** inside **`prompt.service.ts`**.

Instead of simply forwarding the user's message, the Prompt Service will intelligently combine:

- User Prompt
- Browser Context
- Current URL
- Page Title
- Hostname
- Selected Text
- Browser Metadata

into a structured prompt that enables the LLM to fully understand the user's current browsing context.

This is the final step that transforms Zeba AI into a true **Context-Aware AI Assistant**.


├── 09.6-prompt.service.md

# 📄 09.6 — Prompt Service (Context Injection)

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

In the previous chapter, we updated the **AI Service** to receive browser context and delegate prompt generation to the **Prompt Service**.

This chapter focuses on one of the most critical parts of the entire AI pipeline:

> **Prompt Engineering**

A Large Language Model is only as good as the prompt it receives.

If we send:

```
Explain this.
```

the AI has no idea what "this" means.

However, if we provide additional context such as the current webpage, selected text, and browser metadata, the model can generate significantly more accurate and relevant responses.

The Prompt Service is responsible for transforming raw user input and browser context into a structured prompt that the AI model can understand.

---

# Learning Objectives

By the end of this chapter, you will be able to:

- Understand Prompt Engineering
- Build structured prompts
- Inject browser context into prompts
- Separate prompt generation from business logic
- Design scalable prompt templates
- Prepare prompts for future RAG integration
- Build production-ready Prompt Services

---

# What is Prompt Engineering?

Prompt Engineering is the process of transforming user input into a structured instruction that an AI model can understand effectively.

Instead of sending:

```
Explain this.
```

we send:

```
You are an AI software engineering assistant.

Current Page:
React – useEffect

Current URL:
https://react.dev/reference/react/useEffect

Selected Code:
useEffect(() => {
    fetchData();
}, []);

User Question:
Explain this.
```

This gives the AI everything it needs.

---

# Prompt Builder Responsibilities

The Prompt Service should:

- Build structured prompts
- Format browser context
- Handle missing values
- Keep prompts readable
- Prepare future RAG context
- Keep prompt templates centralized

It should **NOT**:

- Call AI providers
- Access databases
- Read HTTP requests
- Select AI models

---

# Architecture

```
Controller

      │

      ▼

AI Service

      │

      ▼

Prompt Service

      │

      ▼

Final Prompt

      │

      ▼

Provider

      │

      ▼

LLM
```

---

# Folder Structure

```
backend/

src/

services/

    prompt.service.ts
```

---

# Browser Context

The Prompt Service receives:

```ts
interface BrowserContext {

    url: string;

    title: string;

    hostname: string;

    protocol: string;

    language: string;

    selectedText?: string;

    timestamp: string;

}
```

---

# Complete Production Implementation

## prompt.service.ts

```ts
import type {

    BrowserContext

} from "../types/browserContext.types";

class PromptService {

    /**
     * ==========================================
     * Build AI Prompt
     * ==========================================
     */
    buildPrompt(

        prompt: string,

        browserContext?: BrowserContext

    ): string {

        if (!browserContext) {

            return prompt;

        }

        return `

You are Zeba AI, an intelligent software engineering assistant.

==================================================
BROWSER CONTEXT
==================================================

Current Page:
${browserContext.title || "Unknown"}

Current URL:
${browserContext.url || "Unknown"}

Hostname:
${browserContext.hostname || "Unknown"}

Protocol:
${browserContext.protocol || "Unknown"}

Browser Language:
${browserContext.language || "Unknown"}

Selected Text:

${browserContext.selectedText || "No text selected."}

Timestamp:
${browserContext.timestamp}

==================================================
USER REQUEST
==================================================

${prompt}

==================================================
INSTRUCTIONS
==================================================

1. Use the browser context whenever relevant.
2. Prioritize explaining the selected text if available.
3. If no selected text exists, use the page title and URL.
4. Never invent browser information.
5. Respond as an experienced software engineer.
`;

    }

}

export default new PromptService();
```

---

# Prompt Flow

```
User Prompt

+

Browser Context

↓

Prompt Service

↓

Structured Prompt

↓

LLM
```

---

# Generated Prompt Example

Suppose the user asks:

```
Explain this.
```

Browser Context:

```json
{
  "title":"React – useEffect",
  "url":"https://react.dev/reference/react/useEffect",
  "hostname":"react.dev",
  "selectedText":"useEffect(() => { fetchData(); }, []);"
}
```

The Prompt Service generates:

```
You are Zeba AI.

Current Page:
React – useEffect

Current URL:
https://react.dev/reference/react/useEffect

Hostname:
react.dev

Selected Text:

useEffect(() => {
    fetchData();
}, []);

User Request:

Explain this.
```

The LLM now understands the complete context.

---

# Why This Works Better

Without context:

```
Explain this.
```

↓

AI guesses.

---

With context:

```
React Documentation

Selected Code

Current URL

Prompt
```

↓

AI understands the user's environment.

---

# Prompt Template Sections

Our prompt is divided into logical sections.

```
System Instructions

↓

Browser Context

↓

User Request

↓

Assistant Instructions
```

This improves readability and maintainability.

---

# Handling Missing Values

Users may not always select text.

Example:

```ts
${browserContext.selectedText || "No text selected."}
```

Instead of generating an empty prompt, we provide a meaningful default.

---

# Future RAG Integration

Later we will expand the prompt with retrieved documents.

```
Browser Context

+

Conversation Memory

+

Retrieved Documents

+

Workspace Context

↓

Prompt
```

Example:

```
Relevant Documents:

Document 1

Document 2

Document 3
```

No architectural changes will be required.

---

# Future Workspace Awareness

Prompt will eventually include:

```
Workspace

Current File

Git Branch

Recent Changes

Terminal Output

Browser Context

↓

Prompt
```

---

# Future MCP Integration

Model Context Protocol (MCP) will extend the prompt further.

```
Browser Context

+

Workspace

+

Tool Results

+

File Contents

↓

Prompt
```

---

# Best Practices

✔ Keep prompt generation in one place

✔ Separate prompt engineering from AI providers

✔ Use readable templates

✔ Handle missing values gracefully

✔ Avoid duplicated prompt logic

✔ Keep prompts deterministic

✔ Add new context sections incrementally

---

# Common Mistakes

## Building Prompts in AI Service

Incorrect:

```ts
const prompt =

browserContext.url +

userPrompt;
```

Prompt generation belongs in `prompt.service.ts`.

---

## Calling AI Providers

Incorrect:

```ts
ollama.chat(...)
```

The Prompt Service should only return a string.

---

## Ignoring Missing Context

Always provide defaults.

Example:

```ts
No text selected.
```

instead of

```
undefined
```

---

# Future Prompt Structure

By Milestone 5, the prompt may look like:

```
System Prompt

↓

Conversation Memory

↓

Browser Context

↓

Workspace Context

↓

Retrieved Documents

↓

Git Status

↓

Terminal Output

↓

Tool Results

↓

User Prompt
```

The Prompt Service will remain the single place where all of this is assembled.

---

# Prompt Lifecycle

```
Popup

↓

Background

↓

Backend

↓

AI Service

↓

Prompt Service

↓

Provider

↓

LLM
```

---

# Why Centralize Prompt Engineering?

Keeping all prompt construction in one service offers several advantages:

- Easier maintenance
- Consistent AI behavior
- Simpler testing
- Cleaner architecture
- Easy addition of new context sources
- Reusable prompt templates

This approach follows the Single Responsibility Principle and scales well as the project grows.

---

# Chapter Summary

In this chapter, we implemented the **Prompt Service**, the component responsible for transforming raw user input and browser context into a structured AI prompt.

Instead of sending only the user's question, the Prompt Service now combines browser metadata, page information, selected text, and user instructions into a single, well-organized prompt. This dramatically improves the AI's understanding of the user's environment and lays the groundwork for future enhancements such as Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), workspace awareness, and autonomous AI agents.

---

# Deliverables

By the end of this chapter, you have successfully implemented:

- ✅ `prompt.service.ts`
- ✅ Browser Context Injection
- ✅ Structured Prompt Templates
- ✅ Selected Text Integration
- ✅ URL & Page Title Injection
- ✅ Graceful Handling of Missing Context
- ✅ Centralized Prompt Engineering
- ✅ Foundation for RAG
- ✅ Foundation for MCP
- ✅ Production-ready Prompt Service

---

# 📌 Next Chapter

In the next chapter, we will integrate the complete **Context-Aware AI Pipeline** and verify the end-to-end flow.

We will learn how to:

- Test the full browser context pipeline
- Verify prompt injection
- Debug runtime messaging
- Inspect backend requests
- Validate AI responses
- Troubleshoot common integration issues

By the end of the next chapter, Zeba AI will successfully collect browser context, inject it into prompts, communicate with the backend, and generate intelligent, context-aware AI responses similar to modern coding assistants like Cursor AI, GitHub Copilot Chat, Claude Code, and Windsurf.


├── 09.7-Context-Injection.md

# 📄 09.7 — Context Injection

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

In the previous chapters, we successfully implemented each individual component required for a Context-Aware AI Assistant.

Our Chrome Extension can now:

- Detect the active browser tab
- Collect browser metadata
- Capture selected text
- Send browser context to the backend
- Receive browser context in the controller
- Pass context to the AI Service
- Build structured prompts using the Prompt Service

Now it's time to connect everything together.

This chapter focuses on **Context Injection**, the process of combining browser information with the user's request before sending it to the Large Language Model (LLM).

Context Injection is the core technology behind modern AI coding assistants such as:

- GitHub Copilot Chat
- Cursor AI
- Claude Code
- Windsurf
- Continue.dev

Without Context Injection, these assistants would simply behave like ordinary chatbots.

---

# Learning Objectives

By the end of this chapter, you will be able to:

- Understand Context Injection
- Build complete AI requests
- Combine browser context with user prompts
- Understand prompt augmentation
- Design scalable AI context pipelines
- Prepare for Retrieval-Augmented Generation (RAG)
- Prepare for Workspace Awareness
- Prepare for Model Context Protocol (MCP)

---

# What is Context Injection?

Context Injection is the process of enriching a user's prompt with additional information before sending it to the AI model.

Instead of asking:

```
Explain this.
```

the AI receives:

```
Current Page

Current URL

Selected Text

Browser Metadata

User Question
```

This additional information dramatically improves the model's understanding.

---

# Without Context Injection

```
User

↓

Explain this.
```

The AI has no idea:

- Which webpage?
- Which code?
- Which framework?
- Which documentation?

It must guess.

---

# With Context Injection

```
User

↓

Explain this.

+

React Documentation

+

Selected Code

+

Current URL

↓

LLM
```

The AI understands exactly what "this" refers to.

---

# Complete Pipeline

```
User

      │

      ▼

Popup

      │

      ▼

Browser Context Service

      │

      ▼

Background Worker

      │

      ▼

API Service

      │

      ▼

Express Controller

      │

      ▼

AI Service

      │

      ▼

Prompt Service

      │

      ▼

Context Injection

      │

      ▼

Provider

      │

      ▼

LLM
```

---

# Browser Context Collected

The extension now gathers:

```json
{

    "url":

    "https://react.dev/reference/react/useEffect",

    "title":

    "React – useEffect",

    "hostname":

    "react.dev",

    "protocol":

    "https",

    "language":

    "en-US",

    "selectedText":

    "useEffect(() => { fetchData(); }, []);",

    "timestamp":

    "2026-08-01T12:30:00Z"

}
```

This information becomes part of every AI request.

---

# Prompt Before Injection

```
Explain this.
```

---

# Prompt After Injection

```
You are Zeba AI.

Current Page:

React – useEffect

Current URL:

https://react.dev/reference/react/useEffect

Hostname:

react.dev

Browser Language:

en-US

Selected Text:

useEffect(() => {

    fetchData();

}, []);

User Request:

Explain this.
```

This prompt is significantly more informative and allows the LLM to generate accurate, context-aware responses.

---

# Context Injection Lifecycle

```
Prompt

↓

Collect Browser Context

↓

Build Context Object

↓

Prompt Builder

↓

Structured Prompt

↓

AI Provider

↓

LLM
```

Each stage adds meaningful information without modifying the user's original intent.

---

# Flow Diagram

```
Prompt

+

Browser Context

↓

Prompt Service

↓

Context Injection

↓

Formatted Prompt

↓

AI Provider

↓

LLM Response
```

---

# Example Scenario

### Browser

```
https://react.dev/reference/react/useEffect
```

### Selected Code

```ts
useEffect(() => {

    fetchData();

}, []);
```

### User Prompt

```
Explain this.
```

---

### Final Prompt

```
Current Page

React – useEffect

Current URL

https://react.dev/reference/react/useEffect

Selected Text

useEffect(() => {

    fetchData();

}, []);

User Request

Explain this.
```

The AI now knows:

- The programming language
- The framework
- The documentation page
- The selected code
- The user's question

---

# Why Context Injection Matters

Without context:

```
Explain this.
```

The AI may produce a generic explanation.

With context:

```
React Documentation

+

Selected Hook

+

User Prompt
```

The AI can explain the specific React Hook displayed on the page.

This greatly improves:

- Accuracy
- Relevance
- Developer productivity

---

# Current Context Sources

At this milestone, Zeba AI injects:

- User Prompt
- Current URL
- Page Title
- Hostname
- Browser Language
- Selected Text
- Timestamp

---

# Future Context Sources

The architecture is designed to grow without major changes.

Future context may include:

```
Conversation Memory

+

Workspace Context

+

Git Status

+

Terminal Output

+

Retrieved Documents

+

Open Files

+

Build Errors

+

Tool Results

+

Browser Context
```

All of these will be injected using the same pipeline.

---

# Context Injection vs Prompt Engineering

These concepts are closely related but serve different purposes.

## Prompt Engineering

Designs how instructions are written.

Example:

```
You are an experienced software engineer.
```

---

## Context Injection

Adds dynamic information.

Example:

```
Current URL

Selected Text

Workspace Files

Retrieved Documents
```

The Prompt Service combines both into the final prompt.

---

# Architecture Principles

Our implementation follows several software engineering principles:

### Separation of Concerns

- Browser Context Service collects browser data.
- AI Service orchestrates the request.
- Prompt Service formats the prompt.
- Provider communicates with the LLM.

---

### Single Responsibility Principle

Each layer has exactly one responsibility, making the system easier to test and maintain.

---

### Scalability

Adding new context sources requires minimal changes because the architecture is modular.

---

# Preparing for RAG

Retrieval-Augmented Generation (RAG) will extend the prompt.

```
User Prompt

+

Browser Context

+

Retrieved Documents

↓

Prompt
```

Example:

```
Relevant Documentation

React Hooks Guide

useEffect Best Practices

Official API Reference
```

---

# Preparing for Workspace Awareness

Workspace Awareness will inject project-level information.

```
Browser Context

+

Workspace Files

+

Current Project

+

Git Branch

↓

Prompt
```

The AI will understand not only the webpage but also the user's project.

---

# Preparing for MCP

Model Context Protocol (MCP) introduces external tools.

Future prompt:

```
Browser Context

+

Workspace

+

File System

+

Terminal Output

+

Git Diff

+

Tool Results

↓

Prompt
```

This allows Zeba AI to reason over live project data rather than static browser information alone.

---

# Benefits of Context Injection

- More accurate AI responses
- Better understanding of developer intent
- Reduced need for lengthy prompts
- Improved code explanations
- Enhanced documentation assistance
- Foundation for enterprise AI assistants

---

# Best Practices

✔ Keep browser context separate from user prompts.

✔ Inject context in the Prompt Service.

✔ Avoid modifying the user's original question.

✔ Include only relevant context.

✔ Handle missing values gracefully.

✔ Keep context objects strongly typed.

✔ Design for future expansion.

---

# Common Mistakes

### Injecting Everything

Sending excessive context increases token usage and can reduce response quality.

Only inject information that helps answer the user's request.

---

### Building Context in Controllers

Controllers should forward data only.

Context formatting belongs in the Prompt Service.

---

### Mixing Business Logic

Avoid combining browser collection, prompt building, and provider communication in the same class.

Maintain clear architectural boundaries.

---

# Context Injection Today

Current pipeline:

```
Prompt

+

Browser Context

↓

Prompt

↓

LLM
```

---

# Context Injection Tomorrow

Future pipeline:

```
Prompt

+

Browser Context

+

Conversation Memory

+

Retrieved Documents

+

Workspace

+

Git

+

Terminal

+

Tool Results

↓

Prompt

↓

LLM
```

The architecture remains the same while the injected context becomes richer.

---

# Chapter Summary

In this chapter, we completed the Context Injection pipeline for Zeba AI.

By combining browser metadata, selected text, and user prompts into a structured AI request, the extension now provides the LLM with the information it needs to generate accurate, context-aware responses.

This architecture mirrors the approach used by modern AI coding assistants and establishes a scalable foundation for future enhancements such as Retrieval-Augmented Generation (RAG), Workspace Awareness, Model Context Protocol (MCP), and autonomous AI agents.

---

# Deliverables

By the end of this chapter, you have successfully implemented:

- ✅ Complete Context Injection pipeline
- ✅ Browser Context integration
- ✅ Structured prompt generation
- ✅ Prompt augmentation
- ✅ Context-aware AI requests
- ✅ Separation of prompt engineering and orchestration
- ✅ Foundation for RAG
- ✅ Foundation for Workspace Awareness
- ✅ Foundation for MCP
- ✅ Enterprise-ready Context Injection architecture

---

# 📌 Next Chapter

In the next chapter, we will perform **End-to-End Testing and Validation** of the complete Context-Aware AI pipeline.

You will learn how to:

- Verify browser context collection
- Inspect API requests
- Debug runtime messaging
- Validate prompt injection
- Test streaming AI responses
- Troubleshoot common integration issues
- Measure response quality improvements

By the end of the next chapter, Zeba AI will have a fully tested and production-ready Context-Aware AI workflow capable of delivering intelligent responses based on the user's active browser context.


├── 09.8-Production-Best-Practices.md

# 📄 09.8 — Production Best Practices

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

Throughout this milestone, we successfully transformed Zeba AI from a simple AI chatbot into a **Context-Aware AI Assistant** capable of understanding the user's browser environment.

However, building features is only one aspect of software engineering. Writing **production-quality software** requires careful attention to architecture, maintainability, performance, scalability, security, and reliability.

This chapter focuses on the engineering principles and best practices that make Zeba AI maintainable as it grows into a full-scale AI development platform.

Rather than discussing new features, we will learn how to organize and optimize the existing system for long-term success.

These are the same engineering practices followed by professional AI platforms such as:

- GitHub Copilot
- Cursor AI
- Claude Code
- Windsurf
- Continue.dev
- Microsoft Copilot

---

# Learning Objectives

By the end of this chapter, you will understand how to:

- Build scalable AI architectures
- Separate responsibilities across layers
- Improve maintainability
- Reduce code duplication
- Improve performance
- Design for extensibility
- Secure browser context
- Handle failures gracefully
- Prepare for enterprise deployments

---

# Production Architecture

Our Context-Aware AI system now consists of multiple independent layers.

```
Chrome Extension

        │

        ▼

Popup UI

        │

        ▼

Background Worker

        │

        ▼

Browser Context Service

        │

        ▼

Backend API

        │

        ▼

AI Controller

        │

        ▼

AI Service

        │

        ▼

Prompt Service

        │

        ▼

Provider Factory

        │

        ▼

LLM
```

Each layer has a clearly defined responsibility.

---

# 1. Follow the Single Responsibility Principle (SRP)

Each class should have **one responsibility only**.

Good example:

```
BrowserContextService

↓

Collect browser data
```

PromptService

```
↓

Build AI prompts
```

AIService

```
↓

Coordinate AI workflow
```

Provider

```
↓

Communicate with AI model
```

Avoid classes that perform multiple unrelated tasks.

---

# 2. Separate Business Logic from HTTP Logic

Controllers should never contain AI logic.

Bad

```ts
router.post("/chat", async (req, res) => {

    const prompt =
        req.body.prompt;

    const response =
        await ollama.chat(prompt);

    res.json(response);

});
```

Good

```ts
const response =

await aiService.chat(

    prompt,

    browserContext,

    model

);
```

Controllers should:

- Receive requests
- Validate input
- Call services
- Return responses

Nothing more.

---

# 3. Keep Prompt Engineering Centralized

Never build prompts in multiple places.

Incorrect

```
Controller

↓

Prompt

↓

Provider
```

Correct

```
Prompt Service

↓

Single Prompt Builder

↓

Provider
```

Benefits

- Easier maintenance
- Consistent prompts
- Easy experimentation
- Version control

---

# 4. Build Modular Services

Instead of

```
AIService

↓

Everything
```

Split responsibilities.

```
AI Service

↓

Prompt Service

↓

Provider Factory

↓

Model Router

↓

Memory Service (future)

↓

RAG Service (future)
```

Small services are easier to maintain.

---

# 5. Strong Type Safety

Use TypeScript interfaces everywhere.

Example

```ts
export interface BrowserContext {

    url: string;

    title: string;

    hostname: string;

    protocol: string;

    language: string;

    selectedText?: string;

    timestamp: string;

}
```

Benefits

- Autocomplete
- Compile-time validation
- Fewer runtime errors
- Better documentation

---

# 6. Validate Every Request

Never trust client input.

Example

```ts
if (!prompt) {

    return res.status(400).json({

        success: false,

        message: "Prompt is required."

    });

}
```

Also validate:

- Browser Context
- URL
- Selected Text
- Model
- File Paths (future)

---

# 7. Use Consistent Error Handling

Instead of

```ts
throw error;
```

Return meaningful responses.

Example

```ts
return res.status(500).json({

    success: false,

    message:

    "Internal Server Error"

});
```

Benefits

- Better debugging
- Cleaner UI
- Consistent API

---

# 8. Log Strategically

Good logs

```ts
console.log(

    "Selected Model:",

    route.model

);
```

```ts
console.log(

    "Browser Context:",

    browserContext

);
```

Avoid

- API Keys
- Tokens
- User passwords
- Sensitive prompts

Use different log levels.

```
INFO

WARN

ERROR

DEBUG
```

---

# 9. Design for Extensibility

Today's pipeline

```
Prompt

+

Browser Context

↓

Prompt Builder
```

Future pipeline

```
Prompt

+

Browser Context

+

Conversation Memory

+

Retrieved Documents

+

Workspace

+

Git

+

Terminal

↓

Prompt Builder
```

A modular design allows new context sources to be added without rewriting existing code.

---

# 10. Minimize Token Usage

Sending unnecessary information increases:

- Cost
- Latency
- Token consumption

Instead of sending

```
Entire HTML Page
```

Send

```
Selected Text

Relevant Metadata

Important DOM Sections
```

Always optimize context before sending it to the model.

---

# 11. Build Provider Abstraction

Never couple the application to a single AI vendor.

Incorrect

```
AI Service

↓

Ollama
```

Correct

```
AI Service

↓

Provider Factory

↓

OpenAI

↓

Gemini

↓

Ollama

↓

Claude (future)
```

This allows providers to be swapped without changing business logic.

---

# 12. Implement Graceful Fallbacks

Primary provider unavailable?

Automatically switch.

```
Ollama

↓

Error

↓

OpenAI

↓

Success
```

Example

```ts
if (

    AI_CONFIG.enableFallback

) {

    return fallbackProvider.chat(

        prompt,

        model

    );

}
```

---

# 13. Keep Browser Context Lightweight

Avoid sending unnecessary browser information.

Good

```
URL

Title

Selected Text

Language
```

Avoid

```
Entire DOM

Cookies

Passwords

Sensitive Forms
```

Only collect information that improves AI quality.

---

# 14. Secure Browser Data

Never collect:

- Password fields
- Credit card information
- Authentication tokens
- Session cookies
- Hidden form values

Only capture data the user expects the AI to process.

---

# 15. Optimize Runtime Messaging

Instead of sending many small messages

```
URL

↓

Title

↓

Selection

↓

Metadata
```

Combine them into one object.

```ts
{

    url,

    title,

    selectedText,

    hostname,

    protocol

}
```

This reduces communication overhead.

---

# 16. Build Reusable Components

Popup UI should be composed of reusable components.

```
Popup

├── BrowserContextCard

├── PromptInput

├── ChatWindow

├── LoadingIndicator

├── ErrorMessage

└── Footer
```

Benefits

- Easier testing
- Cleaner code
- Better scalability

---

# 17. Prepare for Future Features

Design every layer with future expansion in mind.

Upcoming features include:

- DOM Extraction
- Code Block Detection
- RAG
- Embeddings
- Workspace Awareness
- MCP
- Tool Calling
- Autonomous Agents

A modular architecture minimizes future changes.

---

# 18. Folder Organization

Recommended backend structure.

```
backend/

src/

controllers/

services/

providers/

config/

middleware/

routes/

types/

utils/
```

Recommended extension structure.

```
extension/

popup/

background/

content/

services/

components/

types/

constants/
```

A consistent folder structure improves readability and onboarding.

---

# 19. Performance Optimization

Performance tips:

- Cache browser context when appropriate
- Avoid repeated API calls
- Stream responses instead of waiting
- Debounce user input
- Lazy load heavy components
- Keep prompts concise

---

# 20. Testing Strategy

Test every layer independently.

```
Popup

↓

Background

↓

Browser Context

↓

Backend

↓

AI Service

↓

Prompt Service

↓

Provider
```

This makes debugging much easier.

---

# Production Checklist

Before releasing Zeba AI, verify:

- ✅ Browser context collection
- ✅ Prompt injection
- ✅ Runtime messaging
- ✅ Background worker
- ✅ Streaming responses
- ✅ Error handling
- ✅ Fallback providers
- ✅ Type safety
- ✅ Logging
- ✅ Security
- ✅ Performance
- ✅ Folder organization

---

# Common Mistakes

## Mixing Responsibilities

Don't let one class handle everything.

---

## Hardcoding Providers

Always use the Provider Factory.

---

## Duplicating Prompt Logic

Prompt engineering belongs only in the Prompt Service.

---

## Ignoring Errors

Handle failures gracefully.

---

## Collecting Too Much Context

Only send information that improves the AI response.

---

# Enterprise Roadmap

Current architecture

```
Browser Context

↓

Prompt

↓

LLM
```

Future architecture

```
Browser Context

+

Conversation Memory

+

RAG

+

Workspace

+

Git

+

MCP

+

Tool Results

↓

Prompt

↓

LLM
```

The architecture you built in this milestone is already prepared for these advanced capabilities.

---

# Chapter Summary

In this chapter, we explored the engineering principles required to transform Zeba AI into a production-ready AI platform.

Rather than focusing on new features, we emphasized maintainability, modularity, performance, security, scalability, and clean architecture. By following these best practices, the project becomes easier to extend, test, and deploy while remaining flexible enough to support future capabilities such as RAG, MCP, workspace awareness, and autonomous AI agents.

These practices are the foundation of modern enterprise software development and ensure that Zeba AI can continue evolving without requiring major architectural changes.

---

# Deliverables

By the end of this chapter, you have learned:

- ✅ Production architecture principles
- ✅ Separation of concerns
- ✅ Service-oriented design
- ✅ Prompt engineering best practices
- ✅ Browser context security
- ✅ Error handling strategies
- ✅ Performance optimization
- ✅ Folder organization
- ✅ Scalability techniques
- ✅ Enterprise-ready development practices

---

# 📌 Next Chapter

In the next chapter, we will complete **Milestone 4.10** with **Testing, Validation, and Final Integration**.

We will verify the complete Context-Aware AI pipeline by:

- Testing browser context collection
- Validating prompt injection
- Inspecting backend requests
- Debugging runtime messaging
- Verifying streaming responses
- Measuring AI response quality
- Troubleshooting common issues

By the end of the final chapter, Zeba AI will feature a fully functional, production-ready Context-Aware AI workflow that serves as the foundation for upcoming milestones including DOM Extraction, Retrieval-Augmented Generation (RAG), Workspace Awareness, Model Context Protocol (MCP), and Autonomous AI Agents.

