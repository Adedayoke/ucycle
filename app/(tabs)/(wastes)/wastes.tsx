import { useTabBar } from "@/context/TabBarContext";
import { themes } from "@/theme";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Text, View } from "react-native";

export default function wastes() {
  const { setTabBarStyle } = useTabBar();

  useFocusEffect(
    useCallback(() => {
      setTabBarStyle({ backgroundColor: themes.colorBgDark });
      return () => {
        setTabBarStyle({ backgroundColor: 'transparent' });
      };
    }, [])
  );
  
  return (
    <View>
      <Text>Wastes</Text>
    </View>
  );
}
