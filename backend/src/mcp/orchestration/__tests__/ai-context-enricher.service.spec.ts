import {
    describe,
    it,
    expect,
    beforeEach,
} from "vitest";

import {
    AIContextEnricherService,
} from "../services/ai-context-enricher.service";

import type {
    OrchestrationRequest,
} from "../interfaces/orchestration-request.interface";

import type {
    ToolExecutionResult,
} from "../interfaces/orchestration-result.interface";


describe(
    "AIContextEnricherService",
    () => {

        let service:
            AIContextEnricherService;


        beforeEach(() => {

            service =
                new AIContextEnricherService();

        });


        it(
            "should enrich context with successful tool results",
            () => {

                const request:
                    OrchestrationRequest = {

                    userMessage:
                        "Analyze my project.",

                };


                const toolResults:
                    ToolExecutionResult[] = [

                        {

                            toolName:
                                "analyzeProject",

                            serverName:
                                "filesystem",

                            status:
                                "success",

                            data: {

                                framework:
                                    "NestJS",

                                language:
                                    "TypeScript",

                            },

                        },

                    ];


                const context =
                    service.enrich(
                        request,
                        toolResults,
                    );


                expect(
                    context
                ).toBeDefined();


                expect(
                    context.userMessage
                ).toBe(
                    "Analyze my project."
                );


                expect(
                    context.items
                ).toBeDefined();


                expect(
                    context.items.length
                ).toBe(1);


                expect(
                    context.items[0].toolName
                ).toBe(
                    "analyzeProject"
                );

            }
        );


        it(
            "should handle an empty result list",
            () => {

                const request:
                    OrchestrationRequest = {

                    userMessage:
                        "Hello",

                };


                const context =
                    service.enrich(
                        request,
                        [],
                    );


                expect(
                    context
                ).toBeDefined();


                expect(
                    context.userMessage
                ).toBe(
                    "Hello"
                );


                expect(
                    context.items
                ).toBeDefined();


                expect(
                    context.items.length
                ).toBe(0);

            }
        );


        it(
            "should preserve multiple successful tool results",
            () => {

                const request:
                    OrchestrationRequest = {

                    userMessage:
                        "Analyze the project.",

                };


                const toolResults:
                    ToolExecutionResult[] = [

                        {

                            toolName:
                                "analyzeProject",

                            serverName:
                                "filesystem",

                            status:
                                "success",

                            data: {

                                framework:
                                    "NestJS",

                            },

                        },

                        {

                            toolName:
                                "getProjectTree",

                            serverName:
                                "filesystem",

                            status:
                                "success",

                            data: {

                                files:
                                    10,

                            },

                        },

                    ];


                const context =
                    service.enrich(
                        request,
                        toolResults,
                    );


                expect(
                    context.items.length
                ).toBe(2);


                expect(
                    context.items[0].toolName
                ).toBe(
                    "analyzeProject"
                );


                expect(
                    context.items[1].toolName
                ).toBe(
                    "getProjectTree"
                );

            }
        );

    }
);