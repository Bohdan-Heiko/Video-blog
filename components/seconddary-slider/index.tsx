import SecondaryBanner from "@/assets/images/secondaryBanner/book_cover.png";

import { SexondarySliderData } from "@/types/secondarySlider";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SecondarySliderCard } from "./components/card";
import { style } from "./style/style";

const DECONDARy_SLIDER: SexondarySliderData[] = [
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

interface Props {
  title: string;
  data: SexondarySliderData[];
}
export const SecondarySlider = ({ title, data }: Props) => {
  return (
    <View style={style.mainContainer}>
      <Text style={style.mainTitle}>{title}</Text>

      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        style={style.slider}
      >
        <View style={style.cardContainer}>
          {data?.map((slide) => (
            <Link
              href={{
                pathname: !slide.isCommingSoon ? "/feed" : "",
                params: {
                  data: JSON.stringify([
                    slide,
                    ...data.filter((dataSlide) => dataSlide.id !== slide.id),
                  ]),
                },
              }}
            >
              <SecondarySliderCard key={slide.id} slide={slide} />
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
