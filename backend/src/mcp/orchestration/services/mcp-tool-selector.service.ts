import { OrchestrationRequest } from "../interfaces/orchestration-request.interface";
import {
    SelectedTool,
    ToolSelectionResult,
} from "../interfaces/tool-selection-result.interface";

export class McpToolSelectorService {
    select(
        request: OrchestrationRequest,
    ): ToolSelectionResult {
        const message = request.userMessage.toLowerCase();

        const tools: SelectedTool[] = [];

        if (this.requiresProjectAnalysis(message)) {
            tools.push({
                toolName: "analyzeProject",
                reason: "The request requires project-level analysis.",
            });
        }

        if (this.requiresFileSearch(message)) {
            tools.push({
                toolName: "searchFiles",
                reason: "The request requires searching project files.",
            });
        }

        if (tools.length === 0) {
            return {
                strategy: "none",
                tools: [],
                reasoning: "No MCP tool is required for this request.",
            };
        }

        return {
            strategy: tools.length === 1 ? "single" : "multiple",
            tools,
            reasoning: `Selected ${tools.length} MCP tool(s) based on the user request.`,
        };
    }

    private requiresProjectAnalysis(
        message: string,
    ): boolean {
        const keywords = [
            "project",
            "architecture",
            "framework",
            "technology",
            "tech stack",
            "docker",
            "kubernetes",
            "k8s",
            "git",
            "cicd",
            "ci/cd",
            "deployment",
            "repository",
            "repo",
        ];

        return this.containsKeyword(message, keywords);
    }

    private requiresFileSearch(
        message: string,
    ): boolean {
        const keywords = [
            "find file",
            "find files",
            "search file",
            "search files",
            "where is",
            "which file",
            "locate",
            "search for",
        ];

        return this.containsKeyword(message, keywords);
    }

    private containsKeyword(
        message: string,
        keywords: string[],
    ): boolean {
        return keywords.some((keyword) =>
            message.includes(keyword),
        );
    }
}