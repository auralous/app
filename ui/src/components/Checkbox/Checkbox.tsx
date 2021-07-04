import { IconCheck } from "@auralous/ui/assets";
import { makeStyles, useColors } from "@auralous/ui/styles";
import { useSharedValuePressed } from "@auralous/ui/utils";
import { FC, useCallback } from "react";
import { Pressable, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  onValueChange(checked: boolean): void;
}

const useStyles = makeStyles((theme, checked: boolean) => ({
  check: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: checked ? theme.colors.text : theme.colors.textTertiary,
    backgroundColor: checked ? theme.colors.text : "transparent",
  },
}));

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Checkbox: FC<CheckboxProps> = ({ checked, disabled, onValueChange }) => {
  const colors = useColors();
  const dstyles = useStyles(checked);
  const [pressed, pressedProps] = useSharedValuePressed();

  const stylesRoot = useAnimatedStyle<ViewStyle>(() => ({
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: withTiming(pressed.value ? 0.8 : 1) }],
  }));

  const onPress = useCallback(
    () => onValueChange(!checked),
    [onValueChange, checked]
  );

  return (
    <AnimatedPressable
      accessibilityState={{
        checked,
        disabled,
      }}
      accessibilityRole="checkbox"
      style={stylesRoot}
      onPress={onPress}
      {...pressedProps}
    >
      <View style={dstyles.check}>
        {checked && (
          <IconCheck color={colors.background} width={16} height={16} />
        )}
      </View>
    </AnimatedPressable>
  );
};

export default Checkbox;
