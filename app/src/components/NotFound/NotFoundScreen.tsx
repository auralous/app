import { NotFound } from "@auralous/ui";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const NotFoundScreen: FC = () => {
  return (
    <View style={styles.root}>
      <NotFound />
    </View>
  );
};

export default NotFoundScreen;
