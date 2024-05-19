import { MainSliderData } from "@/types/mainSlider";
import { useEffect } from "react";
import { ImageBackground, Text, View, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"; // Импортируем нужные компоненты из react-native-reanimated
import { style } from "../style/style";

export const MainSliderCard = ({ slideData }: { slideData: MainSliderData }) => {
  const { width } = useWindowDimensions();
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
    <Animated.View style={[style.mainContainer, animatedStyle, { width: width * 0.88 }]}>
      <ImageBackground
        source={{ uri: slideData.img }}
        style={[style.backgroundImg, { width: width * 0.88 }]}
        resizeMode="stretch"
      >
        <View style={style.imgContainer}>
          {/* GENRE */}
          <View style={style.genreContainer}>
            <Text style={style.genreText}>{slideData.genre}</Text>
          </View>

          {/* TITLE */}
          <View style={style.textContainer}>
            <Text style={style.title}>{slideData.title}</Text>
            <Text style={style.subTitle}>{slideData.subTitle}</Text>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};
