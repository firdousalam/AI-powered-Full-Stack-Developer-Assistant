import {
    describe,
    it,
    expect,
    beforeEach,
} from "vitest";

import {
    ToolAwarePromptBuilderService,
} from "../services/tool-aware-prompt-builder.service";

import type {
    AIContext,
} from "../interfaces/ai-context.interface";


describe(
    "ToolAwarePromptBuilderService",
    () => {

        let service:
            ToolAwarePromptBuilderService;


        beforeEach(() => {

            service =
                new ToolAwarePromptBuilderService();

        });


        it(
            "should build a prompt from AI context",
            () => {

                const context:
                    AIContext = {

                    userMessage:
                        "Why is Docker failing?",

                    items: [

                        {

                            source:
                                "filesystem",

                            toolName:
                                "analyzeProject",

                            data: {

                                framework:
                                    "NestJS",

                                language:
                                    "TypeScript",

                            },

                        },

                    ],

                };


                const result =
                    service.build(
                        context
                    );


                expect(
                    result
                ).toBeDefined();


                expect(
                    result.userPrompt
                ).toBe(
                    "Why is Docker failing?"
                );


                expect(
                    result.contextPrompt
                ).toBeDefined();


                expect(
                    result.contextPrompt
                ).toContain(
                    "analyzeProject"
                );


                expect(
                    result.contextPrompt
                ).toContain(
                    "NestJS"
                );

            }
        );


        it(
            "should handle empty tool context",
            () => {

                const context:
                    AIContext = {

                    userMessage:
                        "Hello",

                    items: [],

                };


                const result =
                    service.build(
                        context
                    );


                expect(
                    result
                ).toBeDefined();


                expect(
                    result.userPrompt
                ).toBe(
                    "Hello"
                );


                expect(
                    result.contextPrompt
                ).toBe("");

            }
        );


        it(
            "should include multiple tool results",
            () => {

                const context:
                    AIContext = {

                    userMessage:
                        "Analyze my project.",

                    items: [

                        {

                            source:
                                "filesystem",

                            toolName:
                                "analyzeProject",

                            data: {

                                framework:
                                    "NestJS",

                            },

                        },

                        {

                            source:
                                "filesystem",

                            toolName:
                                "getProjectTree",

                            data: {

                                files:
                                    25,

                            },

                        },

                    ],

                };


                const result =
                    service.build(
                        context
                    );


                expect(
                    result.contextPrompt
                ).toContain(
                    "analyzeProject"
                );


                expect(
                    result.contextPrompt
                ).toContain(
                    "getProjectTree"
                );

            }
        );

    }
);