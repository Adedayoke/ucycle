import { View, Text, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import React from "react";
import OpaquePressable from "./OpaquePressable";

type ActionButtonProps = {
  disabledState: boolean;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  isPending?: boolean;
  textStyle?: TextStyle | TextStyle[];
  text: string;
};

export default function ActionButtons({
  disabledState,
  onPress,
  style,
  isPending = false,
  textStyle,
  text,
}: ActionButtonProps) {
    const isLoading = isPending ?? false;
  return (
    <OpaquePressable
      disabled={disabledState}
      style={style}
      onPress={onPress}
      accessibilityState={{ disabled: disabledState, busy: isPending }}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={textStyle}>{text}</Text>
      )}
    </OpaquePressable>
  );
}
