Milestone 3 – Popup UI

Episode 2.3

Now create

Popup.tsx

Only build UI.

No backend.

No API.

No AI.

Design

----------------------------------

🤖 Zeba AI

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

Use

React
Tailwind
Lucide Icons

Expected Result

Popup opens.

Git

git commit -m "feat(extension): build popup ui"
Milestone 4 – Background Service Worker

Episode 2.4

Architecture

Popup

↓

Background

↓

Backend

↓

Popup

Create

background.ts

Responsibilities

Listen for messages
Receive prompt
Log request
Return mock response

No backend yet.

Return

Hello from Background Worker

Expected Result

Popup

↓

Background

↓

Popup

works.

Milestone 5 – Content Script

Episode 2.5

Inject

Floating Button

🤖 Ask AI

Also

Read

window.getSelection()

Show

Selected Text

Expected Result

Works on

google.com
github.com
stackoverflow.com
Milestone 6 – Context Menu

Episode 2.6

Create

Ask Zeba AI

Explain

Summarize

Translate

Review Code

Architecture

Right Click

↓

Context Menu

↓

Background

↓

Popup
Milestone 7 – Side Panel

Episode 2.7

Only UI.

No backend.

History

Bookmarks

Favorites

Prompt Library

Expected Result

Side Panel opens.

Milestone 8 – Storage

Episode 2.8

Implement

chrome.storage.local

chrome.storage.sync

Store

Theme

↓

Model

↓

Prompt

↓

Recent Chats

Test

Restart Browser

↓

Values remain
Milestone 9 – Runtime Messaging

Episode 2.9

Implement

Popup

↓

Background

↓

Content Script

↓

Popup

No backend.

Return mock data.

Milestone 10 – Polish

Episode 2.10

Add

Theme
Settings
Error Pages
Loading Spinner
Empty State
Toast Messages

Finally

npm run build

Load

dist

Everything works.

Git

git commit -m "feat(extension): complete chrome extension foundation"
Final Architecture
Chrome Extension

│

├── Popup

├── Background

├── Content Script

├── Side Panel

├── Context Menu

├── Storage

└── Runtime Messaging

        │

        ▼

Ready for Backend (Chapter 3)
My recommendation for your YouTube course

Since you're targeting developers and building a flagship GitHub project, I would make each milestone its own YouTube episode (about 20–40 minutes). Every episode should end with a working feature, a Git commit, and a quick preview of the next episode.

That approach has several advantages:

Viewers can follow along without getting overwhelmed.
Your Git history clearly reflects the evolution of the project.
If something breaks later, you can easily compare against an earlier working milestone.
The repository becomes much easier for contributors to understand.

I think this incremental approach will make both the course and the GitHub project much stronger than trying to implement the entire extension in one long chapter.

Provide details code for this Milestone 3 – Popup UI

Episode 2.3

Now create

Popup.tsx

Only build UI.

No backend.

No API.

No AI.

Design

----------------------------------

🤖 Zeba AI

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

Use

React
Tailwind
Lucide Icons

Expected Result

Popup opens.

Git

git commit -m "feat(extension): build popup ui"

Yes. Since this is a production-grade project, I would not build everything inside a single Popup.tsx.

Instead, let's build it like an enterprise React application from Day 1.

Folder Structure
src/
├── popup/
│   ├── Popup.tsx
│   ├── PopupLayout.tsx
│   ├── PopupHeader.tsx
│   ├── PopupFooter.tsx
│   └── index.ts
│
├── components/
│   ├── ModelSelector.tsx
│   ├── PromptInput.tsx
│   ├── AskButton.tsx
│   ├── RecentChats.tsx
│   └── SettingsButton.tsx
│
├── assets/
├── styles/
├── App.tsx
└── main.tsx

This structure will scale much better as we add AI features in later chapters.

Step 1 – Install Lucide Icons
npm install lucide-react
Step 2 – Create PopupLayout.tsx

src/popup/PopupLayout.tsx

import { ReactNode } from "react";

interface PopupLayoutProps {
  children: ReactNode;
}

const PopupLayout = ({ children }: PopupLayoutProps) => {
  return (
    <div className="w-[380px] min-h-[600px] bg-gray-100">
      {children}
    </div>
  );
};

export default PopupLayout;
Step 3 – Popup Header

src/popup/PopupHeader.tsx

import { Bot } from "lucide-react";

const PopupHeader = () => {
  return (
    <header className="flex items-center gap-3 bg-blue-600 text-white p-4">
      <Bot size={28} />

      <div>
        <h1 className="text-lg font-bold">
          Zeba AI
        </h1>

        <p className="text-xs">
          AI Full Stack Developer Assistant
        </p>
      </div>
    </header>
  );
};

export default PopupHeader;
Step 4 – Model Selector

src/components/ModelSelector.tsx

const ModelSelector = () => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">
        AI Model
      </label>

      <select className="w-full border rounded-lg p-2">
        <option>Qwen2.5-Coder 7B</option>
        <option>Llama 3.1</option>
        <option>Gemma 3</option>
        <option>DeepSeek</option>
      </select>
    </div>
  );
};

export default ModelSelector;
Step 5 – Prompt Input

src/components/PromptInput.tsx

const PromptInput = () => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">
        Prompt
      </label>

      <textarea
        rows={6}
        placeholder="Ask Zeba AI..."
        className="w-full border rounded-lg p-3 resize-none"
      />
    </div>
  );
};

export default PromptInput;
Step 6 – Ask Button

src/components/AskButton.tsx

import { Send } from "lucide-react";

const AskButton = () => {
  return (
    <button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 flex justify-center items-center gap-2"
    >
      <Send size={18} />

      Ask AI
    </button>
  );
};

export default AskButton;
Step 7 – Recent Chats

src/components/RecentChats.tsx

import { MessageSquare } from "lucide-react";

const RecentChats = () => {
  return (
    <div className="mt-6">
      <h2 className="font-semibold mb-3">
        Recent Chats
      </h2>

      <div className="border rounded-lg p-3 flex gap-3 items-center">
        <MessageSquare size={18} />

        <span className="text-sm text-gray-600">
          No recent chats
        </span>
      </div>
    </div>
  );
};

export default RecentChats;
Step 8 – Settings Button

src/components/SettingsButton.tsx

import { Settings } from "lucide-react";

const SettingsButton = () => {
  return (
    <button className="w-full mt-6 border rounded-lg p-3 flex justify-center items-center gap-2">
      <Settings size={18} />

      Settings
    </button>
  );
};

export default SettingsButton;
Step 9 – Popup Footer

src/popup/PopupFooter.tsx

const PopupFooter = () => {
  return (
    <footer className="text-center text-xs text-gray-500 py-4">
      Zeba AI v1.0.0
    </footer>
  );
};

export default PopupFooter;
Step 10 – Popup.tsx

src/popup/Popup.tsx

import PopupLayout from "./PopupLayout";
import PopupHeader from "./PopupHeader";
import PopupFooter from "./PopupFooter";

import ModelSelector from "../components/ModelSelector";
import PromptInput from "../components/PromptInput";
import AskButton from "../components/AskButton";
import RecentChats from "../components/RecentChats";
import SettingsButton from "../components/SettingsButton";

const Popup = () => {
  return (
    <PopupLayout>

      <PopupHeader />

      <div className="p-5">

        <ModelSelector />

        <PromptInput />

        <AskButton />

        <RecentChats />

        <SettingsButton />

      </div>

      <PopupFooter />

    </PopupLayout>
  );
};

export default Popup;
Step 11 – App.tsx

Replace the default Vite component with:

import Popup from "./popup/Popup";

function App() {
  return <Popup />;
}

export default App;
Expected UI
+--------------------------------------+

🤖 Zeba AI

AI Full Stack Developer Assistant

----------------------------------------

AI Model

┌────────────────────────────┐

Qwen2.5-Coder 7B ▼

└────────────────────────────┘

----------------------------------------

Prompt

┌────────────────────────────┐

Ask Zeba AI...

│

│

│

└────────────────────────────┘

----------------------------------------

[ 🚀 Ask AI ]

----------------------------------------

Recent Chats

📝 No recent chats

----------------------------------------

[ ⚙ Settings ]

----------------------------------------

Zeba AI v1.0.0

+--------------------------------------+