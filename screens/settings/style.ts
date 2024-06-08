import { FONTS } from "@/constants/fonts"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 16,
    position: "relative"
  },

  // MAIN SLIDER SETTINGS
  mainSliderSettingsContainer: {
    gap: 15,
    flex: 1,
    flexDirection: "column"
  },
  sliderContainer: {
    overflow: "hidden",
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "red"
  },
  settingsContainer: {
    borderRadius: 12,
    padding: 10
  },

  // SECONDARY SLIDER SETTINGS
  secondarySliderTitle: {
    fontFamily: FONTS.NunitoBold700,
    lineHeight: 24,
    paddingTop: 15
  },

  // THEME COLORS
  mainThemeContainer: {
    flex: 1,
    gap: 10,
    padding: 5,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "red",
    position: "absolute",
    bottom: 50,
    right: 16,
    zIndex: 100
  },

  themeIconBtn: {
    width: 35,
    height: 35,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center"
  },

  themeBtn: {
    width: 35,
    height: 35,
    borderRadius: 35,
    padding: 10
  }
})
