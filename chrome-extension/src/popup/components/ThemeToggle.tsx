import { saveData } from "../services/storage.service";
import { STORAGE_KEYS } from "../types/storage.types";

export default function ThemeToggle() {
    return (
        <div className="flex gap-2">
            <button
                onClick={() =>
                    saveData(STORAGE_KEYS.THEME, "light")
                }
            >
                ☀️ Light
            </button>

            <button
                onClick={() =>
                    saveData(STORAGE_KEYS.THEME, "dark")
                }
            >
                🌙 Dark
            </button>
        </div>
    );
}