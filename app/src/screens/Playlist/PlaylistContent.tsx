import { LoadingScreen } from "@/components/Loading";
import { Playlist, Track, usePlaylistTracksQuery } from "@auralous/api";
import player, { PlaybackContextType } from "@auralous/player";
import { Size, Spacer, TrackItem } from "@auralous/ui";
import { createContext, FC, useCallback, useContext } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlaylistMeta from "./PlaylistMeta";

const styles = StyleSheet.create({
  list: {
    padding: Size[3],
  },
  listContent: {
    paddingBottom: Size[6],
  },
  item: {
    padding: Size[1],
    flexDirection: "row",
    alignItems: "center",
  },
});

const PlaylistIdContext = createContext("");

const PlaylistTrackItem: FC<{
  track: Track;
  index: number;
}> = ({ track, index }) => {
  const playlistId = useContext(PlaylistIdContext);
  const onPress = useCallback(
    () =>
      player.playContext({
        id: playlistId,
        initialIndex: index,
        type: PlaybackContextType.Playlist,
        shuffle: false,
      }),
    [playlistId, index]
  );
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <TrackItem track={track} key={index} />
    </TouchableOpacity>
  );
};

const renderItem: ListRenderItem<Track> = (params) => (
  <PlaylistTrackItem
    key={params.index}
    track={params.item}
    index={params.index}
  />
);

const ItemSeparatorComponent: FC = () => <Spacer y={3} />;

const PlaylistContent: FC<{ playlist: Playlist }> = ({ playlist }) => {
  const [{ data: dataPlaylist, fetching: fetchingTracks }] =
    usePlaylistTracksQuery({
      variables: {
        id: playlist.id,
      },
    });

  return (
    <PlaylistIdContext.Provider value={playlist.id}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={fetchingTracks ? <LoadingScreen /> : null}
        data={dataPlaylist?.playlistTracks || []}
        renderItem={renderItem}
        ListHeaderComponent={<PlaylistMeta playlist={playlist} />}
        removeClippedSubviews
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </PlaylistIdContext.Provider>
  );
};

export default PlaylistContent;
