import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  zip: string;
  set: (patch: Partial<Omit<OnboardingState, "set" | "clear">>) => void;
  clear: () => void;
}

const EMPTY = { country: "", firstName: "", lastName: "", email: "", password: "", phone: "", line1: "", city: "", state: "", zip: "" };

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      ...EMPTY,
      set: (patch) => set(patch),
      clear: () => set({ ...EMPTY }),
    }),
    {
      name: "mbuni.onboarding",
      // Never persist the password to localStorage.
      partialize: (s) => ({
        country: s.country,
        firstName: s.firstName,
        lastName: s.lastName,
        email: s.email,
        phone: s.phone,
        line1: s.line1,
        city: s.city,
        state: s.state,
        zip: s.zip,
      }),
    },
  ),
);
