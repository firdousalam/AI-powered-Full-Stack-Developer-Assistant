# 07-Milestone-SidePanel.md

# Milestone 7 – Side Panel UI

## 🎥 YouTube Episode 2.7

**Project:** DevPilot AI – AI Full Stack Developer Assistant

**Chapter:** Chrome Extension Development (Manifest V3)

**Milestone:** Side Panel UI

---

# 📖 Chapter Overview

In previous milestones, we built:

- Popup UI
- Background Service Worker
- Content Script
- Context Menu

The popup is useful for quick interactions, but it has one major limitation—it closes whenever the user clicks outside the extension.

For long AI conversations, code reviews, PDF chat, GitHub chat, and documentation search, we need a larger and persistent workspace.

Chrome's **Side Panel API** solves this problem.

In this milestone, we will build a professional Side Panel UI that will become the primary interface of DevPilot AI.

At this stage, we will only create the **UI**.

There is:

- ❌ No Backend
- ❌ No AI
- ❌ No Database

Only a beautiful and scalable interface.

---

# 🎯 Learning Objectives

After completing this milestone, you will understand:

- Chrome Side Panel API
- Manifest V3 Side Panel
- React Side Panel
- Chrome Extension Layout
- Sidebar Navigation
- Component-Based Design
- Tailwind CSS Layout
- Responsive UI

---

# 🏗 System Architecture

```
                    Chrome Browser

        ┌─────────────────────────────────────┐
        │                                     │
        │        DevPilot AI Extension        │
        │                                     │
        ├─────────────────────────────────────┤
        │ Popup                              │
        │ Background Worker                  │
        │ Content Script                     │
        │ Context Menu                       │
        │ Side Panel                         │
        └─────────────────────────────────────┘
                         │
                         ▼
                  Node Backend (Later)
                         │
                         ▼
               Ollama / MCP / MongoDB
```

---

# Why Side Panel?

Popup Limitations

```
Click Extension

↓

Popup Opens

↓

Click Anywhere

↓

Popup Closes
```

Problem

Long conversations become impossible.

Chrome Side Panel

```
Open Side Panel

↓

Always Visible

↓

Continue Chat

↓

Switch Tabs

↓

Panel Remains Open
```

Perfect for AI Assistants.

---

# Side Panel Features

During this milestone we will build the UI for:

```
Chat

History

Bookmarks

Favorites

Prompt Library

Settings
```

Backend integration will come in later chapters.

---

# Final UI

```
+------------------------------------------------+

🤖 DevPilot AI

-----------------------------------------------

🔍 Search

-----------------------------------------------

💬 Chat

📜 History

⭐ Favorites

🔖 Bookmarks

📚 Prompt Library

⚙ Settings

-----------------------------------------------

Welcome to DevPilot AI

Start chatting with AI...

-----------------------------------------------

Footer

Version 1.0.0

+------------------------------------------------+
```

---

# Folder Structure

```
chrome-extension/

src/

├── sidepanel/
│
│     SidePanel.tsx
│
│     SidePanelLayout.tsx
│
│     SidePanelHeader.tsx
│
│     SidePanelSidebar.tsx
│
│     SidePanelContent.tsx
│
│     SidePanelFooter.tsx
│
├── components/
│
├── assets/
│
└── styles/
```

---

# Component Architecture

```
SidePanel

│

├── Header

├── Sidebar

├── Content

└── Footer
```

Each component has only one responsibility.

---

# Step 1 – Create Folder

Create

```
src/

sidepanel/
```

Inside create

```
SidePanel.tsx

SidePanelHeader.tsx

SidePanelSidebar.tsx

SidePanelContent.tsx

SidePanelFooter.tsx

SidePanelLayout.tsx
```

---

# Step 2 – Install Icons

We'll use Lucide React.

```
npm install lucide-react
```

Verify

```
npm list lucide-react
```

---

# Step 3 – Create SidePanel.tsx

```tsx
import SidePanelLayout from "./SidePanelLayout";

export default function SidePanel() {

    return (

        <SidePanelLayout />

    );

}
```

Purpose

Acts as the entry point for the Side Panel.

---

# Step 4 – Create Layout

File

```
SidePanelLayout.tsx
```

Structure

```tsx
import SidePanelHeader from "./SidePanelHeader";
import SidePanelSidebar from "./SidePanelSidebar";
import SidePanelContent from "./SidePanelContent";
import SidePanelFooter from "./SidePanelFooter";

export default function SidePanelLayout() {

    return (

        <div className="flex h-screen">

            <SidePanelSidebar />

            <div className="flex flex-col flex-1">

                <SidePanelHeader />

                <SidePanelContent />

                <SidePanelFooter />

            </div>

        </div>

    );

}
```

Result

```
Sidebar

Header

Content

Footer
```

---

# Step 5 – Create Header

```
SidePanelHeader.tsx
```

```tsx
import { Bot } from "lucide-react";

export default function SidePanelHeader() {

    return (

        <header className="flex items-center gap-3 border-b p-4">

            <Bot size={28} />

            <h1 className="text-xl font-bold">

                DevPilot AI

            </h1>

        </header>

    );

}
```

Result

```
🤖 DevPilot AI
```

---

# Step 6 – Create Sidebar

File

```
SidePanelSidebar.tsx
```

Import Icons

```tsx
import {

MessageSquare,

History,

Bookmark,

Star,

Library,

Settings

} from "lucide-react";
```

Create Menu

```tsx
const menu=[

"Chat",

"History",

"Bookmarks",

"Favorites",

"Prompt Library",

"Settings"

];
```

Render Sidebar

```tsx
export default function SidePanelSidebar(){

return(

<aside className="w-64 border-r">

Sidebar

</aside>

);

}
```

Later we'll replace this with dynamic components.

---

# Step 7 – Sidebar Menu

Expected UI

```
💬 Chat

📜 History

⭐ Favorites

🔖 Bookmarks

📚 Prompt Library

⚙ Settings
```

Only UI.

No routing.

---

# Step 8 – Create Content Area

```
SidePanelContent.tsx
```

```tsx
export default function SidePanelContent(){

return(

<div className="flex-1 p-6">

<h2 className="text-2xl font-bold">

Welcome to DevPilot AI

</h2>

<p>

Start chatting with your AI assistant.

</p>

</div>

);

}
```

Result

```
Welcome to DevPilot AI

Start chatting...
```

---

# Step 9 – Footer

```
SidePanelFooter.tsx
```

```tsx
export default function SidePanelFooter(){

return(

<footer className="border-t p-3 text-center text-sm">

Version 1.0.0

</footer>

);

}
```

---

# Step 10 – Search Box

Inside Header

```tsx
<input

placeholder="Search..."

className="border rounded-md px-3 py-2 w-full"

/>
```

Result

```
🔍 Search...
```

No search logic yet.

---

# Step 11 – Prompt Library Card

Content Area

```
Prompt Library

• Explain Code

• Review PR

• Kubernetes Expert

• Docker Expert

• Node.js Expert
```

Static data.

---

# Step 12 – Bookmarks Card

Create

```
Bookmarks

No Bookmarks Yet
```

---

# Step 13 – Favorites Card

```
Favorites

No Favorites Yet
```

---

# Step 14 – Chat History Card

```
Recent Chats

Docker Compose

Kubernetes

Node.js

React

MongoDB
```

Static data.

---

# Step 15 – Responsive Layout

Tailwind

```css
flex

flex-col

md:flex-row

overflow-hidden
```

Verify

Resize browser.

Everything adjusts correctly.

---

# Step 16 – Manifest Configuration

Update

```
manifest.json
```

Add

```json
"permissions":[
    "sidePanel"
]
```

Add

```json
"side_panel": {
    "default_path": "sidepanel.html"
}
```

---

# Step 17 – Create sidepanel.html

In your Vite multi-page setup, create a dedicated entry page.

```
sidepanel.html
```

Example

```html
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>DevPilot AI</title>

<script type="module" src="/src/sidepanel/main.tsx"></script>

</head>

<body>

<div id="root"></div>

</body>

</html>
```

---

# Step 18 – Create main.tsx

```
src/sidepanel/main.tsx
```

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import "../index.css";

import SidePanel from "./SidePanel";

ReactDOM.createRoot(

document.getElementById("root")!

).render(

<React.StrictMode>

<SidePanel />

</React.StrictMode>

);
```

---

# Step 19 – Configure Vite

Ensure Vite builds multiple pages.

```
popup.html

sidepanel.html

background.ts

content.ts
```

After build

```
dist/

popup.html

sidepanel.html

assets/
```

---

# Step 20 – Build

```
npm run build
```

Verify

```
dist/

popup.html

sidepanel.html
```

---

# Step 21 – Load Extension

```
chrome://extensions
```

Reload Extension.

---

# Step 22 – Open Side Panel

Click the extension.

Open Side Panel.

Expected

```
+--------------------------------------+

🤖 DevPilot AI

Search

--------------------------------------

Chat

History

Bookmarks

Favorites

Prompt Library

Settings

--------------------------------------

Welcome to DevPilot AI

Version 1.0.0

+--------------------------------------+
```

---

# Testing Checklist

| Test | Expected |
|--------|----------|
| Side Panel Opens | ✅ |
| Header Visible | ✅ |
| Sidebar Visible | ✅ |
| Search Box Visible | ✅ |
| Footer Visible | ✅ |
| No Console Errors | ✅ |
| Responsive Layout | ✅ |

---

# Common Issues

## Side Panel Doesn't Open

Check

```
manifest.json
```

Verify

```json
"permissions":[
"sidePanel"
]
```

---

## Blank Side Panel

Check

```
sidepanel.html
```

Verify

```
<div id="root"></div>
```

---

## React Doesn't Render

Verify

```
main.tsx
```

renders

```
<SidePanel />
```

---

## Build Doesn't Generate sidepanel.html

Update

```
vite.config.ts
```

to include

```
sidepanel.html
```

as an input entry.

---

# Folder Structure After Milestone 7

```
chrome-extension/

src/

├── popup/

├── sidepanel/
│
│   SidePanel.tsx
│
│   SidePanelLayout.tsx
│
│   SidePanelHeader.tsx
│
│   SidePanelSidebar.tsx
│
│   SidePanelContent.tsx
│
│   SidePanelFooter.tsx
│
├── background/

├── content/

├── context-menu/

├── services/

├── hooks/

├── store/

├── utils/

├── assets/

└── styles/
```

---

# Deliverables

By the end of this milestone you will have:

- ✅ Chrome Side Panel
- ✅ React Side Panel UI
- ✅ Sidebar Navigation
- ✅ Header
- ✅ Search Box
- ✅ Prompt Library UI
- ✅ Chat History UI
- ✅ Favorites UI
- ✅ Bookmarks UI
- ✅ Responsive Layout

---

# Git Commit

```bash
git add .

git commit -m "feat(extension): create side panel ui"

git push origin develop
```

---

# What's Next?

In **Milestone 8**, we will implement persistent storage using the Chrome Storage API.

Topics include:

- chrome.storage.local
- chrome.storage.sync
- Theme Persistence
- Model Selection
- Recent Chats
- User Preferences

By the end of the next milestone, your extension will remember user settings even after restarting Chrome.