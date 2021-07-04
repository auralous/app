import { useTrackQuery } from "@auralous/api";
import { IconCheck, IconPlus } from "@auralous/ui/assets";
import { TrackItem } from "@auralous/ui/components/Track";
import { Size } from "@auralous/ui/styles";
import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelectedTracks, useUpdateTracks } from "./Context";

const styles = StyleSheet.create({
  item: {
    padding: Size[1],
    flexDirection: "row",
    alignItems: "center",
  },
  itemContent: {
    flex: 1,
    paddingRight: Size[2],
    overflow: "hidden",
  },
  button: {
    width: Size[12],
    height: Size[12],
    alignItems: "center",
    justifyContent: "center",
  },
});

const SelectableTrackListItem = memo<{ trackId: string }>(
  function SelectableTrackListItem({ trackId }) {
    const [{ data, fetching }] = useTrackQuery({ variables: { id: trackId } });

    const selectedTracks = useSelectedTracks();
    const updateTracksActions = useUpdateTracks();

    const selected = useMemo(
      () => selectedTracks.indexOf(trackId) > -1,
      [trackId, selectedTracks]
    );

    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <TrackItem track={data?.track || null} fetching={fetching} />
        </View>
        {updateTracksActions && (
          <TouchableOpacity
            onPress={() =>
              !selected
                ? updateTracksActions.addTracks([trackId])
                : updateTracksActions.removeTracks([trackId])
            }
            style={styles.button}
          >
            {selected ? <IconCheck /> : <IconPlus />}
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

export default SelectableTrackListItem;
