const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

import { IconType } from "@/types/icons"
import { Picker } from "@react-native-picker/picker"
import { memo, useEffect, useState } from "react"
import { Dimensions, Text, View, useColorScheme } from "react-native"

import { ICON_NAMES, ICON_TYPES } from "@/constants/initialData"
import useActions from "@/hooks/useActions"
import { useThemeColors } from "@/hooks/useThemeColors"
import { SettingsInterface } from "@/types/seettings"
import { style } from "../style"

interface IProps {
  theme_color: SettingsInterface["theme_color"]
  theme_icon: SettingsInterface["theme_icon"]
}

export const IconSelector = memo(
  ({ theme_color, theme_icon }: IProps) => {
    const { setThemeIcon } = useActions()
    const { THEME_BACKGROUND_COLOR, THEME_TEXT_COLOR } = useThemeColors({
      colorScheme: useColorScheme,
      theme_color
    })

    const [selectedType, setSelectedType] = useState<keyof IconType | null>(
      theme_icon.type
    )
    const [selectedName, setSelectedName] = useState<string | null>(theme_icon.name)

    const handleTypeChange = (value: keyof IconType | null) => {
      setSelectedType(value)
      setSelectedName(null)
    }

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
  },
  ({ theme_icon, theme_color }) =>
    theme_icon === theme_icon && theme_color !== theme_color
)
