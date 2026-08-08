# Phase 3 — CodeStructureAnalyzerService

## Overview

The `CodeStructureAnalyzerService` is the orchestration layer of the Code Structure Analyzer.

Its responsibility is to execute all nine code-structure detectors, collect their results, and combine them into one `CodeStructureAnalysisResult`.

The service itself should contain **no detection logic**.

Each detector remains responsible for one specific concern.

```text
                 CodeStructureAnalyzerService
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
 DirectoryDetector      FileDetector       ModuleDetector
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
 ControllerDetector     ServiceDetector     RouteDetector
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                                       │
          ▼                                       ▼
    ModelDetector                         EntryPointDetector
          │                                       │
          └───────────────────┬───────────────────┘
                              │
                              ▼
                    ArchitectureDetector
                              │
                              ▼
                CodeStructureAnalysisResult
```

---

# 1. Folder Structure

The Code Structure Analyzer should now look like:

```text
src/
└── mcp/
    └── servers/
        └── filesystem/
            └── developer-tools/
                └── analysis/
                    └── code-structure/
                        │
                        ├── detectors/
                        │   ├── directory.detector.ts
                        │   ├── file.detector.ts
                        │   ├── module.detector.ts
                        │   ├── controller.detector.ts
                        │   ├── service.detector.ts
                        │   ├── route.detector.ts
                        │   ├── model.detector.ts
                        │   ├── entryPoint.detector.ts
                        │   ├── architecture.detector.ts
                        │   └── index.ts
                        │
                        ├── models/
                        │   ├── StructureDirectory.ts
                        │   ├── StructureFile.ts
                        │   ├── StructureModule.ts
                        │   ├── StructureController.ts
                        │   ├── StructureService.ts
                        │   ├── StructureRoute.ts
                        │   ├── StructureModel.ts
                        │   ├── StructureEntryPoint.ts
                        │   ├── StructureArchitecture.ts
                        │   └── index.ts
                        │
                        ├── services/
                        │   └── codeStructureAnalyzer.service.ts
                        │
                        └── index.ts
```

---

# 2. Analyzer Result

Create:

```text
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/CodeStructureAnalysisResult.ts
```

The combined result should contain the output of all nine detectors.

Conceptually:

```typescript
export interface CodeStructureAnalysisResult {

    directories: StructureDirectory[];

    files: StructureFile[];

    modules: StructureModule[];

    controllers: StructureController[];

    services: StructureService[];

    routes: StructureRoute[];

    models: StructureModel[];

    entryPoints: StructureEntryPoint[];

    architecture: StructureArchitecture;
}
```

The exact property names should match the existing detector result types in the project.

---

# 3. Detector Responsibilities

Each detector has one responsibility.

### DirectoryDetector

Detects:

```text
src/
src/controllers/
src/services/
src/models/
src/routes/
```

Output:

```text
StructureDirectory[]
```

---

### FileDetector

Detects project files.

Example:

```text
src/server.ts
src/app.ts
src/controllers/user.controller.ts
src/services/user.service.ts
```

Output:

```text
StructureFile[]
```

---

### ModuleDetector

Analyzes source modules.

It identifies:

```text
imports
exports
default export
module type
```

Output:

```text
StructureModule[]
```

---

### ControllerDetector

Identifies controller files/classes.

Example:

```text
user.controller.ts
product.controller.ts
auth.controller.ts
```

Output:

```text
StructureController[]
```

---

### ServiceDetector

Identifies service-layer files/classes.

Example:

```text
user.service.ts
auth.service.ts
product.service.ts
```

Output:

```text
StructureService[]
```

---

### RouteDetector

Identifies application routes.

Example:

```text
user.routes.ts
product.routes.ts
auth.routes.ts
```

Output:

```text
StructureRoute[]
```

---

### ModelDetector

Identifies data models.

Example:

```text
user.model.ts
product.model.ts
```

Output:

```text
StructureModel[]
```

---

### EntryPointDetector

Identifies application entry points.

Example:

```text
src/index.ts
src/main.ts
src/server.ts
```

Output:

```text
StructureEntryPoint[]
```

---

### ArchitectureDetector

Determines the likely architecture.

Example:

```text
MVC
Layered
Modular
Feature-based
Microservices
Monolithic
Unknown
```

Output:

```text
StructureArchitecture
```

---

# 4. Service Location

Create:

```text
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/services/codeStructureAnalyzer.service.ts
```

The service should receive the workspace path:

```typescript
analyze(
    workspacePath: string
)
```

and return:

```typescript
Promise<CodeStructureAnalysisResult>
```

---

# 5. Orchestration

The service should instantiate the nine detectors:

```text
DirectoryDetector
FileDetector
ModuleDetector
ControllerDetector
ServiceDetector
RouteDetector
ModelDetector
EntryPointDetector
ArchitectureDetector
```

Then execute:

```text
analyze()
    │
    ├── DirectoryDetector.detect()
    │
    ├── FileDetector.detect()
    │
    ├── ModuleDetector.detect()
    │
    ├── ControllerDetector.detect()
    │
    ├── ServiceDetector.detect()
    │
    ├── RouteDetector.detect()
    │
    ├── ModelDetector.detect()
    │
    ├── EntryPointDetector.detect()
    │
    └── ArchitectureDetector.detect()
```

The service should **not** contain code such as:

```typescript
if (file.endsWith(".controller.ts")) {
    ...
}
```

That belongs inside `ControllerDetector`.

---

# 6. Recommended Execution Strategy

The first implementation can execute the detectors sequentially:

```typescript
const directories =
    await directoryDetector.detect(workspacePath);

const files =
    await fileDetector.detect(workspacePath);

const modules =
    await moduleDetector.detect(workspacePath);
```

and so on.

This is easier to debug.

Later, detectors that don't depend on each other can be executed in parallel using:

```typescript
Promise.all()
```

For example:

```text
DirectoryDetector
FileDetector
ModuleDetector
ControllerDetector
ServiceDetector
RouteDetector
ModelDetector
EntryPointDetector
```

can potentially execute concurrently.

Architecture detection may eventually be moved to the end because it benefits from information produced by the other detectors.

---

# 7. Error Handling

A single detector failure should ideally **not destroy the complete analysis**.

For example:

```text
DirectoryDetector       SUCCESS
FileDetector            SUCCESS
ModuleDetector          SUCCESS
ControllerDetector      SUCCESS
ServiceDetector         SUCCESS
RouteDetector           SUCCESS
ModelDetector           SUCCESS
EntryPointDetector      FAILED
ArchitectureDetector    SUCCESS
```

The analyzer should still return the successful results.

Therefore the final service result should eventually support warnings/errors.

A useful structure is:

```typescript
export interface CodeStructureAnalysisResponse {

    success: boolean;

    data: CodeStructureAnalysisResult;

    warnings: string[];

    errors: string[];

}
```

---

# 8. Result Example

For the current backend project, the eventual result could look approximately like:

```json
{
    "success": true,
    "data": {
        "directories": [],
        "files": [],
        "modules": [],
        "controllers": [],
        "services": [],
        "routes": [],
        "models": [],
        "entryPoints": [
            {
                "name": "ServerEntryPoint",
                "path": "src/server.ts",
                "file": "server.ts",
                "type": "entry-point",
                "confidence": "high"
            }
        ],
        "architecture": {
            "architecture": "layered",
            "confidence": 0.85,
            "patterns": [
                "Layered",
                "MVC"
            ],
            "evidence": [
                "controllers directory detected",
                "services directory detected",
                "routes directory detected",
                "models directory detected"
            ]
        }
    },
    "warnings": [],
    "errors": []
}
```

---

# 9. Service API

The public API should remain very small:

```typescript
class CodeStructureAnalyzerService {

    async analyze(
        workspacePath: string
    ): Promise<CodeStructureAnalysisResult> {
        ...
    }

}
```

The service should not expose individual detector methods.

Do not create:

```typescript
analyzeDirectories()
analyzeFiles()
analyzeModules()
```

because those responsibilities belong to the detectors.

---

# 10. Dependency Injection

For consistency with the existing Dependency Analyzer, the preferred architecture is:

```text
CodeStructureAnalyzerService
        │
        ├── DirectoryDetector
        ├── FileDetector
        ├── ModuleDetector
        ├── ControllerDetector
        ├── ServiceDetector
        ├── RouteDetector
        ├── ModelDetector
        ├── EntryPointDetector
        └── ArchitectureDetector
```

The detectors can be injected through the constructor.

This makes the service easier to unit test.

---

# 11. Service Export

Update:

```text
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/services/index.ts
```

with:

```typescript
export * from "./codeStructureAnalyzer.service";
```

Then update:

```text
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/index.ts
```

to export:

```typescript
export * from "./models";
export * from "./detectors";
export * from "./services";
```

---

# 12. Important API Compatibility

Because we encountered several TypeScript errors during the detectors, the analyzer service must **not directly use `FilesystemService`** for detection.

The correct dependency is:

```text
CodeStructureAnalyzerService
            ↓
        Detectors
            ↓
     FilesystemService
```

Not:

```text
CodeStructureAnalyzerService
            ↓
     FilesystemService
```

This preserves the single-responsibility architecture.

---

# 13. Current Project Intelligence Architecture

After this phase, your architecture becomes:

```text
                       Project Intelligence
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
     Project Analyzer   Dependency Analyzer   Code Structure
             │                 │                Analyzer
             │                 │                 │
             ▼                 ▼                 ▼
        ProjectInfo       Dependencies       Architecture
```

This is a significant milestone because the backend is no longer just an MCP filesystem server.

It is becoming a **developer intelligence platform**.

---

# 14. Next Phase

After `CodeStructureAnalyzerService` compiles and works, the next step is:

```text
Phase 4 — CodeStructureAnalyzerTool
```

The flow will become:

```text
CodeStructureAnalyzerTool
          ↓
CodeStructureAnalyzerService
          ↓
9 Detectors
          ↓
CodeStructureAnalysisResult
```

Then register the tool:

```text
DeveloperToolRegistry
          ↓
Filesystem MCP Server
          ↓
MCP Gateway
```

Eventually your MCP server will expose at least:

```text
readFile
listDirectory
fileExists
fileMetadata
readMultipleFiles
searchFiles
projectTree

analyzeProject
analyzeDependencies
analyzeCodeStructure
```

That gives the LLM three increasingly powerful layers of project context:

```text
Project Analysis
       +
Dependency Analysis
       +
Code Structure Analysis
       ↓
Project Intelligence
```

The **next concrete implementation file** after this documentation is:

```text
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/CodeStructureAnalysisResult.ts
```

Then:

```text
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/services/codeStructureAnalyzer.service.ts
```

Run the checkpoint after each major change:

```bash
npx tsc --noEmit
```


Phase 4 is the next step: expose CodeStructureAnalyzerService as an actual Developer/MCP tool.

We should do this in small checkpoints, just like Dependency Analyzer.

Phase 4 — CodeStructureAnalyzerTool

Target flow:

CodeStructureAnalyzerService
          ↓
CodeStructureAnalyzerTool
          ↓
DeveloperToolRegistry
          ↓
FilesystemTools / MCP Server
          ↓
MCP Gateway
          ↓
analyzeCodeStructure
Step 1 — Create the tool

Create:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/codeStructureAnalyzer.tool.ts

Use the same DeveloperTool pattern that your DependencyAnalyzerTool uses.

import {
    DeveloperToolBase,
    DeveloperToolContext,
    DeveloperToolResult,
    DeveloperToolValidator
} from "../../base";

import {
    CodeStructureAnalyzerService
} from "./services";

export interface AnalyzeCodeStructureArguments {
    workspacePath: string;
}

export class CodeStructureAnalyzerTool
    extends DeveloperToolBase<
        AnalyzeCodeStructureArguments
    > {

    readonly name =
        "analyzeCodeStructure";

    readonly description =
        "Analyzes project code structure including directories, files, modules, controllers, services, routes, models, entry points, and architecture.";

    private readonly validator:
        DeveloperToolValidator;

    private readonly codeStructureAnalyzerService:
        CodeStructureAnalyzerService;

    constructor() {

        super();

        this.validator =
            new DeveloperToolValidator();

        this.codeStructureAnalyzerService =
            new CodeStructureAnalyzerService();

    }

    async execute(
        context: DeveloperToolContext,
        args: AnalyzeCodeStructureArguments
    ): Promise<DeveloperToolResult> {

        const workspacePath =
            args?.workspacePath ||
            context.workspacePath;

        this.validator.validate(
            {
                workspacePath
            }
        );

        const result =
            await this.codeStructureAnalyzerService.analyze(
                workspacePath
            );

        return {

            success:
                result.success,

            data:
                result,

            warnings:
                result.warnings ?? [],

            errors:
                []

        };

    }

}
Important

Your exact DeveloperToolBase, DeveloperToolContext, and DeveloperToolResult definitions may differ slightly from this because your existing Dependency Analyzer has already established your project's API.

So don't blindly modify the base classes.

Instead, compare this tool against:

src/mcp/servers/filesystem/developer-tools/analysis/dependency/dependencyAnalyzer.tool.ts

The structure should be almost identical.

Step 2 — Factory

Create:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/codeStructureAnalyzer.factory.ts
import {
    CodeStructureAnalyzerTool
} from "./codeStructureAnalyzer.tool";

export function createCodeStructureAnalyzerTool():
    CodeStructureAnalyzerTool {

    return new CodeStructureAnalyzerTool();

}
Step 3 — Export the tool

Open:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/index.ts

Make sure it contains:

export * from "./codeStructureAnalyzer.tool";

export * from "./codeStructureAnalyzer.factory";

export * from "./models";

export * from "./services";

export * from "./detectors";
Step 4 — Export from analysis

Open:

src/mcp/servers/filesystem/developer-tools/analysis/index.ts

Add:

export * from "./code-structure";

Your analysis index should expose both analyzers, something conceptually like:

export * from "./analyzeProject.tool";
export * from "./analyzeProject.factory";

export * from "./code-structure";

export * from "./dependency";
Step 5 — Register the tool

Open your:

src/mcp/servers/filesystem/developer-tools/registerDeveloperTools.ts

Add:

import {
    createCodeStructureAnalyzerTool
} from "./analysis/code-structure";

Then inside registerDeveloperTools():

const analyzeCodeStructureTool =
    createCodeStructureAnalyzerTool();

registry.register(
    analyzeCodeStructureTool
);

Your registration will now conceptually be:

DeveloperToolRegistry
│
├── analyzeProject
├── analyzeDependencies
└── analyzeCodeStructure
Step 6 — Compile

Before touching the MCP Gateway:

npx tsc --noEmit

We want:

Found 0 errors
Step 7 — Expected MCP registration

After the server starts, you should eventually see something similar to:

Registered Developer Tool: analyzeProject
Registered Developer Tool: analyzeDependencies
Registered Developer Tool: analyzeCodeStructure

and:

Registered 9 MCP tools.

because you currently have:

7 filesystem tools
+
2 existing developer tools
+
1 code structure tool
=
10

So actually the expected count is 10, assuming analyzeProject is already registered.

readFile
listDirectory
fileExists
fileMetadata
readMultipleFiles
searchFiles
projectTree
analyzeProject
analyzeDependencies
analyzeCodeStructure
Step 8 — Gateway test

Once registration succeeds, test:

const response =
    await gateway.executeTool({

        serverId:
            "filesystem-server",

        toolName:
            "analyzeCodeStructure",

        args: {

            workspacePath:
                process.cwd()

        }

    });

console.log(
    JSON.stringify(
        response,
        null,
        2
    )
);

Expected:

{
  "success": true,
  "data": {
    "success": true,
    "tool": "analyzeCodeStructure",
    "data": {
      "workspacePath": "...",
      "directories": [],
      "files": [],
      "modules": [],
      "controllers": [],
      "services": [],
      "routes": [],
      "models": [],
      "entryPoints": [],
      "architecture": {}
    }
  }
}

The actual arrays should contain the results from your nine detectors.

Our checkpoint

Don't move to the next phase yet.

Run:

npx tsc --noEmit

first.

Then start the backend and verify that:

analyzeCodeStructure

appears in the registered tools.

Once that works, we'll connect the Code Structure Analyzer to the Gateway execution path, completing the third intelligence layer:

                 Project Intelligence
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
   Project Analyzer  Dependency     Code Structure
                     Analyzer         Analyzer
          │              │              │
          ▼              ▼              ▼
      ProjectInfo   Dependencies    Architecture

This is a significant milestone because your MCP server is moving from filesystem access to actual project intelligence.