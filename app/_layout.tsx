import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import GiftIcon from "@/assets/images/gift.png";
import { Search } from "@/components/search";
import { DEFAULT_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import store, { persistor } from "@/store";
import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useLayoutEffect(() => {
    NavigationBar.setBackgroundColorAsync(DEFAULT_COLORS.dark);
  }, []);

  return (
    <ThemeProvider value={DarkTheme}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <RootLayoutNav />
          </SafeAreaProvider>
        </PersistGate>
      </ReduxProvider>
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
              <Search />
            </View>
          ),
          headerStyle: { backgroundColor: DEFAULT_COLORS.dark },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="feed" options={{ headerShown: false }} />
    </Stack>
  );
}
