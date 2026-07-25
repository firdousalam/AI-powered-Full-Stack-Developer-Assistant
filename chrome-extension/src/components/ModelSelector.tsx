const ModelSelector = () => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
                AI Model
            </label>

            <select className="w-full border rounded-lg p-2">
                <option>Qwen2.5-Coder 7B</option>
                <option>Llama 3.1</option>
                <option>Gemma 3</option>
                <option>DeepSeek</option>
            </select>
        </div>
    );
};

export default ModelSelector;