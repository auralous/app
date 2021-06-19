import { useTrackQuery } from "@auralous/api";
import {
  BottomSheetCustomBackground,
  Button,
  Font,
  IconChevronDown,
  IconChevronUp,
  QueueTrackItem,
  Size,
  Text,
  TextButton,
  useColors,
} from "@auralous/ui";
import BottomSheet from "@gorhom/bottom-sheet";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { TouchableOpacity } from "react-native-gesture-handler";

const cascadedHeight = 112;

const styles = StyleSheet.create({
  placeholder: {
    height: cascadedHeight,
  },
  root: {
    paddingHorizontal: Size[3],
    paddingTop: Size[4],
    paddingBottom: Size[16],
  },
  metaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Size[4],
    paddingHorizontal: Size[1],
  },
  flexFill: {
    flex: 1,
  },
  toggleExpand: {
    padding: Size[1],
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingHorizontal: Size[3],
    height: Size[16],
    justifyContent: "center",
    width: "100%",
  },
  selectOpts: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Size[2],
  },
  selectOptsText: {
    fontFamily: Font.Medium,
    textTransform: "uppercase",
  },
});

const snapPoints = [cascadedHeight, "100%"];

const CheckedContext = createContext(
  {} as {
    toggleChecked(uid: string): void;
    checked: Record<string, undefined | boolean>;
  }
);

const LoadableQueueTrackItem: React.FC<{
  params: RenderItemParams<string>;
}> = ({ params }) => {
  const [{ data, fetching }] = useTrackQuery({
    variables: { id: params.item },
  });

  const { toggleChecked, checked } = useContext(CheckedContext);

  return (
    <QueueTrackItem
      checked={!!checked[params.item]}
      drag={params.drag}
      onToggle={() => toggleChecked(params.item)}
      track={data?.track || null}
      fetching={fetching}
    />
  );
};

const renderItem = (params: RenderItemParams<string>) => {
  return (
    <OpacityDecorator>
      <LoadableQueueTrackItem params={params} />
    </OpacityDecorator>
  );
};

const SelectedTrackListView: React.FC<{
  onFinish(selectedTracks: string[]): void;
  selectedTracks: string[];
  setSelectedTracks(selectedTracks: string[]): void;
}> = ({ onFinish, selectedTracks, setSelectedTracks }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [expanded, setExpanded] = useState(false);

  const handleSheetChanges = useCallback((index: number) => {
    setExpanded(!!index);
  }, []);

  const { t } = useTranslation();

  const toggle = useCallback(
    () => bottomSheetRef.current?.snapTo(expanded ? 0 : 1),
    [expanded]
  );

  const colors = useColors();

  const [checked, setChecked] = useState<Record<string, undefined | boolean>>(
    {}
  );

  useEffect(() => {
    if (!expanded) setChecked({});
  }, [expanded]);

  const toggleChecked = useCallback(
    (uid: string) =>
      setChecked((checked) => ({ ...checked, [uid]: !checked[uid] })),
    []
  );

  const hasChecked = useMemo(
    () => expanded && Object.values(checked).includes(true),
    [checked, expanded]
  );

  const removeChecked = useCallback(() => {
    const checkedClone = { ...checked };

    const removingUids = Object.keys(checked).filter((checkedKey) => {
      if (checked[checkedKey]) {
        delete checkedClone[checkedKey];
        return true;
      }
      return false;
    });

    setChecked(checkedClone);
    setSelectedTracks(selectedTracks.filter((t) => !removingUids.includes(t)));
  }, [selectedTracks, setSelectedTracks, checked]);

  const moveToTopChecked = useCallback(() => {
    const checkedClone = { ...checked };

    const toTopUids = Object.keys(checked).filter((checkedKey) => {
      if (checked[checkedKey]) {
        delete checkedClone[checkedKey];
        return true;
      }
      return false;
    });

    setChecked(checkedClone);
    setSelectedTracks([
      ...toTopUids,
      ...selectedTracks.filter((t) => !toTopUids.includes(t)),
    ]);
  }, [selectedTracks, setSelectedTracks, checked]);

  return (
    <CheckedContext.Provider value={{ toggleChecked, checked }}>
      <View style={styles.placeholder} />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundComponent={BottomSheetCustomBackground}
        handleComponent={null}
        style={styles.root}
      >
        <View style={styles.metaBar}>
          <Text color="textSecondary">
            {t("new.select_songs.num_selected", {
              count: selectedTracks.length,
            })}
          </Text>
          <TouchableOpacity onPress={toggle} style={styles.toggleExpand}>
            {expanded ? (
              <IconChevronDown stroke={colors.textSecondary} />
            ) : (
              <IconChevronUp stroke={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.flexFill}>
          <DraggableFlatList
            data={selectedTracks}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            onDragEnd={({ data }) => setSelectedTracks(data)}
            windowSize={3}
          />
        </View>
      </BottomSheet>
      <View
        style={[
          styles.bottomContainer,
          { backgroundColor: colors.backgroundSecondary },
        ]}
      >
        {hasChecked ? (
          <View style={[styles.selectOpts, { borderColor: colors.border }]}>
            <TextButton
              onPress={removeChecked}
              textProps={{ style: styles.selectOptsText }}
            >
              {t("queue.remove")}
            </TextButton>
            <TextButton
              onPress={moveToTopChecked}
              textProps={{ style: styles.selectOptsText }}
            >
              {t("queue.move_to_top")}
            </TextButton>
          </View>
        ) : (
          <Button
            onPress={() => onFinish(selectedTracks)}
            disabled={selectedTracks.length === 0}
            variant="filled"
          >
            {t("new.select_songs.finish_add")}
          </Button>
        )}
      </View>
    </CheckedContext.Provider>
  );
};

export default SelectedTrackListView;
