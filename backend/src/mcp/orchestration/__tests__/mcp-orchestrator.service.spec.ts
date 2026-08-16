import {
    describe,
    it,
    expect,
    beforeEach,
    vi,
} from "vitest";


import type {
    LLMToolDefinition,
} from "../tool-schema";


vi.mock(
    "../tool-catalog",
    () => ({

        toolCatalogService: {

            getTools:
                vi.fn(),

        },

    })
);


vi.mock(
    "../tool-execution",
    () => ({

        mcpToolExecutorService: {

            execute:
                vi.fn(),

        },

    })
);


import {
    mcpOrchestratorService,
} from "../mcp-orchestrator";


import {
    toolCatalogService,
} from "../tool-catalog";


import {
    mcpToolExecutorService,
} from "../tool-execution";


describe(
    "McpOrchestratorService",
    () => {

        beforeEach(() => {

            vi.clearAllMocks();

        });


        /**
         * ==========================================
         * getTools()
         * ==========================================
         */

        it(
            "should return available MCP tools",
            () => {

                const tools:
                    LLMToolDefinition[] = [

                        {

                            type:
                                "function",

                            function: {

                                name:
                                    "analyzeProject",

                                description:
                                    "Analyze project",

                                parameters: {

                                    type:
                                        "object",

                                    properties: {},

                                },

                            },

                        },

                    ];


                vi.mocked(
                    toolCatalogService.getTools
                ).mockReturnValue(
                    tools
                );


                const result =
                    mcpOrchestratorService
                        .getTools();


                expect(
                    result
                ).toEqual(
                    tools
                );


                expect(
                    toolCatalogService
                        .getTools
                ).toHaveBeenCalledTimes(
                    1
                );

            }
        );


        /**
         * ==========================================
         * executeTool()
         * ==========================================
         */

        it(
            "should execute an MCP tool through the executor",
            async () => {

                const toolResult = {

                    success:
                        true,

                    data: {

                        framework:
                            "NestJS",

                    },

                };


                vi.mocked(
                    mcpToolExecutorService.execute
                ).mockResolvedValue(
                    toolResult
                );


                const result =
                    await mcpOrchestratorService
                        .executeTool(

                            "analyzeProject",

                            {

                                workspacePath:
                                    "/workspace",

                            },

                        );


                expect(
                    result
                ).toEqual(
                    toolResult
                );


                expect(
                    mcpToolExecutorService
                        .execute
                ).toHaveBeenCalledTimes(
                    1
                );


                expect(
                    mcpToolExecutorService
                        .execute
                ).toHaveBeenCalledWith(

                    "filesystem-server",

                    "analyzeProject",

                    {

                        workspacePath:
                            "/workspace",

                    },

                );

            }
        );


        /**
         * ==========================================
         * Server routing
         * ==========================================
         */

        it(
            "should route developer tools to the filesystem-server MCP server",
            async () => {

                const toolResult = {

                    success:
                        true,

                    data:
                        "Project analysis completed.",

                };


                vi.mocked(
                    mcpToolExecutorService.execute
                ).mockResolvedValue(
                    toolResult
                );


                await mcpOrchestratorService
                    .executeTool(

                        "analyzeProject",

                        {

                            workspacePath:
                                "/project",

                        },

                    );


                expect(
                    mcpToolExecutorService
                        .execute
                ).toHaveBeenCalledWith(

                    "filesystem-server",

                    "analyzeProject",

                    {

                        workspacePath:
                            "/project",

                    },

                );

            }
        );


        /**
         * ==========================================
         * Error propagation
         * ==========================================
         */

        it(
            "should return a structured error when MCP execution fails",
            async () => {

                const error =
                    new Error(
                        "Workspace not found."
                    );


                vi.mocked(
                    mcpToolExecutorService.execute
                ).mockRejectedValue(
                    error
                );


                const result =
                    await mcpOrchestratorService
                        .executeTool(

                            "analyzeProject",

                            {

                                workspacePath:
                                    "/invalid",

                            },

                        );


                expect(
                    result
                ).toEqual({

                    success:
                        false,

                    timeout:
                        false,

                    error:
                        "Workspace not found.",

                });


                expect(
                    mcpToolExecutorService
                        .execute
                ).toHaveBeenCalledTimes(
                    1
                );

            }
        );


        /**
         * ==========================================
         * Arguments forwarding
         * ==========================================
         */

        it(
            "should forward tool arguments without modification",
            async () => {

                const argumentsObject = {

                    workspacePath:
                        "/workspace",

                    includeTests:
                        true,

                    depth:
                        3,

                };


                vi.mocked(
                    mcpToolExecutorService.execute
                ).mockResolvedValue({

                    success:
                        true,

                });


                await mcpOrchestratorService
                    .executeTool(

                        "analyzeProject",

                        argumentsObject,

                    );


                expect(
                    mcpToolExecutorService
                        .execute
                ).toHaveBeenCalledWith(

                    "filesystem-server",

                    "analyzeProject",

                    argumentsObject,

                );

            }
        );

    }
);