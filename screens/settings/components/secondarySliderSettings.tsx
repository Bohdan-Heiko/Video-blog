import { THEME_COLORS } from "@/constants/Colors"
import useActions from "@/hooks/useActions"
import { useAppSelector } from "@/store"
import Slider from "@react-native-community/slider"
import { useState } from "react"
import { Text, View, useColorScheme } from "react-native"
import { style } from "../style"

export const SecondarySliderSettings = () => {
  const { setSecondarySliderData } = useActions()

  const { secondarySliderData, theme_color } = useAppSelector(
    (state) => state.settings_data
  )

  const [titleSize, setTitleSize] = useState<number>(secondarySliderData.title_size)

  const THEME_BACKGROUND_COLOR =
    THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors.background

  const THEME_TEXT_COLOR =
    THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors.text

  const onSecondaryTitleSizeChange = (value: number) => {
    setSecondarySliderData({ title_size: value })
  }
  return (
    <View
      style={{
        borderRadius: 20,
        padding: 10,
        gap: 10,
        backgroundColor:
          THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors.text
      }}
    >
      <Text
        style={[
          style.secondarySliderTitle,
          {
            fontSize: titleSize,
            color: THEME_BACKGROUND_COLOR
          }
        ]}
      >
        Secondary title
      </Text>
      <Slider
        minimumValue={10}
        value={titleSize}
        maximumValue={40}
        onValueChange={setTitleSize}
        maximumTrackTintColor="#000000"
        thumbTintColor={THEME_BACKGROUND_COLOR}
        minimumTrackTintColor={THEME_BACKGROUND_COLOR}
        onSlidingComplete={onSecondaryTitleSizeChange}
        style={[
          style.slider,
          {
            borderColor: THEME_BACKGROUND_COLOR
          }
        ]}
      />
    </View>
  )
}
