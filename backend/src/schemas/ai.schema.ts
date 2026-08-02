import { z } from "zod";

export const chatSchema = z.object({

    prompt: z
        .string()
        .min(1, "Prompt is required"),

    model: z
        .string()
        .optional(),

    browserContext: z.object({

        url: z.string(),

        title: z.string(),

        hostname: z.string(),

        protocol: z.string(),

        language: z.string(),

        tabId: z.number(),

        windowId: z.number(),

        timestamp: z.string(),

        selectedText: z.string().optional()

    }).optional()

});