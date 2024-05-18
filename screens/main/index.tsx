import { ContinueWidget } from "@/components/continue-watching";
import { MainSlider } from "@/components/main-slider";
import { SecondarySlider } from "@/components/seconddary-slider";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { style } from "./style";

export const Home = () => {
  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} style={style.main}>
      <StatusBar style="light" />
      <View style={style.mainContainer}>
        <MainSlider />
        <ContinueWidget />
        <SecondarySlider />
        <SecondarySlider />
      </View>
    </ScrollView>
  );
};
