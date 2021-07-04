import { PlatformName, useCrossTracksQuery } from "@auralous/api";
import player, {
  PlaybackContext,
  PlaybackCurrentContext,
} from "@auralous/player";
import { FC, useEffect, useMemo, useState } from "react";
import { usePlaybackContextProvider } from "./PlaybackContextProvider";
import usePlaybackAuthentication from "./usePlaybackAuthentication";
import { useTrackColor } from "./useTrackColor";

export const PlayerProvider: FC = ({ children }) => {
  const [playbackCurrentContext, setContextSelector] =
    useState<PlaybackCurrentContext | null>(null);

  useEffect(() => {
    // Every time an intent is sent, set __wasPlaying = true
    player.__wasPlaying = true;
  }, [playbackCurrentContext]);

  useEffect(() => {
    player.on("context", setContextSelector);
    return () => player.off("context", setContextSelector);
  }, []);

  const playbackProvided = usePlaybackContextProvider(playbackCurrentContext);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    player.on("playing", onPlay);
    player.on("paused", onPause);
    return () => {
      player.off("playing", onPlay);
      player.off("paused", onPause);
    };
  }, []);

  const { playingPlatform } = usePlaybackAuthentication();

  // Get track data based on preferred playingPlatform
  const [
    {
      data: dataCrossTracks,
      fetching: fetchingCrossTracks,
      stale: staleCrossTracks,
    },
  ] = useCrossTracksQuery({
    variables: { id: playbackProvided?.trackId || "" },
    pause: !playbackProvided?.trackId,
  });

  const playingTrackId = useMemo(() => {
    const crossTracks =
      (!staleCrossTracks && dataCrossTracks?.crossTracks) || null;

    // Use playingPlatform or fallback to YouTube as preferred platform
    const platform = playingPlatform || PlatformName.Youtube;

    // If source track id is the same as preferred, use as it
    if (playbackProvided?.trackId?.split(":")[0] === platform)
      return playbackProvided?.trackId;

    const externalId = crossTracks?.[platform];
    if (!externalId) return null;
    return `${platform}:${externalId}`;
  }, [
    dataCrossTracks,
    staleCrossTracks,
    playingPlatform,
    playbackProvided?.trackId,
  ]);

  // Control the player using playerPlaying

  useEffect(() => {
    const handlePlayerChange = () => {
      player.off("play", handlePlayerChange);
      player.playByExternalId(playingTrackId?.split(":")[1] || null);
    };
    // If the user paused the track before playerPlaying change,
    // delay the switch until they press play again to avoid
    // unexpected play

    if (player.__wasPlaying) {
      handlePlayerChange();
    } else {
      player.on("play", handlePlayerChange);
      return () => player.off("play", handlePlayerChange);
    }
  }, [playingTrackId]);

  // Combine fetching states
  const fetching = Boolean(playbackProvided?.fetching || fetchingCrossTracks);

  // Colors for theme
  const color = useTrackColor(playingTrackId);

  return (
    <PlaybackContext.Provider
      value={{
        playbackCurrentContext,
        trackId: playingTrackId,
        nextItems: playbackProvided?.nextItems || [],
        color,
        fetching,
        isPlaying,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};
