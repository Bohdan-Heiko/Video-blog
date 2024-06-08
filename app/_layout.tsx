import * as NavigationBar from "expo-navigation-bar"
import { Link, Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useLayoutEffect } from "react"
import { Platform, Text, View, useColorScheme } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { Search } from "@/components/search"
import { VectorExpoIcons } from "@/components/ui/icons/vectorExpoIcons"
import { DEFAULT_COLORS, THEME_COLORS } from "@/constants/Colors"
import { FONTS } from "@/constants/fonts"
import { useThemeColors } from "@/hooks/useThemeColors"
import store, { persistor, useAppSelector } from "@/store"
import { ThemeProvider } from "@react-navigation/native"
import "react-native-reanimated"

SplashScreen.preventAutoHideAsync()

const MainLayout = () => {
  const { theme_color } = useAppSelector((state) => state.settings_data)

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
    <ThemeProvider
      value={THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"]}
    >
      <SafeAreaProvider>
        <RootLayoutNav />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <MainLayout />
      </PersistGate>
    </ReduxProvider>
  )
}

function RootLayoutNav() {
  const { theme_color } = useAppSelector((state) => state.settings_data)
  const { THEME_BACKGROUND_COLOR, THEME_TEXT_COLOR } = useThemeColors({
    colorScheme: useColorScheme,
    theme_color
  })

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
                color: THEME_TEXT_COLOR,
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
                <VectorExpoIcons
                  type="Ionicons"
                  name="settings-sharp"
                  size={24}
                  color={THEME_TEXT_COLOR}
                />
              </Link>
            </View>
          ),
          headerStyle: {
            backgroundColor: THEME_BACKGROUND_COLOR
          },
          headerShadowVisible: false
        }}
      />
      <Stack.Screen name="feed" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: THEME_BACKGROUND_COLOR
          }
        }}
      />
    </Stack>
  )
}
