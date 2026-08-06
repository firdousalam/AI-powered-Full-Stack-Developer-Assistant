import { DetectorResult } from "../analysis/models/detectorResult.interface";

export interface ProjectDetector<T> {

    readonly name: string;

    detect(
        workspacePath: string
    ): Promise<DetectorResult<T>>;

}