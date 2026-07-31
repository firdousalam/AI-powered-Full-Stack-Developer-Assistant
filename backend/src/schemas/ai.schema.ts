// import { z } from "zod";

// export const chatSchema = z.object({

//     prompt: z.string().min(1),

//     model: z.string().min(1)

// });


// export const chatSchema = z.object({

//     prompt: z

//         .string()

//         .min(1, "Prompt is required"),

//     model: z

//         .string()

//         .min(1, "Model is required")

// });
import { z } from "zod";

export const chatSchema =

    z.object({

        prompt:

            z.string()

                .min(1)

    });