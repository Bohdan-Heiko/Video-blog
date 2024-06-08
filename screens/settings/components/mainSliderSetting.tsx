import { THEME_COLORS } from "@/constants/Colors"
import useActions from "@/hooks/useActions"
import { useAppSelector } from "@/store"
import Slider from "@react-native-community/slider"
import { useState } from "react"
import { Dimensions, Text, View, useColorScheme } from "react-native"
import { style } from "../style"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

export const MainSliderSettings = () => {
  const { mainSliderData, theme_color } = useAppSelector((state) => state.settings_data)
  const { setMainSliderDimensions } = useActions()

  const [width, setWidth] = useState<number>(mainSliderData.width)
  const [height, setHeight] = useState<number>(mainSliderData.height)

  const handleSetMainSliderDimensions = () => {
    setMainSliderDimensions({ width, height })
  }
  return (
    <View style={style.mainSliderSettingsContainer}>
      <View
        style={[
          style.sliderContainer,

          {
            width,
            height,
            backgroundColor:
              THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors
                .text
          }
        ]}
      >
        <Text>Main slider</Text>
      </View>
      <View
        style={[
          style.settingsContainer,
          {
            backgroundColor:
              THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors
                .text
          }
        ]}
      >
        <Text>Width</Text>
        <Slider
          minimumValue={10}
          value={width}
          style={{ height: 40 }}
          onValueChange={setWidth}
          maximumValue={screenWidth}
          minimumTrackTintColor={
            THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors
              .background
          }
          maximumTrackTintColor="#000000"
          onSlidingComplete={handleSetMainSliderDimensions}
        />
        <Text>Height</Text>
        <Slider
          value={height}
          minimumValue={100}
          maximumValue={300}
          style={{ height: 40 }}
          onValueChange={setHeight}
          minimumTrackTintColor={
            THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors
              .background
          }
          maximumTrackTintColor="#000000"
          onSlidingComplete={handleSetMainSliderDimensions}
        />
      </View>
    </View>
  )
}
