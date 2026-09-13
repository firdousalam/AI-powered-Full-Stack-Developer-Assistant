export interface GitBlameLine {
    lineNumber: number;
    commit: string;
    author: string;
    authorEmail?: string;
    date: string;
    content: string;
}

export interface GitBlameResult {
    filePath: string;
    revision?: string;
    startLine?: number;
    endLine?: number;
    lines: GitBlameLine[];
    totalLines: number;
}