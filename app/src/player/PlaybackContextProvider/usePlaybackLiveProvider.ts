import {
  useNowPlayingQuery,
  useNowPlayingSkipMutation,
  useOnNowPlayingUpdatedSubscription,
  useQueueAddMutation,
  useQueueQuery,
  useQueueRemoveMutation,
  useQueueReorderMutation,
  useQueueToTopMutation,
  useQueueUpdatedSubscription,
} from "@auralous/api";
import player, {
  PlaybackContextProvided,
  PlaybackCurrentContext,
} from "@auralous/player";
import { useEffect, useMemo } from "react";

const usePlaybackLiveProvider = (
  active: boolean,
  playbackContext: PlaybackCurrentContext | null
): PlaybackContextProvided => {
  const [{ data: { nowPlaying } = { nowPlaying: undefined }, fetching }] =
    useNowPlayingQuery({
      variables: { id: playbackContext?.id || "" },
      pause: !active,
      requestPolicy: "cache-and-network",
    });

  useOnNowPlayingUpdatedSubscription({
    variables: { id: playbackContext?.id || "" },
    pause: !active,
  });

  const [{ data }] = useQueueQuery({
    variables: {
      id: playbackContext?.id || "",
    },
    pause: !active,
  });

  const queue = useMemo(
    () => (active ? data?.queue : undefined),
    [data, active]
  );

  useQueueUpdatedSubscription({
    variables: { id: queue?.id || "" },
    pause: !queue,
  });
  const [, queueRemove] = useQueueRemoveMutation();
  const [, queueReorder] = useQueueReorderMutation();
  const [, queueToTop] = useQueueToTopMutation();
  const [, queueAdd] = useQueueAddMutation();

  useEffect(() => {
    // We hook into `play` event to trigger
    // seeking to live position on resume
    if (!nowPlaying || !active) return undefined;
    let waitPlayTimeout: ReturnType<typeof setTimeout>;
    const onPlay = () => {
      const currentTrack = nowPlaying.currentTrack;
      if (!currentTrack) return;
      // Resume to current live position
      // Delay a bit for player to load
      waitPlayTimeout = setTimeout(() => {
        player.seek(Date.now() - currentTrack.playedAt.getTime());
      }, 1000);
    };

    player.on("play", onPlay);
    return () => {
      clearTimeout(waitPlayTimeout);
      player.off("play", onPlay);
    };
  }, [active, nowPlaying]);

  const [{ fetching: fetchingSkip }, skipNowPlaying] =
    useNowPlayingSkipMutation();

  useEffect(() => {
    // Do not accept skipping while fetching
    if (fetchingSkip || !queue) return;
    const skipFn = () => skipNowPlaying({ id: queue.id });
    player.on("skip-forward", skipFn);
    return () => player.off("skip-forward", skipFn);
  }, [fetchingSkip, queue, skipNowPlaying]);

  useEffect(() => {
    if (!queue) return;
    const id = queue.id;
    const onReorder = (from: number, to: number) => {
      queueReorder({
        id,
        position: from,
        insertPosition: to,
      });
    };
    const onRemove = (uids: string[]) => {
      queueRemove({
        id,
        uids,
      });
    };
    const onPlayNext = (uids: string[]) => {
      queueToTop({
        id,
        uids,
      });
    };
    const onAdd = (trackIds: string[]) => {
      queueAdd({
        id,
        tracks: trackIds,
      });
    };
    player.on("queue-reorder", onReorder);
    player.on("queue-remove", onRemove);
    player.on("play-next", onPlayNext);
    player.on("queue-add", onAdd);
    return () => {
      player.off("queue-reorder", onReorder);
      player.off("queue-remove", onRemove);
      player.off("play-next", onPlayNext);
      player.off("queue-add", onAdd);
    };
  }, [queue, skipNowPlaying, queueReorder, queueRemove, queueToTop, queueAdd]);

  return useMemo(
    () => ({
      nextItems: queue?.items || [],
      trackId: nowPlaying?.currentTrack?.trackId || null,
      fetching,
    }),
    [queue, nowPlaying?.currentTrack?.trackId, fetching]
  );
};

export default usePlaybackLiveProvider;
