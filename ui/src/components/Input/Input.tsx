import { makeStyles, Size, useColors } from "@auralous/ui/styles";
import { FC, useCallback } from "react";
import { Control, useController } from "react-hook-form";
import {
  ColorValue,
  ReturnKeyTypeOptions,
  TextInput,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface InputProps<TFieldValues> {
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  name: string;
  control?: Control<TFieldValues>;
  defaultValue?: string;
  placeholder?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  accessibilityLabel?: string;
  onSubmit?: () => void;
}

const useStyles = makeStyles((theme) => ({
  input: {
    flex: 1,
    padding: 0,
    color: theme.colors.textSecondary,
  },
}));

const Input: FC<InputProps<any>> = ({
  startIcon,
  endIcon,
  name,
  control,
  defaultValue = "",
  placeholder,
  returnKeyType,
  accessibilityLabel,
  onSubmit,
}) => {
  const dstyles = useStyles();
  const colors = useColors();
  const { field } = useController({
    control,
    defaultValue,
    name,
  });

  const isFocused = useSharedValue(false);

  const onFocused = useCallback(() => (isFocused.value = true), [isFocused]);
  const onBlur = useCallback(() => (isFocused.value = false), [isFocused]);

  const stylesRoot = useAnimatedStyle<ViewStyle>(() => ({
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    paddingHorizontal: Size[4],
    paddingVertical: Size[2],
    borderColor: withTiming(
      isFocused.value ? colors.control : colors.controlDark
    ) as unknown as ColorValue,
  }));

  return (
    <Animated.View style={stylesRoot}>
      {startIcon}
      <TextInput
        accessibilityLabel={accessibilityLabel}
        placeholderTextColor={colors.textTertiary}
        placeholder={placeholder}
        value={field.value}
        onChangeText={field.onChange}
        style={dstyles.input}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmit}
        onFocus={onFocused}
        onBlur={onBlur}
        underlineColorAndroid="rgba(0,0,0,0)"
      />
      {endIcon}
    </Animated.View>
  );
};

export default Input;
