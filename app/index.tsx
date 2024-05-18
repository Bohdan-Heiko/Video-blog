import SecondaryBanner from "@/assets/images/secondaryBanner/book_cover.png";

import ArrowRightIcon from "@/assets/images/icons/arrow-right.svg";
import { DEFAULT_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { Home } from "@/screens/main";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";

const HomeScreen = () => {
  return (
    <>
      <StatusBar style="light" />
      <Home />
    </>
  );
};

export default HomeScreen;

const ContinueWidget = () => {
  return (
    <View style={{ gap: 16 }}>
      <Text
        style={{
          fontFamily: FONTS.NunitoBold700,
          color: DEFAULT_COLORS.white,
          fontSize: 20,
          lineHeight: 24,
        }}
      >
        Continue Watching
      </Text>

      <View
        style={{
          paddingLeft: 6,
          paddingVertical: 6,
          paddingRight: 16,
          backgroundColor: DEFAULT_COLORS.blue,
          borderRadius: 12,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{ gap: 12, flexDirection: "row" }}>
          <View style={{ aspectRatio: 44 / 56, maxHeight: 44 }}>
            <Image
              source={SecondaryBanner}
              style={{
                borderRadius: 8,
                aspectRatio: 44 / 56,
                width: "100%",
                height: undefined,
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontFamily: FONTS.NunitoBold700,
                fontSize: 16,
                lineHeight: 20,
                color: DEFAULT_COLORS.white,
              }}
            >
              Boss With Benefits
            </Text>
            <Text
              style={{
                fontFamily: FONTS.NunitoRegular400,
                fontSize: 14,
                lineHeight: 18,
                color: DEFAULT_COLORS.secondaryGray,
              }}
            >
              Kelly Nite
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{ justifyContent: "center" }}>
          <ArrowRightIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};
