# Phase 5 — AI + MCP Tool Orchestration

## Overview

The MCP infrastructure is now capable of exposing developer-oriented tools such as:

* `analyzeProject`
* `analyzeDependencies`
* `analyzeCodeStructure`
* `readFile`
* `listDirectory`
* `fileExists`
* `fileMetadata`
* `readMultipleFiles`
* `searchFiles`
* `projectTree`

The next major milestone is connecting these tools to the **AI Service**.

Until now, tools could be invoked manually through the MCP Gateway.

The goal of Phase 5 is to allow the **LLM to decide when developer tools are required**.

This changes the system from:

> MCP tool collection

into:

> AI-powered, project-aware developer assistant.

---

# Phase 5 Architecture

The target architecture is:

```text
                         User
                           │
                           ▼
                      AI Service
                           │
                           ▼
                          LLM
                           │
                    Tool decision
                           │
                           ▼
                  MCP Orchestrator
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        Tool Discovery             Tool Execution
              │                         │
              ▼                         ▼
        Tool Catalogue             MCP Gateway
                                        │
                                        ▼
                               Filesystem MCP Server
                                        │
                                        ▼
                                Developer Tools
                                        │
                                        ▼
                                  Tool Results
                                        │
                                        ▼
                                 Context Builder
                                        │
                                        ▼
                                      LLM
                                        │
                                        ▼
                                  Final Answer
```

---

# Phase 5 Goals

The implementation will be divided into smaller milestones.

```text
Phase 5
│
├── 5.1 MCP Tool Discovery
│
├── 5.2 LLM Tool Calling
│
├── 5.3 MCP Tool Execution
│
├── 5.4 Result → LLM Context
│
└── 5.5 Multi-tool Orchestration
```

We will implement these incrementally rather than modifying the entire AI service at once.

---

# Phase 5.1 — MCP Tool Discovery

## Objective

The AI Service needs to know which MCP tools are available.

The MCP Gateway already provides:

```typescript
discoverTools()
```

Therefore, the first step is to expose this information to the AI Service.

The AI Service should eventually receive a tool catalogue similar to:

```json
[
  {
    "name": "analyzeProject",
    "description": "Analyzes project structure..."
  },
  {
    "name": "analyzeDependencies",
    "description": "Analyzes project dependencies..."
  },
  {
    "name": "analyzeCodeStructure",
    "description": "Analyzes source-code structure..."
  }
]
```

The catalogue will later be converted into the format required by the selected LLM provider.

---

# Current MCP Tools

The MCP Gateway should currently expose the registered tools.

Expected developer tools:

```text
analyzeProject
analyzeDependencies
analyzeCodeStructure
```

Expected filesystem tools:

```text
readFile
listDirectory
fileExists
fileMetadata
readMultipleFiles
searchFiles
projectTree
```

Therefore the system should currently have:

```text
3 Developer Tools
+
7 Filesystem Tools
=
10 MCP Tools
```

The exact number should always be verified using:

```typescript
gateway.discoverTools()
```

rather than hard-coding the number.

---

# Phase 5.1 Data Flow

The first implementation should be:

```text
AI Service
    │
    │ discoverTools()
    ▼
MCP Gateway
    │
    ▼
Filesystem MCP Server
    │
    ├── analyzeProject
    ├── analyzeDependencies
    ├── analyzeCodeStructure
    ├── readFile
    ├── listDirectory
    ├── fileExists
    ├── fileMetadata
    ├── readMultipleFiles
    ├── searchFiles
    └── projectTree
```

The AI Service should receive the tool metadata.

At this stage:

> The AI does NOT execute tools yet.

We are only implementing discovery.

---

# Phase 5.2 — LLM Tool Selection

Once discovery works, the next step is allowing the LLM to decide which tool is required.

For example:

## Example 1

User:

```text
Why is my application using so many dependencies?
```

The LLM should determine:

```text
Question
   ↓
Dependency information required
   ↓
analyzeDependencies
```

---

## Example 2

User:

```text
Explain the architecture of my project.
```

The LLM may determine:

```text
Question
   ↓
Project architecture information
   ↓
analyzeProject
+
analyzeCodeStructure
```

---

## Example 3

User:

```text
Why is UserController not finding UserService?
```

The LLM may determine:

```text
Question
   ↓
Source-code relationships required
   ↓
analyzeCodeStructure
+
analyzeDependencies
```

The important change is:

```text
User Question
      ↓
LLM reasoning
      ↓
Required project information
      ↓
Tool selection
```

The application no longer needs to manually decide which developer tool to execute.

---

# Phase 5.3 — Tool Execution

The AI Service should **not** directly instantiate developer services.

Avoid:

```typescript
new DependencyAnalyzerService()
```

or:

```typescript
new CodeStructureAnalyzerService()
```

The AI Service should remain independent from the implementation details of individual tools.

Instead:

```text
AI Service
    │
    │ executeTool()
    ▼
MCP Gateway
    │
    ▼
Filesystem MCP Server
    │
    ▼
Developer Tool
```

This preserves the MCP architecture.

---

# Why This Architecture Matters

The AI Service should not need to know:

* where a tool is implemented
* which MCP server owns it
* how the tool accesses files
* how the dependency analyzer works
* how the code structure analyzer works

It only needs to know:

```text
Tool name
Description
Input schema
```

The MCP infrastructure handles the rest.

This gives us a clean separation:

```text
AI Layer
   ↓
MCP Layer
   ↓
Developer Tool Layer
   ↓
Filesystem / Project
```

---

# Phase 5.4 — Tool Results → LLM Context

After a tool executes, the result must be returned to the LLM.

For example:

```text
User
 │
 ▼
LLM
 │
 ▼
analyzeDependencies
 │
 ▼
DependencyAnalysisResult
 │
 ▼
AI Context
 │
 ▼
LLM
```

Suppose the user asks:

```text
Why does this project use Express?
```

The LLM could request:

```text
analyzeDependencies()
```

The tool may return:

```json
{
  "dependencies": [
    {
      "name": "express",
      "version": "^5.2.1"
    }
  ],
  "packageManager": {
    "name": "npm"
  }
}
```

The AI Service then provides this structured result back to the LLM.

The final response can therefore be based on:

```text
Actual project data
```

instead of:

```text
LLM assumptions
```

---

# Phase 5.5 — MCP Orchestration Layer

Once the basic tool discovery and execution flow works, we can introduce a dedicated orchestration layer.

Recommended structure:

```text
src/mcp/
│
├── gateway/
│
├── servers/
│
└── orchestration/
    │
    ├── toolSelector/
    │
    ├── toolExecutor/
    ├── contextBuilder/
    └── mcpOrchestrator/
```

Responsibilities:

### Tool Selector

Determines which MCP tools the LLM wants to use.

### Tool Executor

Sends the selected tool request to the MCP Gateway.

### Context Builder

Converts tool results into useful context for the LLM.

### MCP Orchestrator

Coordinates the complete process.

---

# Target Orchestration Flow

```text
                    AI Service
                         │
                         ▼
                  MCP Orchestrator
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Tool Discovery        Tool Execution
              │                     │
              ▼                     ▼
       Available Tools          MCP Gateway
                                      │
                                      ▼
                              Developer Tools
                                      │
                                      ▼
                                Tool Results
                                      │
                                      ▼
                               Context Builder
                                      │
                                      ▼
                                     LLM
```

---

# Tool Selection Strategy

There are two possible approaches.

## Option A — LLM-Native Tool Calling

Expose MCP tools to the LLM.

For example:

```text
LLM
 ├── analyzeProject()
 ├── analyzeDependencies()
 └── analyzeCodeStructure()
```

The LLM decides when a tool is required.

This is the recommended architecture.

---

# Option B — Rule-Based Tool Selection

A custom application layer could use rules such as:

```text
"dependency"
      ↓
analyzeDependencies
```

```text
"architecture"
      ↓
analyzeCodeStructure
```

```text
"project structure"
      ↓
analyzeProject
```

This is easier to implement but has limitations.

It becomes difficult to handle complex questions such as:

```text
Why is this application slow and how is
the current architecture contributing to it?
```

The system would eventually require many hard-coded rules.

Therefore:

> Rule-based selection can be useful as a fallback, but it should not be the primary orchestration mechanism.

---

# Recommended Approach

Use:

```text
LLM-native tool calling
```

The target architecture becomes:

```text
User
 │
 ▼
AI Service
 │
 ▼
LLM
 │
 │ "I need dependency information"
 ▼
Tool Call
 │
 │ analyzeDependencies
 ▼
MCP Gateway
 │
 ▼
Developer Tool
 │
 ▼
DependencyAnalysisResult
 │
 ▼
LLM
 │
 ▼
Final Answer
```

---

# Multiple Tool Calls

The LLM should eventually be able to request multiple tools.

For example:

```text
User
 │
 ▼
LLM
 │
 ├── analyzeProject()
 │
 ├── analyzeDependencies()
 │
 └── analyzeCodeStructure()
          │
          ▼
       Results
          │
          ▼
         LLM
          │
          ▼
    Project-aware answer
```

This is important because many real developer questions require information from multiple sources.

---

# Example — Architecture Question

User:

```text
Explain the architecture of my project.
```

Possible tool calls:

```text
analyzeProject()
        +
analyzeCodeStructure()
```

The results are combined:

```text
Project Information
        +
Code Structure
        ↓
      LLM
        ↓
Architecture explanation
```

---

# Example — Dependency Question

User:

```text
Why is my application using so many dependencies?
```

Possible tool:

```text
analyzeDependencies()
```

Result:

```text
Production dependencies
Development dependencies
Optional dependencies
Peer dependencies
Duplicate dependencies
Missing dependencies
Package manager
Lock file
```

The LLM can then explain the actual dependency situation.

---

# Example — Controller/Service Problem

User:

```text
Why is UserController not finding UserService?
```

Possible tools:

```text
analyzeCodeStructure()
+
analyzeDependencies()
```

The LLM can inspect:

```text
Controllers
Services
Imports
Exports
Modules
Dependencies
```

and produce a project-specific diagnosis.

---

# Future Intelligence

Once this orchestration architecture exists, additional developer analyzers can be plugged in without redesigning the AI Service.

For example:

```text
Project Intelligence
        │
        ├── Project Analyzer
        │
        ├── Dependency Analyzer
        │
        ├── Code Structure Analyzer
        │
        ├── Performance Analyzer
        │
        ├── Security Analyzer
        │
        ├── API Analyzer
        │
        ├── Test Analyzer
        │
        └── Docker/Kubernetes Analyzer
```

A future question could be:

```text
Why is my application slow?
```

The LLM could eventually request:

```text
Project Analysis
        +
Dependencies
        +
Code Structure
        +
Performance Analysis
        ↓
      LLM
        ↓
AI diagnosis
```

This is the direction that makes the project substantially more powerful.

---

# Immediate Task — Phase 5.1

Do **not** build the Tool Selector yet.

The first concrete implementation should be:

```text
Phase 5.1
MCP Tool Discovery Integration
```

Connect:

```text
AI Service
    │
    ▼
MCP Gateway
    │
    ▼
discoverTools()
```

The AI Service should be able to retrieve the currently registered MCP tools.

Expected result:

```text
[
  analyzeProject,
  analyzeDependencies,
  analyzeCodeStructure,
  readFile,
  listDirectory,
  fileExists,
  fileMetadata,
  readMultipleFiles,
  searchFiles,
  projectTree
]
```

Do not hard-code these names in the AI Service.

The catalogue should come dynamically from:

```typescript
gateway.discoverTools()
```

---

# Phase 5.1 Checkpoint

Before proceeding to LLM tool calling, verify:

```text
npx tsc --noEmit
```

Then verify that the AI Service can successfully retrieve the MCP tool catalogue.

Expected conceptual output:

```json
{
  "tools": [
    {
      "name": "analyzeProject",
      "description": "..."
    },
    {
      "name": "analyzeDependencies",
      "description": "..."
    },
    {
      "name": "analyzeCodeStructure",
      "description": "..."
    }
  ]
}
```

Once this works, proceed to:

```text
Phase 5.2 — LLM Tool Calling
```

At that point we will connect the discovered MCP tools to the LLM's native tool/function-calling mechanism.

---

# Phase 5 Final Target

The completed architecture should eventually look like:

```text
                         User
                           │
                           ▼
                      AI Service
                           │
                           ▼
                          LLM
                           │
                    ┌──────┴──────┐
                    │ Tool Call   │
                    ▼             │
              MCP Orchestrator    │
                    │             │
                    ▼             │
               MCP Gateway        │
                    │             │
                    ▼             │
            Filesystem MCP Server │
                    │             │
                    ▼             │
             Developer Tool       │
                    │             │
                    ▼             │
               Tool Result        │
                    │             │
                    ▼             │
             Context Builder ─────┘
                    │
                    ▼
                   LLM
                    │
                    ▼
              Final Answer
```

This is the point where the project evolves from a collection of MCP tools into a **project-aware AI developer assistant**.
