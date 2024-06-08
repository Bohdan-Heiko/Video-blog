import { DEFAULT_COLORS } from "@/constants/Colors"
import useActions from "@/hooks/useActions"

import { useState } from "react"
import { Pressable } from "react-native"

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { VectorExpoIcons } from "@/components/ui/icons/vectorExpoIcons"
import { useAppSelector } from "@/store"
import { style } from "../style"

export const ThemeSelector = ({}) => {
  const { setTheme } = useActions()
  const [isInputVisible, setInputVisible] = useState(false)
  const { theme_icon } = useAppSelector((state) => state.settings_data)

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

  console.log(theme_icon)

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
}
