import { useChangeTabBg } from "@/hooks/useChangeTabBG";
import { themes } from "@/theme";
import React from "react";
import { Text, View } from "react-native";

export default function wastes() {
  useChangeTabBg({ backgroundColor: themes.colorBgDark })
  
  return (
    <View>
      <Text>Wastes</Text>
    </View>
  );
}
