import { DetectorBase } from "./base/detector.base";
import { DetectorResult } from "../models";
import { workspaceReader } from "../readers";

export class FrameworkDetector
    extends DetectorBase<string> {

    readonly name = "FrameworkDetector";

    async detect(
        workspacePath: string
    ): Promise<DetectorResult<string>> {

        try {

            const packageJson =
                await workspaceReader.readPackageJson<any>(
                    workspacePath
                );

            if (packageJson) {

                const dependencies = {

                    ...(packageJson.dependencies ?? {}),

                    ...(packageJson.devDependencies ?? {}),

                    ...(packageJson.peerDependencies ?? {})

                };

                const has = (
                    ...packages: string[]
                ): boolean => {

                    return packages.some(
                        (pkg) =>
                            Object.prototype.hasOwnProperty.call(
                                dependencies,
                                pkg
                            )
                    );

                };

                /*
                 * =========================================================
                 * META / FULL-STACK JAVASCRIPT FRAMEWORKS
                 * =========================================================
                 *
                 * Check these before React/Vue because they internally
                 * depend on those libraries.
                 */

                // Next.js
                if (has("next")) {
                    return this.success("Next.js");
                }

                // Remix
                if (
                    has(
                        "@remix-run/react",
                        "@remix-run/node",
                        "@remix-run/dev"
                    )
                ) {
                    return this.success("Remix");
                }

                // Gatsby
                if (has("gatsby")) {
                    return this.success("Gatsby");
                }

                // Astro
                if (has("astro")) {
                    return this.success("Astro");
                }

                // Nuxt
                if (has("nuxt")) {
                    return this.success("Nuxt");
                }

                // SvelteKit
                if (has("@sveltejs/kit")) {
                    return this.success("SvelteKit");
                }

                // Qwik
                if (
                    has(
                        "@builder.io/qwik",
                        "@builder.io/qwik-city"
                    )
                ) {
                    return this.success("Qwik");
                }

                // SolidStart
                if (
                    has(
                        "@solidjs/start",
                        "solid-start"
                    )
                ) {
                    return this.success("SolidStart");
                }

                /*
                 * =========================================================
                 * NODE.JS BACKEND FRAMEWORKS
                 * =========================================================
                 */

                // NestJS
                if (has("@nestjs/core")) {
                    return this.success("NestJS");
                }

                // Express
                if (has("express")) {
                    return this.success("Express");
                }

                // Fastify
                if (has("fastify")) {
                    return this.success("Fastify");
                }

                // Koa
                if (has("koa")) {
                    return this.success("Koa");
                }

                // Hapi
                if (has("@hapi/hapi", "hapi")) {
                    return this.success("Hapi");
                }

                // AdonisJS
                if (has("@adonisjs/core")) {
                    return this.success("AdonisJS");
                }

                // Meteor
                if (has("meteor")) {
                    return this.success("Meteor");
                }

                // Feathers
                if (has("@feathersjs/feathers")) {
                    return this.success("Feathers");
                }

                // LoopBack
                if (
                    has(
                        "@loopback/core",
                        "@loopback/rest"
                    )
                ) {
                    return this.success("LoopBack");
                }

                // Sails.js
                if (has("sails")) {
                    return this.success("Sails.js");
                }

                // Hono
                if (has("hono")) {
                    return this.success("Hono");
                }

                // Elysia
                if (has("elysia")) {
                    return this.success("Elysia");
                }

                // Nitro
                if (has("nitropack")) {
                    return this.success("Nitro");
                }

                /*
                 * =========================================================
                 * FRONTEND FRAMEWORKS / LIBRARIES
                 * =========================================================
                 */

                // Angular
                if (has("@angular/core")) {
                    return this.success("Angular");
                }

                // React
                if (has("react")) {
                    return this.success("React");
                }

                // Vue
                if (has("vue")) {
                    return this.success("Vue");
                }

                // Svelte
                if (has("svelte")) {
                    return this.success("Svelte");
                }

                // Preact
                if (has("preact")) {
                    return this.success("Preact");
                }

                // Lit
                if (
                    has(
                        "lit",
                        "lit-element"
                    )
                ) {
                    return this.success("Lit");
                }

                // Alpine.js
                if (has("alpinejs")) {
                    return this.success("Alpine.js");
                }

                // Ember
                if (has("ember-source")) {
                    return this.success("Ember.js");
                }

                // Backbone
                if (has("backbone")) {
                    return this.success("Backbone.js");
                }

                /*
                 * =========================================================
                 * CSS / UI FRAMEWORKS
                 * =========================================================
                 *
                 * These are technically UI frameworks rather than
                 * application frameworks. We don't currently return them
                 * because FrameworkDetector should prioritize the main
                 * application framework.
                 */

                /*
                 * =========================================================
                 * PYTHON FRAMEWORKS
                 * =========================================================
                 */

                if (
                    has(
                        "django",
                        "Django"
                    )
                ) {
                    return this.success("Django");
                }

                if (
                    has(
                        "flask",
                        "Flask"
                    )
                ) {
                    return this.success("Flask");
                }

                if (
                    has(
                        "fastapi",
                        "FastAPI"
                    )
                ) {
                    return this.success("FastAPI");
                }

                if (
                    has(
                        "tornado",
                        "Tornado"
                    )
                ) {
                    return this.success("Tornado");
                }

                if (
                    has(
                        "sanic",
                        "Sanic"
                    )
                ) {
                    return this.success("Sanic");
                }

                if (
                    has(
                        "pyramid",
                        "Pyramid"
                    )
                ) {
                    return this.success("Pyramid");
                }

                if (
                    has(
                        "starlette",
                        "Starlette"
                    )
                ) {
                    return this.success("Starlette");
                }

                /*
                 * =========================================================
                 * JAVA FRAMEWORKS
                 * =========================================================
                 */

                if (
                    await workspaceReader.exists(
                        workspacePath,
                        "pom.xml"
                    )
                ) {

                    /*
                     * We cannot determine Spring Boot solely from
                     * pom.xml without reading it.
                     *
                     * For now we identify a Java project as Spring Boot
                     * only if a Spring marker can be established later.
                     */
                    return this.success("Java");
                }

                if (
                    await workspaceReader.exists(
                        workspacePath,
                        "build.gradle"
                    )
                ) {
                    return this.success("Java");
                }

                if (
                    await workspaceReader.exists(
                        workspacePath,
                        "build.gradle.kts"
                    )
                ) {
                    return this.success("Java");
                }

                /*
                 * =========================================================
                 * .NET FRAMEWORKS
                 * =========================================================
                 */

                if (
                    has(
                        "Microsoft.AspNetCore.App",
                        "Microsoft.AspNetCore"
                    )
                ) {
                    return this.success("ASP.NET Core");
                }

                /*
                 * =========================================================
                 * PHP FRAMEWORKS
                 * =========================================================
                 */

                if (has("laravel/framework")) {
                    return this.success("Laravel");
                }

                if (has("symfony/framework-bundle")) {
                    return this.success("Symfony");
                }

                if (has("codeigniter4/framework")) {
                    return this.success("CodeIgniter");
                }

                if (has("cakephp/cakephp")) {
                    return this.success("CakePHP");
                }

                /*
                 * =========================================================
                 * RUBY FRAMEWORKS
                 * =========================================================
                 */

                if (has("rails")) {
                    return this.success("Ruby on Rails");
                }

                /*
                 * =========================================================
                 * DART / FLUTTER
                 * =========================================================
                 */

                if (
                    await workspaceReader.exists(
                        workspacePath,
                        "pubspec.yaml"
                    )
                ) {
                    return this.success("Flutter/Dart");
                }

                /*
                 * =========================================================
                 * RUST FRAMEWORKS
                 * =========================================================
                 */

                if (
                    has(
                        "actix-web",
                        "actix"
                    )
                ) {
                    return this.success("Actix Web");
                }

                if (has("axum")) {
                    return this.success("Axum");
                }

                if (has("rocket")) {
                    return this.success("Rocket");
                }

                /*
                 * =========================================================
                 * GO FRAMEWORKS
                 * =========================================================
                 */

                if (
                    has(
                        "github.com/gin-gonic/gin"
                    )
                ) {
                    return this.success("Gin");
                }

                if (
                    has(
                        "github.com/labstack/echo"
                    )
                ) {
                    return this.success("Echo");
                }

                /*
                 * =========================================================
                 * UNKNOWN
                 * =========================================================
                 */

            }

            /*
             * Framework detection based on project files when
             * package.json is not available.
             */

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "manage.py"
                )
            ) {
                return this.success("Django");
            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "requirements.txt"
                )
            ) {
                return this.success("Python");
            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "pom.xml"
                )
            ) {
                return this.success("Java");
            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "go.mod"
                )
            ) {
                return this.success("Go");
            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "Cargo.toml"
                )
            ) {
                return this.success("Rust");
            }

            if (
                await workspaceReader.exists(
                    workspacePath,
                    "pubspec.yaml"
                )
            ) {
                return this.success("Flutter/Dart");
            }

            return this.success("Unknown");

        } catch (error) {

            return this.failure([
                error instanceof Error
                    ? `Unable to detect framework: ${error.message}`
                    : "Unable to detect framework."
            ]);

        }

    }

}