import type { Heading } from "../types/heading.types";

class HeadingExtractorService {

    /**
     * =====================================
     * Extract Document Headings
     * =====================================
     */
    extract(document: Document): Heading[] {

        const headings: Heading[] = [];

        const elements = document.querySelectorAll(
            "h1,h2,h3,h4,h5,h6"
        );

        elements.forEach((element) => {

            if (!this.isVisible(element)) {
                return;
            }

            const text = element.textContent?.trim();

            if (!text) {
                return;
            }

            headings.push({

                level: Number(
                    element.tagName.substring(1)
                ),

                text,

                id: element.id || "",

                selector: this.getSelector(element)

            });

        });

        return this.removeDuplicates(headings);

    }

    /**
     * =====================================
     * Check Visibility
     * =====================================
     */
    private isVisible(element: Element): boolean {

        const htmlElement = element as HTMLElement;

        const style = window.getComputedStyle(htmlElement);

        return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            htmlElement.offsetParent !== null
        );

    }

    /**
     * =====================================
     * Generate CSS Selector
     * =====================================
     */
    private getSelector(element: Element): string {

        if (element.id) {
            return `#${element.id}`;
        }

        const parts: string[] = [];

        let current: Element | null = element;

        while (
            current &&
            current.nodeType === Node.ELEMENT_NODE
        ) {

            let selector = current.tagName.toLowerCase();

            if (current.classList.length) {

                selector += "." + [...current.classList]
                    .slice(0, 2)
                    .join(".");

            }

            parts.unshift(selector);

            current = current.parentElement;

        }

        return parts.join(" > ");

    }

    /**
     * =====================================
     * Remove Duplicate Headings
     * =====================================
     */
    private removeDuplicates(

        headings: Heading[]

    ): Heading[] {

        const seen = new Set<string>();

        return headings.filter((heading) => {

            const key = `${heading.level}-${heading.text}`;

            if (seen.has(key)) {

                return false;

            }

            seen.add(key);

            return true;

        });

    }

}

export default new HeadingExtractorService();