import { chatPrompt } from "../prompts/chat.prompt";
import { dockerPrompt } from "../prompts/docker.prompt";
import { kubernetesPrompt } from "../prompts/kubernetes.prompt";
import { jenkinsPrompt } from "../prompts/jenkins.prompt";
import { codeReviewPrompt } from "../prompts/code-review.prompt";

class PromptService {

    buildPrompt(userPrompt: string): string {


        const prompt = userPrompt.toLowerCase();
        console.log("prompt", prompt)
        if (prompt.includes("docker")) {

            return dockerPrompt(userPrompt);
        }

        if (prompt.includes("kubernetes")) {
            return kubernetesPrompt(userPrompt);
        }

        if (prompt.includes("jenkins")) {
            return jenkinsPrompt(userPrompt);
        }

        if (
            prompt.includes("review code") ||
            prompt.includes("code review")
        ) {
            return codeReviewPrompt(userPrompt);
        }
        console.log("user prompt", userPrompt)
        return chatPrompt(userPrompt);
    }

}

export default new PromptService();