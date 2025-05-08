import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function OpaquePressable({
  children,
  onPress,
  style,
  disabled,
  accessibilityState
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
  accessibilityState?: any
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      hitSlop={20}
      style={style}
      onPress={onPress}
      accessibilityState={accessibilityState}
    >
      {children}
    </TouchableOpacity>
  );
}
