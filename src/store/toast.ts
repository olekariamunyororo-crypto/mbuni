import { create } from "zustand";

export interface ToastItem {
  id: number;
  msg: string;
}

interface ToastState {
  toasts: ToastItem[];
  push: (msg: string) => void;
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  push: (msg) => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts, { id, msg }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 2400);
  },
}));
