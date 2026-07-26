# Chapter 2 – Chrome Extension Development

# Milestone 8 – Chrome Storage

## 🎥 YouTube Episode 2.8

# Implement Chrome Storage API using Manifest V3

---

# 📖 Chapter Overview

In this milestone, we will implement the Chrome Storage API for DevPilot AI.

Until now, our Chrome extension could:

- Display a Popup
- Run a Background Service Worker
- Inject a Content Script
- Show a Floating AI Button
- Display Context Menus
- Open the Side Panel

However, every time the extension restarted, all user preferences were lost.

Chrome provides a built-in storage mechanism that allows extensions to persist data even after the browser is restarted.

By the end of this milestone, the extension will remember:

- Theme
- Selected AI Model
- Prompt
- Recent Chats
- User Settings

This milestone introduces one of the most important Chrome Extension APIs.

---

# 🎯 Learning Objectives

After completing this milestone, you will understand:

- Chrome Storage API
- chrome.storage.local
- chrome.storage.sync
- Saving User Preferences
- Loading Stored Data
- Removing Stored Data
- Clearing Storage
- Storage Best Practices
- Runtime Persistence

---

# Final Architecture

```
                Chrome Extension

        Popup
            │
            ▼

     chrome.storage.local

            │
            ▼

     Persistent User Data

            ▲

     chrome.storage.sync

            │

     User Preferences
```

---

# Folder Structure

```
chrome-extension/

src/

├── popup/
│     Popup.tsx
│
├── services/
│     storage.service.ts
│
├── hooks/
│     useStorage.ts
│
├── types/
│     storage.types.ts
│
├── utils/
│
└── background/
```

---

# Why Chrome Storage?

Without storage:

```
User

↓

Select GPT-4

↓

Restart Chrome

↓

Selection Lost
```

With Storage

```
User

↓

Select GPT-4

↓

Store

↓

Restart Chrome

↓

GPT-4 Restored
```

---

# Chrome Storage Types

Chrome provides three storage areas.

## chrome.storage.local

Stored on the local machine.

Characteristics

- Large storage
- Fast
- Private
- Not synchronized

Perfect for

- Chat History
- Cache
- AI Responses

---

## chrome.storage.sync

Automatically synchronizes across Chrome browsers.

Characteristics

- Small storage
- Cloud synchronized

Perfect for

- Theme
- Settings
- Preferred Model

---

## chrome.storage.session

Temporary storage.

Removed when Chrome closes.

Useful for

- Temporary Tokens
- Session State

---

# Data We'll Store

```
Theme

↓

Dark

↓

Model

↓

llama3

↓

Prompt

↓

Explain Kubernetes

↓

Recent Chats

↓

History
```

---

# Step 1 – Create Storage Service

Create

```
src/services/storage.service.ts
```

---

# Step 2 – Save Data

```ts
export async function saveData(key: string, value: unknown) {
    await chrome.storage.local.set({
        [key]: value
    });
}
```

Explanation

```
chrome.storage.local

↓

set()

↓

Save

↓

Done
```

---

# Step 3 – Read Data

```ts
export async function getData(key: string) {

    const result = await chrome.storage.local.get(key);

    return result[key];

}
```

Flow

```
Storage

↓

Read

↓

Return Value
```

---

# Step 4 – Remove Data

```ts
export async function removeData(key: string) {

    await chrome.storage.local.remove(key);

}
```

---

# Step 5 – Clear Storage

```ts
export async function clearStorage() {

    await chrome.storage.local.clear();

}
```

---

# Step 6 – Create Storage Keys

Create

```
src/types/storage.types.ts
```

```ts
export const STORAGE_KEYS = {

    THEME: "theme",

    MODEL: "model",

    PROMPT: "prompt",

    RECENT_CHATS: "recentChats"

} as const;
```

Benefits

- No hardcoded strings
- Easy refactoring
- Type safety

---

# Step 7 – Save Theme

Example

```ts
await saveData(

    STORAGE_KEYS.THEME,

    "dark"

);
```

Storage

```
theme

↓

dark
```

---

# Step 8 – Save Selected AI Model

```ts
await saveData(

    STORAGE_KEYS.MODEL,

    "llama3"

);
```

---

# Step 9 – Save Prompt

```ts
await saveData(

    STORAGE_KEYS.PROMPT,

    "Explain Docker Compose"

);
```

---

# Step 10 – Save Recent Chats

Example

```ts
await saveData(

    STORAGE_KEYS.RECENT_CHATS,

    [

        "Explain Kubernetes",

        "Review React Code"

    ]

);
```

---

# Step 11 – Load Stored Data

Example

```ts
const theme = await getData(

    STORAGE_KEYS.THEME

);

console.log(theme);
```

Console

```
dark
```

---

# Step 12 – Create React Hook

Create

```
src/hooks/useStorage.ts
```

```ts
import { useEffect, useState } from "react";

import { getData } from "../services/storage.service";

export function useStorage(key: string) {

    const [value, setValue] = useState<unknown>();

    useEffect(() => {

        async function load() {

            const data = await getData(key);

            setValue(data);

        }

        load();

    }, [key]);

    return value;

}
```

Advantages

- Reusable
- Clean
- React Friendly

---

# Step 13 – Use Storage in Popup

Example

```ts
const theme = useStorage(

    STORAGE_KEYS.THEME

);

console.log(theme);
```

---

# Step 14 – Save Theme from Popup

Example

```ts
<button

onClick={()=>

saveData(

STORAGE_KEYS.THEME,

"dark"

)

}

>

Dark Mode

</button>
```

---

# Step 15 – Use chrome.storage.sync

Instead of

```ts
chrome.storage.local.set()
```

Use

```ts
chrome.storage.sync.set()
```

Example

```ts
await chrome.storage.sync.set({

    theme: "dark"

});
```

Useful for

- Theme
- Preferred AI Model
- Language
- User Preferences

---

# Step 16 – Listen for Storage Changes

```ts
chrome.storage.onChanged.addListener(

(changes, area)=>{

console.log(changes);

console.log(area);

});
```

Example Output

```
theme

↓

light

↓

dark
```

Useful for

- Real-time UI updates
- Theme switching
- Multiple extension pages

---

# Step 17 – Verify Storage

Open

```
chrome://extensions
```

↓

Inspect Popup

↓

Application

↓

Storage

↓

Extension Storage

Verify

```
theme

↓

dark

model

↓

llama3

prompt

↓

Explain Docker

recentChats

↓

Array
```

---

# Step 18 – Restart Chrome

Restart the browser.

Reopen Popup.

Verify

```
Theme

↓

Still Dark

Model

↓

Still llama3

Prompt

↓

Restored
```

Storage persists successfully.

---

# Step 19 – Common Issues

## Data Not Saving

Possible Causes

- Missing "storage" permission
- Extension not reloaded

Verify

```json
"permissions": [

"storage"

]
```

---

## Data Always Undefined

Ensure

```ts
await getData(...)
```

is used.

Remember

Storage API is asynchronous.

---

## Changes Not Visible

Reload the extension after rebuilding.

```
npm run build
```

↓

```
chrome://extensions
```

↓

Reload

---

## Sync Storage Not Working

Verify

```ts
chrome.storage.sync
```

instead of

```ts
chrome.storage.local
```

---

# Best Practices

✅ Use constants for keys

✅ Wrap storage in service classes

✅ Avoid hardcoded strings

✅ Store only required data

✅ Use sync only for preferences

✅ Use local for chat history

---

# Folder Structure After Milestone 8

```
chrome-extension/

src/

├── popup/
│
├── background/
│
├── content/
│
├── sidepanel/
│
├── services/
│     storage.service.ts
│
├── hooks/
│     useStorage.ts
│
├── types/
│     storage.types.ts
│
├── utils/
│
└── assets/
```

---

# Deliverables

By the end of this milestone you will have:

- ✅ chrome.storage.local
- ✅ chrome.storage.sync
- ✅ Persistent Theme
- ✅ Persistent AI Model
- ✅ Persistent Prompt
- ✅ Recent Chat Storage
- ✅ React Storage Hook
- ✅ Storage Service Layer
- ✅ Runtime Persistence

---

# Git Commit

```bash
git add .

git commit -m "feat(extension): implement chrome storage"

git push origin develop
```

---

# Summary

In this milestone, we implemented Chrome's Storage API to persist user preferences and application data. We learned how to use `chrome.storage.local` for local persistence and `chrome.storage.sync` for synchronized settings. We also created a reusable storage service and a custom React hook, making our code more modular and maintainable.

The DevPilot AI extension can now remember user preferences such as theme, AI model, prompts, and recent chats even after Chrome is restarted, providing a much better user experience.

The next milestone will build on this foundation by implementing Runtime Messaging so the Popup, Background Service Worker, Content Script, and Side Panel can communicate seamlessly.


## Updated ##

# Chapter 2 – Milestone 8: Chrome Storage

# 🎥 YouTube Episode 2.8

## Project
**AI-powered Full Stack Developer Assistant**

---

# Objective

In this milestone we will learn how to use the **Chrome Storage API** to persist extension data.

Unlike React state, data stored in Chrome Storage remains available even after:

- Closing the Popup
- Restarting Chrome
- Reloading the Extension

By the end of this milestone our extension will remember:

- Theme
- AI Model
- Prompt
- Recent Chats

---

# Learning Objectives

In this milestone you will learn

- chrome.storage.local
- chrome.storage.sync
- Async Storage API
- Custom React Hook
- Service Layer Architecture
- Constants
- Best Practices

---

# Storage Architecture

```

Popup

↓

useStorage Hook

↓

Storage Service

↓

Chrome Storage API

↓

chrome.storage.local
or
chrome.storage.sync

```

---

# Folder Structure

```

src/

├── constants/
│     storage.constants.ts
│
├── services/
│     storage.service.ts
│
├── hooks/
│     useStorage.ts
│
├── popup/
│     Popup.tsx
│
├── background/
│     background.ts

```

---

# Step 1 – Why Chrome Storage?

Normally,

```
const [theme, setTheme] = useState("dark");
```

works only while the popup is open.

After closing the popup,

everything is lost.

Chrome Storage allows data to persist permanently.

---

# Step 2 – Local vs Sync Storage

Chrome provides two storage mechanisms.

## chrome.storage.local

Stores data only on the current computer.

Perfect for

- Chat History
- Cached AI Responses
- Temporary Data

---

## chrome.storage.sync

Synchronizes data across Chrome browsers when the user is signed in.

Perfect for

- Theme
- Preferred AI Model
- Language
- User Preferences

---

# Step 3 – Create Storage Constants

Create

```
src/constants/storage.constants.ts
```

```ts
export const STORAGE_KEYS = {

    THEME: "theme",

    MODEL: "model",

    PROMPT: "prompt",

    RECENT_CHATS: "recentChats"

};
```

### Why?

Avoid writing

```ts
"theme"

"Theme"

"THEME"

"themes"
```

Hardcoded strings often lead to bugs.

Using constants makes your code safer.

---

# Step 4 – Create Storage Service

Create

```
src/services/storage.service.ts
```

```ts
import { STORAGE_KEYS } from "../constants/storage.constants";

export async function saveData(key: string, value: unknown) {

    await chrome.storage.local.set({

        [key]: value

    });

}

export async function getData(key: string) {

    const result = await chrome.storage.local.get(key);

    return result[key];

}

export async function removeData(key: string) {

    await chrome.storage.local.remove(key);

}

export async function clearStorage() {

    await chrome.storage.local.clear();

}
```

---

# Why Service Layer?

Instead of writing

```ts
chrome.storage.local.set(...)
```

inside every component,

we centralize storage logic in one file.

Benefits:

- Cleaner Code
- Reusable
- Easy Testing
- Easy Maintenance

---

# Step 5 – Save Theme

Example

```ts
await saveData(

    STORAGE_KEYS.THEME,

    "dark"

);
```

This stores

```
theme

↓

dark
```

---

# Step 6 – Save AI Model

```ts
await saveData(

    STORAGE_KEYS.MODEL,

    "llama3"

);
```

---

# Step 7 – Save Prompt

```ts
await saveData(

    STORAGE_KEYS.PROMPT,

    "Explain Docker"

);
```

---

# Step 8 – Save Recent Chats

```ts
await saveData(

    STORAGE_KEYS.RECENT_CHATS,

    [

        "Explain Docker",

        "Explain Kubernetes"

    ]

);
```

---

# Step 9 – Read Data

```ts
const theme = await getData(

    STORAGE_KEYS.THEME

);

console.log(theme);
```

Console

```
dark
```

---

# Step 10 – Create useStorage Hook

Create

```
src/hooks/useStorage.ts
```

```ts
import { useEffect, useState } from "react";
import { getData } from "../services/storage.service";

export default function useStorage<T>(key: string) {

    const [value, setValue] = useState<T | null>(null);

    useEffect(() => {

        async function loadData() {

            const result = await getData(key);

            setValue(result as T);

        }

        loadData();

    }, [key]);

    return value;

}
```

---

# Why Create a Hook?

Instead of repeating:

```ts
useEffect(...)

await getData(...)
```

inside every component,

we reuse a custom hook.

Benefits

- Cleaner Components
- Reusable
- Easy to Maintain

---

# Step 11 – Save Theme from Popup

Example

```tsx
<button

onClick={()=>

saveData(

STORAGE_KEYS.THEME,

"dark"

)

}

>

Dark Mode

</button>
```

When the button is clicked,

the value is saved into Chrome Storage.

---

# Step 12 – Read Theme Using Hook

Import the hook.

```tsx
import useStorage from "../hooks/useStorage";

import { STORAGE_KEYS } from "../constants/storage.constants";
```

Use it.

```tsx
const theme = useStorage<string>(

    STORAGE_KEYS.THEME

);
```

Display it.

```tsx
<p>

Theme : {theme}

</p>
```

Popup Output

```
Theme : dark
```

---

# Step 13 – Use Storage in Popup

Example

```tsx
import { useState } from "react";
import useStorage from "../hooks/useStorage";
import { STORAGE_KEYS } from "../constants/storage.constants";

function Popup() {

    const theme = useStorage<string>(STORAGE_KEYS.THEME);

    const [response, setResponse] = useState("");

    const sendMessage = () => {

        chrome.runtime.sendMessage(

            {

                type: "ASK_AI",

                prompt: "Hello AI"

            },

            (res) => {

                if (chrome.runtime.lastError) {

                    console.error(chrome.runtime.lastError.message);

                    return;

                }

                setResponse(res.response);

            }

        );

    };

    return (

        <div className="p-5">

            <button

                onClick={sendMessage}

                className="bg-blue-600 text-white px-4 py-2 rounded"

            >

                Send Message

            </button>

            <p className="mt-4">

                Theme : {theme ?? "Not Set"}

            </p>

            <p className="mt-2">

                {response}

            </p>

        </div>

    );

}

export default Popup;
```

Expected Output

```
Theme : dark

Hello from Background Worker
```

---

# Step 14 – Save Theme from Popup

Example

```tsx
<button

onClick={async()=>{

await saveData(

STORAGE_KEYS.THEME,

"dark"

);

}}

>

Dark Mode

</button>
```

Now clicking the button saves the theme.

---

# Step 15 – Use chrome.storage.sync

Instead of

```ts
chrome.storage.local.set({

    theme: "dark"

});
```

Use

```ts
await chrome.storage.sync.set({

    theme: "dark"

});
```

Use **Sync Storage** for:

- Theme
- Language
- Preferred AI Model
- User Preferences

Use **Local Storage** for:

- Recent Chats
- AI Responses
- Cached Data

---

# Step 16 – Listen for Storage Changes

Inside

```
background.ts
```

```ts
chrome.storage.onChanged.addListener(

    (changes, area) => {

        console.log("Storage Area:", area);

        console.log(changes);

        if (changes.theme) {

            console.log(

                "Old Theme:",

                changes.theme.oldValue

            );

            console.log(

                "New Theme:",

                changes.theme.newValue

            );

        }

    }

);
```

Example Console

```
Storage Area : local

Old Theme

↓

light

New Theme

↓

dark
```

Useful for

- Theme Switching
- Real-Time Updates
- Multiple Extension Pages

---

# Step 17 – Verify Storage

Open

```
chrome://extensions
```

↓

Inspect Popup

↓

Application

↓

Storage

↓

Extension Storage

Verify

```
theme

↓

dark

model

↓

llama3

prompt

↓

Explain Docker

recentChats

↓

Array
```

---

# Step 18 – Restart Chrome

Restart Chrome.

Open Popup again.

Verify

```
Theme

↓

dark

Model

↓

llama3

Prompt

↓

Explain Docker
```

Data should still exist.

---

# Step 19 – Common Issues

## Data Not Saving

Check

```
"permissions": [

"storage"

]
```

Reload the extension.

---

## Data Always Undefined

Storage APIs are asynchronous.

Wrong

```ts
const data = getData(key);
```

Correct

```ts
const data = await getData(key);
```

---

## Sync Storage Not Working

Use

```ts
chrome.storage.sync
```

instead of

```ts
chrome.storage.local
```

---

## Changes Not Visible

Run

```bash
npm run build
```

Reload the extension.

```
chrome://extensions
```

↓

Reload

---

# Best Practices

✅ Use constants for storage keys

✅ Create a Storage Service

✅ Use Custom Hooks

✅ Use async/await

✅ Avoid hardcoded strings

✅ Store only required data

✅ Use `chrome.storage.sync` for preferences

✅ Use `chrome.storage.local` for chat history

---

# Folder Structure After Milestone 8

```
chrome-extension/

src/

├── popup/
│
├── background/
│      background.ts
│
├── content/
│      content.ts
│
├── sidepanel/
│
├── constants/
│      storage.constants.ts
│
├── services/
│      storage.service.ts
│
├── hooks/
│      useStorage.ts
│
├── types/
│      storage.types.ts
│
├── utils/
│
└── assets/
```

---

# Deliverables

By the end of this milestone you have implemented:

- ✅ Chrome Storage Local
- ✅ Chrome Storage Sync
- ✅ Storage Service
- ✅ Custom React Hook
- ✅ Popup Integration
- ✅ Storage Change Listener
- ✅ Persistent Theme
- ✅ Persistent AI Model
- ✅ Persistent Prompt
- ✅ Best Practices for Chrome Storage

---

# Git Commands

```bash
git add .

git commit -m "feat(extension): implement chrome storage"

git push origin develop
```

---

# What We Learned

In this milestone we learned how to persist data inside a Chrome Extension using the Chrome Storage API. We organized storage logic into a reusable service, created constants to avoid hardcoded keys, built a custom React hook for cleaner components, and integrated storage into the popup UI. We also listened for storage changes in the background service worker and verified that user preferences remain available even after restarting Chrome. This architecture prepares the extension for future milestones where AI settings, authentication, and user preferences will be stored reliably.

---

# Next Milestone

## 🎥 Milestone 9 – Runtime Messaging

Architecture

```
Popup

↓

Background Worker

↓

Content Script

↓

Popup
```

Topics

- chrome.runtime.sendMessage()
- chrome.runtime.onMessage()
- Message Types
- Async Responses
- Communication Between Extension Components

This will connect all parts of the extension before integrating the backend in Chapter 3.