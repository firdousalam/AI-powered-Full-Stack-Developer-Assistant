import { CodeStructureDetectorResult } from "./codeStructureDetectorResult.interface";
import { StructureArchitecture } from "./StructureArchitecture";
import { StructureController } from "./structureController.interface";
import { StructureDirectory } from "./structureDirectory.interface";
import { StructureEntryPoint } from "./structureEntryPoint.interface";
import { StructureFile } from "./structureFile.interface";
import { StructureModel } from "./structureModel.interface";
import { StructureModule } from "./StructureModule.interface";
import { StructureRoute } from "./structureRoute.interface";
import { StructureService } from "./structureService.interface";

export interface CodeStructureAnalysisResult {

    workspacePath: string;

    directories: StructureDirectory[];

    files: StructureFile[];

    modules: StructureModule[];

    controllers: StructureController[];

    services: StructureService[];

    routes: StructureRoute[];

    models: StructureModel[];

    entryPoints: StructureEntryPoint[];

    architecture: StructureArchitecture;

    detectorResults:
    Array<CodeStructureDetectorResult<unknown>>;

    success: boolean;

    warnings: string[];

}