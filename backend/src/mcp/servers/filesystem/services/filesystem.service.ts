import { promises as fs } from "node:fs";
import path from "node:path";

import { FileMetadata } from "../models";

export class FilesystemService {

    /**
     * Checks whether a file or directory exists.
     */
    async exists(targetPath: string): Promise<boolean> {

        try {

            await fs.access(targetPath);

            return true;

        } catch {

            return false;

        }

    }

    /**
     * Reads a UTF-8 text file.
     */
    async readFile(filePath: string): Promise<string> {

        return fs.readFile(filePath, "utf-8");

    }

    /**
     * Reads and parses JSON.
     */
    async readJson<T>(filePath: string): Promise<T | null> {

        if (!(await this.exists(filePath))) {

            return null;

        }

        const content = await this.readFile(filePath);

        try {

            return JSON.parse(content) as T;

        } catch (error) {

            throw new Error(
                `Invalid JSON file: ${filePath}\n${error instanceof Error
                    ? error.message
                    : String(error)
                }`
            );

        }

    }

    /**
     * Lists directory contents.
     */
    async listDirectory(directoryPath: string): Promise<string[]> {

        return fs.readdir(directoryPath);

    }

    /**
     * Returns file metadata.
     */
    async getMetadata(targetPath: string): Promise<FileMetadata | null> {

        if (!(await this.exists(targetPath))) {

            return null;

        }

        const stats = await fs.stat(targetPath);

        return {

            path: targetPath,

            name: path.basename(targetPath),

            extension: path.extname(targetPath),

            exists: true,

            isFile: stats.isFile(),

            isDirectory: stats.isDirectory(),

            size: stats.size,

            createdAt: stats.birthtime,

            modifiedAt: stats.mtime

        };

    }

    /**
     * Returns true if directory.
     */
    async isDirectory(targetPath: string): Promise<boolean> {

        const metadata = await this.getMetadata(targetPath);

        return metadata?.isDirectory ?? false;

    }

    /**
     * Returns true if file.
     */
    async isFile(targetPath: string): Promise<boolean> {

        const metadata = await this.getMetadata(targetPath);

        return metadata?.isFile ?? false;

    }

    /**
     * Path helper.
     */
    join(...segments: string[]): string {

        return path.join(...segments);

    }

    /**
     * Path helper.
     */
    resolve(...segments: string[]): string {

        return path.resolve(...segments);

    }

}