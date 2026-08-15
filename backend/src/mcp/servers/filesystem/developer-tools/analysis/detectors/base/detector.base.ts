import {
    DetectorResult,
    ProjectDetector
} from "../../models";

export abstract class DetectorBase<TResult>
    implements ProjectDetector<TResult> {

    abstract readonly name: string;

    abstract detect(
        workspacePath: string
    ): Promise<DetectorResult<TResult>>;

    protected success(
        data: TResult,
        warnings: string[] = []
    ): DetectorResult<TResult> {

        return {
            detector: this.name,
            success: true,
            data,
            warnings
        };

    }

    protected failure(
        warnings: string[]
    ): DetectorResult<TResult> {

        return {
            detector: this.name,
            success: false,
            data: {} as TResult,
            warnings
        };

    }

}