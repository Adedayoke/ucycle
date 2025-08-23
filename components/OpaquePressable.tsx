import { TouchableOpacity } from "react-native";
import React from "react";

export default function OpaquePressable({
  children,
  onPress,
  style,
  disabled,
  accessibilityState,
  accessibilityRole,
  accessibilityLabel,
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
  accessibilityState?: any;
  accessibilityRole?: string;
  accessibilityLabel?: string;
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      hitSlop={20}
      style={style}
      onPress={onPress}
      accessibilityState={accessibilityState}
      accessibilityRole={accessibilityRole as any}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </TouchableOpacity>
  );
}
