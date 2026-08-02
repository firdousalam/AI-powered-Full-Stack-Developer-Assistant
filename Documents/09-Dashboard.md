# Chapter 9 - Dashboard & User Interface

> **Build a Modern AI Developer Dashboard using React, Vite, Tailwind CSS, Zustand, React Router, and Shadcn UI**

---

# 📖 Chapter Overview

In the previous chapters, we built the backend intelligence of Zeba AI:

- Chrome Extension
- Backend APIs
- Ollama Integration
- AI Router
- MCP Gateway
- RAG
- OCR
- Voice Assistant

Now it's time to build the **Developer Dashboard**, where users interact with all AI capabilities through a beautiful, responsive, and production-ready interface.

By the end of this chapter, you'll have a professional dashboard similar to ChatGPT, Cursor, GitHub Copilot, and VS Code AI assistants.

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Build a modern React dashboard
- Design reusable UI components
- Implement responsive layouts
- Manage global state with Zustand
- Create routing using React Router
- Build chat interfaces
- Create settings pages
- Implement dark/light themes
- Display AI responses with Markdown
- Build reusable layouts

---

# 🏗 Dashboard Architecture

```text
                    Chrome Extension

                           │

                           ▼

                    React Dashboard

                           │

        ┌──────────────────┼─────────────────┐

        ▼                  ▼                 ▼

     Sidebar           Main Content      Right Panel

        ▼                  ▼                 ▼

 Navigation         AI Workspace      Chat History

                           │

                           ▼

                      Zustand Store

                           │

                           ▼

                   Backend REST API

                           │

                           ▼

            Ollama + MCP + ChromaDB
```

---

# 🛠 Technology Stack

| Layer | Technology |
|---------|------------|
| UI | React 19 |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Shadcn UI |
| Icons | Lucide React |
| State Management | Zustand |
| Routing | React Router |
| HTTP | Axios |
| Markdown | react-markdown |
| Code Highlighting | react-syntax-highlighter |
| Animations | Framer Motion |

---

# 📂 Folder Structure

```text
dashboard/

src/

├── assets/

├── components/
│
│   ├── chat/
│   ├── sidebar/
│   ├── navbar/
│   ├── cards/
│   ├── common/
│   ├── markdown/
│   ├── modals/
│   └── settings/
│
├── layouts/
│
├── pages/
│   ├── Dashboard/
│   ├── Chat/
│   ├── PromptLibrary/
│   ├── History/
│   ├── Favorites/
│   ├── Bookmarks/
│   ├── Resume/
│   ├── Interview/
│   ├── Documentation/
│   ├── Settings/
│   └── Profile/
│
├── hooks/

├── services/

├── store/

├── router/

├── types/

├── utils/

├── App.tsx

└── main.tsx
```

---

# 🎨 Dashboard Layout

```text
 --------------------------------------------------------

 Sidebar      |         Main Workspace         | History

              |                                |

 Navigation   |     AI Chat Window             |

              |                                |

              |     Markdown Response          |

              |                                |

              |     Prompt Input               |

----------------------------------------------------------
```

---

# 📑 Navigation Menu

The sidebar contains all major modules.

```text
🏠 Dashboard

💬 AI Chat

📚 Prompt Library

📝 Chat History

⭐ Favorites

🔖 Bookmarks

📄 Resume Review

💼 Job Analyzer

🎯 Interview Prep

📖 Documentation

🏛 Architecture

📂 File Upload

📑 PDF Chat

🌐 Website Chat

🐙 GitHub Chat

☸ Kubernetes

🐳 Docker

⚙ Settings
```

---

# 💬 AI Chat Workspace

The chat interface includes:

- Prompt Input
- Markdown Rendering
- Streaming AI Responses
- Code Blocks
- Copy Response
- Regenerate Response
- Voice Input
- File Upload
- Model Selector

---

# 📖 Markdown Support

AI responses render rich Markdown.

Supported Features:

- Headings
- Tables
- Lists
- Blockquotes
- Images
- Links
- Task Lists
- Code Blocks

---

# 💻 Syntax Highlighting

Supported Languages:

- JavaScript
- TypeScript
- Python
- Java
- Go
- C#
- SQL
- YAML
- Dockerfile
- Bash
- JSON

---

# 🌙 Theme Support

Users can switch between:

- Light Theme
- Dark Theme
- System Theme

Theme preference is stored in:

```text
chrome.storage.local
```

or

```text
MongoDB User Settings
```

---

# 📊 Dashboard Widgets

Dashboard Home displays quick statistics.

Example:

```text
-------------------------------------

AI Conversations

124

-------------------------------------

Indexed Documents

2,450

-------------------------------------

Repositories

18

-------------------------------------

Docker Containers

9

-------------------------------------

Kubernetes Clusters

2

-------------------------------------

Favorite Prompts

34

-------------------------------------
```

---

# 🔍 Global Search

Search everything from one location.

Searches:

- Chats
- Prompts
- Notes
- PDFs
- Code
- Repositories
- Documentation

Powered by:

- MongoDB
- ChromaDB

---

# 📚 Prompt Library UI

Organize prompts into categories.

```text
Development

DevOps

React

Node.js

Python

Docker

Kubernetes

AWS

Azure

Security

Architecture

Interview
```

Features:

- Search
- Filter
- Favorite
- Copy
- Edit
- Delete

---

# 📝 Chat History

Features:

- Search Conversations
- Continue Chat
- Delete Chat
- Rename Chat
- Export Chat
- Pin Chat

---

# 🔖 Favorites & Bookmarks

Users can:

- Save AI responses
- Bookmark conversations
- Create collections
- Organize folders

---

# 📄 Resume Review UI

Upload:

- PDF
- DOCX

AI displays:

- ATS Score
- Missing Skills
- Recommendations
- Technical Analysis
- Download Report

---

# 💼 Job Description Analyzer

Input:

- Job Description

Output:

- Skills Match
- Missing Technologies
- Resume Suggestions
- Interview Topics

---

# 🎯 Interview Preparation

Users can choose:

- Technology
- Difficulty
- Number of Questions

AI generates:

- Questions
- Answers
- Explanations
- Coding Challenges

---

# 📂 File Manager

Manage uploaded files.

Supported:

- Images
- PDFs
- Markdown
- Source Code
- ZIP Files

Features:

- Upload
- Delete
- Preview
- Reindex

---

# 📈 AI Dashboard Analytics

Example Metrics:

- Total Chats
- AI Tokens Used
- Indexed Files
- Favorite Prompts
- Code Reviews
- Resume Reviews
- Interview Sessions

---

# ⚙ Settings Page

Settings include:

## General

- Language
- Theme
- Notifications

---

## AI

- Default Model
- Streaming
- Temperature
- Max Tokens

---

## RAG

- Chunk Size
- Similarity Score
- Top Results

---

## MCP

- Enable Servers
- Refresh Tools
- Server Status

---

## Security

- Password
- Sessions
- API Keys (Future)
- Logout

---

# 👤 User Profile

Display:

- Name
- Email
- Avatar
- Joined Date
- Chat Statistics
- Storage Usage

---

# 🔄 State Management

Using Zustand.

Stores:

- User
- Theme
- Chat
- Models
- Settings
- Uploads
- Notifications

Benefits:

- Lightweight
- Fast
- Minimal Boilerplate

---

# 📡 API Integration

Dashboard communicates with backend using REST APIs and WebSockets.

```text
Dashboard

↓

Axios

↓

Express API

↓

Ollama

↓

Streaming Response

↓

Dashboard
```

---

# 📱 Responsive Design

Supported Devices:

- Desktop
- Laptop
- Tablet
- Mobile

Breakpoints:

- Small
- Medium
- Large
- Extra Large

---

# 🎨 UI Components

Reusable Components:

- Button
- Card
- Input
- Modal
- Drawer
- Avatar
- Badge
- Tabs
- Table
- Toast
- Loader
- Skeleton

---

# 🔒 Security

Frontend Security:

- JWT Storage
- Route Protection
- Form Validation
- File Validation
- XSS Prevention
- HTTPS Ready

---

# 🧪 Testing

Verify:

- Dashboard loads
- Navigation works
- Chat functions correctly
- Theme switching works
- Markdown renders
- Code highlighting works
- File upload succeeds
- Resume review displays
- Settings persist
- Responsive layout adapts

---

# 🐞 Common Issues

## Blank Screen

Possible Causes:

- React Router configuration
- Build failure
- JavaScript errors

---

## Theme Not Saving

Possible Causes:

- Storage permission
- Zustand persistence

---

## Chat Not Updating

Possible Causes:

- WebSocket disconnected
- API unavailable

---

## Slow Rendering

Possible Causes:

- Large Markdown response
- Too many components
- Missing memoization

---

# 🚀 Future Enhancements

Future dashboard improvements:

- Split Screen Chat
- Multiple Chat Tabs
- AI Agent Marketplace
- Workspace Management
- Team Collaboration
- Kanban Boards
- Calendar Integration
- VS Code Theme Support
- Plugin Marketplace
- Desktop Application (Electron)

---

# 📁 Deliverables

By the end of this chapter, you will have:

- ✅ Modern React Dashboard
- ✅ Responsive Layout
- ✅ AI Chat Interface
- ✅ Sidebar Navigation
- ✅ Prompt Library UI
- ✅ Chat History
- ✅ Favorites & Bookmarks
- ✅ Resume Review UI
- ✅ Job Analyzer UI
- ✅ Interview Preparation UI
- ✅ Dashboard Widgets
- ✅ Markdown Rendering
- ✅ Syntax Highlighting
- ✅ Theme Support
- ✅ Zustand State Management

---

# 📌 Git Commit

```bash
git add .

git commit -m "feat: build AI dashboard and user interface"

git push origin develop
```

---

# 📖 Summary

In this chapter, we built the Zeba AI Dashboard—a modern React-based interface that brings together all platform capabilities into a single workspace. We created a responsive layout with reusable UI components, integrated AI chat, prompt management, chat history, bookmarks, resume review, interview preparation, and settings. Using Zustand for state management and Tailwind CSS with Shadcn UI for styling, the dashboard now provides a scalable foundation for interacting with Ollama, MCP servers, and the RAG pipeline.

---

# ⏭ Next Chapter

## Chapter 10 – Docker & Kubernetes

In the next chapter, we will prepare Zeba AI for deployment by:

- Containerizing the frontend and backend
- Creating Dockerfiles
- Building Docker images
- Configuring Docker Compose
- Deploying services to Kubernetes
- Creating Deployments and Services
- Managing ConfigMaps and Secrets
- Configuring Ingress
- Packaging with Helm Charts
- Preparing the application for production-ready deployment