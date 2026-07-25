# Module 04 – Background Service Worker (Manifest V3)

# AI-powered Full Stack Developer Assistant

## Episode 2.4

---

# Chapter Overview

In this module, we build the **Background Service Worker**, one of the most important components of a Chrome Extension.

Unlike Manifest V2, Manifest V3 no longer supports persistent background pages.

Instead, Chrome uses a **Service Worker**, which starts only when needed and automatically stops after completing its work.

This makes Chrome Extensions:

- Faster
- More secure
- Lower memory usage
- Future-proof

---

# Learning Objectives

After completing this module you will understand:

- What is a Background Service Worker
- Manifest V3 Architecture
- Runtime Messaging
- Event Driven Programming
- Chrome Runtime API
- Debugging Service Workers
- Common Errors
- Best Practices

---

# Architecture

```

Chrome Browser

        │

        ▼

+-----------------------+
|      Popup UI         |
+-----------------------+

        │
        │ Runtime Message
        ▼

+-----------------------+
| Background Worker     |
+-----------------------+

        │

        ▼

Node Backend (Future)

        │

        ▼

Ollama / MCP / MongoDB

```

The popup should never communicate directly with the backend.

Instead:

Popup

↓

Background Worker

↓

Backend

↓

Popup

This architecture improves security and keeps API logic centralized.

---

# Folder Structure

Create the following folder:

```

src/

    background/

        background.ts

```

---

# Background Service Worker

Create

```

src/background/background.ts

```

Add the following code:

```typescript
/// <reference types="chrome"/>

console.log("✅ DevPilot Background Worker Started");

chrome.runtime.onInstalled.addListener(() => {
    console.log("🚀 Extension Installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    console.log("📩 Message Received");

    console.log("Message:", message);

    console.log("Sender:", sender);

    sendResponse({
        success: true,
        response: "Hello from Background Worker"
    });

    return true;

});
```

---

# Understanding the Code

## console.log()

```typescript
console.log("✅ DevPilot Background Worker Started");
```

Executed whenever the service worker starts.

Expected output:

```

✅ DevPilot Background Worker Started

```

---

## onInstalled()

```typescript
chrome.runtime.onInstalled.addListener(() => {

});
```

Runs when:

- Extension installed
- Extension updated
- Extension reloaded

Useful for:

- Default Settings
- Storage Initialization
- Context Menu Creation

---

## onMessage()

```typescript
chrome.runtime.onMessage.addListener(...)
```

Receives messages from:

- Popup
- Side Panel
- Content Script
- Options Page

Future Architecture

Popup

↓

Background

↓

Backend

↓

Background

↓

Popup

---

## sendResponse()

```typescript
sendResponse({
    success: true,
    response: "Hello from Background Worker"
});
```

Returns a response back to the sender.

---

## return true

```typescript
return true;
```

Very important.

Allows asynchronous responses.

Without it:

Chrome may close the message channel before the response is sent.

---

# Manifest Configuration

Open

```

manifest.config.ts

```

Add:

```typescript
background: {
    service_worker: "src/background/background.ts",
    type: "module"
},
```

---

# Required Permissions

```typescript
permissions: [

    "storage",

    "activeTab",

    "notifications"

]
```

---

# Install Chrome Type Definitions

If TypeScript cannot recognize

```

chrome

```

Install:

```bash
npm install -D @types/chrome
```

---

# Configure TypeScript

Open

```

tsconfig.app.json

```

Change:

```json
"types": [
    "vite/client",
    "chrome"
]
```

Restart VS Code.

Command Palette

```

TypeScript: Restart TS Server

```

---

# Common TypeScript Error

Error

```

Cannot find name 'chrome'

```

Reason

Chrome types are not installed.

Solution

```
npm install -D @types/chrome
```

Update

```

tsconfig.app.json

```

Restart TypeScript Server.

---

# Common Build Error

Error

```

'sender' is declared but its value is never read.

```

Reason

TypeScript has

```

noUnusedParameters=true

```

Solution

Simply use

```typescript
console.log(sender);
```

or remove the compiler rule.

---

# Another Common Error

```

Cannot resolve entry module

src/content/content.ts

```

Reason

Manifest references files that do not exist.

Create

```

src/content/content.ts

```

Example

```typescript
console.log("Content Script Loaded");
```

---

# Service Worker Status

After loading the extension

Chrome shows

```

Inspect Views

Service Worker (Inactive)

```

This is NOT an error.

Manifest V3 automatically starts and stops the worker.

Expected lifecycle

```

Inactive

↓

Running

↓

Inactive

```

This behavior saves system resources.

---

# How to Inspect the Service Worker

Open

```

chrome://extensions

```

Enable

Developer Mode

Locate

DevPilot AI

Click

```

Inspect Views

↓

Service Worker

```

The DevTools window opens.

Expected logs

```

✅ DevPilot Background Worker Started

🚀 Extension Installed

```

---

# Message Flow

Future architecture

```

Popup

↓

Background Worker

↓

Backend

↓

AI Router

↓

Ollama

↓

Background Worker

↓

Popup

```

---

# Future Responsibilities

The Background Worker will later handle:

- API Requests
- Authentication
- JWT Tokens
- Notifications
- Context Menu
- Runtime Messaging
- AI Requests
- GitHub API
- MCP Requests
- Ollama Requests
- File Uploads
- PDF Processing

---

# Testing Checklist

Open

```

chrome://extensions

```

Verify

- Extension Loaded
- No Manifest Errors
- Background Worker Exists
- Inspect Opens
- No Console Errors

Reload Extension

Verify

```

Background Worker Started

```

Open Console

Verify

```

Extension Installed

```

Everything working.

---

# Expected Output

```

DevPilot AI

Version 1.0.0

Inspect Views

Service Worker (Inactive)

```

Remember

Inactive is NORMAL.

---

# Git Commit

```bash
git add .

git commit -m "feat(extension): add background service worker"

git push origin develop
```

---

# Key Takeaways

In this module we learned:

- Manifest V3 Service Worker
- Runtime Events
- Runtime Messaging
- TypeScript Chrome APIs
- Service Worker Lifecycle
- Debugging
- Manifest Configuration
- Common Errors
- Best Practices

The Background Worker is now ready to communicate with the Popup UI.

In the next module, we will build **Content Scripts**, allowing DevPilot AI to interact directly with web pages, selected text, and page content.