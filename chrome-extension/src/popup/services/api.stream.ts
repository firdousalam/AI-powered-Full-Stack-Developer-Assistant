
export async function streamChat(

    prompt: string,

    model: string,
    onToken: (token: string) => void

) {

    const response = await fetch(

        "http://localhost:3000/api/v1/ai/chat/stream",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                prompt,

                model

            })

        }

    );

    if (!response.ok)

        throw new Error("Streaming Failed");

    if (!response.body)

        throw new Error("ReadableStream Missing");

    const reader = response.body.getReader();

    const decoder = new TextDecoder();


    let buffer = "";

    while (true) {

        const { done, value } = await reader.read();

        if (done) {

            break;

        }

        buffer += decoder.decode(value, {

            stream: true

        });

        const lines = buffer.split("\n");

        buffer = lines.pop() || "";

        for (const line of lines) {

            if (!line.trim()) {

                continue;

            }

            try {

                const json = JSON.parse(line);

                if (json.message?.content) {

                    onToken(json.message.content);

                }

            } catch {

                // incomplete JSON, wait for next chunk
            }

        }

    }

}