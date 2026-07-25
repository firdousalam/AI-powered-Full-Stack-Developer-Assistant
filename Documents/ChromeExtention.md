# Episode 1 – Chrome Extension (03-Chrome-Extension.md)
🎯 Goal
Build the Chrome Extension using Manifest V3, React, Vite, Tailwind CSS, and Zustand.

# By the end of this episode, users should have a working extension that opens a popup, side panel, and communicates with the backend.

Learning Objectives
What is a Chrome Extension?
Manifest V3
Service Worker
Content Script
Popup
Side Panel
Context Menu
Chrome Storage API
Message Passing
Extension Lifecycle
Architecture
Diagram



# Folder Structure
text


chrome-extension/
├── public/
├── src/
│   ├── popup/
│   ├── sidepanel/
│   ├── options/
│   ├── background/
│   ├── content/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── utils/
├── manifest.json
├── vite.config.ts
├── package.json
└── tsconfig.json

# Features

Popup
AI Chat
Model Selector
Settings
History
Side Panel
Long Conversations
Markdown Rendering
Code Highlighting
Content Script
Read selected text
Explain code
Summarize page
Translate
Fix bugs
Context Menu
Right Click $\rightarrow$

Explain with DevPilot
Review Code
Generate README
Fix Bug
Optimize
Translate
State Management
Use Zustand.

ChatStore
SettingsStore
ModelStore
HistoryStore
ThemeStore
Deliverables
Manifest V3 setup
React + Vite integration
Tailwind configuration
Zustand stores
Popup and Side Panel UI
Context Menu functionality
Chrome Storage persisting
Message Passing implementation