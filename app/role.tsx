import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { themes } from "@/theme";
import PrimaryButton from "@/components/ui/PrimaryButton";
import OpaquePressable from "@/components/OpaquePressable";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function role() {
  const [role, setRole] = useState("");
  const router = useRouter()
  function handleContinue() {
    if(!role){
      Alert.alert("Please select a role!")
      return
    }
    // router.push("/login")
    if (role === "recycu") {
      router.push("/loginu");
    }
    if (role === "recycla") {
      router.push("/logina");
      
    }

  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <View>
        <Image
          style={{
            width: 186,
            height: 53,
            marginHorizontal: "auto",
            marginVertical: 50,
          }}
          source={require("@/assets/images/logo.png")}
        />
        <Text style={styles.header}>Choose your role</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginVertical: 40,
          }}
        >
          <OpaquePressable
            onPress={() => setRole("recycu")}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={[
                styles.role,
                {
                  borderColor:
                    role === "recycu"
                      ? themes.colorGold
                      : themes.colorPrimaryDark,
                },
              ]}
            ></View>
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 20,
                color:
                  role === "recycu"
                    ? themes.colorGold
                    : themes.colorPrimaryDark,
              }}
            >
              Recycu
            </Text>
          </OpaquePressable>
          <Text>Or</Text>
          <OpaquePressable
            onPress={() => setRole("recycla")}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={[
                styles.role,
                {
                  borderColor:
                    role === "recycla"
                      ? themes.colorGold
                      : themes.colorPrimaryDark,
                },
              ]}
            ></View>
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 20,
                color:
                  role === "recycla"
                    ? themes.colorGold
                    : themes.colorPrimaryDark,
              }}
            >
              Recycla
            </Text>
          </OpaquePressable>
        </View>
      </View>
      <PrimaryButton onPress={handleContinue}>Continue</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  header: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 32,
    textAlign: "center",
  },
  role: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: themes.colorPrimaryDark,
  },
});
