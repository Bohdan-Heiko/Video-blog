import { DEFAULT_COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainContainer: {
    gap: 16,
  },
  mainTitle: {
    fontFamily: FONTS.NunitoBold700,
    color: DEFAULT_COLORS.white,
    fontSize: 20,
    lineHeight: 24,
  },
  container: {
    paddingLeft: 6,
    paddingVertical: 6,
    paddingRight: 16,
    backgroundColor: DEFAULT_COLORS.blue,
    borderRadius: 12,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rowContainer: {
    gap: 12,
    flexDirection: "row",
  },
  imageContainer: {
    aspectRatio: 44 / 56,
    maxHeight: 44,
  },
  image: {
    borderRadius: 8,
    aspectRatio: 44 / 56,
    width: "100%",
    height: undefined,
  },

  titleContainer: {
    justifyContent: "center",
  },

  title: {
    fontFamily: FONTS.NunitoBold700,
    fontSize: 16,
    lineHeight: 20,
    color: DEFAULT_COLORS.white,
  },
  subTitle: {
    fontFamily: FONTS.NunitoRegular400,
    fontSize: 14,
    lineHeight: 18,
    color: DEFAULT_COLORS.secondaryGray,
  },
  icon: {
    justifyContent: "center",
  },
});
