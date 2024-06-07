import ContentLoader, { Rect } from "react-content-loader/native"

import { DEFAULT_COLORS, THEME_COLORS } from "@/constants/Colors"
import { useColorScheme } from "react-native"

export const SecondarySliderSkeleton = () => {
  return (
    <ContentLoader
      speed={1.5}
      width={150}
      height={200}
      viewBox="0 0 150 200"
      foregroundColor={DEFAULT_COLORS.blue}
      backgroundColor={THEME_COLORS[useColorScheme() ?? "light"].colors.background}
    >
      <Rect x="1" y="3" rx="10" ry="10" width="114" height="162" />
      <Rect x="1" y="172" rx="3" ry="3" width="114" height="8" />
    </ContentLoader>
  )
}
