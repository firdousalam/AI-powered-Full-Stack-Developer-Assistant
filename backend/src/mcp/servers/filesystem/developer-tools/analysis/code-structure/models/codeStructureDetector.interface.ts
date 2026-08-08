import {
    CodeStructureDetectorResult
} from "./codeStructureDetectorResult.interface";


export interface CodeStructureDetector<T> {

    readonly name: string;

    detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<T>
    >;

}