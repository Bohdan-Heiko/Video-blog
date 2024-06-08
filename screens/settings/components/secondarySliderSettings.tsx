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

  const onSecondaryTitleSizeChange = (value: number) => {
    setSecondarySliderData({ title_size: value })
  }
  return (
    <View>
      <Text
        style={[
          style.secondarySliderTitle,
          {
            fontSize: titleSize,
            backgroundColor:
              THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors
                .text
          }
        ]}
      >
        Secondary slider title
      </Text>
      <Slider
        minimumValue={10}
        value={titleSize}
        style={{ height: 40 }}
        maximumValue={40}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={setTitleSize}
        onSlidingComplete={onSecondaryTitleSizeChange}
      />
    </View>
  )
}
