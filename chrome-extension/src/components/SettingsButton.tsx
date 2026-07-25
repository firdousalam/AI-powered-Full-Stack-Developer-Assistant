import { Settings } from "lucide-react";

const SettingsButton = () => {
    return (
        <button className="w-full mt-6 border rounded-lg p-3 flex justify-center items-center gap-2">
            <Settings size={18} />

            Settings
        </button>
    );
};

export default SettingsButton;