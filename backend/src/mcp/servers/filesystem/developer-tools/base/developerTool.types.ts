export interface DeveloperToolContext {

    workspacePath: string;
    arguments: any

}

export interface ValidationResult {

    valid: boolean;

    errors: string[];

    warnings: string[];

}

export interface DeveloperToolResponse<T> {

    success: boolean;

    tool: string;

    executionTime: number;

    data?: T;

    warnings: string[];

    errors: string[];

}