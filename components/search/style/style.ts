import { StyleSheet } from "react-native"

import { FONTS } from "@/constants/fonts"

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5
  },
  inputContainer: {
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    fontFamily: FONTS.NunitoSemiBold600,
    fontSize: 20,
    padding: 5
  },
  crossIcon: {
    marginRight: 10
  }
})
