import { ReactNode } from "react";

interface PopupLayoutProps {
    children: ReactNode;
}

const PopupLayout = ({ children }: PopupLayoutProps) => {
    return (
        <div className="w-[380px] min-h-[600px] bg-gray-100">
            {children}
        </div>
    );
};

export default PopupLayout;