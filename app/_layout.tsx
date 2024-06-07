import * as NavigationBar from "expo-navigation-bar"
import { Link, Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useLayoutEffect } from "react"
import { Platform, Text, View, useColorScheme } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { Search } from "@/components/search"
import { DEFAULT_COLORS, THEME_COLORS } from "@/constants/Colors"
import { FONTS } from "@/constants/fonts"
import store, { persistor } from "@/store"
import { Ionicons } from "@expo/vector-icons"
import { ThemeProvider } from "@react-navigation/native"
import "react-native-reanimated"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    let timeout: NodeJS.Timeout
    timeout = setTimeout(() => {
      SplashScreen.hideAsync()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  useLayoutEffect(() => {
    Platform.OS === "android" &&
      NavigationBar.setBackgroundColorAsync(DEFAULT_COLORS.dark)
  }, [])

  return (
    <ReduxProvider store={store}>
      <ThemeProvider value={THEME_COLORS[useColorScheme() ?? "dark"]}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <RootLayoutNav />
          </SafeAreaProvider>
        </PersistGate>
      </ThemeProvider>
    </ReduxProvider>
  )
}

function RootLayoutNav() {
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
                color: THEME_COLORS[useColorScheme() ?? "light"].colors.text,
                fontFamily: FONTS.NunitoBold700,
                fontSize: 20,
                lineHeight: 24
              }}
            >
              Home
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
              <Search />
              <Link href="/settings" push>
                <Ionicons
                  name="settings-sharp"
                  size={24}
                  color={THEME_COLORS[useColorScheme() ?? "light"].colors.text}
                />
              </Link>
            </View>
          ),
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false
        }}
      />
      <Stack.Screen name="feed" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Settings"
          // headerStyle: { backgroundColor: "white" }
        }}
      />
    </Stack>
  )
}
