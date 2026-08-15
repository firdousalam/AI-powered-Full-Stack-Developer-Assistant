import type {
    BrowserContext
} from "../types/browserContext.types";
import promptService from "./prompt.service";
import aiRouter from "./ai-router.service";
import { AI_CONFIG } from "../config/ai.config";
import { ProviderFactory } from "../providers/provider.factory";
import {
    mcpOrchestratorService
} from "../mcp/orchestration";

import {
    ToolAwarePromptBuilderService,
} from "../mcp/orchestration/services/tool-aware-prompt-builder.service";

import type {
    ToolExecutionResult,
} from "../mcp/orchestration/interfaces/orchestration-result.interface";

import type {
    OrchestrationRequest,
} from "../mcp/orchestration/interfaces/orchestration-request.interface";

const promptBuilder =
    new ToolAwarePromptBuilderService();

const API_URL =
    "http://localhost:3000/api/v1/ai";

/**
 * ==========================================
 * Standard Chat API
 * ==========================================
 */
export async function chatWithAI(

    prompt: string,

    model: string,

    browserContext: BrowserContext

) {

    try {

        console.log("========== CHAT ==========");
        console.log("Prompt:", prompt);
        console.log("Model:", model);
        console.log("Browser Context:", browserContext);

        const response = await fetch(

            `${API_URL}/chat`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    prompt,

                    model,

                    browserContext

                })

            }

        );

        if (!response.ok) {

            throw new Error(

                `Backend Error : ${response.status}`

            );

        }

        const result = await response.json();

        return result;

    }

    catch (error) {

        console.error(

            "Chat API Error:",

            error

        );

        return {

            success: false,

            response:
                "Unable to connect to backend."

        };

    }

}

/**
 * ==========================================
 * Streaming Chat API
 * ==========================================
 */
export async function streamChat(

    prompt: string,

    model: string,

    browserContext: BrowserContext,

    onToken: (token: string) => void

) {



    /**
        * Build final AI prompt
        */
    // const finalPrompt =

    //     promptService.buildPrompt(

    //         prompt,

    //         browserContext

    //     );

    const finalPrompt = prompt;
    console.log("========== streamChat REQUEST ==========", browserContext)
    /**
     * Select model
     */
    const route =

        aiRouter.selectModel(

            model ?? prompt

        );

    console.log(

        "Selected Model:",

        route.model

    );
    const provider =

        ProviderFactory.create(

            AI_CONFIG.provider

        );


    // const response = await fetch("http://localhost:11434/api/chat", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         model,
    //         stream: true,
    //         messages: [
    //             {
    //                 role: "user",
    //                 content: prompt
    //             }
    //         ]
    //     })
    // });


    return provider.streamChat(

        finalPrompt,

        route.model,

        onToken

    );
    /*

    console.log("Status:", response.status);

    if (!response.ok) {

        throw new Error(

            `Streaming Error : ${response.status}`

        );

    }

    if (!response.body) {

        throw new Error(

            "ReadableStream not available."

        );

    }

    const reader =
        response.body.getReader();

    const decoder =
        new TextDecoder("utf-8");

    try {

        while (true) {

            const {

                done,

                value

            } = await reader.read();

            if (done) {

                break;

            }

            const chunk = decoder.decode(

                value,

                {

                    stream: true

                }

            );

            if (chunk) {


                onToken(chunk);

            }

        }

    }

    catch (error) {

        console.error(

            "Streaming Error:",

            error

        );

        throw error;

    }

    finally {

        reader.releaseLock();

    }*/


}

/*
Temporary function
*/
export async function inspectMCPTools() {

    const tools =
        mcpOrchestratorService.getTools();

    console.log(
        "========== MCP TOOLS =========="
    );

    console.log(
        tools.map(tool =>
            tool.function.name
        )
    );

    return tools;

}

// export async function chatWithMCPTools(

//     prompt: string,

//     model: string,

//     browserContext: BrowserContext

// ) {

//     const finalPrompt =
//         promptService.buildPrompt(
//             prompt,
//             browserContext
//         );

//     // const tools =
//     //     mcpOrchestratorService
//     //         .getTools()
//     //         .filter(
//     //             tool =>
//     //                 tool.function.name ===
//     //                 "analyzeDependencies"
//     //         );

//     const tools =
//         mcpOrchestratorService
//             .getTools();
//     console.log(
//         "========== OLLAMA TOOL TEST =========="
//     );

//     console.log(
//         "Prompt:",
//         finalPrompt
//     );

//     console.log(
//         "Tools:",
//         tools.map(
//             tool => tool.function.name
//         )
//     );

//     const route =
//         aiRouter.selectModel(
//             model ?? prompt
//         );

//     console.log(
//         "Model:",
//         route.model
//     );

//     const provider =
//         ProviderFactory.create(
//             AI_CONFIG.provider
//         );

//     return provider.chatWithTools(
//         finalPrompt,
//         route.model,
//         tools
//     );
// }

export async function chatWithMCPTools(

    prompt: string,

    model: string,

    browserContext: BrowserContext

) {

    /**
     * ==========================================
     * Build Initial Prompt
     * ==========================================
     */

    const finalPrompt =
        promptService.buildPrompt(
            prompt,
            browserContext
        );


    /**
     * ==========================================
     * Get MCP Tools
     * ==========================================
     */

    const tools =
        mcpOrchestratorService.getTools();


    console.log(
        "========== OLLAMA TOOL TEST =========="
    );

    console.log(
        "Prompt:",
        finalPrompt
    );

    console.log(
        "Tools:",
        tools.map(
            tool =>
                tool.function.name
        )
    );


    /**
     * ==========================================
     * Select Model
     * ==========================================
     */

    const route =
        aiRouter.selectModel(
            model ?? prompt
        );


    console.log(
        "Model:",
        route.model
    );


    /**
     * ==========================================
     * Provider
     * ==========================================
     */

    const provider =
        ProviderFactory.create(
            AI_CONFIG.provider
        );


    /**
     * ==========================================
     * Conversation Messages
     * ==========================================
     */

    const messages = [

        {
            role: "user" as const,
            content: finalPrompt
        }

    ];


    /**
     * ==========================================
     * MCP Execution Results
     * ==========================================
     */

    const toolResults: ToolExecutionResult[] = [];


    /**
     * ==========================================
     * Orchestration Request
     * ==========================================
     */

    const orchestrationRequest:
        OrchestrationRequest = {

        userMessage: prompt

    };


    /**
     * ==========================================
     * MCP / LLM Tool Loop
     * ==========================================
     */

    for (
        let iteration = 0;
        iteration < 5;
        iteration++
    ) {

        console.log(
            `========== TOOL LOOP ${iteration + 1} ==========`
        );


        /**
         * ======================================
         * Ask LLM
         * ======================================
         */

        const response =
            await provider.chatWithTools(
                messages,
                route.model,
                tools
            );


        console.log(
            "========== LLM RESPONSE =========="
        );

        console.log(
            response
        );


        /**
         * ======================================
         * No Tool Call
         * ======================================
         */

        if (
            !response.toolCalls ||
            response.toolCalls.length === 0
        ) {

            console.log(
                "No tool calls."
            );

            return response;

        }


        /**
         * ======================================
         * Process Tool Calls
         * ======================================
         */

        for (
            const toolCall
            of response.toolCalls
        ) {

            const toolName =
                toolCall.function.name;


            const toolArguments =
                toolCall.function.arguments;


            console.log(
                "========== MCP TOOL CALL =========="
            );

            console.log(
                "Tool:",
                toolName
            );

            console.log(
                "Arguments:",
                toolArguments
            );


            /**
             * ==================================
             * Execute MCP Tool
             * ==================================
             */

            const toolResult =
                await mcpOrchestratorService.executeTool(
                    toolName,
                    toolArguments,
                );


            console.log(
                "========== MCP TOOL RESULT =========="
            );

            console.log(
                toolResult
            );


            /**
             * ==================================
             * Store Execution Result
             * ==================================
             */

            const isToolFailure =
                typeof toolResult === "object" &&
                toolResult !== null &&
                "success" in toolResult &&
                (toolResult as {
                    success?: unknown
                }).success === false;


            const executionResult:
                ToolExecutionResult = {

                toolName,

                serverName:
                    "filesystem",

                status:
                    isToolFailure
                        ? "failed"
                        : "success",

                data:
                    toolResult,

            };


            toolResults.push(
                executionResult
            );


            /**
             * ==================================
             * Add Assistant Tool Call
             * ==================================
             */

            messages.push({

                role:
                    "assistant",

                content:
                    response.content ?? "",

                tool_calls:
                    response.toolCalls

            } as any);


            /**
             * ==================================
             * Add Tool Result
             * ==================================
             */

            messages.push({

                role:
                    "tool",

                tool_call_id:
                    toolCall.id,

                content:
                    JSON.stringify(
                        toolResult
                    )

            } as any);

        }


        /**
         * ==========================================
         * AI Context Enrichment
         * ==========================================
         */

        const aiContext =
            mcpOrchestratorService.enrichContext(
                orchestrationRequest,
                toolResults,
            );


        console.log(
            "========== AI CONTEXT =========="
        );

        console.log(
            aiContext
        );


        /**
         * ==========================================
         * Build Tool-aware Prompt
         * ==========================================
         */

        const aiPrompt =
            promptBuilder.build(
                aiContext
            );


        console.log(
            "========== AI PROMPT =========="
        );

        console.log(
            aiPrompt
        );


        /**
         * ==========================================
         * Add Enriched Context
         * ==========================================
         */

        if (
            aiPrompt.contextPrompt
        ) {

            messages.push({

                role:
                    "system",

                content:
                    `=== MCP PROJECT CONTEXT ===\n${aiPrompt.contextPrompt}`

            } as any);

        }

    }


    /**
     * ==========================================
     * Safety Limit
     * ==========================================
     */

    throw new Error(
        "Maximum MCP tool execution iterations reached."
    );

}