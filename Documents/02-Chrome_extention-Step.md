Chapter 2 – Chrome Extension Development (Implementation Guide)
🎯 Goal

At the end of this chapter, we should have a fully working Chrome Extension that can:

Load in Chrome
Open a React popup
Open a Side Panel
Run a Background Service Worker
Inject a Content Script
Create Context Menus
Store data
Send runtime messages
Be ready to connect to our backend in Chapter 3
Estimated Time
Module	Time
Project Setup	30 min
React + Vite	45 min
Tailwind	20 min
Manifest V3	30 min
Popup	1 hr
Background	45 min
Content Script	1 hr
Context Menu	45 min
Side Panel	1 hr
Chrome Storage	45 min
Runtime Messaging	1 hr
Testing	30 min

Total: ~8–10 hours (or about 3–4 YouTube episodes).

Step 1 – Create the Project
Objective

Create a React + Vite + TypeScript project that will become the Chrome Extension.

Commands
mkdir AI-powered-Full-Stack-Developer-Assistant

cd AI-powered-Full-Stack-Developer-Assistant

Create the extension:

npm create vite@latest chrome-extension

Choose:

React

↓

TypeScript

Install dependencies:

cd chrome-extension

npm install
Verify

Run:

npm run dev

You should see:

http://localhost:5173
Step 2 – Install Required Packages

Install Tailwind:

npm install tailwindcss @tailwindcss/vite

Install routing:

npm install react-router-dom

Install Zustand:

npm install zustand

Install Axios:

npm install axios

Install Icons:

npm install lucide-react

Install Markdown:

npm install react-markdown

Developer tools:

npm install -D @types/chrome
Verify

Check:

npm list

You should see all installed packages.

Step 3 – Configure Tailwind CSS

Configure Vite:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ]
})

Import Tailwind:

@import "tailwindcss";
Verify

Create:

<div className="text-red-500 text-4xl">
Hello DevPilot
</div>

If the text is red, Tailwind is working.

Step 4 – Create Folder Structure

Create folders:

src

popup

background

content

sidepanel

components

hooks

services

store

types

utils

assets
Verify

Your folder should look like:

src/

popup/

background/

content/

sidepanel/

services/

hooks/

store/

utils/
Step 5 – Create Manifest V3

Create

manifest.json

Include:

Extension name
Version
Icons
Popup
Background
Content Script
Permissions
Host Permissions
Verify

Load the extension.

Chrome should not show any Manifest errors.

Step 6 – Configure Vite for Extension Build

React normally produces:

index.html

Chrome Extension needs:

popup.html

sidepanel.html

Configure Vite to build multiple entry points.

Output:

dist/

popup.html

sidepanel.html

background.js

content.js
Verify

Run:

npm run build

Check:

dist/
Step 7 – Build Popup UI

Create:

Popup.tsx

Add:

DevPilot Logo

↓

Model Dropdown

↓

Prompt Textarea

↓

Send Button

↓

Recent Chats

↓

Settings
Verify

Load Extension

Click icon

Popup appears.

Step 8 – Background Service Worker

Create:

background.ts

Responsibilities:

Receive Messages
API Calls
Notifications
Context Menus
Verify

Chrome

Extensions

↓

Inspect Service Worker

No errors.

Step 9 – Content Script

Inject:

Floating Button

↓

Selected Text

↓

Open AI
Verify

Open:

google.com

Floating AI button appears.

Step 10 – Context Menu

Create:

Ask DevPilot AI

Explain Code

Review Code

Translate
Verify

Right Click

Menu appears.

Step 11 – Side Panel

Create:

Chat Window

History

Bookmarks

Favorites
Verify

Open Side Panel.

Step 12 – Chrome Storage

Store:

Theme

↓

Model

↓

Recent Chat

↓

Settings
Verify

Inspect:

chrome.storage.local
Step 13 – Runtime Messaging

Flow:

Popup

↓

Background

↓

Content Script

↓

Popup
Verify

Click:

Send

↓

Background Receives Message

↓

Popup Updates
Step 14 – Theme Support

Create:

Dark

Light

System

Store in:

chrome.storage.sync
Verify

Restart Chrome.

Theme remains.

Step 15 – Settings Page

Add:

Default Model

Temperature

Notifications

Backend URL
Verify

Settings persist.

Step 16 – Error Handling

Handle:

No Internet
Backend Down
Invalid Response
Timeout
Missing Permissions
Verify

Stop backend.

Popup should show:

Unable to connect.
Step 17 – Testing

Test:

Popup
Background
Content Script
Side Panel
Context Menu
Storage
Messaging

Everything should work.

Step 18 – GitHub Commit
git add .

git commit -m "feat: complete chrome extension foundation"

git push origin develop
📂 Final Folder Structure
chrome-extension/

src/

├── popup/

├── sidepanel/

├── background/

├── content/

├── components/

├── hooks/

├── services/

├── store/

├── utils/

├── assets/

├── App.tsx

└── main.tsx

manifest.json

vite.config.ts

package.json
🎥 YouTube Episode Breakdown

Instead of trying to cover this entire chapter in one video, I'd split it into a mini-series:

Episode	Topic
2.1	Introduction & Chrome Extension Architecture
2.2	React + Vite + TypeScript Setup
2.3	Tailwind CSS & Project Structure
2.4	Manifest V3 Deep Dive
2.5	Building the Popup UI
2.6	Background Service Worker
2.7	Content Script & DOM Interaction
2.8	Context Menus & Runtime Messaging
2.9	Side Panel & Chrome Storage
2.10	Testing, Debugging & Packaging
My recommendation for your course

Given your goal of creating a professional YouTube series and a high-quality GitHub repository, I would go one step further than these Markdown files.

I recommend turning every chapter into a workbook with:

Clear prerequisites
Expected output screenshots
Step-by-step coding tasks
Full source code explanations
Common errors and fixes
Assignments
Interview questions
Git checkpoints
End-of-chapter exercises

This would make the repository valuable not only as a reference but also as a complete learning path for developers following your course. I think it would significantly increase the project's usefulness and help distinguish it from typical tutorial repositories.