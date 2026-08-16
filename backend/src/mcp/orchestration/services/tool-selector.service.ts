import type {
    LLMToolDefinition
} from "../tool-schema";

export class ToolSelectorService {

    selectTools(
        prompt: string,
        tools: LLMToolDefinition[]
    ): LLMToolDefinition[] {

        const normalizedPrompt =
            prompt.toLowerCase();

        const selectedToolNames =
            new Set<string>();

        /**
         * ==========================================
         * Project structure
         * ==========================================
         */

        if (
            normalizedPrompt.includes("project structure") ||
            normalizedPrompt.includes("project tree") ||
            normalizedPrompt.includes("folder structure") ||
            normalizedPrompt.includes("directory structure")
        ) {

            selectedToolNames.add(
                "projectTree"
            );
        }


        /**
         * ==========================================
         * File existence
         * ==========================================
         */

        if (
            normalizedPrompt.includes("exist") ||
            normalizedPrompt.includes("exists") ||
            normalizedPrompt.includes("present") ||
            normalizedPrompt.includes("available")
        ) {

            selectedToolNames.add(
                "fileExists"
            );
        }


        /**
         * ==========================================
         * Dependencies
         * ==========================================
         */

        if (
            normalizedPrompt.includes("dependenc") ||
            normalizedPrompt.includes("package") ||
            normalizedPrompt.includes("npm") ||
            normalizedPrompt.includes("yarn") ||
            normalizedPrompt.includes("pnpm")
        ) {

            selectedToolNames.add(
                "analyzeDependencies"
            );
        }


        /**
         * ==========================================
         * Framework / architecture / code structure
         * ==========================================
         */

        if (
            normalizedPrompt.includes("framework") ||
            normalizedPrompt.includes("architecture") ||
            normalizedPrompt.includes("code structure") ||
            normalizedPrompt.includes("controllers") ||
            normalizedPrompt.includes("services") ||
            normalizedPrompt.includes("routes")
        ) {

            selectedToolNames.add(
                "analyzeCodeStructure"
            );
        }


        /**
         * ==========================================
         * Explicit file reading
         * ==========================================
         */

        if (
            normalizedPrompt.includes("read ") ||
            normalizedPrompt.includes("contents of") ||
            normalizedPrompt.includes("content of")
        ) {

            selectedToolNames.add(
                "readFile"
            );
        }


        /**
         * ==========================================
         * Search
         * ==========================================
         */

        if (
            normalizedPrompt.includes("search") ||
            normalizedPrompt.includes("find file") ||
            normalizedPrompt.includes("find files")
        ) {

            selectedToolNames.add(
                "searchFiles"
            );
        }


        /**
         * ==========================================
         * Metadata
         * ==========================================
         */

        if (
            normalizedPrompt.includes("metadata") ||
            normalizedPrompt.includes("file information") ||
            normalizedPrompt.includes("file details")
        ) {

            selectedToolNames.add(
                "fileMetadata"
            );
        }


        /**
         * ==========================================
         * Project analysis
         * ==========================================
         */

        if (
            normalizedPrompt.includes("analyze project") ||
            normalizedPrompt.includes("project analysis") ||
            normalizedPrompt.includes("technology stack") ||
            normalizedPrompt.includes("tech stack")
        ) {

            selectedToolNames.add(
                "analyzeProject"
            );
        }


        /**
         * ==========================================
         * Fallback
         *
         * If we cannot determine the relevant tool,
         * expose all tools to the LLM.
         * ==========================================
         */

        if (selectedToolNames.size === 0) {

            return tools;
        }


        return tools.filter(
            tool =>
                selectedToolNames.has(
                    tool.function.name
                )
        );
    }
}

export const toolSelectorService =
    new ToolSelectorService();