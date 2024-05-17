import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
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
  const [videoPlayingVideoId, setVideoPlayingVideoId] = useState(VIDEO_DATA[0].id);

  const onViewableItemsChanged = ({ changed, viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setVideoPlayingVideoId(viewableItems[0].item.id);
    }
  };

  // const onViewAbilityConfigCallbackPairs = useRef([
  //   {
  //     viewabilityConfig: {
  //       itemVisiblePercentThreshold: 50,
  //     },
  //     onViewabilityChanged: ({ changed, viewableItems }) => {
  //       if (viewableItems.length > 0 && viewableItems[0].isViewable) {
  //         setVideoPlayingVideoId(viewableItems[0].item.id);
  //       }
  //     },
  //   },
  // ]);
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* <SingleVideo videoData={VIDEO_DATA[0]} /> */}
        <FlatList
          data={VIDEO_DATA}
          renderItem={({ item }) => (
            <SingleVideo videoData={item} activeVideoId={videoPlayingVideoId} />
          )}
          pagingEnabled
          // viewabilityConfig={{
          //   itemVisiblePercentThreshold: 50,
          // }}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          // viewabilityConfigCallbackPairs={onViewAbilityConfigCallbackPairs.current}
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
  activeVideoId: number;
};
const SingleVideo = ({ videoData, activeVideoId }: VideoType) => {
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
    <View style={[styles.container, { height }]}>
      <Video
        ref={videoRef}
        style={[StyleSheet.absoluteFill, styles.video]}
        source={{ uri: videoData.url }}
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
