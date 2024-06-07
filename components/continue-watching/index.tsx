import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Pressable, Text, View, useColorScheme } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"

import ArrowRightIcon from "@/assets/images/icons/arrow-right.svg"
import { MainSliderData } from "@/types/mainSlider"
import { SexondarySliderData } from "@/types/secondarySlider"

import { THEME_COLORS } from "@/constants/Colors"
import { useAppSelector } from "@/store"
import { style } from "./style/style"

type SliderData = MainSliderData | SexondarySliderData | null

interface Props {
  data?: SliderData
}

export const ContinueWidget = ({ data }: Props) => {
  if (!data) return null
  const router = useRouter()
  const { theme_color } = useAppSelector((state) => state.settings_data)

  const fadeIn = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value
    }
  })

  useEffect(() => {
    fadeIn.value = withSpring(1, { duration: 2500 })
  }, [])

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPress={() =>
          router.push({ pathname: "/feed", params: { data: JSON.stringify([data]) } })
        }
        style={style.mainContainer}
      >
        <Text
          style={[
            style.mainTitle,
            {
              color:
                THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"]
                  .colors.text
            }
          ]}
        >
          Continue Watching
        </Text>

        <View style={style.container}>
          <View style={style.rowContainer}>
            <View style={style.imageContainer}>
              <Image source={{ uri: data?.img }} style={style.image} />
            </View>

            <View style={style.titleContainer}>
              <Text style={style.title}>{data?.title}</Text>
              {"subTitle" in data && (
                <Text style={[style.subTitle, { display: "flex" }]}>
                  {data?.subTitle}
                </Text>
              )}
            </View>
          </View>
          <View style={style.icon}>
            <ArrowRightIcon />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  )
}
