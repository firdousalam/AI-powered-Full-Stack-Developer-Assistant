import { AIProviderName } from "./provider.types";

class ProviderHealth {

    private health: Record<AIProviderName, boolean> = {

        ollama: true,

        openai: true,

        gemini: true,

        claude: true

    };

    isHealthy(

        provider: AIProviderName

    ): boolean {

        return this.health[provider];

    }

    setHealth(

        provider: AIProviderName,

        status: boolean

    ): void {

        this.health[provider] = status;

    }

}

export default new ProviderHealth();