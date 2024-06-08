import useActions from "@/hooks/useActions"
import { useThemeColors } from "@/hooks/useThemeColors"
import { SettingsInterface } from "@/types/seettings"
import Slider from "@react-native-community/slider"
import { memo, useState } from "react"
import { Dimensions, Text, View, useColorScheme } from "react-native"
import { style } from "../style"

const { width: screenWidth } = Dimensions.get("window")

interface IProps {
  mainSliderData: SettingsInterface["mainSliderData"]
  theme_color: SettingsInterface["theme_color"]
}

export const MainSliderSettings = memo(
  ({ mainSliderData, theme_color }: IProps) => {
    const { setMainSliderDimensions } = useActions()

    const [width, setWidth] = useState<number>(mainSliderData.width)
    const [height, setHeight] = useState<number>(mainSliderData.height)

    const { THEME_BACKGROUND_COLOR, THEME_TEXT_COLOR } = useThemeColors({
      colorScheme: useColorScheme,
      theme_color
    })

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
          <Text style={[style.sliderTitle, { color: THEME_BACKGROUND_COLOR }]}>
            Width
          </Text>
          <Slider
            minimumValue={10}
            value={width}
            onValueChange={setWidth}
            maximumValue={screenWidth}
            maximumTrackTintColor="#000000"
            thumbTintColor={THEME_BACKGROUND_COLOR}
            minimumTrackTintColor={THEME_BACKGROUND_COLOR}
            onSlidingComplete={handleSetMainSliderDimensions}
            style={[
              style.slider,
              {
                borderColor: THEME_BACKGROUND_COLOR
              }
            ]}
          />
          <Text style={[style.sliderTitle, { color: THEME_BACKGROUND_COLOR }]}>
            Height
          </Text>
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
  },
  ({ mainSliderData, theme_color }) =>
    (mainSliderData.width === mainSliderData.width ||
      mainSliderData.height === mainSliderData.height) &&
    theme_color !== theme_color
)
