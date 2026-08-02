import readabilityService from "./readability.service";
import markdownService from "./markdown.service";
import codeExtractorService from "./codeExtractor.service";
import headingExtractorService from "./headingExtractor.service";
import linkExtractorService from "./linkExtractor.service";
import tableExtractorService from "./tableExtractor.service";
import formExtractorService from "./formExtractor.service";

import type {
    BrowserContext
} from "../types/browserContext.types";



class ContextBuilderService {

    build(): BrowserContext {
        const html = document.documentElement.outerHTML;

        const article =
            readabilityService.extract(html);

        const markdown = article
            ? markdownService.convert(article.content)
            : "";
        const headings = headingExtractorService.extract(document);

        const links = linkExtractorService.extract(document);

        const tables = tableExtractorService.extract(document);

        const forms = formExtractorService.extract(document);


        const codeBlocks = codeExtractorService.extract(document);

        return {

            metadata: {

                url: location.href,

                title: document.title,

                hostname: location.hostname,

                protocol: location.protocol,

                language:
                    navigator.language,

                timestamp:
                    new Date().toISOString()

            },

            article: article?.textContent ?? "",

            markdown,

            codeBlocks:
                codeBlocks,

            headings:
                headings,

            links:
                links,

            tables:
                tables,

            forms:
                forms

        };




    }


}

export default new ContextBuilderService();