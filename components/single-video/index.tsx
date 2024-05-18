import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CrossIcon from "@/assets/images/icons/cross.svg";
import { DEFAULT_COLORS } from "@/constants/Colors";
import { useVideoContext } from "@/context/feed.context";
import { MainSliderData } from "@/types/mainSlider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
import { style } from "./style/style";

type VideoType = {
  videoData: MainSliderData;
  activeVideoId: number | string;
};

const formatTime = (timeInMillis: number) => {
  if (!isNaN(timeInMillis)) {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return "00:00";
};

export const SingleVideo = ({ videoData, activeVideoId }: VideoType) => {
  const { videoData: contextVideoData, handleSetVideoData } = useVideoContext();

  const videoRef = useRef<Video | null>(null);
  const { height } = useWindowDimensions();

  const [isSeeking, setIsSeeking] = useState(false);
  const [status, setStatus] = useState<AVPlaybackStatusSuccess>();
  const [sliderValue, setSliderValue] = useState(4000);

  const IS_PLAYNG = status?.isLoaded && status.isPlaying;

  const onPlay = () => {
    if (!videoRef.current) {
      return;
    }
    if (IS_PLAYNG) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }
  };

  const handleSlidingStart = () => {
    setIsSeeking(true);
  };

  const handleValueChange = (value: Array<number>) => {
    setSliderValue(value[0]);
  };

  const setVideoPosition = async (position: number) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(position);
    }
  };

  const handleSlidingComplete = async (value: Array<number>) => {
    if (videoRef.current && status?.durationMillis) {
      setVideoPosition(value[0] * status.durationMillis);
      setIsSeeking(false);
    }
  };

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (activeVideoId !== videoData.id) {
      videoRef.current?.pauseAsync();
    }

    if (activeVideoId === videoData.id) {
      setSliderValue(contextVideoData?.status ?? 0);
      setVideoPosition(contextVideoData?.status ?? 0);

      videoRef.current?.playAsync();
    }
  }, [activeVideoId]);

  useEffect(() => {
    return () => {
      if (!status || status.positionMillis === 0) return;
      handleSetVideoData({ ...videoData, status: status.positionMillis });
    };
  }, [status?.positionMillis]);

  return (
    <View style={style.mainContainer}>
      <View style={{ height }}>
        <Video
          ref={videoRef}
          style={[StyleSheet.absoluteFill]}
          source={{ uri: videoData.url }}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={(status) => {
            setStatus(status as AVPlaybackStatusSuccess);
            if (!isSeeking && status.isLoaded && status.durationMillis) {
              setSliderValue(status.positionMillis / status?.durationMillis);
            }
          }}
        />
        <Pressable onPress={onPlay} style={style.flex1}>
          <View style={style.flex1}>
            <SafeAreaView style={style.flex1}>
              <LinearGradient
                colors={[
                  "rgba(0, 0, 0, 0.9)",
                  "rgba(0, 0, 0, .8)",
                  "rgba(0, 0, 0, 0.5)",
                  "rgba(0, 0, 0, 0)",
                ]}
                locations={[0.4, 0.6, 0.8, 1]}
                style={style.topGradient}
              />
              <View style={style.labelVideoContainer}>
                <View style={style.label}>
                  <CrossIcon style={style.icon} />
                  <Text style={style.title}>{videoData.title}</Text>
                </View>
              </View>

              <LinearGradient
                colors={[
                  "rgba(0, 0, 0, 0)",
                  "rgba(0, 0, 0, 0.5)",
                  "rgba(0, 0, 0, .8)",
                  "rgba(0, 0, 0, 0.9)",
                ]}
                locations={[0.4, 0.6, 0.8, 1]}
                style={style.bottomGradient}
              />
            </SafeAreaView>
          </View>
        </Pressable>
      </View>

      <View style={style.timeContainer}>
        <View style={style.sliderMainContainer}>
          <Pressable onPress={onPlay}>
            {IS_PLAYNG ? (
              <FontAwesome6 name="pause" size={24} color="white" />
            ) : (
              <FontAwesome6 name="play" size={24} color="white" />
            )}
          </Pressable>
          <View style={style.sliderContainer}>
            <Text style={[style.sliderTime, { position: "absolute", bottom: -4 }]}>
              {formatTime(status?.positionMillis as number)}
            </Text>
            <Slider
              value={sliderValue}
              onValueChange={handleValueChange}
              onSlidingStart={handleSlidingStart}
              onSlidingComplete={handleSlidingComplete}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor={"rgba(255, 255, 255, 0.3)"}
              thumbTintColor={DEFAULT_COLORS.white}
              containerStyle={style.slider}
              thumbStyle={{ height: 9, width: 9 }}
            />
            <Text style={[style.sliderTime, { position: "absolute", bottom: -4, right: 0 }]}>
              {formatTime(status?.durationMillis as number)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
