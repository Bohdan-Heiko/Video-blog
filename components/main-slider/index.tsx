import { MainSliderData } from "@/types/mainSlider";
import { ScrollView } from "react-native";
import { MainSliderCard } from "./compoonents/card";
export const MainSlider = ({ data }: { data: MainSliderData[] }) => {
  return (
    <ScrollView horizontal={true} overScrollMode="never" showsHorizontalScrollIndicator={false}>
      {data?.map((slide) => (
        <MainSliderCard key={slide.id} slideData={slide} />
      ))}
    </ScrollView>
  );
};
