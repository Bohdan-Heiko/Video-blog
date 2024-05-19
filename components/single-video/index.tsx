import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";
import { useEffect, useRef } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

import useActions from "@/hooks/useActions";
import { SliderData } from "@/types/data";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { useRouter } from "expo-router";
import { ControllButtons } from "./components/controllButtons";
import { TimeSlider } from "./components/timeSlider";
import { useSingleVideo } from "./hooks/useSingleVideo";
import { style } from "./style/style";

type CasheVideoStatus = {
  id: string | null;
  status: number;
};
type VideoType = {
  videoData: SliderData;
  activeVideoId: number | string;
  casheVideoData: SliderData | null;
  casheVideoStatus: CasheVideoStatus;
  resetVideoData: ActionCreatorWithoutPayload<"video_data/clearVideoData">;
};

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export const SingleVideo = ({
  videoData,
  activeVideoId,
  casheVideoData,
  resetVideoData,
  casheVideoStatus,
}: VideoType) => {
  const { setVideoStatus } = useActions();
  const router = useRouter();
  const videoRef = useRef<Video | null>(null);
  const { slider, loader, videoStatus, plauerValue } = useSingleVideo({ videoRef });

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

    if (casheVideoData?.id === videoData.id && casheVideoStatus.id === videoData.id) {
      slider.setSliderValue(casheVideoStatus?.status ?? 0);
      videoStatus.setVideoPosition(casheVideoStatus?.status ?? 0);
      videoRef.current?.playAsync();
    }

    // If the active video is this video and the context video data is not this video, set the slider and video position to 0 and play the video
    if (activeVideoId === videoData.id && casheVideoData?.id !== videoData.id) {
      slider.setSliderValue(0);
      videoStatus.setVideoPosition(0);

      videoRef.current?.playAsync();
    }
  }, [activeVideoId]);

  useEffect(() => {
    if (videoStatus.status?.isLoaded) {
      loader.hideLoading();
    }
  }, [videoStatus.status]);

  //Reset store when user close player
  useEffect(() => {
    if (!plauerValue.value) {
      resetVideoData();
      return router.back();
    }
  }, [plauerValue.value]);

  return (
    <View style={style.mainContainer}>
      <ActivityIndicator
        size="large"
        color="white"
        style={[style.indicator, { display: loader.loadingValue.value ? "flex" : "none" }]}
      />
      <View style={{ height: SCREEN_HEIGHT }}>
        <Video
          ref={videoRef}
          shouldCorrectPitch={true}
          resizeMode={ResizeMode.COVER}
          onLoadStart={loader.showLoading}
          style={[StyleSheet.absoluteFill]}
          onReadyForDisplay={loader.hideLoading}
          source={{ uri: videoData.url as string }}
          onPlaybackStatusUpdate={(status) => {
            videoStatus.setStatus(status as AVPlaybackStatusSuccess);
            if (status.isLoaded && status.durationMillis) {
              setVideoStatus({ id: videoData.id, status: status?.positionMillis as number });
              slider.setSliderValue(status.positionMillis / status?.durationMillis);
            }
          }}
        />
        <ControllButtons
          onPlay={videoStatus.onPlay}
          title={videoData.title}
          onClose={videoStatus.handleCloseVideo}
        />
      </View>

      <TimeSlider
        onPlay={videoStatus.onPlay}
        status={videoStatus.status}
        isPlayng={slider.IS_PLAYNG}
        sliderValue={slider.sliderValue}
        handleValueChange={slider.handleValueChange}
        handleSlidingComplete={slider.handleSlidingComplete}
      />
    </View>
  );
};
