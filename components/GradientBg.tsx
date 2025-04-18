import { themes } from "@/theme";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");

export default function GradientBg({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      {children}
      <Image blurRadius={312} style={styles.bg} source={require("../assets/images/bg.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
