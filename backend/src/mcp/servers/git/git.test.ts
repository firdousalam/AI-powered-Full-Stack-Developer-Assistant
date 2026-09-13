import { GitService } from "./git.service";

const gitService = new GitService();

const workspacePath = process.cwd();

async function main(): Promise<void> {
    const isRepository =
        await gitService.isRepository(workspacePath);

    console.log('Is repository:', isRepository);

    if (isRepository) {
        const root =
            await gitService.getRepositoryRoot(workspacePath);

        const branch =
            await gitService.getCurrentBranch(workspacePath);

        console.log({
            isRepository,
            root,
            branch,
        });
    }
}

void main();