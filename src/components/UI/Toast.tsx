import { useEffect } from "react";
import { useToastStore } from "../../store/useToastStore";
import clsx from "clsx";

const Toast = () => {
    const { message, type, visible, hideToast } = useToastStore();

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                hideToast();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50" style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }}>
            <div className={clsx("px-4 py-2 rounded-md text-white shadow-lg text-[14px]", type === "success" ? "bg-green-500" : "bg-red-500")}>
                {message}
            </div>
        </div>
    );
};

export default Toast;