import { themes } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text } from "react-native";
import OpaquePressable from "../OpaquePressable";

export default function PrimaryButton({
  onPress,
  size,
  children,
}: {
  onPress: () => void;
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <OpaquePressable style={styles.btnCont} onPress={onPress}>
      <Text style={[styles.btnText, { fontSize: size }]}>{children}</Text>
    </OpaquePressable>
  );
}

const styles = StyleSheet.create({
  btnCont: {
    backgroundColor: themes.colorPrimaryDark,
    borderRadius: 6,
    padding: 20,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
});
