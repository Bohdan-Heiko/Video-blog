import { SexondarySliderData } from "@/types/secondarySlider";
import { Link } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"; // Импортируем нужные компоненты из react-native-reanimated
import { SecondarySliderSkeleton } from "../skeletons/secondarySlider.skeleton";
import { SecondarySliderCard } from "./components/card";
import { style } from "./style/style";

interface Props {
  title: string;
  isLoading: boolean;
  data: SexondarySliderData[];
}
export const SecondarySlider = ({ isLoading, title, data }: Props) => {
  const fadeIn = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
    };
  });

  useEffect(() => {
    fadeIn.value = withSpring(1, { duration: 1500 });
  }, []);
  return (
    <Animated.View style={[style.mainContainer, animatedStyle]}>
      <Text style={style.mainTitle}>{title}</Text>

      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        style={style.slider}
      >
        <View style={style.cardContainer}>
          {isLoading
            ? Array.from([1, 2, 3]).map((i) => <SecondarySliderSkeleton key={i} />)
            : data?.map((slide, i) => (
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
    </Animated.View>
  );
};
