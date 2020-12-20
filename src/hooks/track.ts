import { useMemo } from "react";
import { Track, useCrossTracksQuery, useTrackQuery } from "~/graphql/gql.gen";

export const useCrossTracks = (id?: string) => {
  const [
    {
      data: { crossTracks } = { crossTracks: undefined },
      fetching: fetchingCross,
    },
  ] = useCrossTracksQuery({
    variables: { id: id || "" },
    pause: !id,
  });

  const [
    { data: { track: youtube } = { track: undefined }, fetching: fetchingYT },
  ] = useTrackQuery({
    variables: { id: `youtube:${crossTracks?.youtube}` },
    pause: !crossTracks?.youtube,
  });

  const [
    { data: { track: spotify } = { track: undefined }, fetching: fetchingS },
  ] = useTrackQuery({
    variables: { id: `spotify:${crossTracks?.spotify}` },
    pause: !crossTracks?.spotify,
  });

  const fetching = fetchingCross || fetchingYT || fetchingS;

  // TODO: Investigate while this returns differently on render
  const data = useMemo<
    | {
        id: string;
        original: Track | null | undefined;
        youtube: Track | null | undefined;
        spotify: Track | null | undefined;
      }
    | undefined
  >(() => {
    if (!id || !crossTracks || fetching) return undefined;

    // Find the original tracks among crossTracks
    let original: Track | null = null;
    if (spotify?.id === crossTracks.id) original = spotify;
    else if (youtube?.id === crossTracks.id) original = youtube;

    return { id, original, youtube, spotify };
  }, [id, fetching, crossTracks, youtube, spotify]);

  return [data, { fetching }] as const;
};
