
import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";
import promptService from "./prompt.service";

class AIService {

    async chat(userPrompt: string) {

        // Build professional prompt
        const formattedPrompt =
            promptService.buildPrompt(userPrompt);

        // Select best model
        const route =
            aiRouter.selectModel(userPrompt);

        console.log("=================================");
        console.log("Original Prompt:");
        console.log(userPrompt);

        console.log("---------------------------------");

        console.log("Formatted Prompt:");
        console.log(formattedPrompt);

        console.log("---------------------------------");

        console.log("Selected Model:");
        console.log(route.model);

        console.log("=================================");

        return await ollamaService.chat(

            formattedPrompt,

            route.model

        );

    }

    async streamChat(

        prompt: string

    ) {
        const formattedPrompt =
            promptService.buildPrompt(prompt);

        const route = aiRouter.selectModel(prompt);

        console.log("Selected Model for stream:", route.model);


        console.log("Formatted Prompt:");
        console.log(formattedPrompt);

        console.log("---------------------------------");

        console.log("Selected Model:");
        console.log(route.model);

        console.log("=================================");
        return ollamaService.streamChat(

            formattedPrompt,

            route.model

        );

    }

}

export default new AIService();