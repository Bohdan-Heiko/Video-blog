import { MainSliderData } from "@/types/mainSlider";
import { useRouter } from "expo-router";
import { Pressable, ScrollView } from "react-native";
import { MainSliderCard } from "./compoonents/card";
export const MainSlider = ({ data }: { data: MainSliderData[] }) => {
  const router = useRouter();

  return (
    <ScrollView horizontal={true} overScrollMode="never" showsHorizontalScrollIndicator={false}>
      {data?.map((slide) => (
        <Pressable
          key={slide.id}
          onPress={() =>
            router.push({
              pathname: "/feed",
              params: { data: JSON.stringify([slide, ...data.filter((d) => d.id !== slide.id)]) },
            })
          }
        >
          <MainSliderCard slideData={slide} />
        </Pressable>
      ))}
    </ScrollView>
  );
};
