import { memo, useEffect } from "react"
import { ImageBackground, Text, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"

import { MainSliderData } from "@/types/mainSlider"

import { SettingsInterface } from "@/types/seettings"
import { style } from "../style/style"

export const MainSliderCard = memo(
  ({
    slideData,
    mainSliderData
  }: {
    slideData: MainSliderData
    mainSliderData: SettingsInterface["mainSliderData"]
  }) => {
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
