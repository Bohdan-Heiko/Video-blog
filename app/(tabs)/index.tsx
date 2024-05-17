import MainBanner from "@/assets/images/mainBanner/main_banner.png";
import SecondaryBanner from "@/assets/images/secondaryBanner/book_cover.png";

import { DEFAULT_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
    >
      <View style={{ gap: 44 }}>
        <MainSlider />
        <SecondarySlider />
      </View>
    </ScrollView>
  );
}

const SecondarySlider = () => {
  const { width } = useWindowDimensions();
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
        Trending Now
      </Text>

      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        style={{ gap: 12 }}
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View
            style={{
              width: width / 3,
              gap: 8,
            }}
          >
            <View
              style={{
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Image
                source={SecondaryBanner}
                style={{
                  resizeMode: "stretch",
                  aspectRatio: 120 / 150,
                  width: "100%",
                  height: undefined,
                }}
              />
            </View>

            <View style={{ paddingRight: "20%" }}>
              <Text
                style={{
                  color: DEFAULT_COLORS.electricBlue,
                  fontFamily: FONTS.NunitoExtraBold800,
                  textTransform: "uppercase",
                  fontSize: 11,
                  lineHeight: 14,
                }}
              >
                Coming July 2
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.NunitoSemiBold600,
                  fontSize: 14,
                  lineHeight: 17,
                  color: DEFAULT_COLORS.white,
                }}
              >
                Wolfstate chronicles: Alaska, Texas
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const MainSlider = () => {
  const { width } = useWindowDimensions();

  return (
    <ScrollView horizontal={true} overScrollMode="never" showsHorizontalScrollIndicator={false}>
      <View
        style={{
          aspectRatio: 328 / 216,
          width: width * 0.88,
          overflow: "hidden",
          borderRadius: 12,
          backgroundColor: "red",
          marginRight: 12,
        }}
      >
        <ImageBackground
          source={MainBanner}
          style={{
            aspectRatio: 328 / 216,
            width: width * 0.88,
          }}
          resizeMode="stretch"
        >
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 16,
            }}
          >
            {/* GENRE */}
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 1.5,
                backgroundColor: DEFAULT_COLORS.dark,
                alignSelf: "flex-start",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: DEFAULT_COLORS.white,
                  fontFamily: FONTS.NunitoBold700,
                  fontSize: 11,
                  lineHeight: 21,
                }}
              >
                Romance
              </Text>
            </View>

            {/* TEXT */}
            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontFamily: FONTS.NunitoBold700,
                  fontSize: 24,
                  lineHeight: 28,
                  color: DEFAULT_COLORS.white,
                }}
              >
                Lethal Limits
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.NunitoRegular400,
                  fontSize: 13,
                  lineHeight: 16,
                  color: DEFAULT_COLORS.gray,
                }}
              >
                Dustin's Gamble
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View
        style={{
          aspectRatio: 328 / 216,
          width: width * 0.88,
          overflow: "hidden",
          borderRadius: 12,
          backgroundColor: "red",
        }}
      >
        <ImageBackground
          source={MainBanner}
          style={{
            aspectRatio: 328 / 216,
            width: width * 0.88,
          }}
          resizeMode="stretch"
        >
          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 16,
            }}
          >
            {/* GENRE */}
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 1.5,
                backgroundColor: DEFAULT_COLORS.dark,
                alignSelf: "flex-start",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: DEFAULT_COLORS.white,
                  fontFamily: FONTS.NunitoBold700,
                  fontSize: 11,
                  lineHeight: 21,
                }}
              >
                Romance
              </Text>
            </View>

            {/* TEXT */}
            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontFamily: FONTS.NunitoBold700,
                  fontSize: 24,
                  lineHeight: 28,
                  color: DEFAULT_COLORS.white,
                }}
              >
                Lethal Limits
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.NunitoRegular400,
                  fontSize: 13,
                  lineHeight: 16,
                  color: DEFAULT_COLORS.gray,
                }}
              >
                Dustin's Gamble
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: DEFAULT_COLORS.white,
    paddingLeft: 16,
  },
});
