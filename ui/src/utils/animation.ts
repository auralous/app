import { useSharedValue } from "react-native-reanimated";

export function useSharedValuePressed() {
  const pressed = useSharedValue(false);
  return [
    pressed,
    {
      onPressIn: () => (pressed.value = true),
      onPressOut: () => (pressed.value = false),
    },
  ] as const;
}
