import { FlatList, View, ViewToken } from "react-native"
import { useState } from "react"
import { StatusBar } from "expo-status-bar"

import { SingleVideo } from "@/components/single-video"
import useActions from "@/hooks/useActions"
import { useAppSelector } from "@/store"
import { SliderData } from "@/types/data"

import { styles } from "./style"

type onViewable = {
  viewableItems: ViewToken<SliderData>[]
  changed: ViewToken<SliderData>[]
}

export const Feed = () => {
  const { clearVideoData, setVideoData } = useActions()
  const {
    video: videoData,
    feedVideos,
    videoStatus
  } = useAppSelector((state) => state.video_data)
  const [videoPlayingId, setVideoPlayingId] = useState(feedVideos[0].id)

  const onViewableItemsChanged = ({ viewableItems }: onViewable) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      //set id for equals in
      setVideoPlayingId(viewableItems[0].item.id)

      // set to storage views video
      setVideoData(viewableItems[0].item)
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <FlatList
          data={feedVideos}
          renderItem={({ item }) => (
            <SingleVideo
              videoData={item as SliderData}
              activeVideoId={videoPlayingId}
              resetVideoData={clearVideoData}
              casheVideoData={videoData}
              casheVideoStatus={videoStatus}
            />
          )}
          pagingEnabled
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50
          }}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item) => item.id}
          decelerationRate={"fast"}
        />
      </View>
    </>
  )
}
