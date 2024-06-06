import { Pressable, ScrollView } from "react-native"

import useActions from "@/hooks/useActions"
import { MainSliderData } from "@/types/mainSlider"

import { MainSliderSkeleton } from "../skeletons/mainSlider.skeleton"

import { useAppSelector } from "@/store"
import { useRouter } from "expo-router"

import { useCallback } from "react"
import { MainSliderCard } from "./compoonents/card"

export const MainSlider = ({
  data,
  isLoading
}: {
  data: MainSliderData[]
  isLoading: boolean
}) => {
  const router = useRouter()
  const { setFeedVideos } = useActions()
  const { mainSliderData } = useAppSelector((state) => state.settings_data)

  const handleSetVideoData = useCallback(
    (slide: MainSliderData) => {
      return setFeedVideos([slide, ...data.filter((d) => d.id !== slide.id)])
    },
    [data]
  )

  const handleNavigate = (slide: MainSliderData) => {
    router.push("/feed")
    handleSetVideoData(slide)
  }
  return (
    <ScrollView
      horizontal={true}
      overScrollMode="never"
      showsHorizontalScrollIndicator={false}
    >
      {isLoading
        ? Array.from([1, 2]).map((i) => <MainSliderSkeleton key={i} />)
        : data?.map((slide) => (
            <Pressable key={slide.id} onPress={() => handleNavigate(slide)}>
              <MainSliderCard
                key={slide.id}
                slideData={slide}
                mainSliderData={mainSliderData}
              />
            </Pressable>
            // </Link>
          ))}
    </ScrollView>
  )
}
