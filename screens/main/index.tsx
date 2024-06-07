import { StatusBar } from "expo-status-bar"
import React from "react"
import { ScrollView, View, useColorScheme } from "react-native"

import { ContinueWidget } from "@/components/continue-watching"
import { MainSlider } from "@/components/main-slider"
import { SecondarySlider } from "@/components/seconddary-slider"
import { useGetSliderData } from "@/hooks/useGetSlidersData"
import { useAppSelector } from "@/store"

import { THEME_COLORS } from "@/constants/Colors"
import { style } from "./style"

export const Home = () => {
  const colorScheme = useColorScheme()
  const { sliderData, trendingSliderData, topRomanceData, loading } = useGetSliderData()
  const { video: videoData } = useAppSelector((state) => state.video_data)
  const { theme_color } = useAppSelector((state) => state.settings_data)

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={style.main}
    >
      <StatusBar
        style={
          THEME_COLORS[theme_color ? theme_color : colorScheme ?? "dark"].dark
            ? "light"
            : "dark"
        }
      />
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
