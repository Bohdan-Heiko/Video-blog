import { FONTS } from "@/constants/fonts"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 16,
    position: "relative"
  },

  gap10: {
    gap: 10
  },

  // MAIN SLIDER SETTINGS
  mainSliderSettingsContainer: {
    gap: 15,
    flex: 1,
    flexDirection: "column"
  },
  sliderTitle: {
    fontSize: 24
  },
  sliderContainer: {
    overflow: "hidden",
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "red"
  },
  settingsContainer: {
    borderRadius: 12,
    padding: 10,
    gap: 10
  },
  slider: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20
  },

  // SECONDARY SLIDER SETTINGS
  secondarySliderContainer: {
    borderRadius: 12,
    padding: 10,
    gap: 10
  },

  secondarySliderTitle: {
    fontFamily: FONTS.NunitoBold700,
    lineHeight: 24,
    paddingTop: 15
  },

  //ICON SELECTOR
  mainIconSelectorContainer: {
    gap: 10,
    padding: 10,
    borderRadius: 12,
    marginBottom: 100
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12
  },

  // THEME COLORS
  mainThemeContainer: {
    flex: 1,
    gap: 10,
    padding: 5,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
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
