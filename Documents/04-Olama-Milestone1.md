# Milestone 4.1 – Ollama Setup

## 🎥 Episode 4.1

# 🎯 Goal

Install and configure **Ollama** on your development machine and verify that it is running correctly.

By the end of this milestone, you will have a local AI server capable of running Large Language Models (LLMs) without requiring any cloud APIs or API keys.

---

# 📚 Learning Objectives

After completing this milestone, you will be able to:

- Understand what Ollama is
- Install Ollama
- Verify the installation
- Start the Ollama server
- Understand how Ollama works
- Access the Ollama REST API
- Test the API
- Prepare the backend for AI integration

---

# 🤖 What is Ollama?

Ollama is an open-source application that allows developers to run powerful Large Language Models (LLMs) locally on their computers.

Instead of sending requests to cloud providers such as OpenAI or Gemini, Ollama runs AI models directly on your machine.

This provides:

- ✅ Completely Free
- ✅ Offline AI
- ✅ Better Privacy
- ✅ No API Keys
- ✅ Fast Response Time
- ✅ Local Processing
- ✅ REST API Support
- ✅ Streaming Responses

---

# 🏗 Architecture

```text
Chrome Extension

        │

        ▼

Node.js Backend

        │

        ▼

Ollama

        │

        ▼

Local AI Model
```

---

# 🖥 System Requirements

Recommended for development:

| Component | Recommendation |
|------------|---------------|
| Operating System | Windows 11 / macOS / Linux |
| RAM | 16 GB |
| CPU | 4+ Cores |
| Storage | 20 GB Free |
| Node.js | v22+ |
| TypeScript | Latest |
| VS Code | Latest |

---

# 📥 Step 1 – Download Ollama

Visit the official Ollama website.

👉 https://ollama.com

Click

```text
Download
```

Choose your operating system:

- Windows
- macOS
- Linux

Download the installer.

---

# 📦 Step 2 – Install Ollama

Run the installer.

Windows installation is straightforward:

```text
Next

↓

Accept License

↓

Install

↓

Finish
```

After installation, restart the terminal.

---

# 🔍 Step 3 – Verify Installation

Open a new terminal.

Run:

```bash
ollama --version
```

Example Output

```text
ollama version 0.x.x
```

If the version is displayed successfully, Ollama has been installed correctly.

---

# ⚠ Common Issue

If you see:

```text
'ollama' is not recognized
```

Possible causes:

- Terminal not restarted
- PATH environment variable not updated

Solution:

- Restart VS Code
- Restart PowerShell
- Restart Command Prompt

Then run:

```bash
ollama --version
```

again.

---

# ▶ Step 4 – Start Ollama

Start the local AI server.

```bash
ollama serve
```

Example Output

```text
Listening on

http://127.0.0.1:11434
```

Keep this terminal running.

The server must remain active while using AI models.

---

# 📌 Understanding the Server

When Ollama starts:

```text
Node Backend

↓

HTTP Request

↓

localhost:11434

↓

AI Model

↓

Response
```

Ollama behaves like a REST API server.

---

# 🌐 Step 5 – Verify REST API

Open a browser.

Visit:

```text
http://localhost:11434
```

Expected Response

```text
Ollama is running
```

Alternatively, test using curl.

```bash
curl http://localhost:11434
```

Expected Output

```text
Ollama is running
```

---

# 🔎 Step 6 – Check Installed Models

Initially, there may not be any models installed.

Run:

```bash
ollama list
```

Example Output

```text
NAME

(No models installed)
```

This is expected at this stage.

We will download models in the next milestone.

---

# 📡 Step 7 – Explore Ollama API

Open your browser.

Visit:

```text
http://localhost:11434/api/tags
```

If no models are installed:

```json
{
  "models": []
}
```

Later, this endpoint will list all downloaded models.

---

# 📖 Step 8 – Understanding Ollama Endpoints

Ollama exposes several REST APIs.

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/tags | List Installed Models |
| POST | /api/chat | Chat API |
| POST | /api/generate | Text Generation |
| POST | /api/embed | Generate Embeddings |

These APIs will be integrated into our Node.js backend in later milestones.

---

# 📁 Backend Preparation

Our backend structure will evolve as follows:

```text
backend/

src/

├── controllers/

├── routes/

├── services/

│      ollama.service.ts

├── providers/

├── ai/

├── prompts/

└── config/
```

In this milestone, no code changes are required yet.

---

# 🧪 Step 9 – Test Ollama Status

Open two terminals.

### Terminal 1

```bash
ollama serve
```

### Terminal 2

```bash
ollama list
```

If the server is running correctly, the command will execute successfully.

---

# 🧪 Step 10 – Verify Running Process

Windows

Open Task Manager.

You should see:

```text
ollama.exe
```

running in the background.

Linux/macOS

```bash
ps -ef | grep ollama
```

---

# 🛠 Common Issues

## Issue 1 – Command Not Found

```text
ollama is not recognized
```

Solution

Restart the terminal.

Verify installation.

---

## Issue 2 – Port Already In Use

Error

```text
Address already in use
```

Solution

Stop the previous Ollama instance.

Or restart your computer.

---

## Issue 3 – Firewall Blocking

Allow Ollama through Windows Firewall.

---

## Issue 4 – Browser Cannot Connect

Verify the server is running:

```bash
ollama serve
```

---

# 🧪 Testing Checklist

Verify the following:

- ✅ Ollama installed successfully
- ✅ Version command works
- ✅ Server starts
- ✅ Browser can access localhost:11434
- ✅ REST API responds
- ✅ No installation errors

---

# 📁 Deliverables

At the end of this milestone, you will have:

- ✅ Ollama Installed
- ✅ Ollama Server Running
- ✅ REST API Available
- ✅ Development Environment Ready
- ✅ Backend Prepared for AI Integration

---

# 📸 Suggested Screenshots for YouTube

Capture the following:

1. Ollama download page
2. Installation wizard
3. `ollama --version`
4. `ollama serve`
5. Browser showing `http://localhost:11434`
6. `ollama list`
7. Terminal with successful output

---

# 💻 Commands Used

```bash
# Verify installation
ollama --version

# Start server
ollama serve

# List installed models
ollama list

# Test REST API
curl http://localhost:11434

# View installed models (API)
curl http://localhost:11434/api/tags
```

---

# 📌 Expected Result

```text
Browser

↓

http://localhost:11434

↓

"Ollama is running"

↓

Backend Ready

↓

Next Milestone
```

---

# 💾 Git Commit

```bash
git add .

git commit -m "feat(ai): install and configure Ollama"

git push origin develop
```

---

# 🎯 Milestone Summary

In this milestone, you installed and configured Ollama, verified that the local AI server was running, explored its REST API, and prepared your development environment for local AI integration.

This setup provides the foundation for downloading AI models and connecting your Node.js backend to Ollama in the next milestone.

---

# ⏭ Next Milestone

## Milestone 4.2 – Download AI Models

In the next milestone, you will:

- Download multiple LLMs
- Compare different AI models
- Understand RAM usage
- Manage installed models
- Test local AI generation
- Prepare the AI Router for model selection