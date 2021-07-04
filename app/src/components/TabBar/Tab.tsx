import { Size, Text, useSharedValuePressed } from "@auralous/ui";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  icon: {
    width: Size[4],
    height: Size[4],
  },
});

interface TabProps {
  name: string;
  title: string;
  Icon: FC<SvgProps>;
  navigation: BottomTabBarProps["navigation"];
  currentRoute: string;
}

const Tab: FC<TabProps> = ({ Icon, navigation, name, title, currentRoute }) => {
  const [pressed, pressedProps] = useSharedValuePressed();

  const stylesContent = useAnimatedStyle<ViewStyle>(() => ({
    justifyContent: "center",
    alignItems: "center",
    transform: [
      { scale: withSpring(pressed.value ? 0.9 : 1, { stiffness: 200 }) },
    ],
  }));

  return (
    <Pressable
      style={StyleSheet.compose(
        styles.pressable,
        // @ts-ignore
        currentRoute !== name && { opacity: 0.5 }
      )}
      onPress={() => navigation.navigate(name)}
      {...pressedProps}
    >
      <Animated.View style={stylesContent}>
        <Icon style={styles.icon} />
        <Text size="sm" bold>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default Tab;
