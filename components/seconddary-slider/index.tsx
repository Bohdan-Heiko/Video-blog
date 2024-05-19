import { SexondarySliderData } from "@/types/secondarySlider";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SecondarySliderCard } from "./components/card";
import { style } from "./style/style";

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
              key={slide.id}
              href={{
                pathname: !slide.isCommingSoon ? "/feed" : "",
                params: {
                  data: JSON.stringify([
                    slide,
                    ...data.filter(
                      (dataSlide) => dataSlide.id !== slide.id && !dataSlide.isCommingSoon
                    ),
                  ]),
                },
              }}
            >
              <SecondarySliderCard slide={slide} />
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
