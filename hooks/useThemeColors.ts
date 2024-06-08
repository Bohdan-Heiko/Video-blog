import { THEME_COLORS } from "@/constants/Colors"
import { SettingsInterface } from "@/types/seettings"
import { ColorSchemeName } from "react-native"

interface IProps {
  colorScheme: () => ColorSchemeName
  theme_color: SettingsInterface["theme_color"]
}
type CONST_COLORS = "THEME_TEXT_COLOR" | "THEME_BACKGROUND_COLOR"

type ThemeColors = Record<CONST_COLORS, string>

// GET THEME COLLORS BY DATA IN REDUX
export const useThemeColors = ({ colorScheme, theme_color }: IProps): ThemeColors => {
  const THEME_TEXT_COLOR =
    THEME_COLORS[theme_color ? theme_color : colorScheme() ?? "dark"].colors.text

  const THEME_BACKGROUND_COLOR =
    THEME_COLORS[theme_color ? theme_color : colorScheme() ?? "dark"].colors.background

  return { THEME_TEXT_COLOR, THEME_BACKGROUND_COLOR }
}
