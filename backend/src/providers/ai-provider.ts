export interface AIProvider {

    chat(

        prompt: string,

        model?: string

    ): Promise<string>;

    generate(

        prompt: string,

        model?: string

    ): Promise<string>;

    streamChat(
        prompt: string,
        model: string,
        onToken: (token: string) => void
    ): Promise<void>;

}