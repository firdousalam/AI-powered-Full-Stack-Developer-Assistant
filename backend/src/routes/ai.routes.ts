
import { Router } from "express";

import { validate } from "../middlewares/validate.middleware";

import { chatSchema } from "../schemas/ai.schema";

import {

    chat,

    generate,

    streamChat

} from "../controllers/ai.controller";

const router = Router();

router.post(

    "/chat",

    validate(chatSchema),

    chat

);

router.post(

    "/generate",


    generate

);

router.post(

    "/chat/stream",

    validate(chatSchema),

    streamChat

);

export default router;


