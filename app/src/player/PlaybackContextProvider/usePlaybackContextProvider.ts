/**
 * PlaybackContextProvider
 * We have two types of playback.
 *
 * A live playback, which includes:
 *   - Live Story
 *   - Radio
 * A onDemand playback, which includes:
 *   - Offline Story
 *   - Playlist
 *
 * Depending on playbackCurrentContext, we can choose between them
 */

import {
  PlaybackContextProvided,
  PlaybackCurrentContext,
} from "@auralous/player";
import { usePlaybackContextMeta } from "./usePlaybackContextMeta";
import usePlaybackLiveProvider from "./usePlaybackLiveProvider";
import usePlaybackOnDemandProvider from "./usePlaybackOnDemandProvider";

const usePlaybackContextProvider = (
  playbackCurrentContext: PlaybackCurrentContext | null
): PlaybackContextProvided | null => {
  const contextMeta = usePlaybackContextMeta(playbackCurrentContext);

  const live = usePlaybackLiveProvider(
    !!contextMeta?.isLive,
    playbackCurrentContext
  );

  const onDemand = usePlaybackOnDemandProvider(
    !contextMeta?.isLive,
    playbackCurrentContext
  );

  if (!contextMeta) return null;
  if (contextMeta.isLive) return live;
  return onDemand;
};

export default usePlaybackContextProvider;
