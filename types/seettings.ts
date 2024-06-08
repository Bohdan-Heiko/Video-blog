import { IconType } from "./icons"

export interface SettingsInterface {
  mainSliderData: {
    width: number
    height: number
  }
  secondarySliderData: {
    title_size: number
  }
  theme_icon: { type: keyof IconType; name: string }
  theme_color: "blue" | "dark" | "light" | ""
}
