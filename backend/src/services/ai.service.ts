import promptService from "./prompt.service";

import aiRouter from "./ai-router.service";

import { AI_CONFIG } from "../config/ai.config";

import {

    ProviderFactory

} from "../providers/provider.factory";

import type {

    BrowserContext

} from "../types/browserContext.types";

class AIService {

    /**
     * ======================================
     * Standard Chat
     * ======================================
     */
    async chat(

        prompt: string,

        browserContext: BrowserContext,

        model?: string

    ) {

        console.log("========== AI SERVICE ==========");

        console.log("Prompt:", prompt);

        console.log("Browser Context:");

        console.log(browserContext);

        /**
         * Build final AI prompt
         */
        const finalPrompt =

            promptService.buildPrompt(

                prompt,

                browserContext

            );

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

        try {

            const provider =

                ProviderFactory.create(

                    AI_CONFIG.provider

                );

            return await provider.chat(

                finalPrompt,

                route.model

            );

        }

        catch (error) {

            console.error(

                "Primary Provider Failed",

                error

            );

            if (

                AI_CONFIG.enableFallback

            ) {

                console.log(

                    "Switching to fallback provider..."

                );

                const fallback =

                    ProviderFactory.create(

                        AI_CONFIG.fallbackProvider

                    );

                return await fallback.chat(

                    finalPrompt,

                    route.model

                );

            }

            throw error;

        }

    }

    /**
     * ======================================
     * Streaming Chat
     * ======================================
     */
    async streamChat(

        prompt: string,

        browserContext: BrowserContext,

        model: string,

        onToken: (token: string) => void

    ) {

        const finalPrompt =

            promptService.buildPrompt(

                prompt,

                browserContext

            );

        const route =

            aiRouter.selectModel(

                model

            );

        const provider =

            ProviderFactory.create(

                AI_CONFIG.provider

            );

        return provider.streamChat(

            finalPrompt,

            route.model,

            onToken

        );

    }

}

export default new AIService();