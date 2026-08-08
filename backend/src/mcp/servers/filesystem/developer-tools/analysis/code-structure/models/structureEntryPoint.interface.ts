export interface StructureEntryPoint {
    name: string;
    path: string;
    file: string;
    type: "entry-point";
    confidence: "high" | "medium" | "low";
    reason: string;
}