import SearchIcon from "@/assets/images/icons/search.svg";
import React, { useEffect, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import CrossIcon from "@/assets/images/icons/cross.svg";
import { DEFAULT_COLORS } from "@/constants/Colors";
import useActions from "@/hooks/useActions";
import { useDebounce } from "@/hooks/useDebounce";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { styles } from "./style/style";
export const Search = () => {
  const [value, setValue] = useState<string>("");
  const [isInputVisible, setInputVisible] = useState(false);
  const inputWidth = useSharedValue(0);

  const { setSearchValue } = useActions();
  const deounceValue = useDebounce(value, 500);

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
    inputWidth.value = withTiming(isInputVisible ? 0 : 200, { duration: 300 });
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      width: inputWidth.value,
    };
  });

  const onSearch = () => {
    setSearchValue(deounceValue as string);
  };

  const onClearSearch = () => {
    setValue("");
    toggleInput();
  };

  useEffect(() => {
    if (deounceValue?.length! >= 0) {
      onSearch();
    }
  }, [deounceValue]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, inputStyle]}>
        <TextInput
          autoFocus
          value={value}
          style={styles.input}
          onBlur={toggleInput}
          onChangeText={setValue}
          placeholder="Search by genre"
          placeholderTextColor={DEFAULT_COLORS.gray}
          underlineColorAndroid="transparent"
        />
        <Pressable onPress={onClearSearch}>
          <CrossIcon style={styles.crossIcon} />
        </Pressable>
      </Animated.View>
      <Pressable onPress={toggleInput}>
        <SearchIcon style={{ marginTop: 5 }} />
      </Pressable>
    </View>
  );
};
