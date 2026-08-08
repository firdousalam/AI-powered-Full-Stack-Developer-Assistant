Yes — this is now just a filename/case mismatch.

Your models/index.ts currently has:

export * from "./StructureModule"

but the file we created was likely:

structureModule.interface.ts

So TypeScript cannot find it.

Fix it cleanly
1. Check this folder
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/

You should have:

models/
├── index.ts
├── codeStructureDetector.interface.ts
├── codeStructureDetectorResult.interface.ts
├── structureDirectory.interface.ts
├── structureFile.interface.ts
└── structureModule.interface.ts   ← this one

If structureModule.interface.ts does not exist, create it.

📂 structureModule.interface.ts
/**
 * Represents module information detected
 * from a source file.
 */
export interface StructureModule {

    /**
     * Source file path relative to workspace.
     */
    path: string;

    /**
     * Imported modules/packages.
     */
    imports: string[];

    /**
     * Named exports detected in the file.
     */
    exports: string[];

    /**
     * Whether the file contains a default export.
     */
    hasDefaultExport: boolean;

    /**
     * Detected module type.
     *
     * Examples:
     * - typescript-module
     * - commonjs-module
     * - script
     */
    type: string;

}
2. Fix models/index.ts

📂

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/index.ts

Change:

export * from "./StructureModule";

to:

export * from "./structureModule.interface";

Important: use the exact filename, including lowercase letters.

Your export section should look similar to:

export * from "./codeStructureDetector.interface";
export * from "./codeStructureDetectorResult.interface";

export * from "./structureDirectory.interface";
export * from "./structureFile.interface";
export * from "./structureModule.interface";
3. Don't change module.detector.ts

This import is correct:

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureModule
} from "../models";

Because models/index.ts will now re-export StructureModule.

4. Run the checkpoint
npx tsc --noEmit

Expected:

Found 0 errors

If you get another error, paste only the new tsc output. We're very close to completing ModuleDetector.

 npx tsc --noEmit
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/module.detector.ts:345:13 - error TS2353: Object literal may only specify known properties, and 'moduleType' does not exist in type 'StructureModule'.

345             moduleType
                ~~~~~~~~~~


Found 1 error in src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/module.detector.ts:345

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Good — only one model/property mismatch remains.

Your ModuleDetector returns:

moduleType

but our StructureModule interface currently defines:

type

We should not rename the detector property because moduleType is clearer and matches the purpose of this detector.

📂 Fix this file
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/structureModule.interface.ts

Change:

type: string;

to:

moduleType: string;

So the complete interface should be:

/**
 * Represents module information detected
 * from a source file.
 */
export interface StructureModule {

    /**
     * Source file path relative to workspace.
     */
    path: string;

    /**
     * Imported modules/packages.
     */
    imports: string[];

    /**
     * Named exports detected in the file.
     */
    exports: string[];

    /**
     * Whether the file contains a default export.
     */
    hasDefaultExport: boolean;

    /**
     * Detected module type.
     *
     * Examples:
     * - typescript-module
     * - commonjs-module
     * - script
     */
    moduleType: string;

}

Then run:

npx tsc --noEmit
Expected
Found 0 errors

Once that passes, Step 3 — ModuleDetector ✅ is complete.

Then we'll move to:

Step 4 — ControllerDetector

📂

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/controller.detector.ts

And we'll follow the same pattern: implement → compile → fix → only then move forward.

fixed next

Great. ModuleDetector ✅ is complete.

Step 4 — ControllerDetector

Now we'll detect controllers from the source code.

📂 Create:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/controller.detector.ts

The detector will identify common controller patterns such as:

export class UserController

and:

class UserController
export default UserController

It will also capture controller methods where possible.

Expected result

For:

src/controllers/user.controller.ts

something like:

{
  "path": "src/controllers/user.controller.ts",
  "name": "UserController",
  "methods": [
    "getUsers",
    "getUser",
    "createUser",
    "updateUser",
    "deleteUser"
  ]
}
Before implementing

We need to make sure the detector matches your existing model exactly, just like we did with StructureModule.

Please check:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/

and paste the current controller-related model/interface (if you already created one).

If you haven't created it yet, tell me "no controller model", and I'll provide both:

structureController.interface.ts
controller.detector.ts

with the exact file paths and comments.



Yes. We'll proceed with Step 6 — RouteDetector, using your actual FilesystemService API.

📂 File
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/route.detector.ts

First, make sure the model exists.

1. structureRoute.interface.ts

📂

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/structureRoute.interface.ts
export interface StructureRoute {
    name: string;
    path: string;
    file: string;
    type: "route";
    methods: string[];
}

Export it from:

📂

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/index.ts
export * from "./structureRoute.interface";
2. route.detector.ts

📂

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/route.detector.ts
import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureRoute
} from "../models";


/**
 * Detects route files inside the project workspace.
 *
 * Detection is primarily based on:
 *
 * - *.route.ts
 * - *.routes.ts
 * - *.route.js
 * - *.routes.js
 * - *.route.tsx
 * - *.routes.tsx
 * - *.route.jsx
 * - *.routes.jsx
 *
 * The detector also performs lightweight inspection of
 * the source code to identify HTTP methods such as:
 *
 * GET
 * POST
 * PUT
 * PATCH
 * DELETE
 */
export class RouteDetector
    implements CodeStructureDetector<StructureRoute[]> {

    readonly name =
        "RouteDetector";


    /**
     * Detect route files recursively.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureRoute[]
        >
    > {

        try {

            const routes =
                await this.scanDirectory(
                    workspacePath,
                    workspacePath
                );

            return {

                detector:
                    this.name,

                success:
                    true,

                data:
                    routes,

                warnings:
                    []

            };

        }
        catch (error) {

            return {

                detector:
                    this.name,

                success:
                    false,

                data:
                    [],

                warnings: [

                    error instanceof Error
                        ? error.message
                        : "Failed to detect routes."

                ]

            };

        }

    }


    /**
     * Recursively scans the workspace.
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureRoute[]> {

        const results:
            StructureRoute[] = [];


        /**
         * IMPORTANT:
         *
         * Your current FilesystemService returns
         * string[] from listDirectory().
         */
        const directoryEntries =
            await filesystemService.listDirectory(
                currentPath
            );


        for (
            const entryName of directoryEntries
        ) {

            const entryPath =
                path.join(
                    currentPath,
                    entryName
                );


            /**
             * Get metadata using the actual
             * FilesystemService API.
             */
            const metadata =
                await filesystemService.getMetadata(
                    entryPath
                );


            if (!metadata) {

                continue;

            }


            /**
             * Recursively inspect directories.
             */
            if (metadata.isDirectory) {

                const children =
                    await this.scanDirectory(
                        rootPath,
                        entryPath
                    );

                results.push(
                    ...children
                );

                continue;

            }


            /**
             * Ignore anything that isn't a file.
             */
            if (!metadata.isFile) {

                continue;

            }


            /**
             * Check route filename convention.
             */
            if (
                !this.isRouteFile(
                    entryName
                )
            ) {

                continue;

            }


            /**
             * Read route source code.
             */
            let content = "";

            try {

                const file =
                    await filesystemService.readFile(
                        entryPath
                    );

                /**
                 * readFile() returns FileContent
                 * in this FilesystemService.
                 */
                content =
                    typeof file === "string"
                        ? file
                        : file.content;

            }
            catch {

                /**
                 * If the file cannot be read,
                 * still report the route.
                 */
                content = "";

            }


            const relativePath =
                path.relative(
                    rootPath,
                    entryPath
                );


            const routeName =
                this.getRouteName(
                    entryName
                );


            const methods =
                this.detectHttpMethods(
                    content
                );


            results.push({

                name:
                    routeName,

                path:
                    relativePath,

                file:
                    entryName,

                type:
                    "route",

                methods

            });

        }


        return results;

    }


    /**
     * Determines whether a filename follows
     * a route naming convention.
     */
    private isRouteFile(
        fileName: string
    ): boolean {

        const lowerName =
            fileName.toLowerCase();

        return (

            lowerName.endsWith(
                ".route.ts"
            ) ||

            lowerName.endsWith(
                ".routes.ts"
            ) ||

            lowerName.endsWith(
                ".route.tsx"
            ) ||

            lowerName.endsWith(
                ".routes.tsx"
            ) ||

            lowerName.endsWith(
                ".route.js"
            ) ||

            lowerName.endsWith(
                ".routes.js"
            ) ||

            lowerName.endsWith(
                ".route.jsx"
            ) ||

            lowerName.endsWith(
                ".routes.jsx"
            )

        );

    }


    /**
     * Generates a normalized route name.
     *
     * Example:
     *
     * user.route.ts
     *
     * becomes:
     *
     * UserRoute
     */
    private getRouteName(
        fileName: string
    ): string {

        const baseName =
            fileName.replace(
                /\.(routes?|route)\.(ts|tsx|js|jsx)$/i,
                ""
            );


        const parts =
            baseName
                .split(/[-_.\s]+/)
                .filter(Boolean);


        const name =
            parts
                .map(
                    part =>
                        part.charAt(0).toUpperCase() +
                        part.slice(1)
                )
                .join("");


        return `${name}Route`;

    }


    /**
     * Detect HTTP methods used by the route.
     *
     * Supports common Express-style patterns:
     *
     * router.get(...)
     * router.post(...)
     * router.put(...)
     * router.patch(...)
     * router.delete(...)
     *
     * app.get(...)
     * app.post(...)
     *
     * Also supports:
     *
     * router.route(...).get(...)
     */
    private detectHttpMethods(
        content: string
    ): string[] {

        const methods =
            new Set<string>();


        const methodPattern =
            /\b(?:router|route|app)\s*\.\s*(get|post|put|patch|delete|head|options|all)\s*\(/gi;


        let match:
            RegExpExecArray | null;


        while (
            (match =
                methodPattern.exec(content)) !== null
        ) {

            methods.add(
                match[1].toUpperCase()
            );

        }


        /**
         * Also detect chained Express route
         * definitions such as:
         *
         * router.route("/users")
         *     .get(...)
         *     .post(...)
         */
        const chainedPattern =
            /\.(get|post|put|patch|delete|head|options|all)\s*\(/gi;


        while (
            (match =
                chainedPattern.exec(content)) !== null
        ) {

            methods.add(
                match[1].toUpperCase()
            );

        }


        return Array.from(methods);

    }

}
Important correction

The regular expression above intentionally supports both:

user.route.ts
user.routes.ts

and the JavaScript/React variants.

The resulting structure will look like:

{
    "name": "UserRoute",
    "path": "src/routes/user.route.ts",
    "file": "user.route.ts",
    "type": "route",
    "methods": [
        "GET",
        "POST"
    ]
}

For example, given:

router.get("/users", getUsers);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

the detector will return:

{
    "methods": [
        "GET",
        "POST",
        "DELETE"
    ]
}
3. Check compilation

Now run:

npx tsc --noEmit

Do not move to ModelDetector until this passes.

If TypeScript reports an API mismatch, especially around listDirectory(), getMetadata(), or readFile(), paste the exact error and we'll adapt this detector to the actual service implementation rather than changing your FilesystemService.

i think same mistake again

npx tsc --noEmit
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/route.detector.ts:223:32 - error TS2339: Property 'content' does not exist on type 'never'.

223                         : file.content;
                                   ~~~~~~~


Found 1 error in src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/route.detector.ts:223

PS C:\Users\techn\TechnophileFirdous\AI-powered-Full-Stack-Developer-Assistant\backend> 

Yes, you're right. I made the same API mistake again. Your readFile() in the service actually imported by the code-structure detectors is returning a string, so the file.content branch is invalid.

Let's fix only that part.

📂 File
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/route.detector.ts

Find this block:

const file =
    await filesystemService.readFile(
        entryPath
    );

content =
    typeof file === "string"
        ? file
        : file.content;
Replace it with
content =
    await filesystemService.readFile(
        entryPath
    );

So the complete section becomes:

/**
 * Read route source code.
 */
let content = "";

try {

    content =
        await filesystemService.readFile(
            entryPath
        );

}
catch {

    /**
     * If the file cannot be read,
     * still report the route.
     */
    content = "";

}
Why

Your actual detector-side FilesystemService API is:

listDirectory()
    → string[]

getMetadata()
    → FileMetadata | null

readFile()
    → string

So from now on I'll use exactly this API for these detectors.

Checkpoint

Run:

npx tsc --noEmit

If it passes, Step 6 — RouteDetector is complete.

Then we'll move to:

Step 7 — ModelDetector

and I'll make sure to use the same three APIs without assuming DirectoryInfo, .entries, getFileMetadata(), or FileContent.

Step 7 — ModelDetector

Yes. Step 7 — ModelDetector next, and we'll follow the actual filesystem API we've established.

Step 7 — ModelDetector
📂 Create
src/mcp/servers/filesystem/developer-tools/analysis/code-structure/detectors/model.detector.ts
📂 First create the model

If you don't already have it:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/structureModel.interface.ts
export interface StructureModel {
    name: string;
    path: string;
    file: string;
    type: "model";
    technology?: string;
}

Then export it from:

src/mcp/servers/filesystem/developer-tools/analysis/code-structure/models/index.ts
export * from "./structureModel.interface";
model.detector.ts
import path from "node:path";

import {
    filesystemService
} from "../../../../services";

import {
    CodeStructureDetector,
    CodeStructureDetectorResult,
    StructureModel
} from "../models";


/**
 * Detects model files inside the project workspace.
 *
 * Detection is based on common model naming conventions:
 *
 * - *.model.ts
 * - *.models.ts
 * - *.model.js
 * - *.models.js
 * - *.model.tsx
 * - *.models.tsx
 * - *.model.jsx
 * - *.models.jsx
 *
 * The detector also performs lightweight source inspection
 * to identify common model technologies such as:
 *
 * - Mongoose
 * - Sequelize
 * - Prisma
 * - TypeORM
 */
export class ModelDetector
    implements CodeStructureDetector<StructureModel[]> {

    readonly name =
        "ModelDetector";


    /**
     * Detect model files recursively.
     */
    async detect(
        workspacePath: string
    ): Promise<
        CodeStructureDetectorResult<
            StructureModel[]
        >
    > {

        try {

            const models =
                await this.scanDirectory(
                    workspacePath,
                    workspacePath
                );

            return {

                detector:
                    this.name,

                success:
                    true,

                data:
                    models,

                warnings:
                    []

            };

        }
        catch (error) {

            return {

                detector:
                    this.name,

                success:
                    false,

                data:
                    [],

                warnings: [

                    error instanceof Error
                        ? error.message
                        : "Failed to detect models."

                ]

            };

        }

    }


    /**
     * Recursively scans the workspace.
     */
    private async scanDirectory(
        rootPath: string,
        currentPath: string
    ): Promise<StructureModel[]> {

        const results:
            StructureModel[] = [];


        /**
         * IMPORTANT:
         *
         * Current FilesystemService API:
         *
         * listDirectory() -> string[]
         */
        const directoryEntries =
            await filesystemService.listDirectory(
                currentPath
            );


        for (
            const entryName of directoryEntries
        ) {

            const entryPath =
                path.join(
                    currentPath,
                    entryName
                );


            /**
             * Use the actual metadata API.
             */
            const metadata =
                await filesystemService.getMetadata(
                    entryPath
                );


            if (!metadata) {

                continue;

            }


            /**
             * Recursively inspect directories.
             */
            if (metadata.isDirectory) {

                const children =
                    await this.scanDirectory(
                        rootPath,
                        entryPath
                    );

                results.push(
                    ...children
                );

                continue;

            }


            /**
             * Ignore anything that isn't a file.
             */
            if (!metadata.isFile) {

                continue;

            }


            /**
             * Check model naming convention.
             */
            if (
                !this.isModelFile(
                    entryName
                )
            ) {

                continue;

            }


            /**
             * Read source.
             *
             * IMPORTANT:
             *
             * readFile() returns string in the
             * detector-side FilesystemService.
             */
            let content = "";

            try {

                content =
                    await filesystemService.readFile(
                        entryPath
                    );

            }
            catch {

                content = "";

            }


            const relativePath =
                path.relative(
                    rootPath,
                    entryPath
                );


            const modelName =
                this.getModelName(
                    entryName
                );


            const technology =
                this.detectTechnology(
                    content
                );


            results.push({

                name:
                    modelName,

                path:
                    relativePath,

                file:
                    entryName,

                type:
                    "model",

                technology

            });

        }


        return results;

    }


    /**
     * Determines whether a file follows
     * a model naming convention.
     */
    private isModelFile(
        fileName: string
    ): boolean {

        const lowerName =
            fileName.toLowerCase();


        return (

            lowerName.endsWith(
                ".model.ts"
            ) ||

            lowerName.endsWith(
                ".models.ts"
            ) ||

            lowerName.endsWith(
                ".model.tsx"
            ) ||

            lowerName.endsWith(
                ".models.tsx"
            ) ||

            lowerName.endsWith(
                ".model.js"
            ) ||

            lowerName.endsWith(
                ".models.js"
            ) ||

            lowerName.endsWith(
                ".model.jsx"
            ) ||

            lowerName.endsWith(
                ".models.jsx"
            )

        );

    }


    /**
     * Converts filename into a model name.
     *
     * Example:
     *
     * user.model.ts
     *
     * -> UserModel
     */
    private getModelName(
        fileName: string
    ): string {

        const baseName =
            fileName.replace(
                /\.(models?|model)\.(ts|tsx|js|jsx)$/i,
                ""
            );


        const parts =
            baseName
                .split(/[-_.\s]+/)
                .filter(Boolean);


        const name =
            parts
                .map(
                    part =>
                        part.charAt(0).toUpperCase() +
                        part.slice(1)
                )
                .join("");


        return `${name}Model`;

    }


    /**
     * Detect common model technologies.
     */
    private detectTechnology(
        content: string
    ): string | undefined {

        if (
            /\bmongoose\b/i.test(content) ||
            /\bSchema\s*\(/.test(content) ||
            /\bmodel\s*\(/.test(content)
        ) {

            return "mongoose";

        }


        if (
            /\bsequelize\b/i.test(content) ||
            /\bModel\.init\s*\(/.test(content)
        ) {

            return "sequelize";

        }


        if (
            /\bprisma\b/i.test(content) ||
            /\bPrismaClient\b/.test(content)
        ) {

            return "prisma";

        }


        if (
            /\btypeorm\b/i.test(content) ||
            /@Entity\s*\(/.test(content)
        ) {

            return "typeorm";

        }


        return undefined;

    }

}
Example

Given:

src/models/user.model.ts

containing:

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

export default mongoose.model("User", userSchema);

the detector should produce approximately:

{
  "name": "UserModel",
  "path": "src/models/user.model.ts",
  "file": "user.model.ts",
  "type": "model",
  "technology": "mongoose"
}
⚠️ One deliberate design choice

We're keeping this detector lightweight.

It does not try to fully understand database schemas. Its responsibility is simply:

Find model files
      ↓
Identify model
      ↓
Identify likely technology

Deeper schema analysis can come later as a separate intelligence capability.

Checkpoint

Now run:

npx tsc --noEmit

If it passes, Step 7 is complete and we'll move to Step 8 — EntryPointDetector.


