import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export class FrameworkDetector extends DetectorBase<string> {

    readonly name = "FrameworkDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        const packageJson =
            await workspaceReader.readPackageJson<any>(
                workspacePath
            );

        if (!packageJson) {
            return this.success("Unknown");
        }

        const dependencies = {
            ...(packageJson.dependencies ?? {}),
            ...(packageJson.devDependencies ?? {})
        };

        const has = (pkg: string) =>
            Object.prototype.hasOwnProperty.call(
                dependencies,
                pkg
            );

        // Backend
        if (has("@nestjs/core")) {
            return this.success("NestJS");
        }

        if (has("express")) {
            return this.success("Express");
        }

        if (has("fastify")) {
            return this.success("Fastify");
        }

        if (has("koa")) {
            return this.success("Koa");
        }

        if (has("@hapi/hapi")) {
            return this.success("Hapi");
        }

        // Frontend
        if (has("next")) {
            return this.success("Next.js");
        }

        if (has("react")) {
            return this.success("React");
        }

        if (has("@angular/core")) {
            return this.success("Angular");
        }

        if (has("vue")) {
            return this.success("Vue");
        }

        if (has("@sveltejs/kit")) {
            return this.success("SvelteKit");
        }

        // Python
        if (
            await workspaceReader.exists(
                workspacePath,
                "requirements.txt"
            )
        ) {
            return this.success("Python");
        }

        // Java
        if (
            await workspaceReader.exists(
                workspacePath,
                "pom.xml"
            )
        ) {
            return this.success("Spring Boot");
        }

        return this.success("Unknown");

    }

}