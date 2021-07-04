import { useStoriesQuery } from "@auralous/api";
import { Size, StoryItem } from "@auralous/ui";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouteName } from "../types";
import scrollStyles from "./ScrollView.styles";

const styles = StyleSheet.create({
  storyItemWrapper: {
    marginRight: Size[4],
  },
});

const RecentStories: FC = () => {
  const [{ data }] = useStoriesQuery({
    variables: { id: "PUBLIC", limit: 8 },
  });

  const navigation = useNavigation();

  return (
    <ScrollView
      style={scrollStyles.scroll}
      contentContainerStyle={scrollStyles.scrollContent}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data?.stories?.map((story) => (
        <TouchableOpacity
          key={story.id}
          style={styles.storyItemWrapper}
          onPress={() => navigation.navigate(RouteName.Story, { id: story.id })}
        >
          <StoryItem story={story} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RecentStories;
