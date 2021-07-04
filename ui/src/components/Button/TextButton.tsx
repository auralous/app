import { Spacer } from "@auralous/ui/components/Spacer";
import { Text } from "@auralous/ui/components/Typography";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useStyles } from "./styles";
import { BaseButtonProps } from "./types";

export const TextButton: FC<BaseButtonProps> = (props) => {
  const styles = useStyles(props);

  const { icon, children, onPress, accessibilityLabel, disabled, textProps } =
    props;

  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.base}>
        {icon}
        {!!(icon && children) && <Spacer x={1} />}
        <Text
          bold
          {...textProps}
          style={StyleSheet.compose(styles.text, textProps?.style)}
        >
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
