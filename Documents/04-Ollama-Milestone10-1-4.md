## 4. Merge Prompt + Browser Context

After collecting the browser context, the Background Service Worker combines it with the user's prompt before sending the request to the backend.

Instead of sending only the prompt, the extension now sends a complete **Browser Context Object** together with the user's request.

### Background Integration

```ts
const browserContext =
    await browserContextService.getBrowserContext();

const result =
    await chatWithAI(
        message.prompt,
        message.model ?? "llama3.2:3b",
        browserContext
    );
```

The `chatWithAI()` function forwards both the user's prompt and the browser context to the backend.

---

## Request Payload

The request sent to the backend now contains additional contextual information.

```json
{
  "prompt": "Explain this.",
  "model": "llama3.2:3b",
  "browserContext": {
    "url": "https://react.dev/reference/react/useEffect",
    "title": "React – useEffect",
    "hostname": "react.dev",
    "protocol": "https",
    "language": "en-US",
    "tabId": 123,
    "windowId": 1,
    "timestamp": "2026-08-01T10:20:31.000Z"
  }
}
```

---

## Why Include Browser Context?

Without browser context, the AI receives only the user's prompt.

```text
Explain this.
```

The model has no information about what the user is referring to.

It does not know:

- Which webpage is currently open
- Which documentation is being viewed
- Which website the user is browsing
- Whether the user is reading React, Kubernetes, Docker, GitHub, or Stack Overflow

As a result, the AI must guess the user's intent.

---

## With Browser Context

After integrating browser context, the backend receives much richer information.

```text
Prompt:
Explain this.

Current URL:
https://react.dev/reference/react/useEffect

Page Title:
React – useEffect

Hostname:
react.dev

Language:
en-US
```

This additional metadata provides valuable context that helps the AI understand what the user is working on.

---

## Benefits

Adding browser context enables the AI to:

- Understand the current webpage
- Recognize official documentation sites
- Infer the technology being used
- Generate more accurate responses
- Reduce ambiguous prompts
- Prepare for future context-aware features

---

## Future Enhancements

In the next milestones, this browser context object will be expanded with additional information such as:

```text
Browser Context
│
├── Current URL
├── Page Title
├── Hostname
├── Language
├── Selected Text
├── DOM Content
├── HTML Structure
├── Code Blocks
├── Workspace Files
├── Retrieved Documents (RAG)
├── Conversation Memory
└── MCP Tool Results
```

By gradually enriching the browser context, DevPilot AI will evolve from a simple chatbot into a context-aware development assistant capable of understanding the user's environment before generating a response.

---

## Architecture Flow

```text
User Prompt
      │
      ▼
Background Service Worker
      │
      ▼
Collect Browser Context
      │
      ▼
Merge Prompt + Browser Context
      │
      ▼
api.service.ts
      │
      ▼
Express Backend
      │
      ▼
AI Service
      │
      ▼
Prompt Builder
      │
      ▼
LLM (Ollama/OpenAI/Gemini)
```

---

## Summary

At this stage, DevPilot AI no longer sends only the user's prompt to the backend. Every request now includes browser metadata, providing the AI with valuable contextual information about the user's current browsing session. This forms the foundation for upcoming features such as selected text extraction, DOM analysis, Retrieval-Augmented Generation (RAG), workspace awareness, and intelligent developer assistance.