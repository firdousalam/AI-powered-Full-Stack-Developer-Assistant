Phase 5.3 — LLM Tool Calling

Before writing code, I want to inspect your current AI Service.

Please paste these files, preferably in this order:

1. AI Service

The main service that currently calls Ollama/OpenAI/Gemini, for example:

src/ai/ai.service.ts

or whatever your actual path is.

2. AI controller/API

The endpoint that receives the user's prompt:

src/ai/ai.controller.ts

or your equivalent.

3. Existing LLM provider/service

Especially the code containing something like:

fetch(...)
axios(...)
ollama.chat(...)

or:

openai.chat.completions.create(...)
4. Existing AI types

If you have files such as:

ai.types.ts
ai.interface.ts
chat.types.ts

paste those too.

What we are going to build

Your current flow is essentially:

User
  │
  ▼
AI API
  │
  ▼
AI Service
  │
  ▼
LLM
  │
  ▼
Answer

Phase 5.3 will evolve it into:

                         ┌──────────────────┐
                         │   Tool Catalog   │
                         │    10 tools      │
                         └────────┬─────────┘
                                  │
                                  ▼
User ──► AI Service ──► LLM
                         │
                         │ tool call
                         ▼
                  Tool Call Handler
                         │
                         ▼
                   MCP Gateway
                         │
                         ▼
                  Developer Tool
                         │
                         ▼
                    Tool Result
                         │
                         ▼
                       LLM
                         │
                         ▼
                   Final Answer

For example:

User:
"Why is my project using so many dependencies?"

The LLM receives the catalogue and decides:

{
  "tool": "analyzeDependencies",
  "arguments": {
    "workspacePath": "..."
  }
}

Then:

AI Service
    ↓
MCP Gateway.executeTool()
    ↓
Filesystem MCP Server
    ↓
analyzeDependencies
    ↓
DependencyAnalysisResult
    ↓
AI Service
    ↓
LLM
    ↓
Final answer
And importantly

We will not put this inside your LLM provider:

new DependencyAnalyzerService()

and we will not bypass:

MCP Gateway

The MCP architecture you've built remains intact.

One important design decision

Since you've been building this project around Ollama/local models, I want to see your current Ollama implementation before deciding exactly how to implement tool calling. Tool-calling support and request/response structure vary by the provider/model you're using.

So paste your current AI Service code first. I’ll adapt Phase 5.3 to your existing architecture rather than making you rewrite the AI layer.


Phase 5.3 architecture

I recommend we make the backend flow:

Chrome Extension
       │
       ▼
AIController
       │
       ▼
AIService
       │
       ├───────────────┐
       │               │
       ▼               ▼
 Tool Catalog         LLM
       │               │
       │               │
       │          tool_call?
       │               │
       │               ▼
       │        MCP Tool Executor
       │               │
       │               ▼
       │          MCP Gateway
       │               │
       │               ▼
       │        Developer Tool
       │               │
       │               ▼
       │          Tool Result
       │               │
       └───────────────┘
               │
               ▼
          Final LLM answer
But first: inspect your provider

The critical missing piece is your provider abstraction.

You currently have:

const provider =
    ProviderFactory.create(
        AI_CONFIG.provider
    );

and:

provider.streamChat(
    finalPrompt,
    route.model,
    onToken
);

We need to see whether your provider interface already supports:

messages
tools
tool calls

or whether we need to extend it.

Please paste these files next
1. Provider factory
src/providers/provider.factory.ts

You already showed that you're using:

ProviderFactory
2. Provider interface

Find the file containing something similar to:

interface AIProvider

or:

interface Provider

Paste that file.

3. Ollama provider

Find your Ollama implementation, likely:

src/providers/ollama.provider.ts

or similar.

This is especially important because you're using Ollama.

4. AI configuration

Also paste:

src/config/ai.config.ts
What I expect to change

We will probably evolve your provider contract from something like:

streamChat(
    prompt: string,
    model: string,
    onToken: (token: string) => void
)

toward something conceptually like:

chat(
    request: LLMRequest
): Promise<LLMResponse>

where:

interface LLMRequest {

    model: string;

    messages: LLMMessage[];

    tools?: LLMToolDefinition[];

}

But don't implement this yet.

I want to see your actual provider implementation first, because we should preserve your existing Ollama/OpenAI/Gemini architecture rather than breaking it.

Also, one correction in AIController

You currently have:

const response =
    await chatWithAI(
        prompt,
        '',
        model
    );

while the function signature is:

chatWithAI(
    prompt: string,
    model: string,
    browserContext: BrowserContext
)

So you're passing:

prompt         → prompt       ✅
''             → model        ⚠️
model          → browserContext ❌

This is another indication that the current chat path needs cleanup.

Your streaming path is much closer to the architecture we want.

Our immediate checkpoint

Don't implement MCP tool execution yet.

First paste:

src/providers/provider.factory.ts
src/providers/<provider-interface>.ts
src/providers/<ollama-provider>.ts
src/config/ai.config.ts

Then I'll give you the exact Phase 5.3 implementation that fits your existing provider architecture.

The important thing is that we now have a clean separation:

MCP
 ↓
MCPTool
 ↓
LLMToolDefinition
 ↓
Provider Adapter
 ↓
Ollama / OpenAI / Gemini

That will allow your same MCP tools to work regardless of which LLM provider you select.

export interface AIProvider {

    chat(

        prompt: string,

        model?: string

    ): Promise<string>;

    generate(

        prompt: string,

        model?: string

    ): Promise<string>;

    streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void>;

}


import { AIProvider } from "./ai-provider";

export class ollamaProvider implements AIProvider {

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

            const response = await fetch("http://localhost:11434/api/chat", {
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
            });


            if (!response.ok) {

                throw new Error(

                    Streaming Error : ${response.status}

                );

            }

            if (!response.body) {

                throw new Error(

                    "ReadableStream not available."

                );

            }

            const reader =
                response.body.getReader();

            const decoder =
                new TextDecoder("utf-8");

            try {

                while (true) {

                    const {

                        done,

                        value

                    } = await reader.read();

                    if (done) {

                        break;

                    }

                    const chunk = decoder.decode(

                        value,

                        {

                            stream: true

                        }

                    );

                    if (chunk) {


                        onToken(chunk);

                    }

                }

            }

            catch (error) {

                console.error(

                    "Streaming Error:",

                    error

                );

                throw error;

            }

            finally {

                reader.releaseLock();

            }

        }
        catch {

        }
    }
}



import { AIProviderType } from "../providers/provider.factory";

export const AI_CONFIG = {

    provider:

        (process.env.AI_PROVIDER as AIProviderType)

        ||

        AIProviderType.OLLAMA,

    enableFallback: true,

    fallbackProvider: AIProviderType.OLLAMA

};

export type AIProviderName =

    | "ollama"
    | "openai"
    | "gemini"
    | "claude";

Yes. Now that I can see your AI service, controller, provider abstraction, and Ollama provider, we can implement Phase 5.3 — LLM Tool Calling without breaking your existing architecture.

The important point is: do not put MCP logic directly into ollamaProvider. Keep the provider generic and introduce an orchestration layer between the AI service and provider.

Phase 5.3 architecture
Chrome Extension
       │
       ▼
   AIController
       │
       ▼
    AIService
       │
       ▼
 MCP Orchestrator
       │
       ├── Tool Catalog
       │
       ├── LLM Tool Schema
       │
       ├── Tool Selection
       │
       └── Tool Execution
                │
                ▼
          MCP Gateway
                │
                ▼
       Filesystem MCP Server
                │
                ▼
        Developer / FS Tools

The flow becomes:

User Prompt
    ↓
AI Service
    ↓
Get MCP tools
    ↓
Convert MCP tools → LLM schemas
    ↓
Send prompt + tools to LLM
    ↓
LLM decides whether tool is required
    ↓
Tool call
    ↓
MCP Gateway.executeTool()
    ↓
Tool result
    ↓
Send result back to LLM
    ↓
Final answer
Phase 5.3 — Files to create

I recommend this structure:

src/
└── mcp/
    └── orchestration/
        ├── tool-discovery/
        │
        ├── tool-catalog/
        │
        ├── tool-schema/
        │
        ├── tool-execution/
        │   └── mcpToolExecutor.service.ts
        │
        └── mcp-orchestrator/
            ├── mcpOrchestrator.service.ts
            └── index.ts

Your existing:

tool-discovery
tool-catalog
tool-schema

remain responsible for discovering and describing tools.

Now we add execution.

1. MCP Tool Executor

Create:

src/mcp/orchestration/tool-execution/mcpToolExecutor.service.ts
import gateway from "../../gateway";
import {
    ToolRequest,
    ToolResponse
} from "../../types";

export class McpToolExecutorService {

    /**
     * Execute an MCP tool through the gateway.
     *
     * The AI layer never directly accesses
     * DeveloperTool or FilesystemService.
     */
    public async execute(
        serverId: string,
        toolName: string,
        arguments_: Record<string, unknown>
    ): Promise<ToolResponse> {

        const request: ToolRequest = {

            serverId,

            toolName,

            arguments: arguments_

        };

        return gateway.executeTool(request);

    }

}

export const mcpToolExecutorService =
    new McpToolExecutorService();

This preserves the architecture:

AI
 ↓
Executor
 ↓
Gateway
 ↓
MCP Server
 ↓
Developer Tool
2. Export the executor

Create:

src/mcp/orchestration/tool-execution/index.ts
export {
    McpToolExecutorService,
    mcpToolExecutorService
} from "./mcpToolExecutor.service";
3. MCP Orchestrator

Now create:

src/mcp/orchestration/mcp-orchestrator/mcpOrchestrator.service.ts
import {
    mcpToolDiscoveryService
} from "../tool-discovery";

import {
    mcpToolSchemaAdapter
} from "../tool-schema";

import {
    mcpToolExecutorService
} from "../tool-execution";

import {
    LLMToolDefinition
} from "../tool-schema/llmTool.types";

import {
    ToolResponse
} from "../../types";

export interface MCPToolCall {

    serverId: string;

    toolName: string;

    arguments: Record<string, unknown>;

}

export class MCPOrchestratorService {

    /**
     * Discover MCP tools and convert them
     * into provider-independent LLM schemas.
     */
    public getTools(): LLMToolDefinition[] {

        const tools =
            mcpToolDiscoveryService.discoverTools();

        return tools.map(tool =>
            mcpToolSchemaAdapter.toLLMTool(tool)
        );

    }

    /**
     * Execute an LLM-generated tool call.
     */
    public async executeToolCall(
        toolCall: MCPToolCall
    ): Promise<ToolResponse> {

        return mcpToolExecutorService.execute(

            toolCall.serverId,

            toolCall.toolName,

            toolCall.arguments

        );

    }

}

export const mcpOrchestratorService =
    new MCPOrchestratorService();
4. One important correction

Your existing discovery service may not be exported as:

mcpToolDiscoveryService

Earlier you had this exact TypeScript issue:

McpToolDiscoveryService

versus:

mcpToolDiscoveryService

So make sure your:

src/mcp/orchestration/tool-discovery/index.ts

exports the singleton:

export {
    McpToolDiscoveryService,
    mcpToolDiscoveryService
} from "./mcpToolDiscovery.service";

And the service should contain:

export const mcpToolDiscoveryService =
    new McpToolDiscoveryService();
5. Orchestrator index

Create:

src/mcp/orchestration/mcp-orchestrator/index.ts
export {
    MCPOrchestratorService,
    mcpOrchestratorService
} from "./mcpOrchestrator.service";
6. Update the main orchestration index

If you have:

src/mcp/orchestration/index.ts

make it:

export * from "./tool-discovery";
export * from "./tool-catalog";
export * from "./tool-schema";
export * from "./tool-execution";
export * from "./mcp-orchestrator";
7. Extend AIProvider

This is the most important change.

Currently your provider only supports:

chat()
generate()
streamChat()

That means the LLM cannot receive tools.

Change:

src/providers/ai-provider.ts

to:

export interface AIProvider {

    chat(
        prompt: string,
        model?: string
    ): Promise<string>;

    generate(
        prompt: string,
        model?: string
    ): Promise<string>;

    streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void>;

}

Do not immediately add Ollama-specific types here.

Instead, introduce a provider-independent tool interface.

Create:

src/providers/ai-tool.types.ts
export interface AITool {

    type: "function";

    function: {

        name: string;

        description: string;

        parameters: Record<string, unknown>;

    };

}

Later OpenAI/Gemini/Ollama adapters can convert this if necessary.

8. Extend provider interface for tool calls

Change:

src/providers/ai-provider.ts

to:

import {
    AITool
} from "./ai-tool.types";

export interface AIToolCall {

    id: string;

    name: string;

    arguments: Record<string, unknown>;

}

export interface AIResponse {

    content?: string;

    toolCalls?: AIToolCall[];

}

export interface AIProvider {

    chat(

        prompt: string,

        model?: string

    ): Promise<string>;

    generate(

        prompt: string,

        model?: string

    ): Promise<string>;

    streamChat(

        prompt: string,

        model: string,

        onToken: (token: string) => void

    ): Promise<void>;

    chatWithTools(

        prompt: string,

        model: string,

        tools: AITool[]

    ): Promise<AIResponse>;

}

Now the MCP layer remains independent of Ollama.

9. Ollama provider

Your current Ollama implementation sends:

{
    model,
    stream: false,
    messages: [...]
}

For tool calling we need to send the tool catalogue as well.

Add this method to:

src/providers/ollama.provider.ts
import {
    AIProvider,
    AIResponse
} from "./ai-provider";

import {
    AITool
} from "./ai-tool.types";

Then:

async chatWithTools(

    prompt: string,

    model: string,

    tools: AITool[]

): Promise<AIResponse> {

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

                ],

                tools

            })

        }

    );

    if (!response.ok) {

        throw new Error(
            `Ollama tool request failed: ${response.status}`
        );

    }

    const data = await response.json();

    return {

        content:
            data.message?.content,

        toolCalls:
            data.message?.tool_calls ?? []

    };

}
10. But don't execute tools yet

This is important.

At Phase 5.3, don't immediately implement a giant recursive agent loop.

First verify:

User
 ↓
AI Service
 ↓
MCP Tool Discovery
 ↓
LLM
 ↓
tool_calls

We need to prove that Ollama actually returns something like:

{
    "message": {
        "tool_calls": [
            {
                "function": {
                    "name": "analyzeDependencies",
                    "arguments": {}
                }
            }
        ]
    }
}

Only after this works should we implement:

tool_call
   ↓
MCP Gateway
   ↓
tool result
   ↓
LLM

That keeps debugging manageable.

11. Add tool discovery to AI Service

Your current streamChat() does:

const finalPrompt =
    promptService.buildPrompt(
        prompt,
        browserContext
    );

For now, don't destroy that logic.

Add:

import {
    mcpOrchestratorService
} from "../mcp/orchestration";

Then:

const tools =
    mcpOrchestratorService.getTools();

console.log(
    "========== MCP TOOLS =========="
);

console.log(
    tools.map(tool =>
        tool.function.name
    )
);

At this stage you should see:

========== MCP TOOLS ==========

[
    "analyzeProject",
    "analyzeDependencies",
    "analyzeCodeStructure",
    "readFile",
    "listDirectory",
    "fileExists",
    "fileMetadata",
    "readMultipleFiles",
    "searchFiles",
    "projectTree"
]

That's our first major checkpoint.

12. Don't modify streamChat() yet

Because your current streaming implementation is:

Ollama
 ↓
stream
 ↓
token
 ↓
Chrome Extension

Tool calling introduces a different lifecycle:

Ollama
 ↓
tool call
 ↓
MCP
 ↓
tool result
 ↓
Ollama
 ↓
final answer
 ↓
stream

So don't mix those two flows yet.

Create a separate method first:

export async function chatWithMCPTools(
    prompt: string,
    model: string,
    browserContext: BrowserContext
) {

    const finalPrompt =
        promptService.buildPrompt(
            prompt,
            browserContext
        );

    const tools =
        mcpOrchestratorService.getTools();

    const route =
        aiRouter.selectModel(
            model ?? prompt
        );

    const provider =
        ProviderFactory.create(
            AI_CONFIG.provider
        );

    return provider.chatWithTools(
        finalPrompt,
        route.model,
        tools
    );

}

This gives us a clean experimental path.

13. Add temporary controller endpoint

In your AIController add:

async chatWithTools(
    req: Request,
    res: Response
) {

    try {

        const {
            prompt,
            model,
            browserContext
        } = req.body;

        const response =
            await chatWithMCPTools(
                prompt,
                model,
                browserContext
            );

        res.json({

            success: true,

            response

        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "MCP tool chat failed"

        });

    }

}

And import:

import {
    chatWithMCPTools
} from "../services/ai.service";
14. One existing bug I noticed

Your current controller contains:

const response =
    await chatWithAI(
        prompt,
        '',
        model
    );

But your service signature is:

chatWithAI(
    prompt: string,
    model: string,
    browserContext: BrowserContext
)

So currently you're passing:

prompt
''
model

instead of:

prompt
model
browserContext

It should be:

const response =
    await chatWithAI(
        prompt,
        model,
        browserContext
    );

This is unrelated to MCP, but we should fix it before continuing because otherwise debugging the AI/MCP flow becomes confusing.

15. Phase 5.3 checkpoint

After implementing the above, run:

npx tsc --noEmit

Then start the backend and test:

Why is my project using so many dependencies?

The first expected result is not yet a final intelligent answer.

We want to see:

MCP TOOLS

analyzeProject
analyzeDependencies
analyzeCodeStructure
readFile
listDirectory
fileExists
fileMetadata
readMultipleFiles
searchFiles
projectTree

Then, when the LLM supports the supplied tool schema, we want:

LLM
 ↓
tool_calls
 ↓
analyzeDependencies

Only after that checkpoint will we implement Phase 5.4 — MCP Tool Execution Loop:

User
 ↓
LLM
 ↓
tool_call
 ↓
MCP Orchestrator
 ↓
MCP Gateway.executeTool()
 ↓
Developer Tool
 ↓
structured result
 ↓
LLM
 ↓
final answer

That is the point where your project becomes a genuine MCP-powered AI developer assistant, rather than simply exposing MCP tools.