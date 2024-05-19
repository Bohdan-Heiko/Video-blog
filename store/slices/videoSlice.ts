// import { UserDataResponse } from "@/types"
import { MainSliderData } from "@/types/mainSlider";
import { SexondarySliderData } from "@/types/secondarySlider";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SliderData = MainSliderData | SexondarySliderData;

interface InitialVideoData {
  video: SliderData | null;
  searchValue: string;
}

const initialState: InitialVideoData = {
  video: null,
  searchValue: "",
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

    setSearchValue: (state: InitialVideoData, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
    clearVideoData: () => {
      return initialState;
    },
  },
});

export const { setVideoData, clearVideoData, updateVideoData, setSearchValue } =
  videoDataSlice.actions;

export default videoDataSlice;
