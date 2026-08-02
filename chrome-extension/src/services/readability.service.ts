import { Readability } from "@mozilla/readability";

import type { ReadabilityResult } from "../types/readability.types";

class ReadabilityService {

    /**
     * =====================================
     * Extract Main Article
     * =====================================
     */
    extract(document: Document): ReadabilityResult | null {

        const clonedDocument = document.cloneNode(true) as Document;

        const reader = new Readability(clonedDocument);

        const article = reader.parse();

        if (!article) {

            return null;

        }

        return {

            title: article.title ?? "",

            byline: article.byline ?? "",

            excerpt: article.excerpt ?? "",

            content: article.content ?? "",

            textContent: article.textContent ?? "",

            length: article.length ?? 0,

            siteName: article.siteName ?? ""

        };

    }

}

export default new ReadabilityService();