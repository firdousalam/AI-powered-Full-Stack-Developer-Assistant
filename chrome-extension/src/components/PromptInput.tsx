const PromptInput = () => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
                Prompt
            </label>

            <textarea
                rows={6}
                placeholder="Ask DevPilot AI..."
                className="w-full border rounded-lg p-3 resize-none"
            />
        </div>
    );
};

export default PromptInput;