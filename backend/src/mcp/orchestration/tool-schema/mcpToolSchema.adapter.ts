import {
    MCPTool
} from "../../types";

import {
    LLMToolDefinition
} from "./llmTool.types";

export class MCPToolSchemaAdapter {

    public toLLMTool(
        tool: MCPTool
    ): LLMToolDefinition {

        return {

            type: "function",

            function: {

                name: tool.name,

                description:
                    tool.description || "",

                parameters:
                    tool.inputSchema ?? {
                        type: "object",
                        properties: {}
                    }

            }

        };

    }

    public toLLMTools(
        tools: MCPTool[]
    ): LLMToolDefinition[] {

        return tools.map(
            tool =>
                this.toLLMTool(tool)
        );

    }

    public adaptMany(
        tools: MCPTool[]
    ): LLMToolDefinition[] {

        return this.toLLMTools(
            tools
        );

    }

    public adapt(
        tool: MCPTool
    ): LLMToolDefinition {

        return this.toLLMTool(
            tool
        );

    }

}

export const mcpToolSchemaAdapter =
    new MCPToolSchemaAdapter();