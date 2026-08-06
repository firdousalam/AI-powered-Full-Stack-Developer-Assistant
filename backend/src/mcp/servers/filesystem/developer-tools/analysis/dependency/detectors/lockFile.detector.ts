import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";

import {
    LockFileInfo
} from "../models";

export class LockFileDetector
    extends DependencyDetectorBase<LockFileInfo> {

    /**
     * Detector name.
     */
    readonly name = "LockFileDetector";

    /**
     * Default result.
     */
    protected emptyResult(): LockFileInfo {

        return {

            exists: false,

            file: ""

        };

    }

    /**
     * Detect the project's lock file.
     */
    protected async detectInternal(
        _packageJson: Record<string, any>,
        workspacePath: string
    ): Promise<LockFileInfo> {

        const result =
            await this.findLockFile(
                workspacePath
            );

        return {

            exists:
                result.lockFile.length > 0,

            file:
                result.lockFile

        };

    }

}