import { DeveloperToolValidator } from "./developerTool.validator";

import {
    DeveloperToolContext,
    DeveloperToolResponse
} from "./developerTool.types";

export abstract class DeveloperToolBase<
    TContext extends DeveloperToolContext,
    TResult
> {

    /**
     * Tool metadata
     */
    abstract readonly name: string;

    abstract readonly description: string;

    /**
     * Shared validator
     */
    protected readonly validator =
        new DeveloperToolValidator();

    /**
     * Hook executed before the tool runs.
     * Can later be used for logging,
     * authorization, metrics, etc.
     */
    protected async beforeExecute(
        _context: TContext
    ): Promise<void> {
        // no-op
    }

    /**
     * Actual tool implementation.
     */
    protected abstract executeInternal(
        context: TContext
    ): Promise<TResult>;

    /**
     * Hook executed after successful execution.
     */
    protected async afterExecute(
        _context: TContext,
        _result: TResult
    ): Promise<void> {
        // no-op
    }

    /**
     * Hook executed when execution fails.
     */
    protected async onError(
        _context: TContext,
        _error: unknown
    ): Promise<void> {
        // no-op
    }

    /**
     * Standard execution pipeline.
     */
    async execute(
        context: TContext
    ): Promise<DeveloperToolResponse<TResult>> {

        const start = performance.now();

        try {

            const validation =
                await this.validator.validate(context);

            if (!validation.valid) {

                return {

                    success: false,

                    tool: this.name,

                    executionTime:
                        performance.now() - start,

                    warnings: validation.warnings,

                    errors: validation.errors

                };

            }

            await this.beforeExecute(context);

            const result =
                await this.executeInternal(context);

            await this.afterExecute(
                context,
                result
            );

            return {

                success: true,

                tool: this.name,

                executionTime:
                    performance.now() - start,

                data: result,

                warnings: validation.warnings,

                errors: []

            };

        } catch (error) {

            await this.onError(
                context,
                error
            );

            return {

                success: false,

                tool: this.name,

                executionTime:
                    performance.now() - start,

                warnings: [],

                errors: [
                    error instanceof Error
                        ? error.message
                        : String(error)
                ]

            };

        }

    }

}