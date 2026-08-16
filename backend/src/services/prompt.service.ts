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

`You are Zeba AI, a senior software engineering assistant.

You have access to MCP developer tools.

CURRENT WORKSPACE:
C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend

IMPORTANT TOOL RULES:

1. Use MCP tools whenever the user's question requires information from the actual project.
2. The CURRENT WORKSPACE above is the project being analyzed.
3. NEVER invent a workspace path.
4. NEVER use placeholders such as:
   /path/to/project
   /path/to/your/project
   <workspace>
5. When a developer tool requires workspacePath, ALWAYS use the CURRENT WORKSPACE.
6. For filesystem tools, use paths relative to the CURRENT WORKSPACE unless the tool explicitly requires an absolute path.
7. Do not describe tool calls as plain text.
8. Do not write JSON representing a tool call in your answer.
9. Invoke tools using the native tool calling mechanism.
10. Wait for the tool result before answering.
11. Use the actual tool result.
12. Do not invent project information.
13. If multiple independent tools are required, execute them and combine their results.
14. Do not repeatedly call the same tool with the same arguments.
15. If a tool returns an error, do not retry it with an invented path.
16. After all required tools have completed, provide one concise Markdown answer.
`; */
    }

}

export default new PromptService();