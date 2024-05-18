import { ScrollView } from "react-native";
import { MainSliderCard } from "./compoonents/card";
export const MainSlider = () => {
  return (
    <ScrollView horizontal={true} overScrollMode="never" showsHorizontalScrollIndicator={false}>
      <MainSliderCard />
      <MainSliderCard />
      <MainSliderCard />
    </ScrollView>
  );
};
