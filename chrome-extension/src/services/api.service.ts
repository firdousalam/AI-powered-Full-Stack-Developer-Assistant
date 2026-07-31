const API_URL = "http://localhost:3000/api/v1/ai";

/**
 * ==========================================
 * Normal Chat API
 * ==========================================
 */
export async function chatWithAI(
    prompt: string,
    model = "llama3.2:3b"
) {
    try {

        const response = await fetch(
            `${API_URL}/chat`,
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

        if (!response.ok) {
            throw new Error("Backend request failed");
        }

        return await response.json();

    } catch (error) {

        console.error("Chat API Error:", error);

        return {
            success: false,
            response: "Unable to connect to backend."
        };

    }
}

/**
 * ==========================================
 * Streaming Chat API
 * ==========================================
 */
export async function streamChat(
    prompt: string,
    model: string,
    onToken: (token: string) => void
) {

    const response = await fetch(
        `${API_URL}/chat/stream`,
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

    if (!response.ok) {
        throw new Error("Streaming request failed");
    }

    if (!response.body) {
        throw new Error("ReadableStream missing");
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    while (true) {

        const { done, value } = await reader.read();

        if (done) {
            break;
        }

        const token = decoder.decode(value, {
            stream: true
        });

        console.log("TOKEN =>", token);

        onToken(token);

    }

}