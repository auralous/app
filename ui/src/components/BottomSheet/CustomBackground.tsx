import { useColors } from "@auralous/ui/styles";
import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

const CustomBackground: FC<{
  style: StyleProp<ViewStyle>;
  pointerEvents: ViewProps["pointerEvents"];
}> = ({ style, pointerEvents }) => {
  const colors = useColors();
  return (
    <View
      pointerEvents={pointerEvents}
      style={StyleSheet.compose(
        { backgroundColor: colors.backgroundSecondary },
        style
      )}
    />
  );
};

export default CustomBackground;
