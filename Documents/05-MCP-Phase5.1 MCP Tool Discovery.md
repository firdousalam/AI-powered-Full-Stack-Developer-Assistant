For Phase 5.1, keep it small: do not touch LLM tool-calling yet.

Your current architecture already has the important part:

AI Service
    ↓
MCP Gateway
    ↓
Filesystem MCP Server
    ↓
10 registered tools

We now need a clean discovery API between the AI Service and Gateway.

1. First inspect your existing discoverTools()

Your Gateway should already have something similar to:

src/mcp/gateway/

and a method:

discoverTools()

The important thing is that it should return metadata, not the actual execute() functions.

The AI Service should receive:

[
    {
        name: "readFile",
        description: "Read the contents of a file.",
        inputSchema: {...}
    },
    ...
]
2. Create the discovery type

Create:

src/mcp/orchestration/tool-discovery/toolDiscovery.types.ts
export interface DiscoveredTool {

    name: string;

    description: string;

    inputSchema?: Record<string, unknown>;

}

This gives the AI layer a clean contract.

3. Create McpToolDiscoveryService

Create:

src/mcp/orchestration/tool-discovery/mcpToolDiscovery.service.ts
import { gateway } from "../../gateway";
import {
    DiscoveredTool
} from "./toolDiscovery.types";

export class McpToolDiscoveryService {

    /**
     * Discover all tools registered
     * in the MCP Gateway.
     */
    public discoverTools(): DiscoveredTool[] {

        const tools =
            gateway.discoverTools();

        return tools.map(tool => ({

            name:
                tool.name,

            description:
                tool.description,

            inputSchema:
                tool.inputSchema

        }));

    }

}
Important

Do not pass the tool's execute function to the AI Service.

The AI needs metadata:

name
description
inputSchema

It does not need:

execute()

Execution will remain the responsibility of the MCP Gateway.

4. Add an index file

Create:

src/mcp/orchestration/tool-discovery/index.ts
export * from "./mcpToolDiscovery.service";

export * from "./toolDiscovery.types";
5. Create the singleton

If your project uses singleton services, create:

src/mcp/orchestration/index.ts
import {
    McpToolDiscoveryService
} from "./tool-discovery";

export const mcpToolDiscoveryService =
    new McpToolDiscoveryService();

export * from "./tool-discovery";

Your structure becomes:

src/mcp/
│
├── gateway/
│
├── servers/
│
└── orchestration/
    │
    ├── index.ts
    │
    └── tool-discovery/
        ├── index.ts
        ├── mcpToolDiscovery.service.ts
        └── toolDiscovery.types.ts
6. Test discovery before connecting AI

Temporarily add this to your server startup.

For example in:

src/server.ts

or wherever you currently test your MCP infrastructure.

Import:

import {
    mcpToolDiscoveryService
} from "./mcp/orchestration";

Then after:

await bootstrap.initialize();

run:

const tools =
    mcpToolDiscoveryService.discoverTools();

console.log(
    "========== MCP TOOL DISCOVERY =========="
);

console.log(
    JSON.stringify(
        tools,
        null,
        2
    )
);

console.log(
    "Total MCP Tools:",
    tools.length
);
7. Expected result

You should get approximately:

========== MCP TOOL DISCOVERY ==========

[
  {
    "name": "readFile",
    "description": "Read the contents of a file.",
    "inputSchema": {...}
  },
  {
    "name": "listDirectory",
    "description": "List files and folders.",
    "inputSchema": {...}
  },
  {
    "name": "fileExists",
    "description": "Check whether a file exists.",
    "inputSchema": {...}
  },
  {
    "name": "fileMetadata",
    "description": "Retrieve file metadata.",
    "inputSchema": {...}
  },
  {
    "name": "readMultipleFiles",
    "description": "Read multiple files.",
    "inputSchema": {...}
  },
  {
    "name": "searchFiles",
    "description": "Search files by name.",
    "inputSchema": {...}
  },
  {
    "name": "projectTree",
    "description": "Generate project tree.",
    "inputSchema": {...}
  },
  {
    "name": "analyzeDependencies",
    "description": "...",
    "inputSchema": {...}
  },
  {
    "name": "analyzeProject",
    "description": "...",
    "inputSchema": {...}
  },
  {
    "name": "analyzeCodeStructure",
    "description": "...",
    "inputSchema": {...}
  }
]

Total MCP Tools: 10

The order doesn't matter.

8. Important correction about the 10 tools

You currently have:

Filesystem tools
7
readFile
listDirectory
fileExists
fileMetadata
readMultipleFiles
searchFiles
projectTree
Developer tools
3
analyzeProject
analyzeDependencies
analyzeCodeStructure

Therefore:

7 + 3 = 10

But don't put this anywhere as:

const TOTAL_TOOLS = 10;

Always use:

tools.length

because later you may add:

analyzeSecurity
analyzePerformance
analyzeApis
analyzeTests
analyzeDocker
analyzeKubernetes

and discovery will automatically include them.

9. Very important architectural rule

At this stage:

AI Service
     │
     │ discover
     ▼
MCP Gateway
     │
     ▼
Tool metadata

NOT:

AI Service
     │
     ▼
DeveloperTool
     │
     ▼
execute()

The AI Service should never know about:

DependencyAnalyzerService
CodeStructureAnalyzerService
ProjectAnalyzerService
FilesystemService

It only knows:

interface DiscoveredTool {

    name: string;

    description: string;

    inputSchema?: Record<string, unknown>;

}

That separation will become extremely important when we add LLM tool calling.

10. Compile checkpoint

Run:

npx tsc --noEmit

Then start the backend:

npm run dev

and verify:

Total MCP Tools: 10

Also verify that these three appear:

analyzeProject
analyzeDependencies
analyzeCodeStructure
Phase 5.1 completion criteria

We should consider Phase 5.1 complete only when this works:

AI-facing Discovery Service
          │
          ▼
    MCP Gateway
          │
          ▼
 discoverTools()
          │
          ▼
      10 tools

And no tool has been executed by the AI yet.

Once you get the discovery output, the next step is Phase 5.2 — converting these discovered tools into the native tool/function-calling format of your LLM provider. That is where the LLM will finally be able to say, in effect, “I need analyzeDependencies before I answer.”

1. import { registry } from "../registry";
import { logger } from "../logger";

import {
    MCPServer,
    MCPTool,
    ToolRequest,
    ToolResponse
} from "../types";

class MCPGateway {

    /**
     * Register a new MCP Server
     */
    public registerServer(
        server: MCPServer
    ): void {

        registry.register(server);

        logger.info(
            Gateway registered server: ${server.name}
        );

    }

    /**
     * Connect Server
     */
    public async connect(
        serverId: string
    ): Promise<boolean> {

        const server = registry.get(serverId);

        if (!server) {

            logger.error(
                Server '${serverId}' not found.
            );

            return false;

        }

        await server.connect();

        logger.info(
            ${server.name} connected.
        );

        return true;

    }

    /**
     * Disconnect Server
     */
    public async disconnect(
        serverId: string
    ): Promise<boolean> {

        const server = registry.get(serverId);

        if (!server) {

            logger.warn(
                Server '${serverId}' not found.
            );

            return false;

        }

        await server.disconnect();

        logger.info(
            ${server.name} disconnected.
        );

        return true;

    }

    /**
     * Execute Tool
     */
    public async executeTool(
        request: ToolRequest
    ): Promise<ToolResponse> {

        const server = registry.get(
            request.serverId
        );

        if (!server) {

            return {

                success: false,

                error: Server '${request.serverId}' not found.

            };

        }

        logger.info(
            Executing '${request.toolName}' on '${server.name}'.
        );

        return await server.executeTool(request);

    }

    /**
     * Discover All Tools
     */
    public discoverTools(): MCPTool[] {

        return registry
            .getAll()
            .flatMap(server => server.discoverTools());

    }

    /**
     * Discover Tools for a Specific Server
     */
    public discoverServerTools(
        serverId: string
    ): MCPTool[] {

        const server = registry.get(serverId);

        if (!server) {
            return [];
        }

        return server.discoverTools();

    }

    /**
     * Health Check
     */
    public async healthCheck() {

        const servers = registry.getAll();

        return Promise.all(

            servers.map(async (server) => ({

                id: server.id,

                name: server.name,

                version: server.version,

                status: server.status,

                health: await server.healthCheck()

            }))

        );

    }

    /**
     * List Registered Servers
     */
    public getServers(): MCPServer[] {

        return registry.getAll();

    }

    /**
     * Get Server
     */
    public getServer(
        serverId: string
    ): MCPServer | undefined {

        return registry.get(serverId);

    }

    /**
     * Check Registration
     */
    public hasServer(
        serverId: string
    ): boolean {

        return registry.has(serverId);

    }

}

export default new MCPGateway();

Yes — your MCPGateway is already correctly designed for Phase 5.1. You do not need to modify discoverTools().

Your existing method:

public discoverTools(): MCPTool[] {

    return registry
        .getAll()
        .flatMap(server => server.discoverTools());

}

already gives us exactly what we need.

One important point

Your gateway returns MCPTool[], so before creating another abstraction, let's use your existing type. We should avoid introducing a duplicate DiscoveredTool model unless the AI layer actually needs a transformed format.

Recommended Phase 5.1 implementation

Create:

src/mcp/orchestration/tool-discovery/
├── mcpToolDiscovery.service.ts
└── index.ts
mcpToolDiscovery.service.ts
import gateway from "../../gateway";

import {
    MCPTool
} from "../../types";

export class McpToolDiscoveryService {

    /**
     * Discover all tools registered
     * with the MCP Gateway.
     */
    public discoverTools(): MCPTool[] {

        return gateway.discoverTools();

    }

    /**
     * Discover tools belonging
     * to a specific MCP server.
     */
    public discoverServerTools(
        serverId: string
    ): MCPTool[] {

        return gateway.discoverServerTools(
            serverId
        );

    }

}
index.ts
import {
    McpToolDiscoveryService
} from "./mcpToolDiscovery.service";

export const mcpToolDiscoveryService =
    new McpToolDiscoveryService();

export {
    McpToolDiscoveryService
};
Then test it

Temporarily in your server startup:

import {
    mcpToolDiscoveryService
} from "./mcp/orchestration/tool-discovery";

After:

await bootstrap.initialize();

add:

const tools =
    mcpToolDiscoveryService.discoverTools();

console.log(
    "========== MCP TOOL DISCOVERY =========="
);

console.log(
    tools.map(tool => tool.name)
);

console.log(
    "Total MCP Tools:",
    tools.length
);

You should get:

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
Why this is better

We now have a clean boundary:

                    AI Service
                        │
                        ▼
             McpToolDiscoveryService
                        │
                        ▼
                  MCP Gateway
                        │
                        ▼
                 registry.getAll()
                        │
                        ▼
                 MCP Server(s)
                        │
                        ▼
                    MCP Tools

And the AI Service doesn't need to know about the registry or filesystem server.

Don't modify this

Your existing Gateway method is already good:

public discoverTools(): MCPTool[] {

    return registry
        .getAll()
        .flatMap(server => server.discoverTools());

}

Keep it as-is.

Now run:

npx tsc --noEmit

and then test the discovery output.

Once that returns all 10 tools, we're ready for Phase 5.2 — LLM Tool Schema Adapter, where we convert your MCPTool objects into the tool format expected by Ollama/OpenAI/Gemini without coupling the MCP layer to a specific LLM provider.