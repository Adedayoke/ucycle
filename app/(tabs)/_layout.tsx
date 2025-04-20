import { TabBarProvider, useTabBar } from "@/context/TabBarContext";
import { useUserStore } from "@/store/userStore";
import { themes } from "@/theme";
import { AntDesign, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Redirect, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function _layout() {
  const {tabBarStyle} = useTabBar()

  const hasFinishedOnboarding = useUserStore(
    (state) => state.hasFinishedOnboarding
  );
  const user = useUserStore(
    (state) => state.user
  );

  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }
  
  if (!user) {
    return <Redirect href="/login" />;
  }
  
  return (
      <Tabs
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 20,
            right: 20,
            height: 65,
            backgroundColor: tabBarStyle ? tabBarStyle?.backgroundColor : "transparent",
            borderTopWidth: 0,
            elevation: 0,
            zIndex: 999,
          },
          tabBarBackground: () => (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
              }}
            >
              <BlurView
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                }}
                intensity={80}
              />
            </View>
          ),
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
