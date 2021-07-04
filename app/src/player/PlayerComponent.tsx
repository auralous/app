import { PlatformName } from "@auralous/api";
import { usePlaybackCurrentContext } from "@auralous/player";
import { FC, useEffect, useMemo, useState } from "react";
import PlayerSpotify from "./PlayerSpotify";
import PlayerView from "./PlayerView";
import PlayerYoutube from "./PlayerYoutube";
import usePlaybackAuthentication from "./usePlaybackAuthentication";

const PlayerComponent: FC = () => {
  const { playingPlatform } = usePlaybackAuthentication();

  const currentContext = usePlaybackCurrentContext();

  // This is to avoid loading player sdk before actually needed
  const [hasPlayed, setHasPlayed] = useState(false);
  useEffect(() => {
    if (currentContext) setHasPlayed(true);
  }, [currentContext]);

  const DynamicPlayer = useMemo(() => {
    if (!playingPlatform || !hasPlayed) return null;
    if (playingPlatform === PlatformName.Youtube) return PlayerYoutube;
    return PlayerSpotify;
  }, [playingPlatform, hasPlayed]);

  return (
    <>
      {DynamicPlayer && <DynamicPlayer />}
      <PlayerView />
    </>
  );
};

export default PlayerComponent;
