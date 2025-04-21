import { View, Text, StyleSheet } from "react-native";
import React from "react";
import OpaquePressable from "../OpaquePressable";
import { themes } from "@/theme";

export default function PrimaryButton({ onPress, size, children }: { onPress: () => void; size?: number, children: React.ReactNode }) {
  return (
    <OpaquePressable style={styles.btnCont} onPress={onPress}>
      <Text style={[styles.btnText, {fontSize: size}]}>{children}</Text>
    </OpaquePressable>
  );
}


const styles = StyleSheet.create({
    btnCont: {
        backgroundColor: themes.colorPrimaryDark,
        borderRadius: 6,
        padding: 20
    },
    btnText: {
        color: "#fff",
        fontFamily: "Montserrat_600SemiBold",
        fontSize: 20,
        textAlign: "center"
    }
})