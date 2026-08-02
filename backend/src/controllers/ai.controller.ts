import { Request, Response } from "express";

import aiService from "../services/ai.service";

class AIController {

    async chat(
        req: Request,
        res: Response
    ) {

        try {

            const {

                prompt,

                browserContext,

                model

            } = req.body;

            const response =
                await aiService.chat(
                    prompt,
                    browserContext,
                    model
                );

            res.json({

                success: true,

                response

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message: "Chat failed"

            });

        }

    }

    async streamChat(
        req: Request,
        res: Response
    ) {

        try {

            const {

                prompt,

                browserContext,

                model

            } = req.body;

            res.setHeader(
                "Content-Type",
                "text/plain"
            );

            await aiService.streamChat(

                prompt,

                browserContext,

                model,

                token => {

                    res.write(token);

                }

            );

            res.end();

        }

        catch (error) {

            console.error(error);

            res.status(500).end();

        }

    }

}

export default new AIController();