import SidePanelHeader from "./SidePanelHeader";
import SidePanelSidebar from "./SidePanelSidebar";
import SidePanelContent from "./SidePanelContent";
import SidePanelFooter from "./SidePanelFooter";

export default function SidePanelLayout() {
    return (
        <div className="flex h-screen bg-gray-100">

            <div className="w-64 bg-gray-800 text-white">
                <SidePanelSidebar />
            </div>

            <div className="flex flex-col flex-1">

                <div className="bg-white shadow">
                    <SidePanelHeader />
                </div>

                <div className="flex-1 bg-gray-50">
                    <SidePanelContent />
                </div>

                <div className="bg-white border-t">
                    <SidePanelFooter />
                </div>

            </div>

        </div>
    );
}