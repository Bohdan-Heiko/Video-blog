import { useMemo } from "react";

import { useAppDispatch } from "@/store";
import { clearVideoData, setVideoData } from "@/store/slices/videoSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

const rootActions = { setVideoData, clearVideoData };

const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useActions;
