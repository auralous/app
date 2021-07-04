import { usePlaylistsFeaturedQuery } from "@auralous/api";
import { PlaylistItem, Size } from "@auralous/ui";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouteName } from "../types";
import scrollStyles from "./ScrollView.styles";

const styles = StyleSheet.create({
  item: {
    marginRight: Size[4],
  },
});

const FeaturedPlaylists: FC = () => {
  const [{ data }] = usePlaylistsFeaturedQuery();

  const navigation = useNavigation();

  return (
    <ScrollView
      style={scrollStyles.scroll}
      contentContainerStyle={scrollStyles.scrollContent}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {data?.playlistsFeatured?.map((playlist) => (
        <TouchableOpacity
          key={playlist.id}
          style={styles.item}
          onPress={() =>
            navigation.navigate(RouteName.Playlist, { id: playlist.id })
          }
        >
          <PlaylistItem playlist={playlist} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FeaturedPlaylists;
