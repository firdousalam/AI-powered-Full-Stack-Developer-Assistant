What remains to complete Milestone 5.3
1. Register the Filesystem Server during bootstrap

When the backend starts:

Server Start
      │
      ▼
Bootstrap
      │
      ▼
Create Filesystem Server
      │
      ▼
Register in Registry
      │
      ▼
Register in Gateway
      │
      ▼
Connect Server
2. Connect it to the Gateway

Instead of just having:

Gateway

it should become

Gateway
    │
    ▼
Filesystem Server
3. Discover the tools

The Gateway should be able to execute:

```text
gateway.discoverTools()

↓

[
  readFile,
  listDirectory,
  fileExists,
  fileMetadata,
  ...
]
```

4. Execute a tool through the Gateway

For example:

```ts
gateway.executeTool({
    serverId: "filesystem-server",
    toolName: "readFile",
    args: {
        path: "README.md"
    }
});
```
Expected flow:

Gateway
      │
      ▼
Filesystem Server
      │
      ▼
Filesystem Service
      │
      ▼
File System
5. Verify it works

Add a temporary test during startup:
```ts
const response = await gateway.executeTool({
    serverId: "filesystem-server",
    toolName: "readFile",
    args: {
        path: "package.json"
    }
});

console.log(response);
```


If this succeeds, your Filesystem MCP Server is fully integrated.

AI Integration (Next Step)

Even after the above integration, your AI Service will still call the LLM directly.

Today:

User
   │
   ▼
AI Service
   │
   ▼
LLM

Later:

User
   │
   ▼
AI Service
   │
   ▼
Need filesystem?
   │
   ├── No ─────► LLM
   │
   ▼
Gateway
   │
   ▼
Filesystem Server
   │
   ▼
Context
   │
   ▼
LLM

That AI integration is the next logical step.

My recommendation

I would treat Milestone 5.3 as having two phases:

Phase 1 (Completed): Build the Filesystem MCP module (server, service, tools, types, constants, and infrastructure).
Phase 2 (Remaining): Integrate it with the bootstrap process, Gateway, Registry, and verify end-to-end tool execution.

Once Phase 2 is complete, Milestone 5.3 can be considered fully finished, and you'll be ready to start building higher-level developer tools in the next milestone.