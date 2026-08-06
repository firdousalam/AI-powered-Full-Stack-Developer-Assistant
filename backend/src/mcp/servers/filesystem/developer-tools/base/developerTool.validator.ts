import path from "node:path";

import { filesystemService } from "../../services";

import {
    DeveloperToolContext,
    ValidationResult
} from "./developerTool.types";

export class DeveloperToolValidator {

    async validate(
        context: DeveloperToolContext
    ): Promise<ValidationResult> {

        const errors: string[] = [];
        const warnings: string[] = [];

        if (!context.workspacePath?.trim()) {
            errors.push("Workspace path is required.");

            return {
                valid: false,
                errors,
                warnings
            };
        }

        const workspacePath = path.resolve(
            context.workspacePath
        );

        const exists = await filesystemService.exists(
            workspacePath
        );

        if (!exists) {
            errors.push(
                `Workspace '${workspacePath}' does not exist.`
            );

            return {
                valid: false,
                errors,
                warnings
            };
        }

        const isDirectory =
            await filesystemService.isDirectory(
                workspacePath
            );

        if (!isDirectory) {
            errors.push(
                "Workspace path must be a directory."
            );
        }

        const entries =
            await filesystemService.listDirectory(
                workspacePath
            );

        if (entries.length === 0) {
            warnings.push(
                "Workspace directory is empty."
            );
        }

        return {

            valid: errors.length === 0,

            errors,

            warnings

        };

    }

}