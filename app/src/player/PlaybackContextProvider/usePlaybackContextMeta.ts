import { usePlaylistQuery, useStoryQuery } from "@auralous/api";
import {
  PlaybackContextMeta,
  PlaybackContextType,
  PlaybackCurrentContext,
} from "@auralous/player";

export const usePlaybackContextMeta = (
  playbackCurrentContext: PlaybackCurrentContext | null
): PlaybackContextMeta | null => {
  const [{ data: dataStory }] = useStoryQuery({
    variables: { id: playbackCurrentContext?.id || "" },
    pause: playbackCurrentContext?.type !== PlaybackContextType.Story,
  });
  const [{ data: dataPlaylist }] = usePlaylistQuery({
    variables: { id: playbackCurrentContext?.id || "" },
    pause: playbackCurrentContext?.type !== PlaybackContextType.Playlist,
  });

  if (!playbackCurrentContext) return null;

  if (playbackCurrentContext?.type === PlaybackContextType.Story)
    return {
      id: playbackCurrentContext.id,
      contextDescription:
        dataStory?.story?.text || dataStory?.story?.creator.username || "",
      contextCollaborators: dataStory?.story?.queueable,
      contextOwner: dataStory?.story?.creatorId,
      imageUrl: dataStory?.story?.image,
      isLive: dataStory?.story?.isLive || false,
      type: PlaybackContextType.Story,
    };
  if (playbackCurrentContext?.type === PlaybackContextType.Playlist)
    return {
      id: playbackCurrentContext.id,
      contextDescription: dataPlaylist?.playlist?.name || "",
      imageUrl: dataPlaylist?.playlist?.image,
      isLive: false,
      type: PlaybackContextType.Playlist,
    };
  return null;
};
