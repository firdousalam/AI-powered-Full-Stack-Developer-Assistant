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




5.6.2 — Metadata Detector
Objective

The Metadata Detector should answer:

"What basic information can we determine about this workspace?"

For the first version, we want to identify:

Workspace path
Workspace name
Whether the workspace exists
Whether it is a directory
Top-level entries
Basic project structure information

The detector should return this through the existing:

DetectorResult<T>

contract.

Step 1 — Locate the Metadata Detector

Based on your repository structure, first locate:

backend/src/mcp/servers/filesystem/developer-tools/analysis/detectors/

and find:

metadata.detector.ts

We should modify the existing detector, not create another metadata detector.

Step 2 — Verify the Metadata Model

Before writing implementation code, we need to use your existing metadata model.

Your ProjectAnalyzerService currently expects:

metadata: metadata.data

Therefore the detector's result must eventually be compatible with:

ProjectAnalysisResult.metadata

The flow is:

MetadataDetector
       │
       ▼
DetectorResult<ProjectMetadata>
       │
       ▼
metadata.data
       │
       ▼
ProjectAnalysisResult.metadata

Do not create another competing metadata interface.

Step 3 — Recommended Metadata Information

For this milestone, I recommend the metadata detector return:

{
    workspacePath: string;
    name: string;
    exists: boolean;
    isDirectory: boolean;
    entries: string[];
}

Conceptually:

Project
│
├── workspacePath
├── name
├── exists
├── isDirectory
└── entries[]

This gives the AI a useful basic understanding of the project before the other detectors add more specialized information.

Step 4 — Filesystem API

The implementation must use:

getMetadata()

for workspace metadata.

From your actual service:

async getMetadata(
    targetPath: string
): Promise<FileMetadata | null>

It returns information including:

path
name
extension
exists
isFile
isDirectory
size
createdAt
modifiedAt

For the project root, we can therefore do:

const metadata =
    await this.filesystemService.getMetadata(
        workspacePath
    );
Step 5 — Get Top-Level Entries

Use the actual:

listDirectory()

API.

Because your implementation is:

async listDirectory(
    directoryPath: string
): Promise<string[]>

we must use:

const entries =
    await this.filesystemService.listDirectory(
        workspacePath
    );

Not:

this.filesystemService
    .listDirectory(workspacePath)
    .entries;

And definitely not:

getFileMetadata()

or:

DirectoryInfo.entries
Step 6 — Metadata Detector Implementation

Assuming your existing metadata model contains the fields above, the implementation should look like this.

File
backend/src/mcp/servers/filesystem/developer-tools/analysis/detectors/metadata.detector.ts
Code
import { FilesystemService } from "../../services";
import {
    DetectorBase
} from "./base";


import {
    ProjectMetadata
} from "../models";


export class MetadataDetector
    extends DetectorBase<ProjectMetadata> {


    readonly name = "metadata";


    constructor(
        private readonly filesystemService: FilesystemService
    ) {
        super();
    }


    async detect(
        workspacePath: string
    ) {


        const metadata =
            await this.filesystemService.getMetadata(
                workspacePath
            );


        if (!metadata) {


            return this.failure([
                `Workspace does not exist: ${workspacePath}`
            ]);


        }


        if (!metadata.isDirectory) {


            return this.failure([
                `Workspace path is not a directory: ${workspacePath}`
            ]);


        }


        const entries =
            await this.filesystemService.listDirectory(
                workspacePath
            );


        const projectMetadata: ProjectMetadata = {


            workspacePath,


            name: metadata.name,


            exists: metadata.exists,


            isDirectory: metadata.isDirectory,


            entries


        };


        return this.success(
            projectMetadata
        );


    }


}
Step 7 — Important: Check Your Existing ProjectMetadata

Before pasting the above code, check your actual interface.

If your existing interface is something like:

export interface ProjectMetadata {


    workspacePath: string;


    name: string;


    exists: boolean;


    isDirectory: boolean;


    entries: string[];


}

then the code above can be used directly.

But if your interface has different fields

Do not change the interface just to match my example.

Instead, send me the current:

projectMetadata.interface.ts

and I will adapt the detector to your actual model.

This is important because we should preserve your existing architecture rather than introducing unnecessary model changes.

Step 8 — Import Path

The import:

import { FilesystemService } from "../../services";

must match your existing barrel structure.

Your actual FilesystemService is located at:

backend/src/mcp/servers/filesystem/services/filesystem.service.ts

If your detector currently already imports FilesystemService through another path, keep the existing project convention.

Don't create duplicate barrel files just for this detector.

Step 9 — Error Handling

We're deliberately using the existing:

this.failure(...)

from DetectorBase.

For a missing workspace:

return this.failure([
    `Workspace does not exist: ${workspacePath}`
]);

For a path that exists but isn't a directory:

return this.failure([
    `Workspace path is not a directory: ${workspacePath}`
]);

Successful detection uses:

return this.success(
    projectMetadata
);

Therefore the detector continues to produce:

DetectorResult<ProjectMetadata>

without introducing another result format.

Step 10 — Expected Result

For a project such as:

my-project/
├── backend/
├── frontend/
├── package.json
├── README.md
└── docker-compose.yml

the detector could produce:

{
    detector: "metadata",


    success: true,


    data: {
        workspacePath: "/workspace/my-project",
        name: "my-project",
        exists: true,
        isDirectory: true,
        entries: [
            "backend",
            "frontend",
            "package.json",
            "README.md",
            "docker-compose.yml"
        ]
    },


    warnings: []
}

This is exactly the type of structured information that the later AI orchestration layer can consume.

Step 11 — Why Metadata Comes First

The overall analyzer will eventually look like:

                    ProjectAnalyzer
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
      Metadata         Language        Framework
      Detector         Detector        Detector
          │               │                │
          ▼               ▼                ▼
      Workspace        TypeScript       React
      structure        /Python          /NestJS

Metadata provides the foundation.

For example:

Metadata
   ↓
Project exists?
   ↓
Project directory?
   ↓
What files/directories exist?
   ↓
Other detectors can analyze them
Step 12 — Do Not Add AI Logic

The Metadata Detector should not call Ollama.

Don't do:

Ollama
   ↓
"Analyze this project"

The architecture is:

Filesystem
    ↓
Detectors
    ↓
ProjectAnalyzerService
    ↓
AnalyzeProjectTool
    ↓
MCP
    ↓
AI Agent

The detector produces structured facts.

The AI will interpret those facts later.

Step 13 — TypeScript Checkpoint

After implementing the detector:

npx tsc --noEmit

This is mandatory.

The workflow remains:

Modify MetadataDetector
        │
        ▼
npx tsc --noEmit
        │
        ├── ❌ Error
        │      │
        │      ▼
        │    Fix
        │      │
        │      └──────► tsc again
        │
        └── ✅ Pass
                │
                ▼
           5.6.2 COMPLETE
                │
                ▼
           5.6.3 Language
5.6.2 Success Criteria

We are finished with 5.6.2 when:

 Existing MetadataDetector is used.
 It extends DetectorBase<ProjectMetadata>.
 It implements the common detector contract through DetectorBase.
 It receives workspacePath.
 It uses the actual FilesystemService.
 It uses getMetadata().
 It uses listDirectory().
 listDirectory() is awaited.
 No DirectoryInfo.entries.
 No getFileMetadata().
 Missing workspace is handled.
 Non-directory workspace is handled.
 Result uses this.success().
 Failure uses this.failure().
 No AI/Ollama logic is introduced.
 npx tsc --noEmit passes.
One thing I want you to do before pasting the code

Because I don't want to overwrite your existing model assumptions, show me the current contents of:

backend/src/mcp/servers/filesystem/developer-tools/analysis/models/projectMetadata.interface.ts

(or wherever your repository's ProjectMetadata interface actually lives).

Then I'll give you the exact final metadata.detector.ts for your repository, including the correct imports and constructor, rather than making assumptions about the model.


5.6.3 — Language Detector
Objective

Detect the programming languages used in the workspace and return structured information that can later be consumed by:

ProjectAnalyzerService
MCP tools
the AI orchestration layer
the future VS Code extension
the agent's project-context prompt

The intended flow is:

workspacePath
      │
      ▼
LanguageDetector
      │
      ├── FilesystemService
      │       │
      │       ├── listDirectory()
      │       └── recursive/project-tree APIs
      │
      ▼
Analyze source files
      │
      ▼
Map extensions → languages
      │
      ▼
Structured Language Result
Important rule

For your actual project, we know:

listDirectory(): Promise<DirectoryInfo>

and:

readFile()
getFileMetadata()
buildProjectTree()

So do not use:

listDirectory(): string[]

or:

getMetadata()
Step 1 — Inspect the existing Language Detector

Before changing anything, please send me these two files:

backend/src/mcp/servers/filesystem/developer-tools/analysis/detectors/language.detector.ts

and:

backend/src/mcp/servers/filesystem/developer-tools/analysis/models/

Specifically, find the model used by LanguageDetector.

It may be something like:

language.interface.ts

or:

projectLanguage.interface.ts

or another name.

Why I want these first

We already learned from 5.6.2 that your actual project structure differs from some of the assumptions we initially made.

For example, your real model is:

export interface ProjectMetadata {
    name?: string;
    version?: string;
    description?: string;
    author?: string;
    license?: string;
}

So for Language Detector, I don't want to invent something like:

{
    primary: "TypeScript",
    languages: [],
    percentages: {}
}

unless your actual model supports it.

What we're aiming for

Conceptually, the detector should be able to transform something like:

src/
├── server.ts
├── app.ts
├── routes.js
├── styles.css
├── index.html
└── config.json

into structured information such as:

TypeScript
JavaScript
CSS
HTML

But eventually we can make this much more useful:

Language Analysis


Primary Language:
    TypeScript


Detected Languages:
    TypeScript
    JavaScript
    CSS
    HTML


Source Files:
    .ts  → TypeScript
    .js  → JavaScript
    .css → CSS
    .html → HTML

And later:

TypeScript: 72%
JavaScript: 18%
CSS: 7%
HTML: 3%

That information will be extremely useful to the AI agent.

One architectural consideration

Your FilesystemService already has:

buildProjectTree()

which recursively creates:

ProjectTree

That may be a better API for LanguageDetector than manually implementing recursive readdir() logic inside the detector.

So our preferred architecture may become:

LanguageDetector
       │
       ▼
FilesystemService
       │
       ▼
buildProjectTree()
       │
       ▼
ProjectTree
       │
       ▼
Inspect file extensions
       │
       ▼
Language mapping

This avoids duplicating filesystem traversal logic.

However, we should verify the actual ProjectTree types before implementing it.

What we should NOT do

Don't put this directly inside the detector:

fs.readdir(...)

or:

fs.stat(...)

because your architecture already has:

Detector
   ↓
FilesystemService
   ↓
Node fs

The detector should focus on analysis, not low-level filesystem operations.

5.6.3 implementation target

Once we inspect the existing files, we'll implement:

LanguageDetector
       │
       ├── validate workspace
       │
       ├── obtain project files
       │
       ├── ignore irrelevant files
       │
       ├── map extensions
       │
       ├── aggregate languages
       │
       └── return DetectorResult<T>

Then:

npx tsc --noEmit

must return:

0 errors

before we move to 5.6.4 Framework Detector.

Send me the current
language.detector.ts

and its Language model/interface.


5.6.4 — Framework Detector

The goal now is to answer:

Which framework does this project use?

For your AI developer assistant, this is much more valuable than simply knowing the programming language.

For example:

TypeScript
    ↓
FrameworkDetector
    ↓
package.json / project files
    ↓
NestJS

or:

JavaScript
    ↓
FrameworkDetector
    ↓
package.json
    ↓
Express

or:

TypeScript
    ↓
FrameworkDetector
    ↓
package.json
    ↓
Next.js
Before coding

Let's follow exactly the same process we've established.

Please paste the current:

backend/src/mcp/servers/filesystem/developer-tools/analysis/detectors/framework.detector.ts

and, if it exists, the framework-related model/interface.

I want to inspect the existing implementation first rather than replacing it with an assumed architecture.

Then I'll give you:

What is wrong/current limitation
Exact implementation
Exact file location
Dependency wiring changes
npx tsc --noEmit checkpoint
Then we move to 5.6.5 Runtime Detector

We'll keep building the project incrementally without accumulating TypeScript errors.