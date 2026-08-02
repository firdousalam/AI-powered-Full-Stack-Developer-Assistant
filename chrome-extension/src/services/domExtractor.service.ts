class DOMExtractorService {

    /**
     * ==============================
     * Public API
     * ==============================
     */
    extract(): string {

        if (!document.body) {
            return "";
        }

        return this.walk(document.body)
            .trim()
            .replace(/\n{3,}/g, "\n\n");
    }

    /**
     * ==============================
     * Recursive DOM Walker
     * ==============================
     */
    private walk(node: Node): string {

        if (!node) {
            return "";
        }

        /*
        -------------------------
        Text Node
        -------------------------
        */

        if (node.nodeType === Node.TEXT_NODE) {

            return node.textContent
                ?.replace(/\s+/g, " ")
                .trim() || "";
        }

        /*
        -------------------------
        Ignore non-elements
        -------------------------
        */

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return "";
        }

        const element = node as HTMLElement;

        /*
        -------------------------
        Ignore Hidden Elements
        -------------------------
        */

        if (!this.isVisible(element)) {
            return "";
        }

        /*
        -------------------------
        Skip unwanted tags
        -------------------------
        */

        if (this.shouldSkip(element)) {
            return "";
        }

        let result = "";

        /*
        -------------------------
        Preserve headings
        -------------------------
        */

        if (/^H[1-6]$/.test(element.tagName)) {

            result += "\n\n# ";

            result += element.innerText.trim();

            result += "\n\n";

            return result;
        }

        /*
        -------------------------
        Paragraph
        -------------------------
        */

        if (element.tagName === "P") {

            result += "\n";

            result += element.innerText.trim();

            result += "\n";

            return result;
        }

        /*
        -------------------------
        Lists
        -------------------------
        */

        if (element.tagName === "LI") {

            result += "- ";

            result += element.innerText.trim();

            result += "\n";

            return result;
        }

        /*
        -------------------------
        Code Block
        -------------------------
        */

        if (
            element.tagName === "PRE" ||
            element.tagName === "CODE"
        ) {

            result += "\n```";

            result += "\n";

            result += element.textContent;

            result += "\n```\n";

            return result;
        }

        /*
        -------------------------
        Walk children
        -------------------------
        */

        for (const child of element.childNodes) {

            result += this.walk(child);
        }

        return result;
    }

    /**
     * ==============================
     * Visibility Check
     * ==============================
     */
    private isVisible(element: HTMLElement): boolean {

        const style = window.getComputedStyle(element);

        if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.opacity === "0"
        ) {
            return false;
        }

        if (element.hidden) {
            return false;
        }

        if (
            element.getAttribute("aria-hidden") === "true"
        ) {
            return false;
        }

        return true;
    }

    /**
     * ==============================
     * Skip Elements
     * ==============================
     */
    private shouldSkip(element: HTMLElement): boolean {

        const skipTags = [

            "SCRIPT",

            "STYLE",

            "NOSCRIPT",

            "SVG",

            "IFRAME",

            "CANVAS",

            "FOOTER"

        ];

        if (
            skipTags.includes(element.tagName)
        ) {
            return true;
        }

        const id = (
            element.id || ""
        ).toLowerCase();

        const cls = (
            element.className || ""
        ).toLowerCase();

        const patterns = [

            "cookie",

            "advert",

            "ads",

            "banner",

            "popup",

            "subscribe",

            "newsletter",

            "tracking",

            "sponsor",

            "sidebar"

        ];

        return patterns.some(pattern =>
            id.includes(pattern) ||
            cls.includes(pattern)
        );
    }
}

export default new DOMExtractorService();