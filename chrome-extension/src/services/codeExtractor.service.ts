export interface CodeBlock {

    id: string;

    language: string;

    filename?: string;

    title?: string;

    code: string;

    lineCount: number;

    source: string;

}

class CodeExtractorService {

    /**
     * Supported selectors
     */
    private readonly selectors = [

        "pre",

        "code",

        ".highlight",

        ".highlight-source",

        ".code",

        ".code-block",

        ".code-example",

        "[class*=language-]"

    ];

    /**
     * Extract all code snippets
     */
    extract(document: Document): CodeBlock[] {

        const blocks: CodeBlock[] = [];

        const visited = new Set<Element>();

        this.selectors.forEach(selector => {

            document.querySelectorAll(selector).forEach(element => {

                if (visited.has(element)) {

                    return;

                }

                visited.add(element);

                const code = this.extractCode(element);

                if (!code) {

                    return;

                }

                blocks.push({

                    id: crypto.randomUUID(),

                    language: this.detectLanguage(element),

                    filename: this.detectFilename(element),

                    title: this.detectTitle(element),

                    code,

                    lineCount: code.split("\n").length,

                    source: location.hostname

                });

            });

        });

        return this.removeDuplicates(blocks);

    }

    /**
     * Extract text preserving formatting
     */
    private extractCode(element: Element): string {

        const text = element.textContent ?? "";

        return text

            .replace(/\t/g, "    ")

            .replace(/\r/g, "")

            .trim();

    }

    /**
     * Detect programming language
     */
    private detectLanguage(element: Element): string {

        const className = element.className;

        const languages = [

            "typescript",

            "ts",

            "javascript",

            "js",

            "tsx",

            "jsx",

            "json",

            "html",

            "css",

            "scss",

            "python",

            "java",

            "go",

            "rust",

            "cpp",

            "c",

            "bash",

            "shell",

            "yaml",

            "xml",

            "sql"

        ];

        for (const language of languages) {

            if (

                className.includes(language)

            ) {

                return language;

            }

        }

        return "text";

    }

    /**
     * Try finding filename
     */
    private detectFilename(element: Element): string | undefined {

        const container = element.closest("figure");

        if (!container) {

            return undefined;

        }

        const title =

            container.querySelector("figcaption");

        return title?.textContent?.trim();

    }

    /**
     * Try detecting title
     */
    private detectTitle(element: Element): string | undefined {

        const previous =

            element.previousElementSibling;

        return previous?.textContent?.trim();

    }

    /**
     * Remove duplicate snippets
     */
    private removeDuplicates(

        blocks: CodeBlock[]

    ): CodeBlock[] {

        const seen = new Set<string>();

        return blocks.filter(block => {

            if (

                seen.has(block.code)

            ) {

                return false;

            }

            seen.add(block.code);

            return true;

        });

    }

}

export default new CodeExtractorService();