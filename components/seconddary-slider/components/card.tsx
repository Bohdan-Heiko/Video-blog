import { Image } from "expo-image"
import { Text, useColorScheme, useWindowDimensions, View } from "react-native"

import LockIcon from "@/assets/images/icons/lock.svg"
import SecondaryBanner from "@/assets/images/secondaryBanner/book_cover.png"

import { THEME_COLORS } from "@/constants/Colors"
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
}
export const SecondarySliderCard = ({ slide }: Slide) => {
  const { width } = useWindowDimensions()
  const colorScheme = useColorScheme()

  return (
    <View style={[style.card, { width: width / 3 }]}>
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
            { color: THEME_COLORS[colorScheme ?? "light"].colors.text }
          ]}
        >
          {slide.isCommingSoon ? slide.isCommingTitile : slide.title}
        </Text>
      </View>
    </View>
  )
}
