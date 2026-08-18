Chapter 5.8 — Git MCP Server
🎯 Objective

Build a reusable Git MCP Server that allows Zeba AI to inspect and analyze a local Git repository through MCP.

The architecture will be:

                    Zeba AI
                       │
                       ▼
                  MCP Client
                       │
                       ▼
                 MCP Gateway
                       │
                       ▼
                  Git MCP Server
                       │
                       ▼
                 GitService
                       │
                       ▼
              Local Git Repository

The important architectural rule is:

Git MCP should expose Git capabilities. Higher-level intelligence should remain in the Developer Tool Framework.

🗺️ 5.8 Roadmap

I recommend breaking 5.8 into 12 implementation milestones:

Milestone	Name	Objective
5.8.1	Git MCP Architecture	Define Git MCP structure and boundaries
5.8.2	Git Configuration & Types	Create Git configuration and domain models
5.8.3	Git Service Foundation	Build reusable Git command/service abstraction
5.8.4	Repository Detection	Detect and validate Git repositories
5.8.5	Git Status Tool	Expose repository status
5.8.6	Branch Tools	List and inspect branches
5.8.7	Commit & Log Tools	Read commits and history
5.8.8	Diff Tools	Inspect working-tree and commit differences
5.8.9	Blame & File History	Inspect file-level Git history
5.8.10	Tags & Remote Tools	Inspect tags and remotes
5.8.11	MCP Integration	Register Git MCP with Gateway
5.8.12	Validation & E2E	Test complete Git MCP workflow
5.8.1 — Git MCP Architecture
Goal

Define the architecture before writing Git-specific tools.

MCP Gateway
      │
      ▼
Git MCP Server
      │
      ▼
GitService
      │
      ▼
Git CLI / Git Repository
Responsibilities

Git MCP Server:

MCP communication
Tool registration
Tool schemas
Tool execution

GitService:

Git command execution
Git repository validation
Output parsing
Error handling

Developer Tools:

Higher-level project intelligence
Deliverables
 Git MCP architecture
 Module boundaries
 Tool naming convention
 Error strategy
 Repository path strategy
5.8.2 — Git Configuration & Types

Create Git-specific configuration and models.

Potential structure:

src/mcp/servers/git/


├── git.server.ts
├── git.service.ts
├── git.tools.ts
├── git.types.ts
├── git.constants.ts
└── index.ts

Potential configuration:

export interface GitConfig {
    gitPath?: string;
    timeout?: number;
}

Potential models:

GitRepository
GitStatus
GitBranch
GitCommit
GitDiff
GitTag
GitRemote
GitBlame
Deliverables
 GitConfig
 Git types
 Git constants
 Git MCP module structure
Checkpoint
npx tsc --noEmit
5.8.3 — Git Service Foundation

This is one of the most important steps.

Create:

GitService

The service should provide a controlled abstraction over Git.

Conceptually:

GitService
│
├── execute()
├── isRepository()
├── getStatus()
├── getBranches()
├── getLog()
├── getDiff()
├── getCommit()
├── getBlame()
├── getTags()
└── getRemotes()

For example:

GitService
     ↓
child_process / Git library
     ↓
git command
     ↓
stdout/stderr
     ↓
structured result
Important

Do not allow arbitrary shell commands to come from the AI.

Bad:

execute(commandFromAI)

Better:

getStatus()
getBranches()
getLog()
getDiff()

This gives you a much safer tool boundary.

Deliverables
 GitService
 Git command abstraction
 Timeout handling
 Error handling
 Output parsing
Checkpoint
npx tsc --noEmit
5.8.4 — Repository Detection

Before executing Git operations, determine whether the workspace is a Git repository.

Example:

workspacePath
      ↓
GitService
      ↓
Is Git Repository?
      │
   ┌──┴──┐
   │     │
  Yes    No
   │     │
   ▼     ▼
Continue Error

Potential capabilities:

isRepository()
getRepositoryRoot()
getCurrentBranch()

Example result:

{
  "isRepository": true,
  "root": "C:/Projects/zeba-ai",
  "branch": "main"
}
Deliverables
 Git repository detection
 Repository root detection
 Current branch detection
 Invalid repository handling
5.8.5 — Git Status Tool

Create:

git_status

Purpose:

Understand the current working-tree state.

Example:

git_status
      ↓
GitService
      ↓
git status
      ↓
Structured GitStatus

Result:

{
  "branch": "main",
  "ahead": 0,
  "behind": 0,
  "modified": [
    "src/app.ts"
  ],
  "added": [
    "src/git/git.service.ts"
  ],
  "deleted": [],
  "untracked": [
    "src/test.ts"
  ]
}
Deliverables
 git_status
 Modified files
 Added files
 Deleted files
 Untracked files
 Branch information
5.8.6 — Branch Tools

Create:

git_branch_list
git_branch_current
git_branch_info

Possible result:

{
  "current": "feature/github-mcp",
  "branches": [
    "main",
    "develop",
    "feature/github-mcp"
  ]
}
Keep writing operations out for now

For this MVP, I recommend:

READ
├── list branches
├── inspect branch
└── current branch

Avoid initially exposing:

delete branch
create branch
checkout branch
merge branch
rebase

Those operations can come later when the agent has stronger permission and confirmation mechanisms.

Deliverables
 Branch listing
 Current branch
 Branch metadata
 Safe read-only design
5.8.7 — Commit & Log Tools

Create:

git_log
git_commit_show
git_commit_search

Example:

git_log
    ↓
Recent commits
    ↓
Structured commits

Example:

{
  "commits": [
    {
      "hash": "a91f2c3",
      "author": "Firdous",
      "message": "Add GitHub MCP tools",
      "date": "2026-08-18"
    }
  ]
}

Support parameters such as:

limit
author
since
until
branch
Deliverables
 Commit history
 Commit details
 Commit filtering
 Pagination/limit support
5.8.8 — Diff Tools

This is a very important capability for the future AI agent.

Create:

git_diff
git_commit_diff
git_file_diff

Architecture:

User
 ↓
AI
 ↓
git_diff
 ↓
GitService
 ↓
Git
 ↓
Diff
 ↓
LLM

Example question:

"What have I changed but not committed?"

The agent can call:

git_status
     ↓
git_diff
     ↓
LLM

Possible output:

{
  "filesChanged": 3,
  "insertions": 42,
  "deletions": 11,
  "files": [
    "src/app.ts",
    "src/auth.service.ts",
    "src/routes.ts"
  ]
}
Deliverables
 Working-tree diff
 Commit diff
 File diff
 Diff parsing
 Size/limit protection
5.8.9 — Blame & File History

Add:

git_blame
git_file_history

Example:

git_blame
    ↓
src/auth/auth.service.ts
    ↓
Commit / Author / Line

This allows future questions like:

"Who introduced this line?"

or:

"Show me the history of this authentication file."

Deliverables
 File blame
 File history
 Commit references
 Author information
5.8.10 — Tags & Remote Tools

Add:

git_tag_list
git_remote_list
git_remote_info

Example:

{
  "remotes": [
    {
      "name": "origin",
      "fetchUrl": "...",
      "pushUrl": "..."
    }
  ]
}

This also provides a clean bridge between:

Git MCP
     +
GitHub MCP

For example:

Git
│
├── local repository
├── local branches
├── commits
└── remotes
          │
          ▼
       GitHub MCP
          │
          ▼
       Remote repo
5.8.11 — MCP Integration

Now expose the Git capabilities through your existing MCP infrastructure.

Architecture:

AI
 ↓
MCP Client
 ↓
MCP Gateway
 ↓
Git MCP Server
 ↓
GitService
 ↓
Local Repository

Register:

Git MCP Server

with:

MCP Server Registry

Tool discovery should return something like:

Git MCP
│
├── git_status
├── git_branch_list
├── git_branch_current
├── git_log
├── git_commit_show
├── git_diff
├── git_commit_diff
├── git_blame
├── git_file_history
├── git_tag_list
└── git_remote_list
Deliverables
 Git MCP Server
 MCP registration
 Tool discovery
 Tool schemas
 Gateway execution
 Error propagation
5.8.12 — Validation & E2E

This is the final checkpoint.

Test:

Chrome / API
      ↓
AI Service
      ↓
MCP Client
      ↓
MCP Gateway
      ↓
Git MCP
      ↓
GitService
      ↓
Local Repository

Test questions such as:

What branch am I currently on?


Show me the recent commits.


What files have changed?


What is the difference between my working tree and HEAD?


Who modified this line?


Show me the history of this file.


What remotes does this repository have?
Required checkpoints

After each major implementation:

npx tsc --noEmit

Then:

npm run build

And finally perform MCP integration/E2E testing.

🔐 Security Scope for 5.8

For this milestone, I strongly recommend keeping Git read-only.

Allowed
git status
git branch
git log
git show
git diff
git blame
git tag
git remote
Not initially exposed
git push
git commit
git reset
git checkout
git merge
git rebase
git branch -D
git clean

Why?

Because your ultimate goal is an AI Developer Agent.

Before allowing the agent to modify a repository, you should first establish:

Permission System
       ↓
User Confirmation
       ↓
Tool Execution
       ↓
Audit Log
       ↓
Validation

That should come later.

🧩 Final 5.8 Architecture
                         AI Service
                             │
                             ▼
                         MCP Client
                             │
                             ▼
                        MCP Gateway
                             │
                             ▼
                       Git MCP Server
                             │
                     ┌───────┴────────┐
                     │                │
                     ▼                ▼
                 Git Tools        GitService
                                      │
                                      ▼
                              Local Git Repository

Git tools:

                  Git MCP
                     │
     ┌───────────────┼────────────────┐
     │               │                │
     ▼               ▼                ▼
   Status          Branches          Log
     │               │                │
     ├───────────────┼────────────────┤
     │               │                │
     ▼               ▼                ▼
   Diff            Blame             Tags
                     │
                     ▼
                  Remotes
📊 5.8 Completion Criteria

I would mark 5.8 complete only when all of these are true:

 Git MCP architecture finalized
 GitConfig implemented
 Git domain models implemented
 GitService implemented
 Repository detection implemented
 git_status implemented
 Branch tools implemented
 Commit/log tools implemented
 Diff tools implemented
 Blame implemented
 File history implemented
 Tag tools implemented
 Remote tools implemented
 Git MCP Server implemented
 Git tools registered
 Tool discovery works
 MCP Gateway executes Git tools
 Invalid repository handling works
 Git errors are handled safely
 Timeout protection works
 npx tsc --noEmit passes
 npm run build passes
 End-to-end MCP test passes
🚀 What Comes After 5.8

Once Git MCP is complete, do not immediately add another MCP server.

The next major milestone should be the intelligence layer:

5.8 Git MCP
      ↓
5.9 AI ↔ MCP Orchestration
      ↓
5.10 Multi-Tool AI Agent

The important transition will be:

Before 5.9
User
 ↓
Developer chooses tool
 ↓
MCP
 ↓
Result
After 5.9
User
 ↓
AI understands intent
 ↓
AI determines required tool
 ↓
MCP Gateway
 ↓
Tool
 ↓
Result
 ↓
AI evaluates result
 ↓
Another tool if required
 ↓
Final answer

And that is the point where your project starts becoming a real AI Developer Agent, rather than simply being an MCP-enabled application.

Your immediate coding sequence
5.8.1  Architecture
   ↓
5.8.2  Types & Config
   ↓
5.8.3  GitService
   ↓
5.8.4  Repository Detection
   ↓
5.8.5  Status
   ↓
5.8.6  Branches
   ↓
5.8.7  Commits & Log
   ↓
5.8.8  Diff
   ↓
5.8.9  Blame & File History
   ↓
5.8.10 Tags & Remotes
   ↓
5.8.11 MCP Integration
   ↓
5.8.12 E2E Validation
   ↓
✅ 5.8 COMPLETE
   ↓
🧠 5.9 AI ↔ MCP Orchestration

I recommend we start coding with 5.8.1 — Git MCP Architecture and module structure, while keeping the Git MCP read-only for this MVP.