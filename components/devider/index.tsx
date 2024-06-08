import { DEFAULT_COLORS } from "@/constants/Colors"
import { StyleSheet, View } from "react-native"

export const Devider = () => {
  return <View style={[style.devider]} />
}

const style = StyleSheet.create({
  devider: {
    flex: 1,
    height: 3,
    borderRadius: 3,
    backgroundColor: DEFAULT_COLORS.gray
  }
})
