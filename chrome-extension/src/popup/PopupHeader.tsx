import { Bot } from "lucide-react";

const PopupHeader = () => {
    return (
        <header className="flex items-center gap-3 bg-blue-600 text-white p-4">
            <Bot size={28} />

            <div>
                <h1 className="text-lg font-bold">
                    DevPilot AI
                </h1>

                <p className="text-xs">
                    AI Full Stack Developer Assistant
                </p>
            </div>
        </header>
    );
};

export default PopupHeader;