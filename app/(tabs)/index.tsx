import MainBanner from "@/assets/images/mainBanner/main_banner.png";
import { DEFAULT_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import {
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
      <MainSlider />
      {/* <View> */}
      {/* </View> */}
    </ScrollView>
  );
}

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
    backgroundColor: DEFAULT_COLORS.white,
    paddingLeft: 16,
  },
});
