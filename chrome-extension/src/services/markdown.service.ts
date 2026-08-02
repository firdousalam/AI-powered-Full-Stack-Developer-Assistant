import TurndownService from "turndown";

class MarkdownService {

    private readonly turndown: TurndownService;

    constructor() {

        this.turndown = new TurndownService({

            headingStyle: "atx",

            bulletListMarker: "-",

            codeBlockStyle: "fenced",

            emDelimiter: "_",

            strongDelimiter: "**"

        });

        this.configureRules();

    }

    /**
     * Configure custom conversion rules
     */
    private configureRules() {


        // Remove scripts
        this.turndown.remove(["script"]);

        // Remove styles
        this.turndown.remove(["style"]);

        // Remove SVG
        //  this.turndown.remove(["svg"]);

        // Remove canvas
        this.turndown.remove(["canvas"]);

        // Remove iframe
        this.turndown.remove(["iframe"]);

        // Preserve preformatted code
        this.turndown.addRule("codeBlocks", {

            filter: ["pre"],

            replacement(content) {

                return `\n\n\`\`\`\n${content}\n\`\`\`\n\n`;

            }

        });

    }

    /**
     * Convert HTML to Markdown
     */
    convert(html: string): string {

        if (!html) {

            return "";

        }

        return this.turndown.turndown(html);

    }

}

export default new MarkdownService();