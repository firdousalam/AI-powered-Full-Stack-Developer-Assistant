// src/services/ollama.service.ts

import axios from "axios";


class OllamaService {

    private readonly baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

    async generate(
        prompt: string,
        model: string
    ) {

        const response = await axios.post(

            `${this.baseUrl}/api/generate`,

            {
                model,
                prompt,
                stream: false
            }

        );

        return response.data;

    }

    async chat(

        prompt: string,

        model: string

    ) {

        const response = await axios.post(

            `${this.baseUrl}/api/chat`,

            {

                model,

                messages: [

                    {

                        role: "user",

                        content: prompt

                    }

                ],

                stream: false

            }

        );

        return response.data;

    }

    async streamChat(

        prompt: string,

        model: string

    ) {

        const response = await axios({

            method: "POST",

            url: `${this.baseUrl}/api/chat`,

            responseType: "stream",

            data: {

                model,

                stream: true,

                messages: [

                    {

                        role: "user",

                        content: prompt

                    }

                ]

            }

        });

        return response.data;

    }
}



export default new OllamaService();

