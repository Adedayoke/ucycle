import { LinearGradient } from "expo-linear-gradient";
import React from "react";

export default function BlackAndWhiteGradient({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return (
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.39)", "rgba(153, 153, 153, 0.39)"]}
      start={{ x: 0.17, y: 0.17 }} // approximate for 150.64 degrees
      end={{ x: 0.83, y: 0.83 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
