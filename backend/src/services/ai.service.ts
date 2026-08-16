import type {
    BrowserContext
} from "../types/browserContext.types";
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
import {
    toolSelectorService
} from "../mcp/orchestration/services/tool-selector.service";
import { AIMessage } from "../providers/ai-provider";

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

// export async function chatWithMCPTools(

//     prompt: string,

//     model: string,

//     browserContext: BrowserContext

// ) {

//     /**
//      * ==========================================
//      * Build Initial Prompt
//      * ==========================================
//      */

//     const finalPrompt =
//         promptService.buildPrompt(
//             prompt,
//             browserContext
//         );


//     /**
//      * ==========================================
//      * Get MCP Tools
//      * ==========================================
//      */

//     const tools =
//         mcpOrchestratorService.getTools();


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
//             tool =>
//                 tool.function.name
//         )
//     );


//     /**
//      * ==========================================
//      * Select Model
//      * ==========================================
//      */

//     const route =
//         aiRouter.selectModel(
//             model ?? prompt
//         );


//     console.log(
//         "Model:",
//         route.model
//     );


//     /**
//      * ==========================================
//      * Provider
//      * ==========================================
//      */

//     const provider =
//         ProviderFactory.create(
//             AI_CONFIG.provider
//         );


//     /**
//      * ==========================================
//      * Conversation Messages
//      * ==========================================
//      *
//      * Important:
//      *
//      * We explicitly tell the model that MCP tools
//      * must be invoked through native tool calls.
//      *
//      * The model should NOT write fake JSON such as:
//      *
//      * {
//      *   "name": "fileExists",
//      *   "arguments": {}
//      * }
//      *
//      * as normal text.
//      */

//     const messages = [

//         {
//             role: "system" as const,

//             content:
//                 [
//                     "You are an AI software engineering assistant.",
//                     "",
//                     "You have access to MCP developer tools.",
//                     "",
//                     "IMPORTANT TOOL RULES:",
//                     "1. Use the available tools whenever the user's question requires information from the project.",
//                     "2. Do not describe a tool call as plain text.",
//                     "3. Do not write JSON representing a tool call in your answer.",
//                     "4. Invoke tools using the native tool calling mechanism.",
//                     "5. Wait for the tool results before answering the user.",
//                     "6. Use the actual tool results to produce the final answer.",
//                     "7. If multiple tools are required, call the appropriate tools.",
//                     "8. Do not invent project information.",
//                     "",
//                     "After receiving tool results, provide a concise Markdown answer."
//                 ].join("\n")
//         },

//         {
//             role: "user" as const,

//             content: finalPrompt
//         }

//     ];


//     /**
//      * ==========================================
//      * MCP Execution Results
//      * ==========================================
//      */

//     const toolResults:
//         ToolExecutionResult[] = [];


//     /**
//      * ==========================================
//      * Orchestration Request
//      * ==========================================
//      */

//     const orchestrationRequest:
//         OrchestrationRequest = {

//         userMessage:
//             prompt

//     };


//     /**
//      * ==========================================
//      * MCP / LLM Tool Loop
//      * ==========================================
//      */

//     const MAX_TOOL_ITERATIONS = 5;


//     for (
//         let iteration = 0;
//         iteration < MAX_TOOL_ITERATIONS;
//         iteration++
//     ) {

//         console.log(
//             `========== TOOL LOOP ${iteration + 1} ==========`
//         );


//         /**
//          * ======================================
//          * Ask LLM
//          * ======================================
//          */

//         const response =
//             await provider.chatWithTools(
//                 messages,
//                 route.model,
//                 tools
//             );


//         console.log(
//             "========== LLM RESPONSE =========="
//         );

//         console.dir(
//             response,
//             {
//                 depth: 20
//             }
//         );


//         /**
//          * ======================================
//          * No Tool Calls
//          * ======================================
//          *
//          * This means the model has produced
//          * its final answer.
//          */

//         if (
//             !response.toolCalls ||
//             response.toolCalls.length === 0
//         ) {

//             console.log(
//                 "========== FINAL AI RESPONSE =========="
//             );

//             console.log(
//                 response.content
//             );

//             return {

//                 ...response,

//                 toolCalls: []

//             };

//         }


//         /**
//          * ======================================
//          * Add Assistant Tool Call Message
//          * ======================================
//          *
//          * IMPORTANT:
//          *
//          * Add this ONCE for the complete LLM
//          * response.
//          *
//          * Do NOT add it inside the tool loop.
//          */

//         messages.push({

//             role:
//                 "assistant",

//             content:
//                 response.content ?? "",

//             tool_calls:
//                 response.toolCalls

//         } as any);


//         /**
//          * ======================================
//          * Execute Every Tool Call
//          * ======================================
//          */

//         for (
//             const toolCall
//             of response.toolCalls
//         ) {

//             const toolName =
//                 toolCall.function.name;


//             const toolArguments =
//                 toolCall.function.arguments;


//             console.log(
//                 "========== MCP TOOL CALL =========="
//             );

//             console.log(
//                 "Tool:",
//                 toolName
//             );

//             console.log(
//                 "Arguments:"
//             );

//             console.dir(
//                 toolArguments,
//                 {
//                     depth: 20
//                 }
//             );


//             /**
//              * ==================================
//              * Execute MCP Tool
//              * ==================================
//              */

//             let toolResult;

//             try {

//                 toolResult =
//                     await mcpOrchestratorService.executeTool(
//                         toolName,
//                         toolArguments
//                     );

//             }

//             catch (error) {

//                 console.error(
//                     "MCP TOOL EXECUTION ERROR:",
//                     error
//                 );

//                 toolResult = {

//                     success:
//                         false,

//                     timeout:
//                         false,

//                     error:
//                         error instanceof Error
//                             ? error.message
//                             : String(error)

//                 };

//             }


//             console.log(
//                 "========== MCP TOOL RESULT =========="
//             );

//             console.dir(
//                 toolResult,
//                 {
//                     depth: 20
//                 }
//             );


//             /**
//              * ==================================
//              * Store Execution Result
//              * ==================================
//              */

//             const isToolFailure =
//                 typeof toolResult === "object" &&
//                 toolResult !== null &&
//                 "success" in toolResult &&
//                 (
//                     toolResult as {
//                         success?: unknown
//                     }
//                 ).success === false;


//             const executionResult:
//                 ToolExecutionResult = {

//                 toolName,

//                 serverName:
//                     "filesystem",

//                 status:
//                     isToolFailure
//                         ? "failed"
//                         : "success",

//                 data:
//                     toolResult

//             };


//             toolResults.push(
//                 executionResult
//             );


//             /**
//              * ==================================
//              * Send Tool Result Back To Ollama
//              * ==================================
//              */

//             messages.push({

//                 role:
//                     "tool",

//                 tool_call_id:
//                     toolCall.id,

//                 content:
//                     JSON.stringify(
//                         toolResult
//                     )

//             } as any);

//         }


//         /**
//          * ==========================================
//          * IMPORTANT
//          * ==========================================
//          *
//          * Do NOT add a new system prompt here.
//          *
//          * The native Ollama tool conversation should
//          * remain:
//          *
//          * user
//          * assistant + tool_calls
//          * tool
//          * assistant
//          *
//          * Adding a system message after the tool
//          * result can confuse local models.
//          */


//         console.log(
//             "========== TOOL RESULTS ADDED TO CONVERSATION =========="
//         );

//         console.dir(
//             toolResults,
//             {
//                 depth: 20
//             }
//         );

//     }


//     /**
//      * ==========================================
//      * Safety Limit
//      * ==========================================
//      */

//     throw new Error(
//         "Maximum MCP tool execution iterations reached."
//     );

// }

export async function chatWithMCPTools(

    prompt: string,

    model: string,

    browserContext: BrowserContext

) {

    /**
     * ==========================================
     * 1. Get MCP Tools
     * ==========================================
     */

    const tools =
        mcpOrchestratorService.getTools();


    console.log(
        "========== OLLAMA TOOL TEST =========="
    );

    console.log(
        "Prompt:",
        prompt
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
     * 2. Select Model
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
     * 3. Provider
     * ==========================================
     */

    const provider =
        ProviderFactory.create(
            AI_CONFIG.provider
        );


    /**
     * ==========================================
     * 4. Build Conversation
     * ==========================================
     *
     * IMPORTANT:
     *
     * Keep the native tool conversation clean:
     *
     * system
     * user
     * assistant + tool_calls
     * tool
     * assistant
     *
     * Do NOT inject MCP context as a new system
     * message between tool calls.
     */

    const messages = [

        {
            role: "system" as const,

            content: [
                "You are Zeba AI, a senior software engineering assistant.",

                "",

                "You have access to MCP developer tools.",

                "",

                "IMPORTANT TOOL RULES:",

                "1. Use MCP tools whenever the user's question requires information from the actual project.",

                "2. Do not describe tool calls as plain text.",

                "3. Do not write JSON representing a tool call in your answer.",

                "4. Invoke tools using the native tool calling mechanism.",

                "5. Wait for the tool result before answering the user.",

                "6. Use the actual tool result to answer the user.",

                "7. Do not invent project information.",

                "8. If a tool can answer the question, use the tool.",

                "9. After receiving the tool result, provide a concise Markdown answer."
            ].join("\n")
        },

        {
            role: "user" as const,

            content: prompt
        }

    ];


    /**
     * ==========================================
     * 5. Tool Execution Loop
     * ==========================================
     */

    const MAX_TOOL_ITERATIONS = 5;


    for (
        let iteration = 0;
        iteration < MAX_TOOL_ITERATIONS;
        iteration++
    ) {

        console.log(
            `========== TOOL LOOP ${iteration + 1} ==========`
        );


        /**
         * ======================================
         * Ask Ollama
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

        console.dir(
            response,
            {
                depth: 20
            }
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
                "========== FINAL AI RESPONSE =========="
            );

            console.log(
                response.content
            );

            return {

                ...response,

                toolCalls: []

            };

        }


        /**
         * ======================================
         * Add Assistant Tool Call Message
         * ======================================
         *
         * IMPORTANT:
         *
         * Add this ONCE for the complete response.
         */

        messages.push({

            role: "assistant",

            content:
                response.content ?? "",

            tool_calls:
                response.toolCalls

        } as any);


        /**
         * ======================================
         * Execute Tool Calls
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

            console.dir(
                toolArguments,
                {
                    depth: 20
                }
            );


            /**
             * ==================================
             * Execute MCP Tool
             * ==================================
             */

            let toolResult: unknown;


            try {

                toolResult =
                    await mcpOrchestratorService.executeTool(
                        toolName,
                        toolArguments
                    );

            }
            catch (error) {

                console.error(
                    "MCP TOOL EXECUTION ERROR:",
                    error
                );


                toolResult = {

                    success: false,

                    error:
                        error instanceof Error
                            ? error.message
                            : String(error)

                };

            }


            console.log(
                "========== MCP TOOL RESULT =========="
            );

            console.dir(
                toolResult,
                {
                    depth: 20
                }
            );


            /**
             * ==================================
             * Send Tool Result Back To Ollama
             * ==================================
             */

            messages.push({

                role: "tool",

                tool_call_id:
                    toolCall.id,

                content:
                    JSON.stringify(
                        toolResult
                    )

            } as any);

        }

        /**
         * IMPORTANT:
         *
         * Do NOT add:
         *
         * - AI context
         * - another system message
         * - tool-aware prompt
         *
         * here.
         *
         * The next Ollama request must see:
         *
         * user
         * assistant + tool_calls
         * tool
         *
         * Then Ollama generates the final answer.
         */

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