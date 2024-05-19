import { ScrollView } from "react-native"
import { Link } from "expo-router"

import useActions from "@/hooks/useActions"
import { MainSliderData } from "@/types/mainSlider"

import { MainSliderSkeleton } from "../skeletons/mainSlider.skeleton"

import { MainSliderCard } from "./compoonents/card"

export const MainSlider = ({
  data,
  isLoading
}: {
  data: MainSliderData[]
  isLoading: boolean
}) => {
  const { setFeedVideos } = useActions()

  const handleSetVideoData = (slide: MainSliderData) => {
    return setFeedVideos([slide, ...data.filter((d) => d.id !== slide.id)])
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
            <Link key={slide.id} onPress={() => handleSetVideoData(slide)} href={"/feed"}>
              <MainSliderCard slideData={slide} />
            </Link>
          ))}
    </ScrollView>
  )
}
