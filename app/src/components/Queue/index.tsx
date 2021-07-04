import { Track } from "@auralous/api";
import { PlaybackState } from "@auralous/player";
import { Heading, IconX, makeStyles, Size } from "@auralous/ui";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BackHandler, StatusBar, StyleSheet, View } from "react-native";
import {
  gestureHandlerRootHOC,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MetaAndButton from "./MetaAndButton";
import QueueContent from "./QueueContent";

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: Size[4],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: Size[4],
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
}));

const snapPoints = ["100%"];

const QueueSheet: FC<{
  nextItems: PlaybackState["nextItems"];
  currentTrack: Track | null;
  onClose(): void;
}> = ({ onClose, nextItems, currentTrack }) => {
  const { t } = useTranslation();

  const dstyles = useStyles();

  useEffect(() => {
    const onBackPress = () => {
      onClose();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [onClose]);

  return (
    <View style={dstyles.root}>
      <View style={{ height: StatusBar.currentHeight }} />
      <View style={styles.header}>
        <Heading level={3}>{t("queue.title")}</Heading>
        <TouchableOpacity onPress={onClose}>
          <IconX width={Size[8]} height={Size[8]} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <QueueContent currentTrack={currentTrack} nextItems={nextItems} />
      </View>
    </View>
  );
};

const QueueSheetWithHoc = gestureHandlerRootHOC(QueueSheet);

export const QueueModal: FC<{
  nextItems: PlaybackState["nextItems"];
  currentTrack: Track | null;
}> = ({ nextItems, currentTrack }) => {
  const ref = useRef<BottomSheetModal>(null);

  return (
    <>
      <MetaAndButton
        nextItems={nextItems}
        onPress={() => ref.current?.present()}
      />
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        handleComponent={null}
        stackBehavior="push"
      >
        <QueueSheetWithHoc
          currentTrack={currentTrack}
          nextItems={nextItems}
          onClose={() => ref.current?.dismiss()}
        />
      </BottomSheetModal>
    </>
  );
};
