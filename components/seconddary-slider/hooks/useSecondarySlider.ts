import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated" // Импортируем нужные компоненты из react-native-reanimated
import { useEffect } from "react"

import useActions from "@/hooks/useActions"
import { SexondarySliderData } from "@/types/secondarySlider"

interface ReturnedValue {
  animatedStyle: { opacity: number }
  handleSetVideoData: (slide: SexondarySliderData) => void
}

export const useSeconrdarySlider = (data: SexondarySliderData[]): ReturnedValue => {
  const fadeIn = useSharedValue(0)
  const { setFeedVideos } = useActions()

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value
    }
  })

  const handleSetVideoData = (slide: SexondarySliderData) => {
    return setFeedVideos([
      slide,
      ...data.filter((dataSlide) => dataSlide.id !== slide.id && !dataSlide.isCommingSoon)
    ])
  }

  useEffect(() => {
    fadeIn.value = withSpring(1, { duration: 1500 })
  }, [])

  return { animatedStyle, handleSetVideoData }
}
