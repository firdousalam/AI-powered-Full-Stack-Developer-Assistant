export interface CodeStructureDetectorResult<T> {

    detector: string;

    success: boolean;

    data: T;

    warnings: string[];

}