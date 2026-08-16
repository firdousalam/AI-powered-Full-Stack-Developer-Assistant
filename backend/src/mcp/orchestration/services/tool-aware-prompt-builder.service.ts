import { AIContext } from "../interfaces/ai-context.interface";
import { AIPrompt } from "../interfaces/ai-prompt.interface";

export class ToolAwarePromptBuilderService {

    build(
        context: AIContext,
    ): AIPrompt {

        const contextPrompt = this.buildContextPrompt(
            context,
        );

        return {
            systemPrompt: this.buildSystemPrompt(),

            userPrompt: context.userMessage,

            contextPrompt,
        };
    }

    private buildSystemPrompt(): string {
        return [
            "You are an AI-powered full-stack developer assistant.",
            "Answer developer questions using the available project context.",
            "Do not invent project-specific information.",
            "When project context is available, prioritize it over assumptions.",
            "Clearly distinguish between detected project information and general recommendations.",
        ].join(" ");
    }

    private buildContextPrompt(
        context: AIContext,
    ): string {

        if (context.items.length === 0) {
            return "";
        }

        const sections = context.items.map(
            (item, index) => {

                return [
                    `Context Source ${index + 1}: ${item.source}`,
                    `Tool: ${item.toolName}`,
                    "Data:",
                    this.serializeData(item.data),
                ].join("\n");

            },
        );

        return [
            "PROJECT CONTEXT",
            "==============",
            `Workspace: ${context.workspacePath ?? "Not provided"}`,
            "",
            sections.join("\n\n"),
        ].join("\n");
    }

    private serializeData(
        data: unknown,
    ): string {

        if (typeof data === "string") {
            return data;
        }

        try {
            return JSON.stringify(
                data,
                null,
                2,
            );
        } catch {
            return String(data);
        }
    }
}