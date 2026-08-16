import {
    ToolTimeoutError,
} from "./tool-timeout.error";

export class ToolTimeoutService {

    public async execute<T>(
        operation: Promise<T>,
        timeoutMs: number,
    ): Promise<T> {

        return new Promise<T>(
            (resolve, reject) => {

                const timer =
                    setTimeout(() => {

                        reject(
                            new ToolTimeoutError(
                                timeoutMs,
                            )
                        );

                    }, timeoutMs);


                operation
                    .then((result) => {

                        clearTimeout(timer);

                        resolve(result);

                    })
                    .catch((error) => {

                        clearTimeout(timer);

                        reject(error);

                    });

            }
        );

    }

}