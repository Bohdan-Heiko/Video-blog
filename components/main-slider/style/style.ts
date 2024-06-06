import { StyleSheet } from "react-native"

import { DEFAULT_COLORS } from "@/constants/Colors"
import { FONTS } from "@/constants/fonts"

export const style = StyleSheet.create({
  mainContainer: {
    // aspectRatio: 345 / 216,
    overflow: "hidden",
    borderRadius: 12,
    marginRight: 12
  },
  backgroundImg: {
    // aspectRatio: 345 / 216
  },
  imgContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16
  },
  genreContainer: {
    paddingHorizontal: 16,
    paddingVertical: 1.5,
    backgroundColor: DEFAULT_COLORS.dark,
    alignSelf: "flex-start",
    borderRadius: 4
  },
  genreText: {
    color: DEFAULT_COLORS.white,
    fontFamily: FONTS.NunitoBold700,
    fontSize: 11,
    lineHeight: 21,
    textTransform: "uppercase"
  },

  textContainer: {
    gap: 4
  },

  title: {
    fontFamily: FONTS.NunitoBold700,
    fontSize: 24,
    lineHeight: 28,
    color: DEFAULT_COLORS.white
  },
  subTitle: {
    fontFamily: FONTS.NunitoRegular400,
    fontSize: 13,
    lineHeight: 16,
    color: DEFAULT_COLORS.gray
  }
})
