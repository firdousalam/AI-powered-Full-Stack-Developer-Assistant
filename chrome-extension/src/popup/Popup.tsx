import PopupLayout from "./PopupLayout";
import PopupHeader from "./PopupHeader";
import PopupFooter from "./PopupFooter";

import ModelSelector from "../components/ModelSelector";
import PromptInput from "../components/PromptInput";
import AskButton from "../components/AskButton";
import RecentChats from "../components/RecentChats";
import SettingsButton from "../components/SettingsButton";

const Popup = () => {
    return (
        <PopupLayout>

            <PopupHeader />

            <div className="p-5">

                <ModelSelector />

                <PromptInput />

                <AskButton />

                <RecentChats />

                <SettingsButton />

            </div>

            <PopupFooter />

        </PopupLayout>
    );
};

export default Popup;