import { Playlist } from "@auralous/api";
import { LoadingBlock } from "@auralous/ui/components/Loading";
import { PlaylistListItem } from "@auralous/ui/components/Playlist";
import { Size } from "@auralous/ui/styles";
import { FC, useCallback } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Spacer } from "../Spacer";
import SearchEmpty from "./SearchEmpty";

interface SelectablePlaylistListProps {
  fetching: boolean;
  playlists: Playlist[];
  onSelect(playlist: Playlist): void;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  item: {
    padding: Size[1],
  },
  full: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ItemSeparatorComponent = () => <Spacer y={3} />;

const SelectablePlaylistList: FC<SelectablePlaylistListProps> = ({
  fetching,
  playlists,
  onSelect,
}) => {
  const renderItem = useCallback<ListRenderItem<Playlist>>(
    ({ item }) => (
      <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
        <PlaylistListItem playlist={item} />
      </TouchableOpacity>
    ),
    [onSelect]
  );

  if (fetching)
    return (
      <View style={styles.full}>
        <LoadingBlock />
      </View>
    );

  return (
    <>
      {playlists.length === 0 && <SearchEmpty />}
      <FlatList
        style={styles.root}
        data={playlists}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        removeClippedSubviews
      />
    </>
  );
};

export default SelectablePlaylistList;
