import { GradientButton } from "@/components/Button";
import {
  Story,
  useNowPlayingQuery,
  useStoryUsersQuery,
  useTrackQuery,
} from "@auralous/api";
import player, { PlaybackContextType } from "@auralous/player";
import {
  IconUser,
  makeStyles,
  Size,
  Text,
  TrackItem,
  useColors,
} from "@auralous/ui";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import StoryMeta from "./StoryMeta";

const useStyles = makeStyles((theme) => ({
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 9999,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    flexDirection: "row",
  },
}));

const styles = StyleSheet.create({
  textLive: {
    textTransform: "uppercase",
  },
  buttons: {
    padding: Size[1],
    flexDirection: "row",
    justifyContent: "center",
  },
  content: {
    padding: Size[3],
  },
  track: {
    padding: Size[1],
    marginTop: Size[1],
  },
});

const StoryLiveContent: FC<{ story: Story }> = ({ story }) => {
  const dstyles = useStyles();
  const colors = useColors();

  const { t } = useTranslation();

  // FIXME: create more lightweight queries like useStoryUsersCount()
  const [{ data: dataStoryUsers }] = useStoryUsersQuery({
    variables: {
      id: story.id,
    },
  });

  const joinLive = useCallback(() => {
    player.playContext({
      id: story.id,
      type: PlaybackContextType.Story,
      shuffle: false,
    });
  }, [story]);

  const [{ data: dataNowPlaying }] = useNowPlayingQuery({
    variables: { id: story.id },
  });
  const [{ data: dataTrack, fetching: fetchingTrack }] = useTrackQuery({
    variables: { id: dataNowPlaying?.nowPlaying?.currentTrack?.trackId || "" },
    pause: !dataNowPlaying?.nowPlaying,
  });

  return (
    <>
      <StoryMeta
        story={story}
        tagElement={
          <View style={dstyles.tag}>
            <Text bold size="sm" style={styles.textLive}>
              {t("common.status.live")}{" "}
            </Text>
            <Text size="sm">
              {t("story.title")} • {dataStoryUsers?.storyUsers?.length || 0}
            </Text>
            <IconUser color={colors.primaryText} width={12} height={12} />
          </View>
        }
      />
      <View style={styles.buttons}>
        <GradientButton onPress={joinLive}>
          {t("story.join_live")}
        </GradientButton>
      </View>
      <View style={styles.content}>
        <Text bold>{t("now_playing.title")}</Text>
        <View style={styles.track}>
          {dataNowPlaying?.nowPlaying?.currentTrack && (
            <TrackItem
              track={dataTrack?.track || null}
              fetching={fetchingTrack}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default StoryLiveContent;
