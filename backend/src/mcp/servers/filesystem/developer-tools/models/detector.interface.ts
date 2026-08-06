export interface ProjectDetector<T> {
    detect(workspacePath: string): Promise<T>;
    readonly name: string;
}