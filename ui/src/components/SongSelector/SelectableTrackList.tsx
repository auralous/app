import { Track } from "@auralous/api";
import { LoadingBlock } from "@auralous/ui/components/Loading";
import { Spacer } from "@auralous/ui/components/Spacer";
import { FC } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import SearchEmpty from "./SearchEmpty";
import SelectableTrackListItem from "./SelectableTrackListItem";

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  full: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ItemSeparatorComponent: FC = () => <Spacer y={3} />;

const renderItem: ListRenderItem<Track | string> = ({ item }) => {
  const trackId = typeof item === "string" ? item : item.id;
  return <SelectableTrackListItem key={trackId} trackId={trackId} />;
};

const SelectableTrackList: FC<{
  fetching: boolean;
  data: (Track | string)[];
}> = ({ fetching, data }) => {
  if (fetching) {
    return (
      <View style={styles.full}>
        <LoadingBlock />
      </View>
    );
  }

  return (
    <>
      {data.length === 0 && <SearchEmpty />}
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        removeClippedSubviews
      />
    </>
  );
};

export default SelectableTrackList;
