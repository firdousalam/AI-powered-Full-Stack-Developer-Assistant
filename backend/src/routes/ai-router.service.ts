

import { MODELS } from "../config/model.config";
import { AIRouteResult } from "../types/ai.types";

class AIRouterService {

    private codingKeywords = [

        "javascript",
        "typescript",
        "react",
        "node",
        "express",
        "docker",
        "kubernetes",
        "mongodb",
        "sql",
        "css",
        "html",
        "api"

    ];

    private reasoningKeywords = [

        "architecture",
        "design",
        "microservices",
        "distributed",
        "system design",
        "high availability",
        "load balancing",
        "scalability"

    ];

    public selectModel(

        prompt: string

    ): AIRouteResult {

        const input = prompt.toLowerCase();

        if (

            this.codingKeywords.some(

                keyword => input.includes(keyword)

            )

        ) {

            return {

                model: MODELS.CODING,

                reason: "Coding Request"

            };

        }

        if (

            this.reasoningKeywords.some(

                keyword => input.includes(keyword)

            )

        ) {

            return {

                model: MODELS.REASONING,

                reason: "Reasoning Request"

            };

        }

        return {

            model: MODELS.CHAT,

            reason: "General Chat"

        };

    }

}

export default new AIRouterService();