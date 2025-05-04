// SignupScreen.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import * as React from "react";
import Toast from "react-native-toast-message";
import { useRegisterRecyclu } from "@/hooks/QueryHooks/useRegisterRecyclu";

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, isPending } = useRegisterRecyclu();

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSignup = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirm.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a valid email address.",
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password must be at least 6 characters.",
      });
      return;
    }

    if (password !== confirm) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match 😢",
      });
      return;
    }

    registerUser({
      referral_code: "",
      country: "",
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      username: userName,
    });
    // All validations passed
    // router.replace("/loginu");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account as Recycu</Text>

      {/* First Name */}
      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          style={styles.input}
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          style={styles.input}
        />
      </View>
      {/* User Name */}
      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={userName}
          onChangeText={setUserName}
          placeholder="Username"
          style={styles.input}
        />
      </View>

      {/* Email */}
      <View style={styles.inputWrapper}>
        <Feather name="mail" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
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
        <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
          <Feather
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#666"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <Feather name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          style={styles.input}
        />
      </View>

      {/* Signup Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Switch to Login */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/loginu")}>
          <Text style={[styles.link, styles.bottomLink]}> Log in here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
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
  button: {
    backgroundColor: "#07575B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    color: "#07575B",
    fontSize: 14,
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
