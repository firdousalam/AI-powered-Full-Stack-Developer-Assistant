import dotenv from "dotenv";
dotenv.config();

export const env = {

    PORT: process.env.PORT || "5000",

    NODE_ENV: process.env.NODE_ENV || "development",

    API_VERSION: process.env.API_VERSION || "v1",

    DEFAULT_MODEL: process.env.DEFAULT_MODEL || "llama3"

};