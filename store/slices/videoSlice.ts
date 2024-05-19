// import { UserDataResponse } from "@/types"
import { MainSliderData } from "@/types/mainSlider";
import { SexondarySliderData } from "@/types/secondarySlider";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SliderData = MainSliderData | SexondarySliderData;

interface InitialVideoData {
  video: SliderData | null;
}

const initialState: InitialVideoData = {
  video: null,
};

const name = "video_data";

export const videoDataSlice = createSlice({
  name,
  initialState,
  reducers: {
    setVideoData: (state: InitialVideoData, { payload }: PayloadAction<SliderData>) => {
      state.video = { ...payload };
    },

    updateVideoData: (state: InitialVideoData, { payload }: PayloadAction<SliderData>) => {
      state.video = { ...state.video, ...payload };
    },
    clearVideoData: () => {
      return initialState;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(authSlice.actions.logoutUser, () => {
  //     return initialState;
  //   });
  // },
});

export const { setVideoData, clearVideoData, updateVideoData } = videoDataSlice.actions;

export default videoDataSlice;
