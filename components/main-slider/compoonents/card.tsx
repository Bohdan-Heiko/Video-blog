import MainBanner from "@/assets/images/mainBanner/main_banner.png";

import { ImageBackground, Text, View, useWindowDimensions } from "react-native";
import { style } from "../style/style";
export const MainSliderCard = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={[style.mainContainer, { width: width * 0.88 }]}>
      <ImageBackground
        source={MainBanner}
        style={[style.backgroundImg, { width: width * 0.88 }]}
        resizeMode="stretch"
      >
        <View style={style.imgContainer}>
          {/* GENRE */}
          <View style={style.genreContainer}>
            <Text style={style.genreText}>Romance</Text>
          </View>

          {/* TEXT */}
          <View style={style.textContainer}>
            <Text style={style.title}>Lethal Limits</Text>
            <Text style={style.subTitle}>Dustin's Gamble</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
