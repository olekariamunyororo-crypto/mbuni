import { create } from "zustand";
import type { User } from "../types";

type Status = "loading" | "authed" | "guest";

interface AuthState {
  user: User | null;
  status: Status;
  setUser: (u: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",
  setUser: (u) => set({ user: u, status: u ? "authed" : "guest" }),
}));
