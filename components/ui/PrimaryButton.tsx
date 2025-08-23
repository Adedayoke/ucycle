import { themes } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, ViewStyle } from "react-native";
import OpaquePressable from "@/components/OpaquePressable";

type Props = {
  onPress: () => void;
  size?: number;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle | ViewStyle[];
  accessibilityLabel?: string;
};

export default function PrimaryButton({
  onPress,
  size,
  children,
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  accessibilityLabel,
}: Props) {
  const containerStyles = [
    styles.btnCont,
    fullWidth ? { alignSelf: "stretch" } : undefined,
    disabled ? styles.btnDisabled : undefined,
    style,
  ] as any;

  return (
    <OpaquePressable
      style={containerStyles}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.btnText, size ? { fontSize: size } : null]}>{children}</Text>
      )}
    </OpaquePressable>
  );
}

const styles = StyleSheet.create({
  btnCont: {
    backgroundColor: themes.colorPrimaryDark,
    borderRadius: 6,
    padding: 20,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
});
