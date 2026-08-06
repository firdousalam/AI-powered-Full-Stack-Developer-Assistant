/**
 * Standard detector response.
 */
export interface DependencyDetectorResult<T> {

    /**
     * Detector name.
     */
    detector: string;

    /**
     * Whether detection succeeded.
     */
    success: boolean;

    /**
     * Detector output.
     */
    data: T;

    /**
     * Non-fatal warnings.
     */
    warnings: string[];

}