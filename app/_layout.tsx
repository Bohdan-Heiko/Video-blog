import * as NavigationBar from "expo-navigation-bar"
import { Link, Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useLayoutEffect } from "react"
import { Platform, Text, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { Search } from "@/components/search"
import { DEFAULT_COLORS } from "@/constants/Colors"
import { FONTS } from "@/constants/fonts"
import store, { persistor } from "@/store"
import { Ionicons } from "@expo/vector-icons"
import { DarkTheme, ThemeProvider } from "@react-navigation/native"
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
    <ThemeProvider value={DarkTheme}>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <RootLayoutNav />
          </SafeAreaProvider>
        </PersistGate>
      </ReduxProvider>
    </ThemeProvider>
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
                color: DEFAULT_COLORS.white,
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
                <Ionicons name="settings-sharp" size={24} color="white" />
              </Link>
            </View>
          ),
          headerStyle: { backgroundColor: DEFAULT_COLORS.dark },
          headerShadowVisible: false
        }}
      />
      <Stack.Screen name="feed" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Settings"

          // headerRight: () => (
          //   <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          //     <Link href="/" replace>
          //       <Ionicons name="settings-sharp" size={24} color="white" />
          //     </Link>
          //   </View>
          // )
        }}
      />
    </Stack>
  )
}
