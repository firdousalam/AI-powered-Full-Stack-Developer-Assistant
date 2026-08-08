import {
    DirectoryDetector,
    FileDetector,
    ModuleDetector,
    ControllerDetector,
    ServiceDetector,
    RouteDetector,
    ModelDetector,
    EntryPointDetector,
    ArchitectureDetector
} from "../detectors";

import {
    CodeStructureAnalysisResult,
    CodeStructureDetectorResult
} from "../models";

/**
 * ============================================================
 * CodeStructureAnalyzerService
 * ============================================================
 *
 * Orchestration layer for Code Structure Analysis.
 *
 * Responsibilities:
 * - Execute all code structure detectors
 * - Collect detector results
 * - Combine results into one analysis object
 *
 * This service contains NO detection logic.
 * Each detector remains responsible for one concern.
 * ============================================================
 */
export class CodeStructureAnalyzerService {

    private readonly directoryDetector:
        DirectoryDetector;

    private readonly fileDetector:
        FileDetector;

    private readonly moduleDetector:
        ModuleDetector;

    private readonly controllerDetector:
        ControllerDetector;

    private readonly serviceDetector:
        ServiceDetector;

    private readonly routeDetector:
        RouteDetector;

    private readonly modelDetector:
        ModelDetector;

    private readonly entryPointDetector:
        EntryPointDetector;

    private readonly architectureDetector:
        ArchitectureDetector;


    constructor() {

        this.directoryDetector =
            new DirectoryDetector();

        this.fileDetector =
            new FileDetector();

        this.moduleDetector =
            new ModuleDetector();

        this.controllerDetector =
            new ControllerDetector();

        this.serviceDetector =
            new ServiceDetector();

        this.routeDetector =
            new RouteDetector();

        this.modelDetector =
            new ModelDetector();

        this.entryPointDetector =
            new EntryPointDetector();

        this.architectureDetector =
            new ArchitectureDetector();

    }


    /**
     * Analyze complete code structure.
     */
    async analyze(
        workspacePath: string
    ): Promise<CodeStructureAnalysisResult> {

        /**
         * Execute detectors sequentially.
         *
         * Keeping this sequential initially makes
         * debugging and filesystem load easier.
         */
        const directories =
            await this.directoryDetector.detect(
                workspacePath
            );

        const files =
            await this.fileDetector.detect(
                workspacePath
            );

        const modules =
            await this.moduleDetector.detect(
                workspacePath
            );

        const controllers =
            await this.controllerDetector.detect(
                workspacePath
            );

        const services =
            await this.serviceDetector.detect(
                workspacePath
            );

        const routes =
            await this.routeDetector.detect(
                workspacePath
            );

        const models =
            await this.modelDetector.detect(
                workspacePath
            );

        const entryPoints =
            await this.entryPointDetector.detect(
                workspacePath
            );

        const architecture =
            await this.architectureDetector.detect(
                workspacePath
            );


        return {

            workspacePath,

            directories:
                directories.data,

            files:
                files.data,

            modules:
                modules.data,

            controllers:
                controllers.data,

            services:
                services.data,

            routes:
                routes.data,

            models:
                models.data,

            entryPoints:
                entryPoints.data,

            architecture:
                architecture.data,

            detectorResults: [

                directories,

                files,

                modules,

                controllers,

                services,

                routes,

                models,

                entryPoints,

                architecture

            ],

            success:
                this.isSuccessful([

                    directories,
                    files,
                    modules,
                    controllers,
                    services,
                    routes,
                    models,
                    entryPoints,
                    architecture

                ]),

            warnings:
                this.collectWarnings([

                    directories,
                    files,
                    modules,
                    controllers,
                    services,
                    routes,
                    models,
                    entryPoints,
                    architecture

                ])

        };

    }


    /**
     * Determine overall analyzer status.
     *
     * The analysis is considered successful when
     * at least the core detectors execute successfully.
     */
    private isSuccessful(
        results: Array<
            CodeStructureDetectorResult<unknown>
        >
    ): boolean {

        return results.every(
            result => result.success
        );

    }


    /**
     * Collect warnings from all detectors.
     */
    private collectWarnings(
        results: Array<
            CodeStructureDetectorResult<unknown>
        >
    ): string[] {

        return results.flatMap(
            result =>
                result.warnings ?? []
        );

    }

}