import { themes } from "@/constants/theme";
import { useTabBar } from "@/context/TabBarContext";
import { useUserStore } from "@/store/userStore";
import { AntDesign, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function _layout() {
  const {tabBarStyle} = useTabBar()

  const hasFinishedOnboarding = useUserStore(
    (state) => state.hasFinishedOnboarding
  );
  const user = useUserStore(
    (state) => state.user
  );
  const refresh = useUserStore(
    (state) => state.refresh
  );
  console.log(user)

  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }
  
  if (!user || !refresh) {
    return <Redirect href="/role" />;
  }
  // return <Redirect href="/" />;
  return (
      <Tabs
        screenOptions={{
          // Scene background can remain as-is; focus here is the tab bar background
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 20,
            right: 20,  
            height: 65,
            // Use a solid dark background for the tab bar
            backgroundColor: tabBarStyle?.backgroundColor || themes.colorBgDark,
            borderTopWidth: 0,
            elevation: 0,
            zIndex: 999,
          },
          // Remove blurred transparent background to keep tabs opaque
          tabBarBackground: undefined,
        }}
      >
        <Tabs.Screen
          name="(wastes)"
          options={{
            animation: "fade",
            title: "Home",
            headerShown: false,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: themes.colorTextFaded,
            tabBarIcon: ({ color }) => (
              <Octicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            title: "Leaderboard",
            headerShown: false,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: themes.colorTextFaded,
            tabBarIcon: ({ color }) => (
              <AntDesign name="Trophy" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="referral"
          options={{
            title: "Referral",
            headerShown: false,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: themes.colorTextFaded,
            tabBarIcon: ({ color }) => (
              <Octicons name="people" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: themes.colorTextFaded,
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
  );
}
