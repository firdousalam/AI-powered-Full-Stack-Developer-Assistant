// src/mcp/servers/filesystem/filesystem.types.ts

import { Stats } from "fs";

/* ============================================================
 * Filesystem Server
 * ============================================================ */

export interface FilesystemServerConfig {
    workspaceRoot: string;
    readOnly: boolean;
    maxFileSize: number;
    defaultEncoding: BufferEncoding;
    allowHiddenFiles: boolean;
    validatePaths: boolean;
}

/* ============================================================
 * File Information
 * ============================================================ */

export interface FileInfo {
    name: string;
    path: string;
    absolutePath: string;
    extension: string;
    size: number;
    isFile: boolean;
    isDirectory: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface FileContent extends FileInfo {
    content: string;
    encoding: BufferEncoding;
}

/* ============================================================
 * Directory Information
 * ============================================================ */

export interface DirectoryEntry {

    name: string;

    path: string;

    isFile: boolean;

    isDirectory: boolean;

    size?: number;

}


export interface DirectoryInfo {

    path: string;

    totalFiles: number;

    totalDirectories: number;

    entries: DirectoryEntry[];

}

/* ============================================================
 * Project Tree
 * ============================================================ */

export interface ProjectTreeNode {

    name: string;

    path: string;

    type: "file" | "directory";

    children?: ProjectTreeNode[];

}

export interface ProjectTree {

    root: string;

    nodes: ProjectTreeNode[];

}

/* ============================================================
 * Metadata
 * ============================================================ */

export interface FileMetadata {

    name: string;

    path: string;

    extension: string;

    size: number;

    createdAt: Date;

    modifiedAt: Date;

    accessedAt: Date;

    isFile: boolean;

    isDirectory: boolean;

    stats: Stats;

}

/* ============================================================
 * Search
 * ============================================================ */

export interface SearchOptions {

    recursive?: boolean;

    extension?: string;

    includeHidden?: boolean;

    maxResults?: number;

}

export interface SearchResult {

    name: string;

    path: string;

    absolutePath: string;

}

/* ============================================================
 * Read File Tool
 * ============================================================ */

export interface ReadFileArguments {

    path: string;

    encoding?: BufferEncoding;

}

export interface ReadFileResponse {

    success: boolean;

    file?: FileContent;

    error?: string;

}

/* ============================================================
 * List Directory Tool
 * ============================================================ */

export interface ListDirectoryArguments {

    path: string;

}

export interface ListDirectoryResponse {

    success: boolean;

    directory?: DirectoryInfo;

    error?: string;

}

/* ============================================================
 * File Exists Tool
 * ============================================================ */

export interface FileExistsArguments {

    path: string;

}

export interface FileExistsResponse {

    success: boolean;

    exists: boolean;

}

/* ============================================================
 * Metadata Tool
 * ============================================================ */

export interface FileMetadataArguments {

    path: string;

}

export interface FileMetadataResponse {

    success: boolean;

    metadata?: FileMetadata;

    error?: string;

}

/* ============================================================
 * Read Multiple Files
 * ============================================================ */

export interface ReadMultipleFilesArguments {

    paths: string[];

}

export interface ReadMultipleFilesResponse {

    success: boolean;

    files: FileContent[];

    failed: string[];

}

/* ============================================================
 * Search Files
 * ============================================================ */

export interface SearchFilesArguments {

    query: string;

    options?: SearchOptions;

}

export interface SearchFilesResponse {

    success: boolean;

    results: SearchResult[];

}

/* ============================================================
 * Project Tree Tool
 * ============================================================ */

export interface ProjectTreeArguments {

    path?: string;

}

export interface ProjectTreeResponse {

    success: boolean;

    tree?: ProjectTree;

    error?: string;

}

/* ============================================================
 * Generic Tool
 * ============================================================ */

export interface ToolExecutionRequest<T = unknown> {

    tool: string;

    arguments: T;

}

export interface ToolExecutionResponse<T = unknown> {

    success: boolean;

    result?: T;

    error?: string;

}

/* ============================================================
 * Filesystem Tool Definition
 * ============================================================ */

export interface FilesystemTool {

    name: string;

    description: string;

    inputSchema: Record<string, unknown>;

}

/* ============================================================
 * Validation
 * ============================================================ */

export interface PathValidationResult {

    valid: boolean;

    absolutePath?: string;

    error?: string;

}

/* ============================================================
 * Server Health
 * ============================================================ */

export interface FilesystemHealth {

    status: "healthy" | "degraded" | "unhealthy";

    workspace: string;

    uptime: number;

    lastChecked: Date;

}

/* ============================================================
 * Error Model
 * ============================================================ */

export interface FilesystemError {

    code: string;

    message: string;

    path?: string;

}

/* ============================================================
 * Logger Context
 * ============================================================ */

export interface FilesystemLogContext {

    tool: string;

    path?: string;

    duration?: number;

    success: boolean;

}

/* ============================================================
 * Module Exports
 * ============================================================ */

export type FilesystemToolArguments =
    | ReadFileArguments
    | ListDirectoryArguments
    | FileExistsArguments
    | FileMetadataArguments
    | ReadMultipleFilesArguments
    | SearchFilesArguments
    | ProjectTreeArguments;

export type FilesystemToolResponses =
    | ReadFileResponse
    | ListDirectoryResponse
    | FileExistsResponse
    | FileMetadataResponse
    | ReadMultipleFilesResponse
    | SearchFilesResponse
    | ProjectTreeResponse;
