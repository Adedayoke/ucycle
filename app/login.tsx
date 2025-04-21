import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function login() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />{" "}
      <Text style={styles.title}>Login as recycu</Text>

      

      <Button title="Go to onboarding" onPress={() => router.push("/onboarding")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: "black",
    fontFamily: "Montserrat_600SemiBold",
  },
});
