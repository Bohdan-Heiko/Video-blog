import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { style } from "./style/style";
import CrossIcon from "@/assets/images/icons/cross.svg";
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
type VideoType = {
  videoData: {
    id: number;
    url: string;
  };
  activeVideoId: number;
};
export const SingleVideo = ({ videoData, activeVideoId }: VideoType) => {
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const videoRef = useRef<Video | null>(null);
  const { height } = useWindowDimensions();
  const [duration, setDuration] = useState<number>(0);

  const isPlayng = status?.isLoaded && status.isPlaying;

  const onPlay = () => {
    if (!videoRef.current) {
      return;
    }
    if (isPlayng) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }
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

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (activeVideoId !== videoData.id) {
      videoRef.current?.pauseAsync();
    }

    if (activeVideoId === videoData.id) {
      videoRef.current?.playAsync();
    }
  }, [activeVideoId]);
  return (
    <View style={{ height }}>
      <Video
        ref={videoRef}
        style={[StyleSheet.absoluteFill]}
        source={{ uri: videoData.url }}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={setStatus}
      />
      {/* <Pressable onPress={onPlay} style={{ flex: 1 }}> */}
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <LinearGradient
            colors={[
              "rgba(0, 0, 0, 0.9)",
              "rgba(0, 0, 0, .8)",
              "rgba(0, 0, 0, 0.5)",
              "rgba(0, 0, 0, 0)",
            ]}
            locations={[0.4, 0.6, 0.8, 1]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 100,
            }}
          />
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <View
              style={{
                paddingHorizontal: 20,
                // gap: width / 3 - 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <CrossIcon style={{ position: "absolute", left: 20 }} />
              <Text style={{ fontSize: 30, color: "white" }}>{videoData.id}</Text>
            </View>

            {/* Playback slider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                alignSelf: "center",
                backgroundColor: "black",
                padding: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>{formatTime(0)}</Text>
              <Slider
                containerStyle={{ flex: 1, marginHorizontal: 10 }}
                minimumValue={0}
                // maximumValue={duration * 1000}
                maximumValue={0}
                value={duration}
                onValueChange={(value) => {
                  setDuration(value);
                }}
                onSlidingComplete={(value) => {
                  // onSeek(value);
                }}
                minimumTrackTintColor="#FFF"
                maximumTrackTintColor="#AAA"
                thumbTintColor="#FFF"
              />
              <Text style={{ color: "white", fontSize: 12 }}>{formatTime(60000)}</Text>
            </View>
          </View>
          {/* <Text style={{ fontSize: 30, color: "white" }}>{isPlayng ? "Play" : "Pause"}</Text> */}

          <LinearGradient
            colors={[
              "rgba(0, 0, 0, 0)",
              "rgba(0, 0, 0, 0.5)",
              "rgba(0, 0, 0, .8)",
              "rgba(0, 0, 0, 0.9)",
            ]}
            locations={[0.4, 0.6, 0.8, 1]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
            }}
          />
        </SafeAreaView>
      </View>
      {/* </Pressable> */}
    </View>
  );
};
