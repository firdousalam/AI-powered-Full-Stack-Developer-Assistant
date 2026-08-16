5.7 — GitHub MCP

And importantly, we should not jump to 5.11 yet.

The architecture should grow incrementally:

5.6
Project Intelligence
       ↓
5.7
GitHub MCP
       ↓
5.8
Docker MCP
       ↓
5.9
Kubernetes MCP
       ↓
5.10
Git MCP
       ↓
5.11
AI decides which MCP tool to use
       ↓
5.12
AI becomes a multi-tool agent

The really important transition happens at 5.11:

Today:


User
 ↓
Backend
 ↓
AI
 ↓
Specific MCP operation

Eventually:

User
 ↓
AI
 ↓
"What information do I need?"
 ↓
Discover tools
 ↓
Select tool
 ↓
MCP Gateway
 ↓
Tool
 ↓
Observation
 ↓
Reason
 ↓
Another tool?
 ├── Yes → execute again
 └── No
       ↓
Final Answer

That is where your project starts moving from an AI-powered developer assistant toward an actual AI agent.

So 5.6 is closed. Our next coding session should start with 5.7 GitHub MCP.

Our next coding session starts with 5.7 — GitHub MCP. 🚀

We should treat 5.6 as completed and frozen so we don't unnecessarily modify the Project Intelligence foundation while building GitHub integration.

5.7 — GitHub MCP

Our target architecture becomes:

                    Backend / AI Service
                           │
                           ▼
                      MCP Client
                           │
                           ▼
                      MCP Gateway
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
      Filesystem MCP               GitHub MCP
             │                           │
             ▼                           ▼
     Developer Tools              GitHub Tools
             │
             ▼
       Project Analyzer
What we'll build

We'll build GitHub as a proper MCP server, not just a GitHub API wrapper.

Likely structure:

src/mcp/servers/github/
│
├── github.server.ts
├── github.service.ts
├── github.tools.ts
├── github.constants.ts
├── github.types.ts
└── index.ts

And we'll progressively add developer-oriented GitHub tools such as:

getRepository
getRepositoryContents
getFile
searchCode
getIssues
getPullRequests
getBranches
getCommits

But we shouldn't implement everything at once.

Recommended implementation sequence

5.7.1 — GitHub MCP design

GitHub MCP
   ↓
Service
   ↓
GitHub API
   ↓
Types
   ↓
Tools
   ↓
MCP Server
   ↓
Gateway registration

5.7.2 — GitHubService

Create the GitHub API abstraction.

5.7.3 — GitHub types

Define structured responses rather than passing arbitrary API responses around.

5.7.4 — First GitHub tool

Start with something fundamental:

getRepository

5.7.5 — Repository contents

getRepositoryContents

5.7.6 — File retrieval

getFile

5.7.7 — Search

searchCode

5.7.8 — Issues / Pull Requests

5.7.9 — Remaining GitHub tools

5.7.10 — MCP registration

Connect GitHub MCP to the existing:

MCP Gateway

5.7.11 — End-to-end testing

AI/Backend
   ↓
MCP Client
   ↓
MCP Gateway
   ↓
GitHub MCP
   ↓
GitHub API
   ↓
Structured result

5.7.12 — TypeScript checkpoint

After each meaningful implementation step:

npx tsc --noEmit
One important principle

We should reuse the architecture we already built in 5.6 rather than inventing a second pattern for GitHub.

For example:

Filesystem MCP
      │
      └── Developer Tool Framework
                   │
                   └── Project Analyzer


GitHub MCP
      │
      └── GitHub-specific tools

Later, at 5.11, the AI can discover both:

analyzeProject
getRepository
getFile
searchCode
...

and decide which one it needs.

Then 5.12 can combine them:

User
 │
 ▼
AI Agent
 │
 ├── analyzeProject
 │
 ├── getFile
 │
 ├── searchCode
 │
 ├── Docker tool
 │
 └── Kubernetes tool
       │
       ▼
   Diagnosis

So 5.7 is the next coding milestone, and 5.7.1 should be the first task: design and establish the GitHub MCP structure before writing the individual tools.


5.7.1 — GitHub MCP Design & Structure
1. Target structure

We will add GitHub MCP alongside the existing Filesystem MCP:

src/
└── mcp/
    └── servers/
        ├── filesystem/
        │   ├── filesystem.server.ts
        │   ├── filesystem.service.ts
        │   ├── filesystem.tools.ts
        │   ├── filesystem.constants.ts
        │   ├── filesystem.types.ts
        │   └── index.ts
        │
        └── github/
            ├── github.server.ts
            ├── github.service.ts
            ├── github.tools.ts
            ├── github.constants.ts
            ├── github.types.ts
            └── index.ts

The important thing is that GitHub follows the same MCP server organization we've already established, instead of introducing a completely different pattern.

2. Responsibility of each file
github.server.ts

Responsible for the MCP server itself.

MCP Client
    ↓
MCP Gateway
    ↓
GitHub MCP Server

It will eventually expose the GitHub tools.

It should not contain GitHub API implementation.

github.service.ts

This will be the GitHub integration layer.

GitHub Tool
     ↓
GitHubService
     ↓
GitHub API

The service will eventually contain operations such as:

getRepository()
getRepositoryContents()
getFile()
searchCode()
getIssues()
getPullRequests()
getBranches()
getCommits()

The service abstracts GitHub API details away from MCP tools.

github.tools.ts

This will define the MCP-facing developer tools.

For example:

getRepository
getRepositoryContents
getFile
searchCode

The tools should be thin.

Conceptually:

MCP Tool
   ↓
validate input
   ↓
GitHubService
   ↓
structured result

We don't want API/business logic duplicated inside every tool.

github.types.ts

Contains strongly typed GitHub-specific structures.

For example, eventually:

interface GitHubRepository {
    owner: string;
    name: string;
    description?: string;
    defaultBranch: string;
}

and other structured responses.

This is especially important because later our AI needs predictable structured information, not arbitrary GitHub API responses.

github.constants.ts

Centralized GitHub-specific constants.

Potential examples:

GitHub API base URL
tool names
default values
API configuration

We should avoid scattering these throughout the server.

index.ts

The public entry point for the GitHub MCP module.

Conceptually:

github/
   ↓
index.ts
   ↓
GitHub MCP components

This also keeps imports cleaner when we integrate GitHub MCP with the existing gateway.

3. Architecture

The complete flow will eventually be:

                    ┌───────────────────┐
                    │    AI Service     │
                    └─────────┬─────────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ MCP Client  │
                       └──────┬──────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ MCP Gateway │
                       └──────┬──────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   GitHub MCP     │
                    │     Server       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ GitHub Tools     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ GitHub Service   │
                    └────────┬─────────┘
                             │
                             ▼
                       GitHub API

This separation becomes very important later when we implement 5.11 AI ↔ MCP Orchestration.

4. GitHub tools we eventually want

Don't implement these yet. This is our target tool set.

Repository
getRepository

Example question:

What repository is this?

Repository contents
getRepositoryContents

Example:

Show me the files in the backend directory.

File
getFile

Example:

Show me the package.json from the repository.

Code search
searchCode

Example:

Find all usages of MongoClient.

Issues
getIssues

Example:

What open issues are there?

Pull requests
getPullRequests

Example:

Show me recently opened pull requests.

Branches
getBranches
Commits
getCommits

We'll add these incrementally rather than creating a huge implementation in one step.

5. Authentication design

We should also design authentication before implementing the service.

The architecture should allow:

Environment
     ↓
GitHub configuration
     ↓
GitHubService
     ↓
GitHub API

For local development, we'll eventually support a GitHub token through environment configuration rather than hardcoding it.

For example:

GITHUB_TOKEN=...

And:

GITHUB_API_URL=https://api.github.com

Never commit the token to Git.

Later we can make authentication more sophisticated if the project needs GitHub OAuth/app-based access.

6. Important design decision

We should not couple GitHub MCP directly to the AI Service.

❌ Avoid:

AI Service
    ↓
GitHubService

Instead:

AI Service
    ↓
MCP Client
    ↓
MCP Gateway
    ↓
GitHub MCP
    ↓
GitHubService

This preserves the MCP architecture we're building.

It also means that later the AI doesn't need to know whether a capability comes from:

Filesystem MCP
GitHub MCP
Docker MCP
Kubernetes MCP
Git MCP

It simply sees available tools.

That's exactly what we'll need for 5.11.

7. Initial files for 5.7.1

At this stage, we should establish the skeleton:

github/
├── github.server.ts
├── github.service.ts
├── github.tools.ts
├── github.constants.ts
├── github.types.ts
└── index.ts

But don't fill these with the complete GitHub implementation yet.

The first coding objective is:

Create structure
      ↓
Establish interfaces/types
      ↓
Establish dependency direction
      ↓
Connect structure to existing MCP architecture
      ↓
TypeScript check

Then:

npx tsc --noEmit

must pass.

8. 5.7 roadmap

I recommend we lock the GitHub milestone like this:

5.7 GitHub MCP
│
├── 5.7.1 Design & Structure             ← NOW
│
├── 5.7.2 GitHub Configuration
│
├── 5.7.3 GitHubService
│
├── 5.7.4 Repository Tool
│
├── 5.7.5 Repository Contents Tool
│
├── 5.7.6 File Tool
│
├── 5.7.7 Code Search Tool
│
├── 5.7.8 Issues & Pull Requests
│
├── 5.7.9 Branches & Commits
│
├── 5.7.10 MCP Server Integration
│
├── 5.7.11 MCP Gateway Integration
│
└── 5.7.12 End-to-End Testing
Our immediate coding target

5.7.1 = create the GitHub MCP skeleton and establish its contracts without implementing GitHub API functionality.

And, as with 5.6, we'll keep:

npx tsc --noEmit

as the checkpoint after each implementation step.

Next coding step: 5.7.1 — create github.server.ts, github.service.ts, github.tools.ts, github.constants.ts, github.types.ts, and index.ts using the existing project's actual MCP conventions.

5.7.1 — GitHub MCP Skeleton

Create:

backend/src/mcp/servers/github/


├── github.server.ts
├── github.service.ts
├── github.tools.ts
├── github.constants.ts
├── github.types.ts
└── index.ts

This mirrors the existing Filesystem MCP organization.

1. github.types.ts

For 5.7.1, we only establish the contracts. No GitHub API implementation yet.

// src/mcp/servers/github/github.types.ts


/**
 * GitHub MCP configuration.
 *
 * API integration will be implemented in 5.7.2 / 5.7.3.
 */
export interface GitHubConfig {
    apiUrl: string;
    token?: string;
}


/**
 * Basic GitHub repository reference.
 *
 * This is intentionally small for the initial structure.
 * More GitHub-specific response models will be added
 * as individual tools are implemented.
 */
export interface GitHubRepositoryReference {
    owner: string;
    name: string;
}


/**
 * Common GitHub API error representation.
 */
export interface GitHubErrorResponse {
    message: string;
    status?: number;
}
2. github.constants.ts
// src/mcp/servers/github/github.constants.ts


/**
 * GitHub MCP configuration.
 */
export const GITHUB_CONFIG = {
    API_URL: "https://api.github.com",
    TOKEN_ENV: "GITHUB_TOKEN"
} as const;


/**
 * GitHub MCP server metadata.
 */
export const GITHUB_SERVER = {
    ID: "github-server",
    NAME: "GitHub MCP Server",
    VERSION: "1.0.0",
    TRANSPORT: "local"
} as const;


/**
 * GitHub MCP tool names.
 *
 * Tools will be implemented incrementally in later 5.7.x steps.
 */
export const GITHUB_TOOLS = {
    GET_REPOSITORY: "getRepository",
    GET_REPOSITORY_CONTENTS: "getRepositoryContents",
    GET_FILE: "getFile",
    SEARCH_CODE: "searchCode",
    GET_ISSUES: "getIssues",
    GET_PULL_REQUESTS: "getPullRequests",
    GET_BRANCHES: "getBranches",
    GET_COMMITS: "getCommits"
} as const;

Notice that we're only defining the names now. We're not pretending these tools are implemented yet.

3. github.service.ts

The existing Filesystem architecture puts actual operations in the service and has the tool layer delegate to that service.

For GitHub, establish the same separation:

// src/mcp/servers/github/github.service.ts


import {
    GITHUB_CONFIG
} from "./github.constants";


import {
    GitHubConfig
} from "./github.types";


export class GitHubService {


    private readonly config: GitHubConfig;


    constructor(
        config?: Partial<GitHubConfig>
    ) {
        this.config = {
            apiUrl:
                config?.apiUrl ??
                GITHUB_CONFIG.API_URL,


            token:
                config?.token ??
                process.env[GITHUB_CONFIG.TOKEN_ENV]
        };
    }


    /**
     * Return the configured GitHub API URL.
     *
     * Actual API operations will be added in 5.7.3.
     */
    public getApiUrl(): string {
        return this.config.apiUrl;
    }


    /**
     * Indicates whether a GitHub token is configured.
     *
     * Authentication/API validation will be implemented
     * in the GitHub service implementation milestone.
     */
    public isAuthenticated(): boolean {
        return Boolean(this.config.token);
    }


    /**
     * Dispose service resources.
     *
     * Kept intentionally simple for the initial skeleton.
     */
    public async dispose(): Promise<void> {
        return;
    }


    /**
     * Basic health information.
     *
     * Actual GitHub connectivity checking will be added later.
     */
    public async health(): Promise<{
        healthy: boolean;
        service: string;
    }> {
        return {
            healthy: true,
            service: "github"
        };
    }
}
Why we're doing this

We don't put fetch() calls into github.server.ts.

Eventually:

GitHub Tool
    ↓
GitHubService
    ↓
GitHub API

That keeps the architecture consistent with the existing MCP design.

4. github.tools.ts

The current Filesystem implementation exposes tools through getTools(): MCPTool[], with each tool containing name, description, inputSchema, and execute.

We follow that exact convention.

For 5.7.1, don't expose fake operational tools. Return an empty collection until the first real tool is implemented.

// src/mcp/servers/github/github.tools.ts


import {
    MCPTool
} from "../../types";


import {
    GitHubService
} from "./github.service";


export class GitHubTools {


    constructor(
        private readonly githubService: GitHubService
    ) {}


    /**
     * Returns all supported GitHub MCP tools.
     *
     * Individual tools will be added in the following
     * 5.7.x implementation steps.
     */
    public getTools(): MCPTool[] {
        return [];
    }


    /**
     * Expose the service for future tool implementations.
     *
     * This keeps the dependency explicit and avoids creating
     * another GitHubService instance inside individual tools.
     */
    protected getService(): GitHubService {
        return this.githubService;
    }
}

This is deliberately minimal.

Do not add getRepository yet.

That belongs to the next implementation step.

5. github.server.ts

This is the most important file because it must follow the existing MCPServer contract.

The current Filesystem server has:

id
name
version
transport
status
connect()
disconnect()
executeTool()
discoverTools()
getMetadata()
healthCheck()
isConnected()

and stores tools in a Map<string, MCPTool>.

Use the same pattern:

// src/mcp/servers/github/github.server.ts
                await tool.execute(
                    request.args
                );


            return {
                success: true,
                data: result
            };


        } catch (error) {


            MCPLogger.error(
                `Tool ${tool.name} failed`,
                error
            );


            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error"
            };
        }
    }


    /**
     * Discover every MCP tool exposed by
     * this server.
     */
    public discoverTools(): MCPTool[] {


        return [
            ...this.tools.values()
        ];
    }


    /**
     * Return server metadata.
     */
    public getMetadata() {


        return {
            id: this.id,
            name: this.name,
            version: this.version,
            transport: this.transport,
            status: this.status,
            toolCount: this.tools.size,
            apiUrl:
                this.githubService.getApiUrl()
        };
    }


    /**
     * Health check.
     */
    public async healthCheck() {


        return this.githubService.health();
    }


    /**
     * Whether the server is connected.
     */
    public isConnected(): boolean {


        return (
            this.status ===
            ServerStatus.CONNECTED
        );
    }
}

This deliberately follows the existing Filesystem server's lifecycle and tool execution model rather than creating a new abstraction.

6. index.ts

The existing Filesystem index.ts creates singleton instances, exports the classes/types/constants, and provides a factory for isolated instances.

GitHub should follow that convention:

// src/mcp/servers/github/index.ts


import {
    GitHubServer
} from "./github.server";


import {
    GitHubService
} from "./github.service";


import {
    GitHubTools
} from "./github.tools";


/**
 * ============================================================
 * Singleton Instances
 * ============================================================
 */


export const githubService =
    new GitHubService();


export const githubTools =
    new GitHubTools(
        githubService
    );


export const githubServer =
    new GitHubServer(
        githubService,
        githubTools
);


/**
 * ============================================================
 * Class Exports
 * ============================================================
 */


export {
    GitHubServer,
    GitHubService,
    GitHubTools
};


/**
 * ============================================================
 * Types
 * ============================================================
 */


export * from "./github.types";


/**
 * ============================================================
 * Constants
 * ============================================================
 */


export * from "./github.constants";


/**
 * ============================================================
 * Factory
 * ============================================================
 *
 * Intended for unit tests or creating isolated instances.
 *
 * The application should normally use the singleton
 * `githubServer` exported above.
 * ============================================================
 */


export function createGitHubServer(): GitHubServer {


    const service =
        new GitHubService();


    const tools =
        new GitHubTools(
            service
        );


    return new GitHubServer(
        service,
        tools
    );
}
7. Resulting architecture

After this step:

src/mcp/servers/
│
├── filesystem/
│   ├── filesystem.server.ts
│   ├── filesystem.service.ts
│   ├── filesystem.tools.ts
│   ├── filesystem.constants.ts
│   ├── filesystem.types.ts
│   └── index.ts
│
└── github/
    ├── github.server.ts       ← MCP lifecycle
    ├── github.service.ts      ← GitHub integration
    ├── github.tools.ts        ← MCP tools
    ├── github.constants.ts   ← constants
    ├── github.types.ts       ← contracts
    └── index.ts               ← composition/export

The repository's current Filesystem MCP uses essentially this same separation.

8. What we have deliberately NOT done

This is important because we're still on 5.7.1.

We have not implemented:

❌ GitHub API calls
❌ fetch/Octokit integration
❌ Authentication validation
❌ getRepository
❌ getFile
❌ searchCode
❌ Issues
❌ Pull Requests
❌ Branches
❌ Commits
❌ Gateway registration
This is a straightforward interface/implementation mismatch in GitHubService.

Your github.server.ts expects these three methods:

dispose()
getApiUrl()
health()

but GitHubService currently doesn't define them.

Since we're at the GitHub MCP server milestone, I recommend adding these methods to github.service.ts rather than changing github.server.ts.

1. Open

src/mcp/servers/github/github.service.ts

Add these methods to the GitHubService class:

/**
 * Returns the configured GitHub API URL.
 */
public getApiUrl(): string {
    return this.config.apiUrl;
}


/**
 * Performs a lightweight health check for the GitHub service.
 */
public async health(): Promise<{
    status: "healthy" | "unhealthy";
    apiUrl: string;
}> {
    try {
        return {
            status: "healthy",
            apiUrl: this.config.apiUrl,
        };
    } catch {
        return {
            status: "unhealthy",
            apiUrl: this.config.apiUrl,
        };
    }
}


/**
 * Releases GitHub service resources.
 */
public async dispose(): Promise<void> {
    // No resources currently require explicit cleanup.
}
2. Important: check your constructor

This code assumes your service already has something similar to:

private readonly config: GitHubConfig;

and the constructor assigns it:

constructor(config: GitHubConfig) {
    this.config = config;
}

If your current GitHubService uses a different property name, such as githubConfig, use that instead.

3. Run the checkpoint
npx tsc --noEmit

You should then get past these three errors.

One improvement

The health() implementation above is intentionally lightweight because your current GitHub service appears to be at the initial structure/API stage. It doesn't actually call GitHub.

Later, when we implement the real GitHub API integration, we can make health() perform a lightweight authenticated/unauthenticated API request and report whether GitHub is reachable.

So don't modify github.server.ts yet. The server is correctly expecting these lifecycle/service methods; the missing pieces belong in GitHubService.

If npx tsc --noEmit produces another error after this, send that output and we'll continue the 5.x checkpoint one error at a time.

Yes — this is because 5.7.3 changed GitHubService from a no-argument constructor to a required GitHubConfig, but github/index.ts still creates it with:

new GitHubService();

We should fix the wiring rather than making the constructor optional, because the service should receive its configuration explicitly.

Fix src/mcp/servers/github/index.ts

At the places where you currently have:

new GitHubService();

create a configuration first and pass it to the service.

If your project already has a configuration/environment pattern, use that. For the current milestone, the simplest approach is:

const githubConfig: GitHubConfig = {
    apiUrl: process.env.GITHUB_API_URL ?? "https://api.github.com",
    token: process.env.GITHUB_TOKEN,
};

Then change:

new GitHubService();

to:

new GitHubService(githubConfig);

You'll need the type import if it isn't already present:

import type { GitHubConfig } from "./github.types";
Important

There are two occurrences in github/index.ts:

line 22
line 78

Both need to use the configured service.

However, don't create two independent configuration objects unnecessarily. Prefer something like:

const githubConfig: GitHubConfig = {
    apiUrl: process.env.GITHUB_API_URL ?? "https://api.github.com",
    token: process.env.GITHUB_TOKEN,
};


const githubService = new GitHubService(githubConfig);

and reuse githubService where appropriate.

Then run the checkpoint
npx tsc --noEmit

If you get an error such as:

Cannot find name 'process'

don't install anything yet. Send me the output, because we should first check how your backend currently handles environment configuration.

Also, don't make this change:

constructor(config?: GitHubConfig)

just to make TypeScript happy. That would hide a configuration problem rather than fixing the 5.7.3 architecture.

Once this checkpoint passes, we'll continue with the actual 5.7.3 GitHubService implementation and then move to the GitHub MCP tools.

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

✅ 5.7.3 — GitHubService checkpoint passed.

npx tsc --noEmit

No output means TypeScript compilation is clean.

Current status
Component	Status
GitHubConfig	✅
GitHubService	✅
API URL configuration	✅
GitHub token configuration	✅
getRepository()	✅
getContents()	✅
getBranches()	✅
health()	✅
dispose()	✅
Singleton wiring	✅
createGitHubServer() factory	✅
TypeScript checkpoint	✅

The architecture is now:

GitHubConfig
     │
     ▼
GitHubService
     │
     ├── getRepository()
     ├── getContents()
     ├── getBranches()
     ├── health()
     └── dispose()
     │
     ▼
GitHubTools
     │
     ▼
GitHubServer
     │
     ▼
MCP Gateway
Recommended next step

5.7.4 — GitHub MCP Tools

That's where we should expose the GitHubService capabilities as actual MCP developer tools, rather than adding more functionality to the service itself.

Before moving on, I'd make a checkpoint commit:

git add src/mcp/servers/github
git commit -m "feat: implement GitHub service"

Then we're ready for 5.7.4.

Absolutely. Based on your current MCPServer, MCPTool, GitHubService, and GitHubTools architecture, use this complete github.server.ts.

// src/mcp/servers/github/github.server.ts


            return {
                success: true,
                data: result
            };


        } catch (error) {


            MCPLogger.error(
                `GitHub Tool ${tool.name} failed`,
                error
            );


            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error"
            };
        }
    }


    /**
     * ========================================================
     * Discover Tools
     * ========================================================
     *
     * Returns every GitHub MCP tool currently registered.
     */
    public discoverTools(): MCPTool[] {


        return [
            ...this.tools.values()
        ];
    }


    /**
     * ========================================================
     * Metadata
     * ========================================================
     *
     * Returns metadata about the GitHub MCP server.
     */
    public getMetadata() {


        return {
            id: this.id,
            name: this.name,
            version: this.version,
            transport: this.transport,
            status: this.status,
            toolCount: this.tools.size,
            apiUrl:
                this.githubService.getApiUrl()
        };
    }


    /**
     * ========================================================
     * Health Check
     * ========================================================
     *
     * Delegates the health check to GitHubService.
     */
    public async healthCheck() {


        return this.githubService.health();
    }


    /**
     * ========================================================
     * Connection Status
     * ========================================================
     */
    public isConnected(): boolean {


        return (
            this.status ===
            ServerStatus.CONNECTED
        );
    }
}


/**
 * Explicit class export.
 *
 * This also makes the export visible to index.ts:
 *
 * import { GitHubServer } from "./github.server";
 */
export { GitHubServer };
One note
✅ 5.7.4 — Repository Tool checkpoint passed.

npx tsc --noEmit

No output means the TypeScript contract is clean.

Current Repository Tool

You now have:

github_get_repository
        │
        ├── owner       required string
        └── repository  required string
        │
        ▼
GitHubTools
        │
        ▼
GitHubService.getRepository()
        │
        ▼
GitHub REST API

And the MCP tool now has an explicit inputSchema, which is important for your future AI agent/tool-discovery layer.

Current GitHub MCP progress
5.7.1  GitHub MCP foundation       ✅
5.7.2  GitHub configuration/types  ✅
5.7.3  GitHubService               ✅
5.7.4  GitHub MCP Tools            ✅
       └── Repository Tool         ✅
Next

I recommend continuing 5.7.5 — Repository Contents Tool.

That will allow your agent to ask things like:

"Show me the files in this repository"

or:

"Read the package.json from this GitHub repository"

using:

github_get_contents

That is significantly more useful for your eventual AI-powered developer assistant, because repository contents are the bridge between GitHub and your future code-analysis/RAG/agent workflow.

5.7.5 — Repository Contents Tool.

5.7.5 — Repository Contents Tool

This is the next logical GitHub MCP tool.

The purpose is to let the AI developer agent inspect files and directories inside a GitHub repository.

The flow becomes:

AI Agent
   ↓
GitHubServer
   ↓
github_get_contents
   ↓
GitHubTools.getContents()
   ↓
GitHubService.getContents()
   ↓
GitHub REST API

Your GitHubService already implements:

getContents(
    owner,
    repository,
    path,
    ref
)

So we only need to properly expose it through GitHubTools.

1. Update getContentsTool()

In:

src/mcp/servers/github/github.tools.ts

replace your current getContentsTool() with:

private getContentsTool(): MCPTool {


    return {
        name: "github_get_contents",


        description:
            "Get a file or directory contents from a GitHub repository.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string",
                    description:
                        "GitHub username or organization that owns the repository."
                },


                repository: {
                    type: "string",
                    description:
                        "Name of the GitHub repository."
                },


                path: {
                    type: "string",
                    description:
                        "Path to the file or directory inside the repository. Use an empty string or omit this field to access the repository root."
                },


                ref: {
                    type: "string",
                    description:
                        "Git branch, tag, or commit SHA to read from. If omitted, GitHub uses the repository default branch."
                }
            },


            required: [
                "owner",
                "repository"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateContentsArguments(
                    args
                );


            return this.getContents(
                validatedArgs
            );
        }
    };
}
2. Verify getContents()

Your existing method should be:

public async getContents(
    args: GitHubContentsArgs
): Promise<
    GitHubContent |
    GitHubContent[]
> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getContents(
        args.owner,
        args.repository,
        args.path ?? "",
        args.ref
    );
}

This is correct because GitHub's contents API can return either:

File
 ↓
GitHubContent

or:

Directory
 ↓
GitHubContent[]
3. Verify argument validation

Your existing validator should support path and ref:

private validateContentsArguments(
    args: unknown
): GitHubContentsArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    const result: GitHubContentsArgs = {
        ...repositoryArgs
    };


    if (
        value.path !== undefined
    ) {


        if (
            typeof value.path !== "string"
        ) {
            throw new Error(
                "GitHub repository path must be a string."
            );
        }


        result.path =
            value.path.trim();
    }


    if (
        value.ref !== undefined
    ) {


        if (
            typeof value.ref !== "string"
        ) {
            throw new Error(
                "GitHub repository ref must be a string."
            );
        }


        result.ref =
            value.ref.trim();
    }


    return result;
}
4. Important use cases

This single MCP tool supports several developer workflows.

Repository root
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

Conceptually:

GET /repos/firdousalam/AI-powered-Full-Stack-Developer-Assistant/contents/

Returns a list of files/directories.

Get a specific file
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "path": "README.md"
}
Get a nested file
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "path": "backend/src/mcp/servers/github/github.service.ts"
}
Get contents from a specific branch
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "path": "package.json",
    "ref": "develop"
}
5. One limitation to understand

Your current GitHubService.getContents() returns GitHub's metadata/content response, but it does not yet decode Base64 file content.

For a file, GitHub commonly returns a response containing fields such as:

name
path
sha
size
type
content
encoding
download_url

For the eventual AI developer assistant, we will probably want a dedicated:

github_read_file

tool that returns clean text instead of making the LLM deal with GitHub's raw response/Base64 encoding.

So don't add Base64 decoding to github_get_contents yet. Keep this tool responsible for repository content discovery.

6. Checkpoint

Run:

npx tsc --noEmit

Expected:

PS ...\backend> npx tsc --noEmit
PS ...\backend>

If it passes, 5.7.5 — Repository Contents Tool is complete at the TypeScript/MCP-contract level.

The next useful milestone will be 5.7.6 — Branches Tool, followed shortly by a dedicated GitHub File Reading Tool, which will be much more valuable for your AI coding-agent workflow.

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

✅ 5.7.5 — Repository Contents Tool checkpoint passed.

npx tsc --noEmit

No output = TypeScript compilation successful.

GitHub MCP progress
5.7.1  GitHub MCP Foundation          ✅
5.7.2  GitHub Configuration/Types     ✅
5.7.3  GitHubService                  ✅
5.7.4  Repository Tool                ✅
5.7.5  Repository Contents Tool       ✅

Your available GitHub tools are now:

github_get_repository
github_get_contents

The contents tool supports:

✅ Repository root
✅ Directory contents
✅ File metadata/content response
✅ Branch selection through ref
✅ Nested paths
✅ Input validation
✅ MCP inputSchema
Next: 5.7.6 — Branches Tool

We'll expose:

github_list_branches

with:

{
  "owner": "firdousalam",
  "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

and route it through:

GitHubServer
    ↓
GitHubTools.listBranches()
    ↓
GitHubService.getBranches()
    ↓
GitHub API

Then we'll run the same checkpoint:

npx tsc --noEmit

This keeps your one-milestone → one-TypeScript-checkpoint workflow intact.

5.7.6 — Branches Tool

Now we'll expose the existing GitHubService.getBranches() through the MCP layer as:

github_list_branches

The architecture remains:

MCP Client
    ↓
GitHubServer
    ↓
github_list_branches
    ↓
GitHubTools.listBranches()
    ↓
GitHubService.getBranches()
    ↓
GitHub REST API
1. Update listBranchesTool()

In:

src/mcp/servers/github/github.tools.ts

replace the existing listBranchesTool() with:

private listBranchesTool(): MCPTool {


    return {
        name: "github_list_branches",


        description:
            "List all branches available in a GitHub repository.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string",
                    description:
                        "GitHub username or organization that owns the repository."
                },


                repository: {
                    type: "string",
                    description:
                        "Name of the GitHub repository."
                }
            },


            required: [
                "owner",
                "repository"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateRepositoryArguments(
                    args
                );


            return this.listBranches(
                validatedArgs
            );
        }
    };
}
2. Verify listBranches()

Your existing operation should remain:

public async listBranches(
    args: GitHubBranchesArgs
): Promise<GitHubBranch[]> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getBranches(
        args.owner,
        args.repository
    );
}

No changes are needed there.

3. Result

The MCP tool now has this contract:

github_list_branches


Input:
{
    owner: string,
    repository: string
}


Output:
GitHubBranch[]

For example:

{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

The service returns branch information such as:

[
    {
        "name": "main",
        "protected": false
    }
]
4. All three initial GitHub tools

After this change, getTools() exposes:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool()
    ];
}

So your initial GitHub MCP toolset is:

┌──────────────────────────────┐
│       GitHub MCP Tools       │
├──────────────────────────────┤
│ github_get_repository        │
│ github_get_contents          │
│ github_list_branches         │
└──────────────────────────────┘
5. Checkpoint

Run:

npx tsc --noEmit

Expected:

PS ...\backend> npx tsc --noEmit
PS ...\backend>

If there is no output, 5.7.6 — Branches Tool is complete.

After this, your initial GitHub MCP foundation will be complete enough to start adding more developer-oriented capabilities, with 5.7.7 — File Reading Tool being the most valuable next step for your AI coding assistant.

