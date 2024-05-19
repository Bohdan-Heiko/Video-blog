import { SingleVideo } from "@/components/single-video";
import useActions from "@/hooks/useActions";
import { useAppSelector } from "@/store";
import { MainSliderData } from "@/types/mainSlider";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, View, ViewToken } from "react-native";
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

const MOK_data = [
  {
    id: "JBfEtbVPizdqbzhP6rYz",
    img: "https://publish.purewow.net/wp-content/uploads/sites/2/2023/10/2023-movie-trend-UNI.jpg?resize=720,780",
    isCommingSoon: false,
    title: "Barbie",
    url: "https://live-par-2-cdn-alt.livepush.io/live/bigbuckbunnyclip/index.m3u8",
  },
  {
    id: "WRUd3KoEEcQYFbx0zn6h",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/cf/15/57/caption.jpg?w=1200&h=-1&s=1",
    isCommingSoon: false,
    title: "Savannah Tales",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/5wife5.m3u8",
  },
  {
    id: "bpJRVkmWn5jLF5ateLNm",
    img: "https://m.media-amazon.com/images/I/61r4gCzcFrL._AC_UF1000,1000_QL80_.jpg",
    isCommingSoon: false,
    title: "Echoes of the Arctic",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8",
  },
  {
    id: "uO4ta0N4V6SRIk9Yf16R",
    img: "https://tozome.com/wp-content/uploads/2023/05/Lofoten-islands-History-of-the-Northern-Lights.jpg",
    isCommingSoon: false,
    title: "Mystery of the Northern Lights",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/7wife7.m3u8",
  },
  {
    id: "Oc7SbOYLeOIBRbQFbx4C",
    img: "https://nullarborroadhouse.com.au/wp-content/uploads/2015/05/feature-image.jpg",
    isCommingSoon: true,
    isCommingTitile: "Desert Mirage",
    isCommingTitileDate: "Coming August 15",
    title: "Journey Through the Wild West",
  },
  // {
  //   id: "dDGh89qEINSbRIV99Ljv",
  //   img: "https://m.media-amazon.com/images/I/51PwgZxEI8L.jpg",
  //   isCommingSoon: true,
  //   isCommingTitile: "Beautiful Revenge",
  //   isCommingTitileDate: "Coming July 2",
  //   title: "Wolfstate Chronicles: Alaska, Texas",
  // },
  // {
  //   id: "tCjqKbQiPefPyLnw54MJ",
  //   img: "https://www.backdoorjobs.com/wildernessadventures/masthead.png",
  //   isCommingSoon: true,
  //   isCommingTitile: "Mountain Quest",
  //   isCommingTitileDate: "Coming September 10",
  //   title: "Wilderness Adventures",
  // },
];

const MOK_mainSliderData = [
  {
    genre: "adventure",
    id: "etJVJmCtLng2tJe67qGi",
    img: "https://screencraft.org/wp-content/uploads/2022/05/101-Adventure-Story-Prompts_SC-768x432.jpg",
    subTitle: "High Stakes for Dustin",
    title: "Madness Frontier",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8",
  },
  {
    genre: "comdey",
    id: "4zrR6FbT4Isbsi767ggJ",
    img: "https://media.gq-magazine.co.uk/photos/65e99a7c6c03b53bb6ca3042/master/pass/Best-comedy-films.jpg",
    subTitle: "Dustin's Dare",
    title: "Edge of Risk",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/3wife3.m3u8",
  },
  {
    genre: "romance",
    id: "H7pyEb7IW669IUzm8l1f",
    img: "https://prod-bb-images.akamaized.net/book-covers/coverimage-9788726606850-publizon-2022-02-17.jpg?w=640",
    subTitle: "Dustin Takes the Challenge",
    title: "Perilous Play",
    url: "https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/2wife2.m3u8",
  },
];

type onViewable = {
  viewableItems: ViewToken<MainSliderData>[];
  changed: ViewToken<MainSliderData>[];
};

export const Feed = () => {
  const { data } = useLocalSearchParams();
  // const { resetVideoData, videoData: contextVideoData, handleSetVideoData } = useVideoContext();
  const { clearVideoData, setVideoData } = useActions();
  const { video: videoData } = useAppSelector((state) => state.video_data);

  const [videoPlayingId, setVideoPlayingId] = useState(JSON.parse(data as string)[0].id);

  const onViewableItemsChanged = ({ viewableItems }: onViewable) => {
    if (viewableItems.length > 0 && viewableItems[0].isViewable) {
      setVideoPlayingId(viewableItems[0].item.id);
      clearVideoData();
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <FlatList
          data={JSON.parse(data as string)}
          renderItem={({ item }) => (
            <SingleVideo
              videoData={item}
              activeVideoId={videoPlayingId}
              resetVideoData={clearVideoData}
              contextVideoData={videoData}
              handleSetVideoData={setVideoData}
            />
          )}
          pagingEnabled
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item) => item.id}
          decelerationRate={"fast"}
        />
      </View>
    </>
  );
};
