/**
 * Supported package managers.
 */
export type PackageManagerType =
    | "npm"
    | "yarn"
    | "pnpm"
    | "bun"
    | "pip"
    | "poetry"
    | "pipenv"
    | "uv"
    | "maven"
    | "gradle"
    | "cargo"
    | "go"
    | "bundler"
    | "composer"
    | "pub"
    | "unknown";

/**
 * Package manager information.
 */
export interface PackageManagerInfo {

    /**
     * Detected package manager.
     */
    name: PackageManagerType;

    /**
     * Lock file used.
     */
    lockFile: string;

}