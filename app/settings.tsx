import { DEFAULT_COLORS } from "@/constants/Colors"
import useActions from "@/hooks/useActions"
import { useDebounce } from "@/hooks/useDebounce"
import { useAppSelector } from "@/store"
import Slider from "@react-native-community/slider"
import { useState } from "react"
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

const { width: screenWidth } = Dimensions.get("window")

const SettingsScreen = () => {
  const { mainSliderData } = useAppSelector((state) => state.settings_data)
  const { setMainSliderDimensions } = useActions()

  const [width, setWidth] = useState<number>(mainSliderData.width)
  const [height, setHeight] = useState<number>(mainSliderData.height)

  const debounceWidth = useDebounce(width, 100) as number
  const debounceHeight = useDebounce(height, 100) as number

  return (
    <ScrollView overScrollMode="never" showsHorizontalScrollIndicator={false}>
      <View style={{ flex: 1, flexDirection: "column", gap: 15, paddingHorizontal: 16 }}>
        <View style={[styles.mainContainer, { width, height }]}>
          <Text>Main slider</Text>
        </View>
        <View style={{ backgroundColor: "red", borderRadius: 12, padding: 10 }}>
          <Text>Width</Text>
          <Slider
            style={{ height: 40 }}
            minimumValue={10}
            maximumValue={screenWidth}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            value={width}
            onValueChange={(value) => setWidth(value)}
          />
          <Text>Height</Text>
          <Slider
            style={{ height: 40 }}
            minimumValue={100}
            maximumValue={300}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            value={height}
            onValueChange={(value) => setHeight(value)}
          />
        </View>
      </View>
      <Pressable
        onPress={() =>
          setMainSliderDimensions({ width: debounceWidth, height: debounceHeight })
        }
        style={{
          flex: 1,
          backgroundColor: DEFAULT_COLORS.blue,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 12
        }}
      >
        <Text>Apply</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "red"
  }
})

export default SettingsScreen
