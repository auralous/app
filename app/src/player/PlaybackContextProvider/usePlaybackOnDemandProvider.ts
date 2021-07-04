import { useMe } from "@/gql/hooks";
import {
  PlaylistTracksDocument,
  PlaylistTracksQuery,
  PlaylistTracksQueryVariables,
  QueueItem,
  StoryTracksDocument,
  StoryTracksQuery,
  StoryTracksQueryVariables,
  Track,
} from "@auralous/api";
import player, {
  PlaybackContextProvided,
  PlaybackContextType,
  PlaybackCurrentContext,
} from "@auralous/player";
import { shuffle } from "@auralous/ui";
import { useEffect, useMemo, useState } from "react";
import { useClient } from "urql";

const usePlaybackOnDemandProvider = (
  active: boolean,
  contextData: PlaybackCurrentContext | null
): PlaybackContextProvided => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const client = useClient();
  useEffect(() => {
    let stale = false;
    if (!contextData) setQueueItems([]);
    else {
      let trackPromises: Promise<Track[] | null | undefined>;
      if (contextData.type === PlaybackContextType.Story) {
        trackPromises = client
          .query<StoryTracksQuery, StoryTracksQueryVariables>(
            StoryTracksDocument,
            { id: contextData.id }
          )
          .toPromise()
          .then((result) => result.data?.storyTracks);
      } else {
        trackPromises = client
          .query<PlaylistTracksQuery, PlaylistTracksQueryVariables>(
            PlaylistTracksDocument,
            { id: contextData.id }
          )
          .toPromise()
          .then((result) => result.data?.playlistTracks);
      }
      trackPromises.then((tracks) => {
        if (stale) return;
        if (!tracks) return setQueueItems([]);
        if (contextData.shuffle) {
          tracks = shuffle([...tracks]);
        }
        setPlayingIndex(contextData.initialIndex ?? 0);
        setQueueItems(
          tracks.map((track, index) => ({
            creatorId: "",
            trackId: track.id,
            uid: `${index}${track.id}`,
            __typename: "QueueItem",
          }))
        );
        player.seek(0);
      });
    }
    return () => {
      stale = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextData]);

  const [playingIndex, setPlayingIndex] = useState(0);

  // TODO: This takes a lot of time
  const nextItems = useMemo(() => {
    return queueItems.slice(playingIndex + 1);
  }, [queueItems, playingIndex]);

  const me = useMe();

  useEffect(() => {
    if (!active) return;
    const skipForward = () => {
      setPlayingIndex((prevPlayingIndex) => {
        if (prevPlayingIndex === queueItems.length - 1) {
          // Edge case: if this is the only queue item, seek to beginning of track
          if (queueItems.length === 0) player.seek(0);
          // reach end of queue, go back to first track
          return 0;
        }
        return prevPlayingIndex + 1;
      });
    };
    const skipBackward = () => {
      setPlayingIndex((prevPlayingIndex) => {
        if (prevPlayingIndex <= 0) {
          // Edge case: if this is the only queue item, seek to beginning of track
          if (queueItems.length === 0) player.seek(0);
          // at first item, go to the last track
          return queueItems.length - 1;
        } else {
          return prevPlayingIndex - 1;
        }
      });
    };

    const onEnded = () =>
      setPlayingIndex((prevPlayingIndex) => {
        if (prevPlayingIndex >= queueItems.length - 1) {
          // reach the end of queue, pause it
          player.pause();
          return prevPlayingIndex;
        } else {
          return prevPlayingIndex + 1;
        }
      });

    player.on("skip-forward", skipForward);
    player.on("skip-backward", skipBackward);
    player.on("ended", onEnded);
    return () => {
      player.off("ended", onEnded);
      player.off("skip-forward", skipForward);
      player.off("skip-backward", skipBackward);
    };
  }, [active, queueItems.length]);

  useEffect(() => {
    if (!active) return;
    player.on("play-index", setPlayingIndex);
    const onRemove = (uids: string[]) => {
      setQueueItems((localQueueItems) =>
        localQueueItems.filter((item) => !uids.includes(item.uid))
      );
    };
    player.on("queue-remove", onRemove);
    return () => {
      player.off("play-index", setPlayingIndex);
      player.off("queue-remove", onRemove);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const onReorder = (from: number, to: number, data: QueueItem[]) => {
      // data is the array of only nextItems,
      // we have to merge it with the played tracks
      setQueueItems((prevQueueItems) => [
        ...prevQueueItems.slice(0, playingIndex + 1),
        ...data,
      ]);
    };

    const onPlayNext = (uids: string[]) => {
      setQueueItems((prevQueueItems) => {
        const toTopItems: QueueItem[] = [];
        const afterQueueItems = prevQueueItems
          .slice(playingIndex + 1)
          .filter((item) => {
            if (uids.includes(item.uid)) {
              toTopItems.push(item);
              return false;
            }
            return true;
          });
        return [
          ...prevQueueItems.slice(0, playingIndex + 1),
          ...toTopItems,
          ...afterQueueItems,
        ];
      });
    };
    const onAdd = (trackIds: string[]) => {
      setQueueItems((prevQueueItems) => [
        ...prevQueueItems,
        ...trackIds.map((trackId) => ({
          uid: Math.random().toString(36).substr(2, 6), // random id
          trackId,
          creatorId: me?.user.id || "",
          __typename: "QueueItem" as const,
        })),
      ]);
    };

    player.on("queue-reorder", onReorder);
    player.on("play-next", onPlayNext);
    player.on("queue-add", onAdd);
    return () => {
      player.off("queue-reorder", onReorder);
      player.off("play-next", onPlayNext);
      player.off("queue-add", onAdd);
    };
  }, [active, me?.user.id, playingIndex]);

  return useMemo(
    () => ({
      nextItems,
      trackId: queueItems[playingIndex]?.trackId || null,
      fetching: false,
    }),
    [nextItems, queueItems, playingIndex]
  );
};

export default usePlaybackOnDemandProvider;
