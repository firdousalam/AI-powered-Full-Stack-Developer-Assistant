# Chapter 2 – Chrome Extension Development Roadmap (Manifest V3)

# AI-powered Full Stack Developer Assistant

## 📖 Chapter Overview

In this chapter, we will build the **DevPilot AI Chrome Extension** using **Manifest V3**, **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

Rather than building the entire extension in a single chapter, we will divide it into **10 milestones**.

Each milestone represents a complete, working feature that can be:

- Run locally
- Tested independently
- Committed to GitHub
- Demonstrated in a YouTube episode

This incremental approach makes the project easier to understand, maintain, and extend while also creating a structured learning path for viewers.

---

# 🎯 Learning Objectives

By the end of Chapter 2, you will understand:

- Chrome Extension Architecture
- Manifest Version 3
- Popup UI Development
- Background Service Workers
- Content Scripts
- Context Menus
- Side Panel API
- Chrome Storage API
- Runtime Messaging
- Extension Build Process

---

# 🗺️ Chapter Roadmap

```
Chapter 2

│

├── Milestone 1 – Project Structure & Manifest

├── Milestone 2 – Enterprise Folder Structure

├── Milestone 3 – Popup UI

├── Milestone 4 – Background Service Worker

├── Milestone 5 – Content Script

├── Milestone 6 – Context Menu

├── Milestone 7 – Side Panel

├── Milestone 8 – Chrome Storage

├── Milestone 9 – Runtime Messaging

└── Milestone 10 – Final Polish
```

---

# Milestone 1 – Project Structure & Manifest

## 🎥 YouTube Episode 2.1

## Objective

Create the initial Chrome Extension project using **Manifest Version 3**.

---

## Topics Covered

- What is a Chrome Extension?
- Manifest Version 3
- Chrome Extension Architecture
- Extension Lifecycle
- Project Structure
- Manifest Configuration
- Icons
- Loading the Extension

---

## Folder Structure

```
chrome-extension/

├── public/
│
│   └── icons/
│       ├── icon-16.png
│       ├── icon-48.png
│       └── icon-128.png
│
├── src/
│
├── manifest.json
│
├── package.json
│
└── vite.config.ts
```

---

## Expected Result

```
Chrome

↓

chrome://extensions

↓

Developer Mode

↓

Load Unpacked

↓

Chrome Extension Appears

↓

No Manifest Errors
```

---

## Git Commit

```bash
git add .

git commit -m "feat(extension): initialize Manifest V3 project"

git push origin develop
```

---

# Milestone 2 – Enterprise Folder Structure

## 🎥 YouTube Episode 2.2

## Objective

Design a scalable enterprise folder structure before implementing features.

---

## Folder Structure

```
src/

├── assets/
├── popup/
├── sidepanel/
├── background/
├── content/
├── components/
├── hooks/
├── layouts/
├── services/
├── store/
├── types/
├── utils/
├── constants/
├── api/
└── styles/
```

---

## Folder Responsibilities

### popup/

Contains all popup-related React components.

Example

```
Popup.tsx

PopupHeader.tsx

PopupFooter.tsx

PopupLayout.tsx
```

Purpose

- Popup UI
- Model Selection
- Chat Input
- Quick Actions

---

### background/

Contains

```
background.ts

messageHandler.ts

notification.ts

auth.ts
```

Responsibilities

- API Calls
- Authentication
- Notifications
- Runtime Messaging

---

### content/

Responsible for interacting with webpages.

Example

```
content.ts

selection.ts

injectButton.ts
```

Responsibilities

- Read webpage content
- Read selected text
- Inject floating AI button

---

### sidepanel/

Contains the larger workspace.

Example

```
SidePanel.tsx

History.tsx

Bookmarks.tsx

Favorites.tsx
```

---

### components/

Reusable UI components.

Example

```
Button.tsx

Card.tsx

Modal.tsx

Loader.tsx
```

---

### hooks/

Reusable React Hooks.

Example

```
useChat.ts

useTheme.ts

useStorage.ts

useModels.ts
```

---

### services/

Business Logic.

Example

```
ai.service.ts

storage.service.ts

github.service.ts

auth.service.ts
```

---

### store/

Global State using Zustand.

Example

```
chatStore.ts

themeStore.ts

userStore.ts
```

---

### utils/

Utility functions.

Example

```
helpers.ts

formatDate.ts

validators.ts
```

---

### constants/

Application constants.

Example

```
routes.ts

models.ts

colors.ts
```

---

### api/

HTTP clients.

Example

```
axios.ts

api.ts
```

---

### styles/

Global styling.

Example

```
globals.css

tailwind.css
```

---

## Expected Result

A clean and scalable enterprise architecture.

---

## Git Commit

```bash
git commit -m "feat(extension): create scalable folder structure"
```

---

# Milestone 3 – Popup UI

## 🎥 YouTube Episode 2.3

## Objective

Build the Popup UI only.

No Backend.

No API.

No AI.

---

## UI Design

```
----------------------------------

🤖 DevPilot AI

----------------------------------

Model

[ Dropdown ]

----------------------------------

Prompt

______________________

______________________

______________________

----------------------------------

Ask AI

----------------------------------

Recent Chats

----------------------------------

Settings

----------------------------------
```

---

## Technologies

- React
- Tailwind CSS
- Lucide React

---

## Expected Result

Clicking the extension icon opens the popup.

---

## Git Commit

```bash
git commit -m "feat(extension): build popup ui"
```

---

# Milestone 4 – Background Service Worker

## 🎥 YouTube Episode 2.4

## Architecture

```
Popup

↓

Background Worker

↓

Backend

↓

Popup
```

---

## Responsibilities

- Listen for runtime messages
- Receive prompts
- Log requests
- Return mock responses

---

## Mock Response

```
Hello from Background Worker
```

---

## Expected Result

```
Popup

↓

Background Worker

↓

Popup
```

Communication works successfully.

---

## Git Commit

```bash
git commit -m "feat(extension): add background service worker"
```

---

# Milestone 5 – Content Script

## 🎥 YouTube Episode 2.5

## Objective

Inject UI into webpages.

---

## Features

Floating Button

```
🤖 Ask AI
```

Read selected text

```
window.getSelection()
```

Display selected content.

---

## Supported Websites

- google.com
- github.com
- stackoverflow.com

---

## Expected Result

Floating AI button appears on supported websites.

---

## Git Commit

```bash
git commit -m "feat(extension): implement content script"
```

---

# Milestone 6 – Context Menu

## 🎥 YouTube Episode 2.6

## Context Menu Options

- Ask DevPilot AI
- Explain
- Summarize
- Translate
- Review Code

---

## Architecture

```
Right Click

↓

Context Menu

↓

Background Worker

↓

Popup
```

---

## Expected Result

Users can right-click selected text and choose an AI action.

---

## Git Commit

```bash
git commit -m "feat(extension): implement context menu"
```

---

# Milestone 7 – Side Panel

## 🎥 YouTube Episode 2.7

## Objective

Build the Side Panel UI.

No backend.

---

## Features

- Chat History
- Bookmarks
- Favorites
- Prompt Library

---

## Expected Result

Side Panel opens successfully.

---

## Git Commit

```bash
git commit -m "feat(extension): create side panel ui"
```

---

# Milestone 8 – Chrome Storage

## 🎥 YouTube Episode 2.8

## Storage APIs

- chrome.storage.local
- chrome.storage.sync

---

## Store

- Theme
- AI Model
- Prompt
- Recent Chats

---

## Test

Restart Chrome.

Verify values remain.

---

## Git Commit

```bash
git commit -m "feat(extension): implement chrome storage"
```

---

# Milestone 9 – Runtime Messaging

## 🎥 YouTube Episode 2.9

## Architecture

```
Popup

↓

Background Worker

↓

Content Script

↓

Popup
```

---

## Objective

Implement runtime messaging.

Return mock data only.

No backend.

---

## Expected Result

Popup communicates with the Background Worker and Content Script.

---

## Git Commit

```bash
git commit -m "feat(extension): implement runtime messaging"
```

---

# Milestone 10 – Final Polish

## 🎥 YouTube Episode 2.10

## Add

- Dark Theme
- Light Theme
- Settings
- Error Pages
- Loading Spinner
- Empty States
- Toast Notifications

---

## Build

```bash
npm run build
```

---

## Load

```
dist/
```

Verify everything works correctly.

---

## Git Commit

```bash
git commit -m "feat(extension): complete chrome extension foundation"
```

---

# 🏗️ Final Chrome Extension Architecture

```
Chrome Extension

│

├── Popup

├── Background Worker

├── Content Script

├── Side Panel

├── Context Menu

├── Chrome Storage

└── Runtime Messaging

        │

        ▼

Ready for Backend (Chapter 3)
```

---

# 📁 Deliverables

At the end of Chapter 2, you will have:

- ✅ Manifest V3 Chrome Extension
- ✅ Enterprise Folder Structure
- ✅ Popup UI
- ✅ Background Service Worker
- ✅ Content Script
- ✅ Context Menu
- ✅ Side Panel
- ✅ Chrome Storage
- ✅ Runtime Messaging
- ✅ Production Build

---

# 🎬 YouTube Course Recommendation

Since this repository is intended to become a flagship GitHub project and YouTube course, each milestone should become its own dedicated episode (20–40 minutes).

Each episode should include:

1. Theory and Concepts
2. Architecture Diagram
3. Project Setup
4. Live Coding
5. Testing
6. Common Errors and Fixes
7. Git Commit
8. Preview of the Next Episode

### Benefits

- Viewers can follow along without feeling overwhelmed.
- Every episode ends with a working feature.
- Git history clearly documents the project's evolution.
- Debugging becomes easier by comparing against previous milestones.
- Contributors can understand the project incrementally.
- The repository evolves naturally from a basic Chrome Extension into a full AI-powered developer assistant.

This milestone-based approach creates a stronger learning experience and a more maintainable open-source project than attempting to build the entire extension in a single chapter.