import { usePlaybackColor } from "@auralous/player";
import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated from "react-native-reanimated";
import { useAnimatedBgColors } from "../useAnimatedBgColors";

const gradientColors = ["rgba(0,0,0,.5)", "rgba(0,0,0,.1)"];
const start = { x: 0, y: 2 / 3 };
const end = { x: 1, y: 1 / 3 };

const PlayerViewBackground: FC = () => {
  const animatedStyle = useAnimatedBgColors(usePlaybackColor());

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, animatedStyle]}
      />
      <LinearGradient
        colors={gradientColors}
        start={start}
        end={end}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
    </>
  );
};

export default memo(PlayerViewBackground);
