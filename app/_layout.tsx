import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { DEFAULT_COLORS } from "@/constants/Colors";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <ThemeProvider value={DarkTheme}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              title: "Home",
              headerStyle: { backgroundColor: DEFAULT_COLORS.dark },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
