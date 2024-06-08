import { ScrollView } from "react-native"
import { MainSliderSettings } from "./components/mainSliderSetting"
import { SecondarySliderSettings } from "./components/secondarySliderSettings"
import { style } from "./style"

import { View } from "react-native"

import { IconSelector } from "./components/iconSelector"
import { ThemeSelector } from "./components/themeSelector"

export const Settings = () => {
  return (
    <View style={style.mainContainer}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <View style={{ gap: 10 }}>
          <MainSliderSettings />
          <SecondarySliderSettings />
          <IconSelector />
        </View>
      </ScrollView>

      <ThemeSelector />
    </View>
  )
}
