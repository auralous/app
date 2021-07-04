import { Maybe, Track } from "@auralous/api";
import { IconMenu } from "@auralous/ui/assets";
import { Checkbox } from "@auralous/ui/components/Checkbox";
import { Size } from "@auralous/ui/styles";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TrackItem from "./TrackItem";

const styles = StyleSheet.create({
  root: {
    width: "100%",
    padding: Size[1],
    flexDirection: "row",
    alignItems: "center",
  },
  track: {
    flex: 1,
    paddingHorizontal: Size[2],
    overflow: "hidden",
  },
  check: {
    height: Size[12],
    paddingHorizontal: Size[2],
    justifyContent: "center",
  },
  drag: {
    width: Size[12],
    height: Size[12],
    alignItems: "center",
    justifyContent: "center",
  },
});

interface QueueTrackItemProps {
  track: Maybe<Track>;
  fetching?: boolean;
  drag(): void;
  checked: boolean;
  onToggle(checked: boolean): void;
}

const QueueTrackItem: FC<QueueTrackItemProps> = ({
  track,
  fetching,
  drag,
  checked,
  onToggle,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.check}>
        <Checkbox checked={checked} onValueChange={onToggle} />
      </View>
      <View style={styles.track}>
        <TrackItem track={track} fetching={fetching} />
      </View>
      <TouchableWithoutFeedback onPressIn={drag} style={styles.drag}>
        <IconMenu />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default QueueTrackItem;
