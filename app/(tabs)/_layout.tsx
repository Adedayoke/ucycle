import { View, Text, Platform, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { AntDesign, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { themes } from "@/theme";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 20,
          right: 20,
          height: 60,
          borderRadius: 24,
          backgroundColor: "transparent",
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
