// ProfileScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import GradientBg from "@/components/GradientBg";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  // Dummy user data
  const user = {
    initials: "OH",
    name: "Oke Habeeb",
    email: "oke***@gmail.com",
  };

  const menuItems = [
    { id: "1", label: "All Activities", icon: <MaterialIcons name="history" size={20} color="#fff" /> },
    { id: "2", label: "Pending Wastes", icon: <FontAwesome5 name="trash" size={20} color="#fff" /> },
    { id: "3", label: "Support", icon: <Ionicons name="help-circle-outline" size={20} color="#fff" /> },
  ];

  return (
    <GradientBg>
      <StatusBar style="light" backgroundColor="transparent" />

      {/* Header */}
      <Text style={styles.header}>Profile Settings</Text>

      {/* Avatar and Name */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>{user.initials}</Text>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* Email Card */}
      <View style={styles.infoCard}>
        <MaterialIcons name="email" size={20} color="#fff" style={styles.infoIcon} />
        <Text style={styles.infoText}>{user.email}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            {item.icon}
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </GradientBg>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginLeft: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#5E9E8F",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
  },
  menu: {
    marginHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuLabel: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  logoutText: {
    color: "#07575B",
    fontSize: 16,
    fontWeight: "600",
  },
});
