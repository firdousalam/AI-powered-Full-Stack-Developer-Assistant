import { Router } from "express";

import { chat } from "../controllers/ai.controller";

import { validate } from "../middlewares/validate.middleware";

import { chatSchema } from "../schemas/ai.schema";

const router = Router();

router.post(

    "/chat",

    validate(chatSchema),

    chat

);

export default router;