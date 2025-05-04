import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  hasFinishedOnboarding: boolean;
  setHasOnboarded: (value: boolean) => void;
  refresh: string;
  setRefresh: (refreshToken: string) => void;
  user: any | null;
  setUser: (user: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user: any) => {
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
