import { DEFAULT_COLORS } from "@/constants/Colors"
import useActions from "@/hooks/useActions"
import { useDebounce } from "@/hooks/useDebounce"
import { useAppSelector } from "@/store"
import { Ionicons } from "@expo/vector-icons"
import Slider from "@react-native-community/slider"
import { useState } from "react"
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

const SettingsScreen = () => {
  const { mainSliderData } = useAppSelector((state) => state.settings_data)
  const { setMainSliderDimensions, setTheme } = useActions()

  const [width, setWidth] = useState<number>(mainSliderData.width)
  const [height, setHeight] = useState<number>(mainSliderData.height)
  const [isInputVisible, setInputVisible] = useState(false)

  const debounceWidth = useDebounce(width, 100) as number
  const debounceHeight = useDebounce(height, 100) as number

  const colorsBlockWidth = useSharedValue(45)

  const colorsThemeStyle = useAnimatedStyle(() => {
    return {
      width: colorsBlockWidth.value
    }
  })

  const onWidthChange = (value: any) => {
    console.log(value)
  }

  const toggleColorsTheme = () => {
    setInputVisible(!isInputVisible)
    colorsBlockWidth.value = withTiming(isInputVisible ? 45 : 180, { duration: 300 })
  }
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 16,
        position: "relative"
      }}
    >
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View>
          <MainSliderSeetings />

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              gap: 15
            }}
          >
            <View style={[styles.mainContainer, { width, height }]}>
              <Text>Main slider</Text>
            </View>
            <View style={{ backgroundColor: "red", borderRadius: 12, padding: 10 }}>
              <Text>Width</Text>
              <Slider
                minimumValue={10}
                value={width}
                style={{ height: 40 }}
                maximumValue={screenWidth}
                // onSlidingComplete={handleSetMainSliderDimensions}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setWidth(value)}
              />
              <Text>Height</Text>
              <Slider
                style={{ height: 40 }}
                minimumValue={100}
                maximumValue={300}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                // onSlidingComplete={handleSetMainSliderDimensions}
                value={height}
                onValueChange={(value) => setHeight(value)}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <Animated.View
        style={[
          {
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
          colorsThemeStyle
        ]}
      >
        <Pressable
          onPress={toggleColorsTheme}
          style={{
            width: 35,
            height: 35,
            borderRadius: 35,
            alignItems: "center",
            justifyContent: "center"
            // backgroundColor: DEFAULT_COLORS.dark
          }}
        >
          <Ionicons name="color-filter-outline" size={24} color="black" />
        </Pressable>

        <Pressable
          onPress={() => setTheme("dark")}
          style={{
            width: 35,
            height: 35,
            borderRadius: 35,
            padding: 10,
            backgroundColor: DEFAULT_COLORS.dark
          }}
        ></Pressable>

        <Pressable
          onPress={() => setTheme("blue")}
          style={{
            width: 35,
            height: 35,
            borderRadius: 35,
            padding: 10,
            backgroundColor: DEFAULT_COLORS.blue
          }}
        ></Pressable>

        <Pressable
          onPress={() => setTheme("light")}
          style={{
            width: 35,
            height: 35,
            borderRadius: 35,
            padding: 10,
            backgroundColor: DEFAULT_COLORS.white
          }}
        ></Pressable>
      </Animated.View>
    </View>
  )
}

const MainSliderSeetings = () => {
  const { mainSliderData } = useAppSelector((state) => state.settings_data)
  const { setMainSliderDimensions, setTheme } = useActions()

  const [width, setWidth] = useState<number>(mainSliderData.width)
  const [height, setHeight] = useState<number>(mainSliderData.height)

  const handleSetMainSliderDimensions = () => {
    setMainSliderDimensions({ width, height })
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 15
      }}
    >
      <View style={[styles.mainContainer, { width, height }]}>
        <Text>Main slider</Text>
      </View>
      <View style={{ backgroundColor: "red", borderRadius: 12, padding: 10 }}>
        <Text>Width</Text>
        <Slider
          minimumValue={10}
          value={width}
          style={{ height: 40 }}
          maximumValue={screenWidth}
          onSlidingComplete={handleSetMainSliderDimensions}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => setWidth(value)}
        />
        <Text>Height</Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={100}
          maximumValue={300}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onSlidingComplete={handleSetMainSliderDimensions}
          value={height}
          onValueChange={(value) => setHeight(value)}
        />
      </View>
    </View>
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
