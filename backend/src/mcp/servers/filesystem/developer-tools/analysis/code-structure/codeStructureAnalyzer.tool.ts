import {
    DeveloperToolBase,
    DeveloperToolContext
} from "../../base";

import {
    CodeStructureAnalysisResult
} from "./models";

import {
    CodeStructureAnalyzerService
} from "./services";


export class CodeStructureAnalyzerTool
    extends DeveloperToolBase<
        DeveloperToolContext,
        CodeStructureAnalysisResult
    > {

    readonly name =
        "analyzeCodeStructure";

    readonly description =
        "Analyzes project code structure including directories, files, modules, controllers, services, routes, models, entry points, and architecture.";

    private readonly codeStructureAnalyzerService:
        CodeStructureAnalyzerService;


    constructor() {

        super();

        this.codeStructureAnalyzerService =
            new CodeStructureAnalyzerService();

    }


    protected async beforeExecute(
        context: DeveloperToolContext
    ): Promise<void> {

        // No preprocessing required.
    }


    protected async executeInternal(
        context: DeveloperToolContext
    ): Promise<CodeStructureAnalysisResult> {

        const workspacePath =
            context.arguments?.workspacePath ??
            context.workspacePath;

        if (!workspacePath) {

            throw new Error(
                "workspacePath is required."
            );

        }

        return await this.codeStructureAnalyzerService.analyze(
            workspacePath
        );

    }


    protected async afterExecute(
        context: DeveloperToolContext,
        result: CodeStructureAnalysisResult
    ): Promise<void> {

        // No post-processing required.
    }


    protected async onError(
        context: DeveloperToolContext,
        error: unknown
    ): Promise<void> {

        console.error(
            "CodeStructureAnalyzerTool failed:",
            error
        );

    }

}