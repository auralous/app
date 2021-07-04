import {
  BaseButtonProps,
  GradientColors,
  Spacer,
  Text,
  useSharedValuePressed,
  useStylesButton,
} from "@auralous/ui";
import { FC } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type GradientButtonProps = BaseButtonProps;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const GradientButton: FC<GradientButtonProps> = (props) => {
  const styles = useStylesButton(props);
  const { icon, children, onPress, accessibilityLabel, disabled, textProps } =
    props;

  const [pressed, pressedProps] = useSharedValuePressed();

  const animatedStyles = useAnimatedStyle<ViewStyle>(() => ({
    opacity: withTiming(!disabled && pressed.value ? 0.2 : 1),
  }));

  return (
    <AnimatedPressable
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={disabled}
      {...pressedProps}
      style={[StyleSheet.compose(styles.base, props.style), animatedStyles]}
    >
      <LinearGradient
        colors={GradientColors.rainbow.colors}
        locations={GradientColors.rainbow.locations}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      {icon}
      {!!(icon && children) && <Spacer x={1} />}
      <Text
        bold
        {...textProps}
        style={[
          StyleSheet.compose(styles.text, textProps?.style),
          { color: GradientColors.rainbow.text },
        ]}
      >
        {children}
      </Text>
    </AnimatedPressable>
  );
};
