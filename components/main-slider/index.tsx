import { MainSliderData } from "@/types/mainSlider";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { MainSliderCard } from "./compoonents/card";

export const MainSlider = ({ data }: { data: MainSliderData[] }) => {
  return (
    <ScrollView horizontal={true} overScrollMode="never" showsHorizontalScrollIndicator={false}>
      {data?.map((slide) => (
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
