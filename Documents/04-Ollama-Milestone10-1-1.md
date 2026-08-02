# 📄 01-Introduction.md

# Milestone 4.10 – Context-Aware AI Assistant

# Part 1 — Introduction

---

# Chapter Overview

In the previous milestones, we built the core communication architecture for Zeba AI.

Our Chrome Extension can now:

- Communicate with the backend
- Stream AI responses in real time
- Support multiple AI providers
- Display AI responses with a typing animation
- Maintain a production-ready communication architecture

Although this is a solid foundation, the AI still depends entirely on what the user manually types.

For example, if the user asks:

> Explain this.

The AI has no idea what **"this"** refers to.

It cannot determine:

- Which webpage is currently open
- Which code the user is reading
- Which documentation the user is viewing
- Which text is selected
- Which project the user is working on

Modern AI assistants solve this problem by automatically collecting browser context before sending the prompt to the Large Language Model (LLM).

This milestone introduces **Context Awareness**, one of the most important capabilities of modern AI-powered developer assistants.

---

# What is Context Awareness?

Context Awareness is the ability of an AI assistant to automatically understand the user's current working environment before generating a response.

Instead of relying solely on a manually written prompt, the assistant collects additional information such as:

- Current browser tab
- Website URL
- Page title
- Selected text
- Browser metadata
- Current webpage

The collected information becomes part of the AI prompt.

Rather than asking only:

```
Explain this.
```

The AI receives something similar to:

```
User Prompt

Explain this.

Current URL

https://react.dev/reference/react/useEffect

Page Title

React – useEffect

Selected Text

useEffect(() => {
    fetchData();
}, []);

Language

English

Website

react.dev
```

The AI immediately understands the user's context and can produce a much more accurate response.

---

# Why Browser Context Matters

Without browser context, the AI behaves like a traditional chatbot.

It only knows the text entered into the input box.

For example:

```
Explain this.
```

The assistant has absolutely no information about:

- the webpage
- the selected code
- the documentation
- the programming language
- the current website

As a result, the response is often vague or incorrect.

---

## With Browser Context

Suppose the user is reading the official React documentation.

Current URL

```
https://react.dev/reference/react/useEffect
```

Selected Text

```tsx
useEffect(() => {
    fetchData();
}, []);
```

Prompt

```
Explain this.
```

Now the AI understands:

- the framework is React
- the topic is useEffect
- the selected code is a React Hook
- the webpage is official React documentation

The response becomes significantly more accurate.

---

# Traditional Chatbot vs Context-Aware AI

| Traditional Chatbot | Context-Aware Assistant |
|---------------------|-------------------------|
| Knows only the prompt | Knows the current webpage |
| No selected text | Reads selected text |
| No browser information | Reads browser metadata |
| Generic responses | Context-specific responses |
| User explains everything | AI already understands the situation |

---

# Modern AI Coding Assistants

Most modern developer assistants automatically collect browser or workspace context before contacting the LLM.

Examples include:

- GitHub Copilot Chat
- Cursor AI
- Claude Code
- Windsurf
- Continue.dev
- Sourcegraph Cody
- Amazon Q Developer

These tools do much more than simply send a prompt.

They first understand:

- Current file
- Current project
- Selected code
- Documentation
- Repository
- Open tabs
- Workspace structure

Our goal is to build the same architecture inside Zeba AI.

---

# Learning Objectives

By the end of this milestone, you will learn how to:

- Detect the active browser tab
- Read the current webpage URL
- Extract the page title
- Capture selected text
- Collect browser metadata
- Use the Chrome Tabs API
- Build Content Scripts
- Communicate using Runtime Messaging
- Create a Browser Context Service
- Send browser context to the backend
- Prepare the foundation for Retrieval-Augmented Generation (RAG)
- Prepare the foundation for Workspace Awareness

---

# Browser Context Overview

The browser provides valuable information that can improve AI responses.

Our extension will collect:

```
Browser Context

├── Active Browser Tab
├── Current URL
├── Page Title
├── Selected Text
├── Browser Metadata
├── Language
├── Hostname
├── Protocol
└── Timestamp
```

Later milestones will expand this with:

```
Browser Context

├── DOM
├── HTML
├── Code Blocks
├── Markdown
├── Images
├── Forms
├── Tables
├── Workspace Files
├── Git Repository
├── Local Documents
├── Embeddings
├── Vector Search
└── MCP Tools
```

---

# Benefits of Context Awareness

Adding browser context dramatically improves the quality of AI responses.

Benefits include:

- Better understanding of user intent
- Less typing for the user
- More accurate explanations
- Improved code understanding
- Better documentation summaries
- Richer prompts
- Stronger Retrieval-Augmented Generation (RAG)
- Foundation for autonomous AI agents

---

# Browser Context Components

During this milestone we will implement the following components.

```
Browser Context

├── Active Tab
├── URL
├── Page Title
├── Selected Text
├── Browser Metadata
└── Runtime Messaging
```

Future milestones will extend this architecture.

```
Browser Context

├── HTML
├── DOM
├── Code Blocks
├── RAG
├── Embeddings
├── Workspace
├── MCP
└── AI Agents
```

---

# Real-World Example

Suppose you are reading the React documentation.

Current URL

```
https://react.dev/reference/react/useEffect
```

Selected Text

```tsx
useEffect(() => {
    fetchData();
}, []);
```

Instead of typing:

```
Explain React useEffect Hook with examples.
```

You simply ask:

```
Explain this.
```

Zeba AI automatically attaches:

- Current URL
- Page Title
- Selected Code
- Browser Metadata

The AI already understands the context.

This creates a much more natural user experience.

---

# Where Browser Context Fits

The complete request flow becomes:

```
User

    │

    ▼

Popup

    │

    ▼

Background Service Worker

    │

    ▼

Chrome Tabs API

    │

    ▼

Active Browser Tab

    │

    ▼

Content Script

    │

    ▼

Browser Context

    │

    ▼

Backend

    │

    ▼

Prompt Builder

    │

    ▼

LLM

    │

    ▼

Streaming Response

    │

    ▼

Popup
```

---

# What We Will Build

Throughout this milestone, we will implement:

- Browser Context Service
- Chrome Tabs API integration
- Active Tab Detection
- URL Extraction
- Page Title Extraction
- Selected Text Capture
- Content Scripts
- Runtime Messaging
- Backend Context Injection
- Production-ready browser context architecture

---

# End Goal of This Milestone

After completing this milestone, Zeba AI will understand far more than just the user's typed prompt.

It will know:

- Which webpage the user is viewing
- Which documentation is open
- Which code is selected
- Which browser tab is active
- Additional browser metadata

This creates the foundation for advanced capabilities that will be implemented in future milestones, including:

- DOM extraction
- Intelligent webpage understanding
- Retrieval-Augmented Generation (RAG)
- Workspace awareness
- Model Context Protocol (MCP)
- Tool calling
- Autonomous AI agents

---

# Final Deliverables

By the end of Part 1, you will have successfully implemented:

- ✅ Active browser tab detection
- ✅ Current URL extraction
- ✅ Page title extraction
- ✅ Browser metadata collection
- ✅ Selected text capture
- ✅ Chrome Tabs API integration
- ✅ Runtime messaging foundation
- ✅ Content Script communication
- ✅ Browser context object
- ✅ Foundation for Retrieval-Augmented Generation (RAG)
- ✅ Foundation for Workspace Awareness
- ✅ Enterprise-ready browser context architecture

---

# Next Chapter

In the next chapter, we will design the complete Browser Context Architecture, including the communication flow between the Popup, Background Service Worker, Chrome Tabs API, and Content Scripts before implementing the first production-ready browser context service.