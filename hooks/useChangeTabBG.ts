import { useTabBar } from "@/context/TabBarContext";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export function useChangeTabBg(style: any) {
  const { setTabBarStyle } = useTabBar();

  useFocusEffect(
    useCallback(() => {
      setTabBarStyle(style);
      return () => {
        setTabBarStyle({ backgroundColor: "transparent" });
      };
    }, [])
  );
}
