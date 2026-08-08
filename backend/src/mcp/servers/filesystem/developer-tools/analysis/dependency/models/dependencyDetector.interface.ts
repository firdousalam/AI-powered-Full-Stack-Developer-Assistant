import { DependencyDetectorResult }
    from "./dependencyDetectorResult.interface";

/**
 * Contract implemented by every dependency detector.
 */
export interface DependencyDetector<TResult> {

    /**
     * Detector name.
     */
    readonly name: string;

    /**
     * Execute dependency detection.
     */
    detect(
        workspacePath: string
    ): Promise<
        DependencyDetectorResult<TResult>
    >;

}