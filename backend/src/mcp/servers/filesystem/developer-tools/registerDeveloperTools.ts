import {
    developerToolRegistry
} from "./base/registry";

import {
    AnalyzeProjectTool
} from "./analysis";

import {
    projectAnalyzerService
} from "./analysis/services";

export function registerDeveloperTools(): void {

    developerToolRegistry.register(

        new AnalyzeProjectTool(
            projectAnalyzerService
        )

    );

}