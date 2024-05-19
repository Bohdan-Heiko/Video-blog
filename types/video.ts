import { AVPlaybackStatusSuccess } from "expo-av";

type VideoStatus = {
  onPlay: () => void;
  status: AVPlaybackStatusSuccess | undefined;
  setStatus: React.Dispatch<React.SetStateAction<AVPlaybackStatusSuccess | undefined>>;
  handleCloseVideo: () => void;
  setVideoPosition: (position: number) => Promise<void>;
};

type Slider = {
  IS_PLAYNG: boolean | undefined;
  sliderValue: number;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
  handleValueChange: (value: Array<number>) => void;
  handleSlidingComplete: (value: Array<number>) => Promise<void>;
};

type Loader = {
  hideLoading: () => void;
  showLoading: () => void;
  loadingValue: { value: boolean };
};

type PlayerValue = {
  value: boolean;
};
export type SingleVideoHooks = {
  plauerValue: PlayerValue;
  videoStatus: VideoStatus;
  slider: Slider;
  loader: Loader;
};
