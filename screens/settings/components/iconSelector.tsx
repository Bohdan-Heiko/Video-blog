const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

import { IconType } from "@/types/icons"
import { Picker } from "@react-native-picker/picker"
import { useEffect, useState } from "react"
import { Dimensions, Text, View, useColorScheme } from "react-native"

import { THEME_COLORS } from "@/constants/Colors"
import { ICON_NAMES, ICON_TYPES } from "@/constants/initialData"
import useActions from "@/hooks/useActions"
import { useAppSelector } from "@/store"
import { style } from "../style"

export const IconSelector = () => {
  const { setThemeIcon } = useActions()
  const { theme_color, theme_icon } = useAppSelector((state) => state.settings_data)

  const [selectedType, setSelectedType] = useState<keyof IconType | null>(theme_icon.type)
  const [selectedName, setSelectedName] = useState<string | null>(theme_icon.name)

  const handleTypeChange = (value: keyof IconType | null) => {
    setSelectedType(value)
    setSelectedName(null)
  }

  const THEME_TEXT_COLOR =
    THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors.text
  const THEME_BACKGROUND_COLOR =
    THEME_COLORS[theme_color ? theme_color : useColorScheme() ?? "dark"].colors.background

  const onSetThemeIcon = () => {
    if (selectedType && selectedName) {
      setThemeIcon({ type: selectedType, name: selectedName })
    }
  }

  useEffect(() => {
    if (selectedType && selectedName) onSetThemeIcon()
  }, [selectedName])

  return (
    <View
      style={[
        style.mainIconSelectorContainer,
        {
          backgroundColor: THEME_TEXT_COLOR
        }
      ]}
    >
      <Text style={[style.sliderTitle, { color: THEME_BACKGROUND_COLOR }]}>
        Select Icon Type:
      </Text>

      <View
        style={[
          style.pickerContainer,
          {
            borderColor: THEME_BACKGROUND_COLOR
          }
        ]}
      >
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => handleTypeChange(itemValue as keyof IconType)}
        >
          <Picker.Item
            value={null}
            label="Select an icon type"
            style={{ color: THEME_BACKGROUND_COLOR }}
          />
          {ICON_TYPES.map((type) => (
            <Picker.Item
              key={type}
              label={type}
              value={type}
              style={{ color: THEME_BACKGROUND_COLOR }}
            />
          ))}
        </Picker>
      </View>

      <Text style={[style.sliderTitle, { color: THEME_BACKGROUND_COLOR }]}>
        Select Icon Name:
      </Text>
      <View
        style={[
          style.pickerContainer,
          {
            borderColor: THEME_BACKGROUND_COLOR
          }
        ]}
      >
        <Picker
          selectedValue={selectedName}
          onValueChange={(itemValue) => setSelectedName(itemValue)}
        >
          <Picker.Item
            style={{ color: THEME_BACKGROUND_COLOR }}
            label="Select an icon name"
            value={null}
          />
          {selectedType &&
            ICON_NAMES[selectedType].map((name, idx) => (
              <Picker.Item
                key={idx}
                value={name}
                label={name as string}
                style={{ color: THEME_BACKGROUND_COLOR }}
              />
            ))}
        </Picker>
      </View>
    </View>
  )
}
