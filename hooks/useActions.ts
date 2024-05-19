import { useMemo } from "react";

import { useAppDispatch } from "@/store";
import {
  clearVideoData,
  setFeedVideos,
  setSearchValue,
  setVideoData,
  setVideoStatus,
  updateVideoData,
} from "@/store/slices/videoSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = {
  setSearchValue,
  setFeedVideos,
  setVideoData,
  clearVideoData,
  updateVideoData,
  setVideoStatus,
};

const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useActions;
