import ContentLoader, { Rect } from "react-content-loader/native"

import { DEFAULT_COLORS } from "@/constants/Colors"

export const MainSliderSkeleton = () => {
  return (
    <ContentLoader
      speed={1.5}
      width={330}
      height={228}
      viewBox="0 0 330 216"
      backgroundColor={DEFAULT_COLORS.dark}
      foregroundColor={DEFAULT_COLORS.blue}
    >
      <Rect x="1" y="2" rx="10" ry="10" width="299" height="212" />
    </ContentLoader>
  )
}
