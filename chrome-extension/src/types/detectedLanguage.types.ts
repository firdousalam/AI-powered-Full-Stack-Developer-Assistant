export interface DetectedLanguage {

    language: string;

    confidence: number;

    source:
    | "css-class"
    | "attribute"
    | "heuristic"
    | "ai"
    | "unknown";

}