Phase 5.2 — LLM Tool Schema Adapter
Target architecture
MCP Gateway
     │
     │ MCPTool[]
     ▼
McpToolDiscoveryService
     │
     ▼
LLM Tool Schema Adapter
     │
     ▼
LLM-neutral ToolDefinition[]
     │
     ├──────────────┐
     ▼              ▼
   Ollama        OpenAI
                    │
                    ▼
                  Gemini

The key rule is:

Do not put OpenAI/Ollama/Gemini-specific code inside the MCP Gateway.

1. First inspect your MCPTool

You already have:

MCPTool

from:

src/mcp/types

Based on your current tools, it appears to contain approximately:

interface MCPTool {

    name: string;

    description: string;

    inputSchema: Record<string, unknown>;

    execute: Function;

}

We should not pass execute to the LLM.

The LLM only needs:

name
description
inputSchema
2. Create the neutral LLM tool model

Create:

src/mcp/orchestration/tool-schema/

Then create:

src/mcp/orchestration/tool-schema/llmTool.types.ts
/**
 * Provider-neutral tool definition.
 *
 * This structure intentionally contains no
 * OpenAI, Ollama, Gemini, Anthropic, etc.
 * specific fields.
 */
export interface LLMToolDefinition {

    name: string;

    description: string;

    parameters: Record<string, unknown>;

}

This is the contract between your MCP system and the LLM integration layer.

3. Create the adapter

Create:

src/mcp/orchestration/tool-schema/mcpToolSchema.adapter.ts
import {
    MCPTool
} from "../../types";

import {
    LLMToolDefinition
} from "./llmTool.types";


export class MCPToolSchemaAdapter {

    /**
     * Convert one MCP tool into a
     * provider-neutral LLM tool definition.
     */
    public adapt(
        tool: MCPTool
    ): LLMToolDefinition {

        return {

            name:
                tool.name,

            description:
                tool.description,

            parameters:
                tool.inputSchema

        };

    }


    /**
     * Convert multiple MCP tools.
     */
    public adaptMany(
        tools: MCPTool[]
    ): LLMToolDefinition[] {

        return tools.map(
            tool => this.adapt(tool)
        );

    }

}

That's intentionally simple.

The adapter's responsibility is transformation, not execution.

4. Create the orchestration export

Create:

src/mcp/orchestration/tool-schema/index.ts
export {
    MCPToolSchemaAdapter
} from "./mcpToolSchema.adapter";

export type {
    LLMToolDefinition
} from "./llmTool.types";
5. Create a combined discovery + schema service

Now we can connect Phase 5.1 and Phase 5.2.

Create:

src/mcp/orchestration/tool-catalog/
toolCatalog.service.ts
import {
    mcpToolDiscoveryService
} from "../tool-discovery";

import {
    MCPToolSchemaAdapter
} from "../tool-schema";

import {
    LLMToolDefinition
} from "../tool-schema";


export class ToolCatalogService {

    private readonly adapter =
        new MCPToolSchemaAdapter();


    /**
     * Return all MCP tools as
     * provider-neutral LLM tools.
     */
    public getTools(): LLMToolDefinition[] {

        const mcpTools =
            mcpToolDiscoveryService
                .discoverTools();

        return this.adapter.adaptMany(
            mcpTools
        );

    }

}

Create:

src/mcp/orchestration/tool-catalog/index.ts
import {
    ToolCatalogService
} from "./toolCatalog.service";


export const toolCatalogService =
    new ToolCatalogService();


export {
    ToolCatalogService
};
6. Your directory now looks like
src/mcp/
│
├── gateway/
│
├── servers/
│
├── orchestration/
│   │
│   ├── index.ts
│   │
│   ├── tool-discovery/
│   │   ├── index.ts
│   │   ├── mcpToolDiscovery.service.ts
│   │   └── toolDiscovery.types.ts
│   │
│   ├── tool-schema/
│   │   ├── index.ts
│   │   ├── llmTool.types.ts
│   │   └── mcpToolSchema.adapter.ts
│   │
│   └── tool-catalog/
│       ├── index.ts
│       └── toolCatalog.service.ts
7. Test the adapter

Temporarily in your server startup:

import {
    toolCatalogService
} from "./mcp/orchestration/tool-catalog";

Then:

const tools =
    toolCatalogService.getTools();

console.log(
    "========== LLM TOOL CATALOG =========="
);

console.log(
    JSON.stringify(
        tools,
        null,
        2
    )
);

You should see something like:

[
  {
    "name": "readFile",
    "description": "Read the contents of a file.",
    "parameters": {
      "type": "object",
      "properties": {
        "path": {
          "type": "string"
        }
      },
      "required": [
        "path"
      ]
    }
  },
  {
    "name": "analyzeDependencies",
    "description": "Analyzes project dependencies...",
    "parameters": {
      "type": "object",
      "properties": {
        "workspacePath": {
          "type": "string"
        }
      }
    }
  }
]
8. Why parameters instead of inputSchema?

This is deliberate.

Your MCP layer uses:

inputSchema

while our provider-neutral AI layer uses:

parameters

This gives us an abstraction boundary.

For example, later an OpenAI adapter can transform:

{
    name: "analyzeDependencies",
    description: "...",
    parameters: {...}
}

into its required structure.

An Ollama adapter can transform the same object into Ollama's structure.

A Gemini adapter can transform it independently.

So:

                 LLMToolDefinition
                        │
              ┌─────────┼─────────┐
              ▼         ▼         ▼
           Ollama     OpenAI    Gemini
           Adapter    Adapter   Adapter

The MCP system doesn't change.

9. Don't execute anything yet

This distinction is extremely important.

Currently:

User
 ↓
AI Service
 ↓
Tool Catalog
 ↓
LLM

We are only giving the LLM descriptions of tools.

There should be no:

gateway.executeTool(...)

inside the adapter.

The eventual flow will be:

User
  ↓
AI Service
  ↓
LLM
  │
  │ tool_call
  ▼
MCP Tool Executor
  ↓
MCP Gateway
  ↓
Developer Tool
  ↓
Result
  ↓
LLM
  ↓
Final Answer

That comes in the next phase.

10. Checkpoint

Run:

npx tsc --noEmit

Then verify:

LLM TOOL CATALOG

contains:

readFile
listDirectory
fileExists
fileMetadata
readMultipleFiles
searchFiles
projectTree
analyzeDependencies
analyzeProject
analyzeCodeStructure

10 tools.

One improvement before Phase 5.3

I would not create separate OllamaToolAdapter, OpenAIToolAdapter, and GeminiToolAdapter yet.

First establish this contract:

LLMToolDefinition

Then we can inspect your existing AI service and determine which provider you're currently using.

Phase 5.3 will be:
LLMToolDefinition[]
        ↓
AI Service
        ↓
LLM
        ↓
tool_calls
        ↓
ToolCallParser
        ↓
MCP Gateway.executeTool()

That is the point where your assistant moves from "AI knows about MCP tools" to "AI can autonomously request MCP tools."

npx tsc --noEmit
src/mcp/orchestration/tool-schema/mcpToolSchema.adapter.ts:28:13 - error TS2322: Type '{ type: string; properties: Record<string, unknown>; required?: string[] | undefined; } | undefined' is not assignable to type 'Record<string, unknown>'.
  Type 'undefined' is not assignable to type 'Record<string, unknown>'.

28             parameters:
               ~~~~~~~~~~

  src/mcp/orchestration/tool-schema/llmTool.types.ts:14:5 - The expected type comes from property 'parameters' which is declared here on type 'LLMToolDefinition'
    14     parameters: Record<string, unknown>;
           ~~~~~~~~~~


Found 1 error in src/mcp/orchestration/tool-schema/mcpToolSchema.adapter.ts:28

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Yes, this is a straightforward type mismatch. Your MCPTool.inputSchema is optional, while LLMToolDefinition.parameters is currently required.

I recommend making the adapter normalize a missing schema to an empty object rather than using a type assertion.

Fix

File:

src/mcp/orchestration/tool-schema/mcpToolSchema.adapter.ts

Replace:

parameters:
    tool.inputSchema

with:

parameters:
    tool.inputSchema ?? {}

So the complete adapter becomes:

import {
    MCPTool
} from "../../types";

import {
    LLMToolDefinition
} from "./llmTool.types";

export class MCPToolSchemaAdapter {

    /**
     * Convert one MCP tool into a
     * provider-neutral LLM tool definition.
     */
    public adapt(
        tool: MCPTool
    ): LLMToolDefinition {

        return {

            name:
                tool.name,

            description:
                tool.description,

            parameters:
                tool.inputSchema ?? {}

        };

    }

    /**
     * Convert multiple MCP tools.
     */
    public adaptMany(
        tools: MCPTool[]
    ): LLMToolDefinition[] {

        return tools.map(
            tool => this.adapt(tool)
        );

    }

}
Why this is the right fix

Your MCP tool can apparently have:

inputSchema?: {
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
}

Therefore this:

tool.inputSchema

can be:

undefined

But our AI abstraction says:

parameters: Record<string, unknown>;

So:

tool.inputSchema ?? {}

guarantees that parameters is always an object.

Now run
npx tsc --noEmit

If it passes, test the catalog and verify that you get the 10 tools.

Don't change the MCP Gateway for this error. The problem is correctly isolated to the MCP → LLM schema adapter.

After this checkpoint, we can move to Phase 5.3 — LLM Tool Calling, where we connect the tool catalogue to your existing AI service.

npx tsc --noEmit
src/mcp/orchestration/tool-catalog/toolCatalog.service.ts:2:5 - error TS2724: '"../tool-discovery"' has no exported member named 'mcpToolDiscoveryService'. Did you mean 'McpToolDiscoveryService'?

2     mcpToolDiscoveryService
      ~~~~~~~~~~~~~~~~~~~~~~~

  src/mcp/orchestration/tool-discovery/mcpToolDiscovery.service.ts:6:14 - 'McpToolDiscoveryService' is declared here.
    6 export class McpToolDiscoveryService {
                   ~~~~~~~~~~~~~~~~~~~~~~~


Found 1 error in src/mcp/orchestration/tool-catalog/toolCatalog.service.ts:2

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Correct. This is an export mismatch, not a Gateway problem.

Your mcpToolDiscovery.service.ts exports the class:

export class McpToolDiscoveryService

but toolCatalog.service.ts is trying to import the singleton:

mcpToolDiscoveryService

Let's fix the export cleanly.

1. Update tool-discovery/index.ts

File:

src/mcp/orchestration/tool-discovery/index.ts

Use:

import {
    McpToolDiscoveryService
} from "./mcpToolDiscovery.service";

export const mcpToolDiscoveryService =
    new McpToolDiscoveryService();

export {
    McpToolDiscoveryService
};

export type {
    DiscoveredTool
} from "./toolDiscovery.types";

If you don't currently have DiscoveredTool, remove that last export.

2. Keep mcpToolDiscovery.service.ts as

File:

src/mcp/orchestration/tool-discovery/mcpToolDiscovery.service.ts
import gateway from "../../gateway";

import {
    MCPTool
} from "../../types";

export class McpToolDiscoveryService {

    public discoverTools(): MCPTool[] {

        return gateway.discoverTools();

    }

    public discoverServerTools(
        serverId: string
    ): MCPTool[] {

        return gateway.discoverServerTools(
            serverId
        );

    }

}
3. Your toolCatalog.service.ts can now remain

File:

src/mcp/orchestration/tool-catalog/toolCatalog.service.ts
import {
    mcpToolDiscoveryService
} from "../tool-discovery";

import {
    MCPToolSchemaAdapter
} from "../tool-schema";

import {
    LLMToolDefinition
} from "../tool-schema";

export class ToolCatalogService {

    private readonly adapter =
        new MCPToolSchemaAdapter();

    public getTools(): LLMToolDefinition[] {

        const mcpTools =
            mcpToolDiscoveryService
                .discoverTools();

        return this.adapter.adaptMany(
            mcpTools
        );

    }

}
4. Run the checkpoint
npx tsc --noEmit

You should now get a clean compilation.

Then test:

const tools =
    toolCatalogService.getTools();

console.log(
    tools.map(tool => tool.name)
);

console.log(
    "Total MCP Tools:",
    tools.length
);

Expected:

[
  'readFile',
  'listDirectory',
  'fileExists',
  'fileMetadata',
  'readMultipleFiles',
  'searchFiles',
  'projectTree',
  'analyzeDependencies',
  'analyzeProject',
  'analyzeCodeStructure'
]

Total MCP Tools: 10

Don't move to tool execution yet. Once tsc passes and the 10-tool catalogue is confirmed, Phase 5.2 is complete and we can inspect your existing AI service before implementing Phase 5.3.