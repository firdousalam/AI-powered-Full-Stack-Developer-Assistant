/**
 * Standard response returned by every detector.
 */
export interface DetectorResult<T> {

    /**
     * Detector name.
     */
    detector: string;

    /**
     * Indicates whether detection succeeded.
     */
    success: boolean;

    /**
     * Detector output.
     */
    data: T;

    /**
     * Non-fatal issues.
     */
    warnings: string[];

}