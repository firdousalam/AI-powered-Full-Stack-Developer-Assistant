import { FilesystemService } from "../../../filesystem.service";

import {
    DetectorBase
} from "./base/detector.base";

export class LanguageDetector
    extends DetectorBase<string> {

    readonly name = "LanguageDetector";

    constructor(
        private readonly filesystemService: FilesystemService
    ) {
        super();
    }

    async detect(
        workspacePath: string
    ) {

        try {

            const projectTree =
                await this.filesystemService.buildProjectTree(
                    "."
                );

            const languageCounts =
                new Map<string, number>();

            this.analyzeNodes(
                projectTree.nodes,
                languageCounts
            );

            if (languageCounts.size === 0) {

                return this.success(
                    "Unknown"
                );

            }

            const primaryLanguage =
                [...languageCounts.entries()]
                    .sort(
                        (a, b) => b[1] - a[1]
                    )[0][0];

            return this.success(
                primaryLanguage
            );

        } catch (error) {

            return this.failure([
                error instanceof Error
                    ? `Unable to detect project language: ${error.message}`
                    : "Unable to detect project language."
            ]);

        }

    }

    private analyzeNodes(
        nodes: any[],
        languageCounts: Map<string, number>
    ): void {

        for (const node of nodes) {

            if (node.type === "directory") {

                this.analyzeNodes(
                    node.children ?? [],
                    languageCounts
                );

                continue;
            }

            const language =
                this.getLanguageFromExtension(
                    node.name
                );

            if (!language) {
                continue;
            }

            languageCounts.set(
                language,
                (languageCounts.get(language) ?? 0) + 1
            );

        }

    }

    private getLanguageFromExtension(
        fileName: string
    ): string | undefined {

        const extension =
            fileName
                .substring(
                    fileName.lastIndexOf(".")
                )
                .toLowerCase();

        const languageMap: Record<string, string> = {

            ".ts": "TypeScript",
            ".tsx": "TypeScript",

            ".js": "JavaScript",
            ".jsx": "JavaScript",

            ".py": "Python",

            ".java": "Java",

            ".go": "Go",

            ".rs": "Rust",

            ".cs": "C#",

            ".cpp": "C++",
            ".cc": "C++",
            ".cxx": "C++",

            ".c": "C",

            ".php": "PHP",

            ".rb": "Ruby",

            ".swift": "Swift",

            ".kt": "Kotlin",
            ".kts": "Kotlin",

            ".scala": "Scala",

            ".dart": "Dart",

            ".html": "HTML",

            ".css": "CSS",
            ".scss": "SCSS",
            ".sass": "Sass",

            ".vue": "Vue",

            ".svelte": "Svelte"

        };

        return languageMap[extension];

    }

}