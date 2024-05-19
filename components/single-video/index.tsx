import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

import { FeedContext } from "@/context/feed.context";
import { MainSliderData } from "@/types/mainSlider";

import { ControllButtons } from "./components/controllButtons";
import { TimeSlider } from "./components/timeSlider";
import { style } from "./style/style";

type VideoType = {
  videoData: MainSliderData;
  activeVideoId: number | string;
  contextVideoData: FeedContext["videoData"];
  handleSetVideoData: FeedContext["handleSetVideoData"];
};

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export const SingleVideo = ({
  videoData,
  activeVideoId,
  contextVideoData,
  handleSetVideoData,
}: VideoType) => {
  const statusRef = useRef<AVPlaybackStatusSuccess>();
  const videoRef = useRef<Video | null>(null);

  const [status, setStatus] = useState<AVPlaybackStatusSuccess>();
  const [sliderValue, setSliderValue] = useState(4000);
  const [isLoading, setIsLoading] = useState(true);

  const IS_PLAYNG = status?.isLoaded && status.isPlaying;

  const onPlay = () => {
    if (!videoRef.current) {
      return;
    }
    if (IS_PLAYNG) {
      videoRef.current?.pauseAsync();
      videoRef.current?.setVolumeAsync(0);
    } else {
      videoRef.current?.playAsync();
      videoRef.current?.setVolumeAsync(1);
    }
  };

  const handleValueChange = (value: Array<number>) => {
    setSliderValue(value[0]);
  };

  const setVideoPosition = async (position: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(position);
    }
  };

  //  Handles the completion of the slider. It sets the video position to the
  //  selected value multiplied by the duration of the video.
  const handleSlidingComplete = async (value: Array<number>) => {
    if (videoRef.current && status?.durationMillis) {
      setVideoPosition(value[0] * status.durationMillis);
    }
  };

  // Run whenever the active video changes
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    // If the active video is not this video, pause it
    // It nee for a swiping
    if (activeVideoId !== videoData.id) {
      videoRef.current?.pauseAsync();
    }

    // If the context video data is for this video, set the slider and video position
    if (contextVideoData?.id === videoData.id) {
      // Set the slider value and video position to the context status
      setSliderValue(contextVideoData?.status ?? 0);
      setVideoPosition(contextVideoData?.status ?? 0);

      videoRef.current?.playAsync();
    }

    // If the active video is this video and the context video data is not this video, set the slider and video position to 0 and play the video
    if (activeVideoId === videoData.id && contextVideoData?.id !== videoData.id) {
      setSliderValue(0);
      setVideoPosition(0);

      videoRef.current?.playAsync();
    }
  }, [activeVideoId]);

  useEffect(() => {
    if (status?.isLoaded) {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Run cleanup function when component unmounts
  // Save the video current position in the context
  useEffect(() => {
    return () => {
      const currentStatus = statusRef.current;
      if (currentStatus && currentStatus.positionMillis !== 0) {
        handleSetVideoData({ ...videoData, status: currentStatus.positionMillis });
      }
    };
  }, []);

  return (
    <View style={style.mainContainer}>
      <ActivityIndicator
        size="large"
        color="white"
        style={[style.indicator, { display: isLoading ? "flex" : "none" }]}
      />
      <View style={{ height: SCREEN_HEIGHT }}>
        <Video
          ref={videoRef}
          style={[StyleSheet.absoluteFill]}
          source={{ uri: videoData.url }}
          resizeMode={ResizeMode.COVER}
          shouldCorrectPitch={true}
          onLoadStart={() => {
            setIsLoading(true);
          }}
          onReadyForDisplay={() => setIsLoading(false)}
          onPlaybackStatusUpdate={(status) => {
            setStatus(status as AVPlaybackStatusSuccess);
            if (status.isLoaded && status.durationMillis) {
              setSliderValue(status.positionMillis / status?.durationMillis);
            }
          }}
        />
        <ControllButtons title={videoData.title} onPlay={onPlay} />
      </View>

      <TimeSlider
        onPlay={onPlay}
        status={status}
        isPlayng={IS_PLAYNG}
        sliderValue={sliderValue}
        handleValueChange={handleValueChange}
        handleSlidingComplete={handleSlidingComplete}
      />
    </View>
  );
};
