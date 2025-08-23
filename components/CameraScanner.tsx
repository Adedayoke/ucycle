import React, { useEffect, useRef, useState } from "react";
import * as FileSystem from 'expo-file-system';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraMode,
} from "expo-camera";
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
import { router } from "expo-router";

export default function CameraScanner() {
  // Changed from App to CameraScanner
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [flashOn, setFlashOn] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const [uploadUri, setUploadUri] = useState<string | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const { imageUri, handleChooseImage, imageName, setImageUri } =
    useImagePicker();

  // Use any-cast to attach optional props (e.g., enableTorch) safely
  const CameraAny = CameraView as any;

  useEffect(() => {
    // When a picture is taken, navigate to form with image
    if (uri) {
      router.push({
        pathname: "/submit_waste",
        params: { imageUri: uri, suggestedName: '' }
      });
      setUri(null);
    }
  }, [uri]);

  // Auto-prompt for camera permission on mount if not granted yet
  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission?.granted]);

  useEffect(() => {
    // When an image is picked from gallery, navigate to form
    if (imageUri) {
      const suggested = (imageName || '')
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .trim();
      router.push({
        pathname: "/submit_waste",
        params: { imageUri: imageUri, suggestedName: suggested }
      });
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
    setIsCapturing(true);
    const photo = await ref.current?.takePictureAsync({ quality: 0.85, skipProcessing: true, base64: true } as any);
    const p: any = photo as any;
    let outUri: string | undefined = undefined;
    // If base64 available, write to app cache and use that file path (not gallery)
    if (p?.base64) {
      try {
        const dest = `${FileSystem.cacheDirectory}ucam_${Date.now()}.jpg`;
        await FileSystem.writeAsStringAsync(dest, p.base64, { encoding: FileSystem.EncodingType.Base64 });
        outUri = dest;
      } catch {
        // fallback to using data URI if write fails
        outUri = `data:image/jpeg;base64,${p.base64}`;
      }
    } else {
      outUri = p?.uri || p?.assets?.[0]?.uri;
    }
    if (outUri) {
      // Normalize to file:// scheme if missing
      if (!outUri.startsWith('file://') && !outUri.startsWith('content://')) {
        if (!outUri.startsWith('data:')) outUri = `file://${outUri}`;
      }
      // If it's a file URI, ensure the file exists (skip for data URIs)
      if (!outUri.startsWith('data:')) {
        let exists = false;
        for (let i = 0; i < 5; i++) {
          try {
            const info = await FileSystem.getInfoAsync(outUri);
            exists = !!info.exists;
            if (exists) break;
          } catch {}
          await new Promise((r) => setTimeout(r, 80));
        }
        if (!exists) {
          await new Promise((r) => setTimeout(r, 120));
        }
      }
      setUri(outUri);
    }
    setIsCapturing(false);
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
          <PrimaryButton onPress={() => router.push("/submit_waste")}>Add to Wastes</PrimaryButton>
        </View>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraAny
        style={styles.camera}
        ref={ref}
        mode={mode}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
        enableTorch={flashOn}
      >
        <View style={styles.shutterContainer}>
          <OpaquePressable
            onPress={handleChooseImage}
            // style={styles.uploadImage}
          >
            <AntDesign name="picture" size={32} color="white" />
          </OpaquePressable>
          <Pressable onPress={() => setFlashOn((f) => !f)}>
            <MaterialCommunityIcons name={flashOn ? "flash" : "flash-off"} size={34} color="white" />
          </Pressable>
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

        {isCapturing && (
          <View style={styles.overlay}> 
            <Text style={styles.overlayText}>Processing...</Text>
          </View>
        )}
      </CameraAny>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: { color: 'white', fontSize: 18, fontWeight: '600' },
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
