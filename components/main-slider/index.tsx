import { MainSliderData } from "@/types/mainSlider";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { MainSliderSkeleton } from "../skeletons/mainSlider.skeleton";
import { MainSliderCard } from "./compoonents/card";

export const MainSlider = ({ data, isLoading }: { data: MainSliderData[]; isLoading: boolean }) => {
  return (
    <ScrollView horizontal={true} overScrollMode="never" showsHorizontalScrollIndicator={false}>
      {isLoading
        ? Array.from([1, 2]).map((i) => <MainSliderSkeleton key={i} />)
        : data?.map((slide, i) => (
            <Link
              key={slide.id}
              href={{
                pathname: "/feed",
                params: { data: JSON.stringify([slide, ...data.filter((d) => d.id !== slide.id)]) },
              }}
            >
              <MainSliderCard slideData={slide} />
            </Link>
          ))}
    </ScrollView>
  );
};
