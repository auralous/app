import {
  Font,
  makeStyles,
  Size,
  ThemeColorKey,
  useColors,
} from "@auralous/ui/styles";
import { FC } from "react";
import {
  Linking,
  Pressable,
  StyleProp,
  StyleSheet,
  Text as RNText,
  TextStyle,
} from "react-native";

const levelSize = [40, 36, 30, 24, 20, 18];

const sizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
};

interface TextProps {
  bold?: boolean | "medium";
  italic?: boolean;
  style?: StyleProp<TextStyle>;
  color?: ThemeColorKey;
  align?: TextStyle["textAlign"];
  size?: keyof typeof sizes;
  numberOfLines?: number;
}

export const useStyles = makeStyles(
  (theme, props: TextProps & { level?: number }) => ({
    base: {
      fontFamily: props.bold
        ? props.bold === "medium"
          ? Font.Medium
          : Font.Bold
        : "Inter-Regular",
      fontStyle: props.italic ? "italic" : undefined,
      textAlign: props.align,
      fontSize: props.size
        ? sizes[props.size]
        : props.level
        ? levelSize[props.level - 1]
        : Size[4],
      color: theme.colors[props.color || "text"] as string,
    },
  })
);

export const Text: FC<TextProps> = ({ children, numberOfLines, ...props }) => {
  const styles = useStyles(props);
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={StyleSheet.compose(styles.base, props.style)}
    >
      {children}
    </RNText>
  );
};

interface TextLinkProps {
  color?: ThemeColorKey;
  activeColor?: ThemeColorKey;
  href: string;
}

export const TextLink: FC<TextProps & TextLinkProps> = ({
  children,
  numberOfLines,
  href,
  activeColor = "primaryDark",
  ...props
}) => {
  if (!props.color) props.color = "primary";
  const colors = useColors();
  const styles = useStyles(props);
  return (
    <Pressable onPress={() => Linking.openURL(href)}>
      {({ pressed }) => (
        <RNText
          numberOfLines={numberOfLines}
          style={[
            StyleSheet.compose(styles.base, props.style),
            pressed && { color: colors[activeColor] as string },
          ]}
        >
          {children}
        </RNText>
      )}
    </Pressable>
  );
};

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading: FC<TextProps & HeadingProps> = ({
  children,
  numberOfLines,
  ...props
}) => {
  props.bold = props.bold ?? true;
  const styles = useStyles(props);
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={StyleSheet.compose(styles.base, props.style)}
    >
      {children}
    </RNText>
  );
};
