import { create } from "zustand";

interface ResetPasswordState {
  email: string;
  otp: string;
  setField: (field: string, value: string) => void;
  reset: () => void;
}

const initialState = {
  email: "",
  otp: "",
};

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set(initialState),
}));
