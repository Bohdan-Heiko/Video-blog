import { SettingsInterface } from "@/types/seettings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: SettingsInterface = {
  mainSliderData: {
    width: 328,
    height: 216
  },
  secondarySliderData: {
    height: 216,
    width: 328,
    title_size: 16
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

    clearVideoData: () => {
      return initialState
    }
  }
})

export const { setMainSliderDimensions, setTheme } = settingsSlice.actions

export default settingsSlice
