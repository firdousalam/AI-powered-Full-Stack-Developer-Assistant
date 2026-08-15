Milestone 5.4 – Tool Discovery
Objective

The goal of Milestone 5.4 is to make the AI system capable of discovering MCP tools dynamically instead of hard-coding individual tools such as:

analyzeDependencies
projectTree
analyzeProject
analyzeCodeStructure
readFile
listDirectory

When a new MCP server or tool is registered, the AI should automatically discover it without requiring changes to the AI service.

Architecture
                    ┌─────────────────────┐
                    │       Ollama        │
                    │     llama3.2:3b     │
                    └──────────┬──────────┘
                               │
                         Tool Definitions
                               │
                               ▼
                    ┌─────────────────────┐
                    │     AI Service      │
                    │  chatWithMCPTools() │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ MCP Orchestrator    │
                    │                     │
                    │ getTools()          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Tool Catalog      │
                    │                     │
                    │ getTools()          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Tool Discovery      │
                    │                     │
                    │ discoverTools()     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MCP Gateway      │
                    │                     │
                    │ discoverTools()     │
                    └──────────┬──────────┘
                               │
                  ┌────────────┼────────────┐
                  ▼            ▼            ▼
             Filesystem    Developer      Future
             MCP Server      Tools       MCP Servers
5.4.1 Gateway Tool Discovery

The MCP Gateway is responsible for discovering tools from all registered MCP servers.

Existing implementation:

public discoverTools(): MCPTool[] {

    return Array
        .from(this.servers.values())
        .flatMap(
            server => server.discoverTools()
        );

}

The important point is that the Gateway does not know individual tool names.

It simply asks every registered MCP server:

server.discoverTools()

and combines the results.

5.4.2 Tool Discovery Service

The Tool Discovery Service provides an abstraction between the Gateway and the orchestration layer.

import {
    gateway
} from "../../gateway";

import {
    MCPTool
} from "../../types";

export class McpToolDiscoveryService {

    public discoverTools(): MCPTool[] {

        return gateway.discoverTools();

    }

}

export const mcpToolDiscoveryService =
    new McpToolDiscoveryService();

This keeps the AI layer independent of the Gateway implementation.

5.4.3 Tool Catalog

The Tool Catalog converts discovered MCP tools into the format expected by the LLM.

import {
    mcpToolDiscoveryService
} from "../tool-discovery";

import {
    LLMToolDefinition
} from "../tool-schema";

export class ToolCatalogService {

    public getTools(): LLMToolDefinition[] {

        const tools =
            mcpToolDiscoveryService
                .discoverTools();

        return tools.map(tool => ({
            type: "function",

            function: {
                name: tool.name,

                description:
                    tool.description,

                parameters:
                    tool.inputSchema
            }
        }));

    }

}

export const toolCatalogService =
    new ToolCatalogService();

The important transformation is:

MCPTool
   ↓
LLMToolDefinition
   ↓
Ollama
5.4.4 MCP Orchestrator

The orchestrator should obtain tools from the Tool Catalog.

import type {
    LLMToolDefinition
} from "../tool-schema";

import {
    toolCatalogService
} from "../tool-catalog";

import {
    mcpToolExecutorService
} from "../tool-execution";

export class McpOrchestratorService {

    /**
     * Discover all available MCP tools.
     */
    public getTools(): LLMToolDefinition[] {

        return toolCatalogService.getTools();

    }

    /**
     * Execute an MCP tool.
     */
    public async executeTool(
        toolName: string,
        toolArguments: Record<string, unknown>
    ): Promise<unknown> {

        console.log(
            "========== MCP TOOL EXECUTION =========="
        );

        console.log(
            "Tool:",
            toolName
        );

        console.log(
            "Arguments:",
            toolArguments
        );

        const serverId =
            "filesystem";

        const result =
            await mcpToolExecutorService.execute(
                serverId,
                toolName,
                toolArguments
            );

        console.log(
            "========== MCP TOOL RESULT =========="
        );

        console.log(result);

        return result;
    }
}

export const mcpOrchestratorService =
    new McpOrchestratorService();
5.4.5 AI Service

The AI service should dynamically request tools.

Do not do this:

const tools = [
    "analyzeDependencies",
    "projectTree",
    "analyzeProject"
];

Instead:

const tools =
    mcpOrchestratorService.getTools();

Then:

return provider.chatWithTools(
    messages,
    route.model,
    tools
);

This means the AI service doesn't need to know which MCP tools exist.

5.4.6 Dynamic Discovery Test

Run the backend and call the tool discovery endpoint or temporary inspection function.

Example:

export async function inspectMCPTools() {

    const tools =
        mcpOrchestratorService.getTools();

    console.log(
        "========== MCP TOOLS =========="
    );

    console.log(
        tools.map(
            tool =>
                tool.function.name
        )
    );

    return tools;
}

Expected output:

========== MCP TOOLS ==========

[
    'readFile',
    'listDirectory',
    'fileExists',
    'fileMetadata',
    'readMultipleFiles',
    'searchFiles',
    'projectTree',
    'analyzeProject',
    'analyzeDependencies',
    'analyzeCodeStructure'
]
5.4.7 Dynamic Tool Addition Test

This is the most important test for Milestone 5.4.

Suppose you add a new MCP tool:

findUnusedDependencies

You should not modify:

ai.service.ts

You should not modify:

ollama.provider.ts

You should not manually add:

"findUnusedDependencies"

to the AI service.

After registering the tool with the MCP server, discovery should automatically produce:

[
    'readFile',
    'listDirectory',
    'fileExists',
    'fileMetadata',
    'readMultipleFiles',
    'searchFiles',
    'projectTree',
    'analyzeProject',
    'analyzeDependencies',
    'analyzeCodeStructure',
    'findUnusedDependencies'
]

This proves that tool discovery is truly dynamic.

5.4.8 Important Separation of Responsibilities

The architecture should remain:

AI Service
    │
    │ asks for tools
    ▼
MCP Orchestrator
    │
    │ discovers tools
    ▼
Tool Catalog
    │
    ▼
Tool Discovery
    │
    ▼
MCP Gateway
    │
    ├── Filesystem Server
    ├── Developer Tools Server
    └── Future MCP Servers

For execution:

AI
 │
 ▼
MCP Orchestrator
 │
 ▼
MCP Tool Executor
 │
 ▼
MCP Gateway
 │
 ▼
MCP Server
 │
 ▼
Developer Tool

This separation is important because the AI layer should never directly access:

FilesystemService
DeveloperTool
MCP Server
5.4.9 Milestone 5.4 Completion Criteria

Milestone 5.4 can be considered complete when all of the following are working:

 MCP Gateway exists
 MCP Gateway can discover tools
 MCP servers expose discoverTools()
 Tool Discovery Service exists
 Tool Catalog exists
 MCP Orchestrator exposes getTools()
 AI service obtains tools dynamically
 No individual tool names are hard-coded in the AI service
 Adding a new MCP tool automatically makes it available to the AI
 Tool discovery works with multiple MCP servers
 TypeScript compilation succeeds
 End-to-end discovery test succeeds
5.4.10 Current Project Status

Based on the code and logs we've tested:

Milestone	Status
5.1 MCP Introduction	✅ Complete
5.2 MCP Gateway	✅ Complete
5.3 Filesystem MCP Server	✅ Complete
5.4 Tool Discovery	🟡 Almost Complete
5.5 Tool Execution	🟡 In Progress
5.6 AI + MCP Orchestration	⏳ Next

The key thing still being completed is the full execution loop.

Currently Ollama can successfully produce:

{
  "tool_calls": [
    {
      "function": {
        "name": "analyzeDependencies",
        "arguments": {
          "workspacePath": "your workspace path"
        }
      }
    }
  ]
}

The final target is:

User
 ↓
Ollama
 ↓
Tool Call
 ↓
MCP Orchestrator
 ↓
MCP Tool Executor
 ↓
MCP Gateway
 ↓
MCP Server
 ↓
Developer Tool
 ↓
Real Tool Result
 ↓
Ollama
 ↓
Final AI Answer

Once this works, your project will have moved beyond a simple chatbot into a real MCP-enabled, project-aware AI developer assistant.