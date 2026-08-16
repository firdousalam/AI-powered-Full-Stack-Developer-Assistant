// src/mcp/servers/github/github.constants.ts

/**
 * GitHub MCP configuration.
 */
export const GITHUB_CONFIG = {
    API_URL: "https://api.github.com",
    TOKEN_ENV: "GITHUB_TOKEN"
} as const;

/**
 * GitHub MCP server metadata.
 */
export const GITHUB_SERVER = {
    ID: "github-server",
    NAME: "GitHub MCP Server",
    VERSION: "1.0.0",
    TRANSPORT: "local"
} as const;

/**
 * GitHub MCP tool names.
 *
 * Tools will be implemented incrementally in later 5.7.x steps.
 */
export const GITHUB_TOOLS = {
    GET_REPOSITORY: "getRepository",
    GET_REPOSITORY_CONTENTS: "getRepositoryContents",
    GET_FILE: "getFile",
    SEARCH_CODE: "searchCode",
    GET_ISSUES: "getIssues",
    GET_PULL_REQUESTS: "getPullRequests",
    GET_BRANCHES: "getBranches",
    GET_COMMITS: "getCommits"
} as const;