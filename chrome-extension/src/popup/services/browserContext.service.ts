

/// <reference types="chrome"/>

import type { BrowserContext } from "../types/browser.types";


class BrowserContextService {

    /**
     * Get the currently active browser tab.
     */
    private async getActiveTab(): Promise<chrome.tabs.Tab> {

        const tabs = await chrome.tabs.query({

            active: true,

            currentWindow: true

        });

        if (!tabs.length) {

            throw new Error("No active browser tab found.");

        }

        return tabs[0];

    }

    /**
     * Collect browser context.
     */
    async getBrowserContext(): Promise<BrowserContext> {

        try {

            const tab = await this.getActiveTab();

            const url = tab.url ?? "";

            const parsedUrl = new URL(url);

            return {

                url,

                title: tab.title ?? "",

                hostname: parsedUrl.hostname,

                protocol: parsedUrl.protocol.replace(":", ""),

                language: navigator.language,

                tabId: tab.id ?? -1,

                windowId: tab.windowId,

                timestamp: new Date().toISOString()

            };

        }

        catch (error) {

            console.error(

                "Browser Context Error:",

                error

            );

            throw error;

        }

    }

}

export default new BrowserContextService();