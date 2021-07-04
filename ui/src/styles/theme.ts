import { identityFn } from "@auralous/ui/utils";
import {
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import { Colors } from "./colors";

export type ThemeColorKey = keyof typeof Colors;

const ThemeContext = createContext<IThemeContext>({
  colors: Colors,
});

export const useTheme = (): IThemeContext =>
  useContextSelector(ThemeContext, identityFn);

const colorsSelector = (theme: IThemeContext) => theme.colors;
export const useColors = () => useContextSelector(ThemeContext, colorsSelector);

export interface IThemeContext {
  colors: Record<ThemeColorKey, string>;
}
