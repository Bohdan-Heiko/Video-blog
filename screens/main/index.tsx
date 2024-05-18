import { ContinueWidget } from "@/components/continue-watching";
import { MainSlider } from "@/components/main-slider";
import { SecondarySlider } from "@/components/seconddary-slider";
import { ScrollView, View } from "react-native";
import { style } from "./style";

export const Home = () => {
  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} style={style.main}>
      <View style={style.mainContainer}>
        <MainSlider />
        <ContinueWidget />
        <SecondarySlider />
        <SecondarySlider />
      </View>
    </ScrollView>
  );
};
