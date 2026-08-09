export interface LLMToolDefinition {

    type: "function";

    function: {

        name: string;

        description: string;

        parameters:
        Record<string, unknown>;

    };

}