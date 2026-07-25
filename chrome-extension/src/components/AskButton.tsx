import { Send } from "lucide-react";

const AskButton = () => {
    return (
        <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 flex justify-center items-center gap-2"
        >
            <Send size={18} />

            Ask AI
        </button>
    );
};

export default AskButton;