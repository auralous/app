import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { IThemeContext, useTheme } from "./theme";

type StylesFn<TStyles, TProps> = (
  theme: IThemeContext,
  props: TProps
) => TStyles | StyleSheet.NamedStyles<TStyles>;

export default function makeStyles<
  TProps extends unknown,
  TStyles extends StyleSheet.NamedStyles<TStyles> | StyleSheet.NamedStyles<any>
>(styleFn: StylesFn<TStyles, TProps>) {
  return (props?: TProps) => {
    const theme = useTheme();
    return useMemo(() => styleFn(theme, props as TProps), [theme, props]);
  };
}
