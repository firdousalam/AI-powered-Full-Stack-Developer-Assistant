# 📚 Milestone 5.3 – Phase 2: Filesystem MCP Server Integration

## 🎯 Objective

In Phase 1, we successfully built the complete **Filesystem MCP module**, including the server, service layer, tools, types, and supporting infrastructure.

However, these components currently exist as standalone modules and are **not yet integrated into the application's runtime**.

The goal of **Phase 2** is to connect the Filesystem MCP Server with the existing MCP infrastructure so that it becomes fully operational and accessible through the AI-powered Full Stack Developer Assistant.

---

# 📌 What We Will Build

By the end of this phase, the application will be able to:

- Register the Filesystem MCP Server during application startup
- Connect the server to the MCP Gateway
- Add the server to the Server Registry
- Automatically discover available filesystem tools
- Execute filesystem tools through the Gateway
- Verify end-to-end MCP communication
- Prepare the AI Service for MCP-powered context retrieval

---

# 🏗 Current Architecture

At the moment, the Filesystem module exists independently.

```text
Filesystem Service
        │
        ▼
Filesystem Tools
        │
        ▼
Filesystem Server

(Not connected)
```

Although all components are implemented, the backend is still communicating directly with the LLM.

```text
Chrome Extension
        │
        ▼
Express API
        │
        ▼
AI Service
        │
        ▼
LLM
```

The MCP infrastructure is available but is not yet participating in request processing.

---

# 🚀 Target Architecture

After integration, the application architecture will become:

```text
Chrome Extension
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
MCP Gateway
        │
 ┌──────┼───────────────┐
 ▼      ▼               ▼
Filesystem  GitHub   Docker
        │
        ▼
Local Workspace
```

The AI Service will no longer access developer tools directly. Instead, every MCP-enabled capability will be routed through the centralized Gateway.

---

# 📚 Part 1 – Bootstrap Integration

The first step is integrating the Filesystem MCP Server during application startup.

During application initialization we will:

- Create the Filesystem MCP Server
- Initialize the server
- Register it with the Server Registry
- Register it with the MCP Gateway
- Verify successful startup

Application startup will become:

```text
Application Start
        │
        ▼
Bootstrap
        │
        ▼
Initialize Gateway
        │
        ▼
Create Filesystem Server
        │
        ▼
Register Server
        │
        ▼
Connect Server
        │
        ▼
Application Ready
```

# 📚 Part 1 – Bootstrap Integration

## 🎯 Objective

The first step in completing **Milestone 5.3 – Phase 2** is integrating the **Filesystem MCP Server** into the application's startup process.

In Phase 1, we built the complete Filesystem MCP module, but it currently exists as an independent component. During application startup, we need to initialize the MCP infrastructure and register the Filesystem Server so that it becomes available for tool discovery and execution.

After this step, the Filesystem MCP Server will be a fully managed component of the backend instead of a standalone module.

---

# 🏗 Why Bootstrap Integration?

Modern applications should initialize all required services during startup rather than creating them on demand.

Bootstrapping provides several benefits:

- Ensures all MCP servers are available before handling requests
- Centralizes initialization logic
- Validates configuration early
- Detects startup failures immediately
- Simplifies future server registration
- Provides a single entry point for all MCP infrastructure

As the project grows to include GitHub, Docker, Kubernetes, PostgreSQL, MongoDB, Redis, AWS, and Azure MCP servers, the bootstrap process will initialize each server automatically.

---

# 🚀 Responsibilities

During application startup, the bootstrap process will:

- Create the MCP Gateway
- Initialize the Server Registry
- Create the Filesystem MCP Server
- Register the server with the Registry
- Register the server with the Gateway
- Establish the server connection
- Verify server health
- Log successful initialization

At the end of the startup process, the backend will be ready to execute filesystem tools through the Gateway.

---

# 📂 Startup Flow

The application startup sequence will become:

```text
Application Start
        │
        ▼
Bootstrap
        │
        ▼
Initialize Gateway
        │
        ▼
Create Filesystem Server
        │
        ▼
Register Server
        │
        ▼
Connect Server
        │
        ▼
Application Ready
```

Each step prepares the infrastructure for the next one, ensuring that all MCP components are initialized in the correct order.

---

# 🔄 Detailed Initialization Flow

The bootstrap process performs the following sequence:

```text
Start Application
        │
        ▼
Load Environment Configuration
        │
        ▼
Create Gateway
        │
        ▼
Create Server Registry
        │
        ▼
Create Filesystem Service
        │
        ▼
Create Filesystem Tools
        │
        ▼
Create Filesystem Server
        │
        ▼
Register Server
        │
        ▼
Connect Server
        │
        ▼
Run Health Check
        │
        ▼
Ready to Accept Requests
```

This initialization sequence ensures that all dependencies are available before the application begins processing user requests.

---

# 🧩 Components Involved

Several components work together during bootstrap:

## MCP Gateway

Acts as the central communication layer responsible for routing tool execution requests to the appropriate MCP Server.

---

## Server Registry

Maintains information about every registered MCP Server, including server metadata, available tools, and current connection status.

---

## Filesystem Service

Provides the business logic for interacting with the local workspace, including file reading, directory listing, metadata retrieval, and path validation.

---

## Filesystem Tools

Defines the collection of MCP tools exposed by the Filesystem Server, including their descriptions, input schemas, and execution logic.

---

## Filesystem MCP Server

Coordinates tool registration, request handling, response generation, logging, and communication with the service layer.

---

# 📌 Registration Process

During initialization, the Filesystem Server is registered with both the Registry and the Gateway.

```text
Filesystem Server
        │
        ├──────────────► Server Registry
        │
        └──────────────► MCP Gateway
```

The Registry keeps track of the server, while the Gateway enables tool discovery and execution.

---

# 🔍 Validation During Startup

The bootstrap process should verify that:

- The workspace directory exists
- Configuration values are valid
- The Filesystem Server initializes successfully
- All tools are registered correctly
- The server can establish a connection
- The health check passes

If any of these steps fail, the application should log the error and prevent incomplete initialization.

---

# 📊 Expected Result

After completing bootstrap integration:

- The Filesystem MCP Server is initialized automatically.
- The server is registered with the Server Registry.
- The Gateway can discover filesystem tools.
- The server reports a healthy status.
- The backend is ready to process MCP tool requests.

---
# Bootstrap.ts

```ts
import gateway from "../gateway";
import { registry } from "../registry";
import { healthMonitor } from "../health";
import { logger } from "../logger";

import {
    FilesystemServer,
    FilesystemService,
    FilesystemTools
} from "../servers/filesystem";

class MCPBootstrap {

    private filesystemServer?: FilesystemServer;

    /**
     * Initialize MCP Infrastructure
     */
    public async initialize(): Promise<void> {

        logger.info("Initializing MCP Infrastructure...");

        /**
         * ------------------------------------
         * Create Filesystem Module
         * ------------------------------------
         */

        const filesystemService =
            new FilesystemService();

        const filesystemTools =
            new FilesystemTools(filesystemService);

        this.filesystemServer =
            new FilesystemServer(
                filesystemService,
                filesystemTools
            );

        /**
         * ------------------------------------
         * Register Server
         * ------------------------------------
         */

        registry.register(this.filesystemServer);

        gateway.registerServer(this.filesystemServer);

        /**
         * ------------------------------------
         * Connect Server
         * ------------------------------------
         */

        await this.filesystemServer.connect();

        logger.info(
            `Registered Servers: ${registry.getAll().length}`
        );

        logger.info(
            `Registered Tools: ${this.filesystemServer.discoverTools().length}`
        );

        /**
         * ------------------------------------
         * Start Health Monitor
         * ------------------------------------
         */

        healthMonitor.start();

        logger.info("MCP Infrastructure Ready.");

    }

    /**
     * Graceful Shutdown
     */
    public async shutdown(): Promise<void> {

        logger.info(
            "Stopping MCP Infrastructure..."
        );

        if (this.filesystemServer) {

            await this.filesystemServer.disconnect();

        }

        healthMonitor.stop();

        logger.info(
            "MCP Infrastructure Stopped."
        );

    }

}

export default new MCPBootstrap();


```


# ✅ Deliverables

By the end of this part, the project will have:

- ✅ Automatic MCP initialization during application startup
- ✅ Filesystem MCP Server creation
- ✅ Server Registry registration
- ✅ Gateway registration
- ✅ Server connection
- ✅ Health verification
- ✅ Structured startup logging
- ✅ Backend ready for MCP tool execution

---

# 🎯 Outcome

After completing Bootstrap Integration, the Filesystem MCP Server will become an active part of the application's runtime environment. Every time the backend starts, the MCP infrastructure will initialize automatically, register the available servers, and prepare the system for tool execution, creating the foundation for all future MCP integrations.



---

# 📚 Part 2 – Server Registry Integration

The Filesystem Server must become discoverable through the Server Registry.

Responsibilities include:

- Registering the server
- Maintaining server metadata
- Tracking connection status
- Supporting future server discovery
- Preparing for multiple MCP servers

Registry after integration:

```text
Registry

├── Filesystem Server
├── GitHub Server (Future)
├── Docker Server (Future)
├── Kubernetes Server (Future)
└── Database Servers (Future)
```

The registry acts as the central catalog of all available MCP servers.

---

# 📚 Part 3 – Gateway Integration

Once registered, the Gateway becomes responsible for communicating with the Filesystem Server.

The Gateway will:

- Discover available tools
- Forward tool requests
- Handle execution
- Return standardized responses
- Manage server communication

Execution flow:

```text
Gateway
      │
      ▼
Filesystem Server
      │
      ▼
Filesystem Service
      │
      ▼
Operating System
```

This abstraction allows future MCP servers to be integrated without changing the AI Service.

---

# 📚 Part 4 – Tool Discovery

The Gateway will automatically discover all registered tools.

Expected tools include:

- Read File
- List Directory
- File Exists
- File Metadata
- Read Multiple Files
- Search Files
- Project Tree

Discovery process:

```text
Gateway
      │
      ▼
Filesystem Server
      │
      ▼
Registered Tools
      │
      ▼
Available to AI
```

This makes tool registration dynamic and scalable.

---

# 📚 Part 5 – Tool Execution

After discovery, the Gateway should be able to execute any registered tool.

Example execution flow:

```text
Gateway
      │
      ▼
Execute readFile
      │
      ▼
Filesystem Server
      │
      ▼
Filesystem Service
      │
      ▼
Read README.md
      │
      ▼
Return File Content
```

The Gateway should not need to know how the tool works internally. It simply forwards requests and returns responses.

---

# 📚 Part 6 – End-to-End Verification

Once integrated, we will verify the complete communication flow.

Testing scenarios include:

- Read README.md
- Read package.json
- List project directory
- Verify workspace restrictions
- Attempt invalid path access
- Confirm tool discovery
- Verify server registration
- Check server health
- Validate Gateway execution

Successful execution confirms that the Filesystem MCP Server is fully operational.

---

# 📚 Part 7 – Preparing the AI Service

Although full AI integration will occur in the next milestone, Phase 2 prepares the backend for it.

Current flow:

```text
User
      │
      ▼
AI Service
      │
      ▼
LLM
```

Future flow:

```text
User
      │
      ▼
AI Service
      │
Need Filesystem?
      │
      ├── No ─────────► LLM
      │
      ▼
Gateway
      │
      ▼
Filesystem Server
      │
      ▼
Filesystem Service
      │
      ▼
Project Files
      │
      ▼
Context
      │
      ▼
LLM
```

This architecture enables the AI assistant to answer questions using real project data instead of relying solely on the language model.

---

# 📂 Expected Project Structure

```text
src/
│
├── ai/
├── controllers/
├── routes/
├── services/
│
├── mcp/
│   │
│   ├── bootstrap/
│   ├── gateway/
│   ├── registry/
│   ├── logger/
│   ├── health/
│   ├── config/
│   ├── types/
│   │
│   └── servers/
│        └── filesystem/
│             ├── filesystem.server.ts
│             ├── filesystem.service.ts
│             ├── filesystem.tools.ts
│             ├── filesystem.constants.ts
│             ├── filesystem.types.ts
│             └── index.ts
│
└── server.ts
```

---

# ✅ Deliverables

By the end of Phase 2, the project will include:

- ✅ Filesystem MCP Server registered during application startup
- ✅ Server Registry integration
- ✅ MCP Gateway integration
- ✅ Automatic tool discovery
- ✅ Tool execution through the Gateway
- ✅ End-to-end MCP communication
- ✅ Health monitoring and server status verification
- ✅ Foundation for AI-driven filesystem interactions

---

# 🎯 Outcome

After completing Phase 2, the Filesystem MCP Server will become a fully integrated part of the backend infrastructure rather than an isolated module.

This marks the transition from **building MCP components** to **operating a functional MCP ecosystem**, providing a scalable foundation for future integrations such as GitHub, Docker, Kubernetes, PostgreSQL, MongoDB, Redis, AWS, and Azure.