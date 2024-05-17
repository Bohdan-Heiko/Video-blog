import { Video } from "expo-av";
import { useRef } from "react";
import { styles } from "./style";

export const SingleVideo = () => {
  const videoRef = useRef<Video | null>(null);

  const play = async () => {
    if (videoRef.current == null) {
      return;
    }
    const status = await videoRef.current?.getStatusAsync();
    if (status?.) {
      return;
    }
    try {
      await videoRef.current.pauseAsync();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Video
      ref={videoRef}
      style={styles.container}
      shouldPlay={true}
      source={{
        uri: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8",
      }}
    />
  );
};
