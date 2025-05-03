// SignupScreen.tsx
import { useEffect, useState } from "react";
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

export default function SignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    Toast.show({
      type: 'info',
      text1: 'Hello Recykla Agent!',
      text2: 'You will be prompted to provide document validating your recyling license upon  sign up.',
      position: 'top',
    });
    console.log("Toast shown");
  }, []);

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSignup = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error', 
        text1: 'Error',
        text2: "Please enter a valid email address.",
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error', 
        text1: 'Error',
        text2: 'Passwords do not match 😢',
      });
      return;
    }

    if (password !== confirm) {
      Toast.show({
        type: 'error', 
        text1: 'Error',
        text2: 'Passwords do not match 😢',
      });
      return;
    }

    // All validations passed
    router.replace("/logina");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account as Recycla</Text>

      {/* First Name */}
      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Company Name"
          style={styles.input}
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Registration Number"
          style={styles.input}
        />
      </View>

      {/* Email */}
      <View style={styles.inputWrapper}>
        <Feather name="mail" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Company Email"
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
        <TouchableOpacity onPress={() => router.push("/logina")}>
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
