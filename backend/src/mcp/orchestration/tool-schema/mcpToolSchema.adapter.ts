import {
    MCPTool
} from "../../types";

import {
    LLMToolDefinition
} from "./llmTool.types";

export class MCPToolSchemaAdapter {

    /**
     * Convert one MCP tool into a
     * provider-neutral LLM tool definition.
     */
    public adapt(
        tool: MCPTool
    ): LLMToolDefinition {

        return {

            name:
                tool.name,

            description:
                tool.description,

            parameters:
                tool.inputSchema ?? {}

        };

    }

    /**
     * Convert multiple MCP tools.
     */
    public adaptMany(
        tools: MCPTool[]
    ): LLMToolDefinition[] {

        return tools.map(
            tool => this.adapt(tool)
        );

    }

}