# 📄 Chapter 10 — Testing & Validation

# Milestone 4.10 – Context-Aware AI Assistant

---

# Overview

Congratulations! 🎉

At this stage, we have completed the entire implementation of **Milestone 4.10 – Context-Aware AI Assistant**.

Our Chrome Extension can now:

- Detect the active browser tab
- Read the current URL
- Read the page title
- Collect browser metadata
- Capture selected text
- Build a Browser Context object
- Send context to the backend
- Inject context into AI prompts
- Stream AI responses back to the popup

However, before moving to the next milestone, we must verify that every component works correctly.

In professional software development, testing is just as important as implementation.

This chapter provides a comprehensive testing guide covering every layer of the application.

---

# Learning Objectives

By the end of this chapter, you will be able to:

- Test browser context collection
- Validate Chrome Tabs API integration
- Verify Content Script communication
- Test Runtime Messaging
- Debug Background Service Workers
- Validate Backend APIs
- Verify Prompt Injection
- Test AI responses
- Inspect network traffic
- Troubleshoot common issues
- Prepare the application for production

---

# Testing Architecture

Our application consists of several layers.

```
Popup

      │

      ▼

Background Worker

      │

      ▼

Browser Context Service

      │

      ▼

Chrome Tabs API

      │

      ▼

Content Script

      │

      ▼

Backend API

      │

      ▼

Prompt Service

      │

      ▼

AI Provider

      │

      ▼

LLM
```

Each layer should be tested independently before testing the entire workflow.

---

# Testing Strategy

Testing will be performed in the following order:

```
Chrome Extension

↓

Popup

↓

Background

↓

Browser Context

↓

Runtime Messaging

↓

Backend

↓

Prompt Injection

↓

AI Provider

↓

Streaming

↓

End-to-End
```

This approach makes debugging much easier because failures can be isolated to a single layer.

---

# Test Environment

Before testing, ensure the following components are running:

| Component | Status |
|-----------|--------|
| Chrome Extension | ✅ Loaded |
| Backend Server | ✅ Running |
| Ollama Server | ✅ Running |
| Selected AI Model | ✅ Installed |
| Browser Tab | ✅ Open |
| Internet Connection | Optional (for cloud models) |

---

# Test Case 1 — Extension Loads Successfully

### Objective

Verify that the Chrome Extension loads without errors.

---

### Steps

1. Open Chrome.

2. Navigate to:

```
chrome://extensions
```

3. Enable **Developer Mode**.

4. Load the extension.

---

### Expected Result

```
Zeba AI

Enabled

No Errors
```

---

# Test Case 2 — Background Worker Starts

Open:

```
chrome://extensions
```

Click

```
Service Worker

Inspect
```

Expected console:

```
🚀 Background Worker Started

✅ Background Ready
```

No exceptions should appear.

---

# Test Case 3 — Active Browser Tab

Open any webpage.

Example:

```
https://react.dev
```

Trigger browser context collection.

Expected:

```json
{

    "url":

    "https://react.dev",

    "title":

    "React",

    "hostname":

    "react.dev"

}
```

---

# Test Case 4 — URL Extraction

Open:

```
https://kubernetes.io/docs
```

Expected Browser Context:

```json
{

    "url":

    "https://kubernetes.io/docs"

}
```

Verify:

- URL is correct
- Protocol is correct
- Hostname is correct

---

# Test Case 5 — Page Title

Visit:

```
https://react.dev/reference/react/useEffect
```

Expected:

```
React – useEffect
```

The page title should match the browser tab.

---

# Test Case 6 — Browser Metadata

Expected object:

```json
{

    "hostname":

    "react.dev",

    "protocol":

    "https",

    "language":

    "en-US"

}
```

Verify all values are populated.

---

# Test Case 7 — Selected Text

Highlight:

```ts
useEffect(() => {

    fetchData();

}, []);
```

Open Zeba AI.

Expected:

```
Selected Text

useEffect(() => {

    fetchData();

}, []);
```

---

# Test Case 8 — Browser Context Object

Verify complete object.

```json
{

    "url":

    "...",

    "title":

    "...",

    "hostname":

    "...",

    "protocol":

    "...",

    "language":

    "...",

    "selectedText":

    "...",

    "timestamp":

    "..."
}
```

No property should be missing.

---

# Test Case 9 — Runtime Messaging

Verify communication.

```
Popup

↓

Background

↓

Content Script

↓

Background

↓

Popup
```

No runtime errors should appear.

---

# Test Case 10 — Background Logs

Expected:

```
Collecting Browser Context...

Browser Context:

{

url,

title,

hostname,

...

}
```

---

# Test Case 11 — Backend API

Open:

```
http://localhost:3000/api/chat
```

Or test using Postman.

Sample request:

```json
{

    "prompt":

    "Explain this.",

    "model":

    "llama3.2:3b",

    "browserContext": {

        "url":

        "https://react.dev",

        "title":

        "React"

    }

}
```

Expected:

```json
{

    "success": true,

    "response": "..."
}
```

---

# Test Case 12 — Prompt Injection

Temporarily log the generated prompt.

Example:

```ts
console.log(

finalPrompt

);
```

Expected output:

```
Current Page

React

Current URL

https://react.dev

Selected Text

...

User Request

Explain this.
```

This confirms browser context is injected correctly.

---

# Test Case 13 — AI Response

Prompt:

```
Explain this.
```

Selected text:

```ts
useEffect(() => {

    fetchData();

}, []);
```

Expected response:

```
The useEffect Hook executes
after the component renders...
```

The response should reference the selected code rather than giving a generic explanation.

---

# Test Case 14 — Streaming Response

Submit:

```
Explain React Hooks
```

Expected:

```
AI is typing...

↓

Token

↓

Token

↓

Token

↓

Completed
```

The response should stream gradually.

---

# Test Case 15 — Popup UI

Verify:

- Browser Context Card
- Prompt Input
- Chat Window
- Loading Indicator
- Error Messages

Everything should render correctly.

---

# Test Case 16 — Loading State

Disable the backend temporarily.

Expected UI:

```
Connecting...

Loading...

Retry...
```

No application crash should occur.

---

# Test Case 17 — Error Handling

Stop Ollama.

Submit prompt.

Expected:

```
Unable to connect
to AI backend.
```

The UI should remain responsive.

---

# Test Case 18 — Network Failure

Disconnect the network (or stop the backend).

Expected:

```
Network Error

Please try again.
```

---

# Test Case 19 — Empty Prompt

Submit:

```
""
```

Expected:

```
Prompt cannot be empty.
```

The request should not be sent.

---

# Test Case 20 — Invalid Browser Context

Force:

```ts
browserContext = undefined;
```

Expected:

```
Prompt only
```

The application should continue to function without crashing.

---

# Manual Debugging

## Popup

```
Inspect Popup

↓

Console
```

Verify:

- Messages
- State updates
- UI rendering

---

## Background Worker

```
chrome://extensions

↓

Inspect Worker
```

Verify:

```
Browser Context

Prompt

Streaming

Errors
```

---

## Backend

Console:

```
Received Prompt

Received Context

Provider

Response
```

---

## Network

Use DevTools.

```
Network

↓

Fetch/XHR

↓

Request

↓

Response
```

Verify:

- Payload
- Browser Context
- AI Response

---

# Common Issues

## Extension Not Updating

Solution:

```
Reload Extension
```

---

## Background Not Starting

Check:

```
manifest.json
```

Verify:

```json
"background": {

    "service_worker":

    "background.js"

}
```

---

## Runtime Messaging Failed

Verify:

```
chrome.runtime.sendMessage()
```

and

```
chrome.runtime.onMessage.addListener()
```

are implemented correctly.

---

## Tabs API Returns Empty

Check permissions.

```json
"permissions":[

    "tabs"

]
```

---

## Content Script Missing

Verify:

```json
"content_scripts"
```

exists in the manifest.

---

## Backend Offline

Ensure:

```
npm run dev
```

is running.

---

## Ollama Offline

Verify:

```
ollama serve
```

Then test:

```
ollama list
```

---

# Performance Testing

Monitor:

- Browser CPU usage
- Memory consumption
- Streaming latency
- API response time

Expected:

- Context collection < 100 ms
- Prompt generation < 10 ms
- Backend response begins quickly (streaming)
- Smooth UI updates

---

# Security Checklist

Verify that the extension does **not** collect:

- Password fields
- Cookies
- Session tokens
- Local storage secrets
- Credit card information

Only approved browser context should be transmitted.

---

# Production Checklist

Before moving to the next milestone, ensure:

- ✅ Extension loads successfully
- ✅ Popup works correctly
- ✅ Background worker starts
- ✅ Browser Context Service works
- ✅ Chrome Tabs API works
- ✅ Content Scripts respond
- ✅ Runtime Messaging succeeds
- ✅ Backend receives context
- ✅ Prompt Injection works
- ✅ AI Provider responds
- ✅ Streaming works
- ✅ Error handling works
- ✅ UI is responsive
- ✅ Logs are clean
- ✅ No console errors

---

# End-to-End Flow

```
User

↓

Popup

↓

Background

↓

Browser Context

↓

Backend

↓

Prompt Service

↓

AI Provider

↓

LLM

↓

Streaming

↓

Popup
```

Every stage should complete successfully.

---

# Milestone Completion

Congratulations!

You have successfully completed **Milestone 4.10 – Context-Aware AI Assistant**.

Your Zeba AI now supports:

- ✅ Active Browser Tab Detection
- ✅ Current URL Extraction
- ✅ Page Title Detection
- ✅ Browser Metadata Collection
- ✅ Selected Text Capture
- ✅ Chrome Tabs API Integration
- ✅ Runtime Messaging
- ✅ Background Service Worker
- ✅ Browser Context Service
- ✅ Popup Integration
- ✅ Backend Context Injection
- ✅ Prompt Engineering
- ✅ Context Injection
- ✅ Streaming AI Responses
- ✅ Production-Ready Architecture

Your application is now significantly closer to professional AI coding assistants such as **GitHub Copilot Chat, Cursor AI, Claude Code, Continue.dev, and Windsurf**.

---

# What's Next

## 📄 Milestone 4.10 – Part 2: DOM Extraction & Intelligent Page Understanding

In the next milestone, Zeba AI will move beyond browser metadata and begin understanding the **actual content** of web pages.

Upcoming features include:

- Full DOM extraction
- HTML parsing
- Readability-based article extraction
- Code block detection
- Programming language identification
- Syntax-aware code extraction
- Markdown conversion
- Intelligent page summarization
- Context compression for LLMs
- Optimized browser context for Retrieval-Augmented Generation (RAG)

By the end of the next milestone, Zeba AI will no longer depend only on selected text. It will understand the structure, content, and semantics of entire webpages, laying the foundation for advanced capabilities such as RAG, Workspace Awareness, and enterprise-grade AI development assistants.