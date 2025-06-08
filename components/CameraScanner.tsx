import React, { useEffect, useRef } from "react";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraMode,
} from "expo-camera";
import { useState } from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import OpaquePressable from "./OpaquePressable";
import { useImagePicker } from "@/hooks/useImagePicker";
import PrimaryButton from "./ui/PrimaryButton";

export default function CameraScanner() {
  // Changed from App to CameraScanner
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [mode, setMode] = useState<CameraMode>("picture");

  const [uploadUri, setUploadUri] = useState<string | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const { imageUri, handleChooseImage, imageName, setImageUri } =
    useImagePicker();

  useEffect(() => {
    // When a picture is taken, move it to uploadUri
    if (uri) {
      setUploadUri(uri);
      setUri(null);
    }
  }, [uri]);

  useEffect(() => {
    // When an image is picked from gallery, use that
    if (imageUri) {
      setUploadUri(imageUri);
      setImageUri(null);
    }
  }, [imageUri]);

  if (!permission) {
    // Camera permissions are still loading.
    console.log("loading", permission);
    return (
      <View style={styles.container}>
        <Text>Loading camera...</Text>
      </View>
    ); // Fixed empty return
  }

  if (!permission.granted) {
    console.log("not granted", permission);
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      setUri(photo?.uri);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const renderPicture = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 70,
          paddingHorizontal: 15,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Scanning result
        </Text>
        <View style={{ height: "80%", justifyContent: "space-between" }}>
          <Image
            source={{ uri: uploadUri ? uploadUri : "" }}
            //   contentFit="contain"
            style={{
              width: "100%",
              aspectRatio: 1,
              objectFit: "contain",
              borderRadius: 20,
              borderWidth: 4,
              borderColor: "#666666",
            }}
          />
          <View style={{width: "auto", marginHorizontal: "auto", paddingHorizontal: 10,paddingVertical: 8, borderRadius: 30, backgroundColor: '#FACC39' }}>
            <Text style={{fontSize: 12, color: "#2F5F67"}}>Plastic bottle</Text>
          </View>
          <Text
            style={{ textAlign: "center", fontWeight: "800", fontSize: 25 }}
          >
            It's Recyclable
          </Text>
          {/* <Button onPress={() => setUri(null)} title="Take another picture" /> */}
          <PrimaryButton onPress={() => {}}>Add to Wastes</PrimaryButton>
        </View>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <OpaquePressable
            onPress={handleChooseImage}
            // style={styles.uploadImage}
          >
            <AntDesign name="picture" size={32} color="white" />
          </OpaquePressable>
          <Pressable onPress={takePicture}>
            {/* <Pressable onPress={mode === "picture" ? takePicture : recordVideo}> */}
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: mode === "picture" ? "white" : "red",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleCameraFacing}>
            <FontAwesome6 name="camera-rotate" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {uploadUri ? renderPicture() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "red",
    width: "100%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
