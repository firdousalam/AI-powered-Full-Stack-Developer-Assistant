import { filesystemService } from "../../../services";

export class WorkspaceReader {

    /**
     * Reads package.json.
     */
    async readPackageJson<T>(
        workspacePath: string
    ): Promise<T | null> {

        return filesystemService.readJson<T>(
            filesystemService.join(
                workspacePath,
                "package.json"
            )
        );

    }

    /**
     * Reads tsconfig.json.
     */
    async readTsConfig<T>(
        workspacePath: string
    ): Promise<T | null> {

        return filesystemService.readJson<T>(
            filesystemService.join(
                workspacePath,
                "tsconfig.json"
            )
        );

    }

    /**
     * Reads jsconfig.json.
     */
    async readJsConfig<T>(
        workspacePath: string
    ): Promise<T | null> {

        return filesystemService.readJson<T>(
            filesystemService.join(
                workspacePath,
                "jsconfig.json"
            )
        );

    }

    /**
     * Reads README.md.
     */
    async readReadme(
        workspacePath: string
    ): Promise<string | null> {

        const filePath = filesystemService.join(
            workspacePath,
            "README.md"
        );

        if (!(await filesystemService.exists(filePath))) {
            return null;
        }

        return filesystemService.readFile(filePath);

    }

    /**
     * Checks whether a file exists.
     */
    async exists(
        workspacePath: string,
        fileName: string
    ): Promise<boolean> {

        return filesystemService.exists(
            filesystemService.join(
                workspacePath,
                fileName
            )
        );

    }

}