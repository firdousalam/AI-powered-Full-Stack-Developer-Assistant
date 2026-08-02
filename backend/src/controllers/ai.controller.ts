import { Request, Response } from "express";

import { chatWithAI, streamChat } from "../services/ai.service";

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
                await chatWithAI(
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


        const {
            prompt,

            model,
            browserContext
        } = req.body;

        try {

            res.setHeader(
                "Content-Type",
                "text/plain"
            );
            await streamChat(
                prompt,
                model,
                browserContext,

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