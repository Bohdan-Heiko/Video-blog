import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface SettingsInterface {
  mainSliderData: {
    width: number
    height: number
  }
}

const initialState: SettingsInterface = {
  mainSliderData: {
    width: 328,
    height: 216
  }
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

    clearVideoData: () => {
      return initialState
    }
  }
})

export const { setMainSliderDimensions } = settingsSlice.actions

export default settingsSlice
