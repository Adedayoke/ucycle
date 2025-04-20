import GradientBg from "@/components/GradientBg";
import BlackAndWhiteGradient from "@/components/ui/BlackAndWhiteGradient";
import ProfileRepresentation from "@/components/ui/ProfileRepresentation";
import { themes } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function index() {
  return (
    <GradientBg>
      <StatusBar style="light" backgroundColor="transparent" />
      <ScrollView
        style={styles.containerStyle}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerStyle}>
          <View style={styles.headerStyleLeft}>
            <ProfileRepresentation />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 14, color: "#fff", fontFamily: "Montserrat_400Regular" }}>Total Coins</Text>
              <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
                <Text style={{ color: themes.colorGold }}>UCY</Text> 0.00
              </Text>
            </View>
          </View>
          <Pressable hitSlop={20}>
            <Ionicons name="add-circle" size={24} color="white" />
          </Pressable>
        </View>
        <View style={styles.iconsContainersStyle}>
          <Link href="/wastes" asChild>
            <Pressable style={styles.icon}>
              <BlackAndWhiteGradient style={styles.iconContainer}>
                <Image
                  style={{ width: 39, height: 38 }}
                  source={require("@/assets/images/waste_bin.png")}
                />
              </BlackAndWhiteGradient>
              <Text style={styles.iconText}>Submit waste</Text>
            </Pressable>
          </Link>
          <Link href="/onboarding" asChild>
            <Pressable style={styles.icon}>
              <BlackAndWhiteGradient style={styles.iconContainer}>
                <Image
                  style={{ width: 39, height: 32 }}
                  source={require("@/assets/images/withdraw.png")}
                />
              </BlackAndWhiteGradient>
              <Text style={styles.iconText}>Withdraw</Text>
            </Pressable>
          </Link>
          <Link href="/pickup" asChild>
            <Pressable style={styles.icon}>
              <BlackAndWhiteGradient style={styles.iconContainer}>
                <Image
                  style={{ width: 39, height: 39 }}
                  source={require("@/assets/images/pickup.png")}
                />
              </BlackAndWhiteGradient>
              <Text style={styles.iconText}>Request pickup</Text>
            </Pressable>
          </Link>
        </View>
        <BlackAndWhiteGradient style={styles.bannerStyle}>
          <Text></Text>
        </BlackAndWhiteGradient>
        <View style={styles.recentActivityStyle}>
          <Text
            style={{
              fontSize: 18,
              color: "#fff",
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            Recent activity
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
                textAlign: "center",
                fontFamily: "Montserrat_400Regular",
              }}
            >
              No recent activities
            </Text>
          </View>
        </View>
      </ScrollView>
    </GradientBg>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerStyleLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainersStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 50,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34, // to make it a perfect circle
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5,
    fontFamily: "Montserrat_400Regular"
  },
  bannerStyle: {
    height: 129,
    borderRadius: 14,
  },
  recentActivityStyle: {
    marginTop: 20,
  },
});
