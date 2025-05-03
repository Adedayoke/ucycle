import { toastConfig } from "@/components/toastconfig";
import { TabBarProvider } from "@/context/TabBarContext";
import {
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
// import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function layout() {
  // const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <TabBarProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="logina"
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="loginu"
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="signupa"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signupu"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding"
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="role"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="signup"
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="loading"
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
          <Stack.Screen name="scan_result" options={{ headerShown: false }} />
          <Stack.Screen name="submit_waste" options={{ headerShown: false }} />
        </Stack>
      </TabBarProvider>
      <Toast config={toastConfig} />
    </>
  );
}
