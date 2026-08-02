# 📄 02-Browser-Context-Architecture

# Milestone 4.10 – Context-Aware AI Assistant

---

# 📖 Overview

In the previous milestones, Zeba AI was capable of communicating with the backend, streaming AI responses, supporting multiple AI providers, and maintaining a production-ready architecture.

However, one major limitation still existed.

The AI only knew what the user explicitly typed into the prompt.

Modern AI coding assistants are significantly more intelligent because they automatically gather context from the user's current working environment before sending any request to the Large Language Model (LLM).

Examples include:

- GitHub Copilot Chat
- Cursor AI
- Claude Code
- Windsurf
- Continue.dev

These assistants automatically understand:

- Which webpage you're viewing
- Which documentation you're reading
- Which GitHub repository you're browsing
- Which StackOverflow question you're viewing
- Which code you've selected
- Which programming language you're working with

This automatic collection of contextual information is known as **Browser Context Collection**.

This chapter explains the complete architecture that powers this feature inside Zeba AI.

---

# 🎯 Learning Objectives

By the end of this chapter you will understand:

- Browser Context Architecture
- Chrome Extension communication flow
- Component responsibilities
- Runtime messaging architecture
- Browser Context lifecycle
- Browser Context Object
- Background Service Worker orchestration
- Future integration with RAG and Workspace Awareness

---

# Why Browser Context Architecture?

Without browser context the application behaves like this:

```
User

↓

Popup

↓

Backend

↓

LLM
```

Only the user prompt reaches the AI.

Example:

```
Explain this.
```

The AI has absolutely no idea what "this" refers to.

---

After introducing Browser Context the flow becomes:

```
User

↓

Popup

↓

Background Worker

↓

Chrome Tabs API

↓

Active Browser Tab

↓

Content Script

↓

Browser Context

↓

Backend

↓

LLM
```

Now the AI understands:

- Current webpage
- Current URL
- Page title
- Selected code
- Browser metadata

before generating its response.

---

# High-Level Architecture

```
                Chrome Extension

+---------------------------------------------+

Popup UI

↓

Background Service Worker

↓

Chrome Tabs API

↓

Active Browser Tab

↓

Content Script

↓

Browser Context Object

↓

Backend API

↓

AI Provider

↓

LLM

+---------------------------------------------+
```

Every request flows through multiple components before reaching the AI.

Each component has a specific responsibility.

---

# Component Responsibilities

## 1. Popup

The Popup is responsible for interacting with the user.

Responsibilities:

- Accept prompt
- Display AI response
- Show streaming output
- Display loading indicators
- Display errors

The Popup **never directly reads browser data**.

Instead, it asks the Background Worker.

---

## 2. Background Service Worker

The Background Worker acts as the central controller.

Responsibilities:

- Receive popup requests
- Query Chrome Tabs API
- Communicate with Content Scripts
- Build Browser Context Object
- Merge context with user prompt
- Call backend API
- Stream AI responses
- Forward tokens back to Popup

Think of it as the brain of the Chrome Extension.

---

## 3. Chrome Tabs API

Chrome provides an API that allows extensions to inspect browser tabs.

Responsibilities:

- Detect active tab
- Read URL
- Read title
- Read tab ID
- Read window information

The Tabs API cannot directly access the webpage DOM.

For that we need Content Scripts.

---

## 4. Content Script

Content Scripts execute inside webpages.

Responsibilities:

- Read DOM
- Access Selection API
- Capture highlighted text
- Read page metadata
- Extract HTML
- Detect code blocks (later milestone)

Content Scripts are the only part of the extension capable of interacting with webpage content.

---

## 5. Backend

The backend receives:

- User Prompt
- Browser Context
- Conversation History (future)
- Retrieved Documents (future)

It then builds a high-quality AI prompt before forwarding it to the LLM.

---

## 6. LLM

The Large Language Model finally receives enriched context.

Instead of:

```
Explain this.
```

it receives:

```
Current URL

https://react.dev/reference/react/useEffect

Page Title

React – useEffect

Selected Text

useEffect(() => {
    fetchData();
}, []);

User Prompt

Explain this.
```

This dramatically improves answer quality.

---

# Browser Context Lifecycle

The browser context follows a predictable lifecycle for every AI request.

```
User Clicks Ask AI

↓

Popup sends Runtime Message

↓

Background receives request

↓

Query Active Tab

↓

Inject Content Script

↓

Collect Browser Context

↓

Create Context Object

↓

Send to Backend

↓

Backend Builds Prompt

↓

LLM

↓

Streaming Response

↓

Popup
```

Every interaction follows this pipeline.

---

# Browser Context Collection Flow

```
Popup

↓

Background

↓

Chrome Tabs API

↓

Active Tab

↓

Content Script

↓

Selection API

↓

Page Metadata

↓

Browser Context Object

↓

Background

↓

Backend

↓

LLM
```

Notice that the Background Worker communicates with both the Popup and the Content Script.

It acts as the coordinator.

---

# Browser Context Object

The collected information is transformed into a structured object.

Example:

```json
{
  "url": "https://react.dev/reference/react/useEffect",
  "title": "React – useEffect",
  "hostname": "react.dev",
  "protocol": "https",
  "language": "en",
  "selectedText": "useEffect(() => { fetchData(); }, []);",
  "timestamp": "2026-08-01T10:20:45Z"
}
```

This object becomes part of every AI request.

---

# Complete Request Flow

Instead of sending:

```
Explain this.
```

Zeba AI now sends:

```
Browser Context

↓

User Prompt

↓

Backend

↓

Prompt Builder

↓

AI Provider

↓

LLM
```

The backend merges everything into a single optimized prompt.

Example:

```
Current URL:
https://react.dev/reference/react/useEffect

Page Title:
React – useEffect

Selected Text:
useEffect(() => {
    fetchData();
}, []);

User Prompt:
Explain this.
```

This enables the AI to generate highly contextual responses.

---

# Communication Flow

The communication between extension components is shown below.

```
User

↓

Popup

↓

chrome.runtime.sendMessage()

↓

Background

↓

chrome.tabs.query()

↓

Active Tab

↓

chrome.tabs.sendMessage()

↓

Content Script

↓

Browser Context

↓

Background

↓

Backend API

↓

Streaming Response

↓

Background

↓

Popup
```

This architecture separates responsibilities and keeps the codebase modular.

---

# Sequence Diagram

```
User
 │
 │ Click Ask AI
 ▼
Popup
 │
 │ Runtime Message
 ▼
Background
 │
 │ Query Tabs API
 ▼
Chrome Tabs API
 │
 │ Active Tab
 ▼
Content Script
 │
 │ Selected Text
 │ URL
 │ Title
 ▼
Background
 │
 │ HTTP Request
 ▼
Backend
 │
 ▼
LLM
 │
 ▼
Streaming Response
 │
 ▼
Background
 │
 ▼
Popup
 │
 ▼
User
```

---

# Updated Project Structure

After introducing Browser Context Collection, the project structure becomes:

```text
extension/

src/

├── popup/
│   ├── Popup.tsx
│   ├── PromptInput.tsx
│   └── ChatWindow.tsx
│
├── background/
│   └── background.ts
│
├── content/
│   ├── content.ts
│   ├── selection.ts
│   ├── page.ts
│   └── dom.ts
│
├── services/
│   ├── api.service.ts
│   └── browserContext.service.ts
│
├── types/
│   └── browser.types.ts
│
├── constants/
│
└── manifest.json
```

This modular architecture makes the project easier to maintain and extend as new capabilities are added.

---

# Why This Architecture Scales

This architecture is designed with future milestones in mind.

It provides a foundation for:

- DOM extraction
- Intelligent page understanding
- Code block detection
- Retrieval-Augmented Generation (RAG)
- Workspace awareness
- MCP (Model Context Protocol)
- Tool calling
- Autonomous AI agents

Because browser context is collected independently from the AI provider, new features can be integrated without changing the Popup or Backend communication flow.

---

# Key Takeaways

By the end of this chapter you should understand:

- Browser context is the foundation of modern AI coding assistants.
- The Popup never communicates directly with webpages.
- The Background Service Worker orchestrates the entire workflow.
- Chrome Tabs API identifies the active browser tab.
- Content Scripts collect webpage-specific information.
- A structured Browser Context Object is created for every AI request.
- The backend enriches prompts using browser context before sending them to the LLM.
- This architecture prepares Zeba AI for advanced capabilities such as RAG, MCP, Workspace Awareness, and Autonomous AI Agents.

---

# 📌 Next Chapter

In the next chapter, we will implement **Chrome Tabs API Integration**.

You will learn how to:

- Detect the active browser tab
- Read the current URL
- Extract the page title
- Access browser metadata
- Configure Chrome extension permissions
- Build a reusable Browser Context Service

This will be the first implementation step toward making Zeba AI truly context-aware.