import { Text, useColorScheme, useWindowDimensions, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"
import { memo, useEffect } from "react"
import { Image } from "expo-image"

import LockIcon from "@/assets/images/icons/lock.svg"
import SecondaryBanner from "@/assets/images/secondaryBanner/book_cover.png"
import { THEME_COLORS } from "@/constants/Colors"
import { SettingsInterface } from "@/types/seettings"

import { style } from "../style/style"

type Slide = {
  slide: {
    id: string
    img: typeof SecondaryBanner
    title: string
    isCommingSoon: boolean
    isCommingTitileDate?: string
    isCommingTitile?: string
  }
  theme_color: SettingsInterface["theme_color"]
}
export const SecondarySliderCard = memo(({ slide, theme_color }: Slide) => {
  const { width } = useWindowDimensions()
  const colorScheme = useColorScheme()

  const fadeIn = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value
    }
  })

  useEffect(() => {
    fadeIn.value = withSpring(1, { duration: 1500 })
  }, [])

  return (
    <Animated.View style={[style.card, animatedStyle, { width: width / 3 }]}>
      <View style={style.imgContainer}>
        <Image
          source={slide.img}
          blurRadius={slide.isCommingSoon ? 10 : 0}
          style={style.img}
        />
        {slide.isCommingSoon && (
          <View style={style.lockContainer}>
            <LockIcon />
          </View>
        )}
      </View>

      <View style={style.textContainer}>
        {slide.isCommingSoon && (
          <Text style={style.comminSoongTitle}>{slide.isCommingTitileDate}</Text>
        )}
        <Text
          style={[
            style.title,
            {
              color:
                THEME_COLORS[theme_color ? theme_color : colorScheme ?? "dark"].colors
                  .text
            }
          ]}
        >
          {slide.isCommingSoon ? slide.isCommingTitile : slide.title}
        </Text>
      </View>
    </Animated.View>
  )
})
