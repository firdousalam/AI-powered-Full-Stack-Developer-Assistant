import { ProviderFactory } from "../providers/ProviderFactory";

class AIService {

    async chat(

        prompt: string,

        model: string

    ) {

        const provider =

            ProviderFactory.create(model);

        return await provider.chat(prompt);

    }

}

export default new AIService();