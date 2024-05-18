import SecondaryBanner from "@/assets/images/secondaryBanner/book_cover.png";

import ArrowRightIcon from "@/assets/images/icons/arrow-right.svg";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style/style";

export const ContinueWidget = () => {
  return (
    <View style={style.mainContainer}>
      <Text style={style.mainTitle}>Continue Watching</Text>

      <View style={style.container}>
        <View style={style.rowContainer}>
          <View style={style.imageContainer}>
            <Image source={SecondaryBanner} style={style.image} />
          </View>

          <View>
            <Text style={style.title}>Boss With Benefits</Text>
            <Text style={style.subTitle}>Kelly Nite</Text>
          </View>
        </View>
        <TouchableOpacity style={style.icon}>
          <ArrowRightIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};
