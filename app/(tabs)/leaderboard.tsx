import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GradientBg from "@/components/GradientBg";
import { StatusBar } from "expo-status-bar";

export default function leaderboard() {
  return (
    <GradientBg>
      <StatusBar style="light" backgroundColor="transparent" />
      <Text style={styles.title}>🏆 Leaderboard</Text>
    </GradientBg>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
});