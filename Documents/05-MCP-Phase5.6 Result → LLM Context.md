# 🎯 Milestone 5.6 — Project Intelligence & Developer Tool Framework

## Objective

Milestone 5.6 introduces the **Project Intelligence Layer** of the AI-powered Full-Stack Developer Assistant.

The goal is to move from low-level MCP operations such as:

```text
readFile
listDirectory
getMetadata
searchFiles



to high-level developer-oriented capabilities such as:


analyzeProject
searchSourceCode
analyzeDependencies
getProjectTree
findEntryPoint

1. Current Architecture

The current architecture is:


AI / MCP Client
       │
       ▼
MCP Gateway
       │
       ▼
Developer Tool Framework
       │
       ▼
AnalyzeProjectTool
       │
       ▼
ProjectAnalyzerService
       │
       ├── MetadataDetector
       ├── LanguageDetector
       ├── FrameworkDetector
       ├── RuntimeDetector
       ├── PackageManagerDetector
       ├── BuildToolDetector
       ├── EntryPointDetector
       ├── DockerDetector
       ├── KubernetesDetector
       ├── GitDetector
       └── CiDetector
       │
       ▼
ProjectAnalysisResult

2. Milestone 5.6 Implementation Plan

We will implement Milestone 5.6 in the following order.

Step	Component	Status
5.6.1	Verify Detector Contract	🟡 NEXT
5.6.2	Metadata Detector	⏳
5.6.3	Language Detector	⏳
5.6.4	Framework Detector	⏳
5.6.5	Runtime Detector	⏳
5.6.6	Package Manager Detector	⏳
5.6.7	Build Tool Detector	⏳
5.6.8	Entry Point Detector	⏳
5.6.9	Docker Detector	⏳
5.6.10	Kubernetes Detector	⏳
5.6.11	Git Detector	⏳
5.6.12	CI/CD Detector	⏳
5.6.13	Complete Project Analyzer	⏳
5.6.14	Analyze Project Developer Tool	⏳
5.6.15	Developer Tool Registration	⏳
5.6.16	MCP Adapter Integration	⏳
5.6.17	MCP Gateway Integration	⏳
5.6.18	End-to-End Testing	⏳
3. 5.6.1 — Verify Detector Contract
Objective

Before changing any detector, verify the common detector interface/base class and result model.

We need to confirm that every detector follows the same contract.

Expected conceptual structure:

detect(
    workspacePath: string
): Promise<DetectorResult<T>>

The exact implementation should follow the existing project code.

Expected Detector Flow
workspacePath
      │
      ▼
Detector
      │
      ├── FilesystemService
      │
      ├── Analyze files/directories
      │
      └── Generate structured result
             │
             ▼
       DetectorResult<T>
4. Filesystem API Rule

All filesystem/code-structure detectors must use the project's existing FilesystemService API.

Directory Listing

Use:

listDirectory()

which returns:

string[]

Example:

const entries =
    this.filesystemService.listDirectory(
        workspacePath
    );
Metadata

Use:

getMetadata()

for file/directory metadata.

5. APIs We Must NOT Introduce

Do not use the older API patterns:

DirectoryInfo.entries

or:

getFileMetadata()

The detectors must remain compatible with the actual FilesystemService implementation used by this project.

6. TypeScript Checkpoint

After every detector implementation or modification, run:

npx tsc --noEmit

The process is:

Implement Detector
       │
       ▼
npx tsc --noEmit
       │
       ├── ❌ Errors
       │      ↓
       │   Fix errors
       │      ↓
       │   Run again
       │
       └── ✅ Pass
              ↓
        Next Detector

We should not accumulate TypeScript errors across multiple detectors.

7. 5.6.2 — Metadata Detector
Goal

Detect general project/workspace metadata.

Potential information:

Project path
Project name
Root directory information
Important metadata

Architecture:

MetadataDetector
      │
      ▼
FilesystemService
      │
      ▼
Metadata

Checkpoint:

npx tsc --noEmit
8. 5.6.3 — Language Detector
Goal

Determine the primary programming language(s) used by the project.

Possible detection sources:

.ts
.tsx
.js
.jsx
.py
.java
.go
.rs
.c
.cpp

The detector should use the existing filesystem abstraction rather than directly accessing the operating system filesystem.

Checkpoint:

npx tsc --noEmit
9. 5.6.4 — Framework Detector
Goal

Identify the project's major framework.

Examples:

Express
NestJS
React
Next.js
Angular
Vue
FastAPI
Django
Spring

Detection can use project configuration files such as:

package.json
requirements.txt
pyproject.toml
pom.xml

The implementation must follow the project's existing filesystem APIs.

Checkpoint:

npx tsc --noEmit
10. 5.6.5 — Runtime Detector
Goal

Determine the runtime/platform.

Examples:

Node.js
Browser
Python
Java
.NET
Go

Possible information:

{
  "name": "Node.js",
  "version": "..."
}

Checkpoint:

npx tsc --noEmit
11. 5.6.6 — Package Manager Detector
Goal

Identify the package manager.

Examples:

npm
yarn
pnpm
bun
pip
poetry
maven
gradle

For Node.js projects, configuration files may include:

package-lock.json
yarn.lock
pnpm-lock.yaml
bun.lock

Checkpoint:

npx tsc --noEmit
12. 5.6.7 — Build Tool Detector
Goal

Determine how the project is built.

Examples:

TypeScript Compiler
Vite
Webpack
Rollup
esbuild
Turborepo
Gradle
Maven

Possible sources:

package.json
tsconfig.json
vite.config.*
webpack.config.*

Checkpoint:

npx tsc --noEmit
13. 5.6.8 — Entry Point Detector
Goal

Identify the likely application entry point.

Examples:

src/index.ts
src/server.ts
src/main.ts
src/app.ts
main.py
main.go

For Node.js applications, the detector may inspect:

package.json

and fields such as:

main
bin
scripts

The detector should avoid making unsafe assumptions.

Checkpoint:

npx tsc --noEmit
14. 5.6.9 — Docker Detector
Goal

Determine whether the project uses Docker.

Potential files:

Dockerfile
docker-compose.yml
docker-compose.yaml
compose.yml
compose.yaml
.dockerignore

Possible result:

{
  "detected": true,
  "dockerfiles": [
    "Dockerfile"
  ],
  "composeFiles": [
    "docker-compose.yml"
  ]
}

Checkpoint:

npx tsc --noEmit
15. 5.6.10 — Kubernetes Detector
Goal

Determine whether Kubernetes configuration exists.

Potential files/directories:

k8s/
kubernetes/
*.yaml
*.yml

The detector should identify Kubernetes-related resources where appropriate.

Possible resources:

Deployment
Service
ConfigMap
Secret
Ingress
Namespace

Checkpoint:

npx tsc --noEmit
16. 5.6.11 — Git Detector
Goal

Determine whether the workspace is a Git repository.

Potential information:

Git detected
.git directory
Git configuration

Later, the dedicated Git MCP will provide deeper Git functionality.

The Project Analyzer should primarily provide project-level intelligence.

Checkpoint:

npx tsc --noEmit
17. 5.6.12 — CI/CD Detector
Goal

Identify CI/CD configuration.

Potential systems:

GitHub Actions
Jenkins
GitLab CI
Azure Pipelines
CircleCI

Potential configuration locations:

.github/workflows/
Jenkinsfile
.gitlab-ci.yml
azure-pipelines.yml
.circleci/

Checkpoint:

npx tsc --noEmit
18. 5.6.13 — Complete ProjectAnalyzerService

After all detectors are verified:

ProjectAnalyzerService
       │
       ├── Metadata
       ├── Language
       ├── Framework
       ├── Runtime
       ├── Package Manager
       ├── Build Tool
       ├── Entry Point
       ├── Docker
       ├── Kubernetes
       ├── Git
       └── CI/CD
       │
       ▼
ProjectAnalysisResult

The service can execute independent detectors concurrently.

Current architecture:

await Promise.all([
    metadataDetector.detect(workspacePath),
    languageDetector.detect(workspacePath),
    frameworkDetector.detect(workspacePath),
    runtimeDetector.detect(workspacePath),
    packageManagerDetector.detect(workspacePath),
    buildToolDetector.detect(workspacePath),
    entryPointDetector.detect(workspacePath),
    dockerDetector.detect(workspacePath),
    kubernetesDetector.detect(workspacePath),
    gitDetector.detect(workspacePath),
    ciDetector.detect(workspacePath)
]);

Before changing this behavior, verify the detector error/result contract.

19. 5.6.14 — AnalyzeProjectTool

The current tool is:

export class AnalyzeProjectTool extends DeveloperToolBase<
    DeveloperToolContext,
    ProjectAnalysisResult
> {


    readonly name = "analyzeProject";


    readonly description =
        "Analyzes the workspace and returns an AI-ready project summary.";


    constructor(
        private readonly analyzerService: ProjectAnalyzerService
    ) {
        super();
    }


    protected async executeInternal(
        context: DeveloperToolContext
    ): Promise<ProjectAnalysisResult> {


        return this.analyzerService.analyze(
            context.workspacePath
        );


    }
}

This is the correct high-level architecture.

AnalyzeProjectTool
        ↓
ProjectAnalyzerService
        ↓
ProjectAnalysisResult

No unnecessary refactoring should be performed at this stage.

20. 5.6.15 — Developer Tool Registration

The tool must be registered with the Developer Tool Framework.

Target:

Developer Tool Registry
        │
        └── analyzeProject

Conceptually:

registerDeveloperTools()
        ↓
AnalyzeProjectTool
        ↓
Developer Tool Registry

The exact registration mechanism should follow the existing project implementation.

21. 5.6.16 — MCP Adapter Integration

The Developer Tool must be connected to the MCP layer.

Target architecture:

AnalyzeProjectTool
        ↓
DeveloperToolMcpAdapter
        ↓
MCP Tool

The adapter should translate:

MCP request
     ↓
DeveloperToolContext
     ↓
DeveloperTool.execute()
     ↓
DeveloperToolResponse
     ↓
MCP response
22. 5.6.17 — MCP Gateway Integration

The final integration should allow:

MCP Client
    ↓
MCP Gateway
    ↓
Developer Tool
    ↓
AnalyzeProjectTool
    ↓
ProjectAnalyzerService
    ↓
ProjectAnalysisResult

The gateway should be able to discover and execute:

analyzeProject
23. 5.6.18 — End-to-End Test

The final test should verify:

Client
  ↓
MCP Gateway
  ↓
Tool Discovery
  ↓
analyzeProject
  ↓
DeveloperToolBase
  ↓
ProjectAnalyzerService
  ↓
11 Detectors
  ↓
ProjectAnalysisResult
  ↓
MCP Response

Example request:

{
  "workspacePath": "/path/to/project"
}

Expected conceptual response:

{
  "success": true,
  "tool": "analyzeProject",
  "data": {
    "metadata": {},
    "language": {},
    "framework": {},
    "runtime": {},
    "packageManager": {},
    "buildTool": {},
    "entryPoint": {},
    "docker": {},
    "kubernetes": {},
    "git": {},
    "ci": {}
  },
  "warnings": [],
  "errors": []
}
24. Milestone 5.6 Completion Criteria

Milestone 5.6 will be considered complete when:

 Detector contract verified
 Metadata detector verified
 Language detector verified
 Framework detector verified
 Runtime detector verified
 Package Manager detector verified
 Build Tool detector verified
 Entry Point detector verified
 Docker detector verified
 Kubernetes detector verified
 Git detector verified
 CI/CD detector verified
 ProjectAnalysisResult verified
 ProjectAnalyzerService verified
 AnalyzeProjectTool verified
 Developer Tool registration completed
 MCP adapter completed
 MCP Gateway integration completed
 End-to-end execution verified
 npx tsc --noEmit passes
 No legacy FilesystemService API is introduced
25. Next Milestone After 5.6

Once 5.6 is complete:

5.6 Project Intelligence
          ↓
5.7 GitHub MCP
          ↓
5.8 Docker MCP
          ↓
5.9 Kubernetes MCP
          ↓
5.10 Git MCP
          ↓
5.11 AI ↔ MCP Orchestration
          ↓
5.12 Multi-Tool AI Agent
🚀 Immediate Coding Task

We are currently at:

5.6
 ↓
5.6.1 Verify Detector Contract
Required files

Find and inspect the files containing:

Detector interface/base class
Detector result type
ProjectAnalysisResult

Then implement/fix only 5.6.1.

After that:

npx tsc --noEmit

must pass.

Only after that should we move to:

5.6.2 MetadataDetector

This keeps the implementation incremental, testable, and prevents us from introducing architectural problems across all 11 detectors at once.


