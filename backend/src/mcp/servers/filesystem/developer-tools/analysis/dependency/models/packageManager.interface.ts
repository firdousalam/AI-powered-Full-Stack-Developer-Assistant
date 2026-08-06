/**
 * Supported package managers.
 */
export type PackageManagerType =

    | "npm"

    | "yarn"

    | "pnpm"

    | "bun"

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