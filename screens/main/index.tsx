import { ScrollView, View } from "react-native"
import React from "react"
import { StatusBar } from "expo-status-bar"

import { ContinueWidget } from "@/components/continue-watching"
import { MainSlider } from "@/components/main-slider"
import { SecondarySlider } from "@/components/seconddary-slider"
import { useGetSliderData } from "@/hooks/useGetSlidersData"
import { useAppSelector } from "@/store"

import { style } from "./style"

export const Home = () => {
  const { sliderData, trendingSliderData, topRomanceData, loading } = useGetSliderData()
  const { video: videoData } = useAppSelector((state) => state.video_data)

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={style.main}
    >
      <StatusBar style="light" />
      <View style={style.mainContainer}>
        <MainSlider data={sliderData ?? []} isLoading={loading} />
        <ContinueWidget data={videoData} />
        <SecondarySlider
          isLoading={loading}
          title="Trending Now"
          data={trendingSliderData ?? []}
        />
        <SecondarySlider
          isLoading={loading}
          title="Top Romance"
          data={topRomanceData ?? []}
        />
      </View>
    </ScrollView>
  )
}
