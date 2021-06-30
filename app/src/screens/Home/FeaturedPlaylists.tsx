import { usePlaylistsFeaturedQuery } from "@auralous/api";
import { PlaylistItem, Size } from "@auralous/ui";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouteName } from "../types";

const styles = StyleSheet.create({
  playlistItemWrapper: {
    marginRight: Size[4],
  },
});

const FeaturedPlaylists: FC = () => {
  const [{ data }] = usePlaylistsFeaturedQuery();

  const { navigate } = useNavigation();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data?.playlistsFeatured?.map((playlist) => (
        <TouchableOpacity
          key={playlist.id}
          style={styles.playlistItemWrapper}
          onPress={() => navigate(RouteName.Playlist, { id: playlist.id })}
        >
          <PlaylistItem playlist={playlist} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FeaturedPlaylists;
