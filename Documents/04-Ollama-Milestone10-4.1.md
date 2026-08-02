# 📄 Milestone 4.10 – Intelligent DOM Extraction & Context Understanding

---

# Chapter Goal

In the previous milestone, Zeba AI learned how to collect browser metadata such as the page title, URL, selected text, browser language, and other browser information.

While this provides useful context, modern AI assistants require a much deeper understanding of webpages.

In this milestone, Zeba AI evolves into an intelligent browser assistant capable of extracting, analyzing, and understanding the actual contents of web pages.

Instead of relying solely on selected text, Zeba AI will build a structured representation of the webpage that can be efficiently consumed by Large Language Models (LLMs).

By the end of this milestone, Zeba AI will be capable of:

- Extracting complete webpage content
- Understanding semantic HTML
- Detecting articles and documentation
- Extracting source code
- Detecting programming languages
- Converting HTML into Markdown
- Compressing webpage context
- Preparing optimized prompts for AI
- Building the foundation for Retrieval-Augmented Generation (RAG)

This milestone transforms Zeba AI from a browser extension into an intelligent browser understanding engine.

---

# Learning Objectives

After completing this milestone, you will understand:

- DOM traversal
- Browser document parsing
- Readability algorithms
- Source code extraction
- Syntax-aware code detection
- Programming language identification
- HTML to Markdown conversion
- Context optimization
- Token compression
- Browser-aware Retrieval-Augmented Generation (RAG)

---

# Why Browser Metadata Isn't Enough

Currently Zeba AI knows:

- Page title
- URL
- Selected text
- Browser language
- Current tab

Although useful, these details are not sufficient for answering complex questions.

For example:

> Explain the React Hooks documentation.

The selected text may contain only a few words.

However, the entire page contains:

- headings
- examples
- notes
- warnings
- code snippets
- navigation

The AI should understand all of these.

---

# Problems with Sending Raw HTML

Many beginners send the entire webpage HTML directly to an LLM.

Example:

```html
<html>

<body>

<div>

<div>

<nav>

<ul>

<li>Home</li>

<li>About</li>

...

</ul>

</nav>

<main>

...

</main>

</div>

</div>

</body>

</html>
```

Problems:

- Huge token usage
- Navigation menus
- Cookie banners
- Advertisements
- Hidden elements
- Scripts
- Stylesheets
- Analytics

Most of this information is useless for AI.

Instead, Zeba AI should intelligently extract only meaningful content.

---

# Browser Intelligence Architecture

```
Web Page

↓

DOM Tree

↓

DOM Extraction

↓

Readability

↓

Code Detection

↓

Language Detection

↓

Markdown Conversion

↓

Context Compression

↓

Browser Context Builder

↓

Prompt Builder

↓

LLM

↓

AI Response
```

---

# Chapter Outline

## 10.1 Introduction

Topics:

- Browser Intelligence
- DOM Understanding
- Why HTML is noisy
- Intelligent Context

---

# 10.1 Introduction — Browser Intelligence, DOM Understanding & Intelligent Context

---

# Chapter Overview

Until now, Zeba AI has been capable of understanding only a limited amount of browser information. The extension could collect metadata such as the webpage title, URL, hostname, browser language, selected text, and timestamp. While this metadata is useful, it represents only a small fraction of the information available on a webpage.

Modern websites contain thousands of HTML elements, including documentation, tutorials, code examples, navigation menus, advertisements, forms, comments, tables, images, videos, and interactive components. An AI assistant that relies only on the page title or selected text misses most of the valuable information.

This chapter introduces the concept of **Browser Intelligence**, where Zeba AI moves beyond metadata collection and begins understanding the complete structure and meaning of a webpage.

Instead of treating the browser as merely a collection of URLs and text, Zeba AI will:

- Analyze the Document Object Model (DOM)
- Identify meaningful content
- Ignore unnecessary elements
- Build optimized context specifically for Large Language Models (LLMs)

This milestone transforms Zeba AI from a browser extension into an intelligent browser companion.

---

# Learning Objectives

After completing this chapter, you will understand:

- What Browser Intelligence means
- How browsers represent webpages internally
- What the Document Object Model (DOM) is
- Why raw HTML should never be sent directly to an AI model
- How to extract meaningful webpage content
- How intelligent context improves AI responses
- Why context optimization is essential for LLMs
- How this milestone prepares Zeba AI for Retrieval-Augmented Generation (RAG)

---

# From Browser Extension to Browser Intelligence

Most browser extensions are reactive.

They perform simple tasks such as:

- Blocking advertisements
- Saving bookmarks
- Filling forms
- Translating text
- Capturing screenshots
- Managing passwords

While these extensions are useful, they do not truly understand the webpage.

For example, consider the React documentation homepage.

A traditional browser extension may only know:

```text
Title:
React

URL:
https://react.dev

Selected Text:
Hooks
```

However, an intelligent assistant should understand:

- The page explains React.
- It contains official documentation.
- Multiple code examples are available.
- Navigation links exist but are not important.
- The main article focuses on learning React.
- Headings organize the documentation.
- Code snippets demonstrate component creation.
- The user is likely looking for programming guidance.

This deeper understanding is called **Browser Intelligence**.

---

# What is Browser Intelligence?

Browser Intelligence is the ability of an AI system to understand the content, structure, and semantics of a webpage instead of simply reading its metadata.

Instead of asking:

> What is the page title?

Browser Intelligence asks:

- What is this webpage about?
- Which content is important?
- Which content should be ignored?
- Is this documentation?
- Is this source code?
- Is this a tutorial?
- Which programming language is being used?
- What information is most relevant to the user?

Browser Intelligence transforms a webpage into structured knowledge.

---

# Understanding the Browser

Every webpage displayed inside a browser is internally represented as a tree of objects.

Consider the following HTML:

```html
<html>

<head>
    <title>React</title>
</head>

<body>
    <h1>Welcome</h1>
    <p>Hello World</p>
</body>

</html>
```

The browser converts this HTML into a tree known as the **Document Object Model (DOM)**.

```text
Document
│
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── p
```

Every HTML element becomes a node in this tree.

Instead of manipulating raw HTML, JavaScript interacts with this DOM structure.

This is exactly how Zeba AI inspects webpages.

---

# Why HTML is Noisy

Although HTML contains all webpage information, much of it is irrelevant for AI understanding.

A real documentation page typically contains:

- Header
- Logo
- Navigation menu
- Sidebar
- Search box
- Advertisement
- Cookie banner
- Social media links
- Footer
- Analytics scripts
- CSS
- JavaScript
- Comments
- Hidden elements

Only a small portion is actually useful.

Example:

```text
Documentation

Navigation

Sidebar

Advertisement

Cookie Banner

Article

Code Example

Footer
```

For an AI assistant, only the **Article** and **Code Example** are truly valuable.

Everything else consumes tokens without improving the quality of the response.

---

# Why Sending Raw HTML is a Bad Idea

A common beginner mistake is sending the entire webpage HTML directly to an LLM.

Example:

```html
<html>

<head>
    <script>...</script>
    <style>...</style>
</head>

<body>

<header>...</header>

<nav>...</nav>

<article>...</article>

<footer>...</footer>

</body>

</html>
```

This approach introduces several problems.

---

## Problem 1 — Extremely Large Prompt

Large documentation pages often contain:

- 100,000+ characters
- Thousands of HTML elements
- Hundreds of nested `<div>` elements

Most of this information is irrelevant.

---

## Problem 2 — Token Waste

Large Language Models charge and operate based on tokens.

Sending unnecessary HTML increases:

- Token usage
- Cost
- Latency
- Processing time

while providing no additional value.

---

## Problem 3 — Poor AI Responses

When an AI receives thousands of unnecessary HTML elements, it struggles to identify the meaningful content.

Instead of focusing on:

> React Hooks are functions that let you use state inside functional components.

the model wastes attention processing:

- Navigation menus
- Button labels
- Footer links
- CSS class names
- Hidden elements

---

## Problem 4 — Reduced Context Window

Every language model has a limited context window.

If the context window is filled with unnecessary HTML, there is less space available for:

- User questions
- Retrieved documents
- Previous conversation
- Generated answers

---

# Intelligent Context

Instead of sending raw HTML, Zeba AI creates an **Intelligent Context**.

Raw webpage:

```text
Header

Navigation

Sidebar

Ads

Cookie Banner

Article

Examples

Footer
```

After intelligent extraction:

```text
Page Title

Main Headings

Article

Code Blocks

Tables

Selected Text

Important Links
```

Only meaningful information reaches the AI model.

---

# Browser Intelligence Pipeline

The Browser Intelligence pipeline consists of multiple stages.

```text
Browser

↓

Web Page

↓

DOM

↓

DOM Extraction

↓

Readability Extraction

↓

Code Detection

↓

Programming Language Detection

↓

Markdown Conversion

↓

Context Compression

↓

Browser Context

↓

Prompt Builder

↓

Large Language Model

↓

AI Response
```

Each stage progressively removes noise and enriches the context until the AI receives only the most relevant information.

---

# Why Context Matters

Imagine asking:

> Explain React Context API.

### Without Browser Intelligence

The AI only receives:

```text
Title

React

URL

react.dev
```

The answer will be generic.

---

### With Browser Intelligence

The AI receives:

- Article title
- React documentation
- Context API explanation
- Code examples
- API reference
- Related sections
- Selected text

Now the AI can provide a much more accurate, context-aware explanation aligned with the exact documentation the user is viewing.

---

# Benefits of Intelligent Context

Using Intelligent Context provides several advantages:

- Better response accuracy
- Reduced token consumption
- Faster AI responses
- Improved code understanding
- Better documentation summarization
- Cleaner prompts
- More reliable answers
- Foundation for enterprise AI assistants

---

# Real-World Example

Suppose a developer opens the React documentation and asks:

> Explain `useEffect`.

Without Browser Intelligence, the AI only knows:

- Page title
- URL

With Browser Intelligence, Zeba AI understands:

- The page is official React documentation.
- The topic is `useEffect`.
- The article contains explanations and best practices.
- JavaScript code snippets demonstrate usage.
- Surrounding content provides additional learning context.

As a result, the AI generates a response that is tailored to the exact webpage rather than a generic explanation.

---

# Preparing for the Next Sections

This introduction lays the conceptual foundation for the remainder of this milestone.

In the upcoming sections, you will implement services that progressively build Browser Intelligence.

Topics include:

- DOM Fundamentals
- DOM Extraction
- Readability Extraction
- Code Block Detection
- Programming Language Detection
- Markdown Conversion
- Context Compression

By the end of this milestone, Zeba AI will understand webpages in a way that closely resembles how a human developer reads technical documentation.

This capability forms the foundation for advanced features such as:

- Retrieval-Augmented Generation (RAG)
- Workspace Awareness
- Semantic Search
- Enterprise AI Assistants
- Intelligent Developer Workflows

---

## What's Next?

In **Chapter 10.2**, you'll dive deep into the **Document Object Model (DOM)** and learn how browsers internally represent every webpage as a structured tree. You'll explore DOM traversal techniques, identify meaningful content, and begin building the foundation for intelligent webpage understanding in Zeba AI.

## 10.2 DOM Fundamentals

Topics:

- DOM Tree
- Element Nodes
- Text Nodes
- Attributes
- Parent/Child relationships
- Shadow DOM
- Dynamic DOM

Example:

```html
<body>

<header></header>

<main>

<article>

<h1>Hello</h1>

<p>Content</p>

</article>

</main>

</body>
```

---

# 10.2 DOM Fundamentals

---

# Chapter Overview

In the previous chapter, we introduced the concept of **Browser Intelligence**, where Zeba AI evolved beyond collecting simple browser metadata and began understanding the actual content of webpages.

The first step toward intelligent webpage understanding is learning how browsers internally represent HTML documents.

Although developers write HTML files, browsers never work directly with raw HTML after a page loads. Instead, every webpage is converted into a structured object hierarchy known as the **Document Object Model (DOM)**.

Understanding the DOM is essential because every browser extension—including Zeba AI—interacts with webpages through this structure. Whether extracting page titles, detecting code blocks, reading articles, identifying forms, or collecting browser context, all of these tasks rely on traversing and analyzing the DOM.

In this chapter, we will explore the fundamentals of the Document Object Model, including DOM trees, different node types, attributes, relationships between elements, Shadow DOM, and how modern JavaScript frameworks continuously modify the DOM at runtime.

---

# Learning Objectives

After completing this chapter, you will understand:

- What the Document Object Model (DOM) is
- How browsers convert HTML into a tree structure
- The difference between Element Nodes and Text Nodes
- How HTML attributes become DOM properties
- Parent, child, sibling, and ancestor relationships
- What Shadow DOM is and why modern frameworks use it
- How dynamic DOM updates occur
- Why understanding the DOM is critical for Browser Intelligence

---

# What is the DOM?

The **Document Object Model (DOM)** is a programming interface that represents an HTML document as a hierarchical tree of objects.

Instead of working with raw HTML text, JavaScript interacts with this object tree.

When a webpage loads, the browser performs the following steps:

```text
HTML File

↓

HTML Parser

↓

DOM Tree

↓

JavaScript

↓

Rendered Page
```

The browser parses every HTML tag and converts it into an object called a **Node**.

These nodes are connected together to form a tree-like structure.

This tree is known as the **DOM Tree**.

---

# Why Does the Browser Create a DOM?

HTML is simply a text document.

Example:

```html
<h1>Hello World</h1>
```

JavaScript cannot directly manipulate text efficiently.

Instead, the browser converts HTML into objects.

For example:

```javascript
document.body
```

returns an object rather than HTML text.

This object contains:

- Children
- Attributes
- Styles
- Events
- Methods
- Properties

Because of this object-oriented representation, JavaScript can easily modify webpages.

---

# Example HTML Document

Consider the following HTML:

```html
<body>

<header></header>

<main>

    <article>

        <h1>Hello</h1>

        <p>Content</p>

    </article>

</main>

</body>
```

Although this looks like nested HTML tags, the browser transforms it into a DOM tree.

---

# DOM Tree

The browser represents the previous HTML as the following hierarchy:

```text
Document
│
└── html
    │
    ├── head
    │
    └── body
        │
        ├── header
        │
        └── main
            │
            └── article
                │
                ├── h1
                │   └── "Hello"
                │
                └── p
                    └── "Content"
```

Every indentation level represents a parent-child relationship.

This hierarchical representation allows JavaScript to navigate between elements efficiently.

---

# Understanding the DOM Tree

Every webpage begins with a single root node.

```text
Document
```

Inside the document exists the root HTML element.

```text
Document
└── html
```

The HTML element usually contains two children:

```text
html
├── head
└── body
```

Everything visible on the webpage resides inside the `<body>` element.

---

# DOM Nodes

The DOM consists of different types of nodes.

The most common ones are:

| Node Type | Example |
|-----------|----------|
| Document Node | document |
| Element Node | div |
| Text Node | Hello |
| Comment Node | <!-- comment --> |
| Attribute Node | class="card" |

For Browser Intelligence, Element Nodes and Text Nodes are the most important.

---

# Element Nodes

Every HTML tag becomes an **Element Node**.

Example:

```html
<div>

<h1>Hello</h1>

<p>World</p>

</div>
```

DOM representation:

```text
div
├── h1
└── p
```

Each HTML tag is represented as an object.

Example:

```javascript
const article = document.querySelector("article");
```

Here, `article` is an Element Node.

---

# Properties of an Element Node

Every element contains useful information.

Example:

```javascript
const heading = document.querySelector("h1");

console.log(heading.tagName);

console.log(heading.innerText);

console.log(heading.innerHTML);

console.log(heading.children);

console.log(heading.parentElement);
```

Output:

```text
H1

Hello

Hello

[]

article
```

These properties are heavily used while extracting webpage content.

---

# Text Nodes

Text inside HTML is stored separately as **Text Nodes**.

Example:

```html
<h1>Hello</h1>
```

DOM:

```text
h1

└── "Hello"
```

Notice that "Hello" is not part of the `<h1>` element itself.

Instead, it is a child node.

Similarly:

```html
<p>Content</p>
```

becomes:

```text
p

└── "Content"
```

---

# Why Text Nodes Matter

When extracting webpage content, Zeba AI is primarily interested in text.

For example:

```html
<p>

React is a JavaScript library.

</p>
```

The browser stores:

```text
Element Node

↓

Text Node

↓

React is a JavaScript library.
```

This allows JavaScript to retrieve readable content using:

```javascript
paragraph.textContent
```

or

```javascript
paragraph.innerText
```

---

# Attributes

HTML elements often contain additional information called **Attributes**.

Example:

```html
<a href="https://react.dev">

React

</a>
```

Attributes include:

- href
- class
- id
- src
- alt
- title
- role
- data-*

Example:

```html
<img

src="logo.png"

alt="React Logo"

width="100"

/>
```

The browser stores these values as part of the DOM node.

---

# Reading Attributes

JavaScript can easily access attributes.

Example:

```javascript
const link = document.querySelector("a");

console.log(link.getAttribute("href"));

console.log(link.href);
```

Output:

```text
https://react.dev
```

Similarly:

```javascript
const image = document.querySelector("img");

console.log(image.alt);

console.log(image.src);
```

Attributes provide valuable context for Browser Intelligence.

---

# Parent and Child Relationships

The DOM is hierarchical.

Every node has relationships.

Example:

```html
<article>

<h1>Hello</h1>

<p>Content</p>

</article>
```

Tree:

```text
article

├── h1

└── p
```

Here:

- `article` is the parent
- `h1` is a child
- `p` is also a child

JavaScript:

```javascript
const article = document.querySelector("article");

console.log(article.children);
```

Output:

```text
HTMLCollection

[ h1, p ]
```

---

# Parent Nodes

Every child knows its parent.

Example:

```javascript
const heading = document.querySelector("h1");

console.log(heading.parentElement);
```

Output:

```text
<article>
```

This is useful when extracting complete content blocks.

---

# Sibling Relationships

Elements under the same parent are siblings.

Example:

```html
<article>

<h1></h1>

<p></p>

<pre></pre>

</article>
```

Relationships:

```text
article

├── h1

├── p

└── pre
```

JavaScript:

```javascript
heading.nextElementSibling

heading.previousElementSibling
```

---

# Descendants and Ancestors

DOM relationships extend beyond direct parents.

Example:

```text
body

↓

main

↓

article

↓

h1
```

Here:

- `body` is an ancestor of `h1`
- `h1` is a descendant of `body`

JavaScript:

```javascript
heading.closest("article");
```

This helps locate logical content containers.

---

# Shadow DOM

Modern web applications often use **Shadow DOM**.

Shadow DOM creates an isolated DOM tree attached to an element.

Example:

```text
Document

↓

Custom Element

↓

Shadow Root

↓

Button

↓

Icon
```

The Shadow DOM hides internal implementation details.

This is commonly used in:

- Chrome UI
- Material UI
- Web Components
- Shoelace
- Ionic
- Lit

---

# Why Shadow DOM Exists

Without Shadow DOM:

- CSS conflicts occur
- JavaScript selectors become unreliable
- Component encapsulation is difficult

Shadow DOM isolates components, making them reusable and self-contained.

---

# Accessing Shadow DOM

Some components expose their shadow root.

Example:

```javascript
const component = document.querySelector("my-component");

const shadow = component.shadowRoot;

console.log(shadow);
```

However, closed shadow roots cannot be accessed.

When building Browser Intelligence, developers must account for both standard DOM and Shadow DOM content.

---

# Dynamic DOM

Modern websites rarely remain static.

Frameworks like:

- React
- Angular
- Vue
- Svelte
- Next.js

constantly modify the DOM after the page loads.

Example:

Initial DOM:

```html
<div>

Loading...

</div>
```

After an API request:

```html
<div>

<h1>Products</h1>

<ul>

<li>Laptop</li>

<li>Keyboard</li>

</ul>

</div>
```

The DOM changes without reloading the page.

---

# Why Dynamic DOM Matters

If Zeba AI extracts content too early, it may capture only:

```text
Loading...
```

Instead of:

```text
Products

Laptop

Keyboard
```

Therefore, intelligent extraction often waits until the page finishes rendering or observes DOM changes.

---

# DOM Traversal

JavaScript provides several APIs to navigate the DOM.

Examples:

```javascript
document.querySelector()

document.querySelectorAll()

document.getElementById()

document.getElementsByClassName()

element.children

element.parentElement

element.closest()
```

These APIs are the foundation of Browser Intelligence.

---

# DOM Fundamentals in Zeba AI

Throughout the rest of this milestone, Zeba AI will use the DOM to:

- Extract page titles
- Identify main articles
- Detect code blocks
- Read documentation
- Find headings
- Collect links
- Extract tables
- Build Markdown
- Generate optimized browser context

Understanding the DOM is therefore the first major building block toward intelligent webpage understanding.

---

# Chapter Summary

In this chapter, you learned that browsers transform HTML into a structured **Document Object Model (DOM)**, enabling JavaScript and browser extensions to interact with webpages programmatically.

You explored:

- The DOM Tree
- Element Nodes
- Text Nodes
- HTML Attributes
- Parent and Child Relationships
- Sibling and Ancestor Navigation
- Shadow DOM
- Dynamic DOM Updates
- DOM Traversal APIs

These concepts provide the foundation for every extraction and analysis feature that Zeba AI will implement in the upcoming chapters.

---

## What's Next?

In **Chapter 10.3 – DOM Extraction Service**, you'll begin implementing the actual extraction logic that walks through the DOM, filters unnecessary elements, and collects meaningful webpage content for AI processing. This service will serve as the core of Zeba AI's Browser Intelligence pipeline.



## 10.3 DOM Extraction Service

Complete implementation:

```
domExtractor.service.ts
```

Responsibilities:

- Walk DOM tree
- Ignore hidden nodes
- Remove scripts
- Remove styles
- Remove ads
- Preserve document hierarchy
- Extract visible content

---

# 10.3 DOM Extraction Service

## Overview

Modern webpages contain far more information than what users actually see.

A typical webpage may include:

- Navigation menus
- Advertisements
- Analytics scripts
- Tracking pixels
- Cookie banners
- Hidden elements
- CSS styles
- JavaScript
- Metadata
- Embedded widgets
- Dynamic framework-generated content

If we send the entire HTML document to an LLM, several problems occur:

- Massive token usage
- Poor response quality
- Irrelevant context
- Hallucinations caused by boilerplate HTML
- Higher latency
- Increased inference cost

Instead, Zeba AI extracts only the meaningful content from the Document Object Model (DOM).

The DOM Extraction Service is responsible for converting a noisy webpage into a clean, structured representation that can later be summarized, embedded, or sent directly to the LLM.

---

# Responsibilities

The DOM Extraction Service performs several important tasks.

## Walk the DOM Tree

The service traverses the document recursively from the root element.

```
document.documentElement
        │
        ▼
<html>
   │
   ├── head
   │
   └── body
        │
        ├── header
        ├── nav
        ├── main
        ├── article
        └── footer
```

Each node is analyzed before deciding whether it should be preserved.

---

## Ignore Hidden Elements

Hidden elements usually contain irrelevant information.

Examples:

```html
<div style="display:none">
Hidden
</div>

<div hidden>
Hidden
</div>

<div aria-hidden="true">
Hidden
</div>
```

The extractor ignores these nodes.

Benefits:

- Less noise
- Smaller prompts
- Better AI accuracy

---

## Remove Script Tags

Scripts never provide useful semantic content.

Example:

```html
<script>

window.dataLayer.push(...)

</script>
```

These nodes are skipped entirely.

---

## Remove Style Tags

Styles describe appearance rather than meaning.

Example:

```html
<style>

body{
background:black;
}

</style>
```

The AI does not need styling information.

---

## Remove Advertisements

Modern websites often include dozens of advertisement containers.

Typical examples:

```html
<div class="ads"></div>

<div id="sponsored"></div>

<aside class="advertisement"></aside>
```

Removing advertisements dramatically improves prompt quality.

---

## Remove Navigation

Navigation bars appear on every page.

Example:

```html
<nav>

Home

Products

Pricing

Contact

</nav>
```

They contribute nothing to answering user questions.

---

## Remove Cookie Banners

Cookie banners pollute extracted text.

Example

```html
<div id="cookie-banner">

Accept Cookies

</div>
```

These are ignored.

---

## Preserve Document Hierarchy

Unlike simple text extraction, Zeba AI keeps structural information.

Example

```
Article

    Heading

        Paragraph

    Heading

        Paragraph

```

This hierarchy helps LLMs understand:

- sections
- topics
- relationships

---

## Extract Visible Content

Only user-visible text is collected.

Ignored:

- hidden elements
- scripts
- styles
- metadata

Collected:

- headings
- paragraphs
- lists
- tables
- code blocks
- blockquotes

---

# Project Structure

```
src/

└── services/

    └── domExtractor.service.ts
```

---

# Complete Implementation

## domExtractor.service.ts

```ts
class DOMExtractorService {

    /**
     * ==============================
     * Public API
     * ==============================
     */
    extract(): string {

        if (!document.body) {
            return "";
        }

        return this.walk(document.body)
            .trim()
            .replace(/\n{3,}/g, "\n\n");
    }

    /**
     * ==============================
     * Recursive DOM Walker
     * ==============================
     */
    private walk(node: Node): string {

        if (!node) {
            return "";
        }

        /*
        -------------------------
        Text Node
        -------------------------
        */

        if (node.nodeType === Node.TEXT_NODE) {

            return node.textContent
                ?.replace(/\s+/g, " ")
                .trim() || "";
        }

        /*
        -------------------------
        Ignore non-elements
        -------------------------
        */

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return "";
        }

        const element = node as HTMLElement;

        /*
        -------------------------
        Ignore Hidden Elements
        -------------------------
        */

        if (!this.isVisible(element)) {
            return "";
        }

        /*
        -------------------------
        Skip unwanted tags
        -------------------------
        */

        if (this.shouldSkip(element)) {
            return "";
        }

        let result = "";

        /*
        -------------------------
        Preserve headings
        -------------------------
        */

        if (/^H[1-6]$/.test(element.tagName)) {

            result += "\n\n# ";

            result += element.innerText.trim();

            result += "\n\n";

            return result;
        }

        /*
        -------------------------
        Paragraph
        -------------------------
        */

        if (element.tagName === "P") {

            result += "\n";

            result += element.innerText.trim();

            result += "\n";

            return result;
        }

        /*
        -------------------------
        Lists
        -------------------------
        */

        if (element.tagName === "LI") {

            result += "- ";

            result += element.innerText.trim();

            result += "\n";

            return result;
        }

        /*
        -------------------------
        Code Block
        -------------------------
        */

        if (
            element.tagName === "PRE" ||
            element.tagName === "CODE"
        ) {

            result += "\n```";

            result += "\n";

            result += element.textContent;

            result += "\n```\n";

            return result;
        }

        /*
        -------------------------
        Walk children
        -------------------------
        */

        for (const child of element.childNodes) {

            result += this.walk(child);
        }

        return result;
    }

    /**
     * ==============================
     * Visibility Check
     * ==============================
     */
    private isVisible(element: HTMLElement): boolean {

        const style = window.getComputedStyle(element);

        if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.opacity === "0"
        ) {
            return false;
        }

        if (element.hidden) {
            return false;
        }

        if (
            element.getAttribute("aria-hidden") === "true"
        ) {
            return false;
        }

        return true;
    }

    /**
     * ==============================
     * Skip Elements
     * ==============================
     */
    private shouldSkip(element: HTMLElement): boolean {

        const skipTags = [

            "SCRIPT",

            "STYLE",

            "NOSCRIPT",

            "SVG",

            "IFRAME",

            "CANVAS",

            "FOOTER"

        ];

        if (
            skipTags.includes(element.tagName)
        ) {
            return true;
        }

        const id = (
            element.id || ""
        ).toLowerCase();

        const cls = (
            element.className || ""
        ).toLowerCase();

        const patterns = [

            "cookie",

            "advert",

            "ads",

            "banner",

            "popup",

            "subscribe",

            "newsletter",

            "tracking",

            "sponsor",

            "sidebar"

        ];

        return patterns.some(pattern =>
            id.includes(pattern) ||
            cls.includes(pattern)
        );
    }
}

export default new DOMExtractorService();
```

---

# Example Input

```html
<body>

<header>

Navigation

</header>

<article>

<h1>

Understanding React

</h1>

<p>

React is a JavaScript library.

</p>

<pre>

const App = () => {}

</pre>

</article>

<script>

console.log("tracking")

</script>

</body>
```

---

# Extracted Output

```text
# Understanding React

React is a JavaScript library.

```
const App = () => {}
```
```

Notice that:

- Navigation is removed
- Script is removed
- Visible article is preserved
- Heading hierarchy is maintained
- Code blocks remain intact

---

# Processing Pipeline

```
Raw HTML
      │
      ▼
DOM Tree
      │
      ▼
Visibility Filter
      │
      ▼
Remove Scripts
      │
      ▼
Remove Styles
      │
      ▼
Remove Ads
      │
      ▼
Remove Cookie Banners
      │
      ▼
Preserve Headings
      │
      ▼
Preserve Paragraphs
      │
      ▼
Preserve Lists
      │
      ▼
Preserve Code Blocks
      │
      ▼
Clean Structured Text
```

---

# Advantages of This Approach

## Smaller Prompts

Instead of sending hundreds of kilobytes of HTML, only meaningful text is forwarded.

---

## Faster AI Responses

Fewer tokens result in:

- lower latency
- faster streaming
- better user experience

---

## Reduced Token Costs

Even when running local models, reducing prompt size improves:

- inference speed
- memory usage
- throughput

---

## Better AI Accuracy

By removing boilerplate content, the model focuses on:

- documentation
- articles
- tutorials
- code examples
- technical explanations

instead of navigation menus and advertisements.

---

## Framework Independent

The extractor works with pages built using:

- React
- Angular
- Vue
- Svelte
- Next.js
- Nuxt
- Astro
- Static HTML

because it operates on the rendered DOM rather than the source HTML.

---

# Best Practices

- Traverse the rendered DOM instead of raw HTML.
- Skip invisible elements early to improve performance.
- Ignore scripts, styles, iframes, and SVGs.
- Preserve headings and document hierarchy.
- Retain code blocks exactly as rendered.
- Normalize whitespace to produce clean prompts.
- Keep the extraction logic modular so additional filters (e.g., tables, forms, Markdown conversion) can be added easily.
- Avoid expensive DOM operations inside recursive loops; prefer lightweight checks and early exits.

---

# Summary

In this chapter, you built the **DOM Extraction Service**, the first major component that enables Zeba AI to understand real webpage content instead of relying solely on browser metadata.

The service:

- Traverses the DOM recursively
- Ignores hidden and irrelevant nodes
- Removes scripts, styles, ads, and cookie banners
- Preserves headings, paragraphs, lists, and code blocks
- Produces clean, structured text optimized for LLMs

This extracted content becomes the foundation for the next stage of the pipeline, where Zeba AI will intelligently identify articles, documentation, and code before compressing the information into an AI-friendly context.


## 10.4 Readability Extraction

Complete implementation:

```
readability.service.ts
```

Topics:

- Mozilla Readability
- Article extraction
- Navigation removal
- Footer removal
- Sidebar removal
- Advertisement removal

Pipeline:

```
Raw HTML

↓

Readability

↓

Main Article
```

---

# 10.4 Readability Extraction

Modern web pages contain far more than the information a user actually wants to understand. Navigation bars, advertisements, cookie banners, sidebars, comments, popups, social widgets, and tracking scripts often account for more HTML than the article itself.

Sending all of this raw HTML to an LLM dramatically increases token usage, introduces irrelevant information, and reduces answer quality.

To solve this problem, **Zeba AI** uses **Mozilla Readability**, one of the most widely adopted open-source content extraction libraries, to identify and extract the primary article or document from any webpage.

Instead of processing thousands of noisy HTML elements, the AI receives only the meaningful content.

---

# Why Readability?

Consider opening a technical documentation page.

Although the page appears simple to a human, the underlying HTML typically contains:

- Navigation menus
- Headers
- Footers
- Cookie banners
- Login dialogs
- Search widgets
- Analytics scripts
- Advertisements
- Comment sections
- Related articles
- Social sharing buttons
- Hidden accessibility elements

Only a small portion of the HTML actually contains the content the user wants.

For example:

```
React Documentation

-----------------------------------------
Navigation
-----------------------------------------
Home
Learn
API
Reference
Blog
Community

-----------------------------------------
Article
-----------------------------------------

What is React?

React is a JavaScript library...

Hooks allow...

Components...

-----------------------------------------
Footer
-----------------------------------------
Meta
Facebook
Copyright
Privacy
```

Without Readability, an AI model wastes valuable context on the navigation and footer instead of the article.

---

# Mozilla Readability

Mozilla created the **Readability** library for Firefox Reader Mode.

Its goal is simple:

> Extract the primary readable article from a webpage.

It intelligently removes:

- Navigation
- Sidebars
- Headers
- Footers
- Advertisements
- Popups
- Cookie banners
- Related posts
- Social buttons
- Widgets

while preserving:

- Headings
- Paragraphs
- Lists
- Images
- Code blocks
- Tables
- Links
- Quotes

The result is a clean, article-focused document.

---

# Installation

Install the required packages.

```bash
npm install @mozilla/readability
npm install jsdom
```

These libraries work together:

- **jsdom** creates a virtual browser DOM.
- **Readability** analyzes that DOM.
- Zeba AI receives only the cleaned article.

---

# Project Structure

```
src/

services/

    readability.service.ts

types/

    readability.types.ts
```

---

# Readability Output

The Mozilla parser returns a structured article.

```ts
export interface ReadabilityResult {

    title: string;

    byline?: string;

    excerpt?: string;

    content: string;

    textContent: string;

    length: number;

    siteName?: string;

}
```

This provides both HTML and plain text versions of the extracted article.

---

# Complete Implementation

## readability.service.ts

```ts
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

import type { ReadabilityResult } from "../types/readability.types";

class ReadabilityService {

    /**
     * =====================================
     * Extract Main Article
     * =====================================
     */
    extract(html: string): ReadabilityResult | null {

        const dom = new JSDOM(html, {
            url: "https://example.com"
        });

        const reader = new Readability(dom.window.document);

        const article = reader.parse();

        if (!article) {
            return null;
        }

        return {
            title: article.title,
            byline: article.byline,
            excerpt: article.excerpt,
            content: article.content,
            textContent: article.textContent,
            length: article.length,
            siteName: article.siteName
        };
    }

}

export default new ReadabilityService();
```

---

# Service Flow

The service receives raw HTML.

```
Raw HTML

↓

Create Virtual DOM

↓

Readability Parser

↓

Article Detection

↓

Clean Content

↓

Structured Article

↓

LLM
```

---

# Extraction Pipeline

```
Raw HTML

↓

JSDOM

↓

Mozilla Readability

↓

Main Article

↓

Plain Text

↓

Markdown Conversion

↓

Context Compression

↓

LLM
```

This pipeline dramatically improves context quality before sending data to the AI.

---

# Example Input

```html
<html>

<body>

<header>

Navigation

</header>

<main>

<article>

<h1>Understanding React</h1>

<p>

React is a JavaScript library...

</p>

</article>

</main>

<footer>

Copyright

</footer>

</body>

</html>
```

---

# Extracted Result

```text
Understanding React

React is a JavaScript library...
```

Everything else has been removed automatically.

---

# Removing Navigation

Before extraction:

```
Home

Products

Pricing

Documentation

Blog

Support
```

After extraction:

```
(removed)
```

Navigation contributes no value to an LLM when answering user questions.

---

# Removing Sidebars

Original page:

```
Article

Sidebar

Recent Posts

Archives

Categories

Newsletter

Ads
```

Extracted article:

```
Article Only
```

---

# Removing Footers

Original HTML:

```
Copyright

Privacy

Terms

Facebook

Twitter

Instagram
```

Result:

```
Removed
```

---

# Removing Advertisements

Advertisements are among the largest sources of unnecessary tokens.

Examples:

```
Buy Now

50% Discount

Sponsored

Recommended

Ad

Promotion
```

Readability ignores these automatically.

---

# Removing Cookie Banners

Modern websites include cookie consent popups.

Example:

```
Accept Cookies

Manage Preferences

Reject

Privacy Settings
```

These elements never reach the AI.

---

# Preserving Headings

Readability keeps important structure.

Input:

```html
<h1>React</h1>

<h2>Hooks</h2>

<h2>Components</h2>
```

Output:

```
React

Hooks

Components
```

The document hierarchy remains intact.

---

# Preserving Paragraphs

Paragraphs are preserved exactly.

Input:

```html
<p>

React is declarative.

</p>

<p>

React uses components.

</p>
```

Output:

```
React is declarative.

React uses components.
```

---

# Preserving Lists

Input:

```html
<ul>

<li>Hooks</li>

<li>State</li>

<li>Props</li>

</ul>
```

Output:

```
• Hooks

• State

• Props
```

Lists provide important semantic structure and are retained.

---

# Preserving Code Blocks

Technical documentation often contains source code.

Readability preserves:

````html
<pre>

<code>

const app = createApp();

</code>

</pre>

----



## 10.5 Intelligent Code Detection

Complete implementation:

```
codeExtractor.service.ts
```

Detect code from:

- GitHub
- StackOverflow
- MDN
- Dev.to
- Medium
- Documentation websites

Supported selectors:

```
<pre>

<code>

.language-js

.language-ts

.highlight

.code
```

---

# 10.5 Intelligent Code Detection

Modern AI coding assistants must do far more than simply scrape visible text from a webpage. Developers spend much of their time reading source code on platforms such as GitHub, Stack Overflow, MDN, Dev.to, official documentation, and technical blogs. If an AI assistant cannot distinguish executable code from regular article text, the quality of responses drops significantly.

This chapter introduces the **Intelligent Code Detection Service**, one of the core components of Zeba AI's browser intelligence pipeline. Its primary responsibility is to detect, extract, clean, and organize programming code from webpages while preserving syntax, indentation, language information, and contextual metadata.

Unlike simple DOM traversal, this service understands the structure of documentation websites and identifies code regardless of how it is rendered.

---

# Learning Objectives

By the end of this chapter you will understand:

- How code snippets are represented in HTML
- How different documentation websites structure code blocks
- Detecting programming languages automatically
- Extracting clean source code
- Removing duplicate snippets
- Preserving formatting
- Handling syntax highlighters
- Producing AI-ready code context

---

# Why Code Detection Matters

Consider the following GitHub page.

```html
<pre>
<code class="language-ts">

export const sum = (a:number,b:number)=>a+b;

</code>
</pre>
```

To a browser, this is simply HTML.

To an AI assistant, this is valuable source code.

Without intelligent extraction, the assistant would receive:

```
export const sum = (a:number,b:number)=>a+b;
```

mixed together with navigation menus, comments, advertisements, repository names, contributor lists, and footer content.

Instead, we want:

```typescript
export const sum = (a:number,b:number)=>a+b;
```

along with:

- filename
- programming language
- source website
- hierarchy
- surrounding explanation

---

# Supported Websites

The extractor is designed to recognize common documentation layouts.

| Website | Support |
|----------|----------|
| GitHub | ✅ |
| Stack Overflow | ✅ |
| MDN | ✅ |
| Dev.to | ✅ |
| Medium | ✅ |
| React Docs | ✅ |
| Angular Docs | ✅ |
| Vue Docs | ✅ |
| Next.js Docs | ✅ |
| Node.js Docs | ✅ |
| Express Docs | ✅ |
| Tailwind Docs | ✅ |
| Kubernetes Docs | ✅ |
| Docker Docs | ✅ |
| Jenkins Docs | ✅ |

---

# Common HTML Structures

Most documentation sites use predictable HTML.

### GitHub

```html
<pre>

<code class="language-ts">

const app = express();

</code>

</pre>
```

---

### Stack Overflow

```html
<pre>

<code>

console.log("Hello");

</code>

</pre>
```

---

### MDN

```html
<div class="code-example">

<pre>

<code class="language-js">

fetch("/api")

</code>

</pre>

</div>
```

---

### Dev.to

```html
<div class="highlight">

<pre>

<code class="language-python">

print("Hello")

</code>

</pre>

</div>
```

---

# Supported Selectors

The extractor scans multiple selectors to maximize compatibility.

```text
pre

code

.language-js

.language-ts

.language-tsx

.language-jsx

.language-json

.language-html

.language-css

.language-python

.language-java

.language-go

.language-rust

.language-cpp

.highlight

.highlight-source

.highlight-text

.code

.code-block

.code-example
```

---

# Extraction Pipeline

```
HTML Document

        │

        ▼

Locate Code Containers

        │

        ▼

Extract Raw Source

        │

        ▼

Detect Programming Language

        │

        ▼

Normalize Indentation

        │

        ▼

Remove Duplicate Snippets

        │

        ▼

Return Structured Code Blocks
```

---

# Folder Structure

```
src

└── services

    └── codeExtractor.service.ts
```

---

# CodeBlock Interface

```typescript
export interface CodeBlock {

    id: string;

    language: string;

    filename?: string;

    title?: string;

    code: string;

    lineCount: number;

    source: string;

}
```

---

# Complete Implementation

## codeExtractor.service.ts

```typescript
export interface CodeBlock {

    id: string;

    language: string;

    filename?: string;

    title?: string;

    code: string;

    lineCount: number;

    source: string;

}

class CodeExtractorService {

    /**
     * Supported selectors
     */
    private readonly selectors = [

        "pre",

        "code",

        ".highlight",

        ".highlight-source",

        ".code",

        ".code-block",

        ".code-example",

        "[class*=language-]"

    ];

    /**
     * Extract all code snippets
     */
    extract(): CodeBlock[] {

        const blocks: CodeBlock[] = [];

        const visited = new Set<Element>();

        this.selectors.forEach(selector => {

            document.querySelectorAll(selector).forEach(element => {

                if (visited.has(element)) {

                    return;

                }

                visited.add(element);

                const code = this.extractCode(element);

                if (!code) {

                    return;

                }

                blocks.push({

                    id: crypto.randomUUID(),

                    language: this.detectLanguage(element),

                    filename: this.detectFilename(element),

                    title: this.detectTitle(element),

                    code,

                    lineCount: code.split("\n").length,

                    source: location.hostname

                });

            });

        });

        return this.removeDuplicates(blocks);

    }

    /**
     * Extract text preserving formatting
     */
    private extractCode(element: Element): string {

        const text = element.textContent ?? "";

        return text

            .replace(/\t/g, "    ")

            .replace(/\r/g, "")

            .trim();

    }

    /**
     * Detect programming language
     */
    private detectLanguage(element: Element): string {

        const className = element.className;

        const languages = [

            "typescript",

            "ts",

            "javascript",

            "js",

            "tsx",

            "jsx",

            "json",

            "html",

            "css",

            "scss",

            "python",

            "java",

            "go",

            "rust",

            "cpp",

            "c",

            "bash",

            "shell",

            "yaml",

            "xml",

            "sql"

        ];

        for (const language of languages) {

            if (

                className.includes(language)

            ) {

                return language;

            }

        }

        return "text";

    }

    /**
     * Try finding filename
     */
    private detectFilename(element: Element): string | undefined {

        const container = element.closest("figure");

        if (!container) {

            return undefined;

        }

        const title =

            container.querySelector("figcaption");

        return title?.textContent?.trim();

    }

    /**
     * Try detecting title
     */
    private detectTitle(element: Element): string | undefined {

        const previous =

            element.previousElementSibling;

        return previous?.textContent?.trim();

    }

    /**
     * Remove duplicate snippets
     */
    private removeDuplicates(

        blocks: CodeBlock[]

    ): CodeBlock[] {

        const seen = new Set<string>();

        return blocks.filter(block => {

            if (

                seen.has(block.code)

            ) {

                return false;

            }

            seen.add(block.code);

            return true;

        });

    }

}

export default new CodeExtractorService();
```

---

# Example Output

```json
[
  {
    "language": "typescript",
    "filename": "server.ts",
    "title": "Express Server",
    "lineCount": 28,
    "source": "github.com",
    "code": "const app = express();"
  },
  {
    "language": "javascript",
    "lineCount": 14,
    "source": "stackoverflow.com",
    "code": "console.log('Hello World');"
  }
]
```

---

# Language Detection Strategy

The service attempts language detection in this order:

1. CSS classes (`language-ts`, `language-js`)
2. Highlight.js classes
3. Prism.js classes
4. GitHub syntax classes
5. File extension from captions
6. Default to `text`

---

# Duplicate Removal

Many websites render the same code block multiple times for:

- Copy buttons
- Mobile layouts
- Hidden tabs
- Accessibility layers

The extractor hashes the snippet content and removes duplicates.

```text
Snippet A

↓

Hash

↓

Already Seen?

↓

Skip
```

---

# Preserving Formatting

Correct indentation is essential for AI understanding.

Input:

```html
<code>

function test(){

console.log("Hi")

}

</code>
```

Output:

```javascript
function test(){

console.log("Hi")

}
```

Tabs are converted to spaces, carriage returns are removed, and whitespace is normalized without altering the code logic.

---

# Performance Optimizations

To keep extraction fast on large documentation pages:

- Query only known selectors
- Track visited elements
- Skip empty snippets
- Remove duplicates early
- Avoid expensive DOM traversals
- Preserve only visible code

---

# Integration with Browser Context

The extracted code becomes part of the browser context object.

```typescript
browserContext.codeBlocks =

    codeExtractor.extract();
```

Example:

```json
{
  "title": "React",
  "url": "https://react.dev",
  "selectedText": "",
  "codeBlocks": [
    {
      "language": "typescript",
      "code": "useState(0)"
    }
  ]
}
```

---

# Benefits for Zeba AI

Intelligent code detection enables the assistant to:

- Explain source code
- Review code quality
- Detect bugs
- Suggest optimizations
- Generate documentation
- Convert between programming languages
- Create unit tests
- Identify frameworks and libraries
- Improve RAG context quality

---

# Best Practices

- Prefer semantic HTML selectors over generic DOM traversal.
- Preserve original code formatting whenever possible.
- Extract only visible and meaningful code snippets.
- Remove duplicates before sending context to the LLM.
- Detect languages using multiple heuristics.
- Keep extracted metadata lightweight but informative.
- Separate extraction logic from browser context assembly.
- Make the extractor extensible by allowing new selectors to be added easily.

---

# Summary

In this chapter, we built the **Intelligent Code Detection Service**, a critical component of Zeba AI's browser intelligence system. The service locates source code across popular developer websites, detects programming languages, preserves formatting, removes duplicate snippets, and returns structured metadata that can be injected into prompts.

With reliable code extraction in place, Zeba AI is now capable of understanding not only webpage text but also the executable examples that developers rely on every day. This significantly improves code explanations, reviews, debugging assistance, and context-aware AI interactions.

In the next chapter, we will combine DOM extraction, Readability parsing, and intelligent code detection into a unified **Browser Context Builder**, preparing highly optimized context for Retrieval-Augmented Generation (RAG) and advanced AI reasoning.

## 10.6 Programming Language Detection

Topics:

- Highlight.js
- Prism.js
- CSS classes
- AI fallback
- Syntax heuristics

Supported languages:

- JavaScript
- TypeScript
- Python
- Java
- Go
- Rust
- C#
- Dockerfile
- YAML
- JSON
- HTML
- CSS

---

# 10.6 Programming Language Detection

Modern AI assistants should not treat every code block as plain text. Understanding **which programming language** a code snippet belongs to enables the assistant to provide syntax-aware explanations, generate accurate fixes, optimize code, and answer language-specific questions.

In this chapter, we will build an intelligent **Programming Language Detection Service** for **Zeba AI**. The service combines **DOM analysis**, **syntax highlighter metadata**, and **heuristic detection** to accurately identify programming languages from webpages. When conventional detection fails, the service falls back to **AI-based language identification**, ensuring robust performance across documentation sites, GitHub repositories, blogs, tutorials, and enterprise applications.

---

# Learning Objectives

After completing this chapter, you will understand:

- How browsers expose programming language information
- How syntax highlighting libraries work
- Detecting language using CSS classes
- Detecting language using HTML attributes
- Language heuristics
- AI fallback detection
- Confidence scoring
- Multi-language extraction
- Production-ready architecture

---

# Why Language Detection Matters

Suppose the user opens GitHub and selects the following code:

```javascript
const app = express();

app.listen(3000);
```

Without language detection:

```
AI:
"This appears to be code."
```

With language detection:

```
Language:
JavaScript

Framework:
Express.js

Runtime:
Node.js

Explanation:
Creates an Express application
and starts listening on port 3000.
```

The difference is enormous.

---

# Where Language Information Comes From

Programming websites expose language information differently.

Examples include:

- GitHub
- StackOverflow
- MDN
- Dev.to
- Medium
- Hashnode
- Documentation websites
- Enterprise dashboards

Each site structures HTML differently.

---

# Common HTML Patterns

GitHub

```html
<pre>

<code class="language-typescript">

const app = express();

</code>

</pre>
```

---

Prism.js

```html
<pre>

<code class="language-javascript">

...

</code>

</pre>
```

---

Highlight.js

```html
<code class="hljs language-python">

print("Hello")

</code>
```

---

Markdown Renderers

```html
<code class="lang-go">

package main

</code>
```

---

Documentation Websites

```html
<pre data-language="yaml">

...

</pre>
```

---

GitBook

```html
<pre class="language-docker">

FROM node:20

</pre>
```

---

# Supported Languages

Zeba AI detects the following languages out of the box.

| Language | Extensions |
|-----------|------------|
| JavaScript | js, jsx |
| TypeScript | ts, tsx |
| Python | py |
| Java | java |
| Go | go |
| Rust | rs |
| C# | cs |
| Dockerfile | Dockerfile |
| YAML | yaml, yml |
| JSON | json |
| HTML | html |
| CSS | css |

Additional languages can be added easily.

---

# Detection Pipeline

```
Extract Code Block

        │

        ▼

Check CSS Classes

        │

        ▼

Check data-language

        │

        ▼

Check language-* classes

        │

        ▼

Syntax Heuristics

        │

        ▼

AI Fallback

        │

        ▼

Detected Language
```

---

# Project Structure

```
src/

services/

    languageDetector.service.ts

types/

    detectedLanguage.types.ts
```

---

# Type Definition

```ts
export interface DetectedLanguage {

    language: string;

    confidence: number;

    source:
        | "css-class"
        | "attribute"
        | "heuristic"
        | "ai"
        | "unknown";

}
```

---

# languageDetector.service.ts

```ts
import type { DetectedLanguage } from "../types/detectedLanguage.types";

class LanguageDetectorService {

    private readonly languageMap: Record<string, string> = {

        js: "JavaScript",
        javascript: "JavaScript",

        ts: "TypeScript",
        typescript: "TypeScript",

        jsx: "JavaScript",
        tsx: "TypeScript",

        py: "Python",
        python: "Python",

        java: "Java",

        go: "Go",

        rust: "Rust",
        rs: "Rust",

        cs: "C#",
        csharp: "C#",

        yaml: "YAML",
        yml: "YAML",

        json: "JSON",

        html: "HTML",

        css: "CSS",

        docker: "Dockerfile",
        dockerfile: "Dockerfile"

    };

    detect(element: HTMLElement): DetectedLanguage {

        const cssResult =
            this.detectFromClass(element);

        if (cssResult)
            return cssResult;

        const attributeResult =
            this.detectFromAttribute(element);

        if (attributeResult)
            return attributeResult;

        const heuristicResult =
            this.detectFromSyntax(element.textContent ?? "");

        if (heuristicResult)
            return heuristicResult;

        return {

            language: "Unknown",

            confidence: 0,

            source: "unknown"

        };

    }

    private detectFromClass(
        element: HTMLElement
    ): DetectedLanguage | null {

        const classes =
            [...element.classList];

        for (const cls of classes) {

            const normalized =
                cls
                    .replace("language-", "")
                    .replace("lang-", "")
                    .replace("hljs-", "")
                    .toLowerCase();

            const language =
                this.languageMap[normalized];

            if (language) {

                return {

                    language,

                    confidence: 0.98,

                    source: "css-class"

                };

            }

        }

        return null;

    }

    private detectFromAttribute(
        element: HTMLElement
    ): DetectedLanguage | null {

        const value =
            element.getAttribute("data-language") ??
            element.getAttribute("data-lang");

        if (!value)
            return null;

        const language =
            this.languageMap[value.toLowerCase()];

        if (!language)
            return null;

        return {

            language,

            confidence: 0.95,

            source: "attribute"

        };

    }

    private detectFromSyntax(
        code: string
    ): DetectedLanguage | null {

        if (
            code.includes("const ") &&
            code.includes("=>")
        ) {

            return {

                language: "JavaScript",

                confidence: 0.75,

                source: "heuristic"

            };

        }

        if (
            code.includes("interface ") ||
            code.includes(": string")
        ) {

            return {

                language: "TypeScript",

                confidence: 0.80,

                source: "heuristic"

            };

        }

        if (
            code.includes("def ") &&
            code.includes("import ")
        ) {

            return {

                language: "Python",

                confidence: 0.80,

                source: "heuristic"

            };

        }

        if (
            code.includes("package main")
        ) {

            return {

                language: "Go",

                confidence: 0.85,

                source: "heuristic"

            };

        }

        if (
            code.includes("FROM ") &&
            code.includes("RUN ")
        ) {

            return {

                language: "Dockerfile",

                confidence: 0.90,

                source: "heuristic"

            };

        }

        if (
            code.includes("apiVersion:")
        ) {

            return {

                language: "YAML",

                confidence: 0.90,

                source: "heuristic"

            };

        }

        if (
            code.trim().startsWith("{") &&
            code.includes("\"")
        ) {

            return {

                language: "JSON",

                confidence: 0.88,

                source: "heuristic"

            };

        }

        return null;

    }

}

export default new LanguageDetectorService();
```

---

# AI Fallback Detection

Sometimes webpages contain plain `<pre>` tags without metadata:

```html
<pre>

SELECT * FROM users;

</pre>
```

No CSS class.

No language attribute.

No syntax highlighting.

In such cases, Zeba AI can ask the LLM:

```
Identify the programming language
of the following code.

Only respond with the language name.

<code>

...

</code>
```

Example response:

```
SQL
```

This fallback is slower but dramatically improves accuracy.

---

# Confidence Scoring

Each detection method has a different confidence level.

| Method | Confidence |
|----------|-----------|
| CSS Class | 0.98 |
| HTML Attribute | 0.95 |
| Syntax Heuristics | 0.70–0.90 |
| AI Detection | 0.85 |
| Unknown | 0.00 |

Applications can use confidence scores to decide whether additional verification is needed.

---

# Examples

### GitHub

```html
<code class="language-ts">
```

Output

```json
{
  "language": "TypeScript",
  "confidence": 0.98,
  "source": "css-class"
}
```

---

### Kubernetes YAML

```yaml
apiVersion: apps/v1

kind: Deployment
```

Output

```json
{
  "language": "YAML",
  "confidence": 0.90,
  "source": "heuristic"
}
```

---

### Dockerfile

```dockerfile
FROM node:20

RUN npm install
```

Output

```json
{
  "language": "Dockerfile",
  "confidence": 0.90,
  "source": "heuristic"
}
```

---

### Python

```python
import os

def hello():
    print("Hi")
```

Output

```json
{
  "language": "Python",
  "confidence": 0.80,
  "source": "heuristic"
}
```

---

# Best Practices

- Prefer metadata over heuristics whenever available.
- Normalize CSS class names before matching.
- Maintain a centralized language mapping.
- Assign confidence scores to every detection.
- Use AI fallback only when deterministic methods fail.
- Keep heuristic rules simple and maintainable.
- Log unknown languages to improve future detection.
- Design the detector so new languages can be added without modifying core logic.

---

# Summary

In this chapter, we implemented a **production-ready Programming Language Detection Service** for Zeba AI. By combining CSS class inspection, HTML attributes, syntax heuristics, and AI-based fallback detection, the assistant can accurately recognize a wide variety of programming languages across documentation sites, GitHub repositories, blogs, and enterprise portals. This language awareness forms the foundation for syntax-aware explanations, intelligent code review, automated debugging, and future Retrieval-Augmented Generation (RAG) workflows, making Zeba AI significantly more capable when assisting developers.

## 10.7 Markdown Conversion

Complete implementation:

```
markdown.service.ts
```

Convert:

```
HTML

↓

Markdown
```

Example:

```html
<h1>Hello</h1>
```

becomes

```markdown
# Hello
```

---

# 10.7 Markdown Conversion

Modern AI assistants work best with clean, structured text rather than raw HTML. Web pages are filled with navigation bars, advertisements, scripts, stylesheets, tracking pixels, icons, and deeply nested elements that provide little value to a Large Language Model (LLM). Sending raw HTML directly to an AI wastes tokens, increases processing costs, and often produces lower-quality responses.

To solve this problem, Zeba AI converts extracted webpage content into **Markdown**, a lightweight, human-readable format that preserves the semantic structure of a document while eliminating unnecessary HTML complexity.

In this chapter, we will build a production-ready **Markdown Conversion Service** that transforms cleaned HTML into Markdown before it is sent to the AI backend.

---

# Why Convert HTML to Markdown?

A browser page may contain thousands of HTML elements.

For example:

```html
<html>
<head>
    <title>React Documentation</title>
</head>

<body>

<header>
    Navigation Menu
</header>

<main>

<article>

<h1>Introduction</h1>

<p>React is a JavaScript library.</p>

<pre>
const App = () => <h1>Hello</h1>;
</pre>

</article>

</main>

<footer>
Copyright 2026
</footer>

</body>
</html>
```

Although humans easily recognize the important content, an AI model receives everything equally.

Problems include:

- Navigation menus
- Footer links
- Advertisements
- CSS classes
- Nested div elements
- JavaScript
- Tracking scripts
- Layout tables

Most of these consume valuable LLM context without improving the answer.

---

# HTML vs Markdown

Instead of sending HTML:

```html
<h1>React</h1>

<p>React is a JavaScript library.</p>

<ul>

<li>Components</li>

<li>Hooks</li>

</ul>
```

We convert it into Markdown:

```markdown
# React

React is a JavaScript library.

- Components
- Hooks
```

The meaning remains identical while reducing token usage dramatically.

---

# Markdown Conversion Pipeline

```
Raw HTML

        │

        ▼

Readability Extraction

        │

        ▼

Clean HTML

        │

        ▼

Markdown Service

        │

        ▼

Markdown Document

        │

        ▼

Prompt Builder

        │

        ▼

LLM
```

---

# Benefits

Markdown provides several advantages:

- Much smaller prompt size
- Better AI comprehension
- Preserves document hierarchy
- Easier code extraction
- Better summarization
- Better RAG chunking
- Easier indexing
- Lower token cost

---

# Selecting a Markdown Library

Instead of writing a custom HTML parser, we'll use **Turndown**, one of the most widely used HTML-to-Markdown conversion libraries.

Install it:

```bash
npm install turndown
```

---

# Folder Structure

```
src/

 ├── services/

 │      markdown.service.ts

 ├── utils/

 ├── prompts/

 ├── providers/
```

---

# Complete markdown.service.ts

```ts
import TurndownService from "turndown";

class MarkdownService {

    private readonly turndown: TurndownService;

    constructor() {

        this.turndown = new TurndownService({

            headingStyle: "atx",

            bulletListMarker: "-",

            codeBlockStyle: "fenced",

            emDelimiter: "_",

            strongDelimiter: "**"

        });

        this.configureRules();

    }

    /**
     * Configure custom conversion rules
     */
    private configureRules() {

        // Remove scripts
        this.turndown.remove(["script"]);

        // Remove styles
        this.turndown.remove(["style"]);

        // Remove SVG
        this.turndown.remove(["svg"]);

        // Remove canvas
        this.turndown.remove(["canvas"]);

        // Remove iframe
        this.turndown.remove(["iframe"]);

        // Preserve preformatted code
        this.turndown.addRule("codeBlocks", {

            filter: ["pre"],

            replacement(content) {

                return `\n\n\`\`\`\n${content}\n\`\`\`\n\n`;

            }

        });

    }

    /**
     * Convert HTML to Markdown
     */
    convert(html: string): string {

        if (!html) {

            return "";

        }

        return this.turndown.turndown(html);

    }

}

export default new MarkdownService();
```

---

# Using the Markdown Service

```ts
import markdownService from "./markdown.service";

const markdown = markdownService.convert(cleanHtml);

console.log(markdown);
```

---

# Example 1

Input HTML

```html
<h1>React</h1>

<p>React is a JavaScript library.</p>
```

Output

```markdown
# React

React is a JavaScript library.
```

---

# Example 2

Input

```html
<ul>

<li>Node.js</li>

<li>Express</li>

<li>MongoDB</li>

</ul>
```

Output

```markdown
- Node.js
- Express
- MongoDB
```

---

# Example 3

Input

```html
<pre>

const app = express();

</pre>
```

Output

````markdown
```text
const app = express();
```

Example 4

Input

<h2>Installation</h2>

<p>Run:</p>

<pre>

npm install react

</pre>

Output

## Installation

Run:

```text
npm install react
```
Handling Links

Input

<a href="https://react.dev">

React Docs

</a>

Output

[React Docs](https://react.dev)
Handling Images

Input

<img src="/logo.png" alt="Logo">

Output

![Logo](/logo.png)
Handling Tables

Input

<table>

<tr>

<th>Name</th>

<th>Language</th>

</tr>

<tr>

<td>React</td>

<td>JavaScript</td>

</tr>

</table>

Output

| Name | Language |
|------|----------|
| React | JavaScript |
Handling Nested Headings

Input

<h1>Main</h1>

<h2>Section</h2>

<h3>Subsection</h3>

Output

# Main

## Section

### Subsection
Removing Noise Before Conversion

Markdown conversion works best after unwanted HTML has already been removed.

Recommended preprocessing:

Scripts
Styles
Ads
Navigation
Sidebar
Footer
Comments
Hidden elements

This significantly improves the quality of the final Markdown.

Token Reduction Example

Raw HTML

18,000 characters

↓

Clean HTML

7,800 characters

↓

Markdown

4,200 characters

↓

Prompt

3,900 characters

This reduction saves both processing time and LLM tokens.

Integration with DOM Extraction

The Markdown service should be used after DOM extraction and readability processing.

DOM Extraction

        ↓

Readability

        ↓

Code Extraction

        ↓

Markdown Conversion

        ↓

Context Compression

        ↓

Prompt Builder

        ↓

AI Model
Production Best Practices

For production-ready Markdown conversion:

Remove unwanted HTML before conversion.
Preserve document hierarchy.
Use fenced code blocks.
Keep headings in ATX (#) style.
Preserve hyperlinks.
Preserve tables when possible.
Avoid converting navigation menus.
Remove scripts and styles.
Normalize whitespace.
Trim excessive blank lines.
Keep Markdown clean and readable.
Validate output before sending it to the AI.
Chapter Summary

In this chapter, we built a complete Markdown Conversion Service for Zeba AI. Instead of sending noisy HTML to the language model, the application now converts cleaned webpage content into structured Markdown, preserving headings, lists, links, tables, and code blocks while dramatically reducing token usage. This conversion forms a crucial step in the browser intelligence pipeline and prepares webpage content for efficient prompt construction, semantic search, and Retrieval-Augmented Generation (RAG).

In the next chapter, we will further optimize the extracted Markdown through Context Compression, reducing redundant information, preserving only high-value content, and generating compact, AI-ready context suitable for large-scale enterprise applications.


## 10.8 Intelligent Context Builder

Complete implementation:

```
contextBuilder.service.ts
```

Final browser context:

```typescript
interface BrowserContext {

    metadata;

    article;

    codeBlocks;

    markdown;

    headings;

    links;

    tables;

    forms;

}
```

---

# 10.8 Intelligent Context Builder

## Chapter Overview

In the previous chapters, we built multiple browser intelligence services capable of understanding different parts of a webpage.

Our extension can now:

- Extract DOM content
- Identify the main article
- Detect programming code
- Detect programming languages
- Convert HTML into Markdown

However, Large Language Models do not consume each of these independently.

They require one structured object that contains everything required for reasoning.

That is the responsibility of the **Context Builder**.

Instead of sending dozens of individual objects to the backend, the Context Builder creates one optimized browser context that can be injected directly into the AI prompt.

This chapter builds one of the most important services of Zeba AI.

---

# Why Context Builder?

Imagine visiting React documentation.

Different services produce different outputs.

DOM Extractor

```
Entire visible page
```

Readability

```
Main article
```

Markdown

```
Markdown version
```

Code Extractor

```
React example code
```

Heading Extractor

```
Installation
Hooks
Components
```

Link Extractor

```
https://react.dev/reference/react/useState
```

If every service sends data separately, PromptService becomes extremely complicated.

Instead we merge everything.

```
DOM

↓

Article

↓

Markdown

↓

Code

↓

Links

↓

Tables

↓

Forms

↓

One BrowserContext Object

↓

Prompt Builder

↓

LLM
```

This architecture is significantly cleaner and easier to maintain.

---

# Final BrowserContext Interface

Create

```
src/types/browserContext.types.ts
```

```typescript
export interface BrowserMetadata {

    url: string;

    title: string;

    hostname: string;

    protocol: string;

    language: string;

    timestamp: string;

}

export interface CodeBlock {

    language: string;

    code: string;

}

export interface Heading {

    level: number;

    text: string;

}

export interface BrowserLink {

    text: string;

    href: string;

}

export interface BrowserTable {

    headers: string[];

    rows: string[][];

}

export interface BrowserForm {

    action: string;

    method: string;

    fields: string[];

}

export interface BrowserContext {

    metadata: BrowserMetadata;

    article: string;

    markdown: string;

    codeBlocks: CodeBlock[];

    headings: Heading[];

    links: BrowserLink[];

    tables: BrowserTable[];

    forms: BrowserForm[];

}
```

This becomes the single source of truth for browser intelligence.

---

# Context Builder Responsibilities

The Context Builder coordinates all extraction services.

Responsibilities include:

- Build browser metadata
- Extract readable article
- Convert to Markdown
- Detect code snippets
- Extract headings
- Extract hyperlinks
- Extract tables
- Extract forms
- Build final BrowserContext
- Return optimized context

It does **not** contain extraction logic itself.

Instead, it orchestrates specialized services.

---

# Architecture

```
Current Web Page

        │

        ▼

DOM Extractor

        │

        ▼

Readability Service

        │

        ▼

Markdown Service

        │

        ▼

Code Extractor

        │

        ▼

Heading Extractor

        │

        ▼

Link Extractor

        │

        ▼

Table Extractor

        │

        ▼

Form Extractor

        │

        ▼

Context Builder

        │

        ▼

BrowserContext

        │

        ▼

Backend Prompt Builder

        │

        ▼

Ollama / OpenAI
```

---

# Project Structure

```
src/

services/

    contextBuilder.service.ts

    domExtractor.service.ts

    readability.service.ts

    markdown.service.ts

    codeExtractor.service.ts

    headingExtractor.service.ts

    linkExtractor.service.ts

    tableExtractor.service.ts

    formExtractor.service.ts
```

Each service has a single responsibility.

---

# Complete Implementation

Create

```
contextBuilder.service.ts
```

```typescript
import domExtractorService from "./domExtractor.service";
import readabilityService from "./readability.service";
import markdownService from "./markdown.service";
import codeExtractorService from "./codeExtractor.service";
import headingExtractorService from "./headingExtractor.service";
import linkExtractorService from "./linkExtractor.service";
import tableExtractorService from "./tableExtractor.service";
import formExtractorService from "./formExtractor.service";

import type {
    BrowserContext
} from "../types/browserContext.types";

class ContextBuilderService {

    build(): BrowserContext {

        const article =
            readabilityService.extract();

        const markdown =
            markdownService.convert(article);

        return {

            metadata: {

                url: location.href,

                title: document.title,

                hostname: location.hostname,

                protocol: location.protocol,

                language:
                    navigator.language,

                timestamp:
                    new Date().toISOString()

            },

            article,

            markdown,

            codeBlocks:
                codeExtractorService.extract(),

            headings:
                headingExtractorService.extract(),

            links:
                linkExtractorService.extract(),

            tables:
                tableExtractorService.extract(),

            forms:
                formExtractorService.extract()

        };

    }

}

export default new ContextBuilderService();
```

This file contains almost no extraction logic.

Its only responsibility is orchestration.

---

# Metadata Construction

```typescript
metadata: {

    url: location.href,

    title: document.title,

    hostname: location.hostname,

    protocol: location.protocol,

    language: navigator.language,

    timestamp: new Date().toISOString()

}
```

This provides browser-level information.

Example:

```
URL

https://react.dev/reference/react/useState

Title

useState – React

Hostname

react.dev

Protocol

https

Language

en-US

Timestamp

2026-08-02T18:20:00Z
```

---

# Article Extraction

```typescript
const article =
    readabilityService.extract();
```

This returns only meaningful content.

Instead of:

```
Navigation

Sidebar

Footer

Cookie Banner

Ads
```

we obtain:

```
React useState documentation

Examples

Best Practices

Reference
```

---

# Markdown Conversion

```typescript
const markdown =
    markdownService.convert(article);
```

LLMs generally reason better over Markdown than raw HTML.

Example:

```
React

↓

# React
```

```
<ul>

↓

-
-
-
```

```
<pre>

↓

```ts
```
```

---

# Code Block Collection

```typescript
codeBlocks:
    codeExtractorService.extract()
```

Example:

```typescript
[
    {
        language: "typescript",

        code:
        "const [count,setCount]=useState(0)"
    }
]
```

---

# Heading Collection

```typescript
headings:
    headingExtractorService.extract()
```

Example

```typescript
[
    {

        level:1,

        text:"React"

    },

    {

        level:2,

        text:"Installation"

    },

    {

        level:2,

        text:"Hooks"

    }

]
```

Headings improve navigation.

---

# Link Collection

```typescript
links:
    linkExtractorService.extract()
```

Example

```typescript
[
    {

        text:"useEffect",

        href:"https://react.dev/reference/react/useEffect"

    }
]
```

Useful for AI references.

---

# Table Extraction

```typescript
tables:
    tableExtractorService.extract()
```

Example

```
Feature

Supported

React

Yes

Angular

Yes

Vue

Yes
```

becomes

```typescript
[
    {

        headers:

        [

            "Feature",

            "Supported"

        ],

        rows:

        [

            ["React","Yes"],

            ["Angular","Yes"],

            ["Vue","Yes"]

        ]

    }
]
```

---

# Form Extraction

```typescript
forms:
    formExtractorService.extract()
```

Example

```html
<form>

<input>

<textarea>

<button>

</form>
```

becomes

```typescript
[
    {

        action:"/login",

        method:"POST",

        fields:

        [

            "email",

            "password"

        ]

    }
]
```

Useful for future browser automation.

---

# Example BrowserContext Output

```typescript
{

    metadata: {

        url:"https://react.dev",

        title:"React",

        hostname:"react.dev",

        protocol:"https",

        language:"en-US",

        timestamp:"2026-08-02T18:00:00Z"

    },

    article:"React lets you build user interfaces...",

    markdown:"# React\n\nReact lets you...",

    codeBlocks:[

        {

            language:"typescript",

            code:"const [count,setCount]=..."

        }

    ],

    headings:[

        {

            level:1,

            text:"React"

        }

    ],

    links:[

        {

            text:"Hooks",

            href:"https://react.dev/reference"

        }

    ],

    tables:[],

    forms:[]

}
```

---

# Integration with Browser Context Service

The Browser Context Service becomes extremely simple.

```typescript
import contextBuilderService from "./contextBuilder.service";

class BrowserContextService {

    getBrowserContext() {

        return contextBuilderService.build();

    }

}

export default new BrowserContextService();
```

The popup, background service worker, and backend no longer need to know how context is created.

---

# Benefits of the Context Builder

- Single, standardized BrowserContext object
- Loose coupling between extraction services
- Easy to extend with new extractors
- Simplifies PromptService
- Centralizes browser intelligence
- Improves maintainability
- Easier testing and debugging
- Cleaner architecture
- Supports future AI features like semantic search and RAG

---

# Performance Considerations

For large webpages:

- Run expensive extractors only once per page
- Cache BrowserContext until navigation changes
- Limit extracted article length (e.g., first 50–100 KB)
- Truncate oversized code blocks
- Ignore duplicate links
- Skip hidden or irrelevant DOM nodes
- Lazy-load optional extractors when appropriate

These optimizations reduce processing time and minimize token usage when sending context to the AI model.

---

# Summary

In this chapter, we built the **Intelligent Context Builder**, the central orchestration layer that combines all browser understanding services into a single structured `BrowserContext` object. Rather than exposing multiple independent extraction results, it produces one consistent payload containing metadata, article content, Markdown, code snippets, headings, links, tables, and forms. This unified context becomes the foundation for prompt construction, enabling Zeba AI to reason about complete webpages efficiently and preparing the architecture for advanced capabilities such as semantic search, Retrieval-Augmented Generation (RAG), workspace awareness, and enterprise-scale browser intelligence.

## 10.9 Context Compression

Topics:

Remove:

- duplicate text
- empty nodes
- whitespace
- comments
- navigation
- footer
- ads
- cookie banners

Keep:

- headings
- paragraphs
- code
- important links

Goal:

Reduce token usage by 80–90%.

---

# 10.9 Context Compression

---

# Introduction

By Milestone 10.9, Zeba AI has evolved far beyond simply reading a webpage's title or selected text. It now understands complete webpages, extracts articles, detects code blocks, converts HTML into Markdown, identifies headings, tables, links, and builds a rich browser context for the LLM.

However, a new challenge emerges:

> **Large Language Models have limited context windows.**

A single documentation page, GitHub repository, or Medium article can easily contain **50,000–200,000 tokens**, while many models operate with practical limits much lower than that.

Sending an entire webpage directly to the LLM would result in:

- Higher latency
- Increased memory consumption
- Larger API costs
- Poorer response quality
- Context window overflow

The solution is **Context Compression**.

Instead of sending everything, Zeba AI intelligently filters, cleans, ranks, and compresses webpage content while preserving the information most useful to the AI model.

The objective is simple:

> **Reduce token usage by 80–90% while preserving 95%+ of useful information.**

---

# Why Context Compression Matters

Imagine visiting the React documentation homepage.

The raw HTML contains:

- Navigation menus
- Sidebars
- Footer links
- Cookie banners
- Analytics scripts
- CSS
- SVG icons
- Advertisement placeholders
- Theme switchers
- Accessibility helpers
- Hidden elements

Yet the user only asks:

> Explain React Hooks.

The LLM doesn't need 90% of the page.

Without compression:

```
Raw HTML
↓

180,000 tokens
```

With compression:

```
Visible Article
↓

Markdown
↓

Code Blocks
↓

Important Headings
↓

18,000 tokens
```

The AI becomes significantly faster while producing more accurate answers.

---

# Context Compression Pipeline

```
Raw HTML
        │
        ▼
DOM Extraction
        │
        ▼
Readability Extraction
        │
        ▼
Markdown Conversion
        │
        ▼
Remove Noise
        │
        ▼
Remove Duplicates
        │
        ▼
Compress Whitespace
        │
        ▼
Extract Code
        │
        ▼
Rank Important Sections
        │
        ▼
Final Browser Context
```

---

# Compression Goals

The compression engine focuses on preserving:

- Page title
- Main article
- Headings
- Paragraphs
- Code examples
- Tables
- Forms
- Important links
- Selected text
- Documentation examples

Everything else is discarded.

---

# Remove Duplicate Text

Many webpages repeat content.

Example:

```
Navigation

React

Learn React

API Reference

Hooks

Footer

React

API Reference

Hooks
```

The navigation and footer duplicate the same information.

Compression removes repeated text blocks.

Example:

Before:

```
Hooks

Hooks

Hooks

Hooks

Hooks
```

After:

```
Hooks
```

---

# Remove Empty Nodes

HTML frequently contains meaningless elements.

Example:

```html
<div></div>

<span></span>

<p></p>

<section></section>
```

These contribute no useful information.

Compression removes them.

Implementation:

```typescript
function removeEmptyNodes(root: HTMLElement) {

    root.querySelectorAll("*").forEach(node => {

        if (

            node.textContent?.trim() === "" &&

            node.children.length === 0

        ) {

            node.remove();

        }

    });

}
```

---

# Remove Excessive Whitespace

Large HTML documents often include unnecessary whitespace.

Example:

```
React




is




a




JavaScript




library
```

Compression converts it into:

```
React is a JavaScript library
```

Implementation:

```typescript
function normalizeWhitespace(text: string): string {

    return text

        .replace(/\s+/g, " ")

        .trim();

}
```

---

# Remove HTML Comments

Comments add zero value for AI understanding.

Example:

```html
<!-- Header -->

<!-- Analytics -->

<!-- Footer -->

<!-- TODO -->
```

Remove them entirely.

Implementation:

```typescript
function removeComments(root: HTMLElement) {

    const walker = document.createTreeWalker(

        root,

        NodeFilter.SHOW_COMMENT

    );

    const comments: Comment[] = [];

    while (walker.nextNode()) {

        comments.push(

            walker.currentNode as Comment

        );

    }

    comments.forEach(comment => comment.remove());

}
```

---

# Remove Navigation

Navigation menus appear on nearly every webpage.

Example:

```
Home

Docs

API

Blog

Pricing

Community
```

The AI rarely needs these.

Selectors:

```typescript
const navigationSelectors = [

    "nav",

    ".navbar",

    ".navigation",

    "#navigation",

    ".menu",

    ".sidebar"

];
```

Implementation:

```typescript
navigationSelectors.forEach(selector => {

    document

        .querySelectorAll(selector)

        .forEach(node => node.remove());

});
```

---

# Remove Footer

Footer content is typically unrelated to user questions.

Example:

```
Privacy Policy

Terms

Careers

Contact

Copyright
```

Remove using:

```typescript
document

    .querySelectorAll("footer")

    .forEach(node => node.remove());
```

---

# Remove Advertisements

Advertisements dramatically increase token usage.

Common selectors:

```typescript
const adSelectors = [

    ".ads",

    ".advertisement",

    ".ad",

    ".sponsor",

    ".banner",

    ".google-auto-placed"

];
```

Implementation:

```typescript
adSelectors.forEach(selector => {

    document

        .querySelectorAll(selector)

        .forEach(node => node.remove());

});
```

---

# Remove Cookie Banners

Cookie banners frequently appear before the actual content.

Example:

```
Accept Cookies

Reject Cookies

Privacy Preferences
```

Selectors:

```typescript
const cookieSelectors = [

    "#cookie",

    ".cookie",

    ".cookie-banner",

    ".consent",

    ".gdpr"

];
```

Implementation:

```typescript
cookieSelectors.forEach(selector => {

    document

        .querySelectorAll(selector)

        .forEach(node => node.remove());

});
```

---

# Remove Hidden Elements

Invisible elements still exist in the DOM.

Example:

```html
<div style="display:none">

Secret

</div>
```

Ignore them.

Implementation:

```typescript
function isVisible(element: HTMLElement) {

    const style = window.getComputedStyle(element);

    return (

        style.display !== "none" &&

        style.visibility !== "hidden"

    );

}
```

---

# Preserve Headings

Headings define document structure.

Keep:

```
H1

H2

H3

H4

H5

H6
```

Example:

```
React

Hooks

State

Effects

Memoization
```

These are extremely valuable for LLM reasoning.

---

# Preserve Paragraphs

Paragraphs contain the main knowledge.

Example:

```
React is a JavaScript library for building user interfaces.
```

Paragraphs are never discarded unless empty.

---

# Preserve Code Blocks

Code examples are critical.

Example:

````html
<pre>

const app = express();

</pre>

Code blocks receive the highest priority.

Preserve Important Links

Not every hyperlink is useful.

Keep:

Documentation
API links
Internal anchors
Reference pages

Discard:

Social media
Ads
Login links
Newsletter links

Example:

Keep:

https://react.dev/reference/react

Discard:

https://twitter.com
Preserve Tables

Documentation frequently uses tables.

Example:

Hook	Purpose
useState	State
useEffect	Side Effects

Tables are retained because they encode structured knowledge efficiently.

Preserve Forms

Forms may contain valuable technical information such as search boxes, examples, or interactive documentation.

Example:

<form>

<input>

<button>

</form>

Forms are preserved only when relevant to page content.

Compression Service
compression.service.ts
export class CompressionService {

    compress(context: BrowserContext): BrowserContext {

        context.article = this.cleanText(context.article);

        context.markdown = this.cleanText(context.markdown);

        context.headings = [...new Set(context.headings)];

        context.links = this.removeDuplicateLinks(context.links);

        context.codeBlocks = this.removeDuplicateCode(context.codeBlocks);

        return context;

    }

    private cleanText(text: string): string {

        return text

            .replace(/\s+/g, " ")

            .replace(/\n{3,}/g, "\n\n")

            .trim();

    }

    private removeDuplicateLinks(links: string[]) {

        return [...new Set(links)];

    }

    private removeDuplicateCode(blocks: string[]) {

        return [...new Set(blocks)];

    }

}
Compression Statistics

Example documentation page:

Stage	Tokens
Raw HTML	180,000
DOM Extraction	120,000
Readability	45,000
Markdown	32,000
Noise Removal	24,000
Duplicate Removal	18,000
Final Context	14,500

Compression:

180,000

↓

14,500

≈ 92% reduction
Benefits of Compression

Context compression provides several important advantages:

80–90% fewer tokens sent to the LLM.
Faster response generation.
Lower inference costs for hosted models.
Reduced memory usage.
Better relevance by removing distracting content.
Improved retrieval quality for downstream RAG systems.
Larger effective context windows for user prompts.
Best Practices
Always remove scripts and styles before processing.
Preserve semantic structure such as headings and paragraphs.
Never discard code examples.
Eliminate duplicate content aggressively.
Normalize whitespace consistently.
Remove advertisements, cookie banners, and navigation.
Keep important documentation links and tables.
Measure compression ratios to ensure consistent performance.
Summary

In this chapter, we transformed verbose webpage content into a compact, AI-friendly representation. By intelligently removing noise while preserving meaningful structure, Zeba AI can dramatically reduce token usage without sacrificing context quality.

The Context Compression pipeline now:

Removes duplicate text.
Eliminates empty nodes and comments.
Cleans whitespace.
Filters navigation, footers, advertisements, and cookie banners.
Preserves headings, paragraphs, code blocks, tables, forms, and important links.
Reduces browser context size by 80–90%, enabling faster, more accurate AI responses and laying the groundwork for scalable Retrieval-Augmented Generation (RAG) in future milestones.



## 10.10 Browser Context Optimization

Topics:

Prioritize:

- selected text
- article
- documentation
- code snippets
- headings

Ignore:

- menus
- banners
- analytics
- advertisements

---

# 10.10 Browser Context Optimization

---

# Browser Context Optimization

## Introduction

As Zeba AI evolves into an intelligent software engineering assistant, simply collecting browser data is no longer sufficient. Modern AI systems must determine which information from a webpage is actually useful before sending it to a Large Language Model (LLM).

Every webpage contains a mixture of valuable content and unnecessary noise. Navigation menus, advertisements, cookie banners, analytics scripts, sidebars, and repeated layout elements consume valuable context tokens without improving AI responses.

Browser Context Optimization is the process of selecting only the most relevant information from a webpage while removing everything that provides little or no value to the AI model.

The primary objective is to maximize answer quality while minimizing token usage, latency, and API cost.

---

# Why Browser Context Optimization Matters

Without optimization, a typical webpage may contain:

- Thousands of HTML elements
- Hundreds of navigation links
- Multiple advertisements
- Tracking scripts
- Hidden elements
- Footer links
- Sidebar widgets
- Comments
- CSS classes
- JavaScript

An LLM does not need most of this information.

Instead, it benefits from structured, meaningful content such as:

- Selected text
- Documentation
- Code examples
- Main article
- Important headings
- Tables
- Forms
- Technical references

Filtering browser context before sending it to the AI greatly improves response quality.

---

# Browser Context Optimization Pipeline

```text
Raw Browser Context
        │
        ▼
Metadata Extraction
        │
        ▼
DOM Parsing
        │
        ▼
Readability Extraction
        │
        ▼
Code Extraction
        │
        ▼
Markdown Conversion
        │
        ▼
Context Compression
        │
        ▼
Context Optimization
        │
        ▼
Final Browser Context
        │
        ▼
LLM
```

---

# Optimization Priorities

Not every piece of information has equal importance.

Zeba AI assigns a priority score to every extracted section.

| Priority | Content | Importance |
|-----------|----------|------------|
| ⭐⭐⭐⭐⭐ | Selected Text | Highest |
| ⭐⭐⭐⭐⭐ | Main Article | Highest |
| ⭐⭐⭐⭐⭐ | Code Snippets | Highest |
| ⭐⭐⭐⭐ | Documentation | Very High |
| ⭐⭐⭐⭐ | Headings | High |
| ⭐⭐⭐ | Tables | Medium |
| ⭐⭐⭐ | Forms | Medium |
| ⭐⭐ | Important Links | Low |
| ⭐ | Images | Optional |
| ❌ | Navigation | Ignore |
| ❌ | Ads | Ignore |
| ❌ | Footer | Ignore |

---

# Priority 1 — Selected Text

User-selected text always has the highest priority because it represents the user's immediate area of interest.

Example:

```
React Hooks allow functional components to use state.
```

This text should always appear first in the prompt sent to the LLM.

---

# Priority 2 — Main Article

The extracted readable content from the webpage provides the primary context.

Example:

```
React is a JavaScript library used to build user interfaces...
```

Navigation menus, banners, and sidebars are excluded.

---

# Priority 3 — Documentation

Technical documentation is especially valuable.

Examples include:

- React Docs
- Angular Docs
- MDN
- Kubernetes Docs
- Docker Docs
- Node.js Docs
- TypeScript Handbook
- Express Documentation

Documentation pages typically contain concise, authoritative explanations.

---

# Priority 4 — Code Snippets

Code examples are essential for developer-focused AI assistance.

Supported sources include:

- GitHub
- Stack Overflow
- MDN
- Dev.to
- Medium
- Official documentation
- Tutorials

Example:

````typescript
const app = express();
app.listen(3000);

Code snippets are preserved exactly as written.

Priority 5 — Headings

Document headings provide semantic structure.

Example:

<h1>React Hooks</h1>

<h2>useState</h2>

<h2>useEffect</h2>

Extracted as:

React Hooks

useState

useEffect

These help the AI understand the organization of the content.

Priority 6 — Tables

Tables often summarize structured information.

Example:

Hook	Purpose
useState	State
useEffect	Side Effects

Tables are retained because they frequently contain high-value technical data.

Priority 7 — Forms

Forms may provide useful context when users seek help with validation, authentication, or troubleshooting.

Example:

<form>

<input>

<button>

</form>

Extracted fields include:

Input names
Labels
Placeholders
Button text
Priority 8 — Important Links

Important hyperlinks are preserved selectively.

Useful examples include:

API Reference
Documentation
GitHub Repository
Installation Guide
Tutorial

Navigation links are ignored.

Content to Ignore

The optimizer removes information that does not contribute meaningfully to AI responses.

Ignored content includes:

Navigation menus
Headers
Footers
Advertisements
Cookie banners
Analytics scripts
Social sharing widgets
Hidden elements
Promotional banners
Newsletter popups
Tracking pixels
Comment sections
Related articles
Sidebar widgets
Infinite scroll placeholders

Removing this noise reduces token usage and improves relevance.

Context Ranking Algorithm

Each extracted section receives a relevance score.

Example scoring:

selectedText += 100

mainArticle += 90

documentation += 80

codeBlocks += 75

headings += 60

tables += 50

forms += 40

links += 20

navigation -= 100

ads -= 100

The optimizer orders content based on these scores before assembling the final prompt.

Example Optimization
Raw Browser Context
Navigation

Home

Products

Pricing

Advertisement

Buy Now

React Documentation

React is a JavaScript library...

Code Example

Footer

Privacy Policy
Optimized Context
React Documentation

React is a JavaScript library...

Code Example

Selected Text

More than 80% of irrelevant content has been removed.

Optimization Service

File

src/services/contextOptimizer.service.ts

Example implementation:

import type { BrowserContext } from "../types/browserContext.types";

class ContextOptimizerService {
    optimize(context: BrowserContext): BrowserContext {
        return {
            ...context,

            links: this.filterImportantLinks(context.links),

            headings: context.headings,

            codeBlocks: context.codeBlocks,

            article: context.article,

            markdown: context.markdown
        };
    }

    private filterImportantLinks(links: string[] = []): string[] {
        const keywords = [
            "docs",
            "documentation",
            "guide",
            "tutorial",
            "api",
            "reference",
            "github"
        ];

        return links.filter(link =>
            keywords.some(keyword =>
                link.toLowerCase().includes(keyword)
            )
        );
    }
}

export default new ContextOptimizerService();
Integration with Context Builder
const optimizedContext =
    contextOptimizer.optimize(
        browserContext
    );

This optimized context is then forwarded to the Prompt Service.

Benefits

Browser Context Optimization provides several significant advantages:

Dramatically reduces unnecessary tokens
Improves AI response quality
Preserves only high-value information
Speeds up prompt generation
Reduces API costs
Increases LLM accuracy
Enhances developer experience
Produces cleaner prompts for Retrieval-Augmented Generation (RAG)
Best Practices
Always prioritize user-selected text.
Preserve code blocks without modification.
Keep documentation headings intact.
Remove repetitive navigation elements.
Exclude advertisements and promotional content.
Compress whitespace and duplicate text.
Limit context size to fit model token constraints.
Preserve semantic structure for better AI understanding.
Summary

Browser Context Optimization is the final refinement step before browser information is passed to the AI model. By intelligently prioritizing selected text, documentation, articles, code snippets, headings, and structured content while removing irrelevant elements such as menus, advertisements, and tracking components, Zeba AI delivers highly focused prompts that maximize response quality, minimize token consumption, and lay the groundwork for advanced capabilities such as Retrieval-Augmented Generation (RAG), Workspace Awareness, and enterprise-grade developer assistance.



## 10.11 Preparing for RAG

Introduction only.

Topics:

- Chunking
- Embeddings
- Vector Databases
- Semantic Search
- Similarity Search

No implementation yet.

---

# 10.11 — Preparing for Retrieval-Augmented Generation (RAG)

> **Chapter Goal**
>
> In this chapter, we introduce the foundational concepts behind Retrieval-Augmented Generation (RAG). There is **no implementation yet**. The objective is to understand why RAG is essential for AI-powered development assistants like **Zeba AI** and how it enables large language models to answer questions using external knowledge instead of relying only on their training data.
>
> In the next milestone, we will begin implementing a complete RAG pipeline.

---

# Why RAG?

Until now, Zeba AI has learned how to collect browser metadata, understand webpage content, extract readable articles, detect source code, identify programming languages, convert HTML into Markdown, and build an optimized browser context.

However, modern AI assistants need much more than the current webpage.

Developers often ask questions such as:

- Explain this project architecture
- Find where authentication is implemented
- Which API calls this function?
- Explain this Kubernetes configuration
- Compare two files
- Search across documentation
- Find similar implementations
- Summarize an entire repository

A traditional LLM cannot answer these questions accurately unless the relevant information is included in the prompt.

Sending an entire codebase or website to the LLM is impossible because of token limits.

This is the problem that Retrieval-Augmented Generation solves.

---

# What is Retrieval-Augmented Generation?

Retrieval-Augmented Generation (RAG) is an AI architecture that combines:

- Information Retrieval
- Semantic Search
- Large Language Models

Instead of asking the LLM to remember everything, we retrieve only the most relevant information and include it in the prompt.

The workflow looks like this:

```
User Question

        │

        ▼

Knowledge Base

        │

        ▼

Semantic Search

        │

        ▼

Relevant Chunks

        │

        ▼

Prompt Builder

        │

        ▼

LLM

        │

        ▼

Answer
```

This approach makes AI systems:

- More accurate
- More scalable
- Less expensive
- More reliable
- Easier to maintain

---

# Why Zeba AI Needs RAG

A browser extension sees thousands of webpages.

Examples include:

- GitHub repositories
- React documentation
- Docker documentation
- Kubernetes documentation
- StackOverflow discussions
- Medium articles
- Dev.to blogs
- Internal company portals
- API documentation

Instead of sending every page to the LLM, Zeba AI will:

1. Read the webpage
2. Extract meaningful content
3. Break it into chunks
4. Store embeddings
5. Search relevant chunks
6. Send only useful context to the AI

This dramatically reduces token usage while improving answer quality.

---

# The Future Architecture

By the end of the next milestones, Zeba AI will follow a production-grade AI architecture.

```
Browser

      │

      ▼

DOM Extraction

      │

      ▼

Context Builder

      │

      ▼

Markdown Conversion

      │

      ▼

Chunk Generator

      │

      ▼

Embedding Generator

      │

      ▼

Vector Database

      │

      ▼

Semantic Search

      │

      ▼

Prompt Builder

      │

      ▼

LLM

      │

      ▼

Final Response
```

Each stage performs a specific responsibility, making the system modular and scalable.

---

# Chunking

Large documents cannot be sent directly to an LLM because they exceed the model's context window.

Instead, the content is divided into smaller pieces called **chunks**.

For example, imagine a React documentation page containing 12,000 words.

Instead of sending all 12,000 words, it may be divided into:

```
Chunk 1
Introduction

Chunk 2
Installation

Chunk 3
Components

Chunk 4
Props

Chunk 5
State

Chunk 6
Hooks

Chunk 7
Context API

Chunk 8
Performance

Chunk 9
Server Components
```

Each chunk becomes an independent searchable unit.

---

# Why Chunking Matters

Proper chunking offers several advantages:

- Faster retrieval
- Smaller prompts
- Better semantic matching
- Reduced token consumption
- Higher answer accuracy

Poor chunking can split related information across multiple chunks, making retrieval less effective.

Choosing an appropriate chunk size and overlap is one of the most important design decisions in a RAG system.

---

# Embeddings

Computers cannot understand natural language directly.

To make text searchable, we convert it into numerical vectors called **embeddings**.

For example:

```
React

↓

[0.123,
 0.552,
-0.111,
 0.921,
...]
```

Every document, paragraph, or code block is transformed into a high-dimensional vector that captures its semantic meaning.

Texts with similar meanings produce vectors that are close together in vector space, even if they use different words.

---

# Why Embeddings Are Powerful

Consider these questions:

```
How do React Hooks work?

Explain useState.

State hook in React.

Managing state with hooks.
```

Although the wording differs, the semantic meaning is nearly identical.

Embedding models recognize this similarity and place these texts close together.

This enables semantic search rather than simple keyword matching.

---

# Vector Databases

Once embeddings are generated, they need to be stored efficiently.

Traditional relational databases are optimized for exact lookups, not semantic similarity.

Vector databases are designed specifically for storing and searching embeddings.

Examples include:

- ChromaDB
- FAISS
- Pinecone
- Weaviate
- Milvus
- Qdrant

These databases can search millions of vectors within milliseconds.

---

# Semantic Search

Traditional search engines rely on keywords.

For example:

```
Query:
React state

Results:
Only documents containing "React" and "state"
```

Semantic search works differently.

```
Query:
How does React remember values?

Results:
React State
useState
State Management
Hooks Overview
```

The search engine understands the intent rather than matching exact words.

This is what makes RAG systems intelligent.

---

# Similarity Search

Similarity search compares the embedding of the user's query with the embeddings stored in the vector database.

The system retrieves the chunks whose vectors are closest to the query.

Conceptually:

```
User Question

↓

Embedding

↓

Vector Database

↓

Top-K Similar Chunks

↓

LLM Prompt
```

Only the most relevant information is sent to the language model, making responses more accurate and efficient.

---

# Advantages of RAG

Integrating RAG into Zeba AI will provide significant benefits:

- Access to up-to-date knowledge
- Improved code understanding
- Better documentation assistance
- Reduced hallucinations
- Lower token usage
- Faster responses
- Repository-wide search
- Workspace awareness
- Personalized developer context
- Enterprise scalability

---

# RAG Use Cases for Zeba AI

Once implemented, Zeba AI will be able to:

- Search entire GitHub repositories
- Understand large documentation websites
- Retrieve related code snippets
- Explain project architecture
- Find duplicate implementations
- Recommend reusable functions
- Answer questions about previously visited webpages
- Build context across multiple browser tabs
- Assist with enterprise documentation
- Support intelligent coding workflows

---

# What's Coming Next

In the upcoming milestones, we will implement the complete Retrieval-Augmented Generation pipeline, including:

- Document chunk generation
- Embedding creation
- Vector database integration
- Semantic search engine
- Context retrieval
- Prompt augmentation
- Repository indexing
- Workspace awareness
- Intelligent caching
- Multi-source knowledge retrieval

These capabilities will transform Zeba AI from a browser-aware assistant into a powerful AI development platform capable of understanding projects, documentation, and codebases at scale.

---

# Chapter Summary

In this chapter, we explored the concepts that form the foundation of Retrieval-Augmented Generation (RAG).

We learned:

- Why browser context alone is not sufficient
- The limitations of sending entire documents to an LLM
- The purpose of chunking large content
- How embeddings capture semantic meaning
- Why vector databases are essential
- How semantic search differs from keyword search
- The role of similarity search in retrieving relevant information
- How RAG enables scalable, accurate, and context-aware AI assistants

Although no implementation was introduced in this chapter, these concepts prepare us for the next phase of Zeba AI, where browser intelligence will evolve into a fully searchable knowledge system powered by embeddings, vector databases, and Retrieval-Augmented Generation.



## 10.12 End-to-End Pipeline

```
Web Page

↓

DOM Extraction

↓

Readability

↓

Code Detection

↓

Markdown Conversion

↓

Compression

↓

Browser Context

↓

Prompt Builder

↓

LLM

↓

Streaming Response
```

---

# 10.12 — End-to-End Pipeline

> **Chapter Goal**
>
> Throughout Milestone 10, we have built multiple independent services responsible for understanding a webpage. In this final chapter, we combine every component into a single intelligent pipeline that transforms raw HTML into high-quality AI context.
>
> This pipeline represents the complete lifecycle of browser data before it reaches the Large Language Model (LLM). Each stage has a specific responsibility, ensuring that only meaningful, structured, and optimized information is sent to the AI.
>
> By the end of this chapter, you will understand how every service fits together to power Zeba AI's browser intelligence.

---

# Why an End-to-End Pipeline?

A webpage contains far more information than an AI model actually needs.

For example, a typical webpage includes:

- Navigation menus
- Advertisements
- Cookie banners
- Analytics scripts
- Hidden elements
- CSS styles
- JavaScript
- Popups
- Sidebars
- Comments
- Tracking pixels
- Dynamic widgets

If we send the entire webpage to an LLM:

- Token usage becomes enormous.
- Costs increase significantly.
- Response quality decreases.
- The AI becomes distracted by irrelevant content.

Instead, Zeba AI processes the webpage through a carefully designed pipeline that extracts only the information that matters.

---

# Complete Processing Pipeline

The entire browser intelligence workflow looks like this:

```text
Web Page

      │

      ▼

DOM Extraction

      │

      ▼

Readability Extraction

      │

      ▼

Code Detection

      │

      ▼

Markdown Conversion

      │

      ▼

Context Compression

      │

      ▼

Browser Context Builder

      │

      ▼

Prompt Builder

      │

      ▼

Large Language Model

      │

      ▼

Streaming AI Response
```

Each stage transforms the information into a cleaner, smaller, and more meaningful representation.

---

# Stage 1 — Web Page

The journey begins with the webpage currently open in the browser.

Examples include:

- GitHub Repository
- React Documentation
- Kubernetes Documentation
- Docker Documentation
- StackOverflow Question
- Medium Article
- Dev.to Blog
- Internal Company Portal
- API Documentation

At this stage, the page consists of raw HTML, CSS, JavaScript, and browser metadata.

---

# Stage 2 — DOM Extraction

The DOM Extraction Service reads the entire document and walks through the DOM tree.

Responsibilities include:

- Traverse the DOM hierarchy
- Ignore hidden elements
- Remove `<script>` tags
- Remove `<style>` tags
- Remove advertisements
- Ignore invisible nodes
- Preserve document structure
- Extract visible text

Example:

```html
<body>

<header>
Navigation
</header>

<main>

<h1>React</h1>

<p>React is a JavaScript library.</p>

</main>

<footer>
Copyright
</footer>

</body>
```

Extracted content:

```
React

React is a JavaScript library.
```

---

# Stage 3 — Readability Extraction

Most webpages contain unnecessary layout elements.

The Readability Service identifies the primary article content.

It removes:

- Navigation bars
- Sidebars
- Advertisements
- Cookie banners
- Footers
- Related articles
- Recommended content

Pipeline:

```
Raw HTML

↓

Mozilla Readability

↓

Main Article
```

Benefits:

- Cleaner content
- Better summaries
- Lower token usage
- Improved AI accuracy

---

# Stage 4 — Intelligent Code Detection

Documentation pages frequently contain source code.

The Code Extraction Service identifies these snippets automatically.

Supported sources include:

- GitHub
- StackOverflow
- MDN
- Dev.to
- Medium
- Official Documentation

Supported selectors:

```html
<pre>

<code>

.language-js

.language-ts

.language-python

.highlight

.code
```

Example:

```html
<pre>

const app = express();

</pre>
```

Extracted:

```javascript
const app = express();
```

---

# Stage 5 — Markdown Conversion

LLMs perform significantly better with Markdown than raw HTML.

The Markdown Service converts structured HTML into clean Markdown.

Example:

HTML:

```html
<h1>React</h1>

<p>React is awesome.</p>
```

Converted Markdown:

```markdown
# React

React is awesome.
```

Benefits:

- Cleaner formatting
- Better heading hierarchy
- Easier prompt generation
- Reduced HTML noise

---

# Stage 6 — Context Compression

Even after Markdown conversion, unnecessary information remains.

The Compression Service removes redundant data.

Removed content:

- Duplicate text
- Empty nodes
- Whitespace
- Comments
- Navigation
- Sidebars
- Advertisements
- Cookie banners
- Tracking elements

Preserved content:

- Headings
- Paragraphs
- Code blocks
- Tables
- Important links
- Lists
- Selected text

Typical reduction:

```
Original HTML

120 KB

↓

Compressed Context

12 KB
```

Token reduction:

```
80–90%
```

---

# Stage 7 — Browser Context Builder

The Browser Context Builder combines all extracted information into a single structured object.

Example:

```typescript
interface BrowserContext {

    metadata: {

        title: string;

        url: string;

        hostname: string;

    };

    article: string;

    markdown: string;

    codeBlocks: CodeBlock[];

    headings: string[];

    links: string[];

    tables: Table[];

    forms: Form[];

}
```

This unified structure becomes the source of truth for the AI.

---

# Stage 8 — Prompt Builder

The Prompt Builder combines:

- Browser metadata
- Selected text
- Markdown
- Extracted article
- Code snippets
- User question

Example:

```
Browser Context

+

User Prompt

↓

Final AI Prompt
```

The generated prompt might resemble:

```text
Current Page:
React Documentation

Selected Text:
useState Hook

Relevant Code:
const [count, setCount] = useState(0);

User Question:
Explain this hook.
```

This ensures the AI receives all necessary context in a structured format.

---

# Stage 9 — Large Language Model (LLM)

The final prompt is sent to the configured language model.

Supported providers may include:

- Ollama
- OpenAI
- Anthropic
- Google Gemini
- Azure OpenAI

The LLM processes the optimized prompt and generates a response using the provided browser context.

---

# Stage 10 — Streaming Response

Rather than waiting for the entire response to finish, Zeba AI streams tokens as they are generated.

Flow:

```
LLM

↓

Token

↓

Browser Extension

↓

Popup UI

↓

User
```

Advantages:

- Faster perceived performance
- Real-time feedback
- Improved user experience
- Lower waiting time

Streaming is especially valuable for long explanations and code generation tasks.

---

# Complete Lifecycle Example

Imagine a developer opens the React documentation and asks:

```
Explain useState.
```

The processing pipeline is:

```
React Documentation

↓

DOM Extraction

↓

Readability Extraction

↓

Extract Article

↓

Detect Code Blocks

↓

Convert HTML to Markdown

↓

Compress Context

↓

Build BrowserContext

↓

Combine with User Prompt

↓

Send to Ollama

↓

Stream Tokens

↓

Display Response
```

The user receives a focused explanation based on the current webpage rather than a generic answer.

---

# Benefits of the Pipeline

This architecture provides several advantages:

### Improved Accuracy

Only relevant information reaches the AI.

---

### Lower Token Usage

Compression reduces prompt size by up to 90%.

---

### Better Performance

Smaller prompts produce faster responses.

---

### Higher Scalability

Each service performs a single responsibility and can evolve independently.

---

### Easier Maintenance

Modular services are easier to test, debug, and extend.

---

### Enterprise Readiness

The pipeline can support:

- Large documentation portals
- Multi-page projects
- Internal knowledge bases
- Developer workspaces
- Future RAG integration

---

# How This Prepares Zeba AI for the Future

With this pipeline complete, Zeba AI has evolved far beyond a simple browser extension.

It can now:

- Understand webpage structure
- Read meaningful article content
- Detect source code
- Preserve document hierarchy
- Convert HTML into AI-friendly Markdown
- Compress unnecessary information
- Build structured browser context
- Generate optimized prompts
- Stream intelligent responses

These capabilities form the foundation for advanced features such as:

- Retrieval-Augmented Generation (RAG)
- Workspace Awareness
- Repository Indexing
- Multi-document Search
- Semantic Code Search
- Enterprise Knowledge Bases
- AI Memory
- Personalized Developer Assistance

---

# Chapter Summary

In this chapter, we connected every service built throughout Milestone 10 into a single end-to-end browser intelligence pipeline.

We learned how Zeba AI processes a webpage through the following stages:

- DOM Extraction
- Readability Extraction
- Intelligent Code Detection
- Markdown Conversion
- Context Compression
- Browser Context Building
- Prompt Construction
- Large Language Model Processing
- Streaming AI Responses

This architecture ensures that only high-quality, structured, and relevant information reaches the AI model, delivering faster, more accurate, and context-aware responses.

With the browser intelligence pipeline complete, Zeba AI is now fully prepared for the next milestone, where Retrieval-Augmented Generation (RAG), embeddings, semantic search, and vector databases will transform it into a truly enterprise-grade AI development assistant.

## 10.13 Performance Optimization

Topics:

- TreeWalker API
- Lazy parsing
- MutationObserver
- Incremental extraction
- Context caching
- Background processing
- Debouncing

---

# 10.13 — Performance Optimization

> **Chapter Goal**
>
> Browser intelligence is only valuable if it is fast, efficient, and responsive. A slow browser extension can negatively impact the browsing experience by consuming excessive CPU, memory, or battery power.
>
> In this chapter, we explore the performance optimization techniques used by Zeba AI to efficiently process webpages without degrading browser performance.
>
> These optimizations ensure that browser context extraction remains scalable, even on large websites, enterprise dashboards, and documentation portals.

---

# Why Performance Matters

Modern webpages are significantly larger and more dynamic than traditional websites.

A single webpage may contain:

- Thousands of DOM nodes
- Hundreds of images
- Multiple JavaScript frameworks
- Lazy-loaded content
- Infinite scrolling
- Dynamic components
- Advertisements
- Embedded videos
- Analytics scripts

Naively traversing the entire DOM on every page update can lead to:

- High CPU usage
- Excessive memory consumption
- Slow popup rendering
- Browser lag
- Battery drain
- Poor user experience

Therefore, Zeba AI uses multiple optimization strategies to keep context extraction fast and lightweight.

---

# Performance Pipeline

The optimized browser intelligence workflow is:

```text
Web Page

      │

      ▼

TreeWalker

      │

      ▼

Lazy Parsing

      │

      ▼

Mutation Observer

      │

      ▼

Incremental Extraction

      │

      ▼

Context Cache

      │

      ▼

Background Processing

      │

      ▼

Debounced Updates

      │

      ▼

Browser Context
```

Each stage minimizes unnecessary work while keeping the browser context up to date.

---

# TreeWalker API

One of the most efficient ways to traverse the DOM is by using the **TreeWalker API**.

Instead of recursively visiting every node manually, TreeWalker provides a lightweight browser-native iterator.

### Advantages

- Fast DOM traversal
- Low memory usage
- Native browser implementation
- Filters unwanted nodes automatically
- Avoids recursive stack overhead

Example:

```typescript
const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT
);

while (walker.nextNode()) {
    console.log(walker.currentNode);
}
```

Instead of walking the DOM recursively, TreeWalker visits only the required node types.

---

# Filtering Unnecessary Nodes

TreeWalker can skip nodes that never contribute useful context.

Ignored elements include:

```html
<script>

<style>

<noscript>

<iframe>

<svg>

<canvas>

<img>
```

Example:

```typescript
if (
    node.tagName === "SCRIPT" ||
    node.tagName === "STYLE"
) {
    continue;
}
```

Skipping unnecessary nodes significantly reduces processing time.

---

# Lazy Parsing

Not every webpage needs full parsing.

Zeba AI performs **lazy parsing**, extracting only the information required for the current request.

For example:

User asks:

```
Summarize this article.
```

Only the article content is extracted.

User asks:

```
Explain this code.
```

Only code blocks are parsed.

User asks:

```
What is this page about?
```

Only metadata and headings are extracted.

This avoids unnecessary computation.

---

# Benefits of Lazy Parsing

Lazy parsing provides several advantages:

- Faster execution
- Lower memory usage
- Reduced CPU consumption
- Smaller browser context
- Improved responsiveness

Only the required components are processed.

---

# MutationObserver

Modern websites frequently update without a page refresh.

Examples include:

- React applications
- Angular dashboards
- Vue applications
- Infinite scrolling
- Chat applications
- Gmail
- GitHub
- Notion

Instead of continuously scanning the DOM, Zeba AI listens for meaningful changes using the **MutationObserver API**.

Example:

```typescript
const observer = new MutationObserver(() => {

    console.log("DOM Updated");

});

observer.observe(document.body, {

    childList: true,

    subtree: true

});
```

The observer reacts only when the page changes.

---

# Incremental Extraction

Without optimization, every DOM update would trigger a complete page extraction.

Instead, Zeba AI performs **incremental extraction**.

Rather than rebuilding the entire browser context, it processes only the modified portion of the page.

Example:

```
Before

Entire Page

↓

Full Extraction

After

Single Comment Added

↓

Extract Only New Comment
```

Benefits include:

- Faster updates
- Lower CPU usage
- Reduced memory allocations
- Better scalability

---

# Context Caching

Many webpages remain unchanged for long periods.

Rebuilding browser context every time the popup opens would waste resources.

Instead, Zeba AI caches previously extracted context.

Example:

```typescript
const cache = new Map<
    string,
    BrowserContext
>();

cache.set(url, context);
```

When the user revisits the same page:

```
Current URL

↓

Cache Lookup

↓

Cache Hit

↓

Reuse Context
```

This eliminates unnecessary extraction work.

---

# Cache Invalidation

A cache should only be reused when the content is still valid.

Zeba AI refreshes cached data when:

- The page URL changes
- The DOM changes significantly
- A page reload occurs
- Selected text changes
- A timeout expires

This keeps browser context accurate while avoiding redundant processing.

---

# Background Processing

Heavy DOM operations should never block the user interface.

Instead of performing extraction inside the popup, Zeba AI delegates expensive tasks to the background service worker.

Architecture:

```text
Popup

      │

      ▼

Background Service Worker

      │

      ▼

DOM Extraction

      │

      ▼

Context Builder

      │

      ▼

Popup Response
```

Benefits:

- Smooth UI
- Faster popup rendering
- Non-blocking operations
- Better responsiveness

---

# Debouncing

Certain browser events can fire hundreds of times per second.

Examples include:

- Scroll
- Resize
- Input
- Selection changes
- DOM mutations

Running extraction for every event would overwhelm the browser.

Instead, Zeba AI uses **debouncing**.

Example:

```typescript
function debounce(

    callback: () => void,

    delay = 300

) {

    let timer: number;

    return () => {

        clearTimeout(timer);

        timer = window.setTimeout(

            callback,

            delay

        );

    };

}
```

Only the final event triggers processing.

---

# Debouncing vs Throttling

Although similar, these techniques serve different purposes.

### Debouncing

```
Typing...

██████████

↓

One Extraction
```

Useful for:

- Text selection
- Search input
- DOM updates

---

### Throttling

```
Scrolling...

██████████

↓

Extraction Every 200ms
```

Useful for:

- Infinite scrolling
- Mouse movement
- Window resizing

Zeba AI primarily uses debouncing because browser context does not need to update on every intermediate event.

---

# Memory Optimization

To minimize memory usage, Zeba AI:

- Releases temporary objects
- Avoids duplicate strings
- Removes unused DOM references
- Clears expired cache entries
- Limits stored browser contexts
- Compresses large articles

These practices help maintain a low memory footprint during long browsing sessions.

---

# Parallel Processing

Independent tasks can execute simultaneously.

For example:

```text
DOM Extraction

        │

        ├─────────────┐

        ▼             ▼

Readability     Code Detection

        └─────────────┘

              ▼

Markdown Conversion
```

Running independent operations in parallel reduces total processing time.

---

# Measuring Performance

Performance should be monitored continuously during development.

Example:

```typescript
const start = performance.now();

// Extract browser context

const end = performance.now();

console.log(

    `Extraction Time: ${end - start} ms`

);
```

Metrics to monitor include:

- Extraction time
- Memory usage
- Number of DOM nodes
- Cache hit ratio
- Compression ratio
- Streaming latency

These measurements help identify bottlenecks before deployment.

---

# Best Practices

To achieve production-grade performance:

- Prefer browser-native APIs such as TreeWalker.
- Parse only the content required for the current request.
- Use MutationObserver instead of repeated DOM polling.
- Process only modified content through incremental extraction.
- Cache browser context whenever possible.
- Offload expensive work to the background service worker.
- Debounce frequent browser events.
- Remove unnecessary DOM nodes early.
- Continuously profile extraction time and memory usage.
- Keep the browser context as small as possible before sending it to the LLM.

---

# Real-World Impact

By combining these optimization strategies, Zeba AI can:

- Process large documentation websites efficiently.
- Handle complex single-page applications.
- Reduce browser CPU usage.
- Minimize memory consumption.
- Improve popup responsiveness.
- Lower token usage through smarter extraction.
- Scale to enterprise-grade knowledge sources.

These optimizations ensure that browser intelligence remains fast, reliable, and unobtrusive for everyday development workflows.

---

# Chapter Summary

In this chapter, we explored the performance optimization techniques that enable Zeba AI to extract browser context efficiently.

We covered:

- TreeWalker API for efficient DOM traversal
- Lazy parsing to process only required content
- MutationObserver for detecting live page updates
- Incremental extraction to avoid rebuilding the entire context
- Context caching for faster repeated access
- Background processing to keep the UI responsive
- Debouncing to reduce unnecessary work
- Memory optimization and parallel processing
- Measuring performance using browser APIs
- Production best practices for scalable browser intelligence

These techniques ensure that Zeba AI delivers accurate browser context while maintaining excellent performance, laying the groundwork for the Retrieval-Augmented Generation (RAG) pipeline in the next milestone.

## 10.14 Production Best Practices

Recommended practices:

- Never send entire HTML
- Respect LLM token limits
- Ignore hidden elements
- Remove unnecessary nodes
- Compress context
- Detect framework-specific pages
- Cache extracted context
- Keep extraction asynchronous
- Avoid blocking the browser UI

---

# 10.14 — Production Best Practices

> **Chapter Goal**
>
> Building browser intelligence is only the first step toward creating an enterprise-grade AI assistant. The real challenge lies in making the system fast, reliable, scalable, secure, and cost-efficient.
>
> In this chapter, we explore the production best practices that should be followed when extracting browser context for Large Language Models (LLMs). These recommendations are based on real-world AI systems and ensure that Zeba AI remains performant while delivering high-quality responses.
>
> By following these practices, Zeba AI can efficiently process complex webpages, minimize token usage, reduce latency, and provide a seamless user experience.

---

# Why Production Best Practices Matter

Modern webpages can contain:

- Thousands of DOM elements
- Large JavaScript bundles
- Extensive CSS
- Images and videos
- Advertisements
- Analytics scripts
- Hidden components
- Dynamic content

Sending this raw data directly to an LLM would result in:

- Extremely high token usage
- Increased API costs
- Slower response times
- Poor AI accuracy
- Context window overflow
- Browser performance degradation

Production systems must therefore optimize browser context before sending it to the AI.

---

# Browser Intelligence Pipeline

A production-ready browser intelligence system follows a structured pipeline:

```text
Web Page

      │

      ▼

DOM Extraction

      │

      ▼

Content Filtering

      │

      ▼

Readability Extraction

      │

      ▼

Code Detection

      │

      ▼

Markdown Conversion

      │

      ▼

Context Compression

      │

      ▼

Browser Context

      │

      ▼

Prompt Builder

      │

      ▼

LLM
```

Every stage exists to reduce unnecessary information while preserving valuable context.

---

# Never Send Entire HTML

One of the biggest mistakes in AI applications is sending raw HTML directly to the language model.

Example:

```html
<html>

<head>

<script>...</script>

<style>...</style>

<body>

...

</body>

</html>
```

Problems include:

- Massive token consumption
- Duplicate information
- Styling noise
- JavaScript code
- Tracking scripts
- Metadata
- Hidden elements

Instead, extract only the visible and meaningful content.

Good:

```markdown
# React

React is a JavaScript library for building user interfaces.
```

---

# Respect LLM Token Limits

Every language model has a maximum context window.

Examples:

| Model | Approximate Context Window |
|--------|---------------------------:|
| Llama 3.2 | 128K tokens |
| GPT-4.1 | Larger context windows depending on variant |
| Claude | Large context windows depending on model |
| Gemini | Large context windows depending on model |

Even with large context windows, sending unnecessary information increases:

- Cost
- Latency
- Memory usage
- Response time

Always send only the information required to answer the user's question.

---

# Ignore Hidden Elements

Many webpages contain invisible elements used for layout, analytics, or future rendering.

Examples:

```html
<div hidden>

Secret

</div>
```

```html
<div style="display:none">

Hidden Content

</div>
```

```html
<div style="visibility:hidden">

Invisible

</div>
```

These elements should never become part of the browser context.

Example:

```typescript
if (

    element.hidden ||

    getComputedStyle(element).display === "none" ||

    getComputedStyle(element).visibility === "hidden"

) {

    return;

}
```

Ignoring hidden elements reduces unnecessary context and improves extraction speed.

---

# Remove Unnecessary Nodes

Certain HTML elements provide no value to the AI.

Examples include:

```html
<script>

<style>

<iframe>

<noscript>

<canvas>

<svg>

<link>

<meta>

<button>

<input>

<select>
```

These nodes should be excluded during DOM traversal.

Benefits:

- Faster extraction
- Smaller browser context
- Lower token usage
- Better prompt quality

---

# Compress Browser Context

Context compression is one of the most important production optimizations.

Remove:

- Duplicate paragraphs
- Empty elements
- Whitespace
- Comments
- Navigation menus
- Advertisements
- Cookie banners
- Related articles
- Tracking elements

Keep:

- Titles
- Headings
- Paragraphs
- Lists
- Tables
- Code snippets
- Selected text
- Important links

Compression typically reduces browser context by:

```
80–90%
```

This directly lowers AI inference cost.

---

# Detect Framework-Specific Pages

Modern web applications are built using different frontend frameworks.

Examples:

- React
- Angular
- Vue
- Next.js
- Nuxt
- Svelte
- Astro

Each framework generates different DOM structures.

Examples:

```html
<div id="root"></div>
```

React

---

```html
<app-root></app-root>
```

Angular

---

```html
<div id="__next"></div>
```

Next.js

---

```html
<div id="app"></div>
```

Vue

Recognizing the framework allows Zeba AI to apply framework-specific extraction strategies for cleaner results.

---

# Cache Extracted Context

Re-extracting browser context every time the popup opens is inefficient.

Instead, cache the processed context.

Example:

```typescript
const contextCache = new Map<
    string,
    BrowserContext
>();

contextCache.set(

    window.location.href,

    browserContext

);
```

Benefits:

- Faster responses
- Reduced CPU usage
- Lower memory allocations
- Better browser performance

Cache invalidation should occur when:

- The URL changes
- The page reloads
- Significant DOM updates occur
- Selected text changes

---

# Keep Extraction Asynchronous

DOM extraction can be computationally expensive.

Running it synchronously may freeze the UI.

Instead, perform extraction asynchronously.

Example:

```typescript
const browserContext =

    await browserContextService.getBrowserContext();
```

Advantages:

- Responsive popup
- Smooth scrolling
- Better user experience
- Non-blocking operations

Whenever possible, long-running tasks should execute inside the background service worker rather than the popup.

---

# Avoid Blocking the Browser UI

The popup should never perform heavy DOM traversal.

Recommended architecture:

```text
Popup

      │

      ▼

Background Service Worker

      │

      ▼

DOM Extraction

      │

      ▼

Browser Context

      │

      ▼

Popup
```

This keeps the user interface responsive while heavy processing happens in the background.

---

# Validate Browser Context

Never assume extracted data is complete.

Always provide safe fallbacks.

Example:

```typescript
const title =

    browserContext.title ||

    "Unknown Page";
```

Validation prevents runtime errors and ensures prompt generation always succeeds.

---

# Minimize Prompt Size

Large prompts increase:

- API cost
- Processing time
- Latency

Instead of sending:

```
Entire Documentation Website
```

Send:

```
Relevant Section

+

Selected Code

+

User Question
```

Smaller prompts generally produce faster and more focused responses.

---

# Preserve Document Hierarchy

Maintain structural information when extracting content.

Good:

```markdown
# React

## Hooks

### useState

React uses hooks for state management.
```

Bad:

```
React Hooks useState React uses hooks for state management
```

Structured context helps LLMs understand relationships between sections.

---

# Log Only During Development

Verbose logging is useful during development but should not remain enabled in production.

Development:

```typescript
console.log(browserContext);
```

Production:

```typescript
if (process.env.NODE_ENV === "development") {

    console.log(browserContext);

}
```

This prevents unnecessary console noise and avoids exposing sensitive information.

---

# Design for Scalability

Every service should have a single responsibility.

Example architecture:

```text
DOM Extractor

↓

Readability Service

↓

Code Extractor

↓

Markdown Service

↓

Compression Service

↓

Context Builder

↓

Prompt Builder
```

A modular architecture makes the system easier to maintain, test, and extend.

---

# Security Considerations

When extracting browser context:

- Never execute page JavaScript.
- Ignore inline event handlers.
- Do not expose cookies.
- Do not extract passwords or form values.
- Avoid collecting sensitive user information.
- Respect browser permissions.
- Process only the data required for the current request.

Following the principle of least privilege improves both security and user trust.

---

# Real-World Benefits

Following these production practices allows Zeba AI to:

- Process large webpages efficiently
- Reduce LLM token consumption
- Improve response quality
- Lower operational costs
- Maintain a responsive browser experience
- Scale to enterprise documentation and repositories
- Prepare for Retrieval-Augmented Generation (RAG)

These optimizations ensure that Zeba AI remains reliable even as its capabilities grow.

---

# Production Checklist

Before sending browser context to an LLM, verify the following:

- ✅ Do not send raw HTML.
- ✅ Respect the model's token limits.
- ✅ Ignore hidden and invisible elements.
- ✅ Remove scripts, styles, advertisements, and unnecessary nodes.
- ✅ Compress extracted content.
- ✅ Detect framework-specific pages when applicable.
- ✅ Cache previously extracted browser context.
- ✅ Perform extraction asynchronously.
- ✅ Keep expensive operations off the browser UI thread.
- ✅ Validate extracted data before prompt generation.
- ✅ Preserve document hierarchy.
- ✅ Log only in development mode.
- ✅ Protect sensitive user information.

---

# Chapter Summary

In this chapter, we explored the production best practices required to build a fast, scalable, and enterprise-ready browser intelligence system.

We covered:

- Avoiding raw HTML in prompts
- Respecting LLM token limits
- Ignoring hidden elements
- Removing unnecessary nodes
- Compressing browser context
- Detecting framework-specific pages
- Caching extracted context
- Performing asynchronous extraction
- Keeping heavy processing off the browser UI
- Designing modular and scalable services
- Protecting user privacy and security

By following these practices, Zeba AI delivers high-quality browser context with minimal resource usage, providing a strong foundation for future capabilities such as semantic search, workspace awareness, and Retrieval-Augmented Generation (RAG).

## 10.15 Project Structure

```
src/

content/

services/

domExtractor.service.ts

readability.service.ts

codeExtractor.service.ts

markdown.service.ts

contextBuilder.service.ts

compression.service.ts

languageDetector.service.ts

types/

pageContext.types.ts

utils/

dom.utils.ts

markdown.utils.ts

compression.utils.ts
```

---

# What You'll Build

By the end of this milestone, Zeba AI will automatically understand pages such as:

- React Documentation
- Angular Documentation
- Vue Documentation
- GitHub Repositories
- GitHub Pull Requests
- GitHub Issues
- Stack Overflow Questions
- MDN Web Docs
- Docker Documentation
- Kubernetes Documentation
- Jenkins Documentation
- Medium Articles
- Dev.to Posts
- Enterprise Documentation Portals

Instead of sending raw HTML, Zeba AI will generate a clean, structured, and token-efficient browser context that contains:

- Metadata
- Semantic headings
- Main article
- Source code
- Code language
- Tables
- Forms
- Links
- Markdown
- Optimized prompt context

This optimized context becomes the foundation for intelligent prompting, Retrieval-Augmented Generation (RAG), workspace awareness, semantic search, and enterprise-grade AI development assistants.

By completing this milestone, Zeba AI will evolve from a simple browser extension into an intelligent browser understanding platform capable of powering advanced AI experiences across documentation websites, code repositories, technical blogs, and enterprise applications.

---

# 10.15 — Project Structure

> **Chapter Goal**
>
> Throughout this milestone, we developed several independent services responsible for understanding, extracting, cleaning, and optimizing webpage content. In this final chapter, we organize these services into a scalable project structure that follows clean architecture principles.
>
> A well-organized codebase improves maintainability, readability, testing, and future scalability. As Zeba AI continues to evolve with features such as Retrieval-Augmented Generation (RAG), semantic search, workspace awareness, and enterprise integrations, a modular architecture becomes essential.

---

# Why Project Structure Matters

As features grow, placing all logic inside a single file quickly becomes unmanageable.

A poor project structure leads to:

- Difficult debugging
- Code duplication
- Tight coupling
- Poor scalability
- Hard-to-maintain code
- Difficult testing

Instead, each responsibility should live in its own module.

Benefits include:

- Clear separation of concerns
- Easier maintenance
- Better code reuse
- Independent testing
- Simpler collaboration
- Enterprise scalability

---

# Recommended Project Structure

The browser intelligence module should be organized as follows:

```text
src/

├── content/
│
├── services/
│   ├── domExtractor.service.ts
│   ├── readability.service.ts
│   ├── codeExtractor.service.ts
│   ├── markdown.service.ts
│   ├── contextBuilder.service.ts
│   ├── compression.service.ts
│   └── languageDetector.service.ts
│
├── types/
│   └── pageContext.types.ts
│
├── utils/
│   ├── dom.utils.ts
│   ├── markdown.utils.ts
│   └── compression.utils.ts
```

Each folder has a clearly defined responsibility.

---

# Folder Responsibilities

## `content/`

The **content** folder contains browser-specific logic responsible for interacting with webpages.

Typical responsibilities include:

- Content script entry point
- Browser message listeners
- DOM interaction
- Selection extraction
- Communication with the background service worker

Example:

```text
content/

    index.ts

    contentScript.ts

    browserContext.ts
```

The content layer should never contain AI business logic.

---

## `services/`

The **services** folder contains the core browser intelligence engine.

Each service performs exactly one responsibility.

### Structure

```text
services/

    domExtractor.service.ts

    readability.service.ts

    codeExtractor.service.ts

    markdown.service.ts

    contextBuilder.service.ts

    compression.service.ts

    languageDetector.service.ts
```

Following the Single Responsibility Principle keeps services small, reusable, and easy to test.

---

# DOM Extractor Service

```text
domExtractor.service.ts
```

Responsibilities:

- Walk the DOM tree
- Ignore hidden elements
- Remove scripts
- Remove styles
- Preserve hierarchy
- Extract visible content

Input:

```
HTML
```

Output:

```
Visible DOM
```

---

# Readability Service

```text
readability.service.ts
```

Responsibilities:

- Remove navigation
- Remove sidebars
- Remove advertisements
- Remove footers
- Extract article content

Input:

```
Visible DOM
```

Output:

```
Main Article
```

---

# Code Extractor Service

```text
codeExtractor.service.ts
```

Responsibilities:

- Detect `<pre>` blocks
- Detect `<code>` blocks
- Detect syntax-highlighted snippets
- Preserve indentation
- Capture programming language hints

Input:

```
Article
```

Output:

```
Code Blocks
```

---

# Markdown Service

```text
markdown.service.ts
```

Responsibilities:

- Convert HTML to Markdown
- Preserve headings
- Preserve lists
- Preserve tables
- Preserve code blocks

Input:

```
HTML
```

Output:

```
Markdown
```

---

# Context Builder Service

```text
contextBuilder.service.ts
```

Responsibilities:

- Merge extracted information
- Build structured browser context
- Preserve metadata
- Organize code snippets
- Assemble final context object

Input:

```
Multiple Services
```

Output:

```typescript
BrowserContext
```

---

# Compression Service

```text
compression.service.ts
```

Responsibilities:

- Remove duplicate text
- Compress whitespace
- Remove empty nodes
- Remove advertisements
- Remove navigation
- Reduce token usage

Input:

```
Browser Context
```

Output:

```
Optimized Browser Context
```

---

# Language Detector Service

```text
languageDetector.service.ts
```

Responsibilities:

- Detect programming language
- Read CSS class names
- Use syntax heuristics
- Support AI fallback if needed

Supported languages include:

- JavaScript
- TypeScript
- Python
- Java
- Go
- Rust
- C#
- Dockerfile
- YAML
- JSON
- HTML
- CSS

Output:

```typescript
{
    language: "typescript"
}
```

---

# Types Folder

```text
types/

    pageContext.types.ts
```

The **types** folder centralizes shared TypeScript interfaces and type definitions.

Example:

```typescript
export interface BrowserContext {

    metadata: Metadata;

    article: string;

    markdown: string;

    codeBlocks: CodeBlock[];

    headings: string[];

    links: string[];

    tables: Table[];

    forms: Form[];

}
```

Benefits:

- Strong typing
- Reusability
- Easier refactoring
- Better IntelliSense
- Compile-time validation

---

# Utils Folder

```text
utils/
```

Utility functions contain reusable helper methods shared across multiple services.

Structure:

```text
utils/

    dom.utils.ts

    markdown.utils.ts

    compression.utils.ts
```

Utilities should remain stateless and independent of business logic.

---

## DOM Utilities

```text
dom.utils.ts
```

Example responsibilities:

- Check visibility
- Ignore hidden elements
- Normalize text
- Clean whitespace
- Identify semantic elements

Example:

```typescript
export function isVisible(

    element: HTMLElement

): boolean {

    return (

        getComputedStyle(element).display !== "none"

    );

}
```

---

## Markdown Utilities

```text
markdown.utils.ts
```

Responsibilities:

- Clean Markdown
- Escape special characters
- Normalize headings
- Format code blocks

Example:

```typescript
export function cleanMarkdown(

    markdown: string

): string {

    return markdown.trim();

}
```

---

## Compression Utilities

```text
compression.utils.ts
```

Responsibilities:

- Remove duplicate spaces
- Strip comments
- Collapse empty lines
- Normalize formatting

Example:

```typescript
export function compressText(

    text: string

): string {

    return text.replace(/\s+/g, " ");

}
```

---

# Service Relationships

The services work together in a structured pipeline.

```text
DOM Extractor

        │

        ▼

Readability

        │

        ▼

Code Extractor

        │

        ▼

Markdown Service

        │

        ▼

Compression Service

        │

        ▼

Context Builder

        │

        ▼

Browser Context
```

Each service depends only on the previous stage, keeping responsibilities isolated.

---

# Design Principles

The project structure follows several software engineering principles.

### Single Responsibility Principle (SRP)

Each service performs one specific task.

---

### Separation of Concerns

Extraction, formatting, compression, and prompt generation remain independent.

---

### Modularity

Services can be reused independently across the application.

---

### Testability

Each module can be unit tested without affecting others.

---

### Scalability

New extraction services can be added without changing existing code.

Examples:

- PDF extraction
- Image OCR
- Video transcription
- Audio processing
- Workspace indexing

---

# What You'll Build

By the end of this milestone, **Zeba AI** will automatically understand pages such as:

- React Documentation
- Angular Documentation
- Vue Documentation
- GitHub Repositories
- GitHub Pull Requests
- GitHub Issues
- Stack Overflow Questions
- MDN Web Docs
- Docker Documentation
- Kubernetes Documentation
- Jenkins Documentation
- Medium Articles
- Dev.to Posts
- Enterprise Documentation Portals

Rather than sending raw HTML to an AI model, Zeba AI extracts and builds a clean, structured, and token-efficient browser context.

The generated browser context contains:

- Metadata
- Semantic headings
- Main article
- Source code
- Programming language
- Tables
- Forms
- Links
- Markdown representation
- Optimized prompt context

This structured context becomes the foundation for intelligent prompting and significantly improves response quality while reducing token usage.

---

# Looking Ahead

The browser intelligence architecture developed in this milestone lays the groundwork for several advanced capabilities, including:

- Retrieval-Augmented Generation (RAG)
- Workspace Awareness
- Semantic Search
- Vector Databases
- Embeddings
- Multi-document Context
- Repository Indexing
- Enterprise Knowledge Bases
- Intelligent Developer Workspaces

Each future feature can build directly upon the modular services created during this milestone.

---

# Milestone Summary

Congratulations! 🎉

By completing **Milestone 10**, you have transformed Zeba AI from a browser extension that only understood basic metadata into a platform capable of understanding the semantic structure of entire webpages.

During this milestone, you implemented:

- DOM extraction
- Readability-based article extraction
- Intelligent code detection
- Programming language identification
- Markdown conversion
- Browser context building
- Context compression
- Performance optimization
- Production-ready best practices
- A scalable project architecture

The result is a browser intelligence engine that generates clean, structured, and token-efficient context for Large Language Models.

This optimized browser context becomes the foundation for the next major evolution of Zeba AI, where Retrieval-Augmented Generation (RAG), semantic search, workspace awareness, and enterprise-grade AI development capabilities will be introduced.

# What's Next

In the next milestone, Zeba AI will move beyond browser context and begin building a complete Retrieval-Augmented Generation (RAG) pipeline.

Upcoming features include:

- Document Chunking
- Embedding Generation
- ChromaDB Integration
- Semantic Search
- Similarity Matching
- Workspace Memory
- Long-Term AI Memory
- Intelligent Context Retrieval
- Project-Level Knowledge Base
- Enterprise AI Assistant Architecture

By the end of the next milestone, Zeba AI will not only understand webpages but also remember, retrieve, and reason over previously indexed knowledge, enabling enterprise-grade AI-assisted software development.