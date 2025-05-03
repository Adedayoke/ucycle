import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  hasFinishedOnboarding: boolean;
  setHasOnboarded: (value: boolean) => void;
  user: {email: string} | null;
  setUser: (user: {email: string}) => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user: {email: string}) => {
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
    }),
    {
      name: "ucycle-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
