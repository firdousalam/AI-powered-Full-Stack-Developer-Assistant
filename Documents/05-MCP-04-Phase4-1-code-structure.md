The goal is to keep it consistent with ProjectAnalyzer and DependencyAnalyzer:

CodeStructureAnalyzerTool
        ↓
CodeStructureAnalyzerService
        ↓
Structure Detectors
        ↓
CodeStructureAnalysisResult
        ↓
DeveloperToolMcpAdapter
        ↓
Filesystem MCP Server
        ↓
MCP Gateway
Part 4 — Phase 1: Models

First create the models before writing detectors.

Folder
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/

Create:

code-structure/
│
├── models/
│   ├── structureFile.interface.ts
│   ├── structureDirectory.interface.ts
│   ├── module.interface.ts
│   ├── controller.interface.ts
│   ├── service.interface.ts
│   ├── route.interface.ts
│   ├── model.interface.ts
│   ├── entryPoint.interface.ts
│   ├── architecture.interface.ts
│   ├── codeStructureAnalysisResult.interface.ts
│   ├── codeStructureDetector.interface.ts
│   ├── codeStructureDetectorResult.interface.ts
│   └── index.ts
│
├── detectors/
├── services/
├── codeStructureAnalyzer.tool.ts
├── codeStructureAnalyzer.factory.ts
└── index.ts
What each model represents
Model	Responsibility
StructureFile	File path, name, extension
StructureDirectory	Directory information
Module	Application modules
Controller	Controllers detected
Service	Services detected
Route	API routes
Model	Data/domain models
EntryPoint	Application entry points
Architecture	MVC, layered, modular, etc.
CodeStructureAnalysisResult	Combined final result
Step 1 — StructureFile
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/structureFile.interface.ts
export interface StructureFile {

    path: string;

    name: string;

    extension: string;

}
Step 2 — StructureDirectory
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/structureDirectory.interface.ts
export interface StructureDirectory {

    path: string;

    name: string;

    files: number;

    directories: number;

}
Step 3 — Module
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/module.interface.ts
export interface CodeModule {

    name: string;

    path: string;

    files: string[];

}

I recommend calling the interface CodeModule rather than Module because Module can become confusing with TypeScript/Node module terminology.

Step 4 — Controller
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/controller.interface.ts
export interface ControllerInfo {

    name: string;

    path: string;

    framework?: string;

}
Step 5 — Service
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/service.interface.ts
export interface ServiceInfo {

    name: string;

    path: string;

}
Step 6 — Route
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/route.interface.ts
export interface RouteInfo {

    path: string;

    method?: string;

    source?: string;

}
Step 7 — Model
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/model.interface.ts
export interface ModelInfo {

    name: string;

    path: string;

    type?: string;

}
Step 8 — Entry Point
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/entryPoint.interface.ts
export interface EntryPointInfo {

    path: string;

    type: string;

}

For example:

{
    "path": "src/server.ts",
    "type": "application"
}
Step 9 — Architecture
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/architecture.interface.ts
export interface ArchitectureInfo {

    type: string;

    confidence: number;

    indicators: string[];

}

Example:

{
    "type": "layered",
    "confidence": 0.85,
    "indicators": [
        "controllers directory",
        "services directory",
        "routes directory"
    ]
}
Step 10 — Detector Result
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/codeStructureDetectorResult.interface.ts
export interface CodeStructureDetectorResult<T> {

    detector: string;

    success: boolean;

    data: T;

    warnings: string[];

}

This follows the same pattern you already established with:

DetectorResult
DependencyDetectorResult
Step 11 — Detector Interface
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/codeStructureDetector.interface.ts
import {
    CodeStructureDetectorResult
} from "./codeStructureDetectorResult.interface";


export interface CodeStructureDetector<T> {

    readonly name: string;

    detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<T>
    >;

}
Step 12 — Final Result
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/codeStructureAnalysisResult.interface.ts
import {
    StructureFile
} from "./structureFile.interface";

import {
    StructureDirectory
} from "./structureDirectory.interface";

import {
    CodeModule
} from "./module.interface";

import {
    ControllerInfo
} from "./controller.interface";

import {
    ServiceInfo
} from "./service.interface";

import {
    RouteInfo
} from "./route.interface";

import {
    ModelInfo
} from "./model.interface";

import {
    EntryPointInfo
} from "./entryPoint.interface";

import {
    ArchitectureInfo
} from "./architecture.interface";


export interface CodeStructureAnalysisResult {

    directories: StructureDirectory[];

    files: StructureFile[];

    modules: CodeModule[];

    controllers: ControllerInfo[];

    services: ServiceInfo[];

    routes: RouteInfo[];

    models: ModelInfo[];

    entryPoints: EntryPointInfo[];

    architecture: ArchitectureInfo;

}
Step 13 — Models index
📂
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/index.ts
export * from "./structureFile.interface";

export * from "./structureDirectory.interface";

export * from "./module.interface";

export * from "./controller.interface";

export * from "./service.interface";

export * from "./route.interface";

export * from "./model.interface";

export * from "./entryPoint.interface";

export * from "./architecture.interface";

export * from "./codeStructureAnalysisResult.interface";

export * from "./codeStructureDetector.interface";

export * from "./codeStructureDetectorResult.interface";
Our next phase

Once these models compile, we'll move to:

Phase 2 — Core Detectors

We'll build these one at a time:

DirectoryDetector
       ↓
FileDetector
       ↓
ModuleDetector
       ↓
ControllerDetector
       ↓
ServiceDetector
       ↓
RouteDetector
       ↓
ModelDetector
       ↓
EntryPointDetector
       ↓
ArchitectureDetector

Then:

CodeStructureAnalyzerService
        ↓
CodeStructureAnalyzerTool
        ↓
DeveloperToolRegistry
        ↓
Filesystem MCP Server
        ↓
MCP Gateway

And finally your project intelligence layer becomes:

                 Project Intelligence
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
   Project Analyzer  Dependency     Code Structure
                     Analyzer         Analyzer
          │              │              │
          ▼              ▼              ▼
      ProjectInfo   Dependencies    Architecture

First implement the models above and run npx tsc --noEmit. Then the next concrete file will be:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/directory.detector.ts

That detector will establish the foundation for the rest of the Code Structure Analyzer.


Yes. Assuming the models compile, let's implement Phase 2, Step 1 — DirectoryDetector.

Step 1 — DirectoryDetector
File location
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/directory.detector.ts

The detector's responsibility is only to discover directories. It should not detect controllers, services, routes, architecture, etc.

Code
import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureDirectory
} from "../models";


/**
 * Detects directories inside the project workspace.
 *
 * Responsibilities:
 * - Traverse the workspace
 * - Identify directories
 * - Return directory metadata
 *
 * This detector intentionally contains no
 * architecture or framework detection logic.
 */
export class DirectoryDetector
    implements CodeStructureDetector<StructureDirectory[]> {

    readonly name =
        "DirectoryDetector";


    /**
     * Detect directories recursively.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureDirectory[]
        >
    > {

        try {

            const directories =
                await this.scanDirectory(
                    workspacePath,
                    workspacePath
                );

            return {

                detector:
                    this.name,

                success:
                    true,

                data:
                    directories,

                warnings:
                    []

            };

        }
        catch (error) {

            return {

                detector:
                    this.name,

                success:
                    false,

                data:
                    [],

                warnings: [

                    error instanceof Error
                        ? error.message
                        : "Failed to detect directories."

                ]

            };

        }

    }


    /**
     * Recursively scans directories.
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureDirectory[]> {

        const results:
            StructureDirectory[] = [];


        const entries =
            await filesystemService.listDirectory(
                currentPath
            );


        for (const entry of entries) {

            /**
             * Depending on the existing
             * FilesystemService implementation,
             * entry may already contain
             * directory metadata.
             */
            const entryPath =
                path.join(
                    currentPath,
                    entry.name
                );


            if (entry.isDirectory) {

                const relativePath =
                    path.relative(
                        rootPath,
                        entryPath
                    );


                results.push({

                    path:
                        relativePath || ".",

                    name:
                        entry.name,

                    files:
                        0,

                    directories:
                        0

                });


                const children =
                    await this.scanDirectory(
                        rootPath,
                        entryPath
                    );


                results.push(
                    ...children
                );

            }

        }


        return results;

    }

}
Important

There is one thing we need to verify against your existing FilesystemService:

filesystemService.listDirectory(...)

and the returned entry structure.

Your existing filesystem service may return something like:

{
    name: string,
    path: string,
    isDirectory: boolean,
    isFile: boolean
}

or it may use a different property name.

So don't modify FilesystemService yet.

Run:

npx tsc --noEmit

If TypeScript reports something such as:

Property 'listDirectory' does not exist

or:

Property 'isDirectory' does not exist

send me that error and we'll adapt DirectoryDetector to your existing filesystem API rather than creating duplicate filesystem functionality.

One architectural improvement

Your current StructureDirectory model has:

files: number;
directories: number;

The detector above initially returns:

files: 0,
directories: 0

because counting children is a separate concern from discovering directories.

However, since your final Code Structure Analyzer should provide useful project intelligence, I recommend we eventually calculate:

{
    "path": "src",
    "name": "src",
    "files": 18,
    "directories": 7
}

We can add that when we refine the detector rather than mixing concerns prematurely.

After DirectoryDetector

The next file will be:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/file.detector.ts

Its responsibility:

Workspace
   │
   ├── directories
   │
   └── files ← FileDetector

It will produce:

[
    {
        "path": "src/app.ts",
        "name": "app.ts",
        "extension": ".ts"
    },
    {
        "path": "src/server.ts",
        "name": "server.ts",
        "extension": ".ts"
    }
]

Then we'll build the higher-level detectors on top of this information:

DirectoryDetector
        ↓
FileDetector
        ↓
ModuleDetector
        ↓
ControllerDetector
        ↓
ServiceDetector
        ↓
RouteDetector
        ↓
ModelDetector
        ↓
EntryPointDetector
        ↓
ArchitectureDetector

This keeps the same single-responsibility architecture you've already established in the Project and Dependency Analyzers.


Yes — now we have identified the real issue.

Your FilesystemService.listDirectory() implementation returns DirectoryInfo, but TypeScript says the imported filesystemService.listDirectory() is actually typed as string[] somewhere in your exported service/type setup.

So do not force DirectoryInfo here. We should adapt FileDetector to the actual API you currently have.

📂 File to modify
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/file.detector.ts

Replace the scanDirectory() method with this version:

/**
 * ========================================================
 * Recursive Directory Scanner
 * ========================================================
 *
 * Scans the workspace recursively and collects files.
 *
 * The current FilesystemService API returns the directory
 * entries as an array of strings.
 */
private async scanDirectory(
    rootPath: string,
    currentPath: string
): Promise<StructureFile[]> {

    const results:
        StructureFile[] = [];


    /**
     * Get directory entries.
     *
     * IMPORTANT:
     *
     * Your current FilesystemService typing returns
     * an array of file/directory names here.
     */
    const directoryEntries =
        await filesystemService.listDirectory(
            path.relative(
                rootPath,
                currentPath
            ) || "."
        );


    /**
     * Process every entry.
     */
    for (
        const entryName
        of directoryEntries
    ) {

        /**
         * Build absolute path.
         */
        const absolutePath =
            path.join(
                currentPath,
                entryName
            );


        /**
         * Determine whether the entry is a file
         * or directory using the filesystem service.
         */
        const metadata =
            await filesystemService.getFileMetadata(
                path.relative(
                    rootPath,
                    absolutePath
                )
            );


        /**
         * =================================================
         * File
         * =================================================
         */
        if (metadata.isFile) {

            const relativePath =
                path.relative(
                    rootPath,
                    absolutePath
                );


            results.push({

                path:
                    relativePath,

                name:
                    entryName,

                extension:
                    path.extname(
                        entryName
                    ),

                size:
                    metadata.size

            });


            continue;

        }


        /**
         * =================================================
         * Directory
         * =================================================
         */
        if (metadata.isDirectory) {

            const children =
                await this.scanDirectory(
                    rootPath,
                    absolutePath
                );


            results.push(
                ...children
            );

        }

    }


    return results;

}
But there is one important point

Your pasted FilesystemService contains:

public async listDirectory(
    directoryPath = "."
): Promise<DirectoryInfo>

and DirectoryInfo.entries is:

entries: DirectoryEntry[];

Therefore, the fact that TypeScript says listDirectory() returns string[] means there is another FilesystemService definition/export being used by this import:

import {
    filesystemService
} from "../../../../services";

So before changing more code, run:

grep -R "listDirectory" src/mcp/servers/filesystem -n

On Windows PowerShell, use:

Get-ChildItem -Recurse src\mcp\servers\filesystem -Filter *.ts |
    Select-String "listDirectory"

We need to find where listDirectory() is declared as returning string[].

Most likely issue

Your import:

from "../../../../services"

may be resolving to a different service/export than the FilesystemService you pasted.

The correct architecture should ultimately be:

filesystemService
       │
       ▼
FilesystemService.listDirectory()
       │
       ▼
DirectoryInfo
       │
       └── entries: DirectoryEntry[]

Once we fix that mismatch, both DirectoryDetector and FileDetector can use the same DirectoryInfo.entries API cleanly.

So don't modify filesystem.types.ts or randomly cast the result to DirectoryInfo. Find the string[] listDirectory() definition first.

 npx tsc --noEmit
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/file.detector.ts:180:41 - error TS2551: Property 'getFileMetadata' does not exist on type 'FilesystemService'. Did you mean 'getMetadata'?

180                 await filesystemService.getFileMetadata(
                                            ~~~~~~~~~~~~~~~

  src/mcp/servers/filesystem/services/filesystem.service.ts:78:11 - 'getMetadata' is declared here.
    78     async getMetadata(targetPath: string): Promise<FileMetadata | null> {
                 ~~~~~~~~~~~


Found 1 error in src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/file.detector.ts:180

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Good — now the error tells us exactly what is happening.

Your Code Structure Analyzer is importing a different FilesystemService than the large FilesystemService you pasted earlier.

The compiler explicitly says:

src/mcp/servers/filesystem/services/filesystem.service.ts

and that service has:

getMetadata()

not:

getFileMetadata()

So let's use the service API you actually have.

📂 File to modify
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/file.detector.ts

Change:

const metadata =
    await filesystemService.getFileMetadata(
        path.relative(
            rootPath,
            absolutePath
        )
    );

to:

const metadata =
    await filesystemService.getMetadata(
        path.relative(
            rootPath,
            absolutePath
        )
    );

However, your getMetadata() returns:

Promise<FileMetadata | null>

so we must handle null.

Replace the whole scanDirectory() with this
/**
 * ========================================================
 * Recursive Directory Scanner
 * ========================================================
 *
 * Scans the workspace recursively and collects files.
 *
 * This implementation uses the actual FilesystemService
 * API available under:
 *
 * src/mcp/servers/filesystem/services/filesystem.service.ts
 *
 * The service exposes:
 *
 * getMetadata()
 *
 * rather than getFileMetadata().
 */
private async scanDirectory(
    rootPath: string,
    currentPath: string
): Promise<StructureFile[]> {

    const results:
        StructureFile[] = [];


    /**
     * Get directory entries.
     *
     * The current FilesystemService implementation
     * returns an array of entry names.
     */
    const directoryEntries =
        await filesystemService.listDirectory(
            path.relative(
                rootPath,
                currentPath
            ) || "."
        );


    /**
     * Process every entry.
     */
    for (
        const entryName
        of directoryEntries
    ) {

        /**
         * Build absolute path.
         */
        const absolutePath =
            path.join(
                currentPath,
                entryName
            );


        /**
         * Convert the absolute path back into a
         * workspace-relative path before passing it
         * to FilesystemService.
         */
        const relativePath =
            path.relative(
                rootPath,
                absolutePath
            );


        /**
         * Retrieve metadata using the actual
         * FilesystemService API.
         */
        const metadata =
            await filesystemService.getMetadata(
                relativePath
            );


        /**
         * Metadata may be null if the file no longer
         * exists or cannot be inspected.
         */
        if (!metadata) {

            continue;

        }


        /**
         * =================================================
         * File
         * =================================================
         */
        if (metadata.isFile) {

            results.push({

                path:
                    relativePath,

                name:
                    entryName,

                extension:
                    path.extname(
                        entryName
                    ),

                size:
                    metadata.size

            });


            continue;

        }


        /**
         * =================================================
         * Directory
         * =================================================
         */
        if (metadata.isDirectory) {

            const children =
                await this.scanDirectory(
                    rootPath,
                    absolutePath
                );


            results.push(
                ...children
            );

        }

    }


    return results;

}
Then run
npx tsc --noEmit
One important architectural note

You apparently have two different filesystem-service APIs in the project:

src/mcp/servers/filesystem/filesystem.service.ts

and

src/mcp/servers/filesystem/services/filesystem.service.ts

That is why we've been getting confusing errors such as:

listDirectory() → string[]

while the other implementation has:

listDirectory() → DirectoryInfo

and:

getFileMetadata()

versus:

getMetadata()

We should not keep building on top of this ambiguity. After tsc passes, I recommend we clean up the duplicate service and make the Code Structure Analyzer use the same canonical FilesystemService as the MCP Filesystem Server.

For now, run the compiler again. If it passes, Step 2 — FileDetector is complete, and we'll move to ModuleDetector.

finally it work

Excellent! 🎉

Step 2 — FileDetector is now complete and compiling.

Your current Code Structure Analyzer progress is:

Code Structure Analyzer
│
├── Phase 1 — Models                  ✅
│
├── Phase 2 — Core Detectors
│   ├── DirectoryDetector             ✅
│   ├── FileDetector                  ✅
│   ├── ModuleDetector                ⏳ NEXT
│   ├── ControllerDetector            ⏳
│   ├── ServiceDetector               ⏳
│   ├── RouteDetector                 ⏳
│   ├── ModelDetector                 ⏳
│   ├── EntryPointDetector            ⏳
│   └── ArchitectureDetector          ⏳
│
├── Phase 3 — CodeStructureAnalyzerService   ⏳
├── Phase 4 — CodeStructureAnalyzerTool      ⏳
└── Phase 5 — MCP/Gateway Integration        ⏳
Next: Step 3 — ModuleDetector

📂 We'll create:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/module.detector.ts

This detector will analyze source files and identify things such as:

File
 ├── imports
 ├── exports
 ├── default export
 └── module type

For example:

src/controllers/user.controller.ts

imports:
  express
  UserService

exports:
  UserController

type:
  typescript-module

Before moving forward, keep npx tsc --noEmit as our checkpoint after every detector. This will prevent the same type/API mismatch from accumulating across the remaining detectors.