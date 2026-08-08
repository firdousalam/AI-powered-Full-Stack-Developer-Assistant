import {
    DeveloperToolRegistry
} from "./base";

import {
    createAnalyzeProjectTool
} from "./analysis";

import {
    createDependencyAnalyzerTool
} from "./analysis/dependency";

import {
    createCodeStructureAnalyzerTool
} from "./analysis/code-structure";


/**
 * Register all developer tools.
 *
 * The registry becomes the central catalog
 * of developer capabilities exposed through
 * the MCP server.
 */
export function registerDeveloperTools(
    registry: DeveloperToolRegistry
): void {

    /**
     * Register Project Analyzer.
     */
    const analyzeProjectTool =
        createAnalyzeProjectTool();

    registry.register(
        analyzeProjectTool
    );


    /**
     * Register Dependency Analyzer.
     */
    const analyzeDependenciesTool =
        createDependencyAnalyzerTool();

    registry.register(
        analyzeDependenciesTool
    );

    const analyzeCodeStructureTool =
        createCodeStructureAnalyzerTool();

    registry.register(
        analyzeCodeStructureTool
    );

}