import { AVPlaybackStatusSuccess } from "expo-av";
import { Pressable, Text, View } from "react-native";

import { DEFAULT_COLORS } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Slider } from "@miblanchard/react-native-slider";

import { dateHelper } from "@/utils/helpers/date-helper";
import { style } from "../style/style";

interface Props {
  onPlay: () => void;
  isPlayng: boolean | undefined;
  sliderValue: number;
  status: AVPlaybackStatusSuccess | undefined;
  handleValueChange: (value: Array<number>) => void;
  handleSlidingComplete: (value: Array<number>) => void;
}

export const TimeSlider = ({
  onPlay,
  status,
  isPlayng,
  sliderValue,
  handleValueChange,
  handleSlidingComplete,
}: Props) => {
  return (
    <View style={style.timeContainer}>
      <View style={style.sliderMainContainer}>
        <Pressable onPress={onPlay}>
          <FontAwesome6 name={isPlayng ? "pause" : "play"} size={24} color="white" />
        </Pressable>
        <View style={style.sliderContainer}>
          <Text style={[style.sliderTime, { position: "absolute", bottom: -4 }]}>
            {dateHelper.formatTime(status?.positionMillis as number)}
          </Text>
          <Slider
            value={sliderValue}
            onValueChange={handleValueChange}
            onSlidingComplete={handleSlidingComplete}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor={"rgba(255, 255, 255, 0.3)"}
            thumbTintColor={DEFAULT_COLORS.white}
            containerStyle={style.slider}
            thumbStyle={{ height: 9, width: 9 }}
          />
          <Text style={[style.sliderTime, { position: "absolute", bottom: -4, right: 0 }]}>
            {dateHelper.formatTime(status?.durationMillis as number)}
          </Text>
        </View>
      </View>
    </View>
  );
};
