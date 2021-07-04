import { ParamList, RouteName } from "@/screens/types";
import {
  HeaderBackable,
  Size,
  SongSelector,
  SongSelectorContext,
} from "@auralous/ui";
import { StackScreenProps } from "@react-navigation/stack";
import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectedTrackListView from "./SelectedTrackListView";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    padding: Size[3],
    paddingBottom: 0,
    flex: 1,
  },
});

const SelectSongs: FC<StackScreenProps<ParamList, RouteName.NewSelectSongs>> =
  ({ navigation }) => {
    const { t } = useTranslation();

    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

    const addTracks = useCallback((trackIds: string[]) => {
      setSelectedTracks((prev) => [...prev, ...trackIds]);
    }, []);

    const removeTracks = useCallback((trackIds: string[]) => {
      setSelectedTracks((prev) => prev.filter((t) => !trackIds.includes(t)));
    }, []);

    const onFinish = useCallback(
      (selectedTracks: string[]) => {
        navigation.navigate(RouteName.NewFinal, {
          selectedTracks,
          text: "",
        });
      },
      [navigation]
    );

    return (
      <SafeAreaView style={styles.root}>
        <HeaderBackable
          onBack={navigation.goBack}
          title={t("new.select_songs.title")}
        />
        <SongSelector
          selectedTracks={selectedTracks}
          addTracks={addTracks}
          removeTracks={removeTracks}
        />
        <SongSelectorContext.Provider
          value={{ addTracks, removeTracks, selectedTracks }}
        >
          <SelectedTrackListView
            selectedTracks={selectedTracks}
            setSelectedTracks={setSelectedTracks}
            onFinish={onFinish}
          />
        </SongSelectorContext.Provider>
      </SafeAreaView>
    );
  };

export default SelectSongs;
