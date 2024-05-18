import SecondaryBanner from "@/assets/images/secondaryBanner/book_cover.png";

import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SecondarySliderCard } from "./components/card";
import { style } from "./style/style";

type Slider = {
  id: number;
  img: typeof SecondaryBanner;
  title: string;
  isCommingSoon: boolean;
  isCommingTitileDate?: string;
  isCommingTitile?: string;
};

const DECONDARy_SLIDER: Slider[] = [
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
export const SecondarySlider = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={style.mainContainer}>
      <Text style={style.mainTitle}>Trending Now</Text>

      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        style={style.slider}
      >
        <View style={style.cardContainer}>
          {DECONDARy_SLIDER.map((slide) => (
            <SecondarySliderCard key={slide.id} slide={slide} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
