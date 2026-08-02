import type { DetectedLanguage } from "../types/detectedLanguage.types";

class LanguageDetectorService {

    private readonly languageMap: Record<string, string> = {

        js: "JavaScript",
        javascript: "JavaScript",

        ts: "TypeScript",
        typescript: "TypeScript",

        jsx: "JavaScript",
        tsx: "TypeScript",

        py: "Python",
        python: "Python",

        java: "Java",

        go: "Go",

        rust: "Rust",
        rs: "Rust",

        cs: "C#",
        csharp: "C#",

        yaml: "YAML",
        yml: "YAML",

        json: "JSON",

        html: "HTML",

        css: "CSS",

        docker: "Dockerfile",
        dockerfile: "Dockerfile"

    };

    detect(element: HTMLElement): DetectedLanguage {

        const cssResult =
            this.detectFromClass(element);

        if (cssResult)
            return cssResult;

        const attributeResult =
            this.detectFromAttribute(element);

        if (attributeResult)
            return attributeResult;

        const heuristicResult =
            this.detectFromSyntax(element.textContent ?? "");

        if (heuristicResult)
            return heuristicResult;

        return {

            language: "Unknown",

            confidence: 0,

            source: "unknown"

        };

    }

    private detectFromClass(
        element: HTMLElement
    ): DetectedLanguage | null {

        const classes =
            [...element.classList];

        for (const cls of classes) {

            const normalized =
                cls
                    .replace("language-", "")
                    .replace("lang-", "")
                    .replace("hljs-", "")
                    .toLowerCase();

            const language =
                this.languageMap[normalized];

            if (language) {

                return {

                    language,

                    confidence: 0.98,

                    source: "css-class"

                };

            }

        }

        return null;

    }

    private detectFromAttribute(
        element: HTMLElement
    ): DetectedLanguage | null {

        const value =
            element.getAttribute("data-language") ??
            element.getAttribute("data-lang");

        if (!value)
            return null;

        const language =
            this.languageMap[value.toLowerCase()];

        if (!language)
            return null;

        return {

            language,

            confidence: 0.95,

            source: "attribute"

        };

    }

    private detectFromSyntax(
        code: string
    ): DetectedLanguage | null {

        if (
            code.includes("const ") &&
            code.includes("=>")
        ) {

            return {

                language: "JavaScript",

                confidence: 0.75,

                source: "heuristic"

            };

        }

        if (
            code.includes("interface ") ||
            code.includes(": string")
        ) {

            return {

                language: "TypeScript",

                confidence: 0.80,

                source: "heuristic"

            };

        }

        if (
            code.includes("def ") &&
            code.includes("import ")
        ) {

            return {

                language: "Python",

                confidence: 0.80,

                source: "heuristic"

            };

        }

        if (
            code.includes("package main")
        ) {

            return {

                language: "Go",

                confidence: 0.85,

                source: "heuristic"

            };

        }

        if (
            code.includes("FROM ") &&
            code.includes("RUN ")
        ) {

            return {

                language: "Dockerfile",

                confidence: 0.90,

                source: "heuristic"

            };

        }

        if (
            code.includes("apiVersion:")
        ) {

            return {

                language: "YAML",

                confidence: 0.90,

                source: "heuristic"

            };

        }

        if (
            code.trim().startsWith("{") &&
            code.includes("\"")
        ) {

            return {

                language: "JSON",

                confidence: 0.88,

                source: "heuristic"

            };

        }

        return null;

    }

}

export default new LanguageDetectorService();