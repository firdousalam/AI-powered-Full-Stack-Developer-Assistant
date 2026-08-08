import {
    StructureFile
} from "./structureFile.interface";

import {
    StructureDirectory
} from "./structureDirectory.interface";

import {
    CodeModule
} from "./module.interface";

import {
    ControllerInfo
} from "./controller.interface";

import {
    ServiceInfo
} from "./service.interface";

import {
    RouteInfo
} from "./route.interface";

import {
    ModelInfo
} from "./model.interface";

import {
    EntryPointInfo
} from "./entryPoint.interface";

import {
    ArchitectureInfo
} from "./architecture.interface";


export interface CodeStructureAnalysisResult {

    directories: StructureDirectory[];

    files: StructureFile[];

    modules: CodeModule[];

    controllers: ControllerInfo[];

    services: ServiceInfo[];

    routes: RouteInfo[];

    models: ModelInfo[];

    entryPoints: EntryPointInfo[];

    architecture: ArchitectureInfo;

}