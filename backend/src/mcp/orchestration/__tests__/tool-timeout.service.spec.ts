import {
    describe,
    it,
    expect,
    beforeEach,
} from "vitest";

import {
    ToolTimeoutService,
} from "../services/tool-timeout.service";

import {
    ToolTimeoutError,
} from "../services/tool-timeout.error";


describe(
    "ToolTimeoutService",
    () => {

        let service:
            ToolTimeoutService;


        beforeEach(() => {

            service =
                new ToolTimeoutService();

        });


        it(
            "should resolve when operation completes before timeout",
            async () => {

                const result =
                    await service.execute(

                        Promise.resolve(
                            "success"
                        ),

                        1000,

                    );


                expect(
                    result
                ).toBe(
                    "success"
                );

            }
        );


        it(
            "should reject with ToolTimeoutError when operation exceeds timeout",
            async () => {

                const operation =
                    new Promise<string>(
                        (resolve) => {

                            setTimeout(

                                () => {

                                    resolve(
                                        "late"
                                    );

                                },

                                100,

                            );

                        }
                    );


                await expect(

                    service.execute(
                        operation,
                        10,
                    )

                ).rejects.toBeInstanceOf(
                    ToolTimeoutError
                );

            }
        );


        it(
            "should preserve the original operation error",
            async () => {

                const operation =
                    Promise.reject(
                        new Error(
                            "Tool failed"
                        )
                    );


                await expect(

                    service.execute(
                        operation,
                        1000,
                    )

                ).rejects.toThrow(
                    "Tool failed"
                );

            }
        );

    }
);