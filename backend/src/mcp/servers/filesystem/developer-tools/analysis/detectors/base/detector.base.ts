import { DetectorResult } from "../../models";

export abstract class DetectorBase<TResult> {

    /**
     * Detector name.
     */
    abstract readonly name: string;

    /**
     * Execute detector.
     */
    abstract detect(
        workspacePath: string
    ): Promise<DetectorResult<TResult>>;

    /**
     * Success helper.
     */
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

    /**
     * Failure helper.
     */
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