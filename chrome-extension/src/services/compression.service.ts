import type {

    BrowserContext,
    BrowserLink,
    CodeBlock

} from "../types/browserContext.types";

export class CompressionService {

    compress(

        context: BrowserContext

    ): BrowserContext {

        context.article =

            this.cleanText(context.article);

        context.markdown =

            this.cleanText(context.markdown);

        context.headings =

            this.removeDuplicateHeadings(

                context.headings

            );

        context.links =

            this.removeDuplicateLinks(

                context.links

            );

        context.codeBlocks =

            this.removeDuplicateCode(

                context.codeBlocks

            );

        return context;

    }

    /**
     * ===============================
     * Clean Text
     * ===============================
     */
    private cleanText(

        text: string

    ): string {

        return text

            .replace(/\s+/g, " ")

            .replace(/\n{3,}/g, "\n\n")

            .trim();

    }

    /**
     * ===============================
     * Remove Duplicate Headings
     * ===============================
     */
    private removeDuplicateHeadings(

        headings: BrowserContext["headings"]

    ) {

        return headings.filter(

            (heading, index, self) =>

                index ===

                self.findIndex(

                    h =>

                        h.level === heading.level &&

                        h.text === heading.text

                )

        );

    }

    /**
     * ===============================
     * Remove Duplicate Links
     * ===============================
     */
    private removeDuplicateLinks(

        links: BrowserLink[]

    ): BrowserLink[] {

        return links.filter(

            (link, index, self) =>

                index ===

                self.findIndex(

                    l => l.href === link.href

                )

        );

    }

    /**
     * ===============================
     * Remove Duplicate Code Blocks
     * ===============================
     */
    private removeDuplicateCode(

        blocks: CodeBlock[]

    ): CodeBlock[] {

        return blocks.filter(

            (block, index, self) =>

                index ===

                self.findIndex(

                    b =>

                        b.language === block.language &&

                        b.code === block.code

                )

        );

    }

}

export default new CompressionService();