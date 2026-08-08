import { DeveloperToolBase } from "./base/developerTool.base";
import { DeveloperToolContext } from "./base/developerTool.types";

export class DeveloperToolRegistry {

    private readonly tools = new Map<
        string,
        DeveloperToolBase<DeveloperToolContext, unknown>
    >();

    register(
        tool: DeveloperToolBase<
            DeveloperToolContext,
            unknown
        >
    ): void {

        if (this.tools.has(tool.name)) {

            throw new Error(
                `Developer tool '${tool.name}' is already registered.`
            );

        }

        this.tools.set(
            tool.name,
            tool
        );

    }

    unregister(
        toolName: string
    ): boolean {

        return this.tools.delete(toolName);

    }

    get(
        toolName: string
    ): DeveloperToolBase<
        DeveloperToolContext,
        unknown
    > | undefined {

        return this.tools.get(toolName);

    }

    has(
        toolName: string
    ): boolean {

        return this.tools.has(toolName);

    }

    getAll(): DeveloperToolBase<
        DeveloperToolContext,
        unknown
    >[] {

        return [...this.tools.values()];

    }

    clear(): void {

        this.tools.clear();

    }

}