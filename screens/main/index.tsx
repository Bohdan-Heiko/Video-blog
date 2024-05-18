import { ContinueWidget } from "@/components/continue-watching";
import { MainSlider } from "@/components/main-slider";
import { SecondarySlider } from "@/components/seconddary-slider";
import { FIRESTORE_DB } from "@/services/firebase.config";
import { MainSliderData } from "@/types/mainSlider";
import { SexondarySliderData } from "@/types/secondarySlider";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { style } from "./style";

const useGetSliderData = () => {
  const [sliderData, setSliderData] = useState<MainSliderData[] | null>(null);
  const [trendingSliderData, setTrendingSliderData] = useState<SexondarySliderData[] | null>(null);

  const mainSliderQuery = query(collection(FIRESTORE_DB, "main-slider"));
  const secondarySliderQuery = query(
    collection(FIRESTORE_DB, "trending"),
    orderBy("isCommingSoon", "asc")
  );

  const getMainSliderData = async () => {
    const querySnapshot = await getDocs(mainSliderQuery);
    const sliders: any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      sliders.push({ ...doc.data(), id: doc.id });
    });

    setSliderData(sliders);
  };

  const getSecondarySliderData = async () => {
    const querySnapshot = await getDocs(secondarySliderQuery);
    const sliders: any = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      sliders.push({ ...doc.data(), id: doc.id });
    });

    setTrendingSliderData(sliders);
  };
  console.log(trendingSliderData, "trendingSliderData");

  useEffect(() => {
    getMainSliderData();
    getSecondarySliderData();
  }, []);

  return {
    sliderData,
    trendingSliderData,
  };
};

export const Home = () => {
  const { sliderData, trendingSliderData } = useGetSliderData();
  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} style={style.main}>
      <StatusBar style="light" />
      <View style={style.mainContainer}>
        <MainSlider data={sliderData ?? []} />
        <ContinueWidget />
        <SecondarySlider title="Trending Now" data={trendingSliderData ?? []} />
        {/* <SecondarySlider title="Top Romance" /> */}
      </View>
    </ScrollView>
  );
};
