import { Maybe, Track } from "@auralous/api";
import type { Player } from "@auralous/player";
import { Text } from "@auralous/ui/components/Typography";
import { makeStyles, Size } from "@auralous/ui/styles";
import { msToHMS } from "@auralous/ui/utils";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  root: {
    height: Size[1],
    backgroundColor: "rgba(255,255,255,.1)",
    borderRadius: 9999,
    marginTop: 20,
    marginBottom: Size[4],
  },
  indicator: {
    position: "absolute",
    left: 0,
    top: 0,
    height: Size[1],
    backgroundColor: "white",
    borderRadius: 9999,
  },
  texts: {
    position: "absolute",
    top: Size[2],
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  rootLive: {
    marginTop: 20,
    marginBottom: Size[4],
    alignItems: "center",
  },
});

const useStyles = makeStyles((theme) => ({
  live: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: Size[3],
    paddingVertical: 3,
    borderRadius: 9999,
  },
  liveText: { color: theme.colors.primaryText, textTransform: "uppercase" },
}));

const PlayerViewProgressOnDemand: FC<{
  track: Maybe<Track> | undefined;
  player: Player;
}> = ({ player, track }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const onTime = (ms: number) => setCurrent(ms);
    player.on("time", onTime);
    return () => player.off("time", onTime);
  }, [player]);

  useEffect(() => {
    setCurrent(0);
  }, [track]);

  const duration = track?.duration || 0;
  const progressPerc = duration && `${(current / duration) * 100}%`;

  const parsedDuration = msToHMS(duration, true);
  const parsedCurrent = msToHMS(current, true);

  return (
    <View style={styles.root}>
      <View style={[styles.indicator, { width: progressPerc }]} />
      <View style={styles.texts}>
        <Text size="sm" color="textTertiary">
          {parsedCurrent[1]}:{parsedCurrent[0]}
        </Text>
        <Text size="sm" color="textTertiary">
          {parsedDuration[1]}:{parsedDuration[0]}
        </Text>
      </View>
    </View>
  );
};

const PlayerViewProgressLive: FC = () => {
  const { t } = useTranslation();
  const dstyle = useStyles();
  return (
    <View style={styles.rootLive}>
      <View style={dstyle.live}>
        <Text size="xs" style={dstyle.liveText}>
          {t("common.status.live")}
        </Text>
      </View>
    </View>
  );
};

const PlayerViewProgress: FC<{
  track: Maybe<Track> | undefined;
  player: Player;
  isLive: boolean;
}> = ({ track, player, isLive }) => {
  if (isLive) return <PlayerViewProgressLive />;
  return <PlayerViewProgressOnDemand track={track} player={player} />;
};

export default PlayerViewProgress;
