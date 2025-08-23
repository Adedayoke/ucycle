import { themes } from "@/constants/theme";
import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

export default function GradientBg({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {children}
      <Image blurRadius={312} style={styles.bg} source={require("../assets/images/bg.png")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colorBgDark,
    overflow: "hidden",
    position: "relative",
  },
  blurTopLeft: {},
  blurBottomRight: {},
  blurBottomLeft: {},
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: -1,
  }
});
