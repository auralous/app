import React, { useMemo, useState } from "react";
import { QueryConfig } from "react-query";
import { SvgChevronLeft } from "~/assets/svg";
import { default as TrackAdderResults } from "./TrackAdderResults";
import { useMyPlaylistsQuery } from "~/hooks/playlist";
import { useI18n } from "~/i18n/index";
import { Playlist } from "~/types/index";
import { TrackAdderCallbackFn } from "./types";

const PlaylistItem: React.FC<{
  playlist: Playlist;
  handleSelect: (pl: Playlist) => void;
}> = ({ playlist, handleSelect }) => {
  const { t } = useI18n();

  return (
    <div
      role="button"
      title={t("track.adder.playlist.selectSongFrom", {
        title: playlist.title,
      })}
      onKeyDown={({ key }) => key === "Enter" && handleSelect(playlist)}
      tabIndex={0}
      className="btn rounded-none p-2 w-full justify-start font-normal bg-transparent hover:bg-background-secondary focus:bg-background-secondary"
      onClick={() => handleSelect(playlist)}
    >
      <img
        className="w-12 h-12 rounded-lg object-cover"
        src={playlist.image}
        alt={playlist.title}
      />
      <div className="ml-2 text-left">
        <p>{playlist.title}</p>
        <p className="text-foreground-secondary text-sm">
          {playlist.tracks.length} {t("common.tracks")}
        </p>
      </div>
    </div>
  );
};

const TrackAdderPlaylist: React.FC<{
  addedTracks: string[];
  callback: TrackAdderCallbackFn;
  queryConfig?: QueryConfig<Playlist[] | null, unknown>;
}> = ({ addedTracks, callback, queryConfig }) => {
  const { t } = useI18n();

  const { data: myPlaylists, isLoading } = useMyPlaylistsQuery(queryConfig);

  const [selectedPlaylist, setSelectedPlaylist] = useState<null | Playlist>(
    null
  );

  async function handleSelect(playlist: Playlist) {
    setSelectedPlaylist(playlist);
  }

  const queryResults = useMemo(
    () => selectedPlaylist?.tracks.map((trackId) => trackId) || null,
    [selectedPlaylist]
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="text-sm px-2 h-10 flex items-center font-bold">
        <button
          onClick={() => setSelectedPlaylist(null)}
          title="Select another playlist"
          className="btn btn-transparent p-1 inline mr-2"
          disabled={!selectedPlaylist}
        >
          <SvgChevronLeft width="24" height="24" />
        </button>
        {selectedPlaylist ? (
          <>
            <div className="inline-flex items-center">
              <img
                src={selectedPlaylist.image}
                alt={selectedPlaylist.title}
                className="w-6 h-6 mr-1 rounded"
              />
              {selectedPlaylist.title}
            </div>
          </>
        ) : (
          t("track.adder.playlist.selectOne")
        )}
      </div>
      {selectedPlaylist ? (
        <TrackAdderResults
          addedTracks={addedTracks}
          callback={callback}
          results={queryResults || []}
        />
      ) : (
        <div className="flex-1 h-0 overflow-auto">
          {isLoading && (
            <p className="px-2 py-6 text-center font-bold text-foreground-tertiary animate-pulse">
              {t("track.adder.playlist.loading")}
            </p>
          )}
          {myPlaylists?.map((playlist) => (
            // TODO: react-window
            <PlaylistItem
              key={playlist.id}
              playlist={playlist}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackAdderPlaylist;
