import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
    manifest_version: 3,

    name: "DevPilot AI",

    version: "1.0.0",

    description: "AI Full Stack Developer Assistant",

    action: {
        default_popup: "src/popup/index.html",
    },

    permissions: [
        "storage",
        "activeTab",
        "contextMenus",
        "notifications",
        "sidePanel",
    ],
    side_panel: {
        default_path: "sidepanel.html",
    },

    host_permissions: [
        "<all_urls>",
        "http://localhost:3000/*",
        "http://localhost:11434/*",
    ],

    background: {
        service_worker: "src/background/background.ts",
        type: "module",
    },

    content_scripts: [
        {
            matches: ["<all_urls>"],
            js: ["src/content/content.ts"],
        },
    ],
});