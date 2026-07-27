import { Request, Response } from "express";
import AIService from "../services/ai.service";

export const chat = async (

    req: Request,

    res: Response

) => {

    const {

        prompt,

        model

    } = req.body;

    console.log(prompt);

    console.log(model);

    const result = await AIService.chat(
        prompt,
        model
    );

    res.json(result);

};


