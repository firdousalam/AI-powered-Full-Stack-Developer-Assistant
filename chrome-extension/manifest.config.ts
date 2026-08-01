import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
    "manifest_version": 3,

    "name": "Zeba AI",

    "description": "AI-powered Full Stack Developer Assistant",

    "version": "1.0.0",

    "permissions": [
        "tabs",
        "activeTab",
        "storage",
        "scripting"
    ],

    "host_permissions": [
        "<all_urls>"
    ],

    "background": {
        "service_worker": "src/background/background.js",
        "type": "module"
    },

    "action": {
        "default_popup": "src/popup/index.html"
    },

    "content_scripts": [
        {
            "matches": [
                "<all_urls>"
            ],
            "js": [
                "src/content/content.js"
            ],
            "run_at": "document_idle"
        }
    ]
});