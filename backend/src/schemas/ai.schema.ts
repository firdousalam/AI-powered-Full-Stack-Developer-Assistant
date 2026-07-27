// import { z } from "zod";

// export const chatSchema = z.object({

//     prompt: z.string().min(1),

//     model: z.string().min(1)

// });

import { z } from "zod";

// export const chatSchema = z.object({

//     prompt: z

//         .string()

//         .min(1, "Prompt is required"),

//     model: z

//         .string()

//         .min(1, "Model is required")

// });

export const chatSchema = z.object({

    prompt: z.string().min(1, "Prompt is required"),

    model: z.string().min(1, "Model is required"),

    temperature: z.number().optional(),

    maxTokens: z.number().optional()

});