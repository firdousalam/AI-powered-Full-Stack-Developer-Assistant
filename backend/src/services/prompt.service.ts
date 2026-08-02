import { chatPrompt } from "../prompts/chat.prompt";
import { dockerPrompt } from "../prompts/docker.prompt";
import { kubernetesPrompt } from "../prompts/kubernetes.prompt";
import { jenkinsPrompt } from "../prompts/jenkins.prompt";
import { codeReviewPrompt } from "../prompts/code-review.prompt";

import type { BrowserContext } from "../types/browserContext.types";

class PromptService {

    /**
     * =====================================
     * Select Prompt Template
     * =====================================
     */
    private getBasePrompt(userPrompt: string): string {

        const prompt = userPrompt.toLowerCase();

        if (prompt.includes("docker")) {
            return dockerPrompt(userPrompt);
        }

        if (prompt.includes("kubernetes")) {
            return kubernetesPrompt(userPrompt);
        }

        if (prompt.includes("jenkins")) {
            return jenkinsPrompt(userPrompt);
        }

        if (
            prompt.includes("review code") ||
            prompt.includes("code review")
        ) {
            return codeReviewPrompt(userPrompt);
        }

        return chatPrompt(userPrompt);
    }

    /**
     * =====================================
     * Build Final Prompt
     * =====================================
     */
    buildPrompt(
        prompt: string,
        browserContext?: BrowserContext
    ): string {

        const basePrompt = this.getBasePrompt(prompt);

        if (browserContext) {
            return basePrompt;
        }

        return basePrompt;

        /* 
        const metadata = browserContext.metadata;

        const headings =
            browserContext.headings
                .map(h => `H${h.level}: ${h.text}`)
                .join("\n");

        const links =
            browserContext.links
                .slice(0, 20)
                .map(link => `• ${link.text} (${link.href})`)
                .join("\n");

        const codeBlocks =
            browserContext.codeBlocks
                .map(code =>
                    `Language: ${code.language}\n${code.code}`
                )
                .join("\n\n----------------------------------\n\n");

        const tables =
            browserContext.tables
                .map(table =>
                    JSON.stringify(table, null, 2)
                )
                .join("\n\n");

        const forms =
            browserContext.forms
                .map(form => `
Form: ${form.name || form.id}

Action: ${form.action}

Method: ${form.method}

Fields:
${form.fields
                        .map(field =>
                            `- ${field.label || field.name} (${field.type})`
                        )
                        .join("\n")}
`)
                .join("\n");

        return `
==================================================
Zeba AI Browser Intelligence
==================================================

## Page Metadata

Title:
${metadata.title}

URL:
${metadata.url}

Hostname:
${metadata.hostname}

Protocol:
${metadata.protocol}

Language:
${metadata.language}

Timestamp:
${metadata.timestamp}

==================================================
Main Article
==================================================

${browserContext.article || "No article extracted."}

==================================================
Markdown Version
==================================================

${browserContext.markdown || "No markdown available."}

==================================================
Document Headings
==================================================

${headings || "No headings found."}

==================================================
Detected Code Blocks
==================================================

${codeBlocks || "No code blocks found."}

==================================================
Links
==================================================

${links || "No links found."}

==================================================
Tables
==================================================

${tables || "No tables found."}

==================================================
Forms
==================================================

${forms || "No forms found."}

==================================================
Prompt Template
==================================================

${basePrompt}

==================================================
Instructions
==================================================

You are Zeba AI, an intelligent browser-aware AI assistant.

When answering:

• Use the browser context whenever it is relevant.
• Prefer the extracted article over raw HTML.
• Use headings to understand document structure.
• Use markdown when it improves readability.
• Use detected code blocks when explaining programming concepts.
• Mention programming languages when code is detected.
• Use tables and forms only if relevant to the user's question.
• Never invent information that is not present in the browser context.
• If the browser context is unrelated to the user's question, answer normally.
• Respond as a senior software engineer with concise and accurate explanations.
`; */
    }

}

export default new PromptService();