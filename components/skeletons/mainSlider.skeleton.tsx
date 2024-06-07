import ContentLoader, { Rect } from "react-content-loader/native"

import { DEFAULT_COLORS, THEME_COLORS } from "@/constants/Colors"
import { useColorScheme } from "react-native"

export const MainSliderSkeleton = () => {
  return (
    <ContentLoader
      speed={1.5}
      width={330}
      height={228}
      viewBox="0 0 330 216"
      foregroundColor={DEFAULT_COLORS.blue}
      backgroundColor={THEME_COLORS[useColorScheme() ?? "light"].colors.background}
    >
      <Rect x="1" y="2" rx="10" ry="10" width="299" height="212" />
    </ContentLoader>
  )
}
