# Chapter 2 - Chrome Extension Development (Manifest V3)

> **Build DevPilot AI – Chrome Extension using React, Vite & Manifest V3**

---

# 📖 Chapter Overview

In this chapter, we will build the **Chrome Extension** that serves as the primary interface for DevPilot AI.

The extension will allow developers to interact with AI directly from any webpage using a modern React-based user interface.

By the end of this chapter, you will have:

- A fully functional Manifest V3 Chrome Extension
- React + Vite integration
- Tailwind CSS setup
- Popup UI
- Background Service Worker
- Content Script
- Side Panel
- Context Menu
- Chrome Storage API
- Runtime Message Passing

---

# 🎯 Learning Objectives

After completing this chapter, you will understand:

- Chrome Extension Architecture
- Manifest Version 3
- React in Chrome Extensions
- Service Workers
- Content Scripts
- Popup Development
- Side Panel API
- Context Menus
- Chrome Runtime Messaging
- Chrome Storage API

---

# 🏗 Chrome Extension Architecture

```text
                    Chrome Browser

        ┌─────────────────────────────────────┐
        │                                     │
        │           Chrome Extension          │
        │                                     │
        ├─────────────────────────────────────┤
        │ Popup (React)                       │
        │ Side Panel                          │
        │ Background Service Worker           │
        │ Content Script                      │
        │ Context Menu                        │
        └─────────────────────────────────────┘
                     │
                     │ Runtime Messaging
                     ▼
              Node.js Backend API
                     │
                     ▼
             Ollama / MCP / MongoDB
```

---

# 🧩 Chrome Extension Components

## Popup

The popup is displayed when the user clicks the extension icon.

Responsibilities:

- AI Chat
- Model Selection
- Prompt Input
- Quick Actions
- User Login

---

## Background Service Worker

Runs in the background.

Responsibilities:

- API Communication
- Authentication
- Notifications
- Runtime Events
- Context Menu Events
- Long-running Tasks

---

## Content Script

Injected into web pages.

Responsibilities:

- Read selected text
- Read webpage content
- Display floating AI actions
- Extract page metadata

---

## Side Panel

Provides a larger workspace.

Responsibilities:

- Long conversations
- Chat History
- Code Review
- PDF Chat

---

## Context Menu

Right-click functionality.

Examples:

```text
Right Click

↓

Explain Code

↓

Review Code

↓

Summarize Text

↓

Translate

↓

Ask DevPilot AI
```

---

# 📂 Project Folder Structure

```text
chrome-extension/

├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── popup/
│   │   ├── Popup.tsx
│   │   ├── Popup.css
│   │   └── PopupLayout.tsx
│   │
│   ├── sidepanel/
│   │   ├── SidePanel.tsx
│   │   └── SidePanel.css
│   │
│   ├── background/
│   │   └── background.ts
│   │
│   ├── content/
│   │   └── content.ts
│   │
│   ├── context-menu/
│   │   └── contextMenu.ts
│   │
│   ├── components/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │
│   ├── store/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── manifest.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

# 🛠 Technology Stack

| Layer | Technology |
|--------|------------|
| Extension | Manifest V3 |
| Framework | React |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | Zustand |
| HTTP Client | Axios |
| Icons | Lucide React |
| Markdown | react-markdown |

---

# 📄 Manifest Version 3

The extension uses **Manifest Version 3**, which replaces persistent background pages with Service Workers.

Advantages:

- Better Performance
- Improved Security
- Lower Memory Usage
- Future-proof
- Supported by Chrome, Edge, and Brave

---

# 🔑 Permissions

The extension requires the following permissions:

```json
{
  "permissions": [
    "storage",
    "activeTab",
    "contextMenus",
    "sidePanel",
    "notifications"
  ]
}
```

Host permissions:

```json
{
  "host_permissions": [
    "http://localhost:3000/*",
    "http://localhost:11434/*"
  ]
}
```

---

# 💬 Runtime Messaging

Communication Flow

```text
Popup

↓

Background Service Worker

↓

Backend API

↓

AI Response

↓

Popup UI
```

---

# 📦 Chrome Storage

The extension stores:

- User Settings
- Selected AI Model
- Theme
- Recent Chats
- Authentication Token

Storage Types:

```text
chrome.storage.local

chrome.storage.sync

chrome.storage.session
```

---

# 🎨 User Interface

The extension provides three interfaces.

## Popup

```text
+---------------------------+

 DevPilot AI

-----------------------------

 Select Model

 Prompt Input

 Ask AI

 Recent Chats

-----------------------------

 Settings

+---------------------------+
```

---

## Side Panel

```text
+-----------------------------------------+

 Sidebar

-------------------------------

 Chat

 Chat History

 Prompt Library

 Bookmarks

 Favorites

 OCR

 PDF Chat

 Website Chat

 GitHub Chat

-------------------------------

 Settings

+-----------------------------------------+
```

---

## Floating Action Button

Displayed on selected pages.

```text
        ┌───────────┐

        🤖 Ask AI

        └───────────┘
```

---

# 🔄 Message Flow

```text
User

↓

Popup

↓

Background Service Worker

↓

Backend API

↓

AI Router

↓

Ollama

↓

Response

↓

Popup
```

---

# 📋 Features Implemented

## Popup

- AI Chat
- Model Selection
- Prompt Input
- Settings

---

## Side Panel

- Long Conversations
- Chat History
- Prompt Library

---

## Content Script

- Text Selection
- Webpage Extraction
- Floating AI Button

---

## Context Menu

Options:

- Explain Code
- Explain Text
- Review Code
- Translate
- Ask AI

---

## Background Worker

Responsibilities:

- API Calls
- Authentication
- Notifications
- Runtime Events

---

# 🧪 Testing

## Load Extension

1. Open Chrome
2. Navigate to:

```text
chrome://extensions
```

3. Enable **Developer Mode**

4. Click

```text
Load Unpacked
```

5. Select

```text
chrome-extension/
```

---

## Verify

- Popup Opens
- Side Panel Opens
- Context Menu Appears
- Storage Works
- Background Worker Starts

---

# 🐞 Common Issues

## Extension Doesn't Load

Possible Causes:

- Invalid manifest.json
- Missing icons
- Build errors

---

## Popup Not Opening

Possible Causes:

- Incorrect popup path
- React build failure

---

## Content Script Not Injected

Possible Causes:

- Incorrect matches pattern
- Missing permissions

---

## Background Worker Stops

Possible Causes:

- Unhandled exceptions
- Incorrect event listeners

---

# 📁 Deliverables

By the end of this chapter, you will have:

- ✅ Chrome Extension
- ✅ Manifest V3
- ✅ React + Vite Setup
- ✅ Tailwind CSS
- ✅ Popup
- ✅ Side Panel
- ✅ Background Service Worker
- ✅ Content Script
- ✅ Context Menu
- ✅ Chrome Storage
- ✅ Runtime Messaging

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat: create chrome extension using Manifest V3"

git push origin develop
```

---

# 📝 Summary

In this chapter, we built the foundation of the DevPilot AI Chrome Extension using Manifest V3, React, Vite, and Tailwind CSS. We explored the core extension architecture, including the popup, background service worker, content script, side panel, and context menu. We also covered runtime messaging, storage, permissions, and testing.

The extension is now ready to communicate with the backend, which we will build in the next chapter.

---

# ⏭ Next Chapter

## Chapter 3 – Backend Development

In the next chapter, we will build the backend using:

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Swagger
- WebSocket
- Error Handling
- Logging
- REST APIs

The backend will serve as the central API layer connecting the Chrome Extension with Ollama, MCP servers, the vector database, and future AI services.