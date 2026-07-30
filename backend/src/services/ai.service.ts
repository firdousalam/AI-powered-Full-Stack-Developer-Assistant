
import aiRouter from "./ai-router.service";
import ollamaService from "./ollama.service";

class AIService {

    async chat(prompt: string) {

        const route = aiRouter.selectModel(prompt);

        console.log("Selected Model:", route.model);
        console.log("Reason:", route.reason);

        console.log("======================");
        console.log("Prompt :", prompt);
        console.log("Model  :", route.model);
        console.log("Reason :", route.reason);
        console.log("======================");


        return ollamaService.chat(

            prompt,

            route.model

        );

    }

    async streamChat(

        prompt: string

    ) {

        const route = aiRouter.selectModel(prompt);

        console.log("Selected Model for stream:", route.model);

        return ollamaService.streamChat(

            prompt,

            route.model

        );

    }

}

export default new AIService();