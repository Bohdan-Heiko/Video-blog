import { StatusBar } from "expo-status-bar";

import { DEFAULT_COLORS } from "@/constants/Colors";
import { Video } from "expo-av";
import { StyleSheet, useWindowDimensions } from "react-native";
// import { Slider } from "@miblanchard/react-native-slider";
import React, { useEffect, useRef, useState } from "react";

import { VideoControls } from "@/components/videoControl";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

// import * as ScreenOrientation from "expo-screen-orientation";

const playbackSpeedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

const fakeLessons = [
  {
    lessonId: "1",
    lessonVideoUrl:
      "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8",
    lessonTitle: "Lesson 1",
    lessonDescription: "Introduction to React Native 1",
    videoTotalDuration: "60",
    lessonThumbnailImageUrl: "https://example.com/thumbnail1.jpg",
  },
  {
    lessonId: "2",
    lessonVideoUrl:
      "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/3wife3.m3u8",
    lessonTitle: "Lesson 2",
    lessonDescription: "Introduction to React Native 2",
    videoTotalDuration: "60",
    lessonThumbnailImageUrl: "https://example.com/thumbnail2.jpg",
  },
  // Add more lessons here
];

const FeedScreen = () => {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState({});
  const videoRef = useRef(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const onGestureEvent = (event) => {
    const { translationY } = event.nativeEvent;
    console.log(translationY);

    if (translationY < -50) {
      console.log("Swiped Up");
    } else if (translationY > 50) {
      console.log("Swiped Down");
    }
  };

  const { height } = useWindowDimensions();

  const singleTap = Gesture.Tap().onStart((event) => {
    runOnJS(setShowControls)(!showControls);
    // Simulate show/hide controls behavior here
  });

  useEffect(() => {
    // Simulate fetching lessons by course

    setLessons(fakeLessons);
    setSelectedLesson(fakeLessons[0]);
  }, []);

  //sets the current time, if video is finished, moves to the next video
  const handlePlaybackStatusUpdate = (status) => {
    setCurrentTime(status.positionMillis);
    if (status.didJustFinish) {
      playNextVideo();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextVideo = () => {
    if (currentLessonIndex < lessons.length - 1) {
      runOnJS(setCurrentLessonIndex)((prevIndex) => prevIndex + 1);
    }
  };

  const playPreviousVideo = () => {
    if (currentLessonIndex > 0) {
      runOnJS(setCurrentLessonIndex)((prevIndex) => prevIndex - 1);
    }
  };

  const togglePlaybackSpeed = () => {
    //gets the next playback speed index
    const nextSpeedIndex = playbackSpeedOptions.indexOf(playbackSpeed) + 1;
    if (nextSpeedIndex < playbackSpeedOptions.length) {
      videoRef.current.setRateAsync(playbackSpeedOptions[nextSpeedIndex], true);
      setPlaybackSpeed(playbackSpeedOptions[nextSpeedIndex]);
    }
    //if the last option i.e. 2x speed is applied. then moves to first option
    else {
      videoRef.current.setRateAsync(playbackSpeedOptions[0], true);
      setPlaybackSpeed(playbackSpeedOptions[0]);
    }
  };

  const toggleMute = () => {
    videoRef.current.setIsMutedAsync(isMuted);
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async () => {};

  const swipeVertical = Gesture.Pan().onUpdate((event) => {
    const { translationY, state } = event;

    console.log(translationY, state, State.END);
    if (state === State.END) {
      if (translationY < -50 && currentLessonIndex < lessons.length - 1) {
        runOnJS(playNextVideo);
      } else if (translationY > 50 && currentLessonIndex > 0) {
        runOnJS(playPreviousVideo);
      }
    }

    // Assuming we want to control volume from 0 to 1
    // const newVolume = Math.min(Math.max(1 - swipePercentage, 0), 1);
    // videoRef.current.setVolumeAsync(newVolume);
  });

  return (
    <>
      <StatusBar style="light" />

      <GestureHandlerRootView style={{ flex: 1 }}>
        {lessons.length > 0 && (
          <>
            <GestureDetector gesture={Gesture.Exclusive(swipeVertical)}>
              <PanGestureHandler
                onEnded={() => console.log("ENDD")}
                onHandlerStateChange={onGestureEvent}
                onGestureEvent={onGestureEvent}
              >
                <Video
                  ref={videoRef}
                  source={{
                    uri: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8",
                  }}
                  rate={playbackSpeed}
                  isMuted={isMuted}
                  shouldPlay={isPlaying}
                  // resizeMode="cover"
                  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                  style={{ flex: 1 }}
                />
              </PanGestureHandler>
            </GestureDetector>
            {showControls && (
              <VideoControls
                onTogglePlayPause={togglePlayPause}
                onPlayPreviousVideo={playPreviousVideo}
                onPlayNextVideo={playNextVideo}
                onToggleMute={toggleMute}
                onTogglePlaybackSpeed={togglePlaybackSpeed}
                onSeek={(value) => {
                  videoRef.current.setPositionAsync(+value);
                  setCurrentTime(+value);
                }}
                onToggleFullscreen={toggleFullscreen}
                duration={+selectedLesson?.videoTotalDuration}
                currentTime={currentTime}
                rate={playbackSpeed}
                isMuted={isMuted}
                shouldPlay={isPlaying}
              />
            )}
          </>
        )}
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_COLORS.dark,
  },
  video: {
    // height: 300,
    // width: "100%",
    flex: 1,
  },
});

export default FeedScreen;

{
  /* <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8",
          }}
          isLooping
          shouldPlay={true}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isMuted={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View> */
}
