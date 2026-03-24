import { create } from "zustand";

type ToastType = "success" | "error";

interface ToastState {
    message: string;
    type: ToastType;
    visible: boolean;
    showToast: (msg: string, type?: ToastType) => void;
    hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
    message: "",
    type: "success",
    visible: false,

    showToast: (msg, type = "success") =>
        set({ message: msg, type, visible: true }),

    hideToast: () => set({ visible: false }),
}));