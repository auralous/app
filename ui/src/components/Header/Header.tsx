import { Text } from "@auralous/ui/components/Typography";
import { Size } from "@auralous/ui/styles";
import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface HeaderProps {
  title: string | ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  translucent?: boolean;
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: Size[2],
    paddingHorizontal: Size[6],
    flexDirection: "row",
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    minWidth: Size[10],
  },
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Header: FC<HeaderProps> = ({ title, left, right }) => {
  return (
    <View style={styles.root}>
      <View style={styles.button}>{left}</View>
      <View pointerEvents="none" style={styles.title}>
        {typeof title === "string" ? (
          <Text bold align="center" size="lg" numberOfLines={1}>
            {title}
          </Text>
        ) : (
          title
        )}
      </View>
      <View style={styles.button}>{right}</View>
    </View>
  );
};

export default Header;
