import { z } from "zod";

export const chatSchema = z.object({

    prompt: z
        .string()
        .min(1, "Prompt is required"),

    model: z
        .string()
        .optional(),

    browserContext: z.object({

        metadata: z.object({

            url: z.string(),

            title: z.string(),

            hostname: z.string(),

            protocol: z.string(),

            language: z.string(),

            timestamp: z.string()

        }),

        article: z.string(),

        markdown: z.string(),

        codeBlocks: z.array(

            z.object({

                language: z.string(),

                code: z.string()

            })

        ),

        headings: z.array(

            z.object({

                level: z.number(),

                text: z.string()

            })

        ),

        links: z.array(

            z.object({

                text: z.string(),

                href: z.string()

            })

        ),

        tables: z.array(

            z.object({

                headers: z.array(z.string()),

                rows: z.array(

                    z.array(z.string())

                )

            })

        ),

        forms: z.array(

            z.object({

                action: z.string(),

                method: z.string(),

                id: z.string(),

                name: z.string(),

                fields: z.array(

                    z.object({

                        name: z.string(),

                        type: z.string(),

                        placeholder: z.string(),

                        label: z.string(),

                        required: z.boolean(),

                        value: z.string()

                    })

                )

            })

        )

    }).optional()

});