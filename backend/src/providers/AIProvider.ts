export interface AIProvider {

    chat(

        prompt: string

    ): Promise<any>;

}