import { Theme } from "@react-navigation/native"

const DEFAULT_COLORS = {
  dark: "#0F0F0F",
  white: "#FFFFFF",
  lightWhite: "#F5F5F5",
  blue: "#3598D0",
  electricBlue: "#00BFE5",
  ligthGray: "#EBEDF0",
  gray: "#C4C8CC",
  secondaryGray: "#E1E3E6"
}

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: DEFAULT_COLORS.white,
    background: DEFAULT_COLORS.dark,
    card: DEFAULT_COLORS.dark,
    text: DEFAULT_COLORS.white,
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)"
  }
}

const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: DEFAULT_COLORS.dark,
    background: DEFAULT_COLORS.white,
    card: DEFAULT_COLORS.white,
    text: DEFAULT_COLORS.dark,
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)"
  }
}

const THEME_COLORS = {
  light: {
    dark: false,
    colors: {
      primary: DEFAULT_COLORS.dark,
      background: DEFAULT_COLORS.white,
      card: DEFAULT_COLORS.white,
      text: DEFAULT_COLORS.dark,
      border: "rgb(39, 39, 41)",
      notification: "rgb(255, 69, 58)"
    }
  },

  dark: {
    dark: true,
    colors: {
      primary: DEFAULT_COLORS.dark,
      background: DEFAULT_COLORS.white,
      card: DEFAULT_COLORS.white,
      text: DEFAULT_COLORS.dark,
      border: "rgb(39, 39, 41)",
      notification: "rgb(255, 69, 58)"
    }
  }
}

export { DEFAULT_COLORS, DarkTheme, LightTheme, THEME_COLORS }
