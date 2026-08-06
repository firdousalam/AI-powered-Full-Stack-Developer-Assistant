export interface FileMetadata {

    path: string;

    name: string;

    extension: string;

    exists: boolean;

    isFile: boolean;

    isDirectory: boolean;

    size: number;

    createdAt: Date;

    modifiedAt: Date;

}