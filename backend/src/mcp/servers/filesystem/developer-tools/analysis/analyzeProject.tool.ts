import { DeveloperToolBase } from "../base/developerTool.base";
import {
    DeveloperToolContext
} from "../base/developerTool.types";

import { ProjectAnalysisResult } from "./models";
import { ProjectAnalyzerService } from "./services";

export class AnalyzeProjectTool
    extends DeveloperToolBase<
        DeveloperToolContext,
        ProjectAnalysisResult
    > {

    /**
     * MCP Tool Name
     */
    readonly name = "analyzeProject";

    /**
     * Tool Description
     */
    readonly description =
        "Analyzes the workspace and returns an AI-ready project summary including metadata, language, framework, runtime, package manager, build tools, entry point, Docker, Kubernetes, Git, and CI/CD information.";

    constructor(
        private readonly projectAnalyzerService: ProjectAnalyzerService
    ) {
        super();
    }

    /**
     * Executed before analysis starts.
     * Can later be extended for:
     * - Logging
     * - Metrics
     * - Authorization
     */
    protected override async beforeExecute(
        _context: DeveloperToolContext
    ): Promise<void> {

        // Intentionally empty.

    }

    /**
     * Executes the Project Analyzer.
     */
    protected override async executeInternal(
        context: DeveloperToolContext
    ): Promise<ProjectAnalysisResult> {

        return this.projectAnalyzerService.analyze(
            context.workspacePath
        );

    }

    /**
     * Executed after successful analysis.
     * Can later be extended for:
     * - Telemetry
     * - Audit Logs
     * - Metrics
     */
    protected override async afterExecute(
        _context: DeveloperToolContext,
        _result: ProjectAnalysisResult
    ): Promise<void> {

        // Intentionally empty.

    }

    /**
     * Executed when analysis fails.
     * Can later be extended for:
     * - Error logging
     * - Monitoring
     * - Alerts
     */
    protected override async onError(
        _context: DeveloperToolContext,
        error: unknown
    ): Promise<void> {

        console.error(
            `[${this.name}]`,
            error
        );

    }

}