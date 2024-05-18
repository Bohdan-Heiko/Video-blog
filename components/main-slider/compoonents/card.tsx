import { MainSliderData } from "@/types/mainSlider";
import { ImageBackground, Text, View, useWindowDimensions } from "react-native";
import { style } from "../style/style";
export const MainSliderCard = ({ slideData }: { slideData: MainSliderData }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[style.mainContainer, { width: width * 0.88 }]}>
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

          {/* TEXT */}
          <View style={style.textContainer}>
            <Text style={style.title}>{slideData.title}</Text>
            <Text style={style.subTitle}>{slideData.subTitle}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
