import { THEME_COLORS } from "@/constants/Colors"
import useActions from "@/hooks/useActions"
import { useAppSelector } from "@/store"
import Slider from "@react-native-community/slider"
import { useState } from "react"
import { Dimensions, Text, View, useColorScheme } from "react-native"
import { style } from "../style"

const { width: screenWidth } = Dimensions.get("window")

export const MainSliderSettings = () => {
  const { mainSliderData, theme_color } = useAppSelector((state) => state.settings_data)
  const { setMainSliderDimensions } = useActions()

  const [width, setWidth] = useState<number>(mainSliderData.width)
  const [height, setHeight] = useState<number>(mainSliderData.height)

  const THEME_TEXT_COLOR =
    THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors.text
  const THEME_BACKGROUND_COLOR =
    THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors.background

  const handleSetMainSliderDimensions = () => {
    setMainSliderDimensions({ width, height })
  }
  return (
    <View style={style.mainSliderSettingsContainer}>
      <Text
        style={[
          style.sliderTitle,
          {
            color: THEME_TEXT_COLOR
          }
        ]}
      >
        Main slider
      </Text>

      <View
        style={[
          style.settingsContainer,
          {
            backgroundColor: THEME_TEXT_COLOR
          }
        ]}
      >
        <Text style={[style.sliderTitle, { color: THEME_BACKGROUND_COLOR }]}>Width</Text>
        <Slider
          minimumValue={10}
          value={width}
          onValueChange={setWidth}
          maximumValue={screenWidth}
          maximumTrackTintColor="#000000"
          minimumTrackTintColor={THEME_BACKGROUND_COLOR}
          onSlidingComplete={handleSetMainSliderDimensions}
          thumbTintColor={THEME_BACKGROUND_COLOR}
          style={[
            style.slider,
            {
              borderColor: THEME_BACKGROUND_COLOR
            }
          ]}
        />
        <Text style={[style.sliderTitle, { color: THEME_BACKGROUND_COLOR }]}>Height</Text>
        <Slider
          value={height}
          minimumValue={100}
          maximumValue={300}
          onValueChange={setHeight}
          maximumTrackTintColor="#000000"
          minimumTrackTintColor={THEME_BACKGROUND_COLOR}
          onSlidingComplete={handleSetMainSliderDimensions}
          style={[
            style.slider,
            {
              borderColor: THEME_BACKGROUND_COLOR
            }
          ]}
        />
      </View>

      <View
        style={[
          style.sliderContainer,

          {
            width,
            height,
            backgroundColor: THEME_TEXT_COLOR
          }
        ]}
      ></View>
    </View>
  )
}
