import { StyleSheet } from "react-native"

import { DEFAULT_COLORS } from "@/constants/Colors"
import { FONTS } from "@/constants/fonts"

export const style = StyleSheet.create({
  mainContainer: {
    gap: 16
  },

  mainTitle: {
    fontFamily: FONTS.NunitoBold700,
    color: DEFAULT_COLORS.white,
    fontSize: 20,
    lineHeight: 24
  },

  slider: {
    gap: 12
  },

  cardContainer: {
    flexDirection: "row",
    gap: 12
  },
  card: {
    gap: 8
  },
  imgContainer: {
    borderRadius: 8,
    overflow: "hidden",
    position: "relative"
  },
  img: {
    aspectRatio: 120 / 150,
    width: "100%",
    height: undefined
  },
  lockContainer: {
    position: "absolute",
    top: 60,
    left: 45,
    borderRadius: 100,
    backgroundColor: "#FFFFFF52",
    padding: 10
  },

  textContainer: {
    paddingRight: "20%"
  },

  comminSoongTitle: {
    color: DEFAULT_COLORS.electricBlue,
    fontFamily: FONTS.NunitoExtraBold800,
    textTransform: "uppercase",
    fontSize: 11,
    lineHeight: 14
  },
  title: {
    fontFamily: FONTS.NunitoSemiBold600,
    fontSize: 14,
    lineHeight: 17,
    color: DEFAULT_COLORS.white
  }
})
