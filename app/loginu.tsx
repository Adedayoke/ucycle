import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert, // ← add this
} from "react-native";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as React from "react";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "@/store/userStore";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill in both Username and Password.",
      });
      return;
    }

    setUser({email: username})
    // If validation passed
    router.push("/(tabs)/(wastes)");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <Text style={styles.header}>Login as Recycu</Text>

      {/* Username */}
      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Email"
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={styles.inputWrapper}>
        <Feather name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        <Pressable onPress={() => setShowPassword((v) => !v)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#666"
            style={styles.iconRight}
          />
        </Pressable>
      </View>

      {/* Remember Me & Forgot */}
      <View style={styles.row}>
        <Pressable
          style={styles.checkboxWrapper}
          onPress={() => setRememberMe((v) => !v)}
        >
          <MaterialCommunityIcons
            name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"}
            size={20}
            color="#666"
          />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => {
            // TODO: implement forgot password flow
          }}
        >
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Switch to Signup */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signupu")}>
          <Text style={[styles.link, styles.bottomLink]}> Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 32,
    color: "#003B46",
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 6,
    color: "#666",
  },
  link: {
    color: "#07575B",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#07575B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomText: {
    color: "#666",
  },
  bottomLink: {
    fontWeight: "600",
  },
});
