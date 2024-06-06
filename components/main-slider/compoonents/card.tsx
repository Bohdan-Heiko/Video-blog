import { memo, useEffect, useState } from "react"
import { ImageBackground, Text, View, useWindowDimensions } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"

import { MainSliderData } from "@/types/mainSlider"

import { style } from "../style/style"

interface SettingsInterface {
  width: number
  height: number
}

export const MainSliderCard = memo(
  ({
    slideData,
    mainSliderData
  }: {
    slideData: MainSliderData
    mainSliderData: SettingsInterface
  }) => {
    const { width } = useWindowDimensions()
    const fadeIn = useSharedValue(0)
    const [forceRender, setForceRender] = useState(false)

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: fadeIn.value
      }
    })

    useEffect(() => {
      fadeIn.value = withSpring(1, { duration: 1500 })
    }, [])

    return (
      <Animated.View
        style={[
          style.mainContainer,
          animatedStyle,
          {
            width: mainSliderData.width,
            height: mainSliderData.height,
            aspectRatio: mainSliderData.width / mainSliderData.height
          }
        ]}
      >
        <ImageBackground
          source={{ uri: slideData.img }}
          style={[
            style.backgroundImg,
            {
              width: mainSliderData.width,
              height: mainSliderData.height,
              aspectRatio: mainSliderData.width / mainSliderData.height
            }
          ]}
          resizeMode="stretch"
        >
          <View style={style.imgContainer}>
            {/* GENRE */}
            <View style={style.genreContainer}>
              <Text style={style.genreText}>{slideData.genre}</Text>
            </View>

            {/* TITLE */}
            <View style={style.textContainer}>
              <Text style={style.title}>{slideData.title}</Text>
              <Text style={style.subTitle}>{slideData.subTitle}</Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    )
  }
)
