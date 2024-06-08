import { THEME_COLORS } from "@/constants/Colors"
import useActions from "@/hooks/useActions"
import { useThemeColors } from "@/hooks/useThemeColors"
import { SettingsInterface } from "@/types/seettings"
import Slider from "@react-native-community/slider"
import { memo, useState } from "react"
import { Text, View, useColorScheme } from "react-native"
import { style } from "../style"

interface Iprops {
  secondarySliderData: SettingsInterface["secondarySliderData"]
  theme_color: SettingsInterface["theme_color"]
}

export const SecondarySliderSettings = memo(
  ({ secondarySliderData, theme_color }: Iprops) => {
    const { setSecondarySliderData } = useActions() // ACTIONS FROM REDUX

    // GET THEME COLORS
    const { THEME_BACKGROUND_COLOR } = useThemeColors({
      colorScheme: useColorScheme,
      theme_color
    })

    const [titleSize, setTitleSize] = useState<number>(secondarySliderData.title_size)

    // SET TITLE SIZE TO REDUX
    const onSecondaryTitleSizeChange = (value: number) => {
      setSecondarySliderData({ title_size: value })
    }

    return (
      <View
        style={[
          style.secondarySliderContainer,
          {
            backgroundColor:
              THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors
                .text
          }
        ]}
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
  },
  // DEFINE RERENDERS
  ({ secondarySliderData, theme_color }) =>
    secondarySliderData.title_size === secondarySliderData.title_size &&
    theme_color !== theme_color
)
