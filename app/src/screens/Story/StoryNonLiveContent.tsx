import { LoadingScreen } from "@/components/Loading";
import { Story, Track, useStoryTracksQuery } from "@auralous/api";
import player, { PlaybackContextType } from "@auralous/player";
import { Button, Size, Spacer, Text, TrackItem } from "@auralous/ui";
import { useNavigation } from "@react-navigation/native";
import { createContext, FC, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouteName } from "../types";
import StoryMeta from "./StoryMeta";

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  tagText: {
    color: "#333333",
  },
  list: {
    padding: Size[3],
  },
  item: {
    padding: Size[1],
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    padding: Size[1],
    flexDirection: "row",
    justifyContent: "center",
  },
});

const StoryIdContext = createContext("");

const StoryTrackItem: FC<{
  track: Track;
  index: number;
}> = ({ track, index }) => {
  const storyId = useContext(StoryIdContext);
  const onPress = useCallback(
    () =>
      player.playContext({
        id: storyId,
        initialIndex: index,
        type: PlaybackContextType.Story,
        shuffle: false,
      }),
    [storyId, index]
  );
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <TrackItem track={track} key={index} />
    </TouchableOpacity>
  );
};

const ItemSeparatorComponent: FC = () => <Spacer y={3} />;

const renderItem: ListRenderItem<Track> = (params) => (
  <StoryTrackItem key={params.index} track={params.item} index={params.index} />
);

const StoryNonLiveContent: FC<{ story: Story }> = ({ story }) => {
  const { t } = useTranslation();

  const [{ data, fetching }] = useStoryTracksQuery({
    variables: { id: story.id },
  });

  const shufflePlay = useCallback(
    () =>
      player.playContext({
        id: story.id,
        type: PlaybackContextType.Story,
        shuffle: true,
      }),
    [story]
  );

  const navigation = useNavigation();

  const quickPlay = useCallback(() => {
    navigation.navigate(RouteName.NewQuickShare, {
      story: {
        ...story,
        // erase createdAt since Date object breaks navigation
        createdAt: null,
      },
    });
  }, [story, navigation]);

  return (
    <>
      <StoryMeta
        story={story}
        tagElement={
          <View style={styles.tag}>
            <Text size="sm" style={styles.tagText}>
              {t("story.title")} •{" "}
              {data?.storyTracks
                ? t("playlist.x_song", { count: data.storyTracks.length })
                : ""}
            </Text>
          </View>
        }
      />
      <View style={styles.buttons}>
        <Button onPress={shufflePlay}>{t("player.shuffle_play")}</Button>
        <Spacer x={2} />
        <Button onPress={quickPlay} variant="primary">
          {t("new.quick_share.title")}
        </Button>
      </View>
      <StoryIdContext.Provider value={story.id}>
        <FlatList
          contentContainerStyle={styles.list}
          ListEmptyComponent={fetching ? <LoadingScreen /> : null}
          data={data?.storyTracks || []}
          renderItem={renderItem}
          removeClippedSubviews
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </StoryIdContext.Provider>
    </>
  );
};

export default StoryNonLiveContent;
