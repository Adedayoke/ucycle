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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureNotifications } from "@/utils/notifications";
import { themes } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

export default function layout() {
  // const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
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

  useEffect(() => {
    // best-effort init; ignore result for now
    configureNotifications().catch(() => {});
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <TabBarProvider>
        <Stack screenOptions={{ contentStyle: { backgroundColor: themes.colorPrimaryLight } }}>
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
          <Stack.Screen name="scan" options={{ headerShown: false }} />
          <Stack.Screen name="scan_result" options={{ headerShown: false }} />
          <Stack.Screen name="submit_waste" options={{ headerShown: false }} />
          <Stack.Screen name="pickup" options={{ headerShown: false }} />
        </Stack>
      </TabBarProvider>
      <Toast config={toastConfig} />

      </QueryClientProvider>
    </>
  );
}
