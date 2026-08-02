# Chapter 8 - OCR, Voice & File Processing

> **Build a multimodal AI assistant capable of understanding text, images, voice, PDFs, screenshots, and documents using free and open-source technologies.**

---

# 📖 Chapter Overview

Until now, Zeba AI can:

- Chat using Ollama
- Search code with RAG
- Access tools through MCP
- Review code
- Analyze resumes

In this chapter, we'll make Zeba AI **multimodal**.

Instead of only accepting text, it will also understand:

- Images
- Screenshots
- Voice
- PDFs
- Documents
- Drag & Drop files

By the end of this chapter, users will be able to upload a screenshot of an error, speak a question using their microphone, upload a PDF, or drag project files into the application and receive AI-powered responses.

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Build OCR workflows
- Extract text from images
- Upload files securely
- Build Voice Chat
- Convert speech to text
- Convert AI responses to speech
- Process PDFs
- Analyze screenshots
- Support drag & drop uploads
- Create a multimodal AI assistant

---

# 🏗 Multimodal Architecture

```text
                  Chrome Extension

      Popup | Side Panel | Drag & Drop

                     │

                     ▼

               Node.js Backend

                     │

      ┌──────────────┼───────────────┐

      ▼                              ▼

 File Processing               Voice Service

      ▼                              ▼

 OCR Service              Speech Recognition

      ▼                              ▼

Extracted Text         Voice Transcript

      └──────────────┬───────────────┘

                     ▼

                AI Router

                     ▼

            RAG + MCP + Ollama

                     ▼

                AI Response

                     ▼

              Text-to-Speech
```

---

# 🚀 Features in This Chapter

- OCR
- Image Upload
- PDF Upload
- Voice Chat
- Speech-to-Text
- Text-to-Speech
- Screenshot Analysis
- Drag & Drop Upload
- Markdown Preview
- Syntax Highlighting

---

# 📂 Project Structure

```text
backend/

src/

├── upload/
│
├── ocr/
│   ├── ocr.service.ts
│   ├── image.service.ts
│   └── preprocess.service.ts
│
├── speech/
│   ├── speech.service.ts
│   ├── tts.service.ts
│   └── stt.service.ts
│
├── pdf/
│   ├── pdf.service.ts
│   ├── parser.service.ts
│   └── chunk.service.ts
│
├── controllers/
│
├── routes/
│
└── uploads/
```

---

# 🛠 Technology Stack

| Feature | Technology |
|----------|------------|
| OCR | Tesseract.js |
| Image Processing | Sharp |
| PDF Parsing | pdf-parse |
| File Upload | Multer |
| Speech Recognition | Web Speech API |
| Text-to-Speech | SpeechSynthesis API |
| Markdown | react-markdown |
| Code Highlighting | react-syntax-highlighter |

---

# 📷 OCR (Optical Character Recognition)

OCR converts text inside an image into machine-readable text.

Examples:

- Error Screenshots
- Console Logs
- Terminal Output
- Architecture Images
- Whiteboard Notes
- Scanned Documents

Workflow:

```text
Image

↓

OCR Engine

↓

Extract Text

↓

AI Router

↓

Ollama

↓

Answer
```

---

# 🖼 Image Upload

Supported Formats:

- PNG
- JPG
- JPEG
- WEBP

Maximum Size:

```text
10 MB
```

Workflow:

```text
Upload Image

↓

Validate

↓

OCR

↓

Extract Text

↓

AI

↓

Response
```

---

# 🧹 Image Preprocessing

Improve OCR accuracy using:

- Resize
- Grayscale
- Contrast Enhancement
- Noise Removal
- Image Rotation

Benefits:

- Better text extraction
- Higher OCR accuracy
- Faster processing

---

# 📝 OCR Examples

Example 1

Upload:

```text
Kubernetes CrashLoopBackOff Screenshot
```

AI Response:

- Error explanation
- Root cause
- Suggested fixes

---

Example 2

Upload:

```text
Docker Build Error
```

AI explains:

- Error message
- Solution
- Best practices

---

# 📄 PDF Processing

Supported Files:

- Resume
- Architecture Documents
- Books
- Notes
- API Documentation

Workflow:

```text
Upload PDF

↓

Extract Text

↓

Chunk

↓

Embeddings

↓

ChromaDB

↓

RAG

↓

AI
```

---

# 📚 PDF Chat

Examples:

```text
Summarize Chapter 5

Explain Authentication

Generate Interview Questions

Find Kubernetes Examples
```

---

# 🎤 Voice Chat

Users can communicate with Zeba AI using voice.

Workflow:

```text
Microphone

↓

Speech-to-Text

↓

AI Router

↓

Ollama

↓

Text Response

↓

Text-to-Speech

↓

Audio
```

---

# 🗣 Speech-to-Text

Uses the browser's Web Speech API.

Capabilities:

- English Recognition
- Continuous Listening
- Real-Time Transcription
- Microphone Input

Example:

```text
Explain Kubernetes Deployment
```

becomes

```text
Text Prompt

↓

AI
```

---

# 🔊 Text-to-Speech

AI responses can be spoken aloud.

Examples:

- Read documentation
- Read interview questions
- Explain architecture
- Read summaries

Supported Controls:

- Play
- Pause
- Resume
- Stop

---

# 📁 Drag & Drop Upload

Users can drag files into the Chrome Extension.

Supported:

- PDF
- Images
- Markdown
- Text Files
- Source Code

Workflow:

```text
Drop File

↓

Upload

↓

Parse

↓

AI
```

---

# 💻 Source Code Upload

Supported Languages:

- JavaScript
- TypeScript
- Python
- Java
- Go
- C#
- YAML
- JSON
- Dockerfile
- Jenkinsfile

Workflow:

```text
Upload

↓

Chunk

↓

Embeddings

↓

ChromaDB

↓

RAG

↓

Answer
```

---

# 🖥 Screenshot Analysis

Users upload screenshots.

Examples:

- VS Code
- Chrome DevTools
- Jenkins
- Kubernetes Dashboard
- Docker Desktop
- Terminal

AI explains:

- Errors
- Warnings
- Recommendations
- Next Steps

---

# 📝 Markdown Rendering

Render AI responses using Markdown.

Supports:

- Tables
- Code Blocks
- Lists
- Links
- Headings
- Images

Example:

````text
# Kubernetes

## Deployment

```yaml
...
```

🎨 Syntax Highlighting

Supported Languages:

JavaScript
TypeScript
Python
Java
YAML
JSON
Bash
SQL
Dockerfile

This improves readability for generated code and explanations.

🔒 File Validation

Validate:

File Type
File Size
MIME Type
Extension
Virus Scan (Future)

Reject:

Executable Files
Unsupported Formats
Oversized Uploads
🗄 MongoDB Collections
uploaded_files

ocr_history

voice_history

pdf_documents

image_analysis

transcripts
🔄 Complete Processing Flow
User

↓

Upload File

↓

Validation

↓

OCR / PDF Parser

↓

Chunking

↓

Embeddings

↓

ChromaDB

↓

AI Router

↓

Ollama

↓

Markdown Response

↓

Speech (Optional)
🧪 Testing Checklist

Verify:

Image Upload
OCR Extraction
Screenshot Analysis
PDF Upload
PDF Chat
Drag & Drop
Speech Recognition
Voice Playback
Markdown Rendering
Syntax Highlighting
🐞 Common Issues
OCR Returns Incorrect Text

Possible Causes:

Blurry Image
Low Resolution
Handwritten Text

Solution:

Increase resolution
Apply preprocessing
Improve image contrast
Speech Recognition Not Working

Possible Causes:

Browser Permissions
Microphone Blocked
Unsupported Browser

Solution:

Allow microphone access
Use latest Chrome or Edge
PDF Parsing Failed

Possible Causes:

Corrupted PDF
Image-only PDF
Password-protected PDF

Solution:

Use OCR for scanned PDFs
Upload a readable PDF
File Upload Failed

Possible Causes:

File exceeds size limit
Unsupported format
Server validation failure
🚀 Future Enhancements

Future versions can include:

Camera OCR
Live Screen Capture
Handwriting Recognition
Barcode & QR Code Reading
Multi-language OCR
Audio File Transcription
Meeting Recording Summaries
Video Subtitle Extraction
Image Caption Generation
AI Whiteboard Analysis
📁 Deliverables

By the end of this chapter, you will have:

✅ OCR Integration
✅ Image Upload
✅ Screenshot Analysis
✅ PDF Upload
✅ PDF Chat
✅ Voice Chat
✅ Speech-to-Text
✅ Text-to-Speech
✅ Drag & Drop Upload
✅ Markdown Rendering
✅ Syntax Highlighting
✅ Secure File Validation
📌 Git Commit
git add .

git commit -m "feat: implement OCR, voice, and file processing"

git push origin develop
# 📖 Summary

In this chapter, we transformed Zeba AI into a multimodal assistant capable of understanding text, images, voice, and documents. We implemented OCR for screenshots and scanned documents, added secure file upload and PDF processing, enabled speech-to-text and text-to-speech, and enhanced the user experience with drag-and-drop uploads, Markdown rendering, and syntax highlighting. These features allow developers to interact with the AI using multiple input methods while keeping processing local and integrated with the existing RAG and MCP architecture.

# ⏭ Next Chapter
Chapter 9 – Dashboard & User Interface

In the next chapter, we will build a modern developer dashboard using React and Tailwind CSS, including:

Responsive Layout
Chat Workspace
Navigation Sidebar
Prompt Library UI
Chat History
Bookmarks & Favorites
Theme Switching
Settings
User Profile
Dashboard Widgets
Modern Developer Experience (DX)
Chrome Extension & Backend Integration