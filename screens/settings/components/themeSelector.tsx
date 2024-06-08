import { Pressable } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"
import { memo, useState } from "react"

import { VectorExpoIcons } from "@/components/ui/icons/vectorExpoIcons"
import { DEFAULT_COLORS } from "@/constants/Colors"
import useActions from "@/hooks/useActions"
import { SettingsInterface } from "@/types/seettings"

import { style } from "../style"

export const ThemeSelector = memo(
  ({ theme_icon }: { theme_icon: SettingsInterface["theme_icon"] }) => {
    const { setTheme } = useActions()
    const [isInputVisible, setInputVisible] = useState(false)

    // ANIMATOIN SETTINGS
    const colorsBlockWidth = useSharedValue(45)
    const colorsThemeStyle = useAnimatedStyle(() => {
      return {
        width: colorsBlockWidth.value
      }
    })

    const toggleColorsTheme = () => {
      setInputVisible(!isInputVisible)
      colorsBlockWidth.value = withTiming(isInputVisible ? 45 : 180, { duration: 300 })
    }

    return (
      <Animated.View
        style={[
          style.mainThemeContainer,
          colorsThemeStyle,
          { backgroundColor: DEFAULT_COLORS.gray }
        ]}
      >
        <Pressable onPress={toggleColorsTheme} style={style.themeIconBtn}>
          <VectorExpoIcons
            type={theme_icon.type}
            name={theme_icon.name}
            size={30}
            color="black"
          />
        </Pressable>

        <Pressable
          onPress={() => setTheme("dark")}
          style={[
            style.themeBtn,
            {
              backgroundColor: DEFAULT_COLORS.dark
            }
          ]}
        ></Pressable>

        <Pressable
          onPress={() => setTheme("blue")}
          style={[
            style.themeBtn,
            {
              backgroundColor: DEFAULT_COLORS.blue
            }
          ]}
        ></Pressable>

        <Pressable
          onPress={() => setTheme("light")}
          style={[
            style.themeBtn,
            {
              backgroundColor: DEFAULT_COLORS.white
            }
          ]}
        ></Pressable>
      </Animated.View>
    )
  },
  // DEFINE RERENDERS
  ({ theme_icon }) =>
    theme_icon.name !== theme_icon.name || theme_icon.type !== theme_icon.type
)
