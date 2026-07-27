export async function chatWithAI(
    prompt: string,
    model: string
) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/v1/ai/chat",
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

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("Backend Error:", error);

        return {
            success: false,
            response: "Backend unavailable"
        };
    }
}