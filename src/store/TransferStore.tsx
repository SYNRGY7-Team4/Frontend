import { create } from "zustand";

interface IFormTransfer {
  accountFrom: string;
  accountTo: string;
  amount: string;
  description: string;
  datetime: string;
  pin: string;
  bankTo: string;
  setField: (payload: Partial<IFormTransfer>) => void;
  reset: () => void;
}

const initialState = {
  accountFrom: "",
  accountTo: "",
  amount: "",
  description: "",
  datetime: "",
  pin: "",
  bankTo: "",
};

const useTransferStore = create<IFormTransfer>((set) => ({
  ...initialState,
  setField: (payload) => set((state) => ({ ...state, ...payload })),
  reset: () => set(initialState),
}));

export const selectState = (state: IFormTransfer) => state;
export const selectSetField = (state: IFormTransfer) => state.setField;
export const selectReset = (state: IFormTransfer) => state.reset;

export default useTransferStore;
