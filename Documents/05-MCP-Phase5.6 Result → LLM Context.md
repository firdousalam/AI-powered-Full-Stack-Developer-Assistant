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


5.6 progress
Step	Status
5.6.1 Detector Contract	✅
5.6.2 Metadata Detector	✅
5.6.3 Language Detector	✅
5.6.4 Framework Detector	✅
5.6.5 Runtime Detector	✅
TypeScript checkpoint	✅
Next: 5.6.6 — Package Manager Detector

This detector should identify the package/dependency manager, for example:

Node.js
├── package-lock.json  → npm
├── yarn.lock          → Yarn
├── pnpm-lock.yaml     → pnpm
├── bun.lock
└── bun.lockb          → Bun


Python
├── requirements.txt   → pip
├── poetry.lock       → Poetry
├── Pipfile.lock      → Pipenv


Java
├── pom.xml            → Maven
├── gradlew / build.gradle → Gradle


Rust
└── Cargo.toml         → Cargo


Go
└── go.mod             → Go Modules


Ruby
└── Gemfile.lock       → Bundler


PHP
└── composer.lock      → Composer


Dart
└── pubspec.lock       → Pub

Before I give you the implementation, we should inspect your existing PackageManagerDetector and workspaceReader API, just as we did for the previous detectors. That prevents us from introducing unsupported filesystem methods.

Send me your current:

backend/src/mcp/servers/filesystem/developer-tools/analysis/detectors/packageManager.detector.ts

and we'll implement 5.6.6 against your actual project code.

For 5.6.6, I recommend expanding detection while keeping:

DetectorBase<string>
DetectorResult<string>
workspaceReader.exists()

exactly as your current detector framework expects.

Replace your current buildTool.detector.ts with

```ts 

import {
    DetectorBase
} from "./base/detector.base";

import {
    DetectorResult
} from "../models";

import {
    workspaceReader
} from "../readers";


export class BuildToolDetector
    extends DetectorBase<string> {

    readonly name = "BuildToolDetector";


    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        /*
         * ============================================================
         * Frontend / JavaScript / TypeScript
         * ============================================================
         */

        const frontendBuildTools: Record<string, string> = {

            "vite.config.ts":
                "Vite",

            "vite.config.js":
                "Vite",

            "vite.config.mjs":
                "Vite",

            "vite.config.cjs":
                "Vite",

            "webpack.config.js":
                "Webpack",

            "webpack.config.ts":
                "Webpack",

            "webpack.config.mjs":
                "Webpack",

            "webpack.config.cjs":
                "Webpack",

            "rollup.config.js":
                "Rollup",

            "rollup.config.ts":
                "Rollup",

            "rollup.config.mjs":
                "Rollup",

            "rollup.config.cjs":
                "Rollup",

            ".parcelrc":
                "Parcel",

            "parcel.config.js":
                "Parcel",

            "parcel.config.ts":
                "Parcel",

            "esbuild.config.js":
                "esbuild",

            "esbuild.config.ts":
                "esbuild",

            "esbuild.config.mjs":
                "esbuild",

            "tsup.config.ts":
                "tsup",

            "tsup.config.js":
                "tsup",

            "gulpfile.js":
                "Gulp",

            "gulpfile.ts":
                "Gulp",

            "Gruntfile.js":
                "Grunt",

            "Gruntfile.ts":
                "Grunt"

        };


        for (
            const [file, tool]
            of Object.entries(frontendBuildTools)
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {

                return this.success(tool);

            }

        }


        /*
         * ============================================================
         * Monorepo / Build Orchestration
         * ============================================================
         */

        const monorepoBuildTools: Record<string, string> = {

            "turbo.json":
                "Turbo",

            "nx.json":
                "Nx",

            "lerna.json":
                "Lerna",

            "rush.json":
                "Rush"

        };


        for (
            const [file, tool]
            of Object.entries(monorepoBuildTools)
        ) {

            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {

                return this.success(tool);

            }

        }


        /*
         * ============================================================
         * Next.js
         * ============================================================
         *
         * Next.js has its own build system.
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "next.config.js"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "next.config.mjs"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "next.config.ts"
            )
        ) {

            return this.success(
                "Next.js"
            );

        }


        /*
         * ============================================================
         * Java / JVM
         * ============================================================
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "pom.xml"
            )
        ) {

            return this.success(
                "Maven"
            );

        }


        if (
            await workspaceReader.exists(
                workspacePath,
                "build.gradle"
            ) ||
            await workspaceReader.exists(
                workspacePath,
                "build.gradle.kts"
            )
        ) {

            return this.success(
                "Gradle"
            );

        }


        /*
         * ============================================================
         * Python
         * ============================================================
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "pyproject.toml"
            )
        ) {

            /*
             * pyproject.toml can be used by multiple tools.
             * We use it as a generic Python build/project
             * configuration indicator here.
             */
            return this.success(
                "Python Build"
            );

        }


        if (
            await workspaceReader.exists(
                workspacePath,
                "setup.py"
            )
        ) {

            return this.success(
                "setuptools"
            );

        }


        if (
            await workspaceReader.exists(
                workspacePath,
                "setup.cfg"
            )
        ) {

            return this.success(
                "setuptools"
            );

        }


        /*
         * ============================================================
         * Rust
         * ============================================================
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "Cargo.toml"
            )
        ) {

            return this.success(
                "Cargo"
            );

        }


        /*
         * ============================================================
         * Go
         * ============================================================
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "go.mod"
            )
        ) {

            return this.success(
                "Go"
            );

        }


        /*
         * ============================================================
         * C / C++
         * ============================================================
         */

        if (
            await workspaceReader.exists(
                workspacePath,
                "CMakeLists.txt"
            )
        ) {

            return this.success(
                "CMake"
            );

        }


        if (
            await workspaceReader.exists(
                workspacePath,
                "Makefile"
            )
        ) {

            return this.success(
                "Make"
            );

        }


        /*
         * ============================================================
         * Unknown
         * ============================================================
         */

        return this.success(
            "Unknown"
        );

    }

}

```


5.6.7 — Entry Point Detector
File
backend/
└── src/
    └── mcp/
        └── servers/
            └── filesystem/
                └── developer-tools/
                    └── analysis/
                        └── detectors/
                            └── entryPoint.detector.ts
Replace the current detector with
import {




        /*
         * ============================================================
         * Rust
         * ============================================================
         */


        const rustEntryPoints = [


            "src/main.rs",
            "src/lib.rs"


        ];




        for (
            const entryPoint
            of rustEntryPoints
        ) {


            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {


                return this.success(
                    entryPoint
                );


            }


        }




        /*
         * ============================================================
         * C / C++
         * ============================================================
         */


        const cppEntryPoints = [


            "main.cpp",
            "main.cc",
            "main.cxx",
            "main.c",


            "src/main.cpp",
            "src/main.cc",
            "src/main.cxx",
            "src/main.c"


        ];




        for (
            const entryPoint
            of cppEntryPoints
        ) {


            if (
                await workspaceReader.exists(
                    workspacePath,
                    entryPoint
                )
            ) {


                return this.success(
                    entryPoint
                );


            }


        }




        /*
         * ============================================================
         * Unknown
         * ============================================================
         */


        return this.success(
            "Unknown"
        );


    }


}
Why we're doing it this way

The important point is that 5.6.7 should not try to find every source file.

For example, if the project contains:

src/
├── controllers/
│   ├── user.controller.ts
│   └── product.controller.ts
├── services/
│   ├── user.service.ts
│   └── product.service.ts
├── routes/
│   └── user.routes.ts
└── server.ts

we want:

Entry Point
    ↓
src/server.ts

rather than randomly returning a controller or service.

This information will eventually become part of the AI-ready project context:

Project
├── Language       → TypeScript
├── Framework      → Express
├── Runtime        → Node.js
├── Package Manager→ npm
├── Build Tool     → Vite
├── Entry Point    → src/server.ts
├── Docker         → detected
├── Kubernetes     → detected
├── Git            → detected
└── CI/CD          → detected

That is exactly what makes your Developer Tool Framework more useful than simply exposing raw filesystem operations to the LLM.

Important limitation

At this stage, this is a convention-based detector. It does not yet inspect package.json:

{
  "scripts": {
    "start": "node dist/server.js"
  }
}

or:

{
  "main": "dist/index.js"
}

We can make the detector considerably smarter later by combining:

package.json
framework conventions
source-file conventions
build configuration
runtime configuration

But I recommend not adding that complexity yet. We're implementing the detectors incrementally and keeping npx tsc --noEmit green after each one.

Checkpoint

Run:

npx tsc --noEmit

Expected:

PS ...\backend> npx tsc --noEmit
PS ...\backend>

If that passes, 5.6.7 is complete.

Then our next step is:

5.6.8 — Docker Detector

where we'll detect things such as Dockerfile, docker-compose.yml, Compose variants, and Docker-related


docker.detector.ts

Update it to this:

import {
        let composeFile: string | undefined;




        for (const file of composeFiles) {


            if (
                await workspaceReader.exists(
                    workspacePath,
                    file
                )
            ) {


                composeFile = file;


                break;


            }


        }




        /*
         * ============================================================
         * .dockerignore
         * ============================================================
         */


        const dockerignore =
            await workspaceReader.exists(
                workspacePath,
                ".dockerignore"
            );




        /*
         * ============================================================
         * Docker directory
         * ============================================================
         */


        const dockerDirectory =
            await workspaceReader.exists(
                workspacePath,
                "docker"
            );




        /*
         * ============================================================
         * Detection result
         * ============================================================
         */


        const detected =
            Boolean(
                dockerfile ||
                composeFile ||
                dockerignore ||
                dockerDirectory
            );




        return this.success({


            detected,


            dockerfile,


            composeFile,


            dockerignore


        });


    }


}
Why this is better

Your project already expects DockerInfo, so we should preserve the structured result.

For example, a project containing:

Dockerfile
docker-compose.yml
.dockerignore

will produce:

{
    detected: true,
    dockerfile: "Dockerfile",
    composeFile: "docker-compose.yml",
    dockerignore: true
}

A project without Docker:

{
    detected: false,
    dockerignore: false
}

This is much more useful for your AI-ready project analysis than simply returning "Dockerfile".

Important

Don't modify projectAnalysisResult.interface.ts just to make the compiler error disappear.

Your existing code is telling us that the intended contract is:

ProjectAnalysisResult
        │
        └── DockerInfo
                │
                ├── detected
                ├── dockerfile
                ├── composeFile
                └── dockerignore

So the detector should satisfy that contract.

Now run:

npx tsc --noEmit

If another error appears, send me the complete output. We'll fix the actual contract mismatch rather than weakening the types.

 npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Excellent. ✅ 5.6.8 — Docker Detector is now complete.

Your TypeScript checkpoint is clean:

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>

No errors.

Current detector progress
Step	Detector	Status
5.6.1	Detector Contract	✅
5.6.2	Metadata	✅
5.6.3	Language	✅
5.6.4	Framework	✅
5.6.5	Package Manager	✅
5.6.6	Build Tool	✅
5.6.7	Entry Point	✅
5.6.8	Docker	✅
5.6.9	Kubernetes	🔜 NEXT
5.6.10	Git	⏳
5.6.11	CI/CD	⏳
5.6.12	Project Analyzer Integration	⏳
5.6.13	Analyze Project Tool	⏳
5.6.14	Testing & Validation	⏳
What 5.6.8 now provides

The project analyzer can identify Docker information such as:

{
    detected: true,
    dockerfile: "Dockerfile",
    composeFile: "docker-compose.yml",
    dockerignore: true
}

This is much better context for the eventual AI agent than simply telling the LLM that "Docker exists."

Next: 5.6.9 — Kubernetes Detector

We'll detect Kubernetes project configuration, including:

k8s/
kubernetes/
manifests/
deployment.yaml
deployment.yml
service.yaml
service.yml
statefulset.yaml
configmap.yaml
secret.yaml
ingress.yaml
namespace.yaml
kustomization.yaml
helm/
Chart.yaml

And preserve your existing KubernetesInfo model/contract rather than inventing a new one.

Next coding step: 5.6.9 — Kubernetes Detector.

5.6.10 — Git Detector

Now we’ll implement the Git Detector as the next Project Analyzer detector.

The goal is to detect whether the project is a Git repository and extract useful Git-related information without executing destructive Git commands.

1. Create

backend/src/mcp/servers/filesystem/developer-tools/analysis/detectors/git.detector.ts

import { execFile } from "child_process";
            const entries = await this.filesystemService.listDirectory(
                workspacePath,
            );


            return entries.some(
                (entry) =>
                    entry === ".git" ||
                    entry.endsWith("/.git") ||
                    entry.endsWith("\\.git"),
            );
        } catch {
            return false;
        }
    }


    private async getCurrentBranch(
        workspacePath: string,
    ): Promise<string | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["rev-parse", "--abbrev-ref", "HEAD"],
                {
                    cwd: workspacePath,
                },
            );


            const branch = stdout.trim();


            return branch || undefined;
        } catch {
            return undefined;
        }
    }


    private async getRemote(
        workspacePath: string,
    ): Promise<string | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["config", "--get", "remote.origin.url"],
                {
                    cwd: workspacePath,
                },
            );


            const remote = stdout.trim();


            return remote || undefined;
        } catch {
            return undefined;
        }
    }


    private async isWorkingTreeDirty(
        workspacePath: string,
    ): Promise<boolean | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["status", "--porcelain"],
                {
                    cwd: workspacePath,
                },
            );


            return stdout.trim().length > 0;
        } catch {
            return undefined;
        }
    }
}
2. Important API decision

Notice that this uses the current FilesystemService API:

listDirectory()

and treats its result as:

string[]

We are not using the older:

DirectoryInfo.entries

or:

getFileMetadata()

APIs.

The detector first checks for .git, then uses Git itself for branch/remote/status information.

3. Add the detector to ProjectAnalyzer

Open your existing:

project-analyzer.service.ts

Add the import:

import { GitDetector } from "./detectors/git.detector";

Then inject it into the constructor alongside your existing detectors:

private readonly gitDetector: GitDetector,

For example:

constructor(
    private readonly metadataDetector: MetadataDetector,
    private readonly languageDetector: LanguageDetector,
    private readonly frameworkDetector: FrameworkDetector,
    private readonly runtimeDetector: RuntimeDetector,
    private readonly packageManagerDetector: PackageManagerDetector,
    private readonly buildToolDetector: BuildToolDetector,
    private readonly entryPointDetector: EntryPointDetector,
    private readonly dockerDetector: DockerDetector,
    private readonly kubernetesDetector: KubernetesDetector,
    private readonly gitDetector: GitDetector,
) {}

Use your actual existing constructor structure if it differs.

4. Add Git to the analysis result

Your ProjectAnalysisResult should contain Git information.

If your result currently has detector-specific properties, add:

git?: GitInfo;

and import:

import { GitInfo } from "../analysis/detectors/git.detector";

Adjust the relative path to match the location of your interface.

The resulting structure should conceptually look like:

export interface ProjectAnalysisResult {
    metadata?: MetadataInfo;
    language?: LanguageInfo;
    framework?: FrameworkInfo;
    runtime?: RuntimeInfo;
    packageManager?: PackageManagerInfo;
    buildTool?: BuildToolInfo;
    entryPoint?: EntryPointInfo;
    docker?: DockerInfo;
    kubernetes?: KubernetesInfo;
    git?: GitInfo;
}
5. Execute the detector

Where your ProjectAnalyzer runs the individual detectors, add:

const git = await this.gitDetector.detect(context);

Then include it in the returned result:

return {
    metadata,
    language,
    framework,
    runtime,
    packageManager,
    buildTool,
    entryPoint,
    docker,
    kubernetes,
    git,
};

Again, preserve your existing implementation rather than replacing the entire method.

6. Expected output

For your current GitHub project, the detector should be capable of producing something similar to:

{
    "git": {
        "isGitRepository": true,
        "branch": "main",
        "remote": "https://github.com/firdousalam/AI-powered-Full-Stack-Developer-Assistant.git",
        "isDirty": true
    }
}

isDirty: true simply means there are uncommitted changes.

7. TypeScript checkpoint

After implementing 5.6.10, run:

npx tsc --noEmit

This is our mandatory checkpoint.

Do not move to 5.6.11 yet. Paste the complete tsc output here. If it is clean, we'll proceed to the next detector.

npx tsc --noEmit
src/mcp/servers/filesystem/developer-tools/analysis/analyzeProject.factory.ts:62:13 - error TS2554: Expected 1 arguments, but got 0.

62             new GitDetector(),
               ~~~~~~~~~~~~~~~~~

  src/mcp/servers/filesystem/developer-tools/analysis/detectors/git.detector.ts:18:9 - An argument for 'filesystemService' was not provided.
    18         private readonly filesystemService: FilesystemService,
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/mcp/servers/filesystem/developer-tools/analysis/detectors/git.detector.ts:52:28 - error TS2339: Property 'some' does not exist on type 'DirectoryInfo'.

52             return entries.some(
                              ~~~~

src/mcp/servers/filesystem/developer-tools/analysis/detectors/git.detector.ts:53:18 - error TS7006: Parameter 'entry' implicitly has an 'any' type.

53                 (entry) =>
                    ~~~~~

src/mcp/servers/filesystem/developer-tools/analysis/services/index.ts:43:9 - error TS2554: Expected 1 arguments, but got 0.

43         new GitDetector(),
           ~~~~~~~~~~~~~~~~~

  src/mcp/servers/filesystem/developer-tools/analysis/detectors/git.detector.ts:18:9 - An argument for 'filesystemService' was not provided.
    18         private readonly filesystemService: FilesystemService,
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

src/mcp/servers/filesystem/developer-tools/analysis/services/projectAnalyzer.service.ts:114:17 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'DeveloperToolContext'.

114                 workspacePath
                    ~~~~~~~~~~~~~

src/mcp/servers/filesystem/developer-tools/analysis/services/projectAnalyzer.service.ts:143:22 - error TS2339: Property 'data' does not exist on type 'GitInfo'.

143             git: git.data,
                         ~~~~


Found 6 errors in 4 files.

Errors  Files
     1  src/mcp/servers/filesystem/developer-tools/analysis/analyzeProject.factory.ts:62
     2  src/mcp/servers/filesystem/developer-tools/analysis/detectors/git.detector.ts:52
     1  src/mcp/servers/filesystem/developer-tools/analysis/services/index.ts:43
     2  src/mcp/servers/filesystem/developer-tools/analysis/services/projectAnalyzer.service.ts:114

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Good — these errors show that my previous Git Detector implementation did not match your existing detector architecture. We should fix it rather than changing the rest of your framework.

There are 3 root causes:

GitDetector should be instantiated with no constructor dependency.
Your ProjectAnalyzer calls detectors with workspacePath: string, not DeveloperToolContext.
Your GitDetector.detect() returns GitInfo directly, so git.data is incorrect.

Also, your current compiler says listDirectory() returns DirectoryInfo in this codebase, so we should not use it at all for Git detection. Git itself can reliably determine whether the workspace is a repository.

Fix 5.6.10 — Git Detector
1. Replace git.detector.ts

Replace the complete contents of:

src/mcp/servers/filesystem/developer-tools/analysis/detectors/git.detector.ts

with:

import { execFile } from "child_process";
    ): Promise<boolean> {
        try {
            await execFileAsync(
                "git",
                ["rev-parse", "--is-inside-work-tree"],
                {
                    cwd: workspacePath,
                },
            );


            return true;
        } catch {
            return false;
        }
    }


    private async getCurrentBranch(
        workspacePath: string,
    ): Promise<string | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["branch", "--show-current"],
                {
                    cwd: workspacePath,
                },
            );


            const branch = stdout.trim();


            return branch || undefined;
        } catch {
            return undefined;
        }
    }


    private async getRemote(
        workspacePath: string,
    ): Promise<string | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["config", "--get", "remote.origin.url"],
                {
                    cwd: workspacePath,
                },
            );


            const remote = stdout.trim();


            return remote || undefined;
        } catch {
            return undefined;
        }
    }


    private async isWorkingTreeDirty(
        workspacePath: string,
    ): Promise<boolean | undefined> {
        try {
            const { stdout } = await execFileAsync(
                "git",
                ["status", "--porcelain"],
                {
                    cwd: workspacePath,
                },
            );


            return stdout.trim().length > 0;
        } catch {
            return undefined;
        }
    }
}
Why this version is better

It removes:

FilesystemService

completely.

We don't need filesystem inspection to detect Git. This command:

git rev-parse --is-inside-work-tree

is the correct source of truth.

It also makes the detector match your existing architecture:

detect(workspacePath: string)

instead of:

detect(context: DeveloperToolContext)
2. analyzeProject.factory.ts

Your error:

new GitDetector()
Expected 1 arguments, but got 0

will disappear because the new GitDetector has no constructor.

So keep:

new GitDetector(),

No additional change is required there.

3. analysis/services/index.ts

Same issue:

new GitDetector()

will now compile because GitDetector doesn't require FilesystemService.

Again, no change required.

4. Fix projectAnalyzer.service.ts

You currently have something around line 114 like:

const git = await this.gitDetector.detect(
    workspacePath,
);

This is now correct with the new detector signature.

The error:

Argument of type 'string' is not assignable to parameter of type 'DeveloperToolContext'

will disappear.

5. Fix git.data

Your line 143 currently appears to be:

git: git.data,

Change it to:

git,

Because:

GitDetector.detect()

returns:

GitInfo

directly.

It does not return:

{
    data: GitInfo;
}

So your final section should be:

return {
    metadata,
    language,
    framework,
    runtime,
    packageManager,
    buildTool,
    entryPoint,
    docker,
    kubernetes,
    git,
};
6. Don't change DirectoryInfo

The previous error:

Property 'some' does not exist on type 'DirectoryInfo'

came from my earlier assumption that your current listDirectory() returned string[].

Your actual TypeScript compiler is the authoritative source for the current checkout, so we won't modify FilesystemService or DirectoryInfo just for this detector.

The new Git detector doesn't use either one.

7. Run the checkpoint again

Now run:

npx tsc --noEmit
Expected result

Ideally:

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>

No TypeScript errors.

Once this passes, 5.6.10 — Git Detector is complete and we'll move to 5.6.11 — CI/CD Detector.

-noEmit
src/mcp/servers/filesystem/developer-tools/analysis/services/projectAnalyzer.service.ts:143:22 - error TS2339: Property 'data' does not exist on type 'GitInfo'.

143             git: git.data,
                         ~~~~


Found 1 error in src/mcp/servers/filesystem/developer-tools/analysis/services/projectAnalyzer.service.ts:143

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Exactly — now there is only one error, and it is straightforward.

Your GitDetector.detect() returns GitInfo directly, but projectAnalyzer.service.ts is still accessing .data.

Fix

Open:

src/mcp/servers/filesystem/developer-tools/analysis/services/projectAnalyzer.service.ts

At line 143, change:

git: git.data,

to:

git,

So the return section should be:

return {
    metadata: metadata.data,
    language: language.data,
    framework: framework.data,
    runtime: runtime.data,
    packageManager: packageManager.data,
    buildTool: buildTool.data,
    entryPoint: entryPoint.data,
    docker: docker.data,
    kubernetes: kubernetes.data,
    git,
};

Important: Don't change the other .data properties unless TypeScript reports an error. Your existing detectors apparently return wrapper objects, while our new GitDetector returns GitInfo directly.

Then run the checkpoint again:

npx tsc --noEmit

If there is no output, we've successfully completed 5.6.10 — Git Detector.


5.11 milestones

I recommend breaking 5.11 into these smaller steps:

Step	Component	Purpose
5.11.1	MCP Orchestrator interfaces	Define orchestration contracts
5.11.2	MCP Tool Selection	Decide which developer tool is relevant
5.11.3	Tool Execution	Execute selected tools through MCP Gateway
5.11.4	AI Context Enrichment	Inject tool results into LLM context
5.11.5	Tool-aware Prompt Builder	Build structured prompts
5.11.6	AI → MCP → AI loop	Complete orchestration cycle
5.11.7	Error & timeout handling	Make orchestration reliable
5.11.8	Orchestration tests	Validate the complete flow
Architecture after 5.11
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    AI Service    │
                    └────────┬─────────┘
                             │
                             ▼
              ┌─────────────────────────────┐
              │   AI ↔ MCP Orchestrator     │
              │                             │
              │  • Intent Analysis          │
              │  • Tool Selection           │
              │  • Tool Execution           │
              │  • Context Enrichment       │
              └──────────────┬──────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   MCP Gateway    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        Filesystem      Developer       Future MCP
        MCP Server      Tools            Servers
              │              │
              └───────┬──────┘
                      ▼
                Project Context
                      │
                      ▼
              ┌──────────────────┐
              │       LLM        │
              └────────┬─────────┘
                       │
                       ▼
                    Response
Start with 5.11.1

Before writing the orchestrator, don't jump directly into LLM calls.

First we'll establish the contracts.

The first files should be approximately:

src/
└── mcp/
    └── orchestration/
        ├── ai-mcp-orchestrator.service.ts
        ├── interfaces/
        │   ├── orchestration-request.interface.ts
        │   ├── orchestration-result.interface.ts
        │   └── tool-selection-result.interface.ts
        └── types/
            └── orchestration.types.ts

The key design principle is:

The LLM should not directly know how to communicate with individual MCP servers.

Instead:

AI Service
    ↓
Orchestrator
    ↓
MCP Gateway
    ↓
MCP Server / Developer Tool

That separation will make it much easier later to add RAG, agents, Ollama, OpenAI-compatible models, VS Code integration, additional MCP servers, and eventually autonomous multi-step workflows.

For the next coding step, we should implement 5.11.1 — MCP Orchestrator Interfaces first, and keep npx tsc --noEmit as the checkpoint before moving to 5.11.2.


5.11.2 — MCP Tool Selection

Now we build the component that decides whether an MCP/developer tool is needed and which tool should be selected.

For this milestone, keep the implementation deterministic. We are not connecting the LLM yet. That comes later, and keeping selection separate will make the architecture much easier to evolve.

1. Target architecture
User Message
     │
     ▼
MCP Tool Selector
     │
     ├── No tool required
     │
     ├── One tool
     │
     └── Multiple tools
            │
            ▼
   ToolSelectionResult

We'll create:

src/mcp/orchestration/
├── interfaces/
│   ├── orchestration-request.interface.ts
│   ├── orchestration-result.interface.ts
│   └── tool-selection-result.interface.ts
├── services/
│   └── mcp-tool-selector.service.ts
└── types/
    └── orchestration.types.ts
2. Create mcp-tool-selector.service.ts

Create:

src/mcp/orchestration/services/mcp-tool-selector.service.ts

Use:

import { OrchestrationRequest } from "../interfaces/orchestration-request.interface";
import {
    SelectedTool,
    ToolSelectionResult,
} from "../interfaces/tool-selection-result.interface";


export class McpToolSelectorService {
    select(
        request: OrchestrationRequest,
    ): ToolSelectionResult {
        const message = request.userMessage.toLowerCase();


        const tools: SelectedTool[] = [];


        if (this.requiresProjectAnalysis(message)) {
            tools.push({
                toolName: "analyzeProject",
                reason: "The request requires project-level analysis.",
            });
        }


        if (this.requiresFileSearch(message)) {
            tools.push({
                toolName: "searchFiles",
                reason: "The request requires searching project files.",
            });
        }


        if (tools.length === 0) {
            return {
                strategy: "none",
                tools: [],
                reasoning: "No MCP tool is required for this request.",
            };
        }


        return {
            strategy: tools.length === 1 ? "single" : "multiple",
            tools,
            reasoning: `Selected ${tools.length} MCP tool(s) based on the user request.`,
        };
    }


    private requiresProjectAnalysis(
        message: string,
    ): boolean {
        const keywords = [
            "project",
            "architecture",
            "framework",
            "technology",
            "tech stack",
            "docker",
            "kubernetes",
            "k8s",
            "git",
            "cicd",
            "ci/cd",
            "deployment",
            "repository",
            "repo",
        ];


        return this.containsKeyword(message, keywords);
    }


    private requiresFileSearch(
        message: string,
    ): boolean {
        const keywords = [
            "find file",
            "find files",
            "search file",
            "search files",
            "where is",
            "which file",
            "locate",
            "search for",
        ];


        return this.containsKeyword(message, keywords);
    }


    private containsKeyword(
        message: string,
        keywords: string[],
    ): boolean {
        return keywords.some((keyword) =>
            message.includes(keyword),
        );
    }
}
3. Why we use a separate selector

Don't put this logic directly inside the orchestrator.

We want:

McpToolSelectorService
        │
        │ decides
        ▼
ToolSelectionResult
        │
        ▼
McpOrchestratorService
        │
        │ executes
        ▼
MCP Gateway

This separation becomes very important when we introduce an LLM.

Today:

Rules
 ↓
Tool selection

Later:

User request
 ↓
LLM
 ↓
Structured tool-selection decision
 ↓
Validation
 ↓
MCP Gateway

The orchestrator doesn't need to change dramatically.

4. Example

Given:

Why is my Kubernetes deployment failing?

The selector sees:

kubernetes
deployment

and produces:

{
    strategy: "single",
    tools: [
        {
            toolName: "analyzeProject",
            reason: "The request requires project-level analysis."
        }
    ]
}

For:

Find the Dockerfile and tell me where it is used.

the selector can produce:

{
    strategy: "multiple",
    tools: [
        {
            toolName: "analyzeProject"
        },
        {
            toolName: "searchFiles"
        }
    ]
}

And for:

What is JavaScript?

it produces:

{
    strategy: "none",
    tools: [],
    reasoning: "No MCP tool is required for this request."
}
5. One important limitation

The current implementation is intentionally simple.

For example:

"How do I configure Kubernetes?"

may trigger analyzeProject because of the word Kubernetes, even though the user might only be asking a general conceptual question.

That's okay at 5.11.2.

We are establishing the orchestration architecture first.

Later, the LLM-based selector can distinguish:

"What is Kubernetes?"
        ↓
No MCP


"Is Kubernetes configured in my project?"
        ↓
MCP required

That will be a major improvement.

6. Don't wire it into the AI Service yet

For this milestone, don't modify the existing AI service.

We're first validating:

OrchestrationRequest
        ↓
McpToolSelectorService
        ↓
ToolSelectionResult

The next milestone will connect selection to actual MCP execution.

7. TypeScript checkpoint

Run:

npx tsc --noEmit

If you get:

PS ...\backend> npx tsc --noEmit
PS ...\backend>

with no errors, then:

5.11.2 — MCP Tool Selection is complete.

Paste the complete tsc output next.

After it passes, we'll implement 5.11.3 — MCP Tool Execution, where the selected toolName actually gets routed through your existing MCP Gateway rather than being executed directly by the AI layer.