import type { Player } from "@auralous/player";
import { PlaybackState } from "@auralous/player";
import {
  IconPause,
  IconPlay,
  IconSkipBack,
  IconSkipForward,
} from "@auralous/ui/assets";
import { Spacer } from "@auralous/ui/components/Spacer";
import { makeStyles, Size, useColors } from "@auralous/ui/styles";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    paddingVertical: Size[2],
    paddingHorizontal: Size[1],
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backPrev: {
    width: Size[10],
    height: Size[10],
    justifyContent: "center",
    alignItems: "center",
  },
});

const useStyles = makeStyles((theme) => ({
  playPause: {
    width: Size[16],
    height: Size[16],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: theme.colors.textTertiary,
  },
}));

const PlayerViewControl: FC<{
  control: Pick<PlaybackState, "isPlaying">;
  trackId: string | null;
  player: Player;
}> = ({ trackId, control, player }) => {
  const { t } = useTranslation();

  const colors = useColors();

  const dstyles = useStyles();

  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.backPrev}
        onPress={() => player.skipBackward()}
        accessibilityLabel={t("player.skip_backward")}
      >
        <IconSkipBack width={Size[8]} height={Size[8]} fill={colors.text} />
      </TouchableOpacity>
      <Spacer x={8} />
      <View style={trackId ? undefined : { opacity: 0.5 }}>
        <TouchableOpacity
          onPress={() => (control.isPlaying ? player.pause() : player.play())}
          style={dstyles.playPause}
          accessibilityLabel={
            control.isPlaying ? t("player.pause") : t("player.play")
          }
          disabled={!trackId}
        >
          {control.isPlaying ? (
            <IconPause width={Size[10]} height={Size[10]} fill={colors.text} />
          ) : (
            <IconPlay width={Size[10]} height={Size[10]} fill={colors.text} />
          )}
        </TouchableOpacity>
      </View>
      <Spacer x={8} />
      <TouchableOpacity
        style={styles.backPrev}
        onPress={() => player.skipForward()}
        accessibilityLabel={t("player.skip_forward")}
      >
        <IconSkipForward width={Size[8]} height={Size[8]} fill={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerViewControl;
