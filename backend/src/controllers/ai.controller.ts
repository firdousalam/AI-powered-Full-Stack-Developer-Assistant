import { Request, Response } from "express";

import { chatWithAI, streamChat, chatWithMCPTools, inspectMCPTools } from "../services/ai.service";

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

            // second parameter must be browserContext
            const response =
                await chatWithAI(
                    prompt,
                    '',
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

    async inspectMCPTools(
        req: Request,
        res: Response
    ) {

        try {

            const tools =
                await inspectMCPTools();

            res.json({

                success: true,

                count: tools.length,

                tools

            });

        }
        catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "MCP tool discovery failed"

            });

        }

    }

    async chatWithTools(
        req: Request,
        res: Response
    ) {

        try {

            const {
                prompt,
                model,
                browserContext
            } = req.body;

            const response =
                await chatWithMCPTools(
                    prompt,
                    model,
                    browserContext
                );

            res.json({

                success: true,

                response

            });

        }
        catch (error) {

            console.error(
                "MCP Tool Chat Error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "MCP tool chat failed"

            });

        }

    }

}

export default new AIController();