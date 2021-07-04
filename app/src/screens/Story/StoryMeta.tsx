import { Story } from "@auralous/api";
import { Avatar, Heading, Size, Spacer, Text } from "@auralous/ui";
import { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    paddingVertical: Size[3],
    paddingHorizontal: Size[6],
    alignItems: "center",
  },
});

const StoryMeta: FC<{ story: Story; tagElement: ReactNode }> = ({
  story,
  tagElement,
}) => {
  return (
    <View style={styles.root}>
      <Avatar
        size={32}
        href={story.creator.profilePicture}
        username={story.creator.username}
      />
      <Spacer y={2} />
      {tagElement}
      <Heading level={4} align="center">
        {story.text || ""}
      </Heading>
      <Text color="textSecondary" align="center">
        {story.creator.username}
      </Text>
    </View>
  );
};

export default StoryMeta;
