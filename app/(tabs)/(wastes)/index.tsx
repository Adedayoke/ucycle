import { toastConfig } from '@/components/toastconfig';
import BlackAndWhiteGradient from "@/components/ui/BlackAndWhiteGradient";
import ProfileRepresentation from "@/components/ui/ProfileRepresentation";
import { themes } from "@/constants/theme";
import GradientBg from "@/components/GradientBg";
import { useChangeTabBg } from "@/hooks/useChangeTabBG";
import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Animated,
} from "react-native";
import Toast from 'react-native-toast-message';
import { useWasteStore } from "@/store/wasteStore";

export default function index() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const activities = useWasteStore((s) => s.activities);
  const plusScale = useRef(new Animated.Value(1)).current;

  // Gradient page -> set the tab bar to light
  useChangeTabBg({ backgroundColor: themes.colorPrimaryLight });
  

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = Math.max(0, now - timestamp);
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w ago`;
  };

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
                <Text style={{ color: themes.colorGold }}>UCY</Text> {user?.coins?.toFixed(2)}
              </Text>
            </View>
          </View>
          <Pressable
            hitSlop={20}
            accessibilityLabel="Add waste"
            onPress={() => {
              Animated.sequence([
                Animated.timing(plusScale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
                Animated.timing(plusScale, { toValue: 1, duration: 120, useNativeDriver: true }),
              ]).start(() => router.push('/wastes?openMenu=1'));
            }}
          >
            <Animated.View style={{ transform: [{ scale: plusScale }] }}>
              <Ionicons name="add-circle" size={24} color="#fff" />
            </Animated.View>
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
        </View>
        <BlackAndWhiteGradient style={styles.bannerStyle}>
          <View style={{ flex: 1, padding: 16 }}>
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
              {activities.length === 0 ? (
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
              ) : (
                activities.slice(0, 5).map((a) => (
                  <View key={a.id} style={{ paddingVertical: 8, borderBottomColor: 'rgba(255,255,255,0.15)', borderBottomWidth: StyleSheet.hairlineWidth }}>
                    <Text style={{ color: '#fff', fontFamily: 'Montserrat_400Regular' }}>
                      {a.message} • {formatTimeAgo(a.createdAt)}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>
        </BlackAndWhiteGradient>
      </ScrollView>
      <Toast config={toastConfig} />
    </GradientBg>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    flex: 1,
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
    minHeight: 129,
    borderRadius: 14,
  },
  recentActivityStyle: {
    marginTop: 20,
  },
});
