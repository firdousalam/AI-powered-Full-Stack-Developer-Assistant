/**
 * Represents the architectural analysis
 * of a project.
 */
export interface StructureArchitecture {

    /**
     * Primary detected architecture.
     */
    architecture:
    | "mvc"
    | "layered"
    | "modular"
    | "feature-based"
    | "microservices"
    | "monolithic"
    | "unknown";

    /**
     * Confidence score between 0 and 1.
     */
    confidence: number;

    /**
     * Architectural patterns detected.
     *
     * Example:
     * [
     *   "MVC",
     *   "Layered"
     * ]
     */
    patterns: string[];

    /**
     * Evidence used to determine
     * the architecture.
     */
    evidence: string[];

}