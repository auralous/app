import { IconChevronLeft } from "@auralous/ui/assets";
import { Button } from "@auralous/ui/components/Button";
import { Heading, Text } from "@auralous/ui/components/Typography";
import { Size } from "@auralous/ui/styles";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    padding: Size[8],
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginBottom: Size[1],
  },
  buttonContainer: {
    marginTop: Size[8],
  },
});

const NotFound: FC<{ onBack(): void }> = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <Heading level={2} style={styles.heading}>
        {t("not_found.title")}
      </Heading>
      <Text align="center" color="textSecondary" size="lg">
        {t("not_found.description")}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          icon={<IconChevronLeft width={24} height={24} />}
          onPress={onBack}
        >
          {t("common.navigation.go_back")}
        </Button>
      </View>
    </View>
  );
};

export default NotFound;
