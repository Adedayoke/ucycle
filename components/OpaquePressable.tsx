import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function OpaquePressable({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      hitSlop={20}
      style={style}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
