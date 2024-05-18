import { MainSliderData } from "@/types/mainSlider";
import { ReactNode, createContext, useContext, useState } from "react";

export type FeedContext = {
  videoData: MainSliderData | null;
  handleSetVideoData: (data: MainSliderData) => void;
  resetVideoData: () => void;
};

export const VideoContext = createContext<FeedContext | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const VideoProvider = (props: ProviderProps) => {
  const [videoData, setVideoData] = useState<MainSliderData | null>(null);

  const handleSetVideoData = (data: MainSliderData) => {
    setVideoData(data);
  };

  const resetVideoData = () => {
    setVideoData(null);
  };

  return (
    <VideoContext.Provider value={{ videoData, handleSetVideoData, resetVideoData }}>
      {props.children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const authContext = useContext(VideoContext);

  return authContext as FeedContext;
};
