import { Request, Response } from "express";

export const chat = (
    req: Request,
    res: Response
) => {

    console.log(req.body);
    const { prompt } = req.body;

    res.json({

        success: true,

        response: `Mock AI Response for: ${prompt}`

    });

};