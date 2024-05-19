import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import GiftIcon from "@/assets/images/gift.png";
import SearchIcon from "@/assets/images/icons/search.svg";
import { DEFAULT_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { VideoProvider } from "@/context/feed.context";
import { Image } from "expo-image";
import { useEffect } from "react";
import { Text, View } from "react-native";
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
        <VideoProvider>
          <RootLayoutNav />
        </VideoProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => (
            <Text
              style={{
                color: DEFAULT_COLORS.white,
                fontFamily: FONTS.NunitoBold700,
                fontSize: 20,
                lineHeight: 24,
              }}
            >
              Home
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
              <Image source={GiftIcon} style={{ width: 40, height: 40, marginTop: -10 }} />
              <SearchIcon />
            </View>
          ),
          headerStyle: { backgroundColor: DEFAULT_COLORS.dark },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="feed" options={{ headerShown: false }} />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
