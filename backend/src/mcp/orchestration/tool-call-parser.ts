export interface ParsedToolCall {

    id: string;

    function: {

        name: string;

        arguments: Record<string, any>;

    };

}

export function parseToolCalls(
    content: string,
    nativeToolCalls: any[]
): ParsedToolCall[] {

    /*
     * Native Ollama tool calls
     */

    if (
        nativeToolCalls &&
        nativeToolCalls.length > 0
    ) {

        return nativeToolCalls;
    }

    /*
     * No content
     */

    if (!content) {

        return [];
    }

    /*
     * Extract JSON blocks
     */

    const matches =
        content.match(
            /```json\s*([\s\S]*?)\s*```/gi
        );

    if (!matches) {

        return [];
    }

    const calls: ParsedToolCall[] = [];

    for (
        const block of matches
    ) {

        try {

            const jsonText =
                block
                    .replace(
                        /```json/i,
                        ""
                    )
                    .replace(
                        /```/g,
                        ""
                    )
                    .trim();

            const parsed =
                JSON.parse(jsonText);

            if (
                parsed.name &&
                parsed.parameters
            ) {

                calls.push({

                    id:
                        `fallback-${Date.now()}-${calls.length}`,

                    function: {

                        name:
                            parsed.name,

                        arguments:
                            parsed.parameters

                    }

                });

            }

        }
        catch (error) {

            console.log(
                "Unable to parse fallback tool call:",
                error
            );

        }
    }

    return calls;
}