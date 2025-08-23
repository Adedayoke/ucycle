import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any; // Allow additional properties
}

type UserState = {
  hasFinishedOnboarding: boolean;
  setHasOnboarded: (value: boolean) => void;
  refresh: string;
  setRefresh: (refreshToken: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user: User | null) => {
        return set((state) => {
          return {
            ...state,
            user,
          };
        });
      },
      hasFinishedOnboarding: false,
      setHasOnboarded: (value) => {
        return set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: value ,
          };
        });
      },
      loading: false,
      refresh: "",
      setRefresh: (refreshToken: string) => {
        return set((state) => {
          return {
            ...state,
            refresh: refreshToken ,
          };
        });
      },
      setLoading: (loading: boolean) => {
        return set((state) => {
          return {
            ...state,
            loading: loading ,
          };
        });
      }
    }),
    {
      name: "ucycle-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
