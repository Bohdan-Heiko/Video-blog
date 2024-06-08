import { ScrollView } from "react-native"
import { MainSliderSettings } from "./components/mainSliderSetting"
import { SecondarySliderSettings } from "./components/secondarySliderSettings"
import { style } from "./style"

import { View } from "react-native"

import { Devider } from "@/components/devider"
import { useAppSelector } from "@/store"
import { IconSelector } from "./components/iconSelector"
import { ThemeSelector } from "./components/themeSelector"

export const Settings = () => {
  const { secondarySliderData, theme_color, mainSliderData, theme_icon } = useAppSelector(
    (state) => state.settings_data
  )

  return (
    <View style={style.mainContainer}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View style={{ gap: 10 }}>
          <MainSliderSettings theme_color={theme_color} mainSliderData={mainSliderData} />

          <Devider />
          <SecondarySliderSettings
            theme_color={theme_color}
            secondarySliderData={secondarySliderData}
          />

          <Devider />
          <IconSelector theme_color={theme_color} theme_icon={theme_icon} />
        </View>
      </ScrollView>

      <ThemeSelector />
    </View>
  )
}
