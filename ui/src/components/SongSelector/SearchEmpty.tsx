import { Text } from "@auralous/ui/components/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

const SearchEmpty: FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.root}>
      <Text bold color="textSecondary" align="center">
        {t("common.result.search_empty")}
      </Text>
    </View>
  );
};

export default SearchEmpty;
