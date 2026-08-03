import fs from "fs";
import path from "path";
import { promisify } from "util";

import {
    DEFAULT_ENCODING,
    WORKSPACE_ROOT,
    MAX_FILE_SIZE,
    INCLUDE_HIDDEN_FILES,
    SUPPORTED_TEXT_EXTENSIONS,
    BINARY_EXTENSIONS,
    IGNORED_DIRECTORIES,
    IGNORED_FILES
} from "./filesystem.constants";

import {
    FileContent,
    FileMetadata,
    DirectoryEntry,
    DirectoryInfo,
    PathValidationResult,
    FilesystemServerConfig,
    FilesystemLogContext,
    ProjectTree,
    SearchResult,
    ProjectTreeNode

} from "./filesystem.types";

import MCPLogger from "../../logger/mcpLogger";

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const access = promisify(fs.access);

export class FilesystemService {

    private readonly workspaceRoot: string;

    private readonly config: FilesystemServerConfig;

    constructor(config?: Partial<FilesystemServerConfig>) {

        this.workspaceRoot = path.resolve(
            config?.workspaceRoot ?? WORKSPACE_ROOT
        );

        this.config = {
            workspaceRoot: this.workspaceRoot,
            readOnly: config?.readOnly ?? true,
            maxFileSize: config?.maxFileSize ?? MAX_FILE_SIZE,
            defaultEncoding:
                config?.defaultEncoding ?? DEFAULT_ENCODING,
            allowHiddenFiles:
                config?.allowHiddenFiles ?? INCLUDE_HIDDEN_FILES,
            validatePaths:
                config?.validatePaths ?? true
        };

        this.initializeWorkspace();
    }

    /**
     * Initialize workspace.
     */
    private initializeWorkspace(): void {

        if (!fs.existsSync(this.workspaceRoot)) {

            throw new Error(
                `Workspace does not exist: ${this.workspaceRoot}`
            );

        }

        MCPLogger.info(
            `Filesystem workspace initialized: ${this.workspaceRoot}`
        );
    }

    /**
     * Returns workspace root.
     */
    public getWorkspaceRoot(): string {

        return this.workspaceRoot;

    }

    /**
     * Returns service configuration.
     */
    public getConfiguration(): FilesystemServerConfig {

        return this.config;

    }

    /**
     * Normalize incoming path.
     */
    public normalizePath(filePath: string): string {

        if (!filePath) {

            throw new Error("Path cannot be empty.");

        }

        const normalized = path.normalize(filePath.trim());

        return normalized.replace(/\\/g, path.sep);

    }

    /**
     * Convert relative path
     * to workspace absolute path.
     */
    public resolvePath(filePath: string): string {

        const normalized = this.normalizePath(filePath);

        if (path.isAbsolute(normalized)) {

            return path.resolve(normalized);

        }

        return path.resolve(
            this.workspaceRoot,
            normalized
        );

    }

    /**
     * Validate path.
     */
    public validatePath(filePath: string): PathValidationResult {

        try {

            const absolutePath =
                this.resolvePath(filePath);

            if (this.config.validatePaths) {

                if (
                    !absolutePath.startsWith(this.workspaceRoot)
                ) {

                    return {

                        valid: false,

                        error:
                            "Access outside workspace is not permitted."

                    };

                }

            }

            return {

                valid: true,

                absolutePath

            };

        } catch (error) {

            return {

                valid: false,

                error:
                    error instanceof Error
                        ? error.message
                        : "Invalid path"

            };

        }

    }

    /**
     * Ensure workspace restriction.
     */
    public ensureWorkspace(filePath: string): string {

        const validation =
            this.validatePath(filePath);

        if (!validation.valid || !validation.absolutePath) {

            throw new Error(
                validation.error ??
                "Workspace validation failed."
            );

        }

        return validation.absolutePath;

    }

    /**
     * Verify file exists.
     */
    protected async verifyExists(
        absolutePath: string
    ): Promise<void> {

        await access(
            absolutePath,
            fs.constants.F_OK
        );

    }

    /**
     * Verify read access.
     */
    protected async verifyReadable(
        absolutePath: string
    ): Promise<void> {

        await access(
            absolutePath,
            fs.constants.R_OK
        );

    }

    /**
     * Verify maximum file size.
     */
    protected async verifyFileSize(
        absolutePath: string
    ): Promise<void> {

        const info = await stat(absolutePath);

        if (info.size > this.config.maxFileSize) {

            throw new Error(
                `Maximum file size exceeded (${this.config.maxFileSize} bytes).`
            );

        }

    }

    /**
     * Ignore hidden files.
     */
    protected isHidden(name: string): boolean {

        if (this.config.allowHiddenFiles) {

            return false;

        }

        return name.startsWith(".");

    }

    /**
     * Ignore configured directories.
     */
    protected isIgnoredDirectory(
        directory: string
    ): boolean {

        return IGNORED_DIRECTORIES.includes(
            directory as any
        );

    }

    /**
     * Ignore configured files.
     */
    protected isIgnoredFile(
        fileName: string
    ): boolean {

        return IGNORED_FILES.includes(
            fileName as any
        );

    }

    /**
     * Detect binary file.
     */
    protected isBinaryFile(
        absolutePath: string
    ): boolean {

        const extension =
            path.extname(absolutePath).toLowerCase();

        return BINARY_EXTENSIONS.includes(
            extension as any
        );

    }

    /**
     * Validate readable extension.
     */
    protected isSupportedExtension(
        absolutePath: string
    ): boolean {

        const extension =
            path.extname(absolutePath).toLowerCase();

        if (extension === "") {

            return true;

        }

        return SUPPORTED_TEXT_EXTENSIONS.includes(
            extension as any
        );

    }

    /**
     * Log operation.
     */
    protected log(
        context: FilesystemLogContext
    ): void {

        if (context.success) {

            MCPLogger.info(
                `[Filesystem] ${context.tool} ${context.path ?? ""}`
            );

        } else {

            MCPLogger.error(
                `[Filesystem] ${context.tool} failed ${context.path ?? ""}`
            );

        }

    }

    /**
     * Build file metadata.
     */
    protected async buildMetadata(
        absolutePath: string
    ): Promise<FileMetadata> {

        const stats = await stat(absolutePath);

        return {

            name: path.basename(absolutePath),

            path: path.relative(
                this.workspaceRoot,
                absolutePath
            ),

            extension: path.extname(absolutePath),

            size: stats.size,

            createdAt: stats.birthtime,

            modifiedAt: stats.mtime,

            accessedAt: stats.atime,

            isFile: stats.isFile(),

            isDirectory: stats.isDirectory(),

            stats

        };

    }

    /**
 * Read a file from the workspace.
 */
    public async readFile(
        filePath: string,
        encoding: BufferEncoding = this.config.defaultEncoding
    ): Promise<FileContent> {

        const start = Date.now();

        const absolutePath = this.ensureWorkspace(filePath);

        await this.verifyExists(absolutePath);
        await this.verifyReadable(absolutePath);
        await this.verifyFileSize(absolutePath);

        if (this.isBinaryFile(absolutePath)) {
            throw new Error("Binary files are not supported.");
        }

        if (!this.isSupportedExtension(absolutePath)) {
            throw new Error("Unsupported file extension.");
        }

        const metadata = await this.buildMetadata(absolutePath);

        const content = await readFile(
            absolutePath,
            encoding
        );

        this.log({
            tool: "readFile",
            path: filePath,
            duration: Date.now() - start,
            success: true
        });

        return {
            name: metadata.name,
            path: metadata.path,
            absolutePath,
            extension: metadata.extension,
            size: metadata.size,
            isFile: metadata.isFile,
            isDirectory: metadata.isDirectory,
            createdAt: metadata.createdAt,
            updatedAt: metadata.modifiedAt,
            content,
            encoding
        };
    }

    /**
     * Check whether a file exists.
     */
    public async fileExists(
        filePath: string
    ): Promise<boolean> {

        try {

            const absolutePath =
                this.ensureWorkspace(filePath);

            await access(
                absolutePath,
                fs.constants.F_OK
            );

            return true;

        } catch {

            return false;

        }

    }

    /**
     * Retrieve metadata for a file.
     */
    public async getFileMetadata(
        filePath: string
    ): Promise<FileMetadata> {

        const start = Date.now();

        const absolutePath =
            this.ensureWorkspace(filePath);

        await this.verifyExists(absolutePath);

        const metadata =
            await this.buildMetadata(absolutePath);

        this.log({
            tool: "fileMetadata",
            path: filePath,
            duration: Date.now() - start,
            success: true
        });

        return metadata;

    }

    /**
     * List directory contents.
     */
    public async listDirectory(
        directoryPath = "."
    ): Promise<DirectoryInfo> {

        const start = Date.now();

        const absolutePath =
            this.ensureWorkspace(directoryPath);

        const directoryStats =
            await stat(absolutePath);

        if (!directoryStats.isDirectory()) {

            throw new Error(
                `${directoryPath} is not a directory.`
            );

        }

        const items =
            await readdir(absolutePath);

        const entries: DirectoryEntry[] = [];

        let totalFiles = 0;
        let totalDirectories = 0;

        for (const item of items) {

            if (
                this.isHidden(item) ||
                this.isIgnoredFile(item) ||
                this.isIgnoredDirectory(item)
            ) {
                continue;
            }

            const fullPath =
                path.join(absolutePath, item);

            const itemStats =
                await stat(fullPath);

            const entry: DirectoryEntry = {

                name: item,

                path: path.relative(
                    this.workspaceRoot,
                    fullPath
                ),

                isFile: itemStats.isFile(),

                isDirectory:
                    itemStats.isDirectory(),

                size: itemStats.isFile()
                    ? itemStats.size
                    : undefined

            };

            if (entry.isDirectory) {

                totalDirectories++;

            } else {

                totalFiles++;

            }

            entries.push(entry);

        }

        entries.sort((a, b) => {

            if (
                a.isDirectory &&
                !b.isDirectory
            ) {
                return -1;
            }

            if (
                !a.isDirectory &&
                b.isDirectory
            ) {
                return 1;
            }

            return a.name.localeCompare(b.name);

        });

        this.log({

            tool: "listDirectory",

            path: directoryPath,

            duration: Date.now() - start,

            success: true

        });

        return {

            path: path.relative(
                this.workspaceRoot,
                absolutePath
            ),

            totalFiles,

            totalDirectories,

            entries

        };

    }


    /**
     * Read multiple files in a single request.
     */
    public async readMultipleFiles(
        filePaths: string[]
    ): Promise<FileContent[]> {

        const results: FileContent[] = [];

        for (const filePath of filePaths) {

            try {

                const file =
                    await this.readFile(filePath);

                results.push(file);

            } catch (error) {

                this.log({

                    tool: "readMultipleFiles",

                    path: filePath,

                    success: false

                });

            }

        }

        return results;

    }

    /**
     * Search files by name.
     */
    public async searchFiles(
        query: string,
        directory = "."
    ): Promise<SearchResult[]> {

        const absolutePath =
            this.ensureWorkspace(directory);

        const results: SearchResult[] = [];

        await this.searchRecursive(
            absolutePath,
            query.toLowerCase(),
            results
        );

        return results;

    }

    /**
     * Recursive file search.
     */
    private async searchRecursive(
        currentPath: string,
        query: string,
        results: SearchResult[]
    ): Promise<void> {

        const entries =
            await readdir(currentPath);

        for (const entry of entries) {

            if (this.isHidden(entry)) {

                continue;

            }

            if (this.isIgnoredDirectory(entry)) {

                continue;

            }

            if (this.isIgnoredFile(entry)) {

                continue;

            }

            const absolutePath =
                path.join(currentPath, entry);

            const stats =
                await stat(absolutePath);

            if (entry.toLowerCase().includes(query)) {

                results.push({

                    name: entry,

                    path: path.relative(
                        this.workspaceRoot,
                        absolutePath
                    ),

                    absolutePath

                });

            }

            if (stats.isDirectory()) {

                await this.searchRecursive(
                    absolutePath,
                    query,
                    results
                );

            }

        }

    }

    /**
     * Build project directory tree.
     */
    public async buildProjectTree(
        directory = "."
    ): Promise<ProjectTree> {

        const absolutePath =
            this.ensureWorkspace(directory);

        const nodes =
            await this.buildTree(absolutePath);

        return {

            root: path.relative(
                this.workspaceRoot,
                absolutePath
            ),

            nodes

        };

    }

    /**
     * Recursive tree builder.
     */
    private async buildTree(
        directory: string
    ): Promise<ProjectTreeNode[]> {

        const entries =
            await readdir(directory);

        const nodes: ProjectTreeNode[] = [];

        for (const entry of entries) {

            if (this.isHidden(entry)) {

                continue;

            }

            if (this.isIgnoredDirectory(entry)) {

                continue;

            }

            if (this.isIgnoredFile(entry)) {

                continue;

            }

            const absolutePath =
                path.join(directory, entry);

            const stats =
                await stat(absolutePath);

            if (stats.isDirectory()) {

                nodes.push({

                    name: entry,

                    path: path.relative(
                        this.workspaceRoot,
                        absolutePath
                    ),

                    type: "directory",

                    children:
                        await this.buildTree(
                            absolutePath
                        )

                });

            } else {

                nodes.push({

                    name: entry,

                    path: path.relative(
                        this.workspaceRoot,
                        absolutePath
                    ),

                    type: "file"

                });

            }

        }

        nodes.sort((a, b) => {

            if (
                a.type === "directory" &&
                b.type === "file"
            ) {

                return -1;

            }

            if (
                a.type === "file" &&
                b.type === "directory"
            ) {

                return 1;

            }

            return a.name.localeCompare(b.name);

        });

        return nodes;

    }

    /**
     * Read text from multiple files and
     * concatenate into a single string.
     */
    public async readFilesAsContext(
        files: string[]
    ): Promise<string> {

        const chunks: string[] = [];

        for (const file of files) {

            try {

                const result =
                    await this.readFile(file);

                chunks.push(

                    `========== ${result.path} ==========\n`

                );

                chunks.push(result.content);

                chunks.push("\n");

            } catch {

                continue;

            }

        }

        return chunks.join("");

    }

    /**
     * Find all files with a given extension.
     */
    public async findFilesByExtension(
        extension: string,
        directory = "."
    ): Promise<SearchResult[]> {

        return this.searchByExtension(

            this.ensureWorkspace(directory),

            extension.toLowerCase()

        );

    }

    private async searchByExtension(
        directory: string,
        extension: string
    ): Promise<SearchResult[]> {

        const results: SearchResult[] = [];

        const entries =
            await readdir(directory);

        for (const entry of entries) {

            if (this.isHidden(entry)) {

                continue;

            }

            const absolutePath =
                path.join(directory, entry);

            const stats =
                await stat(absolutePath);

            if (stats.isDirectory()) {

                const children =
                    await this.searchByExtension(
                        absolutePath,
                        extension
                    );

                results.push(...children);

            } else {

                if (
                    path.extname(entry).toLowerCase() ===
                    extension
                ) {

                    results.push({

                        name: entry,

                        path: path.relative(
                            this.workspaceRoot,
                            absolutePath
                        ),

                        absolutePath

                    });

                }

            }

        }

        return results;

    }

    ////////////part 4 //////////////

    /**
 * Determines whether a path is inside the configured workspace.
 */
    private isWithinWorkspace(absolutePath: string): boolean {

        const normalizedWorkspace =
            path.resolve(this.workspaceRoot);

        const normalizedTarget =
            path.resolve(absolutePath);

        return normalizedTarget.startsWith(
            normalizedWorkspace
        );

    }

    /**
     * Convert an absolute path to a workspace-relative path.
     */
    private toRelativePath(
        absolutePath: string
    ): string {

        return path.relative(
            this.workspaceRoot,
            absolutePath
        );

    }

    /**
     * Returns the extension in lowercase.
     */
    private getExtension(
        filePath: string
    ): string {

        return path.extname(filePath).toLowerCase();

    }

    /**
     * Determine whether the supplied path
     * represents a supported text file.
     */
    private isTextFile(
        filePath: string
    ): boolean {

        const extension =
            this.getExtension(filePath);

        if (!extension) {

            return true;

        }

        return SUPPORTED_TEXT_EXTENSIONS.includes(
            extension as any
        );

    }

    /**
     * Determine whether a file should be ignored.
     */
    private shouldIgnore(
        fileName: string
    ): boolean {

        if (this.isHidden(fileName)) {

            return true;

        }

        if (this.isIgnoredFile(fileName)) {

            return true;

        }

        return false;

    }

    /**
     * Safely read fs.Stats.
     */
    private async getStats(
        absolutePath: string
    ): Promise<fs.Stats | null> {

        try {

            return await stat(absolutePath);

        } catch {

            return null;

        }

    }

    /**
     * Check whether the path is a directory.
     */
    private async isDirectory(
        absolutePath: string
    ): Promise<boolean> {

        const stats =
            await this.getStats(absolutePath);

        return stats?.isDirectory() ?? false;

    }

    /**
     * Check whether the path is a file.
     */
    private async isFile(
        absolutePath: string
    ): Promise<boolean> {

        const stats =
            await this.getStats(absolutePath);

        return stats?.isFile() ?? false;

    }

    /**
     * Standardized error logging.
     */
    private logError(
        tool: string,
        error: unknown,
        filePath?: string
    ): void {

        MCPLogger.error(

            `[Filesystem] ${tool}`,

            {

                path: filePath,

                error:
                    error instanceof Error
                        ? error.message
                        : error

            }

        );

    }

    /**
     * Standardized success logging.
     */
    private logSuccess(
        tool: string,
        filePath?: string
    ): void {

        MCPLogger.info(

            `[Filesystem] ${tool}`

        );

    }

    /**
     * Wrap async operations with
     * common logging and error handling.
     */
    protected async execute<T>(
        tool: string,
        operation: () => Promise<T>,
        filePath?: string
    ): Promise<T> {

        const started = Date.now();

        try {

            const result =
                await operation();

            MCPLogger.info(

                `[Filesystem] ${tool} completed`

            );

            return result;

        } catch (error) {

            MCPLogger.error(

                `[Filesystem] ${tool} failed`,

                {

                    path: filePath,

                    duration:
                        Date.now() - started,

                    error:
                        error instanceof Error
                            ? error.message
                            : error

                }

            );

            throw error;

        }

    }

    /**
     * Returns server health information.
     */
    public async health() {

        try {

            const exists =
                fs.existsSync(this.workspaceRoot);

            return {

                status:
                    exists
                        ? "healthy"
                        : "unhealthy",

                workspace:
                    this.workspaceRoot,

                timestamp:
                    new Date().toISOString()

            };

        } catch {

            return {

                status: "unhealthy",

                workspace:
                    this.workspaceRoot,

                timestamp:
                    new Date().toISOString()

            };

        }

    }

    /**
     * Dispose resources.
     */
    public async dispose(): Promise<void> {

        MCPLogger.info(

            "FilesystemService disposed."

        );

    }




}