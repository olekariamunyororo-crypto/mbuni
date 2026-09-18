import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  onboarded: boolean;
  pin: string | null;
  hideBalances: boolean;
  verified: boolean;
  favorites: string[];
  setOnboarded: (v: boolean) => void;
  setPin: (p: string) => void;
  toggleHide: () => void;
  setVerified: (v: boolean) => void;
  toggleFavorite: (symbol: string) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      onboarded: false,
      pin: null,
      hideBalances: false,
      verified: false,
      favorites: ["BTC", "ETH", "SOL"],
      setOnboarded: (v) => set({ onboarded: v }),
      setPin: (p) => set({ pin: p }),
      toggleHide: () => set((s) => ({ hideBalances: !s.hideBalances })),
      setVerified: (v) => set({ verified: v }),
      toggleFavorite: (symbol) =>
        set((s) => ({
          favorites: s.favorites.includes(symbol) ? s.favorites.filter((f) => f !== symbol) : [...s.favorites, symbol],
        })),
    }),
    { name: "mbuni.settings" },
  ),
);
