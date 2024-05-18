import { MainSlider } from "@/components/main-slider";
import { SecondarySlider } from "@/components/seconddary-slider";
import { ScrollView } from "react-native";
import { style } from "./style";

export const Home = () => {
  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} style={style.main}>
      <MainSlider />
      <SecondarySlider />
    </ScrollView>
  );
};
