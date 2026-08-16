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

Those come later.

The immediate objective is simply:

GitHub MCP structure
        ↓
TypeScript contracts
        ↓
MCPServer implementation
        ↓
Service/Tools separation
        ↓
Singleton + factory
9. Now run the checkpoint

From:

backend/

run:

npx tsc --noEmit
Expected
No TypeScript errors.

If it passes, 5.7.1 is complete.

If it produces errors, don't move to 5.7.2 yet. Send me the complete npx tsc --noEmit output and we'll fix it against the actual project types.

The next step after a clean checkpoint will be:

5.7.2 — GitHub Configuration & Authentication

where we'll establish the configuration cleanly before making the first actual GitHub API call.

npx tsc --noEmit
PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Yes — 5.7.1 is now the current coding step, and you've reached the TypeScript checkpoint:

npx tsc --noEmit

from:

backend>

If that command completed without errors, then 5.7.1 is complete.

Current Chapter 5 position
5.6 Project Intelligence & Developer Tool Framework ✅
        ↓
5.7 GitHub MCP
        ↓
   5.7.1 GitHub MCP Structure ✅
        ↓
   5.7.2 GitHub MCP Service
        ↓
   5.7.3 GitHub Tools
        ↓
   5.7.4 GitHub MCP Integration
        ↓
   5.7.5 Testing
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
Next coding task: 5.7.2 — GitHub MCP Service

Now we should not jump to GitHub tools yet.

The next step should be to implement the service layer:

github/
├── github.server.ts
├── github.service.ts       ← NEXT
├── github.tools.ts
├── github.constants.ts
├── github.types.ts
└── index.ts

The service should establish the GitHub integration boundary and follow the same architecture/conventions already established by your Filesystem MCP and Developer Tool framework.

After implementing 5.7.2, we again run:

npx tsc --noEmit

and only proceed to 5.7.3 if it passes.

So our next coding session starts at: 5.7.2 — Implement GitHubService.