import PrimaryButton from "@/components/ui/PrimaryButton";
import { themes } from "@/constants/theme";
import { useChangeTabBg } from "@/hooks/useChangeTabBG";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function WastesScreen() {
  const router = useRouter();
  useChangeTabBg({ backgroundColor: themes.colorBgDark });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wastes</Text>
      <Text
        style={{
          textAlign: "center",
          color: "rgba(0, 0, 0, 0.5)",
          fontSize: 16,
        }}
      >
        Your wastes appear here
      </Text>
      <PrimaryButton onPress={() => router.push("/scan")}>Add Waste</PrimaryButton>
      {/* <Button title="Add waste" onPress={() => router.push('/')} /> */}
      <View
        style={{
          backgroundColor: themes.colorPrimaryDark,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          borderRadius: "50%",
          position: "absolute",
          right: 15,
          bottom: 80
        }}
      >
        <FontAwesome6 name="add" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    gap: 30,
    position: "relative",
    flex: 1
  },
  title: { fontSize: 22, fontWeight: "bold" },
});
