import { Pressable, Text, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated" // Импортируем нужные компоненты из react-native-reanimated
import { useEffect } from "react"
import { Image } from "expo-image"
import { useRouter } from "expo-router"

import ArrowRightIcon from "@/assets/images/icons/arrow-right.svg"
import { MainSliderData } from "@/types/mainSlider"
import { SexondarySliderData } from "@/types/secondarySlider"

import { style } from "./style/style"

type SliderData = MainSliderData | SexondarySliderData | null

interface Props {
  data?: SliderData
}

export const ContinueWidget = ({ data }: Props) => {
  if (!data) return null
  const router = useRouter()

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
        <Text style={style.mainTitle}>Continue Watching</Text>

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
