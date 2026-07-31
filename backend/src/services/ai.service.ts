

/*import memoryService from "./memory.service";
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

*/

import aiRouter from "./ai-router.service";
import promptService from "./prompt.service";

import { AI_CONFIG } from "../config/ai.config";

import {

    ProviderFactory

} from "../providers/provider.factory";
import providerStrategy from "../providers/provider.strategy";
// const providerType =

//     providerStrategy.selectProvider(

//         prompt

//     );

// const provider =

//     ProviderFactory.create(

//         providerType

//     );

class AIService {

    async chat(

        prompt: string

    ) {

        const formattedPrompt =

            promptService.buildPrompt(prompt);

        const route =

            aiRouter.selectModel(prompt);

        try {

            const provider =

                ProviderFactory.create(

                    AI_CONFIG.provider

                );

            return await provider.chat(

                formattedPrompt,

                route.model

            );

        }

        catch (error) {

            console.error(

                "Primary provider failed:",

                error

            );

            if (

                AI_CONFIG.enableFallback

            ) {

                console.log(

                    "Switching to fallback provider..."

                );

                const fallbackProvider =

                    ProviderFactory.create(

                        AI_CONFIG.fallbackProvider

                    );

                return fallbackProvider.chat(

                    formattedPrompt,

                    route.model

                );

            }

            throw error;

        }

    }

    async generate(

        prompt: string

    ) {

        const formattedPrompt =

            promptService.buildPrompt(prompt);

        const route =

            aiRouter.selectModel(prompt);

        try {

            const provider =

                ProviderFactory.create(

                    AI_CONFIG.provider

                );

            return await provider.chat(

                formattedPrompt,

                route.model

            );

        }

        catch (error) {

            console.error(

                "Primary provider failed:",

                error

            );

            if (

                AI_CONFIG.enableFallback

            ) {

                console.log(

                    "Switching to fallback provider..."

                );

                const fallbackProvider =

                    ProviderFactory.create(

                        AI_CONFIG.fallbackProvider

                    );

                return fallbackProvider.chat(

                    formattedPrompt,

                    route.model

                );

            }

            throw error;

        }

    }

    async streamChat(

        prompt: string,

        onToken: (token: string) => void

    ) {

        const formattedPrompt =

            promptService.buildPrompt(prompt);
        console.log("formattedPrompt", formattedPrompt)
        const route =

            aiRouter.selectModel(prompt);
        console.log("route", route)
        const provider =

            ProviderFactory.create(

                AI_CONFIG.provider

            );
        console.log("provider", provider)
        return provider.streamChat(

            formattedPrompt,

            route.model,

            onToken

        );

    }


}

export default new AIService();