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

5.7.7 — File Reading Tool

This is an important milestone because this is where GitHub becomes useful to your AI coding assistant.

Instead of returning GitHub's raw contents API response, we'll expose a developer-friendly MCP tool:

github_read_file

The agent can then ask:

Read package.json from this repository.

and receive actual text rather than GitHub's Base64-encoded response.

Architecture
AI Agent
   ↓
GitHubServer
   ↓
github_read_file
   ↓
GitHubTools.readFile()
   ↓
GitHubService.getContents()
   ↓
GitHub REST API
   ↓
Base64 content
   ↓
Decode
   ↓
Plain text
1. Update GitHubContent

Open:

src/mcp/servers/github/github.service.ts

Your current GitHubContent interface should be extended.

Use:

export interface GitHubContent {
    name: string;
    path: string;
    sha: string;
    size?: number;
    type: "file" | "dir";
    html_url?: string;
    download_url?: string | null;


    /**
     * Base64 encoded file content returned by GitHub.
     */
    content?: string;


    /**
     * Encoding used by GitHub for the content.
     */
    encoding?: string;
}

This is important because github_get_contents can return either a directory listing or a file object.

2. Add the file-reading arguments

In:

src/mcp/servers/github/github.tools.ts

add:

export interface GitHubReadFileArgs {
    owner: string;
    repository: string;
    path: string;
    ref?: string;
}

The tool requires:

owner
repository
path

and optionally accepts:

ref
3. Add readFile() to GitHubTools

Add this method inside the GitHubTools class:

public async readFile(
    args: GitHubReadFileArgs
): Promise<{
    owner: string;
    repository: string;
    path: string;
    ref?: string;
    content: string;
}> {


    this.validateRepositoryArguments(
        args
    );


    if (
        !args.path ||
        !args.path.trim()
    ) {
        throw new Error(
            "GitHub file path is required."
        );
    }


    const result =
        await this.githubService.getContents(
            args.owner,
            args.repository,
            args.path,
            args.ref
        );


    if (
        Array.isArray(result)
    ) {
        throw new Error(
            `The specified path '${args.path}' is a directory, not a file.`
        );
    }


    if (
        result.type !== "file"
    ) {
        throw new Error(
            `The specified path '${args.path}' is not a file.`
        );
    }


    if (
        !result.content
    ) {
        throw new Error(
            `GitHub did not return content for '${args.path}'.`
        );
    }


    if (
        result.encoding &&
        result.encoding !== "base64"
    ) {
        throw new Error(
            `Unsupported GitHub content encoding: ${result.encoding}`
        );
    }


    const content =
        Buffer.from(
            result.content.replace(/\s/g, ""),
            "base64"
        ).toString("utf-8");


    return {
        owner: args.owner,
        repository: args.repository,
        path: result.path,
        ref: args.ref,
        content
    };
}
Why decode here?

The GitHub API returns file content approximately like:

content:
SGVsbG8gV29ybGQ=

The AI agent should receive:

Hello World

not the encoded representation.

This is exactly the kind of transformation that belongs in your developer tool layer.

4. Add the MCP tool

Add this method to GitHubTools:

private readFileTool(): MCPTool {


    return {
        name: "github_read_file",


        description:
            "Read and return the text content of a file from a GitHub repository.",


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
                        "Path of the file inside the repository."
                },


                ref: {
                    type: "string",
                    description:
                        "Git branch, tag, or commit SHA. If omitted, the repository default branch is used."
                }
            },


            required: [
                "owner",
                "repository",
                "path"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateReadFileArguments(
                    args
                );


            return this.readFile(
                validatedArgs
            );
        }
    };
}
5. Add the validator

Add:

private validateReadFileArguments(
    args: unknown
): GitHubReadFileArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    if (
        typeof value.path !== "string" ||
        !value.path.trim()
    ) {
        throw new Error(
            "GitHub file path is required."
        );
    }


    const result: GitHubReadFileArgs = {
        ...repositoryArgs,
        path: value.path.trim()
    };


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
6. Register the new tool

This part is easy to miss.

Your existing getTools() currently has:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool()
    ];
}

Change it to:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool()
    ];
}

Now the GitHub MCP server exposes four tools:

github_get_repository
github_get_contents
github_list_branches
github_read_file
7. Example

The AI agent can call:

{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "path": "backend/package.json"
}

The result becomes:

{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "path": "backend/package.json",
    "content": "{\n  \"name\": \"backend\",\n  ...\n}"
}

Instead of exposing the raw GitHub response.

8. Important limitation

Don't try to make this tool handle directories.

If the agent calls:

github_read_file
path = "backend/src"

and GitHub returns a directory, we deliberately return:

The specified path 'backend/src' is a directory, not a file.

The agent should use:

github_get_contents

for directories.

That gives us a clean separation:

github_get_contents
        │
        ├── directory → list contents
        └── file      → GitHub metadata/raw response


github_read_file
        │
        └── file      → decoded text
5.7.7 checkpoint

After making these changes:

npx tsc --noEmit

Expected:

PS ...\backend> npx tsc --noEmit
PS ...\backend>

If that passes, 5.7.7 — File Reading Tool is complete at the TypeScript level.

This is also the first GitHub tool that becomes directly valuable to your later RAG/code-analysis/agent workflow, because the agent can now retrieve actual source code from a remote repository.

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

✅ 5.7.7 — File Reading Tool checkpoint passed.

npx tsc --noEmit

No output = TypeScript compilation successful.

GitHub MCP status
5.7.1  GitHub MCP Foundation          ✅
5.7.2  GitHub Configuration/Types     ✅
5.7.3  GitHubService                  ✅
5.7.4  Repository Tool                ✅
5.7.5  Repository Contents Tool       ✅
5.7.6  Branches Tool                  ✅
5.7.7  File Reading Tool              ✅

Your GitHub MCP server now exposes:

github_get_repository
github_get_contents
github_list_branches
github_read_file

The particularly important new capability is:

AI Agent
   ↓
github_read_file
   ↓
GitHub repository
   ↓
source code
   ↓
plain text
   ↓
AI reasoning / code analysis

That gives your future agent the ability to inspect real source files, which is a major step toward the developer-agent functionality you're building.

Recommended checkpoint commit
git add src/mcp/servers/github
git commit -m "feat: add GitHub file reading tool"
Next milestone

I'd recommend 5.7.8 — GitHub Code Search Tool.

That will be more powerful than simply reading known files because the agent will be able to ask:

Where is GitHubService used?

Find all references to MCPTool.

Search for getRepository across this repository.

The resulting flow would be:

AI Agent
   ↓
github_search_code
   ↓
GitHub API
   ↓
matching files/lines
   ↓
Agent reasoning

That starts making your GitHub MCP server genuinely useful for AI-powered repository exploration and code understanding.

5.7.8 — GitHub Code Search Tool

This is the right next step. github_read_file lets the agent read a known file; code search lets it first find where relevant code exists.

The new MCP tool will be:

github_search_code
Target flow
AI Agent
   ↓
github_search_code
   ↓
GitHubTools.searchCode()
   ↓
GitHubService.searchCode()
   ↓
GitHub Code Search API
   ↓
matching files

We'll keep the same separation you've established:

GitHubService → GitHub API
GitHubTools → validation + developer-oriented response
GitHubServer → MCP registration/execution
1. Add search types to github.service.ts

In:

src/mcp/servers/github/github.service.ts

add these interfaces near your other GitHub response models:

export interface GitHubCodeSearchItem {
    name: string;
    path: string;
    sha: string;
    html_url: string;
    repository: {
        id: number;
        name: string;
        full_name: string;
    };
}


export interface GitHubCodeSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubCodeSearchItem[];
}
2. Add searchCode() to GitHubService

Add this method inside GitHubService:

/**
 * Search code across a GitHub repository.
 *
 * GitHub search queries support GitHub's code-search syntax.
 *
 * Examples:
 *
 *   getRepository
 *   filename:package.json
 *   extension:ts MCPTool
 *   path:src githubService
 */
public async searchCode(
    owner: string,
    repository: string,
    query: string,
): Promise<GitHubCodeSearchResponse> {


    if (!query?.trim()) {
        throw new Error(
            "GitHub code search query is required."
        );
    }


    const searchQuery =
        `${query.trim()} repo:${owner}/${repository}`;


    return this.request<GitHubCodeSearchResponse>(
        `/search/code?q=${encodeURIComponent(searchQuery)}`
    );
}
Why add repo: automatically?

The MCP tool should be repository-oriented.

The agent can provide:

MCPTool
query = "GitHubService"

and the service turns it into:

GitHub API query:
GitHubService repo:firdousalam/AI-powered-Full-Stack-Developer-Assistant

This prevents the agent from accidentally searching unrelated repositories.

3. Add search arguments to github.tools.ts

In:

src/mcp/servers/github/github.tools.ts

add:

export interface GitHubSearchCodeArgs {
    owner: string;
    repository: string;
    query: string;
}
4. Add the search operation

Inside GitHubTools, add:

public async searchCode(
    args: GitHubSearchCodeArgs
): Promise<GitHubCodeSearchResponse> {


    this.validateRepositoryArguments(
        args
    );


    if (
        !args.query ||
        !args.query.trim()
    ) {
        throw new Error(
            "GitHub code search query is required."
        );
    }


    return this.githubService.searchCode(
        args.owner,
        args.repository,
        args.query.trim()
    );
}

Because we're returning the service response, import the type at the top:

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse
} from "./github.service";
5. Add the MCP tool

Add this method:

private searchCodeTool(): MCPTool {


    return {
        name: "github_search_code",


        description:
            "Search for source code, symbols, filenames, or text within a GitHub repository.",


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


                query: {
                    type: "string",
                    description:
                        "Code search query. Can search for symbols, text, filenames, extensions, or other GitHub-supported code search terms."
                }
            },


            required: [
                "owner",
                "repository",
                "query"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateSearchCodeArguments(
                    args
                );


            return this.searchCode(
                validatedArgs
            );
        }
    };
}
6. Add validation

Add:

private validateSearchCodeArguments(
    args: unknown
): GitHubSearchCodeArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    if (
        typeof value.query !== "string" ||
        !value.query.trim()
    ) {
        throw new Error(
            "GitHub code search query is required."
        );
    }


    return {
        ...repositoryArgs,
        query: value.query.trim()
    };
}
7. Register the tool

Your existing getTools() currently looks like:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool()
    ];
}

Change it to:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool()
    ];
}

Now your GitHub MCP server exposes:

github_get_repository
github_get_contents
github_list_branches
github_read_file
github_search_code
8. Example agent queries

The agent can now perform:

Find a class
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "query": "GitHubService"
}
Find TypeScript MCP tools
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "query": "MCPTool extension:ts"
}
Search a filename
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "query": "filename:github.service.ts"
}
Search a specific path
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "query": "path:src/mcp/servers/github GitHubService"
}
Important GitHub API consideration

There is one thing to be aware of: GitHub's code-search API has authentication and rate-limit requirements. Since your GitHubService already supports an optional token, the service layer is the correct place for those concerns.

Don't put token handling into searchCodeTool().

The architecture remains:

                  GitHub MCP
                      │
       ┌──────────────┼───────────────┐
       ▼              ▼               ▼
 Repository       Read File       Search Code
    Tool             Tool             Tool
       │              │               │
       └──────────────┼───────────────┘
                      ▼
                GitHubService
                      │
              Authentication
                      │
                      ▼
                GitHub REST API
5.7.8 checkpoint

Now run:

npx tsc --noEmit

Expected:

PS ...\backend> npx tsc --noEmit
PS ...\backend>

If it passes, 5.7.8 — GitHub Code Search Tool is TypeScript-clean.

Then the next milestone should be 5.7.9 — GitHub Issues Tool, which will start expanding your MCP server from repository inspection into actual GitHub project/issue intelligence.

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

✅ 5.7.8 — GitHub Code Search Tool checkpoint passed.

npx tsc --noEmit

No output means the TypeScript compilation is clean.

GitHub MCP status
5.7.1  GitHub MCP Foundation          ✅
5.7.2  GitHub Configuration/Types     ✅
5.7.3  GitHubService                  ✅
5.7.4  Repository Tool                ✅
5.7.5  Repository Contents Tool       ✅
5.7.6  Branches Tool                  ✅
5.7.7  File Reading Tool              ✅
5.7.8  Code Search Tool               ✅

Your GitHub MCP toolset now contains:

github_get_repository
github_get_contents
github_list_branches
github_read_file
github_search_code
Why 5.7.8 is important

You now have the basic repository exploration loop:

        ┌──────────────────────┐
        │   GitHub Repository   │
        └──────────┬───────────┘
                   │
          ┌────────┴─────────┐
          ▼                  ▼
    Search Code          Read File
          │                  │
          └────────┬─────────┘
                   ▼
              AI Agent
                   │
                   ▼
          Code Understanding

For example, your future agent can reason:

Find where ProjectAnalyzer is implemented.

→ github_search_code

Read that implementation.

→ github_read_file

Analyze how it works.

→ LLM reasoning.

That's a meaningful foundation for your eventual coding agent.

Next: 5.7.9 — GitHub Issues Tool

We'll add:

github_list_issues

so the agent can inspect repository issues and eventually understand project bugs/tasks alongside the source code.

After implementation, we'll continue your standard checkpoint:

npx tsc --noEmit

5.7.8 is complete.


5.7.8 — GitHub Code Search Tool checkpoint passed.

npx tsc --noEmit

No output means the TypeScript compilation is clean.

GitHub MCP status
5.7.1  GitHub MCP Foundation          ✅
5.7.2  GitHub Configuration/Types     ✅
5.7.3  GitHubService                  ✅
5.7.4  Repository Tool                ✅
5.7.5  Repository Contents Tool       ✅
5.7.6  Branches Tool                  ✅
5.7.7  File Reading Tool              ✅
5.7.8  Code Search Tool               ✅

Your GitHub MCP toolset now contains:

github_get_repository
github_get_contents
github_list_branches
github_read_file
github_search_code
Why 5.7.8 is important

You now have the basic repository exploration loop:

        ┌──────────────────────┐
        │   GitHub Repository   │
        └──────────┬───────────┘
                   │
          ┌────────┴─────────┐
          ▼                  ▼
    Search Code          Read File
          │                  │
          └────────┬─────────┘
                   ▼
              AI Agent
                   │
                   ▼
          Code Understanding

For example, your future agent can reason:

Find where ProjectAnalyzer is implemented.

→ github_search_code

Read that implementation.

→ github_read_file

Analyze how it works.

→ LLM reasoning.

That's a meaningful foundation for your eventual coding agent.

Next: 5.7.9 — GitHub Issues Tool

We'll add:

github_list_issues

so the agent can inspect repository issues and eventually understand project bugs/tasks alongside the source code.

After implementation, we'll continue your standard checkpoint:

npx tsc --noEmit

5.7.8 is complete.

5.7.9 — GitHub Issues Tool
5.7.9 — GitHub Issues Tool

This milestone adds repository issue awareness to your GitHub MCP server.

The new tool will be:

github_list_issues

This lets the agent ask things like:

What open issues are in this repository?

Show me the bugs reported for this project.

Find recently updated issues.

The architecture remains:

AI Agent
   ↓
GitHubServer
   ↓
github_list_issues
   ↓
GitHubTools.listIssues()
   ↓
GitHubService.listIssues()
   ↓
GitHub REST API
1. Add GitHub issue types

Open:

src/mcp/servers/github/github.service.ts

Add these interfaces near your other GitHub response types:

export interface GitHubIssueUser {
    login: string;
}


export interface GitHubIssue {
    id: number;
    number: number;
    title: string;
    body: string | null;
    state: "open" | "closed";
    html_url: string;
    user: GitHubIssueUser;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    labels: Array<{
        name: string;
    }>;
}
2. Add listIssues() to GitHubService

Inside GitHubService, add:

/**
 * List issues from a GitHub repository.
 *
 * Pull requests are also returned by GitHub's
 * issues API, so they are explicitly filtered out.
 */
public async listIssues(
    owner: string,
    repository: string,
    state: "open" | "closed" | "all" = "open"
): Promise<GitHubIssue[]> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    const params =
        new URLSearchParams({
            state,
            per_page: "100"
        });


    const issues =
        await this.request<GitHubIssue[]>(
            `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/issues?${params.toString()}`
        );


    /*
     * GitHub's /issues endpoint includes pull requests.
     *
     * Pull requests contain a pull_request property.
     * Our GitHubIssue interface intentionally does not
     * expose that property, so use a small runtime check.
     */
    return issues.filter(
        issue =>
            !(
                "pull_request" in
                (issue as unknown as Record<string, unknown>)
            )
    );
}
Why filter pull requests?

GitHub's:

/repos/{owner}/{repo}/issues

endpoint returns both:

Issues
+
Pull Requests

For your MCP abstraction, github_list_issues should return actual issues only.

3. Add issue arguments to github.tools.ts

In:

src/mcp/servers/github/github.tools.ts

add:

export interface GitHubListIssuesArgs {
    owner: string;
    repository: string;
    state?: "open" | "closed" | "all";
}
4. Import GitHubIssue

Update your service imports:

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue
} from "./github.service";
5. Add listIssues() to GitHubTools

Inside GitHubTools:

public async listIssues(
    args: GitHubListIssuesArgs
): Promise<GitHubIssue[]> {


    this.validateRepositoryArguments(
        args
    );


    const state =
        args.state ?? "open";


    return this.githubService.listIssues(
        args.owner,
        args.repository,
        state
    );
}
6. Add the MCP tool

Add:

private listIssuesTool(): MCPTool {


    return {
        name: "github_list_issues",


        description:
            "List issues from a GitHub repository. Pull requests are excluded from the results.",


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


                state: {
                    type: "string",
                    description:
                        "Issue state to return. Defaults to open.",
                    enum: [
                        "open",
                        "closed",
                        "all"
                    ]
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
                this.validateListIssuesArguments(
                    args
                );


            return this.listIssues(
                validatedArgs
            );
        }
    };
}
7. Add validation

Add this method:

private validateListIssuesArguments(
    args: unknown
): GitHubListIssuesArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    const result: GitHubListIssuesArgs = {
        ...repositoryArgs
    };


    if (
        value.state !== undefined
    ) {


        if (
            value.state !== "open" &&
            value.state !== "closed" &&
            value.state !== "all"
        ) {
            throw new Error(
                "GitHub issue state must be open, closed, or all."
            );
        }


        result.state =
            value.state;
    }


    return result;
}

This prevents invalid calls such as:

{
    "state": "pending"
}
8. Register the tool

Your current getTools() should be:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool()
    ];
}

Change it to:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool()
    ];
}

You now have six GitHub MCP tools:

github_get_repository
github_get_contents
github_list_branches
github_read_file
github_search_code
github_list_issues
9. Example calls
Open issues
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

Defaults to:

state = open
Closed issues
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "state": "closed"
}
All issues
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "state": "all"
}
10. Why this matters for your agent

Your agent can now combine code + project tasks:

User:
"Find the issue related to Docker deployment
and inspect the relevant implementation."


        ↓


github_list_issues
        ↓
Find relevant issue
        ↓
github_search_code
        ↓
Find implementation
        ↓
github_read_file
        ↓
Read source code
        ↓
LLM analysis

This is exactly the direction we want for your developer assistant.

5.7.9 checkpoint

Now run:

npx tsc --noEmit

Expected:

PS ...\backend> npx tsc --noEmit
PS ...\backend>

If it passes, 5.7.9 — GitHub Issues Tool is complete.

One important note: this implementation intentionally starts with listing issues. We should keep issue creation/update/delete for a later milestone because those are write operations and deserve explicit validation and authorization handling before your agent can perform them.

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

✅ 5.7.9 — GitHub Issues Tool checkpoint passed.

npx tsc --noEmit

No output means the TypeScript compilation is clean.

GitHub MCP progress
5.7.1  GitHub MCP Foundation          ✅
5.7.2  GitHub Configuration/Types     ✅
5.7.3  GitHubService                  ✅
5.7.4  Repository Tool                ✅
5.7.5  Repository Contents Tool       ✅
5.7.6  Branches Tool                  ✅
5.7.7  File Reading Tool              ✅
5.7.8  Code Search Tool               ✅
5.7.9  Issues Tool                    ✅
Current GitHub MCP tools
github_get_repository
github_get_contents
github_list_branches
github_read_file
github_search_code
github_list_issues

Your GitHub server is now moving beyond basic API access into developer-oriented repository intelligence.

The important combined workflow is now:

                  GitHub Repository
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       Search          Read           Issues
        Code           Files          /Tasks
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                    AI Agent
                         │
                         ▼
                  Code reasoning
Next: 5.7.10

I'd recommend GitHub Pull Requests Tool next:

github_list_pull_requests

That gives your agent awareness of:

Pull requests
PR state
PR titles/descriptions
Authors
Review/development workflow

Then your GitHub MCP layer will cover the three major repository dimensions:

Code       → search/read
Issues     → project problems/tasks
PRs        → proposed code changes

After implementation, we'll continue the same checkpoint:

npx tsc --noEmit


5.7.13 — GitHub Repository Tree Tool

This milestone adds:

github_get_tree

The purpose is to let your AI agent obtain the repository-wide file/folder structure in one operation.

This is especially useful before code search or file reading.

AI Agent
   ↓
github_get_tree
   ↓
GitHub repository tree
   ↓
Project structure
   ↓
Search / Read relevant files
1. Add Repository Tree types

Open:

src/mcp/servers/github/github.service.ts

Add:

export interface GitHubTreeItem {
    path: string;
    mode: string;
    type: "blob" | "tree" | "commit";
    sha: string;
    size?: number;
    url?: string;
}


export interface GitHubTreeResponse {
    sha: string;
    url: string;
    tree: GitHubTreeItem[];
    truncated: boolean;
}
Meaning

GitHub represents:

blob

as a file.

And:

tree

as a directory.

So your agent can understand:

src/server.ts      → blob
src/services       → tree
package.json       → blob
2. Add getTree() to GitHubService

Inside GitHubService, add:

/**
 * Get the complete Git tree for a repository.
 *
 * The recursive option allows the agent to receive
 * the repository structure in a single request.
 *
 * ref can be a branch, tag, or commit SHA.
 */
public async getTree(
    owner: string,
    repository: string,
    ref?: string
): Promise<GitHubTreeResponse> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    const treeRef =
        ref?.trim() || "HEAD";


    const endpoint =
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}` +
        `/git/trees/${encodeURIComponent(treeRef)}?recursive=1`;


    return this.request<GitHubTreeResponse>(
        endpoint
    );
}

This uses GitHub's Git Trees API rather than recursively calling the contents API.

That's important because the agent can get the repository structure in a single logical operation.

3. Add tool arguments

Open:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubGetTreeArgs {
    owner: string;
    repository: string;
    ref?: string;
}
4. Import the tree response

Update your service import:

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue,
    GitHubPullRequest,
    GitHubCommit,
    GitHubCompareResponse,
    GitHubTreeResponse
} from "./github.service";
5. Add getTree() to GitHubTools

Inside GitHubTools:

public async getTree(
    args: GitHubGetTreeArgs
): Promise<GitHubTreeResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getTree(
        args.owner,
        args.repository,
        args.ref
    );
}
6. Add the MCP tool

Add:

private getTreeTool(): MCPTool {


    return {
        name: "github_get_tree",


        description:
            "Get the repository-wide file and directory tree from GitHub.",


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


                ref: {
                    type: "string",
                    description:
                        "Optional branch, tag, or commit SHA. Defaults to HEAD."
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
                this.validateGetTreeArguments(
                    args
                );


            return this.getTree(
                validatedArgs
            );
        }
    };
}
7. Add validation

Add:

private validateGetTreeArguments(
    args: unknown
): GitHubGetTreeArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    const result: GitHubGetTreeArgs = {
        ...repositoryArgs
    };


    if (
        value.ref !== undefined
    ) {


        if (
            typeof value.ref !== "string"
        ) {
            throw new Error(
                "GitHub tree ref must be a string."
            );
        }


        result.ref =
            value.ref.trim();
    }


    return result;
}
8. Register the tool

Your getTools() currently has nine tools:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool()
    ];
}

Add the tree tool:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool()
    ];
}

You now have 10 GitHub MCP tools.

9. Example call

The AI agent can call:

{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

Or inspect a particular branch:

{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant",
    "ref": "main"
}

The GitHub response will contain entries such as:

{
    "path": "backend/src/mcp/servers/github/github.service.ts",
    "mode": "100644",
    "type": "blob",
    "sha": "abc123",
    "size": 15234
}

and:

{
    "path": "backend/src/mcp/servers/github",
    "mode": "040000",
    "type": "tree",
    "sha": "def456"
}
10. Important: truncated

GitHub may return:

{
    "truncated": true
}

for very large repositories.

Don't ignore this field.

Your agent should know that:

truncated = false

means it received the complete tree.

Whereas:

truncated = true

means the repository is too large for the response and the agent should use more targeted operations such as:

github_get_contents
github_search_code

This is one reason we're keeping the tree response faithful to GitHub instead of pretending it is always complete.

11. Why this tool is important

This completes the basic repository discovery layer.

Your agent can now start with:

github_get_tree
        ↓
Understand project structure
        ↓
github_search_code
        ↓
Find relevant implementation
        ↓
github_read_file
        ↓
Understand code
        ↓
github_list_commits
        ↓
Understand history
        ↓
github_compare_commits
        ↓
Understand changes

That's a much better foundation for the agent than blindly sending files to the LLM.

12. Current GitHub MCP architecture
                    GitHub MCP
                        │
 ┌──────────────────────┼────────────────────────┐
 │                      │                        │
 ▼                      ▼                        ▼
Repository          Source Code             Development
 │                      │                        │
 ├─ Repository           ├─ Contents             ├─ Issues
 ├─ Branches             ├─ Read File            ├─ Pull Requests
 └─ Tree                 └─ Search               ├─ Commits
                                                 └─ Diff

This is now a strong read-only GitHub developer intelligence layer.

5.7.13 checkpoint

Run:

npx tsc --noEmit

Expected:

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>

If clean:

5.7.13 — GitHub Repository Tree Tool ✅

Next milestone

I recommend 5.7.14 — GitHub Releases/Tags Tool.

That will allow your agent to understand repository versions:

v1.0.0
v1.1.0
v2.0.0

and eventually correlate:

Release → commits → files → changes

which becomes useful for release analysis and debugging regressions.

5.7.14 — GitHub Releases/Tags Tool.

5.7.14 — GitHub Releases / Tags Tool

This milestone adds repository version awareness.

We'll expose two MCP tools:

github_list_releases
github_list_tags

This lets the agent understand:

Release → Tag → Version → Commit

and answer questions such as:

"What releases does this repository have?"
"What is the latest release?"
"Show me the available tags."
"Which version should I inspect?"
"What tags exist around a particular release?"
1. Add Release and Tag types

Open:

src/mcp/servers/github/github.service.ts

Add:

export interface GitHubRelease {
    id: number;
    tag_name: string;
    name: string | null;
    body: string | null;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string | null;
    html_url: string;
    target_commitish: string;
    author: GitHubIssueUser;
}


export interface GitHubTag {
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    zipball_url?: string;
    tarball_url?: string;
}
Why keep releases and tags separate?

A GitHub release is a published release object.

A tag is a Git reference.

For example:

Release:
v1.2.0
    │
    └── Tag: v1.2.0
             │
             └── Commit SHA

Not every tag necessarily has a release.

2. Add listReleases() to GitHubService

Inside GitHubService, add:

/**
 * List releases from a GitHub repository.
 */
public async listReleases(
    owner: string,
    repository: string
): Promise<GitHubRelease[]> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    return this.request<GitHubRelease[]>(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/releases?per_page=100`
    );
}
3. Add listTags() to GitHubService

Add:

/**
 * List Git tags from a GitHub repository.
 */
public async listTags(
    owner: string,
    repository: string
): Promise<GitHubTag[]> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    return this.request<GitHubTag[]>(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/tags?per_page=100`
    );
}
4. Add tool arguments

Open:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubListReleasesArgs {
    owner: string;
    repository: string;
}


export interface GitHubListTagsArgs {
    owner: string;
    repository: string;
}
5. Import the new types

Update the existing service import:

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue,
    GitHubPullRequest,
    GitHubCommit,
    GitHubCompareResponse,
    GitHubTreeResponse,
    GitHubRelease,
    GitHubTag
} from "./github.service";
6. Add release operation to GitHubTools

Inside GitHubTools:

public async listReleases(
    args: GitHubListReleasesArgs
): Promise<GitHubRelease[]> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listReleases(
        args.owner,
        args.repository
    );
}
7. Add tag operation

Also add:

public async listTags(
    args: GitHubListTagsArgs
): Promise<GitHubTag[]> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listTags(
        args.owner,
        args.repository
    );
}
8. Add Release MCP Tool

Add:

private listReleasesTool(): MCPTool {


    return {
        name: "github_list_releases",


        description:
            "List published releases from a GitHub repository.",


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
                this.validateListReleasesArguments(
                    args
                );


            return this.listReleases(
                validatedArgs
            );
        }
    };
}
9. Add Release validation
private validateListReleasesArguments(
    args: unknown
): GitHubListReleasesArgs {


    return this.validateRepositoryArguments(
        args
    );
}

This reuses your existing repository validation.

10. Add Tags MCP Tool

Add:

private listTagsTool(): MCPTool {


    return {
        name: "github_list_tags",


        description:
            "List Git tags from a GitHub repository.",


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
                this.validateListTagsArguments(
                    args
                );


            return this.listTags(
                validatedArgs
            );
        }
    };
}
11. Add Tags validation
private validateListTagsArguments(
    args: unknown
): GitHubListTagsArgs {


    return this.validateRepositoryArguments(
        args
    );
}
12. Register both tools

Your current getTools() should contain 10 tools:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool()
    ];
}

Change it to:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool(),
        this.listReleasesTool(),
        this.listTagsTool()
    ];
}

You now have 12 GitHub MCP tools.

13. Example calls
List releases
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

The agent can receive:

v1.0.0
v1.1.0
v1.2.0

along with release metadata.

List tags
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

The response can contain:

[
    {
        "name": "v1.2.0",
        "commit": {
            "sha": "abc123..."
        }
    }
]
14. Useful agent workflow

This unlocks a useful version-analysis flow:

              GitHub Repository
                      │
                      ▼
               github_list_releases
                      │
                      ▼
                 Version
                      │
             ┌────────┴────────┐
             ▼                 ▼
       github_list_tags   github_list_commits
             │                 │
             └────────┬────────┘
                      ▼
              github_compare_commits
                      │
                      ▼
                AI Analysis

For example:

"What changed between v1.0.0 and v1.1.0?"

The agent can eventually:

1. list releases
2. identify tags
3. compare v1.0.0...v1.1.0
4. inspect changed files
5. read relevant source
6. explain the changes

That is exactly the kind of multi-tool reasoning we want later when we introduce the agent orchestration layer.

5.7.14 checkpoint

Run:

npx tsc --noEmit

Expected:

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>

If it passes:

5.7.14 — GitHub Releases/Tags Tool ✅

Current GitHub MCP toolset
github_get_repository
github_get_contents
github_list_branches
github_read_file
github_search_code
github_list_issues
github_list_pull_requests
github_list_commits
github_compare_commits
github_get_tree
github_list_releases
github_list_tags

At this point your GitHub MCP server has a strong read-only repository intelligence foundation. The next milestone I'd recommend is 5.7.15 — GitHub Repository Search / Discovery Tool, allowing the agent to find repositories before it even knows the exact repository name.

5.7.15 — GitHub Repository Search / Discovery Tool

5.7.15 — GitHub Repository Search / Discovery Tool

This milestone adds repository discovery to your GitHub MCP layer.

New MCP tool:

github_search_repositories

This is important because your agent currently assumes it already knows:

owner + repository

After 5.7.15, the workflow can become:

User
 ↓
"What repositories relate to authentication?"
 ↓
github_search_repositories
 ↓
Find repositories
 ↓
github_get_repository
 ↓
github_get_tree
 ↓
github_search_code
 ↓
github_read_file
 ↓
AI reasoning
1. Add GitHub repository search types

Open:

src/mcp/servers/github/github.service.ts

Add:

export interface GitHubRepositorySearchItem
    extends GitHubRepository {
    score?: number;
    full_name: string;
}


export interface GitHubRepositorySearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubRepositorySearchItem[];
}

If your existing GitHubRepository already contains full_name, this is still fine as long as the interface remains structurally compatible.

2. Add searchRepositories() to GitHubService

Inside GitHubService, add:

/**
 * Search GitHub repositories using GitHub's
 * repository search API.
 *
 * The query can contain GitHub search qualifiers,
 * for example:
 *
 *   typescript
 *   nodejs language:typescript
 *   mcp stars:>100
 *   react topic:frontend
 */
public async searchRepositories(
    query: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubRepositorySearchResponse> {


    if (!query?.trim()) {
        throw new Error(
            "GitHub repository search query is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "GitHub repository search page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "GitHub repository search perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "q",
        query.trim()
    );


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    const endpoint =
        `/search/repositories?${params.toString()}`;


    return this.request<GitHubRepositorySearchResponse>(
        endpoint
    );
}
Why support pagination?

GitHub repository search can return many repositories.

We don't want your MCP tool to dump hundreds of repositories into the LLM context.

Instead:

page = 1
perPage = 30

is a reasonable default.

3. Add tool arguments

Open:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubSearchRepositoriesArgs {
    query: string;
    page?: number;
    perPage?: number;
}
4. Import the search response

Add GitHubRepositorySearchResponse to your service imports:

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue,
    GitHubPullRequest,
    GitHubCommit,
    GitHubCompareResponse,
    GitHubTreeResponse,
    GitHubRelease,
    GitHubTag,
    GitHubRepositorySearchResponse
} from "./github.service";
5. Add operation to GitHubTools

Inside GitHubTools:

public async searchRepositories(
    args: GitHubSearchRepositoriesArgs
): Promise<GitHubRepositorySearchResponse> {


    if (
        !args.query ||
        !args.query.trim()
    ) {
        throw new Error(
            "GitHub repository search query is required."
        );
    }


    return this.githubService.searchRepositories(
        args.query,
        args.page,
        args.perPage
    );
}
6. Add MCP tool

Add:

private searchRepositoriesTool(): MCPTool {


    return {
        name: "github_search_repositories",


        description:
            "Search GitHub repositories using a search query and optional GitHub search qualifiers.",


        inputSchema: {
            type: "object",


            properties: {
                query: {
                    type: "string",
                    description:
                        "GitHub repository search query. GitHub search qualifiers such as language:, stars:, topic:, and user: may be used."
                },


                page: {
                    type: "number",
                    description:
                        "Page number. Defaults to 1."
                },


                perPage: {
                    type: "number",
                    description:
                        "Number of repositories to return per page. Defaults to 30 and has a maximum of 100."
                }
            },


            required: [
                "query"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateSearchRepositoriesArguments(
                    args
                );


            return this.searchRepositories(
                validatedArgs
            );
        }
    };
}
7. Add validation

Add:

private validateSearchRepositoriesArguments(
    args: unknown
): GitHubSearchRepositoriesArgs {


    if (
        !args ||
        typeof args !== "object"
    ) {
        throw new Error(
            "GitHub repository search arguments are required."
        );
    }


    const value =
        args as Record<string, unknown>;


    if (
        typeof value.query !== "string" ||
        !value.query.trim()
    ) {
        throw new Error(
            "GitHub repository search query is required."
        );
    }


    const result:
        GitHubSearchRepositoriesArgs = {
        query:
            value.query.trim()
    };


    if (
        value.page !== undefined
    ) {


        if (
            typeof value.page !== "number" ||
            !Number.isInteger(value.page) ||
            value.page < 1
        ) {
            throw new Error(
                "GitHub repository search page must be a positive integer."
            );
        }


        result.page =
            value.page;
    }


    if (
        value.perPage !== undefined
    ) {


        if (
            typeof value.perPage !== "number" ||
            !Number.isInteger(value.perPage) ||
            value.perPage < 1 ||
            value.perPage > 100
        ) {
            throw new Error(
                "GitHub repository search perPage must be between 1 and 100."
            );
        }


        result.perPage =
            value.perPage;
    }


    return result;
}
8. Register the tool

Your getTools() currently contains 12 tools:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool(),
        this.listReleasesTool(),
        this.listTagsTool()
    ];
}

Add:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool(),
        this.listReleasesTool(),
        this.listTagsTool(),
        this.searchRepositoriesTool()
    ];
}

You now have 13 GitHub MCP tools.

9. Example queries
Search for MCP repositories
{
    "query": "MCP"
}
TypeScript MCP repositories
{
    "query": "MCP language:typescript"
}
Popular React repositories
{
    "query": "react stars:>1000"
}
Repositories belonging to a user
{
    "query": "user:firdousalam"
}
Search with pagination
{
    "query": "nodejs language:typescript",
    "page": 2,
    "perPage": 20
}
10. Important AI-agent design

This tool should not replace github_search_code.

They solve different problems:

github_search_repositories
        ↓
"What repositories are relevant?"

versus:

github_search_code
        ↓
"Where is this code inside the repository?"

So your agent can now perform a two-stage discovery process:

User:
"Find GitHub projects implementing MCP in TypeScript."


             ↓


github_search_repositories
             ↓
Repository candidates
             ↓
Select relevant repository
             ↓
github_get_repository
             ↓
github_get_tree
             ↓
github_search_code

This is an important capability for a future autonomous developer agent.

11. Current GitHub MCP architecture

You now have:

                    GitHub MCP
                        │
       ┌────────────────┼─────────────────┐
       │                │                 │
       ▼                ▼                 ▼
   Discovery          Code            History
       │                │                 │
       ├─ Search        ├─ Contents        ├─ Commits
       ├─ Repository    ├─ Read File       ├─ Diff
       ├─ Tree          └─ Code Search     ├─ Releases
       └─ Branches                         └─ Tags
                        │
                        ▼
                    Workflow
                        │
                 ┌──────┴──────┐
                 ▼             ▼
              Issues           PRs

That's becoming a genuine GitHub developer intelligence MCP server, not just a collection of API wrappers.

12. 5.7.15 checkpoint

Run:

npx tsc --noEmit

Expected:

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>

If it passes:

5.7.15 — GitHub Repository Search / Discovery Tool ✅

GitHub MCP tool count
1.  github_get_repository
2.  github_get_contents
3.  github_list_branches
4.  github_read_file
5.  github_search_code
6.  github_list_issues
7.  github_list_pull_requests
8.  github_list_commits
9.  github_compare_commits
10. github_get_tree
11. github_list_releases
12. github_list_tags
13. github_search_repositories

Next recommended milestone: 5.7.16 — GitHub User/Organization Tool.

That would allow the agent to inspect repository ownership and discover organizations/users before drilling into their repositories.

5.7.17 — GitHub Contributors / Collaborators Tool

For this milestone, I recommend implementing Contributors first and Collaborators separately.

The distinction matters:

Contributors → public repository contribution/activity data.
Collaborators → repository access/permission information and may require authentication.

So we should not incorrectly treat them as the same GitHub API.

We'll add:

github_list_contributors
github_list_collaborators
1. Add GitHub contributor types

Open:

src/mcp/servers/github/github.service.ts

Add:

export interface GitHubContributor {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;


    contributions: number;


    type: string;
}

Add collaborator types:

export interface GitHubCollaborator {
    login: string;
    id: number;


    avatar_url: string;
    html_url: string;


    type: string;


    permissions?: {
        pull?: boolean;
        triage?: boolean;
        push?: boolean;
        maintain?: boolean;
        admin?: boolean;
    };
}

The permissions object is optional because the GitHub API response can vary depending on authentication and permissions.

2. Add listContributors() to GitHubService

Add:

/**
 * List contributors to a GitHub repository.
 *
 * Contributors are returned in descending order
 * of contribution count by GitHub.
 */
public async listContributors(
    owner: string,
    repository: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubContributor[]> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "GitHub contributors page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "GitHub contributors perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    const endpoint =
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}` +
        `/contributors?${params.toString()}`;


    return this.request<GitHubContributor[]>(
        endpoint
    );
}
3. Add listCollaborators()

Add:

/**
 * List collaborators for a GitHub repository.
 *
 * This endpoint may require authentication and
 * appropriate repository permissions.
 */
public async listCollaborators(
    owner: string,
    repository: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubCollaborator[]> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "GitHub collaborators page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "GitHub collaborators perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    const endpoint =
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}` +
        `/collaborators?${params.toString()}`;


    return this.request<GitHubCollaborator[]>(
        endpoint
    );
}
Important

Unlike contributors, collaborators are permission-sensitive.

Your existing:

GITHUB_TOKEN

will therefore matter for this operation.

Do not assume that an unauthenticated request can retrieve collaborator information.

4. Add tool argument types

Open:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubListContributorsArgs {
    owner: string;
    repository: string;
    page?: number;
    perPage?: number;
}


export interface GitHubListCollaboratorsArgs {
    owner: string;
    repository: string;
    page?: number;
    perPage?: number;
}
5. Import the new types

Update your service import:

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue,
    GitHubPullRequest,
    GitHubCommit,
    GitHubCompareResponse,
    GitHubTreeResponse,
    GitHubRelease,
    GitHubTag,
    GitHubRepositorySearchResponse,
    GitHubUser,
    GitHubOrganization,
    GitHubContributor,
    GitHubCollaborator
} from "./github.service";
6. Add contributors operation

Inside GitHubTools:

public async listContributors(
    args: GitHubListContributorsArgs
): Promise<GitHubContributor[]> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listContributors(
        args.owner,
        args.repository,
        args.page,
        args.perPage
    );
}
7. Add collaborators operation
public async listCollaborators(
    args: GitHubListCollaboratorsArgs
): Promise<GitHubCollaborator[]> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listCollaborators(
        args.owner,
        args.repository,
        args.page,
        args.perPage
    );
}
8. Add Contributors MCP Tool

Add:

private listContributorsTool(): MCPTool {


    return {
        name: "github_list_contributors",


        description:
            "List contributors to a GitHub repository, including their contribution counts.",


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


                page: {
                    type: "number",
                    description:
                        "Page number. Defaults to 1."
                },


                perPage: {
                    type: "number",
                    description:
                        "Number of contributors per page. Defaults to 30 and has a maximum of 100."
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
                this.validateListContributorsArguments(
                    args
                );


            return this.listContributors(
                validatedArgs
            );
        }
    };
}
9. Add contributor validation
private validateListContributorsArguments(
    args: unknown
): GitHubListContributorsArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    const result:
        GitHubListContributorsArgs = {
        ...repositoryArgs
    };


    if (
        value.page !== undefined
    ) {


        if (
            typeof value.page !== "number" ||
            !Number.isInteger(value.page) ||
            value.page < 1
        ) {
            throw new Error(
                "GitHub contributors page must be a positive integer."
            );
        }


        result.page =
            value.page;
    }


    if (
        value.perPage !== undefined
    ) {


        if (
            typeof value.perPage !== "number" ||
            !Number.isInteger(value.perPage) ||
            value.perPage < 1 ||
            value.perPage > 100
        ) {
            throw new Error(
                "GitHub contributors perPage must be between 1 and 100."
            );
        }


        result.perPage =
            value.perPage;
    }


    return result;
}
10. Add Collaborators MCP Tool

Add:

private listCollaboratorsTool(): MCPTool {


    return {
        name: "github_list_collaborators",


        description:
            "List collaborators with access to a GitHub repository. This operation may require authentication and appropriate repository permissions.",


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


                page: {
                    type: "number",
                    description:
                        "Page number. Defaults to 1."
                },


                perPage: {
                    type: "number",
                    description:
                        "Number of collaborators per page. Defaults to 30 and has a maximum of 100."
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
                this.validateListCollaboratorsArguments(
                    args
                );


            return this.listCollaborators(
                validatedArgs
            );
        }
    };
}
11. Add collaborator validation
private validateListCollaboratorsArguments(
    args: unknown
): GitHubListCollaboratorsArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    const result:
        GitHubListCollaboratorsArgs = {
        ...repositoryArgs
    };


    if (
        value.page !== undefined
    ) {


        if (
            typeof value.page !== "number" ||
            !Number.isInteger(value.page) ||
            value.page < 1
        ) {
            throw new Error(
                "GitHub collaborators page must be a positive integer."
            );
        }


        result.page =
            value.page;
    }


    if (
        value.perPage !== undefined
    ) {


        if (
            typeof value.perPage !== "number" ||
            !Number.isInteger(value.perPage) ||
            value.perPage < 1 ||
            value.perPage > 100
        ) {
            throw new Error(
                "GitHub collaborators perPage must be between 1 and 100."
            );
        }


        result.perPage =
            value.perPage;
    }


    return result;
}
12. Register both tools

Your current getTools() has 15 tools.

Change it to:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool(),
        this.listReleasesTool(),
        this.listTagsTool(),
        this.searchRepositoriesTool(),
        this.getUserTool(),
        this.getOrganizationTool(),
        this.listContributorsTool(),
        this.listCollaboratorsTool()
    ];
}

You now have 17 GitHub MCP tools.

13. Example — Contributors

The agent can call:

{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

Tool:

github_list_contributors

It can receive:

Contributor A → 120 commits
Contributor B → 74 commits
Contributor C → 21 commits

This lets the agent reason about repository contribution activity.

14. Example — Collaborators
{
    "owner": "firdousalam",
    "repository": "AI-powered-Full-Stack-Developer-Assistant"
}

Tool:

github_list_collaborators

Potential information:

user
permissions:
  pull
  triage
  push
  maintain
  admin

Again, the exact information depends on the authenticated GitHub token and repository permissions.

15. Contributor vs Collaborator

This distinction is important for your agent.

                 Repository
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
    Contributors           Collaborators
          │                     │
          ▼                     ▼
  Contribution data       Access data
          │                     │
     "Who codes?"        "Who has access?"

For example:

"Who contributes most to this project?"

Use:

github_list_contributors

Whereas:

"Who has access to this repository?"

Use:

github_list_collaborators
16. Agent workflow

This becomes especially useful when combined with your existing history tools:

github_list_contributors
          │
          ▼
Identify active contributors
          │
          ▼
github_list_commits
          │
          ▼
Inspect recent work
          │
          ▼
github_list_pull_requests
          │
          ▼
Inspect development workflow
          │
          ▼
AI activity analysis

For example, the agent could eventually answer:

"Who has been most active recently?"

It could combine contributor data with commit history and PR information instead of relying on a single API response.

17. Current GitHub MCP architecture

You now have:

                         GitHub MCP
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
   Discovery               Code                History
       │                     │                     │
   User / Org            Contents             Commits
   Repository             Read File            Diff
   Search                 Code Search          Releases
   Tree                                        Tags
   Branches
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             ▼
                       Collaboration
                             │
                    ┌────────┴────────┐
                    ▼                 ▼
              Contributors      Collaborators
                    │                 │
                    └────────┬────────┘
                             ▼
                         AI Agent

This is now a fairly comprehensive read-oriented GitHub MCP layer.

18. 5.7.17 checkpoint

Run:

npx tsc --noEmit

Expected:

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>

If there is no output:

5.7.17 — GitHub Contributors / Collaborators Tool ✅

Current tool count
1.  github_get_repository
2.  github_get_contents
3.  github_list_branches
4.  github_read_file
5.  github_search_code
6.  github_list_issues
7.  github_list_pull_requests
8.  github_list_commits
9.  github_compare_commits
10. github_get_tree
11. github_list_releases
12. github_list_tags
13. github_search_repositories
14. github_get_user
15. github_get_organization
16. github_list_contributors
17. github_list_collaborators

Next logical milestone: 5.7.18 — GitHub Repository Statistics / Activity Tool.

That would combine repository-level statistics such as stars, forks, watchers, open issues, network size, and activity information into a developer-friendly MCP response rather than forcing the LLM to interpret raw GitHub metadata.

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

✅ 5.7.17 — GitHub Contributors / Collaborators Tool completed successfully.

Your TypeScript checkpoint is clean:

npx tsc --noEmit

0 errors.

Current GitHub MCP tools: 17 ✅
1.  github_get_repository
2.  github_get_contents
3.  github_list_branches
4.  github_read_file
5.  github_search_code
6.  github_list_issues
7.  github_list_pull_requests
8.  github_list_commits
9.  github_compare_commits
10. github_get_tree
11. github_list_releases
12. github_list_tags
13. github_search_repositories
14. github_get_user
15. github_get_organization
16. github_list_contributors
17. github_list_collaborators

Your GitHub MCP server now covers:

Discovery
├── User
├── Organization
├── Repository Search
└── Repository


Repository Structure
├── Tree
├── Contents
├── Files
└── Branches


Code Intelligence
└── Code Search


Development Activity
├── Issues
├── Pull Requests
├── Commits
├── Diff
├── Contributors
└── Collaborators


Versioning
├── Releases
└── Tags
Next: 5.7.18 — GitHub Repository Statistics / Activity Tool

This is a good next step because it moves from raw GitHub API access toward structured developer intelligence:

Repository
   │
   ├── Stars
   ├── Forks
   ├── Watchers
   ├── Open Issues
   ├── Size
   ├── Language
   ├── Network
   └── Activity
          │
          ▼
    AI Developer Assistant

After that, we can start getting closer to the more interesting part: using these 18+ tools intelligently through the MCP Gateway/AI agent rather than simply exposing individual tools.

how many more milestone like 5.7.18 — GitHub Repository Statistics / Activity Tool.   left

You have 17 GitHub MCP tools completed through 5.7.17.

If we continue at the same level of granularity, I would estimate around 8–10 more milestones for Chapter 5.7 before I would consider the GitHub MCP server feature-complete for your project.

Suggested remaining 5.7 roadmap
Milestone	Feature	Status
5.7.18	Repository Statistics / Activity	⏳ Next
5.7.19	Repository Languages / Tech Stack	⏳
5.7.20	GitHub Workflows / Actions	⏳
5.7.21	GitHub Discussions	⏳
5.7.22	Repository Topics / Metadata	⏳
5.7.23	Commit Activity / Contributor Analytics	⏳
5.7.24	Repository Dependency / Manifest Analysis	⏳
5.7.25	GitHub Security / Dependabot Information	⏳
5.7.26	GitHub MCP Tool Aggregation / Optimization	⏳
5.7.27	GitHub Server Integration & End-to-End Testing	⏳

So, roughly 10 milestones remain if we follow this detailed roadmap.

However, there's an important distinction:

You don't need 10 more milestones just to "finish GitHub"

Your current capabilities are already substantial:

                 GitHub MCP
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    Discovery      Code        History
        │            │            │
    User/Org      Files        Commits
    Repo Search   Code Search   Diff
    Repository    Tree          PRs
    Branches      Contents      Issues
                               Releases
                               Tags
        │
        ▼
 Collaboration
        │
 Contributors / Collaborators
        │
        ▼
      AI Agent

The most important architectural transition after the core GitHub tools is actually getting the AI to select and combine these tools intelligently.

For your overall project, I would structure the remaining work approximately as:

5.7 GitHub MCP
│
├── 5.7.18–5.7.25
│   Additional GitHub intelligence
│
├── 5.7.26
│   Tool aggregation / optimization
│
└── 5.7.27
    Integration testing
         │
         ▼
5.8 Git / Local Repository MCP
         │
         ▼
5.9 Docker MCP
         │
         ▼
5.10 Kubernetes MCP
         │
         ▼
5.11 CI/CD MCP
         │
         ▼
5.12 Developer Intelligence
         │
         ▼
5.13 RAG / Project Knowledge
         │
         ▼
5.14 Agent / Tool Orchestration
         │
         ▼
5.15 Autonomous Developer Workflows
My recommendation for your project

Don't unnecessarily create dozens of tiny GitHub milestones. 5.7.18 → 5.7.25 is enough to round out GitHub. Then move to the next MCP server/domain.

The real value of your project will come when something like this works:

User:
"Analyze why the latest version of my project
is having Docker deployment problems."


                     ↓


              AI Agent
                     ↓
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
 GitHub Tools    Filesystem     Docker
       │             │             │
 commits         source code     images
 PRs             Dockerfile      containers
 issues          package.json    logs
 diff            k8s manifests
       │             │             │
       └─────────────┼─────────────┘
                     ▼
               Agent Reasoning
                     ↓
              Root Cause Analysis
                     ↓
                 Solution

That is the point where your project starts becoming an actual AI developer agent rather than an MCP tool collection.

So I'd continue with 5.7.18 — GitHub Repository Statistics / Activity Tool, but after roughly 5.7.27, shift our focus from adding individual GitHub APIs to agent orchestration and intelligent MCP tool selection.

Suggested remaining 5.7 roadmap
Milestone	Feature	Status
5.7.18	Repository Statistics / Activity	⏳ Next
5.7.19	Repository Languages / Tech Stack	⏳
5.7.20	GitHub Workflows / Actions	⏳
5.7.21	GitHub Discussions	⏳
5.7.22	Repository Topics / Metadata	⏳
5.7.23	Commit Activity / Contributor Analytics	⏳
5.7.24	Repository Dependency / Manifest Analysis	⏳
5.7.25	GitHub Security / Dependabot Information	⏳
5.7.26	GitHub MCP Tool Aggregation / Optimization	⏳
5.7.27	GitHub Server Integration & End-to-End Testing	⏳

✅ 5.7.19 — GitHub Repository Languages / Technology Stack Tool completed successfully.

Checkpoint is clean:

npx tsc --noEmit

0 TypeScript errors.

Current progress

19 GitHub MCP tools completed ✅

5.7.17  Contributors / Collaborators       ✅
5.7.18  Repository Statistics / Activity   ✅
5.7.19  Repository Languages               ✅
Next milestone

5.7.20 — GitHub Actions / Workflows Tool

We'll add tools for inspecting:

GitHub Actions workflows
Workflow runs
Run status/conclusion
Failed workflow runs
Workflow metadata
Branch/workflow information

This will be particularly useful for your AI assistant because it can eventually answer:

"Why did my latest GitHub Actions deployment fail?"

by combining:

GitHub Actions
      ↓
Failed Run
      ↓
Workflow Logs / Status
      ↓
Commit
      ↓
Changed Files
      ↓
AI Root-Cause Analysis

After implementing 5.7.20, we'll run the same checkpoint:

npx tsc --noEmit

and continue only when it is clean.

5.7.20 — GitHub Actions / Workflows Tool  
5.7.20 — GitHub Actions / Workflows Tool

This milestone adds GitHub Actions visibility to your MCP server.

We'll add three tools:

github_list_workflows
github_list_workflow_runs
github_get_workflow_run

This is better than creating one oversized tool because the AI can progressively inspect CI/CD:

Repository
    ↓
List Workflows
    ↓
List Runs
    ↓
Inspect Specific Run
    ↓
AI analyzes CI/CD state
1. Add GitHub Actions types

Open:

src/mcp/servers/github/github.service.ts

Add:

export interface GitHubWorkflow {
    id: number;
    name: string;
    path: string;
    state: string;
    html_url: string;
    created_at: string;
    updated_at: string;
}


export interface GitHubWorkflowRun {
    id: number;
    name: string;
    workflow_id: number;


    head_branch: string | null;
    head_sha: string;


    status: string;
    conclusion: string | null;


    event: string;


    html_url: string;


    created_at: string;
    updated_at: string;


    run_number: number;
    run_attempt?: number;
}


export interface GitHubWorkflowRunsResponse {
    total_count: number;
    workflow_runs: GitHubWorkflowRun[];
}
2. Add listWorkflows()

Inside GitHubService:

/**
 * List GitHub Actions workflows for a repository.
 */
public async listWorkflows(
    owner: string,
    repository: string
): Promise<GitHubWorkflow[]> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/actions/workflows`;


    const response =
        await this.request<{
            total_count: number;
            workflows: GitHubWorkflow[];
        }>(endpoint);


    return response.workflows;
}
3. Add listWorkflowRuns()
/**
 * List GitHub Actions workflow runs.
 *
 * Optionally filters by workflow, branch and status.
 */
public async listWorkflowRuns(
    owner: string,
    repository: string,
    workflowId?: number,
    branch?: string,
    status?: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubWorkflowRunsResponse> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "Workflow runs page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "Workflow runs perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    if (workflowId !== undefined) {
        params.set(
            "workflow_id",
            String(workflowId)
        );
    }


    if (branch?.trim()) {
        params.set(
            "branch",
            branch.trim()
        );
    }


    if (status?.trim()) {
        params.set(
            "status",
            status.trim()
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/actions/runs?${params.toString()}`;


    return this.request<GitHubWorkflowRunsResponse>(
        endpoint
    );
}
4. Add getWorkflowRun()
/**
 * Get details for a specific GitHub Actions workflow run.
 */
public async getWorkflowRun(
    owner: string,
    repository: string,
    runId: number
): Promise<GitHubWorkflowRun> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(runId) ||
        runId <= 0
    ) {
        throw new Error(
            "GitHub workflow run ID must be a positive integer."
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/actions/runs/${runId}`;


    return this.request<GitHubWorkflowRun>(
        endpoint
    );
}
5. Add tool argument interfaces

Open:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubListWorkflowRunsArgs {
    owner: string;
    repository: string;


    workflowId?: number;
    branch?: string;
    status?: string;


    page?: number;
    perPage?: number;
}


export interface GitHubGetWorkflowRunArgs {
    owner: string;
    repository: string;
    runId: number;
}
6. Import the new types

Add these to your existing service import:

GitHubWorkflow,
GitHubWorkflowRun,
GitHubWorkflowRunsResponse

For example:

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue,
    GitHubPullRequest,
    GitHubCommit,
    GitHubCompareResponse,
    GitHubTreeResponse,
    GitHubRelease,
    GitHubTag,
    GitHubRepositorySearchResponse,
    GitHubUser,
    GitHubOrganization,
    GitHubContributor,
    GitHubCollaborator,
    GitHubRepositoryStatistics,
    GitHubRepositoryLanguages,
    GitHubWorkflow,
    GitHubWorkflowRun,
    GitHubWorkflowRunsResponse
} from "./github.service";
7. Add workflow operation

Inside GitHubTools:

public async listWorkflows(
    args: {
        owner: string;
        repository: string;
    }
): Promise<GitHubWorkflow[]> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listWorkflows(
        args.owner,
        args.repository
    );
}
8. Add workflow runs operation
public async listWorkflowRuns(
    args: GitHubListWorkflowRunsArgs
): Promise<GitHubWorkflowRunsResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listWorkflowRuns(
        args.owner,
        args.repository,
        args.workflowId,
        args.branch,
        args.status,
        args.page,
        args.perPage
    );
}
9. Add workflow run operation
public async getWorkflowRun(
    args: GitHubGetWorkflowRunArgs
): Promise<GitHubWorkflowRun> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getWorkflowRun(
        args.owner,
        args.repository,
        args.runId
    );
}
10. Workflow list MCP tool

Add:

private listWorkflowsTool(): MCPTool {


    return {
        name: "github_list_workflows",


        description:
            "List GitHub Actions workflows configured for a repository.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string",
                    description:
                        "GitHub username or organization."
                },


                repository: {
                    type: "string",
                    description:
                        "GitHub repository name."
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


            return this.listWorkflows(
                validatedArgs
            );
        }
    };
}
11. Workflow runs MCP tool

Add:

private listWorkflowRunsTool(): MCPTool {


    return {
        name: "github_list_workflow_runs",


        description:
            "List GitHub Actions workflow runs, optionally filtered by workflow, branch, status, page, or page size.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string"
                },


                repository: {
                    type: "string"
                },


                workflowId: {
                    type: "number",
                    description:
                        "Optional GitHub workflow ID."
                },


                branch: {
                    type: "string",
                    description:
                        "Optional branch filter."
                },


                status: {
                    type: "string",
                    description:
                        "Optional workflow status filter such as completed, in_progress, queued, or failure."
                },


                page: {
                    type: "number",
                    description:
                        "Page number. Defaults to 1."
                },


                perPage: {
                    type: "number",
                    description:
                        "Number of runs per page. Maximum 100."
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
                this.validateListWorkflowRunsArguments(
                    args
                );


            return this.listWorkflowRuns(
                validatedArgs
            );
        }
    };
}
12. Add validation
private validateListWorkflowRunsArguments(
            typeof value.workflowId !== "number" ||
            !Number.isInteger(value.workflowId) ||
            value.workflowId <= 0
        ) {
            throw new Error(
                "workflowId must be a positive integer."
            );
        }


        result.workflowId =
            value.workflowId;
    }


    if (
        value.branch !== undefined
    ) {


        if (
            typeof value.branch !== "string" ||
            !value.branch.trim()
        ) {
            throw new Error(
                "branch must be a non-empty string."
            );
        }


        result.branch =
            value.branch;
    }


    if (
        value.status !== undefined
    ) {


        if (
            typeof value.status !== "string" ||
            !value.status.trim()
        ) {
            throw new Error(
                "status must be a non-empty string."
            );
        }


        result.status =
            value.status;
    }


    if (
        value.page !== undefined
    ) {


        if (
            typeof value.page !== "number" ||
            !Number.isInteger(value.page) ||
            value.page < 1
        ) {
            throw new Error(
                "page must be a positive integer."
            );
        }


        result.page =
            value.page;
    }


    if (
        value.perPage !== undefined
    ) {


        if (
            typeof value.perPage !== "number" ||
            !Number.isInteger(value.perPage) ||
            value.perPage < 1 ||
            value.perPage > 100
        ) {
            throw new Error(
                "perPage must be between 1 and 100."
            );
        }


        result.perPage =
            value.perPage;
    }


    return result;
}
13. Get workflow run MCP tool

Add:

private getWorkflowRunTool(): MCPTool {


    return {
        name: "github_get_workflow_run",


        description:
            "Get detailed information about a specific GitHub Actions workflow run.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string"
                },


                repository: {
                    type: "string"
                },


                runId: {
                    type: "number",
                    description:
                        "GitHub Actions workflow run ID."
                }
            },


            required: [
                "owner",
                "repository",
                "runId"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateGetWorkflowRunArguments(
                    args
                );


            return this.getWorkflowRun(
                validatedArgs
            );
        }
    };
}

Add validation:

private validateGetWorkflowRunArguments(
    args: unknown
): GitHubGetWorkflowRunArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    if (
        typeof value.runId !== "number" ||
        !Number.isInteger(value.runId) ||
        value.runId <= 0
    ) {
        throw new Error(
            "runId must be a positive integer."
        );
    }


    return {
        ...repositoryArgs,
        runId: value.runId
    };
}
14. Register the three tools

Update getTools().

Your current list has 19 tools.

Make it:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool(),
        this.listReleasesTool(),
        this.listTagsTool(),
        this.searchRepositoriesTool(),
        this.getUserTool(),
        this.getOrganizationTool(),
        this.listContributorsTool(),
        this.listCollaboratorsTool(),
        this.getRepositoryStatisticsTool(),
        this.getRepositoryLanguagesTool(),


        this.listWorkflowsTool(),
        this.listWorkflowRunsTool(),
        this.getWorkflowRunTool()
    ];
}

You now have:

22 GitHub MCP tools.

15. Example workflow

The agent can now perform:

User:
"Check whether my CI pipeline is healthy."

Agent:

github_list_workflows
        ↓
Find workflows
        ↓
github_list_workflow_runs
        ↓
Find latest run
        ↓
github_get_workflow_run
        ↓
Inspect status/conclusion
        ↓
AI response

For example:

CI workflow
Status: completed
Conclusion: failure
Branch: main
Commit: abc123
16. Why this milestone is important

This is a significant step for your project because your assistant now starts connecting source code intelligence with CI/CD intelligence.

Later, you can build:

                 AI Developer Agent
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
      GitHub           Docker          Kubernetes
        │                │                │
      Code             Image           Pods
      Commit           Build           Deployment
      PR               Container       Service
      Actions          Logs            Events
        │                │                │
        └────────────────┼────────────────┘
                         ▼
                  Root Cause Analysis

For example:

"My deployment failed after the latest commit."

The agent could eventually inspect:

1. github_get_workflow_run
2. github_list_commits
3. github_compare_commits
4. github_read_file
5. Docker tools
6. Kubernetes tools

and determine the likely cause.

17. One important correction

For this milestone, don't implement workflow logs yet.

GitHub Actions has additional endpoints around:

workflow run
jobs
job logs
artifacts

Those are useful, but they deserve their own milestone because log retrieval introduces substantially more data and processing.

We'll keep:

5.7.20

focused on:

Workflows
Workflow Runs
Workflow Run Details

Then later we can add:

5.7.21 — GitHub Actions Jobs / Logs / Artifacts

That will be much more useful for diagnosing CI failures.

18. Checkpoint

Now run:

npx tsc --noEmit

Expected:

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>

If there is no output:

✅ 5.7.20 completed

Your GitHub MCP layer will have:

22 tools

with the new:

github_list_workflows
github_list_workflow_runs
github_get_workflow_run

Next milestone: 5.7.21 — GitHub Actions Jobs / Logs / Artifacts Tool.

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

✅ 5.7.20 — GitHub Actions / Workflows Tool completed successfully.

Checkpoint is clean:

npx tsc --noEmit

0 TypeScript errors.

Current GitHub MCP progress

22 tools completed ✅

5.7.18  Repository Statistics / Activity   ✅
5.7.19  Repository Languages              ✅
5.7.20  GitHub Actions / Workflows        ✅

New tools added:

github_list_workflows
github_list_workflow_runs
github_get_workflow_run

Your architecture is now moving beyond repository inspection into CI/CD intelligence:

GitHub Repository
       │
       ├── Source Code
       ├── Commits
       ├── PRs
       ├── Issues
       └── GitHub Actions
              │
              ├── Workflows
              ├── Runs
              └── Run Details
                     │
                     ▼
                 AI Agent
Next: 5.7.21 — GitHub Actions Jobs / Logs / Artifacts Tool

This is an especially valuable one because it will let the assistant move from:

"The workflow failed."

to eventually:

"The workflow failed in the Docker build job, and the relevant job/log information points to the Dockerfile/build step."

We'll add:

github_list_workflow_jobs
github_get_workflow_job
github_get_workflow_job_logs
github_list_workflow_artifacts

Then your GitHub MCP layer will have much stronger CI/CD troubleshooting capability.


5.7.21 — GitHub Actions Jobs / Logs / Artifacts Tool

This milestone extends the GitHub Actions support from workflow/run metadata into actual job execution and build artifacts.

We'll add four MCP tools:

github_list_workflow_jobs
github_get_workflow_job
github_get_workflow_job_logs
github_list_workflow_artifacts

This gives your agent:

Workflow
   ↓
Workflow Run
   ↓
Jobs
   ├── Build
   ├── Test
   ├── Docker
   └── Deploy
        ↓
      Logs
        ↓
   Failure analysis


Artifacts
   ↓
Build/test outputs
1. Add GitHub Actions types

Open:

src/mcp/servers/github/github.service.ts

Add:

export interface GitHubWorkflowJob {


    id: number;


    run_id: number;


    workflow_name?: string | null;


    head_branch: string | null;


    head_sha: string;


    run_attempt?: number;


    node_id?: string;


    url: string;


    html_url: string;


    status: string;


    conclusion: string | null;


    started_at: string | null;


    completed_at: string | null;


    name: string;


    steps?: GitHubWorkflowStep[];
}


export interface GitHubWorkflowStep {


    name: string;


    status: string;


    conclusion: string | null;


    number: number;


    started_at: string | null;


    completed_at: string | null;
}


export interface GitHubWorkflowJobsResponse {


    total_count: number;


    jobs: GitHubWorkflowJob[];
}


export interface GitHubArtifact {


    id: number;


    node_id?: string;


    name: string;


    size_in_bytes: number;


    url: string;


    archive_download_url: string;


    expired: boolean;


    created_at: string;


    expires_at: string | null;


    updated_at: string;


    workflow_run?: {
        id: number;
        repository_id?: number;
        head_repository_id?: number;
        head_branch?: string;
        head_sha?: string;
    } | null;
}


export interface GitHubArtifactsResponse {


    total_count: number;


    artifacts: GitHubArtifact[];
}
2. Add listWorkflowJobs()

Inside GitHubService:

/**
 * List jobs belonging to a GitHub Actions workflow run.
 */
public async listWorkflowJobs(
    owner: string,
    repository: string,
    runId: number,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubWorkflowJobsResponse> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(runId) ||
        runId <= 0
    ) {
        throw new Error(
            "Workflow run ID must be a positive integer."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "Workflow jobs page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "Workflow jobs perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/actions/runs/${runId}/jobs?${params.toString()}`;


    return this.request<GitHubWorkflowJobsResponse>(
        endpoint
    );
}
3. Add getWorkflowJob()
/**
 * Get details about a specific GitHub Actions job.
 */
public async getWorkflowJob(
    owner: string,
    repository: string,
    jobId: number
): Promise<GitHubWorkflowJob> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(jobId) ||
        jobId <= 0
    ) {
        throw new Error(
            "Workflow job ID must be a positive integer."
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/actions/jobs/${jobId}`;


    return this.request<GitHubWorkflowJob>(
        endpoint
    );
}
4. Add workflow job logs

The GitHub job logs endpoint returns log content rather than a normal JSON object.

Add:

/**
 * Retrieve logs for a GitHub Actions job.
 *
 * GitHub returns the job log as text.
 */
public async getWorkflowJobLogs(
    owner: string,
    repository: string,
    jobId: number
): Promise<string> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(jobId) ||
        jobId <= 0
    ) {
        throw new Error(
            "Workflow job ID must be a positive integer."
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/actions/jobs/${jobId}/logs`;


    return this.request<string>(
        endpoint
    );
}
Important

This assumes your existing GitHubService.request() supports text responses.

If your current request() always does:

response.json()

then don't change it blindly.

Instead, add a separate helper for text responses, for example:

private async requestText(
    endpoint: string
): Promise<string> {


    const response =
        await fetch(
            `${this.config.apiUrl}${endpoint}`,
            {
                method: "GET",


                headers: {
                    Accept:
                        "application/vnd.github+json",


                    ...(this.config.token
                        ? {
                            Authorization:
                                `Bearer ${this.config.token}`
                        }
                        : {})
                }
            }
        );


    if (!response.ok) {
        throw new Error(
            `GitHub API request failed: ${response.status} ${response.statusText}`
        );
    }


    return response.text();
}

Then use:

return this.requestText(endpoint);

for getWorkflowJobLogs().

Use whichever approach matches your existing GitHubService implementation. Don't duplicate your authentication/request logic if your service already has a suitable text-response mechanism.

5. Add workflow artifacts
/**
 * List artifacts generated by GitHub Actions
 * for a repository.
 */
public async listWorkflowArtifacts(
    owner: string,
    repository: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubArtifactsResponse> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "Artifacts page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "Artifacts perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/actions/artifacts?${params.toString()}`;


    return this.request<GitHubArtifactsResponse>(
        endpoint
    );
}
6. Add tool argument interfaces

Open:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubListWorkflowJobsArgs {
    owner: string;
    repository: string;
    runId: number;
    page?: number;
    perPage?: number;
}


export interface GitHubGetWorkflowJobArgs {
    owner: string;
    repository: string;
    jobId: number;
}


export interface GitHubGetWorkflowJobLogsArgs {
    owner: string;
    repository: string;
    jobId: number;
}


export interface GitHubListWorkflowArtifactsArgs {
    owner: string;
    repository: string;
    page?: number;
    perPage?: number;
}
7. Import the new service types

Extend your existing import:

import {
    GitHubService,
    GitHubRepository,
    GitHubContent,
    GitHubBranch,
    GitHubCodeSearchResponse,
    GitHubIssue,
    GitHubPullRequest,
    GitHubCommit,
    GitHubCompareResponse,
    GitHubTreeResponse,
    GitHubRelease,
    GitHubTag,
    GitHubRepositorySearchResponse,
    GitHubUser,
    GitHubOrganization,
    GitHubContributor,
    GitHubCollaborator,
    GitHubRepositoryStatistics,
    GitHubRepositoryLanguages,
    GitHubWorkflow,
    GitHubWorkflowRun,
    GitHubWorkflowRunsResponse,
    GitHubWorkflowJob,
    GitHubWorkflowJobsResponse,
    GitHubArtifact,
    GitHubArtifactsResponse
} from "./github.service";
8. Add operations to GitHubTools
List jobs
public async listWorkflowJobs(
    args: GitHubListWorkflowJobsArgs
): Promise<GitHubWorkflowJobsResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listWorkflowJobs(
        args.owner,
        args.repository,
        args.runId,
        args.page,
        args.perPage
    );
}
Get job
public async getWorkflowJob(
    args: GitHubGetWorkflowJobArgs
): Promise<GitHubWorkflowJob> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getWorkflowJob(
        args.owner,
        args.repository,
        args.jobId
    );
}
Get logs
public async getWorkflowJobLogs(
    args: GitHubGetWorkflowJobLogsArgs
): Promise<string> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getWorkflowJobLogs(
        args.owner,
        args.repository,
        args.jobId
    );
}
List artifacts
public async listWorkflowArtifacts(
    args: GitHubListWorkflowArtifactsArgs
): Promise<GitHubArtifactsResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listWorkflowArtifacts(
        args.owner,
        args.repository,
        args.page,
        args.perPage
    );
}
9. Add validation helper

Instead of four large validation methods, use one reusable helper for pagination:

private validatePagination(
    value: Record<string, unknown>
): {
    page?: number;
    perPage?: number;
} {


    const result: {
        page?: number;
        perPage?: number;
    } = {};


    if (value.page !== undefined) {


        if (
            typeof value.page !== "number" ||
            !Number.isInteger(value.page) ||
            value.page < 1
        ) {
            throw new Error(
                "page must be a positive integer."
            );
        }


        result.page =
            value.page;
    }


    if (value.perPage !== undefined) {


        if (
            typeof value.perPage !== "number" ||
            !Number.isInteger(value.perPage) ||
            value.perPage < 1 ||
            value.perPage > 100
        ) {
            throw new Error(
                "perPage must be between 1 and 100."
            );
        }


        result.perPage =
            value.perPage;
    }


    return result;
}

Then:

private validateWorkflowJobArguments(
    args: unknown
): GitHubListWorkflowJobsArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    if (
        typeof value.runId !== "number" ||
        !Number.isInteger(value.runId) ||
        value.runId <= 0
    ) {
        throw new Error(
            "runId must be a positive integer."
        );
    }


    return {
        ...repositoryArgs,
        runId: value.runId,
        ...this.validatePagination(value)
    };
}

And:

private validateWorkflowJobIdArguments(
    args: unknown
): GitHubGetWorkflowJobArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    if (
        typeof value.jobId !== "number" ||
        !Number.isInteger(value.jobId) ||
        value.jobId <= 0
    ) {
        throw new Error(
            "jobId must be a positive integer."
        );
    }


    return {
        ...repositoryArgs,
        jobId: value.jobId
    };
}
10. github_list_workflow_jobs

Add:

private listWorkflowJobsTool(): MCPTool {


    return {
        name: "github_list_workflow_jobs",


        description:
            "List jobs belonging to a GitHub Actions workflow run, including job status, conclusion, timing, and steps.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string"
                },


                repository: {
                    type: "string"
                },


                runId: {
                    type: "number",
                    description:
                        "GitHub Actions workflow run ID."
                },


                page: {
                    type: "number"
                },


                perPage: {
                    type: "number"
                }
            },


            required: [
                "owner",
                "repository",
                "runId"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateWorkflowJobArguments(
                    args
                );


            return this.listWorkflowJobs(
                validatedArgs
            );
        }
    };
}
11. github_get_workflow_job
private getWorkflowJobTool(): MCPTool {


    return {
        name: "github_get_workflow_job",


        description:
            "Get detailed information about a GitHub Actions job and its execution steps.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string"
                },


                repository: {
                    type: "string"
                },


                jobId: {
                    type: "number",
                    description:
                        "GitHub Actions job ID."
                }
            },


            required: [
                "owner",
                "repository",
                "jobId"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateWorkflowJobIdArguments(
                    args
                );


            return this.getWorkflowJob(
                validatedArgs
            );
        }
    };
}
12. github_get_workflow_job_logs
private getWorkflowJobLogsTool(): MCPTool {


    return {
        name: "github_get_workflow_job_logs",


        description:
            "Retrieve the logs produced by a GitHub Actions job for CI/CD failure analysis.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string"
                },


                repository: {
                    type: "string"
                },


                jobId: {
                    type: "number",
                    description:
                        "GitHub Actions job ID."
                }
            },


            required: [
                "owner",
                "repository",
                "jobId"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const validatedArgs =
                this.validateWorkflowJobIdArguments(
                    args
                );


            return this.getWorkflowJobLogs(
                validatedArgs
            );
        }
    };
}
13. github_list_workflow_artifacts

Add:

private listWorkflowArtifactsTool(): MCPTool {


    return {
        name: "github_list_workflow_artifacts",


        description:
            "List artifacts generated by GitHub Actions workflows for a repository.",


        inputSchema: {
            type: "object",


            properties: {
                owner: {
                    type: "string"
                },


                repository: {
                    type: "string"
                },


                page: {
                    type: "number"
                },


                perPage: {
                    type: "number"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            const value =
                args as Record<string, unknown>;


            return this.listWorkflowArtifacts({
                ...repositoryArgs,
                ...this.validatePagination(value)
            });
        }
    };
}
14. Register the four tools

Your current getTools() has 22 tools.

Update the end of the array:

public getTools(): MCPTool[] {


    return [
        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool(),
        this.listReleasesTool(),
        this.listTagsTool(),
        this.searchRepositoriesTool(),
        this.getUserTool(),
        this.getOrganizationTool(),
        this.listContributorsTool(),
        this.listCollaboratorsTool(),
        this.getRepositoryStatisticsTool(),
        this.getRepositoryLanguagesTool(),


        this.listWorkflowsTool(),
        this.listWorkflowRunsTool(),
        this.getWorkflowRunTool(),


        this.listWorkflowJobsTool(),
        this.getWorkflowJobTool(),
        this.getWorkflowJobLogsTool(),
        this.listWorkflowArtifactsTool()
    ];
}

You now have:

26 GitHub MCP tools.

15. What your AI can now do

The important part isn't the number of tools. It's the workflow they enable.

For:

"Why did my latest CI build fail?"

Your agent can now do:

github_list_workflows
        ↓
github_list_workflow_runs
        ↓
Latest failed run
        ↓
github_list_workflow_jobs
        ↓
Find failed job
        ↓
github_get_workflow_job
        ↓
Identify failed step
        ↓
github_get_workflow_job_logs
        ↓
Analyze error

For example:

Workflow: CI
Run: #142
Status: completed
Conclusion: failure


Jobs:
 ├── Install dependencies       success
 ├── Unit tests                 success
 ├── Docker build               failure
 └── Deploy                     skipped


Failed step:
Docker build


Log:
npm ERR! ...

That's a major improvement for your AI developer assistant.

16. Artifacts

The artifact tool lets the agent discover things like:

build.zip
coverage-report
test-results
frontend-dist
backend-build

with metadata:

name
size
created
updated
expired
download URL

Don't have the agent automatically download every artifact.

Later we can add an explicit artifact-download tool with safeguards and size handling.

17. Architecture after 5.7.21

Your GitHub MCP is becoming:

                         GitHub MCP
                             │
       ┌─────────────────────┼──────────────────────┐
       │                     │                      │
       ▼                     ▼                      ▼
   Repository              Code                 History
       │                     │                      │
   Statistics             Contents              Commits
   Languages              Files                 Diff
   Branches               Search                PRs
   Tree                                         Issues
       │                                          │
       └────────────────────┬─────────────────────┘
                            ▼
                       CI / CD
                            │
                    ┌───────┴────────┐
                    ▼                ▼
                Workflows          Runs
                    │                │
                    └───────┬────────┘
                            ▼
                          Jobs
                            │
                    ┌───────┴────────┐
                    ▼                ▼
                  Logs           Artifacts
                    │                │
                    └───────┬────────┘
                            ▼
                       AI Agent

This is exactly the direction we want before moving toward agent-level reasoning.

5.7.22 — GitHub Discussions / Repository Community Tool

This milestone adds GitHub Discussions support so your AI assistant can inspect community questions, answers, and discussion activity.

We'll add 4 tools:

github_list_discussions
github_get_discussion
github_list_discussion_comments
github_list_discussion_categories

This takes your GitHub MCP layer from code/CI intelligence into repository community intelligence.

1. Add GitHub Discussion types

Open:

src/mcp/servers/github/github.service.ts

Add:

export interface GitHubDiscussion {


    user: {
        login: string;
        id: number;
        avatar_url?: string;
        html_url?: string;
    };


    state?: string;


    locked?: boolean;


    answer_chosen_at?: string | null;


    answer_chosen_by?: {
        login: string;
        id: number;
    } | null;


    created_at: string;


    updated_at: string;
}


export interface GitHubDiscussionComment {


    id: number;


    body: string;


    html_url: string;


    user: {
        login: string;
        id: number;
        avatar_url?: string;
        html_url?: string;
    };


    created_at: string;


    updated_at: string;
}


export interface GitHubDiscussionCategory {


    id: number;


    repository_id?: number;


    name: string;


    description?: string;


    emoji?: string;


    emoji_html?: string;


    slug: string;


    created_at?: string;


    updated_at?: string;
}


export interface GitHubDiscussionsResponse {


    total_count?: number;


    discussions: GitHubDiscussion[];
}


export interface GitHubDiscussionCommentsResponse {


    total_count?: number;


    comments: GitHubDiscussionComment[];
}


export interface GitHubDiscussionCategoriesResponse {


    total_count?: number;


    categories: GitHubDiscussionCategory[];
}
2. Add listDiscussions()

Inside GitHubService:

/**
 * List GitHub Discussions for a repository.
 */
public async listDiscussions(
    owner: string,
    repository: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubDiscussionsResponse> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "Discussions page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "Discussions perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/discussions?${params.toString()}`;


    const discussions =
        await this.request<GitHubDiscussion[]>(
            endpoint
        );


    return {
        discussions
    };
}
Important GitHub API note

GitHub Discussions are primarily exposed through the GraphQL API. If your current service only supports REST endpoints, this particular method may not work against GitHub's REST API.

For this milestone, I recommend not forcing a fake REST implementation.

Instead, if your GitHubService currently uses REST only, we'll introduce a GraphQL helper in the service and use GitHub's Discussions GraphQL API.

3. Add GraphQL helper

If your service does not already have one, add:

private async graphqlRequest<T>(
    query: string,
    variables: Record<string, unknown>
): Promise<T> {


    const response =
        await fetch(
            `${this.config.apiUrl}/graphql`,
            {
                method: "POST",


                headers: {
                    "Content-Type":
                        "application/json",


                    Accept:
                        "application/vnd.github+json",


                    ...(this.config.token
                        ? {
                            Authorization:
                                `Bearer ${this.config.token}`
                        }
                        : {})
                },


                body: JSON.stringify({
                    query,
                    variables
                })
            }
        );


    if (!response.ok) {


        throw new Error(
            `GitHub GraphQL request failed: ${response.status} ${response.statusText}`
        );
    }


    const result =
        await response.json() as {
            data?: T;
            errors?: Array<{
                message: string;
            }>;
        };


    if (
        result.errors &&
        result.errors.length > 0
    ) {


        throw new Error(
            result.errors
                .map(error => error.message)
                .join("; ")
        );
    }


    if (!result.data) {


        throw new Error(
            "GitHub GraphQL response did not contain data."
        );
    }


    return result.data;
}

However, if your GitHubConfig.apiUrl can be changed from:

https://api.github.com

to another endpoint, make sure the GraphQL endpoint remains:

https://api.github.com/graphql

A cleaner long-term approach is to keep REST and GraphQL URLs separate.

4. Better GraphQL configuration

I recommend extending GitHubConfig:

export interface GitHubConfig {


    apiUrl: string;


    graphqlUrl?: string;


    token?: string;
}

Then:

private getGraphQLUrl(): string {


    return (
        this.config.graphqlUrl ??
        "https://api.github.com/graphql"
    );
}

And use:

this.getGraphQLUrl()

instead of constructing /graphql from apiUrl.

5. Implement listDiscussions() using GraphQL

Replace the REST implementation with:

public async listDiscussions(
                                discussion.url,


                            category: {
                                id: Number(
                                    discussion.category.id
                                        .split("/")
                                        .pop() ?? 0
                                ),


                                name:
                                    discussion.category.name,


                                slug:
                                    discussion.category.slug,


                                emoji:
                                    discussion.category.emoji
                            },


                            user: {
                                login:
                                    discussion.author?.login ??
                                    "unknown",


                                id:
                                    discussion.author?.databaseId ??
                                    0,


                                avatar_url:
                                    discussion.author?.avatarUrl,


                                html_url:
                                    discussion.author?.url
                            },


                            locked:
                                discussion.locked,


                            answer_chosen_at:
                                discussion.answerChosenAt,


                            answer_chosen_by:
                                discussion.answerChosenBy
                                    ? {
                                        login:
                                            discussion.answerChosenBy.login,


                                        id:
                                            discussion.answerChosenBy.databaseId
                                    }
                                    : null,


                            created_at:
                                discussion.createdAt,


                            updated_at:
                                discussion.updatedAt
                        })
                    )
            };
        }


        if (
            !discussions.pageInfo.hasNextPage
        ) {


            return {
                total_count:
                    discussions.totalCount,


                discussions: []
            };
        }


        cursor =
            discussions.pageInfo.endCursor;


        currentPage++;
    }


    return {
        discussions: []
    };
}
6. Add getDiscussion()
/**


    if (
        !result.repository.discussion
    ) {
        throw new Error(
            `GitHub Discussion #${discussionNumber} was not found.`
        );
    }


    const discussion =
        result.repository.discussion;


    return {
        id: Number(
            discussion.id
                .split("/")
                .pop() ?? 0
        ),


        number:
            discussion.number,


        title:
            discussion.title,


        body:
            discussion.body,


        html_url:
            discussion.url,


        category: {
            id: Number(
                discussion.category.id
                    .split("/")
                    .pop() ?? 0
            ),


            name:
                discussion.category.name,


            slug:
                discussion.category.slug,


            emoji:
                discussion.category.emoji
        },


        user: {
            login:
                discussion.author?.login ??
                "unknown",


            id:
                discussion.author?.databaseId ??
                0,


            avatar_url:
                discussion.author?.avatarUrl,


            html_url:
                discussion.author?.url
        },


        locked:
            discussion.locked,


        answer_chosen_at:
            discussion.answerChosenAt,


        answer_chosen_by:
            discussion.answerChosenBy
                ? {
                    login:
                        discussion.answerChosenBy.login,


                    id:
                        discussion.answerChosenBy.databaseId
                }
                : null,


        created_at:
            discussion.createdAt,


        updated_at:
            discussion.updatedAt
    };
}
7. Add Discussion comments
/**
                                login: string;
                                databaseId: number;
                                avatarUrl?: string;
                                url: string;
                            } | null;
                        }>;
                    };
                } | null;
            };
        }>(
            query,
            {
                owner,
                repository,
                number: discussionNumber,
                first
            }
        );


    if (
        !result.repository.discussion
    ) {
        throw new Error(
            `GitHub Discussion #${discussionNumber} was not found.`
        );
    }


    const comments =
        result.repository.discussion.comments;


    return {
        total_count:
            comments.totalCount,


        comments:
            comments.nodes.map(
                comment => ({
                    id: Number(
                        comment.id
                            .split("/")
                            .pop() ?? 0
                    ),


                    body:
                        comment.body,


                    html_url:
                        comment.url,


                    user: {
                        login:
                            comment.author?.login ??
                            "unknown",


                        id:
                            comment.author?.databaseId ??
                            0,


                        avatar_url:
                            comment.author?.avatarUrl,


                        html_url:
                            comment.author?.url
                    },


                    created_at:
                        comment.createdAt,


                    updated_at:
                        comment.updatedAt
                })
            )
    };
}
8. Add Discussion categories
/**


    const query = `
        query(
            $owner: String!
            $repository: String!
        ) {
            repository(
                owner: $owner
                name: $repository
            ) {
                discussionCategories(
                    first: 100
                ) {
                    totalCount


                    nodes {
                        id
                        name
                        description
                        emoji
                        emojiHTML
                        slug
                        createdAt
                        updatedAt
                    }
                }
            }
        }
    `;


    const result =
        await this.graphqlRequest<{
            repository: {
                discussionCategories: {
                    totalCount: number;


                    nodes: Array<{
                        id: string;
                        name: string;
                        description: string;
                        emoji: string;
                        emojiHTML: string;
                        slug: string;
                        createdAt: string;
                        updatedAt: string;
                    }>;
                };
            };
        }>(
            query,
            {
                owner,
                repository
            }
        );


    const categories =
        result.repository
            .discussionCategories;


    return {
        total_count:
            categories.totalCount,


        categories:
            categories.nodes.map(
                category => ({
                    id: Number(
                        category.id
                            .split("/")
                            .pop() ?? 0
                    ),


                    name:
                        category.name,


                    description:
                        category.description,


                    emoji:
                        category.emoji,


                    emoji_html:
                        category.emojiHTML,


                    slug:
                        category.slug,


                    created_at:
                        category.createdAt,


                    updated_at:
                        category.updatedAt
                })
            )
    };
}
9. Add tool argument interfaces

Open:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubListDiscussionsArgs {


    owner: string;


    repository: string;


    page?: number;


    perPage?: number;
}


export interface GitHubGetDiscussionArgs {


    owner: string;


    repository: string;


    discussionNumber: number;
}


export interface GitHubListDiscussionCommentsArgs {


    owner: string;


    repository: string;


    discussionNumber: number;


    first?: number;
}


export interface GitHubListDiscussionCategoriesArgs {


    owner: string;


    repository: string;
}
10. Add tool operations

Inside GitHubTools:

public async listDiscussions(
    args: GitHubListDiscussionsArgs
): Promise<GitHubDiscussionsResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listDiscussions(
        args.owner,
        args.repository,
        args.page,
        args.perPage
    );
}
public async getDiscussion(
    args: GitHubGetDiscussionArgs
): Promise<GitHubDiscussion> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getDiscussion(
        args.owner,
        args.repository,
        args.discussionNumber
    );
}
public async listDiscussionComments(
    args: GitHubListDiscussionCommentsArgs
): Promise<GitHubDiscussionCommentsResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listDiscussionComments(
        args.owner,
        args.repository,
        args.discussionNumber,
        args.first
    );
}
public async listDiscussionCategories(
    args: GitHubListDiscussionCategoriesArgs
): Promise<GitHubDiscussionCategoriesResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listDiscussionCategories(
        args.owner,
        args.repository
    );
}
11. Add validation
private validateDiscussionNumberArguments(
    args: unknown
): GitHubGetDiscussionArgs {


    const repositoryArgs =
        this.validateRepositoryArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    if (
        typeof value.discussionNumber !== "number" ||
        !Number.isInteger(
            value.discussionNumber
        ) ||
        value.discussionNumber <= 0
    ) {
        throw new Error(
            "discussionNumber must be a positive integer."
        );
    }


    return {
        ...repositoryArgs,


        discussionNumber:
            value.discussionNumber
    };
}

For comments:

private validateDiscussionCommentsArguments(
    args: unknown
): GitHubListDiscussionCommentsArgs {


    const base =
        this.validateDiscussionNumberArguments(
            args
        );


    const value =
        args as Record<string, unknown>;


    let first:
        number | undefined;


    if (
        value.first !== undefined
    ) {


        if (
            typeof value.first !== "number" ||
            !Number.isInteger(value.first) ||
            value.first < 1 ||
            value.first > 100
        ) {
            throw new Error(
                "first must be between 1 and 100."
            );
        }


        first =
            value.first;
    }


    return {
        ...base,
        first
    };
}
12. Add MCP tool: List Discussions
private listDiscussionsTool(): MCPTool {


    return {


        name:
            "github_list_discussions",


        description:
            "List GitHub Discussions for a repository, including titles, authors, categories, and answer status.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                page: {
                    type:
                        "number"
                },


                perPage: {
                    type:
                        "number"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            const value =
                args as Record<string, unknown>;


            return this.listDiscussions({
                ...repositoryArgs,


                ...this.validatePagination(
                    value
                )
            });
        }
    };
}
13. Add MCP tool: Get Discussion
private getDiscussionTool(): MCPTool {


    return {


        name:
            "github_get_discussion",


        description:
            "Get a specific GitHub Discussion including its body, category, author, and accepted answer information.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                discussionNumber: {
                    type:
                        "number"
                }
            },


            required: [
                "owner",
                "repository",
                "discussionNumber"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            return this.getDiscussion(
                this.validateDiscussionNumberArguments(
                    args
                )
            );
        }
    };
}
14. Add MCP tool: Discussion Comments
private listDiscussionCommentsTool(): MCPTool {


    return {


        name:
            "github_list_discussion_comments",


        description:
            "List comments and community responses for a GitHub Discussion.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                discussionNumber: {
                    type:
                        "number"
                },


                first: {
                    type:
                        "number"
                }
            },


            required: [
                "owner",
                "repository",
                "discussionNumber"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            return this.listDiscussionComments(
                this.validateDiscussionCommentsArguments(
                    args
                )
            );
        }
    };
}
15. Add MCP tool: Discussion Categories
private listDiscussionCategoriesTool(): MCPTool {


    return {


        name:
            "github_list_discussion_categories",


        description:
            "List Discussion categories configured for a GitHub repository.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            return this.listDiscussionCategories(
                repositoryArgs
            );
        }
    };
}
16. Register the tools

Your current getTools() contains 26 tools.

Add the four new tools at the end:

public getTools(): MCPTool[] {


    return [


        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool(),
        this.listReleasesTool(),
        this.listTagsTool(),
        this.searchRepositoriesTool(),
        this.getUserTool(),
        this.getOrganizationTool(),
        this.listContributorsTool(),
        this.listCollaboratorsTool(),
        this.getRepositoryStatisticsTool(),
        this.getRepositoryLanguagesTool(),


        this.listWorkflowsTool(),
        this.listWorkflowRunsTool(),
        this.getWorkflowRunTool(),


        this.listWorkflowJobsTool(),
        this.getWorkflowJobTool(),
        this.getWorkflowJobLogsTool(),
        this.listWorkflowArtifactsTool(),


        this.listDiscussionsTool(),
        this.getDiscussionTool(),
        this.listDiscussionCommentsTool(),
        this.listDiscussionCategoriesTool()
    ];
}

You now have:

30 GitHub MCP tools.

17. What this enables

Your AI assistant can now answer questions such as:

"What are people asking about this project?"

github_list_discussions

"What is Discussion #42 about?"

github_get_discussion

"What solutions did people suggest?"

github_list_discussion_comments

"What categories does this repository use?"

github_list_discussion_categories

More importantly, it gives the future agent another source of contextual knowledge:

                 Repository
                     │
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
     Code          Issues        Discussions
       │             │              │
       │             │          Community
       │             │          knowledge
       └─────────────┼──────────────┘
                     ▼
                 AI Agent

This can eventually be combined with your RAG/vector layer to retrieve relevant community knowledge when answering developer questions.

18. Important implementation note

Because GitHub Discussions use GraphQL, this milestone is slightly different from most of your previous GitHub tools.

Don't create a second authentication architecture.

Keep the separation:

GitHubService
   │
   ├── REST request()
   │
   └── GraphQL graphqlRequest()

Both should use the same:

GitHubConfig.token

That keeps the service architecture clean.

19. Checkpoint

Run:

npx tsc --noEmit

Expected:

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>

If clean:

✅ 5.7.22 completed

Your GitHub MCP layer will have:
✅ 5.7.22 — GitHub Discussions / Repository Community Tool is now complete.

npx tsc --noEmit passes with 0 TypeScript errors.

Current GitHub MCP progress

You now have:

5.7.18 — Repository Statistics / Activity
5.7.19 — Repository Languages / Technology Stack
5.7.20 — GitHub Actions / Workflows
5.7.21 — Actions Jobs / Logs / Artifacts
5.7.22 — Discussions / Repository Community ✅

Your GitHub MCP layer is becoming a fairly comprehensive developer intelligence layer.

Next milestone

I recommend:

5.7.23 — GitHub Repository Security / Dependabot Tool

This would let the assistant inspect dependency/security alerts and eventually connect them with your code analysis:

GitHub Security Alert
        ↓
Dependency / Vulnerability
        ↓
Repository Code
        ↓
AI Analysis
        ↓
Suggested Fix

Run the checkpoint after 5.7.23 as usual:

npx tsc --noEmit

and we continue only after it passes.

5.7.23 — GitHub Repository Security / Dependabot Tool  
5.7.23 — GitHub Repository Security / Dependabot Tool

This milestone adds Dependabot security intelligence to your GitHub MCP layer.

The assistant will be able to inspect:

Dependabot vulnerability alerts
Individual Dependabot alert
Dependabot alert summary

This is especially valuable for your developer assistant because it can eventually combine:

GitHub Security Alert
        ↓
Affected dependency
        ↓
package.json / package-lock.json
        ↓
Code analysis
        ↓
AI explanation
        ↓
Suggested remediation
1. Add Dependabot types

In:

src/mcp/servers/github/github.service.ts

Add these interfaces near your other GitHub response models:

export interface GitHubDependabotAlert {


        references: Array<{
            url: string;
        }>;


        published_at?: string | null;


        updated_at?: string | null;


        withdrawn_at?: string | null;


        vulnerabilities: Array<{
            package: {
                ecosystem: string;
                name: string;
            };


            severity: string;


            vulnerable_version_range: string;


            first_patched_version?: {
                identifier: string;
            } | null;
        }>;
    } | null;


    security_vulnerability?: {


        package: {
            ecosystem: string;
            name: string;
        };


        severity: string;


        vulnerable_version_range: string;


        first_patched_version?: {
            identifier: string;
        } | null;
    } | null;


    url: string;


    html_url?: string;


    created_at: string;


    updated_at: string;


    dismissed_at?: string | null;


    dismissed_by?: {
        login: string;
        id: number;
    } | null;


    dismissed_reason?: string | null;


    dismissed_comment?: string | null;


    fixed_at?: string | null;


    auto_dismissed_at?: string | null;
}


export interface GitHubDependabotAlertsResponse {


    total_count: number;


    alerts: GitHubDependabotAlert[];
}
2. Add listDependabotAlerts()

Inside GitHubService:

/**
 * List Dependabot security alerts for a repository.
 */
public async listDependabotAlerts(
    owner: string,
    repository: string,
    state?: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubDependabotAlertsResponse> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "Dependabot alerts page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "Dependabot alerts perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    if (state?.trim()) {


        params.set(
            "state",
            state.trim()
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/dependabot/alerts?${params.toString()}`;


    const alerts =
        await this.request<GitHubDependabotAlert[]>(
            endpoint
        );


    return {
        total_count:
            alerts.length,


        alerts
    };
}
Important

If your existing GitHubService.request() already supports response headers and pagination metadata, we can later improve total_count to use GitHub's actual pagination count.

For the initial MCP tool, returning the number of retrieved alerts is acceptable.

3. Add getDependabotAlert()
/**
 * Get a specific Dependabot security alert.
 */
public async getDependabotAlert(
    owner: string,
    repository: string,
    alertNumber: number
): Promise<GitHubDependabotAlert> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(alertNumber) ||
        alertNumber <= 0
    ) {
        throw new Error(
            "Dependabot alert number must be a positive integer."
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/dependabot/alerts/${alertNumber}`;


    return this.request<GitHubDependabotAlert>(
        endpoint
    );
}
4. Add Dependabot summary

This is useful for the AI because it doesn't need to process every alert just to answer:

"Is this repository currently vulnerable?"

Add:

/**
 * Get a summarized view of Dependabot alerts.
 */
public async getDependabotSummary(
    owner: string,
    repository: string
): Promise<{
    total: number;
    open: number;
    dismissed: number;
    fixed: number;
    bySeverity: Record<string, number>;
    byEcosystem: Record<string, number>;
}> {


    const response =
        await this.listDependabotAlerts(
            owner,
            repository,
            undefined,
            1,
            100
        );


    const bySeverity:
        Record<string, number> = {};


    const byEcosystem:
        Record<string, number> = {};


    let open = 0;
    let dismissed = 0;
    let fixed = 0;


    for (
        const alert of response.alerts
    ) {


        const severity =
            alert.security_vulnerability?.severity ??
            alert.security_advisory?.severity ??
            "unknown";


        bySeverity[severity] =
            (bySeverity[severity] ?? 0) + 1;


        const ecosystem =
            alert.dependency.package.ecosystem;


        byEcosystem[ecosystem] =
            (byEcosystem[ecosystem] ?? 0) + 1;


        switch (alert.state) {


            case "open":
                open++;
                break;


            case "dismissed":
                dismissed++;
                break;


            case "fixed":
                fixed++;
                break;
        }
    }


    return {
        total:
            response.alerts.length,


        open,


        dismissed,


        fixed,


        bySeverity,


        byEcosystem
    };
}
5. Add tool argument types

Open:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubListDependabotAlertsArgs {


    owner: string;


    repository: string;


    state?: string;


    page?: number;


    perPage?: number;
}


export interface GitHubGetDependabotAlertArgs {


    owner: string;


    repository: string;


    alertNumber: number;
}


export interface GitHubDependabotSummaryArgs {


    owner: string;


    repository: string;
}
6. Add service wrappers to GitHubTools

Inside GitHubTools:

public async listDependabotAlerts(
    args: GitHubListDependabotAlertsArgs
): Promise<GitHubDependabotAlertsResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listDependabotAlerts(
        args.owner,
        args.repository,
        args.state,
        args.page,
        args.perPage
    );
}

Add:

public async getDependabotAlert(
    args: GitHubGetDependabotAlertArgs
): Promise<GitHubDependabotAlert> {


    this.validateRepositoryArguments(
        args
    );


    if (
        !Number.isInteger(args.alertNumber) ||
        args.alertNumber <= 0
    ) {
        throw new Error(
            "alertNumber must be a positive integer."
        );
    }


    return this.githubService.getDependabotAlert(
        args.owner,
        args.repository,
        args.alertNumber
    );
}

And:

public async getDependabotSummary(
    args: GitHubDependabotSummaryArgs
) {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getDependabotSummary(
        args.owner,
        args.repository
    );
}
7. Add MCP tool — List Dependabot Alerts

Inside GitHubTools:

private listDependabotAlertsTool(): MCPTool {


    return {


        name:
            "github_list_dependabot_alerts",


        description:
            "List Dependabot security vulnerability alerts for a GitHub repository.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                state: {
                    type:
                        "string",


                    description:
                        "Alert state such as open, dismissed, or fixed."
                },


                page: {
                    type:
                        "number"
                },


                perPage: {
                    type:
                        "number"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            const value =
                args as Record<string, unknown>;


            return this.listDependabotAlerts({
                ...repositoryArgs,


                state:
                    typeof value.state === "string"
                        ? value.state
                        : undefined,


                page:
                    typeof value.page === "number"
                        ? value.page
                        : undefined,


                perPage:
                    typeof value.perPage === "number"
                        ? value.perPage
                        : undefined
            });
        }
    };
}
8. Add MCP tool — Get Dependabot Alert
private getDependabotAlertTool(): MCPTool {


    return {


        name:
            "github_get_dependabot_alert",


        description:
            "Get detailed information about a specific Dependabot security alert.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                alertNumber: {
                    type:
                        "number"
                }
            },


            required: [
                "owner",
                "repository",
                "alertNumber"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            const value =
                args as Record<string, unknown>;


            if (
                typeof value.alertNumber !== "number" ||
                !Number.isInteger(
                    value.alertNumber
                ) ||
                value.alertNumber <= 0
            ) {
                throw new Error(
                    "alertNumber must be a positive integer."
                );
            }


            return this.getDependabotAlert({
                ...repositoryArgs,


                alertNumber:
                    value.alertNumber
            });
        }
    };
}
9. Add MCP tool — Dependabot Summary
private getDependabotSummaryTool(): MCPTool {


    return {


        name:
            "github_get_dependabot_summary",


        description:
            "Get a security summary of Dependabot alerts grouped by state, severity, and package ecosystem.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            return this.getDependabotSummary(
                repositoryArgs
            );
        }
    };
}
10. Register the tools

At the bottom of your existing getTools() add:

this.listDependabotAlertsTool(),
this.getDependabotAlertTool(),
this.getDependabotSummaryTool()

So the end of the method becomes:

public getTools(): MCPTool[] {


    return [


        this.getRepositoryTool(),
        this.getContentsTool(),
        this.listBranchesTool(),
        this.readFileTool(),
        this.searchCodeTool(),
        this.listIssuesTool(),
        this.listPullRequestsTool(),
        this.listCommitsTool(),
        this.compareCommitsTool(),
        this.getTreeTool(),
        this.listReleasesTool(),
        this.listTagsTool(),
        this.searchRepositoriesTool(),
        this.getUserTool(),
        this.getOrganizationTool(),
        this.listContributorsTool(),
        this.listCollaboratorsTool(),
        this.getRepositoryStatisticsTool(),
        this.getRepositoryLanguagesTool(),


        this.listWorkflowsTool(),
        this.listWorkflowRunsTool(),
        this.getWorkflowRunTool(),


        this.listWorkflowJobsTool(),
        this.getWorkflowJobTool(),
        this.getWorkflowJobLogsTool(),
        this.listWorkflowArtifactsTool(),


        this.listDiscussionsTool(),
        this.getDiscussionTool(),
        this.listDiscussionCommentsTool(),
        this.listDiscussionCategoriesTool(),


        this.listDependabotAlertsTool(),
        this.getDependabotAlertTool(),
        this.getDependabotSummaryTool()
    ];
}
11. What your AI can now do

The MCP client can ask:

Security overview
github_get_dependabot_summary

Example conceptual result:

{
  "total": 7,
  "open": 4,
  "dismissed": 1,
  "fixed": 2,
  "bySeverity": {
    "critical": 1,
    "high": 2,
    "moderate": 3,
    "low": 1
  },
  "byEcosystem": {
    "npm": 7
  }
}
Find vulnerabilities
github_list_dependabot_alerts
Investigate one vulnerability
github_get_dependabot_alert

The AI can then reason:

Dependabot
   │
   ├── Package
   │
   ├── Vulnerable version
   │
   ├── Patched version
   │
   ├── CVE / GHSA
   │
   └── Manifest
          │
          ▼
      package.json
          │
          ▼
     Code Analysis
          │
          ▼
      AI Fix Plan
12. Important GitHub permission consideration

Dependabot alerts require appropriate GitHub permissions/token access. If your token doesn't have access to security alerts, the API can return an authorization error.

That's actually useful for your MCP architecture because the service should return the GitHub error rather than silently treating the repository as having zero vulnerabilities.

13. Checkpoint

Now run:

npx tsc --noEmit

Expected:

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend>
Milestone status

After the checkpoint passes:

5.7.23 — GitHub Repository Security / Dependabot Tool ✅

Your GitHub MCP layer will have 33 tools.

The next useful milestone would be 5.7.24 — GitHub Code Scanning / CodeQL Tool, which is even more valuable for your project because it can connect GitHub's static-analysis findings with your existing Project Analyzer + Developer Tool Framework.

5.7.24 — GitHub Code Scanning / CodeQL Tool

This milestone adds GitHub Code Scanning / CodeQL security findings to your GitHub MCP server.

It complements 5.7.23:

5.7.23 Dependabot
       ↓
Dependency vulnerabilities


5.7.24 CodeQL / Code Scanning
       ↓
Source-code vulnerabilities

For your AI Developer Assistant, this is an important step toward AI-powered security analysis.

1. Add the Code Scanning types

In:

src/mcp/servers/github/github.service.ts

Add:

export interface GitHubCodeScanningAlert {


    number: number;


    created_at: string;


    updated_at: string;


    url: string;


    html_url?: string;


    state: string;


    fixed_at?: string | null;


    dismissed_by?: {
        login: string;
        id: number;
    } | null;


    dismissed_at?: string | null;


    dismissed_reason?: string | null;


    dismissed_comment?: string | null;


    rule: {
        id: string;


        severity?: string | null;


        description: string;


        name?: string | null;


        security_severity_level?: string | null;


        help?: string | null;


        help_uri?: string | null;


        tags?: string[];
    };


    tool: {
        name: string;


        version?: string | null;


        guid?: string | null;
    };


    most_recent_instance?: {


        ref: string;


        analysis_key?: string | null;


        environment?: string | null;


        category?: string | null;


        commit_sha: string;


        location: {


            path: string;


            start_line: number;


            end_line?: number;


            start_column?: number | null;


            end_column?: number | null;
        };


        message?: {
            text: string;
        };


        state?: string | null;


        classifications?: string[];
    } | null;
}


export interface GitHubCodeScanningAlertsResponse {


    total_count: number;


    alerts: GitHubCodeScanningAlert[];
}
2. Add listCodeScanningAlerts()

Inside GitHubService:

/**
 * List Code Scanning / CodeQL alerts
 * for a GitHub repository.
 */
public async listCodeScanningAlerts(
    owner: string,
    repository: string,
    state?: string,
    ref?: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubCodeScanningAlertsResponse> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "Code scanning page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "Code scanning perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    if (state?.trim()) {


        params.set(
            "state",
            state.trim()
        );
    }


    if (ref?.trim()) {


        params.set(
            "ref",
            ref.trim()
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/code-scanning/alerts?${params.toString()}`;


    const alerts =
        await this.request<GitHubCodeScanningAlert[]>(
            endpoint
        );


    return {
        total_count:
            alerts.length,


        alerts
    };
}
3. Add getCodeScanningAlert()
/**
 * Get a specific Code Scanning alert.
 */
public async getCodeScanningAlert(
    owner: string,
    repository: string,
    alertNumber: number
): Promise<GitHubCodeScanningAlert> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(alertNumber) ||
        alertNumber <= 0
    ) {
        throw new Error(
            "Code scanning alert number must be a positive integer."
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/code-scanning/alerts/${alertNumber}`;


    return this.request<GitHubCodeScanningAlert>(
        endpoint
    );
}
4. Add CodeQL/security summary

This gives your AI a compact security overview without requiring it to consume every alert.

/**
 * Get a summarized view of Code Scanning alerts.
 */
public async getCodeScanningSummary(
    owner: string,
    repository: string
): Promise<{
    total: number;
    open: number;
    dismissed: number;
    fixed: number;
    bySeverity: Record<string, number>;
    byTool: Record<string, number>;
    byRule: Record<string, number>;
}> {


    const response =
        await this.listCodeScanningAlerts(
            owner,
            repository,
            undefined,
            undefined,
            1,
            100
        );


    const bySeverity:
        Record<string, number> = {};


    const byTool:
        Record<string, number> = {};


    const byRule:
        Record<string, number> = {};


    let open = 0;
    let dismissed = 0;
    let fixed = 0;


    for (
        const alert of response.alerts
    ) {


        const severity =
            alert.rule.security_severity_level ??
            alert.rule.severity ??
            "unknown";


        bySeverity[severity] =
            (bySeverity[severity] ?? 0) + 1;


        const tool =
            alert.tool.name;


        byTool[tool] =
            (byTool[tool] ?? 0) + 1;


        const rule =
            alert.rule.id;


        byRule[rule] =
            (byRule[rule] ?? 0) + 1;


        switch (alert.state) {


            case "open":
                open++;
                break;


            case "dismissed":
                dismissed++;
                break;


            case "fixed":
                fixed++;
                break;
        }
    }


    return {
        total:
            response.alerts.length,


        open,


        dismissed,


        fixed,


        bySeverity,


        byTool,


        byRule
    };
}
5. Add argument types to github.tools.ts
export interface GitHubListCodeScanningAlertsArgs {


    owner: string;


    repository: string;


    state?: string;


    ref?: string;


    page?: number;


    perPage?: number;
}


export interface GitHubGetCodeScanningAlertArgs {


    owner: string;


    repository: string;


    alertNumber: number;
}


export interface GitHubCodeScanningSummaryArgs {


    owner: string;


    repository: string;
}
6. Add service wrappers to GitHubTools
public async listCodeScanningAlerts(
    args: GitHubListCodeScanningAlertsArgs
): Promise<GitHubCodeScanningAlertsResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listCodeScanningAlerts(
        args.owner,
        args.repository,
        args.state,
        args.ref,
        args.page,
        args.perPage
    );
}
public async getCodeScanningAlert(
    args: GitHubGetCodeScanningAlertArgs
): Promise<GitHubCodeScanningAlert> {


    this.validateRepositoryArguments(
        args
    );


    if (
        !Number.isInteger(args.alertNumber) ||
        args.alertNumber <= 0
    ) {
        throw new Error(
            "alertNumber must be a positive integer."
        );
    }


    return this.githubService.getCodeScanningAlert(
        args.owner,
        args.repository,
        args.alertNumber
    );
}
public async getCodeScanningSummary(
    args: GitHubCodeScanningSummaryArgs
) {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getCodeScanningSummary(
        args.owner,
        args.repository
    );
}
7. Add the MCP list-alerts tool

Inside GitHubTools:

private listCodeScanningAlertsTool(): MCPTool {
            "github_list_code_scanning_alerts",


        description:
            "List GitHub Code Scanning and CodeQL security alerts for a repository.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                state: {
                    type:
                        "string",


                    description:
                        "Alert state such as open, dismissed, or fixed."
                },


                ref: {
                    type:
                        "string",


                    description:
                        "Git reference such as a branch or commit."
                },


                page: {
                    type:
                        "number"
                },


                perPage: {
                    type:
                        "number"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            const value =
                args as Record<string, unknown>;


            return this.listCodeScanningAlerts({
                ...repositoryArgs,


                state:
                    typeof value.state === "string"
                        ? value.state
                        : undefined,


                ref:
                    typeof value.ref === "string"
                        ? value.ref
                        : undefined,


                page:
                    typeof value.page === "number"
                        ? value.page
                        : undefined,


                perPage:
                    typeof value.perPage === "number"
                        ? value.perPage
                        : undefined
            });
        }
    };
}
8. Add the individual alert tool
private getCodeScanningAlertTool(): MCPTool {


    return {


        name:
            "github_get_code_scanning_alert",


        description:
            "Get detailed information about a specific GitHub Code Scanning or CodeQL security alert.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                alertNumber: {
                    type:
                        "number"
                }
            },


            required: [
                "owner",
                "repository",
                "alertNumber"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            const value =
                args as Record<string, unknown>;


            if (
                typeof value.alertNumber !== "number" ||
                !Number.isInteger(
                    value.alertNumber
                ) ||
                value.alertNumber <= 0
            ) {
                throw new Error(
                    "alertNumber must be a positive integer."
                );
            }


            return this.getCodeScanningAlert({
                ...repositoryArgs,


                alertNumber:
                    value.alertNumber
            });
        }
    };
}
9. Add the summary tool
private getCodeScanningSummaryTool(): MCPTool {


    return {


        name:
            "github_get_code_scanning_summary",


        description:
            "Get a security summary of GitHub Code Scanning and CodeQL alerts grouped by state, severity, tool, and rule.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            return this.getCodeScanningSummary(
                repositoryArgs
            );
        }
    };
}
10. Register the tools

Add these to getTools():

this.listCodeScanningAlertsTool(),
this.getCodeScanningAlertTool(),
this.getCodeScanningSummaryTool()

For example, after the Dependabot tools:

this.listDependabotAlertsTool(),
this.getDependabotAlertTool(),
this.getDependabotSummaryTool(),


this.listCodeScanningAlertsTool(),
this.getCodeScanningAlertTool(),
this.getCodeScanningSummaryTool()
What 5.7.24 gives your AI

Your assistant can now ask GitHub:

github_get_code_scanning_summary

and get something conceptually like:

{
  "total": 12,
  "open": 7,
  "dismissed": 2,
  "fixed": 3,
  "bySeverity": {
    "critical": 1,
    "high": 4,
    "medium": 5,
    "low": 2
  },
  "byTool": {
    "CodeQL": 12
  }
}

Then it can investigate a specific finding:

github_get_code_scanning_alert

which gives it the important information:

Rule
Severity
Description
File
Line
Column
Commit
Tool
Security classification

That is much more useful to your project than simply returning a raw GitHub alert.

One architectural benefit

You are now approaching a useful security-analysis pipeline:

             GitHub MCP
                 │
       ┌─────────┴─────────┐
       │                   │
   Dependabot            CodeQL
       │                   │
Dependency bugs       Code bugs
       │                   │
       └─────────┬─────────┘
                 ↓
        Developer Tool Layer
                 ↓
          Project Analyzer
                 ↓
             AI Agent
                 ↓
        Explain / Prioritize
                 ↓
          Suggest Fix
Checkpoint

Run:

npx tsc --noEmit

If it passes with no output, 5.7.24 is complete. If TypeScript reports errors, send the exact output and we'll fix those before moving to 5.7.25.
5.7.25 — GitHub Secret Scanning / Security Tool

This is the right next milestone after Dependabot (5.7.23) and CodeQL (5.7.24).

It adds secret-leak detection to your GitHub MCP layer:

5.7.23 Dependabot
        ↓
Dependency vulnerabilities


5.7.24 CodeQL
        ↓
Code vulnerabilities


5.7.25 Secret Scanning
        ↓
Leaked credentials / secrets
Scope for 5.7.25

We'll implement 3 MCP tools:

Tool	Purpose
github_list_secret_scanning_alerts	List secret-scanning alerts
github_get_secret_scanning_alert	Inspect one alert
github_get_secret_scanning_summary	Security overview

The resulting AI workflow becomes:

GitHub Repository
       │
       ├── Dependabot
       ├── CodeQL
       └── Secret Scanning
              │
              ▼
       Security Intelligence
              │
              ▼
       AI Developer Assistant
              │
       ┌──────┴──────┐
       ↓             ↓
   Explain        Prioritize
       │             │
       └──────┬──────┘
              ↓
         Remediation
Important implementation detail

GitHub's Secret Scanning API has different alert information from Dependabot and Code Scanning, so don't reuse the 5.7.23/5.7.24 interfaces blindly. We'll create dedicated GitHubSecretScanningAlert types and service methods.

For this milestone, we'll also keep the implementation read-only. That is safer for your MCP architecture; remediation actions can be introduced later with explicit authorization.

Checkpoint

After implementing 5.7.25, continue using your established checkpoint:

npx tsc --noEmit

The expected result is no output and a successful exit.

5.7.25 → Secret Scanning / Security Intelligence is now the next milestone.

Scope for 5.7.25

We'll implement 3 MCP tools:

ToolPurpose	
github_list_secret_scanning_alerts	List secret-scanning alerts
github_get_secret_scanning_alert	Inspect one alert
github_get_secret_scanning_summary	Security overview

Yes. Let's implement 5.7.25 — GitHub Secret Scanning / Security Tool with exactly those 3 MCP tools.

5.7.25.1 — Add Secret Scanning types

In:

src/mcp/servers/github/github.service.ts

Add these interfaces near your other GitHub response models:

export interface GitHubSecretScanningAlert {


    number: number;


    created_at: string;


    updated_at: string;


    url: string;


    html_url?: string;


    state: string;


    secret_type: string;


    secret_type_display_name?: string;


    secret?: string;


    resolution?: string | null;


    resolved_by?: {
        login: string;
        id: number;
    } | null;


    resolved_at?: string | null;


    resolution_comment?: string | null;


    push_protection_bypassed?: boolean;


    push_protection_bypassed_by?: {
        login: string;
        id: number;
    } | null;


    push_protection_bypassed_at?: string | null;


    locations_url?: string;
}


export interface GitHubSecretScanningAlertsResponse {


    total_count: number;


    alerts: GitHubSecretScanningAlert[];
}
Security note

Notice that secret is optional. Your MCP layer should not unnecessarily expose the actual secret value to the LLM.

For the initial implementation, we will sanitize it before returning it.

5.7.25.2 — Add listSecretScanningAlerts()

Inside GitHubService:

/**
 * List secret scanning alerts for a GitHub repository.
 */
public async listSecretScanningAlerts(
    owner: string,
    repository: string,
    state?: string,
    page: number = 1,
    perPage: number = 30
): Promise<GitHubSecretScanningAlertsResponse> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(page) ||
        page < 1
    ) {
        throw new Error(
            "Secret scanning page must be a positive integer."
        );
    }


    if (
        !Number.isInteger(perPage) ||
        perPage < 1 ||
        perPage > 100
    ) {
        throw new Error(
            "Secret scanning perPage must be between 1 and 100."
        );
    }


    const params =
        new URLSearchParams();


    params.set(
        "page",
        String(page)
    );


    params.set(
        "per_page",
        String(perPage)
    );


    if (state?.trim()) {


        params.set(
            "state",
            state.trim()
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/secret-scanning/alerts?${params.toString()}`;


    const alerts =
        await this.request<GitHubSecretScanningAlert[]>(
            endpoint
        );


    return {
        total_count:
            alerts.length,


        alerts:
            alerts.map(
                alert => ({
                    ...alert,


                    /**
                     * Never expose the actual secret
                     * to the MCP consumer / LLM.
                     */
                    secret: undefined
                })
            )
    };
}
5.7.25.3 — Add getSecretScanningAlert()
/**
 * Get a specific secret scanning alert.
 */
public async getSecretScanningAlert(
    owner: string,
    repository: string,
    alertNumber: number
): Promise<GitHubSecretScanningAlert> {


    if (!owner?.trim()) {
        throw new Error(
            "GitHub repository owner is required."
        );
    }


    if (!repository?.trim()) {
        throw new Error(
            "GitHub repository name is required."
        );
    }


    if (
        !Number.isInteger(alertNumber) ||
        alertNumber <= 0
    ) {
        throw new Error(
            "Secret scanning alert number must be a positive integer."
        );
    }


    const endpoint =
        `/repos/${encodeURIComponent(owner.trim())}` +
        `/${encodeURIComponent(repository.trim())}` +
        `/secret-scanning/alerts/${alertNumber}`;


    const alert =
        await this.request<GitHubSecretScanningAlert>(
            endpoint
        );


    return {
        ...alert,


        /**
         * Never return the detected secret itself.
         */
        secret: undefined
    };
}
5.7.25.4 — Add Security Summary
/**
 * Get a summarized view of secret scanning alerts.
 */
public async getSecretScanningSummary(
    owner: string,
    repository: string
): Promise<{
    total: number;
    open: number;
    resolved: number;
    byType: Record<string, number>;
    byResolution: Record<string, number>;
}> {


    const response =
        await this.listSecretScanningAlerts(
            owner,
            repository,
            undefined,
            1,
            100
        );


    const byType:
        Record<string, number> = {};


    const byResolution:
        Record<string, number> = {};


    let open = 0;
    let resolved = 0;


    for (
        const alert of response.alerts
    ) {


        const type =
            alert.secret_type_display_name ??
            alert.secret_type ??
            "unknown";


        byType[type] =
            (byType[type] ?? 0) + 1;


        if (
            alert.state === "open"
        ) {


            open++;


        } else if (
            alert.state === "resolved"
        ) {


            resolved++;
        }


        if (
            alert.resolution
        ) {


            byResolution[
                alert.resolution
            ] =
                (
                    byResolution[
                        alert.resolution
                    ] ?? 0
                ) + 1;
        }
    }


    return {


        total:
            response.alerts.length,


        open,


        resolved,


        byType,


        byResolution
    };
}
5.7.25.5 — Add tool argument types

In:

src/mcp/servers/github/github.tools.ts

Add:

export interface GitHubListSecretScanningAlertsArgs {


    owner: string;


    repository: string;


    state?: string;


    page?: number;


    perPage?: number;
}


export interface GitHubGetSecretScanningAlertArgs {


    owner: string;


    repository: string;


    alertNumber: number;
}


export interface GitHubSecretScanningSummaryArgs {


    owner: string;


    repository: string;
}
5.7.25.6 — Add service wrappers

Inside GitHubTools:

public async listSecretScanningAlerts(
    args: GitHubListSecretScanningAlertsArgs
): Promise<GitHubSecretScanningAlertsResponse> {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.listSecretScanningAlerts(
        args.owner,
        args.repository,
        args.state,
        args.page,
        args.perPage
    );
}
public async getSecretScanningAlert(
    args: GitHubGetSecretScanningAlertArgs
): Promise<GitHubSecretScanningAlert> {


    this.validateRepositoryArguments(
        args
    );


    if (
        !Number.isInteger(args.alertNumber) ||
        args.alertNumber <= 0
    ) {
        throw new Error(
            "alertNumber must be a positive integer."
        );
    }


    return this.githubService.getSecretScanningAlert(
        args.owner,
        args.repository,
        args.alertNumber
    );
}
public async getSecretScanningSummary(
    args: GitHubSecretScanningSummaryArgs
) {


    this.validateRepositoryArguments(
        args
    );


    return this.githubService.getSecretScanningSummary(
        args.owner,
        args.repository
    );
}
5.7.25.7 — List Secret Scanning Alerts MCP Tool
private listSecretScanningAlertsTool(): MCPTool {


    return {


        name:
            "github_list_secret_scanning_alerts",


        description:
            "List GitHub secret scanning alerts for a repository without exposing detected secret values.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                state: {
                    type:
                        "string",


                    description:
                        "Alert state such as open or resolved."
                },


                page: {
                    type:
                        "number"
                },


                perPage: {
                    type:
                        "number"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            const value =
                args as Record<string, unknown>;


            return this.listSecretScanningAlerts({


                ...repositoryArgs,


                state:
                    typeof value.state === "string"
                        ? value.state
                        : undefined,


                page:
                    typeof value.page === "number"
                        ? value.page
                        : undefined,


                perPage:
                    typeof value.perPage === "number"
                        ? value.perPage
                        : undefined
            });
        }
    };
}
5.7.25.8 — Get Secret Scanning Alert MCP Tool
private getSecretScanningAlertTool(): MCPTool {


    return {


        name:
            "github_get_secret_scanning_alert",


        description:
            "Get detailed metadata about a GitHub secret scanning alert without returning the detected secret.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
                },


                alertNumber: {
                    type:
                        "number"
                }
            },


            required: [
                "owner",
                "repository",
                "alertNumber"
            ]
        },


        execute: async (
            args?: Record<string, unknown>
        ) => {


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            const value =
                args as Record<string, unknown>;


            if (
                typeof value.alertNumber !== "number" ||
                !Number.isInteger(
                    value.alertNumber
                ) ||
                value.alertNumber <= 0
            ) {
                throw new Error(
                    "alertNumber must be a positive integer."
                );
            }


            return this.getSecretScanningAlert({


                ...repositoryArgs,


                alertNumber:
                    value.alertNumber
            });
        }
    };
}
5.7.25.9 — Secret Scanning Summary MCP Tool
private getSecretScanningSummaryTool(): MCPTool {


    return {


        name:
            "github_get_secret_scanning_summary",


        description:
            "Get a security summary of GitHub secret scanning alerts grouped by secret type and resolution.",


        inputSchema: {


            type:
                "object",


            properties: {


                owner: {
                    type:
                        "string"
                },


                repository: {
                    type:
                        "string"
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


            const repositoryArgs =
                this.validateRepositoryArguments(
                    args
                );


            return this.getSecretScanningSummary(
                repositoryArgs
            );
        }
    };
}
5.7.25.10 — Register the 3 tools

In your existing getTools():

this.listDependabotAlertsTool(),
this.getDependabotAlertTool(),
this.getDependabotSummaryTool(),


this.listCodeScanningAlertsTool(),
this.getCodeScanningAlertTool(),
this.getCodeScanningSummaryTool(),


this.listSecretScanningAlertsTool(),
this.getSecretScanningAlertTool(),
this.getSecretScanningSummaryTool()
Result

Your GitHub security MCP layer now has:

                    GitHub Security
                          │
          ┌───────────────┼───────────────┐
          ↓               ↓               ↓
      Dependabot       CodeQL        Secret Scanning
          │               │               │
      Dependencies        Code          Secrets
          │               │               │
          └───────────────┼───────────────┘
                          ↓
                  AI Developer Assistant

And specifically these three new tools:

github_list_secret_scanning_alerts
github_get_secret_scanning_alert
github_get_secret_scanning_summary
⚠️ Important security design choice

Do not pass the actual detected secret into the LLM. Even if GitHub/API permissions allow access to it, your MCP server should sanitize it at the service boundary. This is an important architectural decision for the security of your eventual product.

Now run your standard checkpoint:

npx tsc --noEmit

If it passes, 5.7.25 is complete and we can move to 5.7.26.
