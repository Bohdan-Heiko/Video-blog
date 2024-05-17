import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

const VIDEO_DATA = [
  {
    id: 1,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8",
  },
];

export const Feed = () => {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <SingleVideo videoData={VIDEO_DATA[0]} />
        {/* <FlatList
          data={array}
          renderItem={renderItem}
          pagingEnabled
          keyExtractor={(item: any) => item}
          decelerationRate={"normal"}
        /> */}
      </View>
    </>
  );
};

type VideoType = {
  videoData: {
    id: number;
    url: string;
  };
};
const SingleVideo = ({ videoData }: VideoType) => {
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const videoRef = useRef<Video | null>(null);

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
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={[StyleSheet.absoluteFill, styles.video]}
        source={{ uri: VIDEO_DATA[0].url }}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={setStatus}
      />
      <Pressable onPress={onPlay} style={{ flex: 1 }}>
        <View style={styles.content}>
          <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ fontSize: 30, color: "white" }}>{isPlayng ? "Play" : "Pause"}</Text>
          </SafeAreaView>
        </View>
      </Pressable>
    </View>
  );
};
