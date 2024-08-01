import { create } from "zustand";

interface RegistrationState {
  email: string;
  no_hp: string;
  password: string;
  no_ktp: string;
  name: string;
  date_of_birth: string;
  ektp_photo: string;
  pin: string;
  setField: (field: string, value: string) => void;
  reset: () => void;
}

const initialState = {
  email: "",
  no_hp: "",
  password: "",
  no_ktp: "",
  name: "",
  date_of_birth: "",
  ektp_photo: "",
  pin: "",
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set(initialState),
}));
