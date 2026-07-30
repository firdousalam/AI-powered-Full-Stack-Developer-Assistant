Part 1 – Project Structure

By the end of this milestone, your backend will look like this:

backend/

src/

├── config/
│   └── model.config.ts
│
├── controllers/
│   └── ai.controller.ts
│
├── routes/
│   └── ai.routes.ts
│
├── services/
│   ├── ai.service.ts
│   ├── ai-router.service.ts
│   └── ollama.service.ts
│
├── types/
│   └── ai.types.ts
│
└── utils/
Step 1 — Create Model Configuration

Never hardcode model names throughout the application.

Create

src/config/model.config.ts
export const MODELS = {

    CHAT: "llama3.2:3b",

    CODING: "qwen2.5-coder:7b",

    REASONING: "deepseek-r1:7b",

    EMBEDDING: "nomic-embed-text"

} as const;
Why?

Instead of

"llama3.2:3b"

everywhere,

you now use

MODELS.CHAT

Later, if you switch to

llama3.3

you only change one file.

Step 2 — Create AI Types

Create

src/types/ai.types.ts
export interface AIRouteResult {

    model: string;

    reason: string;

}

We'll use this interface throughout the project.

Step 3 — Create AI Router Service

Create

src/services/ai-router.service.ts

Basic structure:

import { MODELS } from "../config/model.config";
import { AIRouteResult } from "../types/ai.types";

class AIRouterService {

    public selectModel(prompt: string): AIRouteResult {

        return {

            model: MODELS.CHAT,

            reason: "Default Model"

        };

    }

}

export default new AIRouterService();

Right now every request returns

llama3.2

Later we'll make it intelligent.

Step 4 — Create Keyword Lists

Instead of dozens of if statements, keep keywords organized.

const codingKeywords = [

    "javascript",

    "typescript",

    "react",

    "node",

    "express",

    "docker",

    "kubernetes",

    "mongodb",

    "sql",

    "api",

    "css",

    "html"

];

Reasoning keywords:

const reasoningKeywords = [

    "architecture",

    "design",

    "microservices",

    "distributed",

    "system design",

    "high availability",

    "load balancing",

    "scalability"

];
Step 5 — Normalize the Prompt

Always compare lowercase text.

const input = prompt.toLowerCase();

Now

React

and

react

are treated the same.

Step 6 — Detect Coding Requests
if (

    codingKeywords.some(

        keyword => input.includes(keyword)

    )

) {

    return {

        model: MODELS.CODING,

        reason: "Coding Request"

    };

}

Example

Prompt

Explain Express Middleware

Selected model

qwen2.5-coder:7b
Step 7 — Detect Reasoning Requests
if (

    reasoningKeywords.some(

        keyword => input.includes(keyword)

    )

) {

    return {

        model: MODELS.REASONING,

        reason: "Reasoning Request"

    };

}

Example

Design Uber Architecture

↓

deepseek-r1
Step 8 — Default Model

If nothing matches

return {

    model: MODELS.CHAT,

    reason: "General Chat"

};

Now every request always gets a model.

Final AI Router

Your completed router looks like this:

import { MODELS } from "../config/model.config";
import { AIRouteResult } from "../types/ai.types";

class AIRouterService {

    private codingKeywords = [

        "javascript",
        "typescript",
        "react",
        "node",
        "express",
        "docker",
        "kubernetes",
        "mongodb",
        "sql",
        "css",
        "html",
        "api"

    ];

    private reasoningKeywords = [

        "architecture",
        "design",
        "microservices",
        "distributed",
        "system design",
        "high availability",
        "load balancing",
        "scalability"

    ];

    public selectModel(

        prompt: string

    ): AIRouteResult {

        const input = prompt.toLowerCase();

        if (

            this.codingKeywords.some(

                keyword => input.includes(keyword)

            )

        ) {

            return {

                model: MODELS.CODING,

                reason: "Coding Request"

            };

        }

        if (

            this.reasoningKeywords.some(

                keyword => input.includes(keyword)

            )

        ) {

            return {

                model: MODELS.REASONING,

                reason: "Reasoning Request"

            };

        }

        return {

            model: MODELS.CHAT,

            reason: "General Chat"

        };

    }

}

export default new AIRouterService();
Step 9 — Update AI Service

Current

Controller

↓

Ollama Service

New

Controller

↓

AI Service

↓

AI Router

↓

Ollama Service

Example

import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";

class AIService {

    async chat(prompt: string) {

        const route = aiRouter.selectModel(prompt);

        console.log("Selected Model:", route.model);
        console.log("Reason:", route.reason);

        return ollamaService.chat(

            prompt,

            route.model

        );

    }

}

export default new AIService();
Step 10 — Controller

The controller no longer knows anything about models.

const result = await aiService.chat(

    req.body.prompt

);

res.json(result);

Notice there is no:

if(prompt.includes("docker"))

inside the controller.

That's the router's responsibility.

Step 11 — Logging

Very useful during development.

console.log("======================");
console.log("Prompt :", prompt);
console.log("Model  :", route.model);
console.log("Reason :", route.reason);
console.log("======================");

Console

======================

Prompt : Explain Docker Compose

Model : qwen2.5-coder:7b

Reason : Coding Request

======================
Step 12 — Test

Try these prompts:

Prompt	Selected Model
Who invented Java?	llama3.2:3b
Explain Docker	qwen2.5-coder:7b
Explain React Hooks	qwen2.5-coder:7b
Design Netflix Architecture	deepseek-r1:7b
Explain Microservices	deepseek-r1:7b
Tell me a joke	llama3.2:3b
Architecture After Milestone 4.4
Chrome Extension
        │
        ▼
AI Controller
        │
        ▼
AI Service
        │
        ▼
AI Router
        │
   ┌────┼──────────────┐
   ▼    ▼              ▼
Chat Coding      Reasoning
   │      │             │
   └──────┴─────────────┘
           │
           ▼
     Ollama Service
           │
           ▼
      Ollama API
           │
           ▼
      AI Response




This completes Milestone 4.4 with a clean, extensible architecture.

Next, we'll implement Milestone 4.5 – Streaming AI Responses, where we'll add:

streamChat() to the Ollama service
Server-Sent Events (SSE) endpoint
Streaming controller
Live token-by-token responses in the Chrome Extension
Proper cleanup and error handling

This will turn DevPilot AI into a ChatGPT-like real-time experience.