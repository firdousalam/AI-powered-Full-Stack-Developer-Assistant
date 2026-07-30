import { MODELS } from "../config/model.config";
import { AIRouteResult } from "../types/ai.types";

class AIRouterService {

    public selectModel(prompt: string): AIRouteResult {

        return {

            model: MODELS.CHAT,

            reason: "Default Model"

        };

    }

}

export default new AIRouterService();