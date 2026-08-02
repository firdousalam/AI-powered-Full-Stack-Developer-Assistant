/// <reference types="chrome" />

import {
    chatWithAI,
    streamChat
} from "../services/api.service";

import {
    ASK_AI,
    ASK_AI_STREAM,
    AI_STREAM,
    AI_STREAM_END,
    AI_STREAM_ERROR
} from "../constants/message.types";


import browserContextService from "../services/browserContext.service";


console.log(
    "🚀 Background Service Worker Started"
);



/**
 * ==========================================
 * Normal Chat API
 * ==========================================
 */

chrome.runtime.onMessage.addListener(

    (
        message,
        sender,
        sendResponse

    ) => {


        if (message.type !== ASK_AI) {

            return;

        }



        (async () => {


            try {


                /**
                 * Use context from popup
                 * if provided
                 *
                 * Otherwise collect
                 */

                const browserContext =

                    message.browserContext !== undefined

                        ? message.browserContext

                        : await browserContextService
                            .getBrowserContext();



                console.log(
                    "browserContext = ",
                    browserContext
                );


                console.log(
                    "sender = ",
                    sender
                );



                const result =

                    await chatWithAI(

                        message.prompt,

                        message.model,

                        browserContext

                    );



                sendResponse(result);


            }

            catch (error) {


                console.error(error);



                sendResponse({

                    success: false,

                    response:
                        "Background Worker Error"

                });


            }


        })();



        return true;


    }

);





/**
 * ==========================================
 * Streaming Chat API
 * ==========================================
 */

chrome.runtime.onMessage.addListener(

    (
        message,
        sender,
        sendResponse

    ) => {


        if (
            message.type !== ASK_AI_STREAM
        ) {

            return;

        }



        (async () => {


            try {


                /**
                 * Respect Popup Toggle
                 */

                const browserContext =

                    message.browserContext !== undefined

                        ? message.browserContext

                        : await browserContextService
                            .getBrowserContext();




                console.log(
                    "Streaming Context:",
                    browserContext
                );



                console.log(
                    "sender:",
                    sender
                );




                await streamChat(

                    message.prompt,


                    message.model ??
                    "llama3.2:3b",


                    browserContext,



                    (token: string) => {


                        chrome.runtime.sendMessage({

                            type: AI_STREAM,

                            token

                        });


                    }


                );




                chrome.runtime.sendMessage({

                    type: AI_STREAM_END

                });



                sendResponse({

                    success: true

                });



            }

            catch (error) {


                console.error(
                    "Streaming Error",
                    error
                );



                chrome.runtime.sendMessage({

                    type: AI_STREAM_ERROR,

                    error:
                        "Streaming Failed"

                });



                sendResponse({

                    success: false

                });


            }



        })();



        return true;


    }

);