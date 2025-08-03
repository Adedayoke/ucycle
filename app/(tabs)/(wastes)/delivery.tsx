import { View, Text } from "react-native";
import React from "react";
import { useChangeTabBg } from "@/hooks/useChangeTabBG";
import { themes } from "@/constants/theme";

export default function delivery() {
  useChangeTabBg({ backgroundColor: themes.colorBgDark });

  return (
    <View>
      <Text>delivery</Text>
    </View>
  );
}
