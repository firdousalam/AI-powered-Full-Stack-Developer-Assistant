import {
    mcpToolDiscoveryService
} from "../tool-discovery";

import {
    MCPToolSchemaAdapter
} from "../tool-schema";

import {
    LLMToolDefinition
} from "../tool-schema";

export class ToolCatalogService {

    private readonly adapter =
        new MCPToolSchemaAdapter();

    public getTools(): LLMToolDefinition[] {

        const mcpTools =
            mcpToolDiscoveryService
                .discoverTools();

        return this.adapter.adaptMany(
            mcpTools
        );

    }

}