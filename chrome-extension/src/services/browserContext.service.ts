/// <reference types="chrome"/>

import type { BrowserContext } from "../types/browserContext.types";

class BrowserContextService {

    /**
     * =====================================
     * Get Browser Context From Content Script
     * =====================================
     */
    async getBrowserContext(): Promise<BrowserContext> {

        try {

            const tabs = await chrome.tabs.query({

                active: true,

                currentWindow: true

            });

            if (!tabs.length || !tabs[0].id) {

                throw new Error("No active tab found.");

            }

            const context = await chrome.tabs.sendMessage(

                tabs[0].id,

                {

                    type: "GET_BROWSER_CONTEXT"

                }

            );

            return context as BrowserContext;

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