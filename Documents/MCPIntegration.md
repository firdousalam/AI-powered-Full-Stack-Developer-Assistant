Episode 4 – MCP Integration (06-MCP-Architecture.md)
🎯 Goal

Introduce the Model Context Protocol (MCP) so the assistant can use developer tools and local resources through a common interface instead of relying only on LLM knowledge.

Architecture
Chrome Extension

↓

Backend

↓

MCP Gateway

↓

Registry

↓

Filesystem MCP

Docker MCP

Kubernetes MCP

Git MCP

GitHub MCP

↓

LLM
MCP Flow
User

↓

Explain my project

↓

Filesystem MCP

↓

Read project

↓

Return files

↓

LLM

↓

Summary
Registry
MCP Servers

Filesystem

Docker

Kubernetes

Git

GitHub

Postgres

Memory
Folder Structure
mcp/

client/

registry/

servers/

adapters/

tools/

prompts/

config/
Example Tools
Filesystem MCP
Read File
Read Folder
Search
List Directory
Docker MCP
docker ps
docker images
docker logs
Kubernetes MCP
kubectl get pods
kubectl describe
kubectl logs
Git MCP
Branches
Commits
Diff
Status
AI Workflow
Question

↓

Router

↓

Need filesystem?

↓

Filesystem MCP

↓

Need Docker?

↓

Docker MCP

↓

Need Kubernetes?

↓

Kubernetes MCP

↓

Combine results

↓

Ollama

↓

Final Answer
Deliverables
MCP client
MCP registry
Tool discovery
Filesystem MCP
Docker MCP
Kubernetes MCP
Git MCP
AI tool orchestration
End of Module 1

By the end of these four episodes, you'll have:

A React-based Manifest V3 Chrome Extension.
A Node.js backend with authentication and REST APIs.
Local AI powered by Ollama, optimized for a 16 GB development machine.
An MCP-enabled architecture that can interact with files, Docker, Kubernetes, Git, and other developer tools.

This provides a strong foundation before adding RAG, OCR, PDF chat, GitHub analysis, cloud assistants, and deployment in later episodes.