import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import {
    DEFAULT_GIT_PATH,
    DEFAULT_GIT_TIMEOUT,
    MAX_GIT_TIMEOUT,
    MIN_GIT_TIMEOUT,
} from './git.constants';

import type {
    GitCommandOptions,
    GitCommandResult,
    GitConfig,
    GitRepository,
} from './git.types';

const execFileAsync = promisify(execFile);

/**
 * GitService
 *
 * Provides controlled execution of Git commands and
 * repository-level validation.
 *
 * All Git MCP tools should use this service rather than
 * executing Git commands directly.
 */
export class GitService {
    private readonly gitPath: string;

    private readonly defaultTimeout: number;

    /**
     * Creates a GitService instance.
     *
     * @param config Git service configuration.
     */
    constructor(config: GitConfig = {}) {
        this.gitPath = config.gitPath ?? DEFAULT_GIT_PATH;

        this.defaultTimeout = this.normalizeTimeout(
            config.timeout ?? DEFAULT_GIT_TIMEOUT,
        );
    }

    /**
     * Executes a Git command in a controlled manner.
     *
     * @param args Git command arguments.
     * @param options Command execution options.
     */
    async execute(
        args: string[],
        options: GitCommandOptions,
    ): Promise<GitCommandResult> {
        const timeout = this.normalizeTimeout(
            options.timeout ?? this.defaultTimeout,
        );

        const command = [...args];

        try {
            const result = await execFileAsync(
                this.gitPath,
                command,
                {
                    cwd: options.cwd,
                    timeout,
                    windowsHide: true,
                    maxBuffer: 10 * 1024 * 1024,
                },
            );

            return {
                success: true,
                command,
                stdout: this.normalizeOutput(result.stdout),
                stderr: this.normalizeOutput(result.stderr),
                exitCode: 0,
                timedOut: false,
            };
        } catch (error: unknown) {
            return this.createErrorResult(command, error);
        }
    }

    /**
     * Checks whether the supplied directory belongs to a Git repository.
     *
     * This does not throw when the directory is not a repository.
     */
    async isRepository(cwd: string): Promise<boolean> {
        const result = await this.execute(
            ['rev-parse', '--is-inside-work-tree'],
            { cwd },
        );

        return (
            result.success &&
            result.stdout.trim() === 'true'
        );
    }

    /**
     * Validates a Git repository and returns basic repository information.
     *
     * When the supplied directory is not a Git repository,
     * isRepository is false and root/currentBranch are empty strings.
     */
    async validateRepository(
        cwd: string,
    ): Promise<GitRepository> {
        const repositoryCheck = await this.execute(
            ['rev-parse', '--is-inside-work-tree'],
            { cwd },
        );

        if (
            !repositoryCheck.success ||
            repositoryCheck.stdout.trim() !== 'true'
        ) {
            return {
                isRepository: false,
                root: '',
                currentBranch: '',
            };
        }

        const rootResult = await this.execute(
            ['rev-parse', '--show-toplevel'],
            { cwd },
        );

        if (!rootResult.success) {
            return {
                isRepository: false,
                root: '',
                currentBranch: '',
            };
        }

        const branchResult = await this.execute(
            ['branch', '--show-current'],
            { cwd },
        );

        return {
            isRepository: true,
            root: rootResult.stdout.trim(),
            currentBranch: branchResult.success
                ? branchResult.stdout.trim()
                : '',
        };
    }

    /**
     * Returns the absolute repository root.
     *
     * Throws when the supplied directory is not a Git repository.
     */
    async getRepositoryRoot(cwd: string): Promise<string> {
        const result = await this.execute(
            ['rev-parse', '--show-toplevel'],
            { cwd },
        );

        if (!result.success) {
            throw new Error(
                this.createRepositoryError(result),
            );
        }

        return result.stdout.trim();
    }

    /**
     * Normalizes Git command timeout values.
     */
    private normalizeTimeout(timeout: number): number {
        if (!Number.isFinite(timeout)) {
            return DEFAULT_GIT_TIMEOUT;
        }

        return Math.min(
            Math.max(timeout, MIN_GIT_TIMEOUT),
            MAX_GIT_TIMEOUT,
        );
    }

    /**
     * Normalizes child-process output.
     */
    private normalizeOutput(
        output: string | Buffer,
    ): string {
        return output.toString();
    }

    /**
     * Converts an unknown process error into a structured
     * GitCommandResult.
     */
    private createErrorResult(
        command: string[],
        error: unknown,
    ): GitCommandResult {
        const processError = error as {
            stdout?: string | Buffer;
            stderr?: string | Buffer;
            code?: number | string;
            killed?: boolean;
            signal?: string;
            message?: string;
        };

        const timedOut =
            processError.killed === true &&
            processError.signal === 'SIGTERM';

        const exitCode =
            typeof processError.code === 'number'
                ? processError.code
                : undefined;

        return {
            success: false,
            command,
            stdout: processError.stdout
                ? this.normalizeOutput(processError.stdout)
                : '',
            stderr: processError.stderr
                ? this.normalizeOutput(processError.stderr)
                : '',
            exitCode,
            timedOut,
            error: timedOut
                ? 'Git command timed out.'
                : processError.message ??
                'Git command execution failed.',
        };
    }

    /**
     * Creates a consistent repository validation error.
     */
    private createRepositoryError(
        result: GitCommandResult,
    ): string {
        if (result.timedOut) {
            return 'Git repository validation timed out.';
        }

        if (result.stderr.trim()) {
            return result.stderr.trim();
        }

        return result.error ?? 'Not a Git repository.';
    }
}