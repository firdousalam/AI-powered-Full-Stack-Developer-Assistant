import { MessageSquare } from "lucide-react";

const RecentChats = () => {
    return (
        <div className="mt-6">
            <h2 className="font-semibold mb-3">
                Recent Chats
            </h2>

            <div className="border rounded-lg p-3 flex gap-3 items-center">
                <MessageSquare size={18} />

                <span className="text-sm text-gray-600">
                    No recent chats
                </span>
            </div>
        </div>
    );
};

export default RecentChats;