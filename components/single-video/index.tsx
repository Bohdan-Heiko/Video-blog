import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
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
  const videoRef = useRef<Video | null>(null);
  const { height } = useWindowDimensions();

  const [isSeeking, setIsSeeking] = useState(false);
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const [duration, setDuration] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState(0);

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

  const handleValueChange = (value) => {
    console.log(value);
    setSliderValue(value[0]);
  };

  const handleSlidingComplete = async (value) => {
    if (videoRef.current) {
      await videoRef.current.setPositionAsync(value[0] * status.durationMillis);
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
      videoRef.current?.playAsync();
    }
  }, [activeVideoId]);
  return (
    <View style={{ position: "relative" }}>
      <View style={{ height }}>
        <Video
          ref={videoRef}
          style={[StyleSheet.absoluteFill]}
          source={{ uri: videoData.url }}
          resizeMode={ResizeMode.COVER}
          // onPlaybackStatusUpdate={setStatus}
          onPlaybackStatusUpdate={(status) => {
            setStatus(() => status);
            if (!isSeeking && status.isLoaded) {
              setSliderValue(status.positionMillis / status.durationMillis);
            }
          }}
        />
        <Pressable onPress={onPlay} style={{ flex: 1 }}>
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
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          // alignSelf: "center",
          // backgroundColor: "black",
          padding: 10,
          position: "absolute",
          bottom: 10,
          gap: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 12 }}>{formatTime(status?.positionMillis)}</Text>

        <Slider
          value={sliderValue}
          onValueChange={handleValueChange}
          // onSlidingStart={handleSlidingStart}
          onSlidingComplete={handleSlidingComplete}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFFFFF"
          containerStyle={styles.slider}
        />

        <Text style={{ color: "white", fontSize: 12 }}>{formatTime(status?.durationMillis)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: 300,
  },
  slider: {
    width: "70%",
    // marginTop: 10,
    // position: "absolute",
    // bottom: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 5,
  },
  timeText: {
    color: "#FFFFFF",
  },
});
