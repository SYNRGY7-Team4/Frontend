import { create } from "zustand";
import {
  fetchUserDataAPI,
  fetchUserBalanceDataAPI,
} from "@/services/authServices";

interface UserData {
  name: string;
  email: string;
  no_ktp: string;
  no_hp: string;
  date_of_birth: string;
  account_number: string;
  ektp_photo: string;
}

interface UserState {
  userData: any | null;
  balance: number | null;
  isLoading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  fetchBalance: (accountNumber: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  balance: null,
  isLoading: false,
  error: null,
  fetchUserData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetchUserDataAPI();
      // console.log("fetchUserDataAPI response:", response);
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
      // console.log("fetchUserBalanceDataAPI response:", response);
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
}));
