import { ContinueWidget } from "@/components/continue-watching";
import { MainSlider } from "@/components/main-slider";
import { SecondarySlider } from "@/components/seconddary-slider";
import { FIRESTORE_DB } from "@/services/firebase.config";
import { useAppSelector } from "@/store";
import { MainSliderData } from "@/types/mainSlider";
import { SexondarySliderData } from "@/types/secondarySlider";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { style } from "./style";

const randomSorting = Math.floor(Math.random() * 2) === 0 ? "asc" : "desc";

const mainSliderQuery = query(
  collection(FIRESTORE_DB, "main-slider"),
  orderBy("url", randomSorting)
);
const secondarySliderQuery = query(
  collection(FIRESTORE_DB, "trending"),
  orderBy("isCommingSoon", "asc")
);

const secondarySliderRandomeElement = (sliders: SexondarySliderData[]) => {
  const comingSoonElements = sliders.filter((slider) => slider.isCommingSoon);
  const nonComingSoonElements = sliders.filter((slider) => !slider.isCommingSoon);
  const shuffledNonComingSoon = nonComingSoonElements.sort(() => 0.5 - Math.random());

  return [...shuffledNonComingSoon, ...comingSoonElements].slice(0, 5);
};

const useGetSliderData = () => {
  const [sliderData, setSliderData] = useState<MainSliderData[] | null>(null);
  const [trendingSliderData, setTrendingSliderData] = useState<SexondarySliderData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { searchValue } = useAppSelector((state) => state.video_data);
  const getMainSliderData = async () => {
    setLoading(true);

    const querySnapshot = await getDocs(mainSliderQuery);
    const sliders: MainSliderData[] = [];
    querySnapshot.forEach((doc) => {
      sliders.push({ ...doc.data(), id: doc.id } as MainSliderData);
    });

    setSliderData(sliders);
  };

  const getSecondarySliderData = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(secondarySliderQuery);
    const sliders: SexondarySliderData[] = [];

    querySnapshot.forEach((doc) => {
      sliders.push({ ...doc.data(), id: doc.id } as SexondarySliderData);
    });

    setTrendingSliderData(secondarySliderRandomeElement(sliders));
  };

  const searchMainSliderByGenre = (genre: string) => {
    console.log("search");

    if (!sliderData || !genre) return getMainSliderData();

    const filteredSliders = sliderData?.filter((slider) =>
      slider.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
    );

    if (!filteredSliders.length) return;

    setSliderData(filteredSliders);
  };

  useEffect(() => {
    searchMainSliderByGenre(searchValue);
  }, [searchValue]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (sliderData && trendingSliderData) {
      timeout = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [sliderData, trendingSliderData]);

  useEffect(() => {
    getMainSliderData();
    getSecondarySliderData();
  }, []);

  return {
    loading,
    sliderData,
    trendingSliderData,
  };
};

export const Home = () => {
  const { sliderData, trendingSliderData, loading } = useGetSliderData();
  const { video: videoData } = useAppSelector((state) => state.video_data);

  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} style={style.main}>
      <StatusBar style="light" />
      <View style={style.mainContainer}>
        <MainSlider data={sliderData ?? []} isLoading={loading} />
        <ContinueWidget data={videoData} />
        <SecondarySlider isLoading={loading} title="Trending Now" data={trendingSliderData ?? []} />
        {/* <SecondarySlider title="Top Romance" data={trendingSliderData ?? []} /> */}
      </View>
    </ScrollView>
  );
};
