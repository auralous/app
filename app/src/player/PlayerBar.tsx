import { useTrackQuery } from "@auralous/api";
import player, {
  usePlaybackCurrentControl,
  usePlaybackTrackId,
} from "@auralous/player";
import { IconPause, IconPlay, Size, Text, useColors } from "@auralous/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    height: Size[16],
  },
  viewExpandTrigger: {
    flexDirection: "row",
    flex: 1,
  },
  image: {
    width: Size[16],
    height: Size[16],
    resizeMode: "cover",
  },
  meta: {
    paddingHorizontal: Size[4],
    paddingVertical: Size[2],
    justifyContent: "center",
    flex: 1,
  },
  button: {
    width: Size[16],
    height: Size[16],
    justifyContent: "center",
    alignItems: "center",
  },
});

const PlayerBar: FC = () => {
  const { t } = useTranslation();

  const isPlaying = usePlaybackCurrentControl();
  const trackId = usePlaybackTrackId();
  const playbackCurrentContext = usePlaybackCurrentControl();

  const [{ data }] = useTrackQuery({
    variables: { id: trackId || "" },
    pause: !trackId,
  });
  const track = data?.track;

  const colors = useColors();

  if (!playbackCurrentContext) return null;
  return (
    <View style={styles.root}>
      <Pressable
        style={styles.viewExpandTrigger}
        onPress={() => player.emit("__player_bar_pressed")}
      >
        <Image
          style={styles.image}
          source={
            track?.image
              ? { uri: track?.image }
              : require("@/assets/images/default_track.jpg")
          }
          defaultSource={require("@/assets/images/default_track.jpg")}
          accessibilityLabel={track?.title}
        />
        <View style={styles.meta}>
          <Text bold size="sm" numberOfLines={1}>
            {track?.title}
          </Text>
          <Text color="textSecondary" size="sm" numberOfLines={1}>
            {track?.artists.map((artist) => artist.name).join(", ")}
          </Text>
        </View>
      </Pressable>
      <View style={trackId ? undefined : { opacity: 0.5 }}>
        <TouchableOpacity
          onPress={() => (isPlaying ? player.pause() : player.play())}
          style={styles.button}
          accessibilityLabel={isPlaying ? t("player.pause") : t("player.play")}
          disabled={!trackId}
        >
          {isPlaying ? (
            <IconPause fill={colors.text} />
          ) : (
            <IconPlay fill={colors.text} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerBar;
