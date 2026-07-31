import { Request, Response } from "express";
import aiService from "../services/ai.service";

/**
 * =====================================
 * Chat Endpoint
 * POST /api/v1/ai/chat
 * =====================================
 */
export async function chat(
    req: Request,
    res: Response
) {
    try {

        const {
            sessionId,
            prompt
        } = req.body;

        console.log("====================================");
        console.log("AI Chat Request");
        console.log("Session :", sessionId);
        console.log("Prompt  :", prompt);
        console.log("====================================");

        const result = await aiService.chat(
            prompt
        );

        res.json({
            success: true,
            response: result
        });

    } catch (error) {

        console.error("Chat Error:", error);

        res.status(500).json({
            success: false,
            message: "AI request failed"
        });

    }
}

/**
 * =====================================
 * Generate Endpoint
 * POST /api/v1/ai/generate
 * =====================================
 */
export async function generate(
    req: Request,
    res: Response
) {

    try {

        const {
            prompt,
            model
        } = req.body;

        console.log("====================================");
        console.log("AI Generate Request");
        console.log("Model  :", model);
        console.log("Prompt :", prompt);
        console.log("====================================");

        const response = await aiService.generate(
            prompt
        );

        res.json({
            success: true,
            response
        });

    } catch (error) {

        console.error("Generate Error:", error);

        res.status(500).json({
            success: false,
            message: "Generation failed"
        });

    }

}

/**
 * =====================================
 * Streaming Endpoint (SSE)
 * POST /api/v1/ai/chat/stream
 * =====================================
 */
export async function streamChat(
    req: Request,
    res: Response
) {
    try {

        const { prompt } = req.body;

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.flushHeaders();

        await aiService.streamChat(

            prompt,

            (token: string) => {

                res.write(token);

            }

        );

        res.end();

    } catch (error) {

        console.error(error);

        if (!res.headersSent) {

            res.status(500).json({

                success: false,

                message: "Streaming Failed"

            });

        } else {

            res.end();

        }

    }
}