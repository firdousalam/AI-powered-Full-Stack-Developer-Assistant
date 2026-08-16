export class ToolTimeoutError extends Error {

    public readonly timeoutMs: number;

    constructor(
        timeoutMs: number,
    ) {

        super(
            `Tool execution timed out after ${timeoutMs}ms.`
        );

        this.name =
            "ToolTimeoutError";

        this.timeoutMs =
            timeoutMs;

    }

}