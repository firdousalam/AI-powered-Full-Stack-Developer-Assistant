import {
    DeveloperToolBase
} from "../../base";

import {
    DeveloperToolContext
} from "../../base/developerTool.types";

import {
    DependencyAnalysisResult
} from "./models";

import {
    DependencyAnalyzerService
} from "./services/dependencyAnalyzer.service";


/**
 * DependencyAnalyzerTool
 *
 * Developer tool responsible for exposing
 * dependency analysis to the MCP layer.
 *
 * This class contains no dependency detection logic.
 *
 * It delegates the actual analysis to:
 *
 * DependencyAnalyzerService
 */
export class DependencyAnalyzerTool
    extends DeveloperToolBase<
        DeveloperToolContext,
        DependencyAnalysisResult
    > {

    /**
     * Unique developer tool name.
     */
    readonly name =
        "analyzeDependencies";

    /**
     * Description exposed to the MCP layer
     * and eventually to the AI service.
     */
    readonly description =
        "Analyzes project dependencies including production, development, peer, optional, duplicate, missing dependencies, package manager, and lock file information.";

    /**
     * Dependency analyzer service.
     */
    constructor(
        private readonly dependencyAnalyzerService:
            DependencyAnalyzerService
    ) {

        super();

    }

    /**
     * Execute dependency analysis.
     *
     * The workspace path comes from the
     * DeveloperToolContext.
     */
    protected async executeInternal(
        context: DeveloperToolContext
    ): Promise<DependencyAnalysisResult> {

        return this.dependencyAnalyzerService.analyze(
            context.workspacePath
        );

    }

}