import { chatPrompt } from "../prompts/chat.prompt";
import { dockerPrompt } from "../prompts/docker.prompt";
import { kubernetesPrompt } from "../prompts/kubernetes.prompt";
import { jenkinsPrompt } from "../prompts/jenkins.prompt";
import { codeReviewPrompt } from "../prompts/code-review.prompt";

import type { BrowserContext } from "../types/browserContext.types";

class PromptService {

    /**
     * Select the appropriate prompt template.
     */
    private getBasePrompt(userPrompt: string): string {

        const prompt = userPrompt.toLowerCase();

        if (prompt.includes("docker")) {
            return dockerPrompt(prompt);
        }

        if (prompt.includes("kubernetes")) {
            return kubernetesPrompt(prompt);
        }

        if (prompt.includes("jenkins")) {
            return jenkinsPrompt(prompt);
        }

        if (
            prompt.includes("review code") ||
            prompt.includes("code review")
        ) {
            return codeReviewPrompt(prompt);
        }

        return chatPrompt(prompt);
    }

    /**
     * Build the final prompt sent to the LLM.
     */
    buildPrompt(
        prompt: string,
        browserContext?: BrowserContext
    ): string {

        const basePrompt = this.getBasePrompt(prompt);

        if (!browserContext) {
            return basePrompt;
        }

        return `
===========================
Zeba AI Browser Context
===========================

Current Page:
${browserContext.title || "Unknown"}

Current URL:
${browserContext.url || "Unknown"}

Hostname:
${browserContext.hostname || "Unknown"}

Protocol:
${browserContext.protocol || "Unknown"}

Browser Language:
${browserContext.language || "Unknown"}

Selected Text:
${browserContext.selectedText || "No text selected"}

Timestamp:
${browserContext.timestamp}

===========================
Prompt Template
===========================

${basePrompt}

===========================
Instructions
===========================

• Use browser context whenever it is relevant.
• If selected text exists, explain it first.
• If there is no selected text, infer context from the page title and URL.
• Never invent browser information.
• Respond as a senior software engineer.
`;
    }

}

export default new PromptService();