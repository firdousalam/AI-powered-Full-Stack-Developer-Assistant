

import memoryService from "./memory.service";
import promptService from "./prompt.service";
import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";

class AIService {

    async chat(

        sessionId: string,

        prompt: string

    ) {

        // Load previous conversation

        // const history =

        //     memoryService.getMessages(

        //         sessionId

        //     );

        const history =

            memoryService.getRecentMessages(

                sessionId

            );

        console.log(

            "Conversation Messages:",

            history.length

        );

        // Save user message

        memoryService.addMessage(

            sessionId,

            "user",

            prompt

        );

        // Build formatted prompt

        const formattedPrompt =

            promptService.buildPrompt(

                prompt

            );

        // Select model

        const route =

            aiRouter.selectModel(

                prompt

            );

        console.log(

            "Selected Model:",

            route.model

        );

        // Generate response

        const response =

            await ollamaService.chat(

                formattedPrompt,

                route.model

            );

        // Save assistant response

        memoryService.addMessage(

            sessionId,

            "assistant",

            response

        );

        return {

            success: true,

            response

        };

    }

    async streamChat(
        prompt: string

    ) {
        // Load previous conversation

        // const history =

        //     memoryService.getMessages(

        //         sessionId

        //     );

        // console.log(

        //     "Conversation Messages:",

        //     history.length

        // );

        // // Save user message

        // memoryService.addMessage(

        //     sessionId,

        //     "user",

        //     prompt

        // );

        // Build formatted prompt

        const formattedPrompt =

            promptService.buildPrompt(

                prompt

            );

        // Select model

        const route =

            aiRouter.selectModel(

                prompt

            );

        console.log(

            "Selected Model:",

            route.model

        );

        return ollamaService.streamChat(

            formattedPrompt,

            route.model

        );
        // Save assistant response

        // memoryService.addMessage(

        //     sessionId,

        //     "assistant",

        //     response

        // );


    }

}

export default new AIService();