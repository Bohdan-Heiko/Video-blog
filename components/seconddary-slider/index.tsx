import { ScrollView, Text, useColorScheme, View } from "react-native"
import Animated from "react-native-reanimated"
import { Link } from "expo-router"

import { useThemeColors } from "@/hooks/useThemeColors"
import { useAppSelector } from "@/store"
import { SexondarySliderData } from "@/types/secondarySlider"

import { SecondarySliderSkeleton } from "../skeletons/secondarySlider.skeleton"

import { SecondarySliderCard } from "./components/card"
import { useSeconrdarySlider } from "./hooks/useSecondarySlider"
import { style } from "./style/style"

interface Props {
  title: string
  isLoading: boolean
  data: SexondarySliderData[]
}
export const SecondarySlider = ({ isLoading, title, data }: Props) => {
  const { animatedStyle, handleSetVideoData } = useSeconrdarySlider(data)
  const { theme_color, secondarySliderData } = useAppSelector(
    (state) => state.settings_data
  )
  const { THEME_TEXT_COLOR } = useThemeColors({
    colorScheme: useColorScheme,
    theme_color
  })

  return (
    <Animated.View style={[style.mainContainer, animatedStyle]}>
      <Text
        style={[
          style.mainTitle,
          {
            color: THEME_TEXT_COLOR,
            fontSize: secondarySliderData.title_size
          }
        ]}
      >
        {title}
      </Text>

      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        style={style.slider}
      >
        <View style={style.cardContainer}>
          {isLoading
            ? Array.from([1, 2, 3]).map((i) => (
                <SecondarySliderSkeleton key={i} theme_color={theme_color} />
              ))
            : data?.map((slide) => (
                <Link
                  key={slide.id}
                  onPress={() => handleSetVideoData(slide)}
                  href={`${!slide.isCommingSoon ? "/feed" : ""}`}
                >
                  <SecondarySliderCard slide={slide} theme_color={theme_color} />
                </Link>
              ))}
        </View>
      </ScrollView>
    </Animated.View>
  )
}
