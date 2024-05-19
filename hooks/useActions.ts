import { useMemo } from "react";

import { useAppDispatch } from "@/store";
import { clearVideoData, setVideoData, updateVideoData } from "@/store/slices/videoSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = { setVideoData, clearVideoData, updateVideoData };

const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useActions;
