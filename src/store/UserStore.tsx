import { create } from "zustand";
import {
  fetchUserDataAPI,
  fetchUserBalanceDataAPI,
  fetchUserMutationDataAPI,
  fetchUserQRCodeDataAPI,
} from "@/services/authServices";

interface UserData {
  name: string;
  email: string;
  no_ktp: string;
  no_hp: string;
  date_of_birth: string;
  account_number: string;
  account_pin: string;
  ektp_photo: string;
}

interface UserMutation {
  id: string;
  amount: number;
  datetime: Date;
  type: string;
  status: string;
  description: string;
  account_from: string;
  account_to: string;
}

interface UserState {
  userData: any | null;
  userMutations: any | null;
  balance: number | null;
  qrCode: string | null;
  isLoading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  fetchBalance: (accountNumber: string) => Promise<void>;
  fetchMutations: (accountNumber: string) => Promise<void>;
  fetchQRCode: () => Promise<void>;
  resetState: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  userMutations: [],
  balance: null,
  qrCode: null,
  isLoading: false,
  error: null,
  fetchUserData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetchUserDataAPI();

      const data = response?.data as UserData;
      if (data) {
        set({ userData: data, isLoading: false });
      } else {
        set({ error: "Invalid response from API", isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ error: "Failed to fetch user data", isLoading: false });
    }
  },
  fetchBalance: async (accountNumber: string) => {
    set({ isLoading: true });
    try {
      const response = await fetchUserBalanceDataAPI(accountNumber);

      if (response && typeof response.data === "number") {
        set({ balance: response.data, isLoading: false });
      } else {
        set({ error: "Invalid response from API", isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching balance data:", error);
      set({ error: "Failed to fetch balance data", isLoading: false });
    }
  },
  fetchMutations: async (accountNumber: string) => {
    set({ isLoading: true });
    try {
      const response = await fetchUserMutationDataAPI(accountNumber);

      const data = response?.data as UserMutation[];
      if (data) {
        set({ userMutations: data, isLoading: false });
      } else {
        set({ error: "Invalid response from API", isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching mutation data:", error);
      set({ error: "Failed to fetch mutation data", isLoading: false });
    }
  },
  fetchQRCode: async () => {
    set({ isLoading: true });
    try {
      const response = await fetchUserQRCodeDataAPI();
      if (response) {
        const blob = new Blob([response], { type: "image/png" });
        const image = URL.createObjectURL(blob);
        set({
          qrCode: image,
          isLoading: false,
        });
      } else {
        set({ error: "Invalid response from API", isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching QR code data:", error);
      set({ error: "Failed to fetch QR code data", isLoading: false });
    }
  },
  resetState: () =>
    set({ userData: null, userMutations: [], balance: null, error: null }),
}));
