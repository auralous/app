import { QueueItem } from "@auralous/api";
import {
  Button,
  Header,
  IconChevronLeft,
  makeStyles,
  SongSelector,
} from "@auralous/ui";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BackHandler, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface QueueAdderProps {
  visible: boolean;
  onClose(): void;
  items: QueueItem[];
  onAddTracks: (trackIds: string[]) => void;
  onRemoveTracks: (trackIds: string[]) => void;
}

const useStyles = makeStyles((theme) => ({
  sav: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  content: {
    flex: 1,
  },
}));

const QueueAdderContent = gestureHandlerRootHOC(
  ({
    onClose,
    items,
    onAddTracks,
    onRemoveTracks,
  }: Omit<QueueAdderProps, "visible">) => {
    const { t } = useTranslation();
    const selectedTracks = useMemo(
      () => items.map((item) => item.trackId),
      [items]
    );

    const styles = useStyles();

    return (
      <SafeAreaView style={styles.sav}>
        <Header
          left={
            <Button
              icon={<IconChevronLeft width={24} height={24} />}
              onPress={onClose}
              accessibilityLabel={t("common.navigation.go_back")}
            />
          }
          title={t("queue.add_songs")}
        />
        <View style={styles.content}>
          <SongSelector
            addTracks={onAddTracks}
            removeTracks={onRemoveTracks}
            selectedTracks={selectedTracks}
          />
        </View>
      </SafeAreaView>
    );
  }
);

const snapPoints = ["100%"];

export const QueueAdder: FC<QueueAdderProps> = (props) => {
  const ref = useRef<BottomSheetModal>(null);
  useEffect(() => {
    if (props.visible) {
      ref.current?.present();
      const onBackPress = () => {
        props.onClose();
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    } else {
      ref.current?.dismiss();
    }
  });
  const onChange = useCallback(
    (index: number) => index === -1 && props.onClose(),
    [props]
  );

  return (
    <BottomSheetModal
      stackBehavior="push"
      onChange={onChange}
      ref={ref}
      handleComponent={null}
      snapPoints={snapPoints}
    >
      <QueueAdderContent {...props} />
    </BottomSheetModal>
  );
};
