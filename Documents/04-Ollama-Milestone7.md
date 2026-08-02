# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.7 – Memory Optimization & Context Management

# Part 1 – Memory Concepts & Architecture

## 🎥 Episode 4.7 (Part 1)

---

# 📖 Introduction

In the previous milestone, we significantly improved our AI backend by introducing **Prompt Engineering** and **Prompt Templates**. Instead of sending raw user input directly to Ollama, we now generate structured prompts that improve response quality and maintain consistency across different AI tasks.

However, our AI assistant still has one major limitation.

Every request is treated as a completely new conversation.

For example:

```
User:
What is Docker?

↓

AI:
Docker is a containerization platform.

↓

User:
Explain it with Kubernetes.

↓

AI:
What does "it" refer to?
```

Even though the user is referring to Docker, the AI has forgotten the previous conversation because the backend only sends the current prompt.

To solve this problem, we need **Conversation Memory**.

In this milestone, we will design a **Memory Service** that remembers previous conversations, manages context efficiently, optimizes token usage, and prepares our backend for future Retrieval-Augmented Generation (RAG).

---

# 🎯 Learning Objectives

By the end of this milestone, you will understand:

- What AI Memory is
- Why LLMs are stateless
- Difference between Stateless and Stateful AI
- Context Windows
- Token Management
- Conversation History
- Memory Architecture
- Conversation Flow
- Foundation for RAG

---

# 🧠 What is AI Memory?

Artificial Intelligence models such as **Llama**, **Qwen**, **Gemma**, and **DeepSeek** do not automatically remember previous conversations.

Every API request is independent.

For example:

```
Request 1

↓

LLM

↓

Response
```

Later...

```
Request 2

↓

LLM

↓

Response
```

The second request has **no knowledge** of the first request unless we explicitly send the previous conversation again.

This ability to remember previous interactions is called **Conversation Memory**.

---

# Why Do We Need Memory?

Imagine building ChatGPT.

Without memory:

```
User:
My name is John.

↓

AI:
Hello John!

↓

User:
What is my name?

↓

AI:
I don't know.
```

The AI cannot answer because the previous message was never sent.

---

With memory:

```
User:
My name is John.

↓

Memory Service

↓

Store Conversation

↓

User:
What is my name?

↓

Memory Service

↓

Previous Messages Added

↓

AI:
Your name is John.
```

The AI can now answer correctly.

---

# What is Stateless AI?

Most REST APIs are **stateless**.

Each request contains only the data needed for that request.

Example:

```
POST /chat

{

    "prompt":"Explain Docker"

}
```

The server processes the request.

Returns the response.

Then forgets everything.

Advantages:

- Simple
- Fast
- Scalable

Disadvantages:

- No conversation history
- No personalization
- No context awareness

---

# Stateless Architecture

```
User

↓

Request

↓

Backend

↓

Ollama

↓

Response

↓

Conversation Lost
```

Every request starts from zero.

---

# What is Stateful AI?

Stateful AI remembers previous interactions.

Instead of sending only the latest prompt:

```
Explain Docker
```

We send:

```
User:
Explain Docker

Assistant:
Docker is...

User:
Explain Docker Compose
```

Now the AI understands the conversation.

---

# Stateful Architecture

```
User

↓

Memory Service

↓

Previous Conversation

↓

Backend

↓

Ollama

↓

Response

↓

Memory Updated
```

Every response becomes part of the conversation history.

---

# Stateless vs Stateful AI

| Stateless AI | Stateful AI |
|--------------|-------------|
| No memory | Maintains memory |
| Independent requests | Continuous conversation |
| Simpler | More intelligent |
| Faster implementation | Better user experience |
| Cannot answer follow-up questions | Understands context |

---

# Real Example

Without Memory

```
User:
What is Docker?

↓

AI:
Docker is...

↓

User:
Explain Compose.

↓

AI:
Compose?
```

---

With Memory

```
User:
What is Docker?

↓

AI:
Docker is...

↓

User:
Explain Compose.

↓

AI:
Docker Compose is...
```

The AI knows that Compose refers to Docker.

---

# What is Context?

Context is everything the AI receives before generating a response.

Typical context includes:

- System Prompt
- Conversation History
- Current User Prompt

```
System Prompt

+

Conversation History

+

Current Prompt

↓

LLM

↓

Response
```

Better context produces better AI responses.

---

# Current Backend Architecture

After Milestone 4.6, our architecture looks like this:

```
Chrome Extension

↓

Controller

↓

AI Service

↓

Prompt Service

↓

AI Router

↓

Ollama
```

Every request is processed independently.

---

# New Architecture

With Conversation Memory:

```
Chrome Extension

↓

Controller

↓

AI Service

↓

Memory Service

↓

Prompt Service

↓

AI Router

↓

Ollama

↓

Memory Update
```

The Memory Service becomes responsible for remembering conversations.

---

# Memory Service Responsibilities

The Memory Service should:

- Store conversations
- Retrieve conversations
- Update conversations
- Remove old messages
- Limit conversation size
- Prepare context for Ollama

---

# AI Request Flow

```
User Prompt

↓

Memory Service

↓

Previous Messages

↓

Prompt Service

↓

Prompt Template

↓

AI Router

↓

Ollama

↓

Assistant Response

↓

Memory Service

↓

Store Response
```

Every interaction updates the conversation history.

---

# What is a Context Window?

Large Language Models have a maximum amount of text they can process in one request.

This limit is called the **Context Window**.

For example:

```
Model

↓

Maximum Context

↓

4096 Tokens
```

If we exceed this limit, the model cannot process the request.

---

# Example Context Window

Suppose our request contains:

```
System Prompt

↓

400 Tokens

Conversation

↓

2800 Tokens

Current Prompt

↓

500 Tokens

Total

↓

3700 Tokens
```

This fits inside a 4096-token context window.

---

Now consider:

```
System Prompt

↓

500 Tokens

Conversation

↓

5000 Tokens

Current Prompt

↓

600 Tokens

Total

↓

6100 Tokens
```

This exceeds the model's limit.

Older messages must be removed.

---

# What Are Tokens?

AI models process **tokens**, not words.

Examples:

```
Hello
```

≈ 1 Token

```
Hello World
```

≈ 2–3 Tokens

A paragraph of 100 words may contain around 120–160 tokens depending on the language and tokenizer.

---

# Why Token Management Matters

Long conversations consume more tokens.

Problems:

- Slower responses
- Higher RAM usage
- Higher latency
- Context overflow
- Reduced response quality

Good token management keeps conversations efficient.

---

# Token Optimization Strategy

Instead of sending the entire conversation forever:

```
Conversation

↓

500 Messages
```

We only send recent messages.

Example:

```
System Prompt

+

Last 10 User Messages

+

Last 10 Assistant Messages

↓

Ollama
```

This keeps requests fast and within the model's context window.

---

# Conversation History

Each conversation consists of alternating user and assistant messages.

```
Conversation

├── User

├── Assistant

├── User

├── Assistant

├── User

└── Assistant
```

This history is sent back to Ollama on each request.

---

# Conversation Lifecycle

```
Start Conversation

↓

User Message

↓

Store Message

↓

Generate AI Response

↓

Store Response

↓

Next User Message

↓

Load Previous Messages

↓

Generate New Response

↓

Repeat
```

The Memory Service continuously updates the conversation.

---

# Why Not Store Everything Forever?

Imagine a conversation lasting several hours.

```
Message 1

↓

Message 2

↓

...

↓

Message 1000
```

Sending all 1000 messages to the model would:

- Waste memory
- Increase response time
- Exceed context limits

Instead, we trim older messages.

---

# Conversation Trimming

Instead of:

```
100 Messages
```

Keep:

```
Last 20 Messages
```

This approach:

- Improves performance
- Reduces memory usage
- Prevents context overflow
- Keeps recent conversation available

---

# Future Memory Architecture

Today's in-memory storage is only the beginning.

In future chapters, we'll extend it to:

```
Memory Service

↓

Vector Database

↓

Embeddings

↓

Semantic Search

↓

RAG

↓

Ollama
```

This allows the AI to remember information far beyond a single conversation.

---

# Memory vs RAG

| Conversation Memory | Retrieval-Augmented Generation (RAG) |
|---------------------|--------------------------------------|
| Remembers recent chat | Searches external knowledge |
| Session-based | Knowledge-base based |
| Temporary | Persistent |
| Limited by context window | Scalable to millions of documents |

Both technologies complement each other.

---

# Best Practices

When designing a Memory Service:

- Keep memory separate from business logic
- Never store unlimited conversation history
- Keep the system prompt separate
- Trim old messages automatically
- Use configurable limits
- Design for future database storage
- Prepare for Redis or Vector Database integration

---

# 🧪 Testing Checklist

Before implementing the Memory Service, verify that you understand:

- AI models are stateless
- Context must be provided explicitly
- Memory improves conversation quality
- Context windows are limited
- Tokens determine request size
- Conversation history should be optimized
- Old messages should be trimmed

---

# 📦 Deliverables

By the end of Part 1, you have learned:

- ✅ What AI Memory is
- ✅ Stateless vs Stateful AI
- ✅ Context Windows
- ✅ Token Management
- ✅ Conversation History
- ✅ Memory Architecture
- ✅ Conversation Flow
- ✅ Foundation for Production AI Conversations
- ✅ Preparation for RAG

---

# 📖 Part 1 Summary

In this part, we explored the fundamental concepts behind conversational AI. We learned why Large Language Models are stateless by default, how conversation memory enables intelligent follow-up questions, and why context management is essential for high-quality AI responses. We also introduced context windows, token optimization, conversation trimming, and the overall memory architecture that will power our AI assistant.

This conceptual foundation prepares us for the next part, where we will implement a production-ready `MemoryService` in TypeScript and integrate it into the Zeba AI backend.

---
# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.7 – Memory Optimization & Context Management

# Part 2 – Build the Conversation Memory Service

> 🎥 Episode 4.7 – Part 2

---

# 🎯 Goal

In Part 1, we learned why AI memory is essential for maintaining context in long-running conversations.

In this part, we will implement a **Conversation Memory Service** that stores, retrieves, trims, and manages conversation history for every user session.

Instead of sending only the latest prompt to the AI model, we will send the recent conversation history along with the new prompt, enabling more natural and context-aware interactions.

---

# 📚 Learning Objectives

After completing this part, you will be able to:

- Design a conversation data model
- Store conversations in memory
- Create unique conversation sessions
- Retrieve conversation history
- Limit conversation size
- Remove old conversations automatically
- Prepare the architecture for Redis and databases
- Build a reusable Memory Service

---

# 🏗 Current Architecture

```text
Popup

↓

Backend

↓

Prompt Service

↓

AI Router

↓

Ollama
```

---

# 🏗 New Architecture

```text
Popup

↓

AI Controller

↓

AI Service

↓

Memory Service

↓

Prompt Service

↓

AI Router

↓

Ollama

↓

Memory Update

↓

Response
```

---

# 📁 Project Structure

Create the following files.

```text
backend/

src/

├── config/
│   └── memory.config.ts
│
├── services/
│   └── memory.service.ts
│
├── types/
│   └── conversation.types.ts
│
├── prompts/
│
├── controllers/
│
└── routes/
```

---

# Step 1 – Create Conversation Types

Create:

```text
src/types/conversation.types.ts
```

This file defines how conversations are stored inside the application.

---

## Complete Code

```typescript
export interface ConversationMessage {

    role: "user" | "assistant";

    content: string;

    timestamp: Date;

}

export interface Conversation {

    sessionId: string;

    messages: ConversationMessage[];

    createdAt: Date;

    updatedAt: Date;

}
```

---

## Explanation

Each conversation consists of multiple messages.

Example:

```text
Conversation

├── Session ID

├── User Message

├── Assistant Message

├── User Message

└── Assistant Message
```

---

## Message Structure

Each message stores:

| Field | Description |
|--------|-------------|
| role | user or assistant |
| content | Message text |
| timestamp | Creation time |

---

## Conversation Structure

Each conversation stores:

| Field | Purpose |
|--------|----------|
| sessionId | Unique conversation |
| messages | All chat messages |
| createdAt | First message time |
| updatedAt | Latest activity |

---

# Step 2 – Create Memory Configuration

Create:

```text
src/config/memory.config.ts
```

---

## Complete Code

```typescript
export const MEMORY_CONFIG = {

    MAX_MESSAGES: 20,

    SESSION_TIMEOUT_MINUTES: 60,

    CLEANUP_INTERVAL_MINUTES: 30

};
```

---

## Explanation

Instead of hardcoding limits throughout the application, define them in one place.

Benefits:

- Easier maintenance
- Cleaner code
- Environment-specific configuration

---

## Configuration

### MAX_MESSAGES

```text
20
```

Only the latest 20 messages are kept.

Older messages are removed automatically.

---

### SESSION_TIMEOUT

```text
60 Minutes
```

If a user is inactive for one hour:

Conversation expires.

---

### CLEANUP_INTERVAL

```text
30 Minutes
```

Every 30 minutes:

Old sessions are removed.

---

# Step 3 – Create Memory Service

Create

```text
src/services/memory.service.ts
```

---

## Overview

This service is responsible for:

- Creating sessions
- Saving messages
- Reading messages
- Removing old messages
- Cleaning inactive sessions

---

# Step 4 – Store Conversations

We'll use an in-memory Map.

```typescript
private conversations =
    new Map<string, Conversation>();
```

---

## Why Map?

Map provides:

- Fast lookup
- Easy updates
- O(1) retrieval
- Simple iteration

Example

```text
Map

Session-1

↓

Conversation

Session-2

↓

Conversation
```

---

# Step 5 – Create Memory Service Class

```typescript
import { Conversation, ConversationMessage } from "../types/conversation.types";
import { MEMORY_CONFIG } from "../config/memory.config";

class MemoryService {

    private conversations = new Map<string, Conversation>();

}

export default new MemoryService();
```

---

# Step 6 – Create Session

Add a method to initialize conversations.

```typescript
public createSession(sessionId: string): void {

    if (this.conversations.has(sessionId)) {

        return;

    }

    this.conversations.set(sessionId, {

        sessionId,

        messages: [],

        createdAt: new Date(),

        updatedAt: new Date()

    });

}
```

---

## Flow

```text
User Opens Chat

↓

Session Created

↓

Conversation Stored
```

---

# Step 7 – Get Conversation

Retrieve a conversation by session ID.

```typescript
public getConversation(sessionId: string): Conversation {

    if (!this.conversations.has(sessionId)) {

        this.createSession(sessionId);

    }

    return this.conversations.get(sessionId)!;

}
```

---

## Benefits

Automatically creates a conversation if one doesn't exist.

No null checks throughout the application.

---

# Step 8 – Add Message

Store new user or AI messages.

```typescript
public addMessage(

    sessionId: string,

    role: "user" | "assistant",

    content: string

): void {

    const conversation = this.getConversation(sessionId);

    conversation.messages.push({

        role,

        content,

        timestamp: new Date()

    });

    conversation.updatedAt = new Date();

    this.trimConversation(conversation);

}
```

---

## Flow

```text
Prompt

↓

Memory Service

↓

Conversation Updated

↓

Trim if Needed
```

---

# Step 9 – Retrieve Messages

Return conversation history.

```typescript
public getMessages(

    sessionId: string

): ConversationMessage[] {

    return this.getConversation(sessionId).messages;

}
```

---

## Example Output

```text
User:
Explain Docker

Assistant:
Docker is...

User:
What is Docker Compose?

Assistant:
Docker Compose...
```

---

# Step 10 – Trim Conversations

Prevent unlimited memory growth.

```typescript
private trimConversation(

    conversation: Conversation

): void {

    if (

        conversation.messages.length >

        MEMORY_CONFIG.MAX_MESSAGES

    ) {

        conversation.messages =

            conversation.messages.slice(

                -MEMORY_CONFIG.MAX_MESSAGES

            );

    }

}
```

---

## Why Trim?

Without trimming:

```text
Conversation

↓

5 Messages

↓

50 Messages

↓

500 Messages

↓

5000 Messages

↓

Huge Memory Usage
```

With trimming:

```text
Maximum

20 Messages

Always
```

---

# Step 11 – Clear Conversation

Sometimes the user starts a new chat.

```typescript
public clearConversation(

    sessionId: string

): void {

    this.conversations.delete(sessionId);

}
```

---

# Step 12 – Remove Expired Sessions

Automatically remove inactive conversations.

```typescript
public cleanupExpiredSessions(): void {

    const now = Date.now();

    const timeout =

        MEMORY_CONFIG.SESSION_TIMEOUT_MINUTES *

        60 *

        1000;

    for (const [id, conversation] of this.conversations) {

        if (

            now -

            conversation.updatedAt.getTime() >

            timeout

        ) {

            this.conversations.delete(id);

        }

    }

}
```

---

## Cleanup Flow

```text
Scheduler

↓

Memory Service

↓

Find Expired Sessions

↓

Delete Them

↓

Free Memory
```

---

# Step 13 – Count Active Sessions

Useful for monitoring.

```typescript
public getSessionCount(): number {

    return this.conversations.size;

}
```

---

# Step 14 – Complete Memory Service

Your service now supports:

- Create Session
- Get Session
- Add Messages
- Retrieve Messages
- Trim History
- Delete Conversation
- Cleanup Old Sessions
- Session Statistics

---

# Memory Service Flow

```text
User Prompt

↓

Session Lookup

↓

Conversation Found

↓

Append User Message

↓

Return History

↓

AI Generates Response

↓

Append AI Message

↓

Trim History

↓

Return Response
```

---

# Example Conversation

```text
Session

↓

User
Hello

↓

Assistant
Hi!

↓

User
Explain Docker

↓

Assistant
Docker is...

↓

User
What is Docker Compose?

↓

Assistant
Compose allows...
```

---

# Why This Design?

Benefits:

- Fast
- Lightweight
- Easy to understand
- Easy to replace later

Future upgrades can replace the in-memory `Map` with:

- Redis
- MongoDB
- PostgreSQL
- DynamoDB

without changing the rest of the application.

---

# Testing Checklist

Verify the following:

- ✅ New sessions are created automatically
- ✅ Messages are stored correctly
- ✅ Conversation history is retrieved
- ✅ Old messages are trimmed after the configured limit
- ✅ Conversations can be cleared
- ✅ Expired sessions are cleaned up
- ✅ Session count is accurate

---

# Deliverables

By the end of this part, you have implemented:

- ✅ `conversation.types.ts`
- ✅ `memory.config.ts`
- ✅ `memory.service.ts`
- ✅ Conversation Storage
- ✅ Session Management
- ✅ Message Retrieval
- ✅ Automatic Conversation Trimming
- ✅ Memory Cleanup
- ✅ Extensible Architecture

---

# Git Commit

```bash
git add .

git commit -m "feat(memory): implement conversation memory service"

git push origin develop
```

---

# Part Summary

In this part, we implemented the complete **Conversation Memory Service** for the Zeba AI backend. We defined reusable conversation types, centralized memory configuration, and built a service capable of creating sessions, storing messages, retrieving conversation history, trimming old messages, and cleaning up inactive sessions. Although the implementation currently uses an in-memory `Map`, the architecture is intentionally designed so it can later be replaced with Redis or a database without affecting the rest of the application.

---
# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.7 – Memory Optimization & Context Management

# Part 3 – Integrating Memory with AI Service

> 🎥 Episode 4.7 – Part 3

---

# 🎯 Goal

In Part 2, we built a reusable **Conversation Memory Service** capable of storing, retrieving, and managing conversation history.

However, the AI still receives only the latest prompt.

In this part, we will integrate the Memory Service into the AI pipeline so every request includes previous conversation history.

This enables the AI to remember previous questions, maintain context, and provide more natural conversations.

---

# 📚 Learning Objectives

After completing this part, you will be able to:

- Load conversation history automatically
- Pass previous messages to Ollama
- Save user messages
- Save assistant responses
- Support multiple chat sessions
- Build context-aware AI conversations
- Prepare for persistent memory
- Prepare for Retrieval-Augmented Generation (RAG)

---

# Current Architecture

```text
Popup

↓

AI Controller

↓

AI Service

↓

Prompt Service

↓

AI Router

↓

Ollama

↓

Response
```

---

# New Architecture

```text
Popup

↓

AI Controller

↓

AI Service

↓

Memory Service

↓

Prompt Service

↓

AI Router

↓

Ollama

↓

Assistant Response

↓

Memory Service

↓

Popup
```

---

# Conversation Flow

```text
User Prompt

↓

Load Conversation

↓

Append User Message

↓

Build Prompt

↓

Select Model

↓

Ollama

↓

Receive AI Response

↓

Save Assistant Response

↓

Return Response
```

---

# Updated Project Structure

```text
backend/

src/

├── services/
│
├── ai.service.ts
├── memory.service.ts
├── prompt.service.ts
├── ai-router.service.ts
├── ollama.service.ts
│
├── prompts/
│
├── controllers/
│
└── routes/
```

---

# Step 1 – Update AI Service

The AI Service becomes the center of the entire AI workflow.

Responsibilities now include:

- Managing conversation history
- Building prompts
- Selecting AI models
- Calling Ollama
- Saving AI responses

---

# New AI Service Flow

```text
User Prompt

↓

Memory Service

↓

Prompt Service

↓

AI Router

↓

Ollama

↓

Memory Service

↓

Response
```

---

# Step 2 – Import Memory Service

Open

```text
src/services/ai.service.ts
```

Add

```typescript
import memoryService from "./memory.service";
import promptService from "./prompt.service";
import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";
```

---

# Step 3 – Accept Session ID

Instead of

```typescript
chat(prompt)
```

change it to

```typescript
chat(

    sessionId: string,

    prompt: string

)
```

Every conversation now belongs to a session.

---

# Step 4 – Load Conversation History

Before calling Ollama

retrieve existing messages.

```typescript
const history =

    memoryService.getMessages(

        sessionId

    );
```

---

## Example

Conversation

```text
User

Hello

Assistant

Hi!

User

Explain Docker
```

When the user asks

```text
What is Docker Compose?
```

the AI already knows

```text
Hello

Hi

Explain Docker

Docker is...
```

instead of starting from scratch.

---

# Step 5 – Save User Message

Immediately save the new prompt.

```typescript
memoryService.addMessage(

    sessionId,

    "user",

    prompt

);
```

Flow

```text
Prompt

↓

Memory

↓

Stored
```

---

# Step 6 – Build Prompt

Create a context-aware prompt.

```typescript
const formattedPrompt =

    promptService.buildPrompt(

        prompt

    );
```

Later,

the Prompt Service can also receive conversation history.

Example

```typescript
promptService.buildPrompt(

    prompt,

    history

);
```

---

# Step 7 – Select AI Model

Routing remains unchanged.

```typescript
const route =

    aiRouter.selectModel(

        prompt

    );
```

---

# Step 8 – Call Ollama

```typescript
const response =

    await ollamaService.chat(

        formattedPrompt,

        route.model

    );
```

---

# Step 9 – Save AI Response

After receiving the answer

store it.

```typescript
memoryService.addMessage(

    sessionId,

    "assistant",

    response

);
```

Conversation becomes

```text
User

Explain Docker

↓

Assistant

Docker is...
```

---

# Step 10 – Return Response

```typescript
return {

    success: true,

    response

};
```

---

# Complete AI Service

```typescript
import memoryService from "./memory.service";
import promptService from "./prompt.service";
import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";

class AIService {

    async chat(

        sessionId: string,

        prompt: string

    ) {

        // Load previous conversation

        const history =

            memoryService.getMessages(

                sessionId

            );

        console.log(

            "Conversation Messages:",

            history.length

        );

        // Save user message

        memoryService.addMessage(

            sessionId,

            "user",

            prompt

        );

        // Build formatted prompt

        const formattedPrompt =

            promptService.buildPrompt(

                prompt

            );

        // Select model

        const route =

            aiRouter.selectModel(

                prompt

            );

        console.log(

            "Selected Model:",

            route.model

        );

        // Generate response

        const response =

            await ollamaService.chat(

                formattedPrompt,

                route.model

            );

        // Save assistant response

        memoryService.addMessage(

            sessionId,

            "assistant",

            response

        );

        return {

            success: true,

            response

        };

    }

}

export default new AIService();
```

---

# Step 11 – Update AI Controller

Current

```typescript
aiService.chat(

    prompt

);
```

New

```typescript
const result =

    await aiService.chat(

        sessionId,

        prompt

    );
```

---

## Complete Example

```typescript
export async function chat(

    req: Request,

    res: Response

) {

    try {

        const {

            sessionId,

            prompt

        } = req.body;

        const result =

            await aiService.chat(

                sessionId,

                prompt

            );

        res.json(result);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: "AI request failed"

        });

    }

}
```

---

# Step 12 – Update Request Schema

Current

```json
{
    "prompt":"Explain Docker"
}
```

New

```json
{
    "sessionId":"abc123",
    "prompt":"Explain Docker"
}
```

---

# Step 13 – Update Zod Schema

```typescript
import { z } from "zod";

export const chatSchema =

    z.object({

        sessionId:

            z.string(),

        prompt:

            z.string()

                .min(1)

    });
```

---

# Step 14 – Update Chrome Extension

Every request now sends

```json
{
    "sessionId":"user-session-001",
    "prompt":"Explain Docker"
}
```

The session ID should remain the same throughout the conversation.

---

# Conversation Example

Request 1

```text
Hello
```

↓

Memory

```text
Hello
```

---

Request 2

```text
What is Docker?
```

↓

Memory

```text
Hello

What is Docker?
```

---

Request 3

```text
Explain Docker Compose.
```

↓

Memory

```text
Hello

What is Docker?

Docker is...

Explain Docker Compose
```

The AI now understands the full conversation.

---

# End-to-End Flow

```text
Popup

↓

AI Controller

↓

Memory Service

↓

Conversation History

↓

Prompt Service

↓

Prompt Template

↓

AI Router

↓

Model Selection

↓

Ollama

↓

AI Response

↓

Memory Service

↓

Save Response

↓

Popup
```

---

# Multiple Sessions

Session A

```text
Frontend Developer
```

Session B

```text
Kubernetes Learning
```

Session C

```text
Resume Review
```

Each session has independent memory.

---

# Why Session IDs?

Without Session IDs

```text
Everyone

↓

Same Conversation
```

Impossible to scale.

---

With Session IDs

```text
User A

↓

Conversation A

----------------

User B

↓

Conversation B

----------------

User C

↓

Conversation C
```

Perfect for production systems.

---

# Future Upgrade

Today

```text
Memory

↓

Map
```

Future

```text
Memory

↓

Redis

↓

MongoDB

↓

Vector Database

↓

Persistent Storage
```

No AI code changes required.

---

# Testing Checklist

Verify the following:

- ✅ User message is stored
- ✅ Assistant response is stored
- ✅ Conversation history loads correctly
- ✅ Multiple sessions work independently
- ✅ Session ID is passed correctly
- ✅ AI responses remain accurate
- ✅ Memory size is trimmed automatically
- ✅ Controller passes session ID correctly

---

# Best Practices

- Always generate a unique session ID per conversation.
- Keep memory logic inside the Memory Service.
- Never access the memory store directly from controllers.
- Save both user and assistant messages.
- Keep the AI Service responsible for orchestrating the workflow.
- Log session IDs during development for debugging.
- Design the Memory Service so it can later switch from an in-memory `Map` to Redis or MongoDB without changing the AI workflow.

---

# Deliverables

By the end of this part, you will have:

- ✅ Memory integrated into AI Service
- ✅ Session-based conversations
- ✅ Automatic conversation history loading
- ✅ User message persistence
- ✅ Assistant response persistence
- ✅ Context-aware AI conversations
- ✅ Multi-session support
- ✅ Production-ready conversational architecture

---

# Git Commit

```bash
git add .

git commit -m "feat(memory): integrate conversation memory into ai service"

git push origin develop
```

---

# Part Summary

In this part, we integrated the **Conversation Memory Service** into the AI pipeline. Every request now loads previous conversation history, stores new user prompts, generates AI responses, and saves assistant replies back into memory. By introducing session IDs, the backend now supports multiple independent conversations and provides context-aware interactions. This architecture forms the foundation for persistent memory, Retrieval-Augmented Generation (RAG), and enterprise-grade conversational AI systems.

---
# Chapter 4 – Ollama Integration & AI Router

# Milestone 4.7 – Memory Optimization & Context Management

# Part 4 – Context Window Optimization & Persistent Memory

> 🎥 Episode 4.7 – Part 4

---

# 🎯 Goal

In the previous parts, we built a complete **Conversation Memory Service** that stores user and assistant messages.

However, Large Language Models (LLMs) have a limited **Context Window**.

If we keep sending every previous message forever, the prompt becomes:

- Expensive
- Slow
- Memory intensive
- Eventually too large for the model

In this milestone, we'll optimize conversation memory by sending only the most relevant context to the AI.

We'll also prepare the architecture for **Redis**, **Vector Databases**, and **Retrieval-Augmented Generation (RAG)**.

---

# 📚 Learning Objectives

After completing this part, you will be able to:

- Understand AI context windows
- Reduce unnecessary tokens
- Prevent context overflow
- Keep conversations fast
- Summarize old conversations
- Prepare Redis integration
- Prepare Vector Database integration
- Build enterprise-grade AI memory

---

# What is a Context Window?

A Context Window is the maximum amount of text an AI model can process in a single request.

Example:

```
Question

+

Previous Conversation

+

System Prompt

+

Instructions

=

Context Window
```

Every model has a limit.

---

# Typical Context Window Sizes

| Model | Context Window |
|---------|---------------|
| llama3.2:3b | 8K Tokens |
| qwen2.5-coder | 32K Tokens |
| deepseek-r1 | 32K Tokens |
| GPT-4.1 | 128K+ Tokens |

---

# Why Context Optimization Matters

Imagine this conversation:

```
User

Hello

Assistant

Hi

User

Explain Docker

Assistant

...

User

Explain Kubernetes

Assistant

...

User

Explain Jenkins

Assistant

...
```

After hundreds of messages:

```
Conversation

↓

300 Messages

↓

Thousands of Tokens
```

Eventually the AI cannot process all of them.

---

# Without Optimization

```text
Conversation

↓

Entire History

↓

500 KB Prompt

↓

Slow

↓

Expensive

↓

Context Overflow
```

---

# With Optimization

```text
Conversation

↓

Recent Messages

+

Summary

↓

Small Prompt

↓

Fast

↓

Accurate
```

---

# Enterprise Memory Architecture

```text
Popup

↓

Controller

↓

Memory Service

↓

Recent Messages

↓

Conversation Summary

↓

Prompt Service

↓

AI Router

↓

Ollama

↓

Response
```

---

# Long-Term Memory Strategy

Instead of sending:

```
500 Messages
```

Send:

```
Last 10 Messages

+

Conversation Summary
```

This dramatically reduces token usage.

---

# Updated Memory Architecture

```text
Conversation

↓

Memory Service

↓

Recent Messages

↓

Summary Generator

↓

Prompt Builder

↓

Ollama
```

---

# Project Structure

```text
backend/

src/

├── config/
│   └── memory.config.ts
│
├── services/
│   ├── memory.service.ts
│   ├── summary.service.ts
│   ├── ai.service.ts
│   └── prompt.service.ts
│
├── prompts/
│
└── types/
```

---

# Step 1 – Configure Context Limits

Create or update

```
src/config/memory.config.ts
```

```typescript
export const MEMORY_CONFIG = {

    MAX_MESSAGES: 20,

    SUMMARY_THRESHOLD: 40,

    MAX_CONTEXT_MESSAGES: 10,

    ENABLE_SUMMARIZATION: true

};
```

---

## Configuration Explanation

| Property | Purpose |
|----------|---------|
| MAX_MESSAGES | Maximum messages stored in memory |
| SUMMARY_THRESHOLD | When summarization begins |
| MAX_CONTEXT_MESSAGES | Messages sent to AI |
| ENABLE_SUMMARIZATION | Enable future summarization |

---

# Step 2 – Return Only Recent Messages

Update

```
memory.service.ts
```

```typescript
getRecentMessages(

    sessionId: string

) {

    const conversation =

        this.getConversation(sessionId);

    return conversation.messages.slice(

        -MEMORY_CONFIG.MAX_CONTEXT_MESSAGES

    );

}
```

---

## Example

Stored

```
Message 1

Message 2

...

Message 50
```

Returned

```
Message 41

...

Message 50
```

Only the newest messages are sent.

---

# Step 3 – Keep Summary Placeholder

Update Conversation interface

```typescript
export interface Conversation {

    sessionId: string;

    messages: Message[];

    summary?: string;

    updatedAt: Date;

}
```

---

# Why Summary?

Instead of remembering everything,

the AI remembers the important parts.

Example

```
Summary

↓

User is learning Docker,
Kubernetes,
Node.js,
and building Zeba AI.
```

Instead of:

```
150 previous messages.
```

---

# Step 4 – Create Summary Service

Create

```
src/services/summary.service.ts
```

```typescript
class SummaryService {

    summarize(

        messages: string[]

    ): string {

        return

            "Conversation summary placeholder.";

    }

}

export default new SummaryService();
```

---

## Why Placeholder?

Today:

```
Hardcoded Summary
```

Future:

```
Ollama

↓

LLM Generated Summary
```

---

# Step 5 – Update Memory Service

When messages exceed the threshold

generate a summary.

Example

```typescript
if (

    conversation.messages.length >

    MEMORY_CONFIG.SUMMARY_THRESHOLD

) {

    conversation.summary =

        summaryService.summarize(

            conversation.messages.map(

                m => m.content

            )

        );

}
```

---

# Future Flow

```text
Conversation

↓

40 Messages

↓

Generate Summary

↓

Store Summary

↓

Remove Old Messages
```

---

# Step 6 – Use Summary During Prompt Building

Prompt Service

Current

```
Prompt

↓

Ollama
```

Future

```
Summary

+

Recent Messages

+

Prompt

↓

Ollama
```

---

Example

```
Summary

↓

User is building Zeba AI.

+

Recent Messages

↓

Explain Kubernetes Ingress
```

---

# Step 7 – Trim Old Messages

Instead of

```
500 Messages
```

Keep

```
Summary

+

Last 10 Messages
```

Example

```typescript
conversation.messages =

conversation.messages.slice(

    -MEMORY_CONFIG.MAX_CONTEXT_MESSAGES

);
```

---

# Step 8 – AI Service Integration

Current

```typescript
const history =

memoryService.getMessages(

    sessionId

);
```

Update

```typescript
const history =

memoryService.getRecentMessages(

    sessionId

);
```

Only optimized context is loaded.

---

# Step 9 – Prepare Redis

Current Storage

```text
Map

↓

RAM
```

Future

```text
Redis

↓

Shared Memory

↓

Multiple Servers
```

Advantages

- Faster
- Persistent
- Distributed
- Production Ready

---

# Step 10 – Prepare Vector Database

Current

```
Conversation

↓

Memory
```

Future

```
Conversation

↓

Embedding

↓

Vector Database

↓

Semantic Search

↓

Relevant Context

↓

AI
```

---

Popular Vector Databases

- ChromaDB
- Pinecone
- Qdrant
- Milvus
- Weaviate
- FAISS

---

# Step 11 – Preparing for RAG

Current

```
Question

↓

LLM
```

Future

```
Question

↓

Vector Search

↓

Relevant Documents

↓

Prompt

↓

LLM
```

This architecture powers:

- GitHub Copilot
- ChatGPT Memory
- Claude Projects
- Cursor IDE
- Enterprise AI Assistants

---

# Step 12 – End-to-End Architecture

```text
Popup

↓

Controller

↓

Memory Service

↓

Recent Messages

↓

Conversation Summary

↓

Prompt Service

↓

AI Router

↓

Ollama

↓

Assistant Response

↓

Memory Update
```

---

# Step 13 – Memory Lifecycle

```text
User Message

↓

Store

↓

Conversation Grows

↓

Generate Summary

↓

Trim Old Messages

↓

Send Recent Context

↓

AI Response

↓

Store Again
```

---

# Example

Before

```
250 Messages
```

Prompt Size

```
250 Messages
```

---

After Optimization

```
Conversation Summary

+

Last 10 Messages
```

Prompt Size

```
≈15 Messages
```

Huge improvement.

---

# Benefits

- Faster responses
- Lower RAM usage
- Smaller prompts
- Lower token consumption
- Better scalability
- Improved response consistency
- Enterprise-ready architecture

---

# Future Architecture

```text
Chrome Extension

↓

Backend

↓

Redis

↓

Memory Service

↓

Prompt Service

↓

Vector Database

↓

Retriever

↓

AI Router

↓

Ollama / OpenAI / Gemini / Claude

↓

Streaming Response
```

---

# Testing Checklist

Verify the following:

- ✅ Only recent messages are returned
- ✅ Context window stays small
- ✅ Old messages are trimmed
- ✅ Summary field exists
- ✅ AI Service loads optimized context
- ✅ Memory continues to work correctly
- ✅ Architecture is ready for Redis
- ✅ Architecture is ready for RAG

---

# Best Practices

- Never send the full conversation history.
- Always keep the latest messages.
- Generate summaries for older conversations.
- Keep summaries concise and factual.
- Store memory separately from business logic.
- Design the Memory Service so Redis can replace the in-memory `Map` without changing the rest of the application.
- Build prompt generation around summaries and recent context instead of entire chat logs.

---

# Deliverables

By the end of this part, you will have:

- ✅ Context Window Optimization
- ✅ Recent Message Retrieval
- ✅ Conversation Summaries (Placeholder)
- ✅ Memory Trimming
- ✅ Token Optimization
- ✅ Redis-ready Architecture
- ✅ Vector Database-ready Design
- ✅ RAG-ready Backend
- ✅ Production-grade Memory Architecture

---

# Git Commit

```bash
git add .

git commit -m "feat(memory): optimize context window and prepare persistent memory"

git push origin develop
```

---

# Part Summary

In this part, we optimized conversation memory by limiting the number of messages sent to the AI, introducing placeholders for conversation summaries, and preparing the architecture for long-term memory. Rather than sending the entire chat history, the backend now focuses on recent messages while reserving space for summarized context. This significantly reduces token usage, improves response times, and lays the foundation for future integration with Redis, vector databases, and Retrieval-Augmented Generation (RAG).

---

# 🚀 Chapter 4 Status

After completing all parts of Milestone **4.7**, your backend now includes:

- ✅ Ollama Integration
- ✅ AI Router
- ✅ Prompt Engineering
- ✅ Prompt Templates
- ✅ Streaming AI Responses
- ✅ Conversation Memory
- ✅ Session Management
- ✅ Context Window Optimization
- ✅ Production-ready AI Architecture
- ✅ Foundation for Redis
- ✅ Foundation for RAG
- ✅ Foundation for Persistent AI Memory

---

# ⏭ Next Milestone

## Milestone 4.8 – Preparing for Multi-Provider AI Support

In the next milestone, we will:

- Abstract AI providers behind a common interface
- Add support for OpenAI, Gemini, and Claude
- Implement provider selection strategies
- Add automatic provider fallback
- Build a provider factory pattern
- Prepare Zeba AI for hybrid local and cloud AI deployments