import { useTabBar } from "@/context/TabBarContext";
import { themes } from "@/constants/theme";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export function useChangeTabBg(style: any) {
  const { setTabBarStyle } = useTabBar();

  useFocusEffect(
    useCallback(() => {
      setTabBarStyle(style);
      return () => {
        // Reset to the app's dark background to avoid lingering transparent state
        setTabBarStyle({ backgroundColor: themes.colorBgDark });
      };
    }, [])
  );
}
