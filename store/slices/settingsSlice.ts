import { SettingsInterface } from "@/types/seettings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: SettingsInterface = {
  mainSliderData: {
    width: 328,
    height: 216
  },
  secondarySliderData: {
    title_size: 16
  },
  theme_icon: {
    type: "Ionicons",
    name: "color-filter-outline"
  },
  theme_color: ""
}

const name = "settings_data"

export const settingsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setMainSliderDimensions: (
      state,
      action: PayloadAction<SettingsInterface["mainSliderData"]>
    ) => {
      state.mainSliderData = action.payload
    },

    setTheme: (state, action: PayloadAction<SettingsInterface["theme_color"]>) => {
      state.theme_color = action.payload
    },

    setSecondarySliderData: (
      state,
      action: PayloadAction<SettingsInterface["secondarySliderData"]>
    ) => {
      state.secondarySliderData = action.payload
    },

    setThemeIcon: (state, action: PayloadAction<SettingsInterface["theme_icon"]>) => {
      state.theme_icon = action.payload
    },

    clearVideoData: () => {
      return initialState
    }
  }
})

export const { setMainSliderDimensions, setTheme, setSecondarySliderData, setThemeIcon } =
  settingsSlice.actions

export default settingsSlice
