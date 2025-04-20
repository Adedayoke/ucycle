import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
  user: object | null;
};

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,
      setUser: (user: object) => {
        return set((state) => {
          return {
            ...state,
            user,
          };
        });
      },
      hasFinishedOnboarding: false,
      toggleHasOnboarded: () => {
        return set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: !state.hasFinishedOnboarding,
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
