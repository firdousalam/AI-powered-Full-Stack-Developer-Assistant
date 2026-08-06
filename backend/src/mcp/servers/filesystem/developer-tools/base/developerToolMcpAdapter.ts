import { MCPTool } from "../../../../types";

import { DeveloperToolBase } from "./developerTool.base";

import { DeveloperToolContext } from "./developerTool.types";

export class DeveloperToolMcpAdapter
    implements MCPTool {

    constructor(
        private readonly tool:
            DeveloperToolBase<
                DeveloperToolContext,
                unknown
            >
    ) { }

    get name(): string {

        return this.tool.name;

    }

    get description(): string {

        return this.tool.description;

    }

    get inputSchema() {

        return {

            type: "object",

            properties: {

                workspacePath: {

                    type: "string"

                }

            },

            required: [

                "workspacePath"

            ]

        };

    }

    async execute(
        args?: Record<string, unknown>
    ): Promise<unknown> {

        const context: DeveloperToolContext = {
            workspacePath: String(
                args?.workspacePath ?? ""
            ),
            arguments: undefined
        };

        return this.tool.execute(
            context
        );

    }

}