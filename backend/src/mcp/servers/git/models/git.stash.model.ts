export interface GitStashOperationResult {
    operation:
    | 'apply'
    | 'pop'
    | 'drop'
    | 'clear';

    reference?: string;

    success: boolean;

    message: string;
}