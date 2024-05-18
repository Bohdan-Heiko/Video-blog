import { MainSlider } from "@/components/main-slider";
import { ScrollView } from "react-native";
import { style } from "./style";

export const Home = () => {
  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} style={style.main}>
      <MainSlider />
    </ScrollView>
  );
};
