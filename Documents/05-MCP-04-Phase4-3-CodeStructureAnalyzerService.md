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
