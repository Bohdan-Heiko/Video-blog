import React, { useEffect, useState } from "react"
import { Pressable, TextInput, View, useColorScheme } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import useActions from "@/hooks/useActions"
import { useDebounce } from "@/hooks/useDebounce"

import { DEFAULT_COLORS, THEME_COLORS } from "@/constants/Colors"
import { useAppSelector } from "@/store"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { styles } from "./style/style"

export const Search = () => {
  const [value, setValue] = useState<string>("")
  const [isInputVisible, setInputVisible] = useState(false)
  const inputWidth = useSharedValue(0)
  const { theme_color } = useAppSelector((state) => state.settings_data)

  const THEME_TEXT_COLOR =
    THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors.text

  const { setSearchValue } = useActions()
  const deounceValue = useDebounce(value, 500)

  const toggleInput = () => {
    setInputVisible(!isInputVisible)
    inputWidth.value = withTiming(isInputVisible ? 0 : 200, { duration: 300 })
  }

  const inputStyle = useAnimatedStyle(() => {
    return {
      width: inputWidth.value
    }
  })

  const onSearch = () => {
    setSearchValue(deounceValue as string)
  }

  const onClearSearch = () => {
    setValue("")
    toggleInput()
  }

  useEffect(() => {
    if (deounceValue?.length! >= 0) {
      onSearch()
    }
  }, [deounceValue])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, inputStyle]}>
        <TextInput
          autoFocus
          value={value}
          onChangeText={setValue}
          placeholder="Search by genre"
          underlineColorAndroid="transparent"
          placeholderTextColor={DEFAULT_COLORS.gray}
          style={[styles.input, { color: THEME_TEXT_COLOR }]}
        />
        <Pressable onPress={onClearSearch}>
          <MaterialCommunityIcons
            style={styles.crossIcon}
            name="window-close"
            size={24}
            color={THEME_TEXT_COLOR}
          />
        </Pressable>
      </Animated.View>
      <Pressable onPress={toggleInput}>
        <Feather name="search" size={24} color={THEME_TEXT_COLOR} />
      </Pressable>
    </View>
  )
}
