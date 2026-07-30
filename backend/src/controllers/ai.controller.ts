import { Request, Response } from "express";

import ollamaService from "../services/ollama.service";
import aiService from "../services/ai.service";



export async function chat(

    req: Request,

    res: Response

) {

    try {

        const {

            prompt,

            model

        } = req.body;

        const result = await aiService.chat(

            req.body.prompt

        );
        console.log("======================");
        console.log("Prompt :", prompt);
        console.log("Model  :", model);
        console.log("======================");

        res.json(result);

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


export async function streamChat(

    req: Request,

    res: Response

) {

    try {

        res.setHeader(

            "Content-Type",

            "text/event-stream"

        );

        res.setHeader(

            "Cache-Control",

            "no-cache"

        );

        res.setHeader(

            "Connection",

            "keep-alive"

        );
        console.log("getting data from stream")
        const stream = await aiService.streamChat(

            req.body.prompt

        );

        stream.pipe(res);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Streaming Failed"

        });

    }

}