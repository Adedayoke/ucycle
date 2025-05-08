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
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import * as React from "react";
import Toast from "react-native-toast-message";
import { useRegisterRecycla } from "@/hooks/QueryHooks/useRegisterRecycla";
import { useImagePicker } from "@/hooks/useImagePicker";
import OpaquePressable from "@/components/OpaquePressable";
import { themes } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ActionButtons from "@/components/ActionButtons";

export default function SignupScreen() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("xdfbxdb");
  const [registrationNumber, setRegistrationNumber] = useState("1234565323");
  const [email, setEmail] = useState("companyTest13@gmail.com");
  const [password, setPassword] = useState("Test123");
  const [confirm, setConfirm] = useState("Test123");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<String[]>([]);

  const { registerCompany, isPending } = useRegisterRecycla();
  const { imageUri, handleChooseImage, imageName } = useImagePicker();

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Hello Recykla Agent!",
      text2:
        "You will be prompted to provide document validating your recyling license upon  sign up.",
      position: "top",
    });
    console.log("Toast shown");
  }, []);

  const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSignup = async () => {
    if (
      !companyName.trim() ||
      !registrationNumber.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirm.trim()
    ) {
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

    if (password.length < 6 || password !== confirm) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match 😢",
      });
      return;
    }

    const formData = new FormData();
    formData.append("username", companyName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("company_name", companyName);
    formData.append("registration_number", registrationNumber);

    if (imageUri) {
      const fileName = imageUri.split("/").pop() || "license.jpg";
      const match = /\.(\w+)$/.exec(fileName);
      const ext = match ? match[1] : "jpg";
      const mimeType = `image/${ext}`;

      const blob = await (await fetch(imageUri)).blob();

      formData.append("recycling_license", {
        uri: imageUri,
        type: mimeType,
        name: fileName,
      } as any); // `as any` to satisfy React Native's FormData typing
    }

    registerCompany(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account as Recycla</Text>

      {/* First Name */}
      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={companyName}
          onChangeText={setCompanyName}
          placeholder="Company Name"
          style={styles.input}
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputWrapper}>
        <Feather name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
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

      <OpaquePressable onPress={handleChooseImage} style={styles.uploadImage}>
        <MaterialCommunityIcons
          name="license"
          size={20}
          style={styles.icon}
          color="#666"
        />
        {!imageName ? (
          <Text style={styles.uploadImageText}>
            Upload registration license
          </Text>
        ) : (
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "90%"}}>
            <Text>{imageName.slice(0, 15)}...</Text>
            <Image source={{uri: imageUri || ""}} width={30} height={30} />
          </View>
        )}
      </OpaquePressable>
      {/* {formError.length > 0 &&
        formError.map((err, index) => <Text key={index}>{err}</Text>)} */}

      {/* Signup Button */}
      <ActionButtons
        text="Sign up"
        textStyle={styles.buttonText}
        onPress={handleSignup}
        disabledState={isPending}
        style={styles.button}
        isPending={isPending}
      />

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
  uploadImage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
  },
  uploadImageText: {
    fontSize: 16,
    opacity: 0.4,
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
