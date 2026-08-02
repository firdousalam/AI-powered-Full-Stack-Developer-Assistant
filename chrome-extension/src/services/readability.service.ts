import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

import type { ReadabilityResult } from "../types/readability.types";

class ReadabilityService {

    extract(html: string): ReadabilityResult | null {

        const dom = new JSDOM(html, {
            url: "https://example.com"
        });

        const reader = new Readability(dom.window.document);

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