import { MainSliderData } from "@/types/mainSlider"
import { SexondarySliderData } from "@/types/secondarySlider"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type SliderData = MainSliderData | SexondarySliderData

type VideoStatus = {
  id: string | null
  status: number
}
interface InitialVideoData {
  video: SliderData | null
  searchValue: string
  feedVideos: SliderData[]
  videoStatus: VideoStatus
}

const initialState: InitialVideoData = {
  video: null,
  feedVideos: [],
  searchValue: "",
  videoStatus: { id: null, status: 0 }
}

const name = "video_data"

export const videoDataSlice = createSlice({
  name,
  initialState,
  reducers: {
    setVideoData: (state: InitialVideoData, { payload }: PayloadAction<SliderData>) => {
      state.video = { ...payload }
    },

    updateVideoData: (
      state: InitialVideoData,
      { payload }: PayloadAction<SliderData>
    ) => {
      state.video = { ...state.video, ...payload }
    },

    setSearchValue: (state: InitialVideoData, { payload }: PayloadAction<string>) => {
      state.searchValue = payload
    },

    setVideoStatus: (
      state: InitialVideoData,
      { payload }: PayloadAction<VideoStatus>
    ) => {
      state.videoStatus = { ...payload }
    },

    setFeedVideos: (
      state: InitialVideoData,
      { payload }: PayloadAction<SliderData[]>
    ) => {
      state.feedVideos = [...payload]
    },

    clearVideoData: () => {
      return initialState
    }
  }
})

export const {
  setVideoData,
  setFeedVideos,
  clearVideoData,
  setVideoStatus,
  updateVideoData,
  setSearchValue
} = videoDataSlice.actions

export default videoDataSlice
