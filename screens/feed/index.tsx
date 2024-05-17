import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";

const VIDEO_DATA = [
  {
    id: 1,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8",
  },
  {
    id: 2,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/2wife2.m3u8",
  },
  {
    id: 3,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/3wife3.m3u8",
  },
  {
    id: 4,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8",
  },
  {
    id: 5,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8",
  },
  {
    id: 6,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8",
  },
  {
    id: 7,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8",
  },
  {
    id: 8,
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8",
  },
];

export const Feed = () => {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* <SingleVideo videoData={VIDEO_DATA[0]} /> */}
        <FlatList
          data={VIDEO_DATA}
          renderItem={({ item }) => <SingleVideo videoData={item} />}
          // pagingEnabled
          // keyExtractor={(item: any) => item.id}
          // decelerationRate={"normal"}
        />
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
  const { height } = useWindowDimensions();

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
    <View style={[styles.container, { height }]}>
      <Video
        ref={videoRef}
        style={[StyleSheet.absoluteFill, styles.video]}
        source={{ uri: videoData.url }}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={setStatus}
      />
      {/* <Pressable onPress={onPlay} style={{ flex: 1 }}> */}
      <View style={styles.content}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, color: "white" }}>{isPlayng ? "Play" : "Pause"}</Text>
        </SafeAreaView>
      </View>
      {/* </Pressable> */}
    </View>
  );
};
