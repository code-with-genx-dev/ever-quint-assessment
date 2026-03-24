import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
    visible: boolean;
    onHide: () => void;
    position?: "left" | "right";
    width?: string;
    header?: React.ReactNode;
    children: React.ReactNode;
    customHeader?: boolean;
    headerName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
    visible,
    onHide,
    position = "right",
    width = "450px",
    children,
    header = "Sidebar",
    customHeader = false,
    headerName
}) => {

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [visible]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && visible) onHide();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [visible, onHide]);

    return (
        <>
            <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onHide} />

            <div className={`fixed top-0 ${position === "left" ? "left-0" : "right-0"} h-full bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col`}
                style={{
                    width, transform: visible ? "translateX(0)" : position === "left" ? "translateX(-100%)" : "translateX(100%)",
                }}>

                {customHeader ? (
                    header
                ) : (
                    <div className="shrink-0 flex justify-between items-center px-4 py-3 border-b text-white bg-violet-600">
                        <h3 className="font-semibold text-[15px]">{headerName}</h3>
                        <button onClick={onHide} className="cursor-pointer p-1 rounded hover:bg-violet-700 transition-colors">
                            <IoMdClose size={18} />
                        </button>
                    </div>
                )}

                {/* ✅ Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Sidebar;