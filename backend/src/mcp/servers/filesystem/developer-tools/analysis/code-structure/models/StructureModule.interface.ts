/**
 * Represents module information detected
 * from a source file.
 */
export interface StructureModule {

    /**
     * Source file path relative to workspace.
     */
    path: string;

    /**
     * Imported modules/packages.
     */
    imports: string[];

    /**
     * Named exports detected in the file.
     */
    exports: string[];

    /**
     * Whether the file contains a default export.
     */
    hasDefaultExport: boolean;

    /**
     * Detected module type.
     *
     * Examples:
     * - typescript-module
     * - commonjs-module
     * - script
     */
    moduleType: string;

}