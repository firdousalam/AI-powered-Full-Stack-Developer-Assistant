// src/mcp/servers/filesystem/filesystem.constants.ts

import path from "path";

/**
 * Root workspace that the Filesystem MCP Server
 * is allowed to access.
 *
 * Change this value if you want to restrict
 * the server to another project.
 */
export const WORKSPACE_ROOT =
    process.env.WORKSPACE_ROOT ||
    process.cwd();

/**
 * Maximum file size that can be read.
 * (5 MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Default text encoding.
 */
export const DEFAULT_ENCODING: BufferEncoding = "utf-8";

/**
 * Default timeout for filesystem operations.
 */
export const FILESYSTEM_TIMEOUT = 10000;

/**
 * Maximum directory depth for recursive operations.
 */
export const MAX_DIRECTORY_DEPTH = 10;

/**
 * Maximum number of files returned
 * by search or directory listing.
 */
export const MAX_RESULTS = 1000;

/**
 * Hidden files.
 */
export const INCLUDE_HIDDEN_FILES = false;

/**
 * Whether symbolic links are allowed.
 */
export const ALLOW_SYMBOLIC_LINKS = false;

/**
 * Directories ignored during traversal.
 */
export const IGNORED_DIRECTORIES = [
    ".git",
    ".github",
    ".husky",
    ".vscode",
    ".idea",
    ".next",
    ".nuxt",
    ".turbo",
    ".cache",
    ".vercel",
    ".output",
    "coverage",
    "dist",
    "build",
    "out",
    "logs",
    "tmp",
    "temp",
    "node_modules"
] as const;

/**
 * Files ignored during searches.
 */
export const IGNORED_FILES = [
    ".DS_Store",
    "Thumbs.db",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml"
] as const;

/**
 * Binary extensions that should never
 * be returned as text.
 */
export const BINARY_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".webp",
    ".ico",
    ".pdf",
    ".zip",
    ".rar",
    ".7z",
    ".exe",
    ".dll",
    ".so",
    ".dylib",
    ".jar",
    ".class",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".mp3",
    ".mp4",
    ".avi",
    ".mov",
    ".mkv"
] as const;

/**
 * File extensions that are safe to read.
 */
export const SUPPORTED_TEXT_EXTENSIONS = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".json",
    ".md",
    ".txt",
    ".html",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".xml",
    ".yaml",
    ".yml",
    ".env",
    ".gitignore",
    ".dockerignore",
    ".editorconfig",
    ".npmrc",
    ".prettierrc",
    ".eslintrc",
    ".graphql",
    ".sql",
    ".sh",
    ".bat",
    ".ps1"
] as const;

/**
 * Common configuration files
 * that the AI frequently analyzes.
 */
export const IMPORTANT_FILES = [
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "webpack.config.js",
    "docker-compose.yml",
    "Dockerfile",
    "README.md",
    ".env",
    ".env.example",
    "nest-cli.json",
    "angular.json",
    "next.config.js",
    "tailwind.config.js",
    "eslint.config.js"
] as const;

/**
 * Filesystem Tool Names
 */
export const FILESYSTEM_TOOLS = {

    READ_FILE: "readFile",

    LIST_DIRECTORY: "listDirectory",

    FILE_EXISTS: "fileExists",

    FILE_METADATA: "fileMetadata",

    READ_MULTIPLE_FILES: "readMultipleFiles",

    SEARCH_FILES: "searchFiles",

    PROJECT_TREE: "projectTree",

    FIND_TODOS: "findTodos",

    ANALYZE_SOURCE: "analyzeSource"

} as const;

/**
 * Health Check Configuration
 */
export const HEALTH_CONFIG = {

    enabled: true,

    interval: 30000,

    timeout: 5000

} as const;

/**
 * Retry Configuration
 */
export const RETRY_CONFIG = {

    attempts: 3,

    delay: 1000

} as const;

/**
 * Security Configuration
 */
export const SECURITY_CONFIG = {

    restrictWorkspace: true,

    validatePaths: true,

    allowHiddenFiles: false,

    maxFileSize: MAX_FILE_SIZE

} as const;

/**
 * Helper Paths
 */
export const DEFAULT_PATHS = {

    SRC: path.join(WORKSPACE_ROOT, "src"),

    TEST: path.join(WORKSPACE_ROOT, "test"),

    DOCS: path.join(WORKSPACE_ROOT, "docs"),

    PUBLIC: path.join(WORKSPACE_ROOT, "public")

} as const;
