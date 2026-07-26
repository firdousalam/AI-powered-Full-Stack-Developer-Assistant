import { saveData } from "../services/storage.service";
import { STORAGE_KEYS } from "../types/storage.types";

await saveData(STORAGE_KEYS.MODEL, "llama3");

await saveData(STORAGE_KEYS.TEMPERATURE, 0.7);

await saveData(
    STORAGE_KEYS.BACKEND_URL,
    "http://localhost:3000"
);