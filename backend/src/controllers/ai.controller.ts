import { Request, Response } from "express";

import ollamaService from "../services/ollama.service";

export async function chat(

    req: Request,

    res: Response

) {

    try {

        const {

            prompt,

            model

        } = req.body;

        const response = await ollamaService.chat(

            prompt,

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

            message: "AI request failed"

        });

    }

}

export async function generate(

    req: Request,

    res: Response

) {

    try {

        const {

            prompt,

            model

        } = req.body;

        const response = await ollamaService.chat(

            prompt,

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

            message: "AI request failed"

        });

    }

}