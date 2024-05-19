import SecondaryBanner from "@/assets/images/secondaryBanner/book_cover.png";
import { ContinueWidget } from "@/components/continue-watching";
import { MainSlider } from "@/components/main-slider";
import { SecondarySlider } from "@/components/seconddary-slider";
import { FIRESTORE_DB } from "@/services/firebase.config";
import { useAppSelector } from "@/store";
import { MainSliderData } from "@/types/mainSlider";
import { SexondarySliderData } from "@/types/secondarySlider";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
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

  const getMainSliderData = async () => {
    const querySnapshot = await getDocs(mainSliderQuery);
    const sliders: MainSliderData[] = [];
    querySnapshot.forEach((doc) => {
      sliders.push({ ...doc.data(), id: doc.id } as MainSliderData);
    });

    setSliderData(sliders);
  };

  const getSecondarySliderData = async () => {
    const querySnapshot = await getDocs(secondarySliderQuery);
    const sliders: SexondarySliderData[] = [];

    querySnapshot.forEach((doc) => {
      sliders.push({ ...doc.data(), id: doc.id } as SexondarySliderData);
    });

    setTrendingSliderData(secondarySliderRandomeElement(sliders));
  };

  useEffect(() => {
    getMainSliderData();
    getSecondarySliderData();
  }, []);

  return {
    sliderData,
    trendingSliderData,
  };
};

const DECONDARy_SLIDER = [
  {
    id: 1,
    img: SecondaryBanner,
    title: "Wolfstate chronicles: Alaska, Texas",
    isCommingSoon: false,
  },
  {
    id: 2,
    img: SecondaryBanner,
    title: "Wolfstate chronicles: Alaska, Texas",
    isCommingSoon: true,
    isCommingTitile: "Beautiful Revenge",
    isCommingTitileDate: "Coming July 2",
  },
  {
    id: 3,
    img: SecondaryBanner,
    title: "Wolfstate chronicles: Alaska, Texas",
    isCommingSoon: true,
    isCommingTitile: "Sin De Rella",
    isCommingTitileDate: "Coming July 2",
  },
];

export const Home = () => {
  const { sliderData, trendingSliderData } = useGetSliderData();
  const { video: videoData } = useAppSelector((state) => state.video_data);

  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} style={style.main}>
      <StatusBar style="light" />
      <View style={style.mainContainer}>
        <MainSlider data={sliderData ?? []} />
        <ContinueWidget data={videoData} />
        <SecondarySlider title="Trending Now" data={trendingSliderData ?? []} />
        {/* <SecondarySlider title="Top Romance" data={trendingSliderData ?? []} /> */}
      </View>
    </ScrollView>
  );
};
