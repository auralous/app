import { Heading, Size, Text } from "@auralous/ui";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface SectionProps {
  title: string;
  description?: string;
}

const styles = StyleSheet.create({
  root: {
    marginBottom: Size[6],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Size[2],
  },
});

const Section: FC<SectionProps> = ({ title, description, children }) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View>
          <Heading level={6}>{title}</Heading>
          {!!description && <Text color="textSecondary">{description}</Text>}
        </View>
        <View></View>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default Section;
