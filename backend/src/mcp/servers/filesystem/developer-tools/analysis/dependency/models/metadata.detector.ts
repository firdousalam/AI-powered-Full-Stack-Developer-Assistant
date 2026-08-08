import {
    DependencyDetectorBase
} from "../base/dependencyDetector.base";
import { DependencyProjectMetadata } from "./dependencyProjectMetadata.interface";



export class MetadataDetector
    extends DependencyDetectorBase<DependencyProjectMetadata> {

    /**
     * Detector name.
     */
    readonly name = "MetadataDetector";

    /**
     * Default value when package.json
     * cannot be read.
     */
    protected emptyResult(): DependencyProjectMetadata {

        return {

            project: "",

            version: ""

        };

    }

    /**
     * Extract project metadata from package.json.
     */
    protected async detectInternal(
        packageJson: Record<string, any>,
        _workspacePath: string
    ): Promise<DependencyProjectMetadata> {

        return {

            project:
                packageJson.name ?? "",

            version:
                packageJson.version ?? ""

        };

    }

}