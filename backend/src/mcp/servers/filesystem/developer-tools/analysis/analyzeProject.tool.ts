import { DeveloperToolBase } from "../base";

import {
    DeveloperToolContext
} from "../base/developerTool.types";

import {
    ProjectAnalysisResult
} from "./models";

import {
    ProjectAnalyzerService
} from "./services";

export class AnalyzeProjectTool extends DeveloperToolBase<
    DeveloperToolContext,
    ProjectAnalysisResult
> {

    readonly name = "analyzeProject";

    readonly description =
        "Analyzes the workspace and returns an AI-ready project summary.";

    constructor(
        private readonly analyzerService: ProjectAnalyzerService
    ) {
        super();
    }

    protected async executeInternal(
        context: DeveloperToolContext
    ): Promise<ProjectAnalysisResult> {

        return this.analyzerService.analyze(
            context.workspacePath
        );

    }

}