class AIService {

    async chat(prompt: string, model: string) {

        return {
            success: true,
            response: "Hello from AI Service",
            prompt,
            model
        };

    }

}

export default new AIService();