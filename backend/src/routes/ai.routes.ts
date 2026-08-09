import { Router } from "express";

import { validate } from "../middlewares/validate.middleware";
import { chatSchema } from "../schemas/ai.schema";

import AIController from "../controllers/ai.controller";

const router = Router();

router.post(
    "/chat",
    validate(chatSchema),
    AIController.chat
);

router.post(
    "/chat/stream",
    validate(chatSchema),
    AIController.streamChat
);

router.get(
    "/mcp/tools",
    AIController.inspectMCPTools.bind(
        AIController
    )
);

router.post(
    "/mcp/chat-with-tools",
    AIController.chatWithTools.bind(
        AIController
    )
);
export default router;