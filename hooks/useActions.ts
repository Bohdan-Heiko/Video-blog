import { useMemo } from "react"

import { useAppDispatch } from "@/store"
import {
  setMainSliderDimensions,
  setSecondarySliderData,
  setTheme,
  setThemeIcon
} from "@/store/slices/settingsSlice"
import {
  clearVideoData,
  setFeedVideos,
  setSearchValue,
  setVideoData,
  setVideoStatus,
  updateVideoData
} from "@/store/slices/videoSlice"
import { bindActionCreators } from "@reduxjs/toolkit"

const rootActions = {
  setSearchValue,
  setFeedVideos,
  setVideoData,
  clearVideoData,
  updateVideoData,
  setVideoStatus,
  setMainSliderDimensions,
  setTheme,
  setSecondarySliderData,
  setThemeIcon
}

const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}

export default useActions
