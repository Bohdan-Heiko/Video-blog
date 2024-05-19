import { ScrollView, Text, View } from "react-native"
import Animated from "react-native-reanimated" // Импортируем нужные компоненты из react-native-reanimated
import { Link } from "expo-router"

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
  return (
    <Animated.View style={[style.mainContainer, animatedStyle]}>
      <Text style={style.mainTitle}>{title}</Text>

      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        style={style.slider}
      >
        <View style={style.cardContainer}>
          {isLoading
            ? Array.from([1, 2, 3]).map((i) => <SecondarySliderSkeleton key={i} />)
            : data?.map((slide) => (
                <Link
                  key={slide.id}
                  onPress={() => handleSetVideoData(slide)}
                  href={`${!slide.isCommingSoon ? "/feed" : ""}`}
                >
                  <SecondarySliderCard slide={slide} />
                </Link>
              ))}
        </View>
      </ScrollView>
    </Animated.View>
  )
}
