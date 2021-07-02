import { LoadingScreen } from "@/components/Loading";
import { ParamList, RouteName } from "@/screens/types";
import {
  Playlist,
  PlaylistTracksDocument,
  PlaylistTracksQuery,
  PlaylistTracksQueryVariables,
  usePlaylistsFeaturedQuery,
  usePlaylistsFriendsQuery,
} from "@auralous/api";
import { HeaderBackable, Size } from "@auralous/ui";
import { StackScreenProps } from "@react-navigation/stack";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BackHandler, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClient } from "urql";
import PlaylistsSection from "./PlaylistsSection";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingVertical: Size[3],
    paddingHorizontal: Size[6],
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,.5)",
  },
});

const QuickShare: FC<StackScreenProps<ParamList, RouteName.NewQuickShare>> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation();
  const [fetching, setFetching] = useState(false);

  const onFinish = useCallback(
    (selectedTracks: string[], text: string) => {
      navigation.navigate(RouteName.NewFinal, {
        selectedTracks,
        text,
      });
    },
    [navigation]
  );

  const client = useClient();

  useEffect(() => {
    if (!fetching) return;
    const onBack = () => true;
    BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => BackHandler.removeEventListener("hardwareBackPress", onBack);
  }, [fetching]);

  const onSelect = useCallback(
    async (playlist: Playlist) => {
      setFetching(true);
      const result = await client
        .query<PlaylistTracksQuery, PlaylistTracksQueryVariables>(
          PlaylistTracksDocument,
          { id: playlist.id }
        )
        .toPromise();
      if (result.data) {
        onFinish(
          result.data.playlistTracks.map((playlistTrack) => playlistTrack.id),
          playlist.name
        );
      }
      setFetching(false);
    },
    [client, onFinish]
  );

  useEffect(() => {
    if (route.params?.playlist) {
      onSelect(route.params.playlist);
    }
  }, [route, onSelect]);

  const [{ data: dataFeatured }] = usePlaylistsFeaturedQuery();
  const [{ data: dataFriends }] = usePlaylistsFriendsQuery();

  return (
    <SafeAreaView style={styles.root}>
      <HeaderBackable title={t("new.quick_share.title")} />
      <ScrollView style={styles.content}>
        <PlaylistsSection
          title={t("home.featured_playlists.title")}
          playlists={dataFeatured?.playlistsFeatured || []}
          onSelect={onSelect}
        />
        <PlaylistsSection
          title={t("home.friends_playlists.title")}
          playlists={dataFriends?.playlistsFriends || []}
          onSelect={onSelect}
        />
      </ScrollView>
      {fetching && (
        <View style={styles.overlay}>
          <LoadingScreen />
        </View>
      )}
    </SafeAreaView>
  );
};

export default QuickShare;
