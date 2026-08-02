import type { LinkInfo } from "../types/link.types";

class LinkExtractorService {

    /**
     * =====================================
     * Extract Links
     * =====================================
     */
    extract(document: Document): LinkInfo[] {

        const links: LinkInfo[] = [];

        const anchors = document.querySelectorAll("a[href]");

        anchors.forEach(anchor => {

            if (!this.isVisible(anchor)) {
                return;
            }

            const href = anchor.getAttribute("href");

            if (!href) {
                return;
            }

            // Ignore anchors & javascript links
            if (
                href.startsWith("#") ||
                href.startsWith("javascript:")
            ) {
                return;
            }

            let url: URL;

            try {

                url = new URL(
                    href,
                    window.location.href
                );

            } catch {

                return;

            }

            const text =
                anchor.textContent?.trim() || "";

            if (!text) {
                return;
            }

            links.push({

                text,

                href: url.href,

                title:
                    anchor.getAttribute("title") || "",

                hostname: url.hostname,

                isExternal:
                    url.hostname !==
                    window.location.hostname,

                rel:
                    anchor.getAttribute("rel") || ""

            });

        });

        return this.removeDuplicates(links);

    }

    /**
     * =====================================
     * Check Visibility
     * =====================================
     */
    private isVisible(element: Element): boolean {

        const html = element as HTMLElement;

        const style = window.getComputedStyle(html);

        return (

            style.display !== "none" &&

            style.visibility !== "hidden" &&

            html.offsetParent !== null

        );

    }

    /**
     * =====================================
     * Remove Duplicate Links
     * =====================================
     */
    private removeDuplicates(

        links: LinkInfo[]

    ): LinkInfo[] {

        const seen = new Set<string>();

        return links.filter(link => {

            if (seen.has(link.href)) {

                return false;

            }

            seen.add(link.href);

            return true;

        });

    }

}

export default new LinkExtractorService();