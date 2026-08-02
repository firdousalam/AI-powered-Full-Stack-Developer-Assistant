/**
 * ==========================================
 * Browser Context Interface
 * ==========================================
 *
 * Represents metadata collected from
 * the active browser tab.
 */

export interface BrowserContext {

    /**
     * Current page URL
     */
    url: string;

    /**
     * Current page title
     */
    title: string;

    /**
     * Hostname
     *
     * Example:
     * react.dev
     */
    hostname: string;

    /**
     * Protocol
     *
     * Example:
     * https
     */
    protocol: string;

    /**
     * Browser language
     *
     * Example:
     * en-US
     */
    language: string;

    /**
     * Selected text on the page
     */
    selectedText?: string;

    /**
     * Chrome Tab ID
     */
    tabId?: number;

    /**
     * Chrome Window ID
     */
    windowId?: number;

    /**
     * ISO Timestamp
     */
    timestamp: string;

}