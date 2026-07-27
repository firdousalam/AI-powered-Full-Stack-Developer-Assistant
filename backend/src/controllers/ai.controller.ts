import { Request, Response } from "express";

export const chat = (

    req: Request,

    res: Response

) => {

    const {

        prompt,

        model

    } = req.body;

    console.log(prompt);

    console.log(model);

    res.json({

        success: true,

        response: "Hello from DevPilot Backend"

    });

};