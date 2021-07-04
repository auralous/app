import { useEffect, useState } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const outputRange = [0, 1];

export const useAnimatedBgColors = (currentColor: string) => {
  const [colors, setColors] = useState([currentColor, currentColor]);

  const colorValue = useSharedValue(0);

  useEffect(() => {
    colorValue.value = 0;
    colorValue.value = withTiming(1, { duration: 400 });
  }, [colors, colorValue]);

  useEffect(() => {
    setColors((prevValues) => [prevValues[1], currentColor]);
  }, [currentColor, colorValue]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(colorValue.value, outputRange, colors),
    }),
    [colors, colorValue]
  );

  return animatedStyle;
};
