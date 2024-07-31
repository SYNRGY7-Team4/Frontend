import { create } from "zustand";

interface RegistrationState {
  email: string;
  no_hp: string;
  password: string;
  confirm_password: string;
  no_ktp: string;
  name: string;
  date_of_birth: string;
  ektp_photo: File | null;
  pin: string;
  confirm_pin: string;
  setField: (field: string, value: string | File) => void;
  reset: () => void;
}

const initialState = {
  email: "",
  no_hp: "",
  password: "",
  confirm_password: "",
  no_ktp: "",
  name: "",
  date_of_birth: "",
  ektp_photo: null,
  pin: "",
  confirm_pin: "",
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  ...initialState,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set(initialState),
}));
